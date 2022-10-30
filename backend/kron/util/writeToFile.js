const fs = require('fs')
const path = require('path')

function writeToFile(json, filePath = './debug.json') {
    const dirname = path.dirname(filePath)
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFile(filePath, JSON.stringify(json, null, 2), null, () => {});
}

module.exports = {
    writeToFile
}