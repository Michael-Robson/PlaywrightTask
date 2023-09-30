import { expect } from '@playwright/test'

/**
 * A class of common functions we might want to use in our tests
 */
class CommonSteps {
  constructor(page) {
    this.page = page
  }

  /**
   * Asserts the given text is found on the page - Sometimes the page isn't fully loaded so this will retry the given number of times
   * @param expected Text to find on page
   * @param maxRetries Number of times to retry default is 5
   * @param retryTimeout Milliseconds to wait between retries
   * @returns
   */
  async textOnPage(expected, maxRetries = 5, retryTimeout = 500) {
    let retries = 0
    while (retries < maxRetries) {
      const element = await this.page.evaluate(() => document.body.textContent)
      if (element && element.includes(expected)) {
        return
      }
      retries++
      await this.page.waitForTimeout(retryTimeout)
    }
    throw new Error(
      `Expected text "${expected}" not found on the page after ${maxRetries} retries`
    )
  }

  /**
   * Looks for a link with the passed in text value and clicks it
   */
  async clickLinkByText(linkText) {
    await this.page.locator(`a:text-is("${linkText}")`).click()
  }

  /**
   * Asserts the current page url matches the passed in value
   */
  async assertPageURL(expectedURL) {
    const current = this.page.url()
    expect(current).toContain(expectedURL)
  }
}

export { CommonSteps }
