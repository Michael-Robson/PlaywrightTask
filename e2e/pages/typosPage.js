import { expect } from '@playwright/test'

class TyposPage {
  constructor(page) {
    this.page = page
    this.url = '/typos'
    this.header = page.locator('h3')
    this.expectedHeader = 'Typos'
    this.instructions = page.locator('p').first()
    this.expectedInstructions =
      'This example demonstrates a typo being introduced. It does it randomly on each page load.'
    this.message = page.locator('p').nth(1)
    this.expectedMessage = "Sometimes you'll see a typo, other times you won't."
  }

  /**
   * Visit the typos page
   */
  async visit() {
    await this.page.goto(this.url)
  }

  /**
   * Assert we have a header
   */
  async assertHeaderPresent() {
    await expect(this.header).toBeVisible()
  }

  /**
   * Assert the header text is correct
   */
  async assertHeaderTextIsCorrect() {
    await expect(this.header).toHaveText(this.expectedHeader)
  }

  /**
   * Assert the instructions are present
   */
  async assertInstructionsPresent() {
    await expect(this.instructions).toBeVisible()
  }

  /**
   * Assert the instructions text is correct
   */
  async assertInstructionsTextIsCorrect() {
    await expect(this.instructions).toHaveText(this.expectedInstructions)
  }

  /**
   * Assert we have a message
   */
  async assertMessagePresent() {
    await expect(this.message).toBeVisible()
  }

  /**
   * Assert the message is what we expect
   */
  async assertMessageTextIsCorrect() {
    await expect(this.message).toHaveText(this.expectedMessage)
  }

  /**
   * The message is dynamic and introduces a typo, refresh the page until we get the correct message
   * Keeps trying for the number of retries provided to the function
   * @param {*} retries
   */
  async refreshUntilMessageTextIsCorrect(retries) {
    const expectedMessage = this.expectedMessage.trim()
    let message = await this.message.textContent()
    let matched = false
    for (let x = 0; x < retries; x++) {
      if (message.trim() === expectedMessage) {
        matched = true
        break
      } else {
        await this.page.reload()
        message = await this.message.textContent()
      }
    }
    const errorMessage = `We didn't get a match after ${retries} attempts.`
    await expect(matched, errorMessage).toBeTruthy()
  }
}

export { TyposPage }
