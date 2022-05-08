/// <reference types="cypress" />

import ActionsLocator from '../locators/checkout.locator';
require('cypress-xpath')

var ActionsPage = {

    enter_email: function(email) {
        cy.get(ActionsLocator.email())
        .type(email).should('have.value', email)
    },

    type_special_keys_in_email_field: function(){
        // .type() with special character sequences
        cy.get(ActionsLocator.email())
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')

        // .type() with key modifiers
        .type('{alt}{option}') //these are equivalent
        .type('{ctrl}{control}') //these are equivalent
        .type('{meta}{command}{cmd}') //these are equivalent
        .type('{shift}')
    },

    enter_email_slow_type: function(email) {
        // Delay each keypress by 0.1 sec
        cy.get(ActionsLocator.email())
        .type('slow.typing@email.com', { delay: 100 })
        .should('have.value', 'slow.typing@email.com')
    },

    disabled_check: function() {
        cy.get(ActionsLocator.action_disabled())
        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking',{ force: true , delay: 100}).contains('disabled')
        //.should('have.value', 'disabled error checking')
    },

    focus_validation: function() {
        cy.get(ActionsLocator.focus_locator()).focus()
        .should('have.class', 'focus')
        .prev().should('have.attr', 'style', 'color: orange;')
    },

    click_button: function(donationAmount) {
        cy.xpath(ActionsLocator.button().replace("%s",donationAmount)).click()
    },

    verify_donation_options: function(donationAmount) {
        cy.xpath(ActionsLocator.button().replace("%s",donationAmount)).should('be.visible')
    },

    verify_donation_amount: function(donationAmount) {
        cy.xpath(ActionsLocator.donateAmountDisplayed().replace("%s",donationAmount)).should('be.visible')
    },

    verify_required_fields_alert: function() {
        cy.get(ActionsLocator.emailRequiredDisplayed()).should('be.visible')
        cy.get(ActionsLocator.billingRequiredDisplayed()).should('be.visible')
        cy.get(ActionsLocator.cardRequiredDisplayed()).should('be.visible')
    },

    click_pay: function() {
        cy.get(ActionsLocator.payButton()).click()
    },

    verify_payment_success: function() {
        cy.xpath(ActionsLocator.paymentSuccess()).should('be.visible')
    },
    enter_details: function(email,cardNumber,cardCvv,cardExpiry,billingName) {
        cy.get(ActionsLocator.enter_email()).clear().type(email)
        cy.get(ActionsLocator.enter_card_number()).clear().type(cardNumber)
        cy.get(ActionsLocator.enter_card_cvv()).clear().type(cardCvv)
        cy.get(ActionsLocator.enter_card_expiry()).clear().type(cardExpiry)
        cy.get(ActionsLocator.enter_billing_name()).clear().type(billingName)
    },

    verify_error: function(errorMessage) {
        cy.xpath(ActionsLocator.verify_error().replace("%s",errorMessage)).should('be.visible')
    },
};

export default ActionsPage;