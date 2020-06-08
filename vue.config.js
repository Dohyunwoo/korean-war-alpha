module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/__": {
        target: "http://localhost:8080",
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
