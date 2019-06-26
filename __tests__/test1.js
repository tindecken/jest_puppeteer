const timeout = 10000
const devices = require('puppeteer/DeviceDescriptors')
const iPhonex = devices['iPhone X']

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = (await global.__BROWSER__.pages())[0]
      await page.goto('https://manualqc2.acomcloud.com')
      await page.emulate(iPhonex);
    }, timeout)

    afterAll(async () => {
      await page.close()
    })
    
    it('Login success', async () => {
      const input_UserNameElement = await page.waitForXPath("//input[@name='email']")
      const input_PasswordElement = await page.waitForXPath("//input[@name='password']")
      const btn_SignInElement = await page.waitForXPath("//form[@name='loginForm']//button[contains(normalize-space(text()),'Sign in')]")
      await input_UserNameElement.type('thaihoang.nguyen@acomsolutions.com', { delay: 10 })
      await input_PasswordElement.type('Admin@123', { delay: 10 })
      await btn_SignInElement.click()
      // let text = await page.evaluate(() => document.body.textContent)
      try {
        expect(await page.waitForXPath("//button[contains(@ng-click,'logoutt')]", { timeout: 30000 })).not.toBeNull()
      }
      catch(e) {
        page.screenshot({ path: 'error.png'})
        throw new Error(`Not found Web Element Logout --> Login failed,  ${e}`);
      }
      
    })
  },
  timeout
)
