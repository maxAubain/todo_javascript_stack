## Welcome to Sellpy Frontend Sandbox!

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), so check the readme over there if you need anything regarded to that.

## Acceptance testing with Cypress
Accpetance tests can be run with the command `npm run cy:open` on the frontend.  From the Cypress dialog box that pops up with the test browser, run one test file at a time from the `./cypress/integration/sandbox/` folder.  

Make sure that the backend server is running during the test *AND ALSO MAKE SURE* to restart the backend server before running each test file.  Once an acceptance test is started, it is "hot loaded" and will continue to try to run indefinitely, so it is essential that the test is stopped in the Cypress dialog box before restarting the backend server, or else errant post requests will cause future tests to fail due to a faulty initial state.