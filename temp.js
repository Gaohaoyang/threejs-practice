const glob = require('glob')
const path = require('path')

const generateHtmlPlugins = () =>
  glob.sync('./src/**/index.html').map((item) => ({
    template: item,
    filename: `demo/${item.replace('/src', '').replace('./', '')}`,
  }))

console.log(generateHtmlPlugins())
