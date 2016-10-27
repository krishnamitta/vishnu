const isDecimal = (value) => {
  return /^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value)
}

const validate = (fields, values) => {
  const errors = {}
  _.forOwn(fields, (field, key) => {
    if (field.required && (_.isUndefined(values[field.name]) || _.isNull(values[field.name]))) {
      errors[field.name] = `${field.floatingLabel} is required`
    }
    if (field.fieldType == 'decimal' && !isDecimal(values[field.name])) {
      errors[field.name] = 'Must be a valid decimal'
    }
    if (field.maxValueLength && values[field.name] && values[field.name].length > field.maxValueLength) {
      errors[field.name] = 'Max length exceeded'
    }
    if (field.fieldType == 'decimal' && field.expression && values[field.name] && !field.expression.test(values[field.name])) {
      errors[field.name] = 'Max length exceeded'
    }
  })
  return errors
}
export default validate
