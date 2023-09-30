import { expect, Page, Locator } from '@playwright/test'

class ForgotPasswordPage {
  private page: Page
  private url = '/forgot_password'
  private header!: Locator
  private expectedHeaderText = 'Forgot Password'
  private emailLabel!: Locator
  private expectedEmailLabel = 'E-mail'
  private emailInput!: Locator
  private submitButton!: Locator
  private submitButtonText!: Locator
  private expectedSubmitButtonText = 'Retrieve password'
  private apiRequest = 'https://the-internet.herokuapp.com/forgot_password'

  constructor(page: Page) {
    this.page = page
    this.header = this.page.locator('h2')
    this.emailLabel = this.page.locator("label[for='email']")
    this.emailInput = this.page.locator('input#email')
    this.submitButton = this.page.locator('button#form_submit')
    this.submitButtonText = this.page.locator('button#form_submit i')
  }

  /**
   * Visit the page
   */
  async visit(): Promise<void> {
    await this.page.goto(this.url)
  }

  /**
   * Assert the header is present
   */
  async assertHeaderPresent(): Promise<void> {
    await expect(this.header).toBeVisible()
  }

  /**
   * Assert the header text is correct
   */
  async assertHeaderTextCorrect(): Promise<void> {
    await expect(this.header).toHaveText(this.expectedHeaderText)
  }

  /**
   * Assert the email label is present
   */
  async assertEmailLabelPresent(): Promise<void> {
    await expect(this.emailLabel).toBeVisible()
  }

  /**
   * Assert the email label text is correct
   */
  async assertEmailLabelTextCorrect(): Promise<void> {
    await expect(this.emailLabel).toHaveText(this.expectedEmailLabel)
  }

  /**
   * Assert the email input field is present
   */
  async assertEmailInputPresent(): Promise<void> {
    await expect(this.emailInput).toBeVisible()
  }

  /**
   * Types the given value in the email field
   * @param text Text to enter into the field
   */
  async setEmail(text: string): Promise<void> {
    await this.emailInput.fill(text)
  }

  /**
   * Returns the value currently displayed in the email input field
   * @returns The value in the field
   */
  async getEmail(): Promise<string> {
    return this.emailInput.inputValue()
  }

  /**
   * Asserts the submit button is present
   */
  async assertSubmitButtonPresent(): Promise<void> {
    await expect(this.submitButton).toBeVisible()
  }

  /**
   * Asserts the submit button text is correct
   */
  async assertSubmitButtonnTextCorrect(): Promise<void> {
    await expect(this.submitButtonText).toHaveText(
      this.expectedSubmitButtonText
    )
  }

  /**
   * Clicks the submit button
   */
  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click()
  }

  /**
   * Accessor method to get API request value
   * @returns
   */
  public getApiRequest() {
    return this.apiRequest
  }

  /**
   * Accessor method to get URL value
   * @returns
   */
  public getURL() {
    return this.url
  }
}

export { ForgotPasswordPage }
