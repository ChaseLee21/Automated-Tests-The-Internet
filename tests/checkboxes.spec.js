// filename: checkboxes.spec.js
// https://the-internet.herokuapp.com/checkboxes
const assert = require("assert")
const { Builder, By, Key } = require("selenium-webdriver")

describe("Checkboxes", function() {
    let driver, form, checkboxes;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build()
    });

    this.afterAll(async function() {
        await driver.quit()
    });

    it("should locate two checkboxes within a form element", async function() {
        await driver.get('https://the-internet.herokuapp.com/checkboxes')
        form = await driver.findElement(By.css('#content #checkboxes'))
        assert.ok(form)
        checkboxes = await form.findElements(By.css('input'))
        assert.equal(checkboxes.length, 2, `Found ${checkboxes.length} inputs, expected 2.`)
    });
});