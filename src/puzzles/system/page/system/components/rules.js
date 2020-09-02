export const Rules = {
    //机构校验
    orgName: [
      { required: true, message: "请输入机构名称", trigger: "blur" }
    ],
    orgCode: [
      { required: true, message: "请输入机构编号", trigger: "blur" }
    ],
    address : [
      { min: 5, max: 40, message: "长度在 5 到 40个字符" ,trigger: "blur" },
    ],
    telPhone: [
      { pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,message: "您输入的联系电话有误",trigger: "blur"},
    ],
    postalCode: [
      { pattern: /^[0-9]{6}$/,message: "您输入的邮编有误",trigger: "blur"},
    ],
    liaison: [
      { min: 2, max: 8, message: "长度在 2 到 8个字符" },
      { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "只能输入中文", trigger: 'blur'}
    ],
    email: [
      { pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '您输入的邮箱格式有误，请重新输入',trigger: 'blur' },
    ],
    //用户校验
    username: [
      { required: true, message: "账号不能为空", trigger: "blur" }
    ],
    realname: [
      { required: true, message: "姓名不能为空", trigger: "blur" }
    ],
    // tenantCode: [
    //   { required: true, message: "请选择租户", trigger: "blur" }
    // ],
  }