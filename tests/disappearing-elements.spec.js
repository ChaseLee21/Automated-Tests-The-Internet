// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/disappearing_elements
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Checkboxes", function() {
    let driver, listItems, itemText;
    let gallery = false

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should refresh the page until the gallery nav link appears", async function() {
        while (!gallery) {
            await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
            listItems = await driver.findElements(By.css('#content li'))
            assert.ok(listItems)
            for (let item of listItems) {
                itemText = await item.getText()
                assert.ok(itemText)
                if (itemText === 'Gallery') {
                    gallery = true
                    assert.equal(itemText, 'Gallery')
                }
            }
        }
    });
});