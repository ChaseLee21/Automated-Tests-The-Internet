// filename: add-remove-elements.spec.js
// https://the-internet.herokuapp.com/add_remove_elements/
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("JS Alerts", function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should add 5 elements, remove 3 elements, and check if 2 elements exists.", async function() {
    await driver.get("https://the-internet.herokuapp.com/add_remove_elements/");
    const content = await driver.findElement(By.id("content"))
    const addButton = await content.findElement(By.css("button"))
    for (let i = 0; i < 5; i++) {
        addButton.click();
    }
    const elements = await content.findElement(By.id("elements"))
    for (let i = 0; i < 3; i++) {
        await elements.findElement(By.css("button")).click();
    }
    const results = await elements.findElements(By.css("button"));
    assert(results.length == 2);
  });
});