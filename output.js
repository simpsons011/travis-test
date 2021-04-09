const PrerenderSPAPlugin = require("prerender-spa-plugin")
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const configFunc = pathFunc => (page, isDev) => {
  const configMap = {
    index: {
      root: {
        assetsDir: "",
        pages: {
          index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            chunks: ["chunk-vendors", "index"]
          }
        }
      },
      configureWebpack: {
        plugins: []
      }
    },
    landing: {
      root: {
        assetsDir: isDev ? "" : "./landing",
        pages: {
          landing: {
            entry: "landing/main.js",
            template: "public/index.html",
            filename: isDev ? "index.html" : pathFunc("dist/landing/index.html"),
            chunks: ["chunk-vendors", "landing"]
          }
        }
      },
      configureWebpack: {
        plugins: isDev
          ? []
          : [
              new PrerenderSPAPlugin({
                indexPath: pathFunc("dist/landing/index.html"),
                staticDir: pathFunc("dist"),
                outputDir: pathFunc("dist/landing"),
                routes: ["/"],
                renderer: new Renderer({
                  headless: true,
                  renderAfterDocumentEvent: "render-event"
                })
              })
            ]
      }
    }
  }
  return configMap[page] ? configMap[page] : { root: {}, configureWebpack: {} }
}

module.exports = configFunc
