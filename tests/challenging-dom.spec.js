// filename: challenging-dom.spec.js
// https://the-internet.herokuapp.com/challenging_dom
const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");

describe("Challenging DOM", function() {

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });
    
    this.afterAll(async function() {
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
        const canvas = await driver.findElement(By.css('#content #canvas'))
        assert.ok(canvas)
    });

    it("should locate the table element", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const table = await driver.findElement(By.css('#content table'))
        assert.ok(table)
    });

    it("should locate and log the elements in the 6th row of the table", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const row = await driver.findElements(By.css('#content table tbody tr:nth-child(6) td'))
        for (let e of row) {
            console.log(await e.getText());
        }
        assert.ok(row)
    });

    it("should locate and log the elements in the 4th column of the table", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const tbody = await driver.findElements(By.css('#content table tbody tr'))
        for (let row of tbody) {
            let col = await row.findElement(By.css('td:nth-child(4)'))
            console.log(await col.getText());
            assert.ok(col)
        }
    });

    it("should locate and log the button elements on the left side of the page", async function() {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom')
        const buttons = await driver.findElements(By.css('#content .large-2 a'))
        for (let button of buttons) {
            console.log(await button.getText());
        }
        assert.ok(buttons)
    });
});