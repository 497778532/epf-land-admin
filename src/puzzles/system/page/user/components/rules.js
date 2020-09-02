/**
 * @author Hua.Jeao
 * @date 20119-12-05
 * @see
 *
 */
let checkNum = (rule, value, callback) => {
      let myreg = /^[0-9]*$/;
      if (!myreg.test(value)&& value != 0 && value != null) {
          callback(new Error("请输入正确数字值"));
      }else{
          callback();
      }
  };
  export const Rules = {
  USER: { // 用户校验
    username: [
      {required: true, message: '账号不能为空', trigger: 'blur'}
    ],
    realname: [
      {required: true, message: '姓名不能为空', trigger: 'blur'}
    ],
    telPhone: [
      {required: true, message: '手机号不能为空', trigger: 'blur'},
      {pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/, message: '您输入的联系电话有误', trigger: 'blur'}
    ]
    // tenantCode: [
    //     { required: true, message: "请选择租户", trigger: "blur" }
    // ],
  },
  ORG: {// 机构校验
    orgName: [
      {required: true, message: '请输入机构名称', trigger: 'blur'}
    ],
    orgCode: [
      {required: true, message: '请输入机构编号', trigger: 'blur'}
    ],
    address: [
      {min: 5, max: 40, message: '长度在 5 到 40个字符', trigger: 'blur'},
    ],
    telPhone: [
      {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的手机号或者座机号格式为：0000-0000000', trigger: 'blur'},
    ],
    postalCode: [
      {pattern: /^[0-9]{6}$/, message: '您输入的邮编有误', trigger: 'blur'},
    ],
    liaison: [
      {min: 2, max: 8, message: '长度在 2 到 8个字符'},
      {pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '只能输入中文', trigger: 'blur'}
    ],
    email: [
      {pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '您输入的邮箱格式有误，请重新输入', trigger: 'blur'},
    ],
    regional: [
      {required: true, message: '请选择隶属区域', trigger: 'blur'}
    ]
  },
  ROLE: { // 角色校验
    roleName: [
      {required: true, message: '请输入角色编号', trigger: 'blur'},
    ],
    roleCode: [
      {required: true, message: '请输入角色编号', trigger: 'blur'},
      {pattern: /^[A-Za-z0-9_\-]+$/, message: '非法的权限编码，格式如：acbAbc,abdc-abBc,abdc_abBc', trigger: 'blur'},
    ]
  },
  PERMISSON: {  // 权限校验
    perName: [
      {required: true, message: '请输入机构名称', trigger: 'blur'},
      {pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '只能输入中文', trigger: 'blur'}
    ],
    perCode: [
      {required: true, message: '请输入权限编号', trigger: 'blur'},
      {pattern: /^[A-Za-z0-9_\-]+$/, message: '非法的权限编码，格式如：acbAbc,abdc-abBc,abdc_abBc', trigger: 'blur'},
    ],
    perType: [
      {required: true, message: '请选择权限类型', trigger: 'blur'},
    ],
    perDevel: [
      {required: true, message: '请选择权限级别', trigger: 'blur'},
    ]
  },
  RESOURCE: {// 资源校验
    resName: [
      {required: true, message: '请输入机构名称', trigger: 'blur'},
      {pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '只能输入中文', trigger: 'blur'}
    ],
    resCode: [
      {required: true, message: '请输入权限编号', trigger: 'blur'},
      {pattern: /^[A-Za-z0-9_\-]+$/, message: '非法的权限编码，格式如：acbAbc,abdc-abBc,abdc_abBc', trigger: 'blur'},
    ],
    resType: [
      {required: true, message: '请选择权限类型', trigger: 'blur'},
    ],
  },
  REGION: {
    dictKey: [
      {required: true, message: '请输入字典key', trigger: 'blur'},
    ],
    dictValue: [
      {required: true, message: '请输入字典value', trigger: 'blur'},
    ],
    zhCn: [
      {required: true, message: '请输入中文名称', trigger: 'blur'},
    ],
    enUs: [
      {required: true, message: '请输入英文名称', trigger: 'blur'},
    ],
    dictOrder: [
      {validator: checkNum, message: '请输入整数', trigger: 'blur'}
    ],
    currentData: '',
    isadd: false,
    parentName: '',
    currentNode: '',
  }
}
