const configFunc = require("./output")
const isDev = process.env.NODE_ENV === "development"
const output = configFunc(process.argv[4], isDev)

console.log(output)

module.exports = {
  productionSourceMap: false,
  assetsDir: output.assetsDir,
  pages: output.pages,
  configureWebpack: {
    plugins: output.plugins
  }
}
