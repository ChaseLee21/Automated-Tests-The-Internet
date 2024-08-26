// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/dropdown
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Dropdown List", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should select option 1 and confirm the value of the select dropdown element is 1", async function() {
        
    });

    it("should select option 2 and confirm the value of the select dropdown element is 2", async function() {
        
    });

    it("should attempt to select the disabled option and confirm the value of the select dropdown element is still 2", async function() {
        
    });
});