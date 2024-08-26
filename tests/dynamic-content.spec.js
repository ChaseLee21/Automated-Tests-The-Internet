// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/dynamic_content
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Dynamic Content", function() {
    let driver;

    this.beforeAll(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://the-internet.herokuapp.com/dynamic_content')
    });

    this.afterAll(async function() {
        await driver.quit();
    });

    it("should find 3 div elements that contain a paragraph of text", async function() {
        const containerElement = await driver.findElement(By.css('.large-centered'))
        const paragraphs = await containerElement.findElements(By.css('.large-10'))
        assert.equal(paragraphs.length, 3)

        for (let i = 0; i < 3; i++) {
            let paragraph = await paragraphs[i].getText()
            assert.ok(paragraph.length > 20)
        }
    });

    it("should find 3 images with valid src attributes", async function() {
        const containerElement = await driver.findElement(By.css('.large-centered'))
        const images = await containerElement.findElements(By.css('.large-2 img'))

        // Retrieving src attributes
        let urlArray = [];
        for (let i = 0; i < 3; i++) {
            urlArray.push(await images[i].getAttribute('src'))
        }
        assert.equal(urlArray.length, 3)

        // Checking for invalid src attributes
        for (let url of urlArray) {
            await driver.get(url)
            assert.ok(await driver.getTitle())
        }
        
    });
});