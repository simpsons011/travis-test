const PrerenderSPAPlugin = require("prerender-spa-plugin")
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require("path")

const configFunc = (page, isDev) => {
  const configMap = {
    index: {
      assetsDir: ".",
      pages: {
        index: {
          entry: "src/main.js",
          template: "public/index.html",
          filename: "index.html",
          chunks: ["chunk-vendors", "index"]
        }
      },
      plugins: []
    },
    landing: {
      assetsDir: "./landing",
      pages: {
        landing: {
          entry: "landing/main.js",
          template: "public/index.html",
          filename: path.resolve(__dirname, "dist/landing/index.html"),
          chunks: ["chunk-vendors", "landing"]
        }
      },
      plugins: !isDev
        ? [
            new PrerenderSPAPlugin({
              indexPath: path.join(__dirname, "dist/landing/index.html"),
              staticDir: path.join(__dirname, "dist"),
              outputDir: path.join(__dirname, "dist/landing"),
              routes: ["/"],
              renderer: new Renderer({
                headless: true,
                renderAfterDocumentEvent: "render-event"
              })
            })
          ]
        : []
    }
  }

  return configMap[page] ? configMap[page] : configMap["index"]
}

module.exports = configFunc
