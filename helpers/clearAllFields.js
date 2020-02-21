module.exports = async (object) => {
  const config = {
    string: '',
    number: NaN,
    boolean: false,
    function: () => {}
  }
  const properties = Object.keys(object)
    .map((key) => {
      if (!object[key]) return null
      if (typeof object[key] === 'object') return Array.isArray(object[key]) ? [] : {}
      return { [key]: config[typeof object[key]] }
    })
  return Object.assign({}, ...properties)
}
