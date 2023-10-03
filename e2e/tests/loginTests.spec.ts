import { expect, test } from '@playwright/test'
import { LoginPage, LoginType } from '../pages/loginPage'
import { EmailLoginPage } from '../pages/loginByEmailPage'
import { CommonSteps } from '../common-steps'
import { invalid_accounts } from '../test-data/invalidAccounts.json'

// Log the test name and visit the login page
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  const loginPage = new LoginPage(page)
  await loginPage.visit()
})

test('Assert the login page looks correct', async ({ page, isMobile }) => {
  // Set up page object and common steps class
  const loginPage = new LoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Assert we are on the login page
  await commonSteps.assertPageURL('/login')

  // Assert the page title is correct
  await commonSteps.assertPageTitle('Cypress.io')

  // Assert the left section of the page is present
  await loginPage.assertLeftSectionPresent()

  // Assert the right section of the page is present - only on desktop
  if (!isMobile) {
    await loginPage.assertRightSectionPresent()
  }

  // Check the Cypress logo is present - depending if desktop or mobile we have different images
  if (isMobile) {
    // Assert the mobile Cypress logo is present
    await loginPage.assertMobileCypressLogoPresent()
  } else {
    // Assert the desktop Cypress logo is present
    await loginPage.assertDesktopCypressLogoPresent()
  }

  // Assert the log in text element is present
  await loginPage.assertLoginTextPresent()

  // Assert the text of the login element is correct
  await loginPage.assertLoginTextCorrect()

  // Assert the sign up section is present
  await loginPage.assertSignUpLinkPresent()

  // Assert the cancel link is present
  await loginPage.assertCancelLinkPresent()

  // Assert the github login button is present
  await loginPage.assertLoginButtonPresent(LoginType.Github)

  // Assert the google login button is present
  await loginPage.assertLoginButtonPresent(LoginType.Google)

  // Assert the SSO login button is present
  await loginPage.assertLoginButtonPresent(LoginType.SSO)

  // Assert the email login button is present
  await loginPage.assertLoginButtonPresent(LoginType.Email)
})

test('Assert Sign up link takes us to the correct page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Click sign up link
  await loginPage.clickSignUpLink()

  // Assert URL
  await commonSteps.assertPageURL('/signup')

  // Assert we have "Sign up" text on the page
  await commonSteps.textOnPage('Sign up')

  // Assert the github sign up button is present
  await loginPage.assertLoginButtonPresent(LoginType.Github)

  // Assert the google sign up button is present
  await loginPage.assertLoginButtonPresent(LoginType.Google)

  // Assert the email sign up button is present
  await loginPage.assertLoginButtonPresent(LoginType.Email)

  // Assert we have "Already have an account?" text on the page
  await commonSteps.textOnPage('Already have an account?')

  // Click the log in link
  await commonSteps.clickLinkByText('Log in')

  // Assert URL
  await commonSteps.assertPageURL('/login')
})

test('Assert each login button redirects to correct page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Click the login with Github button assert we are taken to the correct site then go back to the login screen
  await loginPage.clickLoginButton(LoginType.Github)
  await commonSteps.assertPageURL('github.com')
  await loginPage.visit()

  // Click the login with Google button assert we are taken to the correct site then go back to the login screen
  await loginPage.clickLoginButton(LoginType.Google)
  await commonSteps.assertPageURL('accounts.google.com')
  await loginPage.visit()

  // Click the login with SSO button assert we are taken to the correct site then go back to the login screen
  await loginPage.clickLoginButton(LoginType.SSO)
  await commonSteps.assertPageURL('/login/sso')
  await loginPage.visit()

  // Click the login with email button assert we are taken to the correct site
  await loginPage.clickLoginButton(LoginType.Email)
  await commonSteps.assertPageURL('/login/email')
})

test('Assert each sign up button redirects to correct page', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Click sign up link
  await loginPage.clickSignUpLink()

  // Assert URL
  await commonSteps.assertPageURL('/signup')

  // Click the sign up with Github button, assert we are taken to the correct page then go back to the login screen and click the sign up link
  await loginPage.clickLoginButton(LoginType.Github)
  await commonSteps.assertPageURL('github.com')
  await loginPage.visit()
  await loginPage.clickSignUpLink()

  // Click the sign up with Google button, assert we are taken to the correct page then go back to the login screen and click the sign up link
  await loginPage.clickLoginButton(LoginType.Google)
  await commonSteps.assertPageURL('accounts.google.com')
  await loginPage.visit()
  await loginPage.clickSignUpLink()

  // Click the sign up with email button, assert we are taken to the correct page
  await loginPage.clickLoginButton(LoginType.Email)
  await commonSteps.assertPageURL('/signup/email')
})

test('Visual Regression Tests', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Assert we are on the login page
  await commonSteps.assertPageURL('/login')

  // Add visual comparison test so we can test if any visual regression occures between builds
  await expect(page).toHaveScreenshot('LoginPage.png')

  // Click sign up link
  await loginPage.clickSignUpLink()

  // Assert URL
  await commonSteps.assertPageURL('/signup')

  // Add visual comparison test so we can test if any visual regression occures between builds
  await expect(page).toHaveScreenshot('SignUpPage.png')
})

test('Assert the API message when invalid details are entered via email login', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  const emailLoginPage = new EmailLoginPage(page)
  const commonSteps = new CommonSteps(page)

  // Click the login with email button
  await loginPage.clickLoginButton(LoginType.Email)
  await commonSteps.assertPageURL('/login/email')

  // Loop through all of our invalid accounts we have in and e2e\test-data\invalidAccounts.json and test they all return the expected API error message
  for (const account of invalid_accounts) {
    // Enter account email and password and save the response message
    const apiResponse = await emailLoginPage.loginAndFetchApiResponseMessage(
      account.email,
      account.password
    )

    console.log('The message is ' + apiResponse + 'for ' + account.email)
    expect(apiResponse).toBe(
      '{"message":"Incorrect email address or password"}'
    )
  }
})
