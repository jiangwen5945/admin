import Mock from 'mockjs'


export default {
    // 检测文件上传状态
    checkChunkStatus: params => {
        const { id, name, totalChunks } = JSON.parse(params.body)
        return {
            code: 200,
            message: "success",
            result: {
                status: 0
            }
        }
    },

    // 上传文件
    uploadFiles: params => {
        return {
            code: 200,
            message: "success",
            result: null
        }
    },

    // 导入Excel
    importExcel: params => {
        return {
            code: 200,
            message: "success",
            result: null
        }
    }

}