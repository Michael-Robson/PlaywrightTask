import { expect, Page, Locator } from '@playwright/test'

/**
 * Enum to be used for the different ways we can log in / sign up to https://cloud.cypress.io/
 */
enum LoginType {
  Github = 'gitHubLogin',
  Google = 'googleLogin',
  SSO = 'ssoLogin',
  Email = 'emailLogin',
}

/**
 * Class page object for the login page
 */
class LoginPage {
  private page: Page
  private url = '/login'
  private leftSection!: Locator
  private rightSection!: Locator
  private desktopCypressLogo!: Locator
  private mobileCypressLogo!: Locator
  private loginText!: Locator
  private expectedLoginText = 'Log in'
  private signUpLink!: Locator
  private cancelLink!: Locator
  private gitHubLoginButton!: Locator
  private googleLoginButton!: Locator
  private ssoLoginButton!: Locator
  private emailLoginButton!: Locator

  /**
   * Initialise page and selectors
   * @param page
   */
  constructor(page: Page) {
    this.page = page
    this.leftSection = this.page.locator("div[class='login-left']")
    this.rightSection = this.page.locator("div[class='login-right']")
    this.desktopCypressLogo = this.page.locator(
      "div[class='login-img-wrapper'] img[src='/img/cypress-logo.svg']"
    )
    this.mobileCypressLogo = this.page.locator(
      "div[class='login-img-wrapper'] img[src='/img/cypress-logo-light-bg.svg']"
    )
    this.loginText = this.page.locator('legend')
    this.signUpLink = this.page.locator('p.sign-up-link')
    this.cancelLink = this.page.locator("a[href='/login']")
    this.gitHubLoginButton = this.page.locator(
      "button[class='btn btn-login btn-provider btn-provider-github btn-block']"
    )
    this.googleLoginButton = this.page.locator(
      "button[class='btn btn-login btn-provider btn-provider-google btn-block']"
    )
    this.ssoLoginButton = this.page.locator(
      "button[class='btn btn-login btn-provider btn-provider-sso btn-block']"
    )
    this.emailLoginButton = this.page.locator(
      "button[class='btn btn-login btn-provider btn-provider-email btn-block']"
    )
  }

  /**
   * Navigates to the login page
   */
  async visit() {
    await this.page.goto(this.url)
  }

  /**
   * Asserts the left section is visible on the screen
   */
  async assertLeftSectionPresent() {
    await expect(this.leftSection).toBeVisible()
  }

  /**
   * Asserts the right section is visible on the screen
   */
  async assertRightSectionPresent() {
    await expect(this.rightSection).toBeVisible()
  }

  /**
   * Asserts the cypress logo is visible on the screen
   */
  async assertCypressLogoPresent() {
    // The page is responsive we actually have two of these images on the screen so check for both
    const logoCount = await this.desktopCypressLogo.count()

    for (let i = 0; i < logoCount; i++) {
      const logo = this.desktopCypressLogo.nth(i)
      await expect(logo).toBeVisible()
    }
  }

  /**
   * Assert the desktop cypress logo is visible
   */
  async assertDesktopCypressLogoPresent() {
    await expect(this.desktopCypressLogo).toBeVisible()
  }

  /**
   * Assert the mobile cypress logo is visible
   */
  async assertMobileCypressLogoPresent() {
    await expect(this.mobileCypressLogo).toBeVisible()
  }

  /**
   * Asserts the login text is visible on the screen
   */
  async assertLoginTextPresent() {
    await expect(this.loginText).toBeVisible()
  }

  /**
   * Assert the login text is as expected
   */
  async assertLoginTextCorrect() {
    await expect(this.loginText).toHaveText(this.expectedLoginText)
  }

  /**
   * Asserts the sign up link is visible on the screen
   */
  async assertSignUpLinkPresent() {
    await expect(this.signUpLink).toBeVisible()
  }

  /**
   * Asserts the cancel link is visible on the screen
   */
  async assertCancelLinkPresent() {
    await expect(this.cancelLink).toBeVisible()
  }

  /**
   * Asserts the given login type button is present on the screen
   * @param loginType
   */
  async assertLoginButtonPresent(loginType: LoginType) {
    switch (loginType) {
      case LoginType.Github:
        await expect(this.gitHubLoginButton).toBeVisible()
        break
      case LoginType.Google:
        await expect(this.googleLoginButton).toBeVisible()
        break
      case LoginType.SSO:
        await expect(this.ssoLoginButton).toBeVisible()
        break
      case LoginType.Email:
        await expect(this.emailLoginButton).toBeVisible()
        break
      default:
        throw new Error('Invalid login type')
    }
  }

  /**
   * Clicks the given login type button based on the enum provided
   * @param loginType
   */
  async clickLoginButton(loginType: LoginType) {
    switch (loginType) {
      case LoginType.Github:
        await this.gitHubLoginButton.click()
        break
      case LoginType.Google:
        await this.googleLoginButton.click()
        break
      case LoginType.SSO:
        await this.ssoLoginButton.click()
        break
      case LoginType.Email:
        await this.emailLoginButton.click()
        break
      default:
        throw new Error('Invalid login type')
    }
  }

  /**
   * Clicks the sign up link
   */
  async clickSignUpLink() {
    await this.signUpLink.locator('a').click()
  }

  /**
   * Clicks the cancel link
   */
  async clickCancelLink() {
    await this.cancelLink.click()
  }
}

// Exports the class and the enum
export { LoginPage, LoginType }
