module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/__': {
        target: 'http://localhost:5000'
      }
    }
  }
}
