import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { CommonSteps } from '../common-steps'

// Log the test name and visit the home page
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  const homePage = new HomePage(page)
  await homePage.visit()
})

test('Fails to show off report', async ({ page }) => {
  const homePage = new HomePage(page)

  // Assert the page header is present
  await homePage.assertHeaderPresent()

  // Fail the test to show what it looks like in the report
  await expect(1, 'Custom failure message').toEqual(2)
})

test('Another purpose failure', async ({ page }) => {
  const commonSteps = new CommonSteps(page)
  await commonSteps.textOnPage("This isn't on the page so the test will fail")
})

test('Pass to show a mixture of test results from a single spec', async ({}) => {
  await expect(1).toEqual(1)
})
