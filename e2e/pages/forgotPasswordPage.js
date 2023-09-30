import { expect } from '@playwright/test'

class ForgotPasswordPage {
  constructor(page) {
    this.page = page
    this.url = '/forgot_password'
    this.header = page.locator('h2')
    this.expectedHeaderText = 'Forgot Password'
    this.emailLabel = page.locator("label[for='email']")
    this.expectedEmailLabel = 'E-mail'
    this.emailInput = page.locator('input#email')
    this.submitButton = page.locator('button#form_submit')
    this.submitButtonText = page.locator('button#form_submit i')
    this.expectedSubmitButtonText = 'Retrieve password'
    this.apiRequest = 'https://the-internet.herokuapp.com/forgot_password'
  }

  /**
   * Visit the page
   */
  async visit() {
    await this.page.goto(this.url)
  }

  /**
   * Assert the header is present
   */
  async assertHeaderPresent() {
    await expect(this.header).toBeVisible()
  }

  /**
   * Assert the header text is correct
   */
  async assertHeaderTextCorrect() {
    await expect(this.header).toHaveText(this.expectedHeaderText)
  }

  /**
   * Assert the email label is present
   */
  async assertEmailLabelPresent() {
    await expect(this.emailLabel).toBeVisible()
  }

  /**
   * Assert the email label text is correct
   */
  async assertEmailLabelTextCorrect() {
    await expect(this.emailLabel).toHaveText(this.expectedEmailLabel)
  }

  /**
   * Assert the email input field is present
   */
  async assertEmailInputPresent() {
    await expect(this.emailInput).toBeVisible()
  }

  /**
   * Types the given value in the email field
   * @param {any} text to enter into the field
   */
  async setEmail(text) {
    await this.emailInput.fill(text)
  }

  /**
   * Returns the value currently displayed in the email input field
   * @returns The value in the field
   */
  async getEmail() {
    // Returns the current value of an input field
    return this.emailInput.inputValue()
  }

  /**
   * Asserts the submit button is present
   */
  async assertSubmitButtonPresent() {
    await expect(this.submitButton).toBeVisible()
  }

  /**
   * Asserts the submit button text is correct
   */
  async assertSubmitButtnTextCorrect() {
    await expect(this.submitButtonText).toHaveText(
      this.expectedSubmitButtonText
    )
  }

  /**
   * Clicks the submit button
   */
  async clickSubmitButton() {
    await this.submitButton.click()
  }
}

export { ForgotPasswordPage }
