# Cypress Page Object Model Framework

This project is to support Page Object Model (POM) using Cypress. It also supports tagging feature which is not available by default in cypress. For better understanding of tests, allure and mochawsome reporting structure is included with this project structure.

## Setup
* Clone this repository
* Navigate to the cloned folder
* Install node and npm using `brew install node`
* Install the dependencies with respect to this project by `npm install`


## To Run the tests

To make the command line run options easier, added common run options as scripts in `package.json` file.

For a simple run of all the feature files in normal mode without any video recording, try
```
npm run test
```
For a simple run of all the feature files in normal mode with video recording, try
```
npm run test:video
```
To run the tests with specific spec file, try
```
npm run test -- --spec <Path to the spec file>
```

### Tags

Cypress by default doesn't support any tagging feature to the tests. I have included a wrapper under `support/test-filter.js` and included that wrapper in every tests to specify the tags. Have this wrapper on top of every test description inside the test file.
```
TestFilter.any(['smoke', 'regression', ''], () => { // Specify the tags within this array
    it('Sample test', () => {
      // Test description
    })
  })
```
Make sure to have the empty string within the tag array, so that if no tags is specified in the test run to this testcase runs by default. To run the tests specific with any tags, try
```
npm run test -- --env TEST_TAGS=regression
```

### Headless

To run the tests in headless mode,
```
npm run test -- --headless
```
To run the tests in headed mode,
```
npm run test -- --headed
```

## Allure
To open the allure results,
```
npm run serve-allure
```
To clear the allure results,
```
npm run clean-allure
```

## Multiple Browser
Multiple browser is supported by cypress by default to run the tests against any specific browser, try

```
npm run -- --browser <Browser name or path eg., chrome, firefox>
```

## Reports
For better illustration on the testcases, allure reports and mochawsome has been integrated. Allure reports can also be integrated with jenkins to get a dashboard view. Apart from allure and mochawsome, command line is also integrated in such a way that cy.log is printed in the console.

## Retries
By default this project is specified to have retry count with 2. This can be changed by modifying the environment variable `"RETRIES": 2,` in `cypress.json` file. If in case you wish to have multiple retries for a specific testcase, you can add the following within the testcases,
```
Cypress.currentTest.retries(4)
```


## Breakdown in to testcases

### Adding page methods to the project

1. Add page specific methods inside the `pages` folder structure. Pages are declared in namespaces so that we can directly call them within the tests without any declarations. Name the page files with `<spec_name>.pages.js` so that we wont get confused with the file functionality.

```
var ActionsPage = {
    enter_email: function(email) {
        cy.get(ActionsLocator.email())
        .type(email).should('have.value', email)
    },
}

```

2. For each page add make sure a locator page is added and included within the page file. We need to declare the locator identifiers within the locator file and then need to use that in pages.

```
import ActionsLocator from '../locators/actions.locator';
```

### Adding locator methods to the project

1. Add locator methods inside the `locators` folder structure. Locators are declared in namespaces so that we can directly call them within the tests or within the pages without any prior declarations. Name the page files with `<spec_name>.locators.js` so that we wont get confused with the file functionality.

```
var ActionsLocator = {
    email: function() {
           return '.action-email'
    }
};

```

2. For each page add make sure a locator page is added and included within the page file. We need to declare the locator identifiers within the locator file and then need to use that in pages.

```
import ActionsLocator from '../locators/checkout.locator';
```

### Creating a new spec file in the project

1. Spec files are created by default cypress standard and we could use all the hooks and definitions that are supported by cypress.

2. Only changes that we need to do is to add the tags to the tests using the `TestFilter` custom wrapper. This helps us to run the tests by using tags. A very common usecase is to run the tests in regression or sanity mode to validate the application's stability at different situations.

3. Global hooks are added within the `support/hooks.js` which is included in the `support/index.js` file. Here we could add any common actions among all the test cases at global level. A very common use case is to run the tests against different environment, for which we can pass the environment as a command line argument (or as an environment variable) and parse the same to declare the URL's which has to be consumed inside the tests.

## Built With

* [Cypress](https://www.cypress.io/) - Automation core framework
* [Allure](https://www.npmjs.com/package/@shelex/cypress-allure-plugin) - For Detailed reporting.
