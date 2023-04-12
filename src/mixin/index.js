export const mixins = {
  data() {
    return {
      tableData: [], // 表格数据
      count: null,   // 总条数
      isVisible: false,
      modalType: 0,
      initForm: null
    };
  },
  created() {
    this.getData() // 获取基础列表数据
    this.initForm = JSON.parse(JSON.stringify(this.form)) // 拷贝一份初始化的表单数据
  },
  methods: {
    // 获取数据
    async getData() {
      const { list, count } = await this.getDataApi()
      this.tableData = list
      this.count = count
    },

    // 删除用户
    handleDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteApi(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取列表数据
          this.getData()
        })
      }).catch(err => {
        if (err === 'cancel') return
        this.$message({
          type: 'error',
          message: err
        });
      });
    },

    // 编辑
    handleEdit(row) {
      this.isVisible = true
      this.modalType = 1
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },

    // 添加
    handleAdd() {
      this.isVisible = true
      this.modalType = 0
    },

    // 提交表单
    submit() {
      this.$refs.form.validate( async valid => {
        // 当表单验证通过
        if (valid) {
          console.log('当前表单数据', this.form)
          switch (this.modalType) {
            case 0:
              await this.createApi(this.form)
              this.getData() // 重新获取列表数据
              break;
            case 1:
              await this.updateApi(this.form)
              this.getData() // 重新获取列表数据
              break;
          }
          this.handleClose()  // 关闭弹窗
          this.$message({
            type: 'success',
            message: this.modalType === 0 ? '添加成功' : '编辑成功'
          });
        }
      })
    },

    // 关闭弹窗
    handleClose() {
      this.form = { ...this.initForm } // 初始化表单
      this.isVisible = false    // 关闭弹窗
    },
  },
};