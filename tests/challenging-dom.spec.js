// filename: challenging-dom.spec.js
// https://the-internet.herokuapp.com/challenging_dom
const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");

describe("Challenging DOM", function() {

    beforeEach(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });
    
    afterEach(async function() {
    await driver.quit();
    });

    it("should load the page and check if the content div exists", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const content = await driver.findElement(By.css('#content'))
        assert.ok(content)
    });

    it("should locate and log the title", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const title = await driver.findElement(By.css('#content h3')).getText()
        console.log('Page title:', title);
        assert.strictEqual(title, 'Challenging DOM')
    });

    it("should locate the canvas element", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const canvas = driver.findElement(By.css('#content #canvas'))
        assert.ok(canvas)
    });
});