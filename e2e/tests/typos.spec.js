import { test } from '@playwright/test'
import { TyposPage } from '../pages/typosPage'

// Log the test name
test.beforeEach(async ({}, testInfo) => {
  console.log(`Running ${testInfo.title}`)
})

// Flakey test the page intruced a typo randomly so we know it will fail sometimes
// I could add retry to playwright.config.js to make it rerun upto x times but instead I've added another test to refresh the page
test('Assert the typos page is correct - Flakey version', async ({ page }) => {
  const typosPage = new TyposPage(page)

  // Go to the page
  await typosPage.visit()

  // Assert the header is present
  await typosPage.assertHeaderPresent()

  // Assert the header text is correct
  await typosPage.assertHeaderTextIsCorrect()

  // Assert the instructions are present
  await typosPage.assertInstructionsPresent()

  // Assert the instructions copy is correct
  await typosPage.assertInstructionsTextIsCorrect()

  // Assert the message is present
  await typosPage.assertMessagePresent()

  // Assert the message is correct - this dynamically changes on each reload so it will sometimes pass sometimes fail
  await typosPage.assertMessageTextIsCorrect()
})

test('Assert the typos page is correct - with a retry', async ({ page }) => {
  const typosPage = new TyposPage(page)

  // Go to the page
  await typosPage.visit()

  // Assert the header is present
  await typosPage.assertHeaderPresent()

  // Assert the header text is correct
  await typosPage.assertHeaderTextIsCorrect()

  // Assert the instructions are present
  await typosPage.assertInstructionsPresent()

  // Assert the instructions copy is correct
  await typosPage.assertInstructionsTextIsCorrect()

  // Assert the message is present
  await typosPage.assertMessagePresent()

  // Assert the message is correct - this dynamically changes on each reload so it will reload the page until we get a match
  await typosPage.refreshUntilMessageTextIsCorrect(10)
})
