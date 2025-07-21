import { Locator, Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderPage extends AuthorizedPage {
  readonly name: Locator
  readonly phone: Locator
  readonly comment: Locator
  readonly createOrderButton: Locator
  readonly notificationPopUp: Locator

  constructor(page: Page) {
    super(page)
    this.name = page.getByTestId('username-input')
    this.phone = page.getByTestId('phone-input')
    this.comment = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.notificationPopUp = page.getByTestId('orderSuccessfullyCreated-popup')
  }
}
