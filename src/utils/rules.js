// 统一校验规则
const validate = {
  // 校验account
  account (value) {
    // value是将来使用该规则的表单元素的值
    // 1. 必填
    // 2. 6-20个字符，需要以字母开头
    // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
    if (!value) return '用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  password (value) {
    if (!value) return '密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  mobile (value) {
    if (!value) return ('手机号码')
    if (!/^1[3-9]\d{9}$/.test(value)) return ('手机号格式错误')
    return true
  },
  code (value) {
    if (!value) return '验证码'
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选同意用户协议'
    return true
  }
}

// 导出验证规则
export default {
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' },
      { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
    ],
    nickName: [
      { required: true, message: '昵称不能为空', trigger: 'blur' },
      { min: 2, message: '昵称长度不能少于2位', trigger: 'blur' }
    ],
    roles: [
      { required: true, message: '角色不能为空', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '性别不能为空', trigger: 'change' }
    ],
    birth: [
      { required: true, message: '日期不能为空', trigger: 'change' }
    ],
    addr: [
      { required: true, message: '地址不能为空', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '年龄不能为空' },
      { type: 'number', message: '年龄必须为数字值' }
    ],

    level:[
      { required: true, message: '级别不能为空', trigger: 'change' }
    ],
    name: [
      { required: true, message: '名称不能为空', trigger: 'blur' }
    ],

    roleName: [
      { required: true, message: '角色名称不能为空', trigger: 'blur' }
    ],
    authority:[
      { required: true, message: '角色权限不能为空', trigger: 'blur' }
    ],
    className:[
      { required: true, message: '部门名称不能为空', trigger: 'blur' }
    ],
    employeesCount:[
      { required: true, message: '人员数量不能为空', trigger: 'blur' }
    ],

    id:[
      { required: true, message: 'ID不能为空', trigger: 'blur' }
    ],
    orderState:[
      { required: true, message: '订单状态不能为空', trigger: 'blur' }
    ],
    payMoney:[
      { required: true, message: '支付金额不能为空', trigger: 'blur' }
    ],
    payType:[
      { required: true, message: '支付方式不能为空', trigger: 'blur' }
    ],
    receiverContact:[
      { required: true, message: '收件人姓名不能为空', trigger: 'blur' }
    ],
    receiverMobile:[
      { required: true, message: '收件人电话不能为空', trigger: 'blur' }
    ],
    receiverAddress:[
      { required: true, message: '收件人地址不能为空', trigger: 'blur' }
    ],


    title:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    price:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    category:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    sort:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    sku:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    label:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    stock:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    sales:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    fileList:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],

    productCount:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    productUnit:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    parentId:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],

    author:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],
    score:[
      { required: true, message: '内容不能为空', trigger: 'blur' }
    ],

    
   


    


    
   
   


    // region: [
    //   { required: true, message: '活动区域', trigger: 'change' }
    // ],
    // date1: [
    //   { type: 'date', required: true, message: '日期', trigger: 'change' }
    // ],
    // date2: [
    //   { type: 'date', required: true, message: '时间', trigger: 'change' }
    // ],
    // type: [
    //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    // ],
    // resource: [
    //   { required: true, message: '活动资源', trigger: 'change' }
    // ],
    // desc: [
    //   { required: true, message: '请填写活动形式', trigger: 'blur' }
    // ],
    // pass: [
    //   { validator: validate.account, trigger: 'blur' }
    // ],
    // checkPass: [
    //   { validator: validate.account, trigger: 'blur' }
    // ],
    // age: [
    //   { validator: validate.checkAge, trigger: 'blur' }
    // ],
    // title: [
    //   { required: true, message: '商品名称不能为空', trigger: 'blur' }
    // ]
}

