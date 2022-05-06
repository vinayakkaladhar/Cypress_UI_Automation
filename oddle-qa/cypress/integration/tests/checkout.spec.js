/// <reference types="cypress" />

import TestFilter from '../../support/test-filter';
import ActionsLocator from '../../locators/checkout.locator';
import CheckoutPage from '../../pages/checkout.pages';
import ActionsConstant from '../../constants/actions.constants'

context('Actions', () => {
  beforeEach(() => {
  })

TestFilter.any(['smoke', 'regression', ''], () => {
  it.skip('Verify donation options displayed on checkout page', () => {
    cy.visit(ActionsConstant.checkout_url);
    CheckoutPage.verify_donation_options("Donate $5.00 once")
    CheckoutPage.verify_donation_options("Donate $15.00 once")
    CheckoutPage.verify_donation_options("Donate $50.00 once")
  })
})

TestFilter.any(['smoke', 'regression', ''], () => {
  it.skip('Verify field validations on stripe checkout page', () => {
    cy.visit(ActionsConstant.checkout_session_url);
    CheckoutPage.verify_donation_amount("One-time Donation - 5")
    CheckoutPage.click_pay()
    CheckoutPage.verify_required_fields_alert()
    CheckoutPage.enter_details(ActionsConstant.invalid_email,"1",ActionsConstant.card_cvv,ActionsConstant.card_expiry,"")
    CheckoutPage.verify_error("Your email is incomplete.")
    CheckoutPage.verify_error("Your card number is incomplete.")
    CheckoutPage.enter_details(ActionsConstant.email,ActionsConstant.card_number_with_3DS,ActionsConstant.card_cvv,"02/19","")
    CheckoutPage.verify_error("Your card's expiry year is in the past.")
    CheckoutPage.enter_details(ActionsConstant.email,ActionsConstant.card_number_with_3DS,"1",ActionsConstant.card_expiry,"")
    CheckoutPage.verify_error("Your card's security code is incomplete.")
  })
})

TestFilter.any(['smoke', 'regression', ''], () => {
  it.skip('Verify payment is successful on using card without 3DS enabled', () => {
    cy.visit(ActionsConstant.checkout_session_url);
    CheckoutPage.enter_details(ActionsConstant.email,ActionsConstant.card_number_without_3DS,ActionsConstant.card_cvv,ActionsConstant.card_expiry,ActionsConstant.billing_name)
    CheckoutPage.click_pay()
    CheckoutPage.verify_payment_success()
  })
})

TestFilter.any(['smoke', 'regression', ''], () => {
  it('Verify payment is successful on using card with 3DS enabled', { defaultCommandTimeout: 8000 }, () => {
    cy.visit(ActionsConstant.checkout_session_url);
    CheckoutPage.enter_details(ActionsConstant.email,ActionsConstant.card_number_with_3DS,ActionsConstant.card_cvv,ActionsConstant.card_expiry,ActionsConstant.billing_name)
    // since new pop-up with iframe opened, we need to wait for it to load
    cy.window().then((win) => {
    cy.spy(win, 'open').as('windowOpen'); // 'spy' vs 'stub' lets the new tab still open if you are visually watching it
    });
    CheckoutPage.click_pay()
    cy.get('@windowOpen').get('#challengeFrame').its('0.contentDocument.body').find('#test-source-authorize-3ds').click()
    CheckoutPage.click_button("Complete")
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
})
