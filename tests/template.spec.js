// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Checkboxes", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should", async function() {
        
    });
});