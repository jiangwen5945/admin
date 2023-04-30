<template>
    <div class="excel-box">
        <el-upload accept=".xls,.xlsx" action="/api/importExcel" :auto-upload="true" :multiple="false" :file-list="fileList"
            :before-upload="beforeUpload" :show-file-list="false" :on-change="fileChange" :on-success="handleSuccess">
            <el-button type="file" size="medium">导入excel</el-button>
        </el-upload>
        <el-button type="file" size="medium" @click="exportExcelFn">导出excel</el-button>
    </div>
</template>

<script>
import { importExcel } from '../api'
import * as XLSX from "xlsx"; // 导入excel插件
export default {
    data() {
        return {
            fileList: [], //解析导入后的excel数据
            files:null,
            excelData:{} // 发送给后端保存的导入Excel数据
        }
    },
    props:['tableData','loading'],
    mounted() {
        this.getTableHeader()
    },
    methods: {
        // 获取table表格头
        getTableHeader() {
            // 导出的列顺序和数组顺序一致，key为数据中的属性，name为导出后的列名
            const tableHeader = []
            if (!this.$parent.$refs.refTable && !this.$parent.$refs.refTable.$children) return


            this.$parent.$refs.refTable.$children.forEach(e => {
                // 如果存在嵌套表格（多级表头）
                if (e.$children.length !== 0) {
                    e.$children.forEach(v => {
                        if (v.label !== undefined && v.prop !== undefined) {
                            tableHeader.push({
                                key: v.prop,
                                name: v.label
                            })
                        }
                    })
                }
                if (e.label !== undefined && e.prop !== undefined) {
                    tableHeader.push({
                        key: e.prop,
                        name: e.label
                    })
                }
            })
            return tableHeader
        },

        // 导出表格
        exportExcelFn() {
            // 获取当前表格的表头
            const xlsHeader = this.getTableHeader()
            // 调用方法导出
            import('@/vendor/Export2Excel').then(excel => {
                const list = this.tableData // 要导出的数组对象
                const tHeader = xlsHeader.map(obj => obj.name) // 遍历出表头
                const data = list.map((obj, index) => {
                    // obj 为每一行数据对象
                    return xlsHeader.map(v => {
                        // 自定义对每一列数据进行处理
                        // if (v.key === 'id') return index + 1
                        // if (v.key === 'formOfEmployment') return this.formatEmployeeFn(obj[v.key])
                        // if (v.key === 'timeOfEntry') return parseTime(obj[v.key], '{y}-{m}-{d}')
                        return obj[v.key]
                    })
                })
                // 开始导出
                excel.export_json_to_excel({
                    header: tHeader, // 导出的表头，['id', '姓名']
                    data, // 导出的数据，数组套数组格式。[['1', '张三'], ['2', '李四']]
                    filename: 'xlsxxlsx', // 文件名
                    autoWidth: true, // 是否自动列宽
                    bookType: 'xlsx' // 格式
                })
            })
        },

          // 上传文件之前的钩子：判断上传文件格式、大小等，若返回false则停止上传
        beforeUpload(file) {
            //文件类型
            const isType = file.type === 'application/vnd.ms-excel'
            const isTypeComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            const fileType = isType || isTypeComputer
            if (!fileType) {
                this.$message.error('上传文件只能是xls/xlsx格式！')
            }
            // 文件大小限制为10M
            const fileLimit = file.size / 1024 / 1024 < 10;
            if (!fileLimit) {
                this.$message.error('上传文件大小不超过10M！');
            }
            return fileType && fileLimit
        },

        // 导入excel成功事件
        async handleSuccess(e) {
            this.readerData(this.files)
            const res = await importExcel(this.excelData) // 发送后端需要保存导入表格数据
            // 往当前 table 追加导入数据
            this.tableData.unshift(...this.transExcel(this.excelData.results))
            console.log(this.tableData);
            this.$emit('update:loading', false)
            this.$message.success('上传成功')
        },

        // 上传文件变动时
        fileChange(files) {
            if (!files.raw) return
            this.files = files.raw
        },

        // excel数据转提交格式
        transExcel(results) {
            // const userRelations = {
            //   ID: 'mobile',
            //   姓名: 'username'
            // }
            const mapHeader = {}
            this.getTableHeader().forEach(e => mapHeader[e.name] = e.key)
            const arr = []
            results.forEach(item => {
                const obj = {}
                const contentKeys = Object.keys(item)
                contentKeys.forEach(k => {
                    const key = mapHeader[k]
                    if (key) {
                        // 如果时间格式为数字，则需要调用函数转换
                        // if (key === 'timeOfEntry' || key === 'correctionTime') {
                        //   item[k] = formatExcelDate(item[k], '-')
                        // }
                        obj[key] = item[k]
                    }
                })
                arr.push(obj)
            })
            return arr
        },

        // 将导入的表格生成发送给后端保存的格式
        generateData ({ header, results }) {
            this.excelData.header = header
            this.excelData.results = results
        },

        // 渲染表格数据
        readerData(rawFile) {
            this.$emit('update:loading', true)
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    const data = e.target.result
                    const workbook = XLSX.read(data, { type: 'array' })
                    const firstSheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[firstSheetName]
                    const header = this.getHeaderRow(worksheet)
                    const results = XLSX.utils.sheet_to_json(worksheet)
                    this.generateData({ header, results })
                    resolve()
                }
                reader.readAsArrayBuffer(rawFile)
            })
        },

        // 获取导入表格头
        getHeaderRow(sheet) {
            const headers = []
            const range = XLSX.utils.decode_range(sheet['!ref'])
            let C
            const R = range.s.r
            /* start in the first row */
            for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
                /* find the cell in the first row */
                let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                headers.push(hdr)
            }
            return headers
        },

    }
}
</script>
<style lang="scss" scoped>
.excel-box {
    display: flex;
    margin-left: 10px;

    button {
        margin-right: 10px;
    }
}
</style>