export function reset(formRef, ...excludeFields) {
  this.$refs[formRef].resetFields()
  var obj1 = this.$data.sizeForm
  var obj2 = this.$options.data.call(this).sizeForm
  if (!excludeFields || excludeFields.length === 0) {
    excludeFields = ['ruleValidate']
  }
  for (var attrName in obj1) {
    if (excludeFields && excludeFields.includes(attrName)) {
      continue
    }
    obj1[attrName] = obj2[attrName]
  }
}
export default reset
