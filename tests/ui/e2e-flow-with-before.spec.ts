import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFound } from '../pages/order-not-found'
import { OrderFound } from '../pages/order-found'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill('123456789')
  await authPage.signInButton.click()
  await expect.soft(authPage.authorisationErrorPopUp).toBeVisible()
  await expect.soft(authPage.authorisationErrorPopUp).toContainText('Incorrect credentials')
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect.soft(orderCreationPage.statusButton).toBeVisible()
  await expect.soft(orderCreationPage.createOrderButton).toBeVisible()
  await expect.soft(orderCreationPage.name).toBeVisible()
  await expect.soft(orderCreationPage.phone).toBeVisible()
  await expect.soft(orderCreationPage.comment).toBeVisible()
  await expect.soft(orderCreationPage.logoutButton).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.name.fill(faker.lorem.word(5))
  await orderCreationPage.phone.fill('1234567890')
  await orderCreationPage.comment.fill(faker.lorem.sentence(10))
  await orderCreationPage.createOrderButton.click()
  await expect(orderCreationPage.notificationPopUp).toBeVisible()
  await expect(orderCreationPage.notificationPopUp).toHaveText(
    '×Order has been created!Tracking code: undefinedok',
  )
})

test('login and logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('order not found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.inputOrderNumber.fill('0000')
  await orderCreationPage.submitButton.click()
  const orderNotFoundPage = new OrderNotFound(page)
  await expect.soft(orderNotFoundPage.orderNotFoundTitle).toBeVisible()
  await expect.soft(orderNotFoundPage.orderNotFoundMessage).toBeVisible()
  await expect.soft(orderNotFoundPage.orderNotFoundImage).toBeVisible()
})

test('order found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.inputOrderNumber.fill('10555')
  await orderCreationPage.submitButton.click()
  const orderFoundPage = new OrderFound(page)
  await expect.soft(orderFoundPage.input).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationName).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationPhone).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationComment).toBeVisible()
})
