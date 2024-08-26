// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/dynamic_controls
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Dynamic Controls Text", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://the-internet.herokuapp.com/dynamic_controls')
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should find the disabled text input", async function() {
        const textInputForm = await driver.findElement(By.css("#input-example"))
        const textInput = await textInputForm.findElement(By.css("input"))
        const textInputDisabled = await textInput.getAttribute('disabled')
        assert.equal(textInputDisabled, 'true')
    });

    it("should click the enable button", async function() {
        const textInputForm = await driver.findElement(By.css("#input-example"))
        const enableButton = await textInputForm.findElement(By.css("button"))
        const actions = await driver.actions({async: true})
        await actions.click(enableButton).perform()
        await actions.pause(2000).perform()
    });

    it("should confirm the input is enabled", async function() {
        const textInputForm = await driver.findElement(By.css("#input-example"))
        const textInput = await textInputForm.findElement(By.css("input"))
        const textInputDisabled = await textInput.getAttribute('disabled')
        assert.equal(textInputDisabled, null)
    });

    it("should type in the text input", async function() {
        const textInputForm = await driver.findElement(By.css("#input-example"))
        const textInput = await textInputForm.findElement(By.css("input"))
        const actions = await driver.actions({async: true})
        await actions.click(textInput).perform()
        await actions.sendKeys('Testing').perform()
    });

    it("should read the inputted text", async function() {
        const textInputForm = await driver.findElement(By.css("#input-example"))
        const textInputValue = await textInputForm.findElement(By.css("input")).getAttribute('value')
        assert.equal(textInputValue, 'Testing')
    });

});