// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/context_menu
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Context Menu", function() {
    let driver, menu, alert, alertText;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should right click the context menu and read the text of the alert popup", async function() {
        await driver.get('https://the-internet.herokuapp.com/context_menu')
        const actions = driver.actions({ async: true })
        menu = await driver.findElement(By.css('#content #hot-spot'))
        assert.ok(menu)
        await actions.contextClick(menu).perform()
        alert = await driver.switchTo().alert()
        alertText = await alert.getText()
        console.logalertText
        assert.equal(alertText, 'You selected a context menu')
    });
});