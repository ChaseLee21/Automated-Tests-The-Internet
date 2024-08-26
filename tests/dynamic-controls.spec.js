// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/dynamic_controls
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Dynamic Controls", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://the-internet.herokuapp.com/dynamic_controls')
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should find the checkbox", async function() {
        const checkboxForm = await driver.findElement(By.css("#checkbox-example"))
        const checkboxText = await checkboxForm.findElement(By.css("#checkbox")).getText()
        assert.equal(checkboxText, 'A checkbox')
    });

    it("should click the checkbox and confirm it is checked", async function() {
        const checkboxForm = await driver.findElement(By.css("#checkbox-example"))
        const checkbox = await checkboxForm.findElement(By.css("#checkbox input"))
        const actions = await driver.actions({async: true})
        await actions.click(checkbox).perform()
        assert.equal(await checkbox.getAttribute('checked'), 'true')
    });

    it("should click the remove button and confirm no checkbox exists", async function() {
        const checkboxForm = await driver.findElement(By.css("#checkbox-example"))
        const removeButton = await checkboxForm.findElement(By.css("button"))
        const actions = await driver.actions({async: true})
        await actions.click(removeButton).perform()
        await actions.pause(2000).perform()
        await assert.rejects(async () => {
            await driver.findElement(By.css("#checkbox-example #checkbox input"))
          }, {
            name: 'NoSuchElementError',
            message: 'no such element: Unable to locate element: {"method":"css selector","selector":"#checkbox-example #checkbox input"}\n' + '  (Session info: chrome=128.0.6613.84)'
          })
    });
});