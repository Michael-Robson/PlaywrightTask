import { expect, test } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { ForgotPasswordPage } from '../pages/forgotPasswordPage'
import { CommonSteps } from '../common-steps'

// Log the test name create page instances
test.beforeEach(async ({}, testInfo) => {
  console.log(`Running ${testInfo.title}`)
})

test('Navigate to forgot password screen via homepage', async ({ page }) => {
  const homePage = new HomePage(page)
  const forgotPasswordPage = new ForgotPasswordPage(page)
  const commonSteps = new CommonSteps(page)

  // Visit the home page
  await homePage.visit()

  // Click link by text - custom command
  await commonSteps.clickLinkByText('Forgot Password')

  // Assert we are on the correct URL
  await commonSteps.assertPageURL(forgotPasswordPage.url)
})

test('Assert forgot password screen looks correct', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page)

  // Go direct to the forgot password page
  await forgotPasswordPage.visit()

  // Assert the header is present
  await forgotPasswordPage.assertHeaderPresent()

  // Assert the text is correct
  await forgotPasswordPage.assertHeaderTextCorrect()

  // Assert the email label is present
  await forgotPasswordPage.assertEmailLabelPresent()

  // Assert the email label is correct
  await forgotPasswordPage.assertEmailLabelTextCorrect()

  // Assert the email input field is present
  await forgotPasswordPage.assertEmailInputPresent()

  // Assert the email field is empty
  let emailField = await forgotPasswordPage.getEmail()
  expect(emailField).toBe('')

  // Set the email field
  const emailUsed = 'hello@world.com'
  await forgotPasswordPage.setEmail(emailUsed)

  // Assert the email field now contains the email we typed
  emailField = await forgotPasswordPage.getEmail()
  expect(emailField).toEqual(emailUsed)

  // Assert the submit button is present
  await forgotPasswordPage.assertSubmitButtonPresent()

  // Assert the submit button text is correct
  await forgotPasswordPage.assertSubmitButtnTextCorrect()
})

test('Submit a request and check the API returns a 500', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page)

  // Go direct to the forgot password page
  await forgotPasswordPage.visit()

  // Enter an email
  const emailUsed = 'hello@world.com'
  await forgotPasswordPage.setEmail(emailUsed)

  // Start waiting the response https://playwright.dev/docs/api/class-page#page-wait-for-response
  // Note no await, I'm making the promise but not waiting for it here
  const interceptResponse = page.waitForResponse(forgotPasswordPage.apiRequest)

  // Submit the form to trigger the API
  await forgotPasswordPage.clickSubmitButton()

  // Now we wait for the promise
  const response = await interceptResponse

  // Get the status code of the response
  const statusCode = response.status()

  // Log them to the test output
  console.log('Status Code:', statusCode)

  // We know this API isn't ready yet so assert it was a 500
  expect(statusCode).toEqual(500)
})
