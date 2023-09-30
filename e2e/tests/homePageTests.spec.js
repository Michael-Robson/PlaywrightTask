import { test } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { CommonSteps } from '../common-steps'

// Log the test name and visit the home page
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  const homePage = new HomePage(page)
  await homePage.visit()
})

test('Assert the home page looks correct', async ({ page }) => {
  const homePage = new HomePage(page)

  // Assert the page header is present
  await homePage.assertHeaderPresent()

  // Assert the page header text is correct
  await homePage.assertHeaderText('Welcome to the-internet')

  // Assert the subheading is present
  await homePage.assertSubheadingPresent()

  // Assert the subheading text is correct
  await homePage.assertSubheadingText('Available Examples')

  // Assert we have the correct number of example links
  await homePage.assertNumberOfLinks(44)
})

test('Assert the example links are correct', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.assertLinksAreCorrect()
})

test('Assert footer text on page', async ({ page }) => {
  // Simple test using a function in common-steps.js to assert some text is on the page
  // in a real like scenario you wouldn't do it like this
  const commonSteps = new CommonSteps(page)
  await commonSteps.textOnPage('Powered by Elemental Selenium')
})
