const fs = require('fs')

function writeToFile(json, filePath) {
    fs.writeFile(filePath ? filePath : './debug.json', JSON.stringify(json, null, 2), null, () => {})
}

module.exports = {
    writeToFile
}