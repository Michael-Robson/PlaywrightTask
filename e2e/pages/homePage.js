import { expect } from '@playwright/test'
import { links } from '../test-data/homePageLinks.json'

class HomePage {
  constructor(page) {
    this.page = page
    this.url = '/'
    this.header = page.locator("h1[class='heading']")
    this.subheading = page.locator('h2')
    this.allLinks = page.locator('ul li a')
  }

  /**
   * Navigates to the home page
   */
  async visit() {
    await this.page.goto(this.url)
  }

  /**
   * Asserts the header is visible on the screen
   */
  async assertHeaderPresent() {
    await expect(this.header).toBeVisible()
  }

  /**
   * Assert the header text is the same as the passed value
   * @param {*} expected The value we expect the header to have
   */
  async assertHeaderText(expected) {
    await expect(this.header).toHaveText(expected)
  }

  /**
   * Asserts the subheading is visible on the screen
   */
  async assertSubheadingPresent() {
    await expect(this.subheading).toBeVisible()
  }

  /**
   * Assert the subheading text is the same as the passed value
   * @param {*} expected The value we expect the subheading to have
   */
  async assertSubheadingText(expected) {
    await expect(this.subheading).toHaveText(expected)
  }

  /**
   * Assert we have the expected number of links on the page
   * @param {*} expected Number of links to expect
   */
  async assertNumberOfLinks(expected) {
    const count = await this.allLinks.count()
    await expect(count).toEqual(expected)
  }

  /**
   * Reads the list of links from the homePageLinks.json
   * Loops through each link and checks we have a link on the page with that text and href
   */
  async assertLinksAreCorrect() {
    // Loops through the import json file which is an array of objects
    // The array is called links and each object contains text and a href
    links.forEach(async (_item, index) => {
      // Get the element with the linktext from the json file
      const link = this.page.locator(`a:text-is("${links[index].text}")`)
      console.log('Current link: ' + link)

      // Get the href of the current link
      const href = await link.getAttribute('href')
      console.log('Current href: ' + href)

      // Expect the href matches the one we have in the json file
      expect(
        href,
        'Failed to match found: ' + href + ' expected: ' + links[index].href
      ).toEqual(links[index].href)
    })
  }
}

export { HomePage }
