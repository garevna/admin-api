class BaseRequest {
  validate () {
    return this.rules()
  }
}

module.exports = BaseRequest
