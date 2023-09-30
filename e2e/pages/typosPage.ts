import { expect, Page, Locator } from '@playwright/test'

class TyposPage {
  private page: Page
  private url = '/typos'
  private header!: Locator
  private expectedHeader = 'Typos'
  private instructions!: Locator
  private expectedInstructions =
    'This example demonstrates a typo being introduced. It does it randomly on each page load.'
  private message!: Locator
  private expectedMessage =
    "Sometimes you'll see a typo, other times you won't."

  constructor(page: Page) {
    this.page = page
    this.header = this.page.locator('h3')
    this.instructions = this.page.locator('p').first()
    this.message = this.page.locator('p').nth(1)
  }

  /**
   * Visit the typos page
   */
  async visit(): Promise<void> {
    await this.page.goto(this.url)
  }

  /**
   * Assert we have a header
   */
  async assertHeaderPresent(): Promise<void> {
    await expect(this.header).toBeVisible()
  }

  /**
   * Assert the header text is correct
   */
  async assertHeaderTextIsCorrect(): Promise<void> {
    await expect(this.header).toHaveText(this.expectedHeader)
  }

  /**
   * Assert the instructions are present
   */
  async assertInstructionsPresent(): Promise<void> {
    await expect(this.instructions).toBeVisible()
  }

  /**
   * Assert the instructions text is correct
   */
  async assertInstructionsTextIsCorrect(): Promise<void> {
    await expect(this.instructions).toHaveText(this.expectedInstructions)
  }

  /**
   * Assert we have a message
   */
  async assertMessagePresent(): Promise<void> {
    await expect(this.message).toBeVisible()
  }

  /**
   * Assert the message is what we expect
   */
  async assertMessageTextIsCorrect(): Promise<void> {
    await expect(this.message).toHaveText(this.expectedMessage)
  }

  /**
   * The message is dynamic and introduces a typo, refresh the page until we get the correct message
   * Keeps trying for the number of retries provided to the function
   * @param retries Number of retries
   */
  async refreshUntilMessageTextIsCorrect(retries: number): Promise<void> {
    const expectedMessage = this.expectedMessage.trim()
    let message = await this.message?.textContent() // Add a null check with '?'
    let matched = false
    for (let x = 0; x < retries; x++) {
      if (message?.trim() === expectedMessage) {
        // Add a null check with '?'
        matched = true
        break
      } else {
        await this.page.reload()
        message = await this.message?.textContent() // Add a null check with '?'
      }
    }
    const errorMessage = `We didn't get a match after ${retries} attempts.`
    await expect(matched, errorMessage).toBeTruthy()
  }
}

export { TyposPage }
