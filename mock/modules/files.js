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
            result:   Mock.mock({
                "filesUrl|1": [
                    'https://s2.loli.net/2023/05/03/2KFb8XuCQiNre4E.jpg', 
                    'https://s2.loli.net/2023/05/03/zwej95IOtPaQTlK.jpg'
                ]
            })
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