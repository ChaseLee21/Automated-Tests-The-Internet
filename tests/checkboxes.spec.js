// filename: checkboxes.spec.js
// https://the-internet.herokuapp.com/checkboxes
const assert = require("assert")
const { Builder, By, Key } = require("selenium-webdriver")

describe("Checkboxes", function() {
    let driver, form, checkboxes, checkbox, checked;

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

    it("should read the value of each checkbox", async function() {
        for (let i = 0; i < checkboxes.length; i++) {
            checkbox = checkboxes[i]
            checked = await checkbox.getAttribute('checked')
            console.log(`Checkbox ${i + 1} value: ${checked}`)
            if (i===0) assert.equal(checked, null) 
            else assert.equal(checked, 'true')
        }
    });

    it("should check each unchecked box and confirm all are checked", async function() {
        checkbox, checked = undefined
        for (let i = 0; i < checkboxes.length; i++) {
            checkbox = checkboxes[i]
            checked = await checkbox.getAttribute('checked')
            if (!checked) checkbox.click()
            checked = await checkbox.getAttribute('checked')
            assert.equal(checked, 'true')
        }
    });

    it("should uncheck each checked box and confirm all are unchecked", async function() {
        checkbox, checked = undefined
        for (let i = 0; i < checkboxes.length; i++) {
            checkbox = checkboxes[i]
            checked = await checkbox.getAttribute('checked')
            if (checked) checkbox.click()
            checked = await checkbox.getAttribute('checked')
            assert.equal(checked, null || undefined)
        }
    });
});