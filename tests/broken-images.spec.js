// filename: broken-images.spec.js
// https://the-internet.herokuapp.com/broken_images
// This test checks for broken images found at the above URL by doing the following.
// 1. locating the src url of each image on the page
// 2. loading the image src url in a new window
// 3. checking if the title of the new window is empty (the title should be the name of the image)
// 4. if the title is empty, the image src url is added to the results array
// 5. the results array is logged to the console
const assert = require("assert");
const { Builder, By, Key } = require("selenium-webdriver");

describe("Broken Images", function() {
  let driver, result;
  let results = [];
  let urlArray = [];

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should locate any broken images and log them", async function() {
    //Navigate to the page and store the original window handle
    const originalWindow = await driver.get("https://the-internet.herokuapp.com/broken_images");

    //Check we don't have other windows open already
    assert((await driver.getAllWindowHandles()).length === 1);

    //Pause for 2 seconds to allow the page to load & switch to the main window
    driver.actions().pause(1500).perform();
    driver.switchTo().window(originalWindow);

    //Find the content div and all images we want to check within it
    const images = await driver.findElement(By.id("content")).findElements(By.css("img"))

    //Loop through each image and generate an array of image urls to check
    for (let i = 0; i < images.length; i++) {
        try {
            urlArray.push(images[i].getAttribute("src"));
        } catch (error) {
            console.log(error);
        }
    }

    //Check each image url for a title. If no title is found, add the url to the results array
    for (let i = 0; i < images.length; i++) {
        try {
            await driver.get(urlArray[i]);
            result = await driver.getTitle();
            if (!result) {
                results.push(await urlArray[i]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log('The following image urls are broken: ', results);
  });
});