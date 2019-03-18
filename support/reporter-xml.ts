const { exec } = require('child_process');

export function generateXmlReport() {

    exec('node_modules/.bin/cucumber-js --format=json | node_modules/.bin/cucumber-junit > .tmp/results.xml');

}