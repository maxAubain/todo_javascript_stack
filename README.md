# Todo List App / Javascript Stack

## Summary

- This app is originally forked from Sellpy's [sandbox repository](https://github.com/sellpy/fullstack-sandbox) for interviewing and training purposes.
- The forked version of the app is a React frontend app with,

  - Two selectable todo lists.
  - Todo item form fields can be populated with data, deleted, and created. However, data does not persist and it is lost as soon as browser window is closed.
  - Material UI styling.

- In the version of this app developed by Max Aubain, @maxAubain, additional features were added, including,

  - Node.js backend with Express, with hosting by heroku.
  - Frontend hosting by Netlify.
  - Data persisted on the backend in a mutatable variable.
  - CORS configuration with various middle-ware including Axios.
  - Data posted from frontend to backend through and auto-save feature.
  - A checkbox form element to indicate todo item completion.
  - A calandar form element to indicate todo item due date.
  - A message form element to status of todo item, relative to completion and due date.
  - External links and added styling.
  - A "loading..." gif shown while data is being retrieved from backend.
  - Three frontend "feature" tests implemented Cypress.

- Detailed descriptions of the implementation of these features is best reviewed through the [closed pull requests](https://github.com/maxAubain/todo_javascript_stack/pulls?q=is%3Apr+is%3Aclosed) on github.
