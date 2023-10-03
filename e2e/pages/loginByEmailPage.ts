import { expect, Page, Locator } from '@playwright/test'

/**
 * Page object modal for the login by email page https://cloud.cypress.io/login/email
 * I would eventually create a page object for every login page and add more functions to them
 */
class EmailLoginPage {
  private page: Page
  private url = '/login/email'
  private loginForm!: Locator
  private emailField!: Locator
  private passwordField!: Locator
  private loginButton!: Locator

  /**
   * Initialise page and selectors
   * @param page
   */
  constructor(page: Page) {
    this.page = page
    this.loginForm = this.page.locator('form#email-login')
    this.emailField = this.page.locator('input#email')
    this.passwordField = this.page.locator('input#password')
    this.loginButton = this.page.locator("button[type='submit']")
  }

  /**
   * Navigates to the login by email page
   */
  async visit() {
    await this.page.goto(this.url)
  }

  /**
   * Asserts the login form is present
   */
  async assertLoginFormPresent() {
    await expect(this.loginForm).toBeVisible()
  }

  /**
   * Asserts the email field is present
   */
  async assertEmailFieldPresent() {
    await expect(this.emailField).toBeVisible()
  }

  /**
   * Asserts the password field is present
   */
  async assertPasswordFieldPresent() {
    await expect(this.passwordField).toBeVisible()
  }

  /**
   * Asserts the login button is present
   */
  async assertLoginButtonPresent() {
    await expect(this.loginButton).toBeVisible()
  }

  /**
   * Sets the email address field
   * @param email String to send to the email field
   */
  async setEmailField(email: string) {
    await this.emailField.fill(email)
  }

  /**
   * Returns the email address field value
   * @returns String of the current value in the email field
   */
  async getEmailFieldValue() {
    return await this.emailField.inputValue()
  }

  /**
   * Sets the password field
   * @param password String to send to the password field
   */
  async setPasswordField(password: string) {
    await this.passwordField.fill(password)
  }

  /**
   * Returns the password field value
   * @returns String of the current value in the password field
   */
  async getPasswordFieldValue() {
    return await this.passwordField.inputValue()
  }

  /**
   * Clicks the login button
   */
  async clickSubmitButton() {
    await this.loginButton.click()
  }

  /**
   * Fills in the login form and returns the api message
   * @param email Email to set
   * @param password Password to set
   * @returns String of the API response message
   */
  async loginAndFetchApiResponseMessage(email: string, password: string) {
    // Set the email field
    await this.setEmailField(email)

    // Set the password field
    await this.setPasswordField(password)

    // Click the submit button
    await this.clickSubmitButton()

    // Wait for the api response and store it
    const response = await this.page.waitForResponse(
      'https://authenticate.cypress.io/login/local?source=dashboard'
    )

    // Get the response message
    const responseBody = await response.text()

    // Return the message
    return responseBody
  }
}

// Exports the page object
export { EmailLoginPage }
