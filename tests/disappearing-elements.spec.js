// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/disappearing_elements
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Disappearing Elements", function() {
    let driver, expectedItems, foundItems;
    let gallery = false

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should refresh the page until the gallery nav link appears", async function() {
        await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
        expectedItems = ['Home', 'About', 'Contact Us', 'Portfolio', 'Gallery']

        for (let i = 0; i < 5; i++) {
        const elements = await driver.findElements(By.css("ul li a"));
        foundItems = await Promise.all(elements.map(async (element) => await element.getText()));

        if (expectedItems.every(el => foundItems.includes(el))) {
            break;
        }

        // Refresh the page to try again
        await driver.navigate().refresh();
        }

        console.log("Found elements:", foundItems);
        assert(expectedItems.every(el => foundItems.includes(el)), "Not all expected elements were found");
    });
});