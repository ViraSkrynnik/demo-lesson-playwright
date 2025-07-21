import { BasePage } from './base-page'
import { Locator, Page } from '@playwright/test'

export class AuthorizedPage extends BasePage {
  readonly statusButton: Locator
  readonly logoutButton: Locator
  readonly inputOrderNumber: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)
    this.statusButton = page.locator('.header__button_check-order')
    this.logoutButton = page.locator('.header__button_exit')
    this.inputOrderNumber = page.getByTestId('searchOrder-input')
    this.submitButton = page.getByTestId('searchOrder-submitButton')
  }
}
