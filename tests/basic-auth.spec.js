// filename: basic-auth.spec.js
// https://the-internet.herokuapp.com/basic_auth
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Basic Authentication", function() {
  let driver, username, password, message;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should authenticate my session", async function() {
    username = "admin";
    password = "admin";
    await driver.get(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);
    message = await driver.findElement(By.css("p")).getText();
    assert(message.includes("Congratulations! You must have the proper credentials."));
  });
});