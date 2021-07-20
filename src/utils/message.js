export const dictsmessage = {
  process: {
    cleaning: '清洗',
    package: '打包',
    sterilization: '灭菌',
    storage: '入库',
    outstorage: '出库',
    grant: '发放',
    use: '使用',
    callback: '回收',
    allocation: '分配',
    delivery: '配送',
    assigned: '配包',
    back: '召回',
    add: '添加',
    form: '提交',
    edit: '修改',
    baseline: '库存基线',
    ratify: '批准',
    ratif: '审批',
    lost: '丢失确认',
    rback: '撤销',
    qualified: '合格'
  },
  packages: {
    package: '医疗包',
    this: '该次',
    people: '人',
    amount: '数量'
  },
  result: {
    success: '成功！',
    error: '失败',
    alread: '已经',
    yes: '完成！',
    already: '已被确认！',
    done: '已完成！',
    message: '提交成功！',
    messages: '修改成功！',
    rest: '取消',
    id: '请填写id',
    defail: '不能为空！'
  },
  independent: {
    rest: '请选择要取消分配的 “医疗包”',
    select: '请选择要分配清洗的 “医疗包”',
    selectsterilizations: '请选择要分配灭菌的 “医疗包”',
    res: '请选择 “待清洗医疗包”',
    other: '请选择 “分配人” 或者 “待灭菌分配”',
    amount: '请输入正确的数量',
    null: '内容物或数量不能为空',
    none: '没有不合格信息！',
    onemore: '重新分配清洗成功！'
  },
  packagesArray: {
    isturnover: ['非周转包', '周转包'],
    iscomplete: ['未完成', '已完成'],
    isvalid: ['停用', '启用'],
    typeid: ['过期', '灭菌', '其他', '科室退回'],
    source: ['供应包', '科室包', '外来包'],
    procedure: ['通用', '仅清洗', '仅灭菌'],
    status: ['申请中', '出库中', '配送中', '配送完成'],
    cleaningstatus: ['未清洗', '清洗中', '清洗合格', '清洗全部不合格', '清洗部分不合格'],
    sterilizationsstatus: ['未灭菌', '灭菌中', '灭菌合格', '灭菌全部不合格', '灭菌部分不合格']
  },
  dictsrole: ['超级管理员', '系统管理员', '系统操作员', '科室管理员']
}
export default dictsmessage

