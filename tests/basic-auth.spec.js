// filename: basic-auth.spec.js
// https://the-internet.herokuapp.com/basic_auth
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Basic Authentication", function() {
  let driver, alert, message;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should authenticate my session", async function() {
    await driver.get("https://the-internet.herokuapp.com/basic_auth");
    alert = await driver.switchTo().alert()
    await alert.authenticateAs("admin", "admin");
    message = await driver.findElement(By.css("p")).getText();
    console.log(message);
    assert(message.includes("Congratulations! You must have the proper credentials."));
  });
});