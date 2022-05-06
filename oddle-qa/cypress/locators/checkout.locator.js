var ActionsLocator = {

    email: function() {
           return '.action-email'
    },

    action_disabled: function() {
           return '.action-disabled'
    },

    focus_locator: function() {
           return '.action-focus'
    },

    button: function() {
       return './/button[contains(text(),"%s")]'
},
payButton: function() {
       return '.SubmitButton-IconContainer'
},
paymentSuccess: function() {
       return './/h1[contains(text(),"payment succeeded")]'
},
donateAmountDisplayed: function() {
       return ".//div[contains(text(),'%s')]"
},
emailRequiredDisplayed: function() {
       return '#required-email-fieldset'
},
cardRequiredDisplayed: function() {
       return '#required-cardNumber-fieldset'
},
billingRequiredDisplayed: function() {
       return '#required-billingName-fieldset'
},
enter_email: function() {
       return '#email'
},
enter_card_number: function() {
       return '#cardNumber'
},
enter_card_cvv: function() {
       return '#cardCvc'
},
enter_card_expiry: function() {
       return '#cardExpiry'
},
enter_billing_name: function() {
       return '#billingName'
},
verify_error: function() {
       return './/span[text()="%s"]'
},
};

export default ActionsLocator;