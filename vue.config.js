const configFunc = require("./output")
const isDev = process.env.NODE_ENV === "development"
function resolve(dir) {
  return path.join(__dirname, dir)
}
const config = configFunc(resolve)(process.argv[4], isDev)

console.log(output)

module.exports = {
  productionSourceMap: false,
  ...config.root,
  configureWebpack: {
    ...config.configureWebpack
  }
}
