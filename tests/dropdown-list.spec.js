// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/dropdown
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver");

describe("Dropdown List", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://the-internet.herokuapp.com/dropdown')
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should find 3 select options", async function() {
        // Method 1
        const selectElement = await driver.findElement(By.css('#content #dropdown'))
        const optionElements = await selectElement.findElements(By.css('option'))

        // Method 2
        const select = await new Select(selectElement)
        const options = await select.getOptions()

        // Compare
        assert.equal(optionElements.length, options.length)
        assert.equal(optionElements.length, 3)
        assert.equal(options.length, 3)
    });

    it("should select option 1 and option 2", async function() {
        const selectElement = await driver.findElement(By.css('#content #dropdown'))
        const select = await new Select(selectElement)

        const option1 = await selectElement.findElement(By.css("option[value='1']"))
        const option2 = await selectElement.findElement(By.css("option[value='2']"))

        await select.selectByValue('1')
        assert.equal(true, await option1.isSelected())
        await select.selectByValue('2')
        assert.equal(true, await option2.isSelected())
    });

    it("should try selecting the disabled option", async function() {
        const selectElement = await driver.findElement(By.css('#content #dropdown'))
        const select = await new Select(selectElement)

        await assert.rejects(async () => {
            await select.selectByVisibleText("Please select an option")
          }, {
            name: 'UnsupportedOperationError',
            message: 'You may not select a disabled option'
          })
        
    });
});