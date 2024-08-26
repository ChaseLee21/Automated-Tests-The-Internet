// filename: placeholder.spec.js
// https://the-internet.herokuapp.com/drag_and_drop
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
        await driver.get('https://the-internet.herokuapp.com/drag_and_drop')
        const expectedOrder = ['A', 'B']
        const elements = await driver.findElements(By.css('#content #columns .column'))
        const foundOrder = await Promise.all(elements.map(async (element) => element.getText()))
        assert.deepStrictEqual(expectedOrder, foundOrder)
    });

    it("should drag box A to be on the right of box B", async function() {
        await driver.get('https://the-internet.herokuapp.com/drag_and_drop')

        // drag box A to location of box B
        const boxA = await driver.findElement(By.css('#content #columns #column-a'))
        const boxB = await driver.findElement(By.css('#content #columns #column-b'))
        const actions = driver.actions({async: true})
        await actions.dragAndDrop(boxA, boxB).perform()

        // confirm box order
        const expectedOrder = ['B', 'A']
        const elements = await driver.findElements(By.css('#content #columns .column'))
        const foundOrder = await Promise.all(elements.map(async (element) => element.getText()))
        assert.deepStrictEqual(expectedOrder, foundOrder)
    });
});