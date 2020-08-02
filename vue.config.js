const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Starbuttons";
      return args;
    });
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "./[name].json"
      })
      .end()
      .use("yaml-loader")
      .loader("yaml-loader")
      .end();
  },
  configureWebpack: {
    plugins:
      process.env.ENV === "PRODUCTION"
        ? [
            new SentryCliPlugin({
              include: ".",
              ignoreFile: ".sentrycliignore",
              ignore: ["node_modules", "webpack.config.js"],
              configFile: "sentry.properties"
            })
          ]
        : []
  },
  pwa: {
    themeColor: "#6375BC",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
      importWorkboxFrom: "disabled"
    }
  }
};
