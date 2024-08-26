// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Drag and Drop", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should confirm box A and box B are in order", async function() {
        
    });

    it("should drag box A to be on the right of box B", async function() {
        
    });
});