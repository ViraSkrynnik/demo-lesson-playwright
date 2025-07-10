import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly name: Locator
  readonly phone: Locator
  readonly comment: Locator
  readonly createOrderButton: Locator
  readonly logOutButton: Locator
  readonly notificationPopUp: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.name = page.getByTestId('username-input')
    this.phone = page.getByTestId('phone-input')
    this.comment = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.logOutButton = page.getByTestId('logout-button')
    this.notificationPopUp = page.getByTestId('orderSuccessfullyCreated-popup')
  }
}
