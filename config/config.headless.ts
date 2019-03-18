import { config } from "./config"

config.capabilities.chromeOptions.args = ['--no-sandbox', '--test-type=browser', "--headless", "--disable-gpu", "--window-size=1920,1080", "--log-level=3"]

export { config }