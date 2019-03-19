const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
    inputJsonFile: '.tmp/results.json',
    outputXmlFile: '.tmp/results.xml'
}

export function generateXmlReport() {
    cucumberJunitConvert.convert(options);
}
 