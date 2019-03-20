import { browser, Config } from "protractor";
import { generateXmlReport } from "../support/reporter-xml"

export const config: Config = {

    directConnect: true,
    restartBrowserBetweenTests: false,
    SELENIUM_PROMISE_MANAGER: false,

    capabilities: {
        shardTestFiles: false,
        maxInstances: 1,
        browserName: "chrome",
        restartBrowserBetweenTests: false,
        chromeOptions: {
            args: ['--no-sandbox', '--test-type=browser'],
            prefs: {
                'plugins.always_open_pdf_externally': true,
                'download': {
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'default_directory': process.cwd() + "/data/downloads"
                },
                'profile.managed_default_content_settings.notifications': 1
            },
        },
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../features/*.feature",
    ],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().setSize(1920, 1080);
        browser.manage().timeouts().implicitlyWait(30000);

        const protractorImageComparison = require('protractor-image-comparison');
        browser.protractorImageComparison = new protractorImageComparison(
            {
                baselineFolder: 'data/image-comparison/baseline/',
                screenshotPath: 'data/image-comparison/screenshots/',
                autoSaveBaseline: true,
                formatImageName: '{browserName}_{tag}_{width}-{height}'
            }
        )
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: ["json:.tmp/results.json", "node_modules/cucumber-pretty" ],
        require: ["../stepdefinitions/*.ts", "../support/*.ts"],
        strict: true,
        tags: "",
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true
        }
    }],

    onCleanUp: () => {
        generateXmlReport();
    },
};
