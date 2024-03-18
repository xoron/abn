# ABN

## Project setup

Requirements:
node version: `20.11.0`
npm version: `10.2.4`

run this following commands in the terminal at the root of the project:
```
npm install
npm start
```

Now it should be running at [http://localhost:8080/](http://localhost:8080/)

## Deployment
[https://xoron.github.io/abn/#/](https://xoron.github.io/abn/#/)

## Todo:
- [x] Create a Vue app
- [x] Add Webpack
- [x] Add linting
- [x] Add router
- [x] Testing
- [x] State management
- [x] Skeleton loading
- [x] Handle errors elegantly
- [x] PrimeVue
- [x] Pinia

## Needed Fixes:
- Unit test assertion of HTML elements is not working
- Code coverage is not clear for Vue components
- fix skipped tests

## Improvements:
- Snapshot testing for components
- Add debounce to search function
- Break up components further into the atomic design pattern
- Add more unit tests
- More code coverage - I am learning about Vue unit testing and I would need to investigate more on common practices and patterns for testing Vue components
- Sanitize HTML instead using `v-html` - Would need to create a function that would filter out certain tags and attributes
- Linting rules to be discussed with a team to come up with an agreed upon standard
- Code formatter like Prettier to help keep code consistent - I did not use it because I don't think it was needed for the purpose of the project
- TypeScript to make the code more readable and maintainable - I thought doing this in an unfamiliar ecosystem would be too much for the time I had
- Add more show details on the details dialog
- After some experience, i see it is important to make the code readable for debugging. `.vue` files allow flexibility, but a nice refactor for readability would be to organise segments by script, template, and style. I considered it out of scope when i realised.
- Pre-rendering images for better performance
- Persistent storage for the search results. localStorage/indexedDB could be used to store the search results so that the user does not have to search again when they navigate back to the search page. but this is an decisions to be made based on security requirements.

## Architecture:
- Vue - As per the requirement, I'm using Vue 3 because it is the latest version of Vue
- Webpack - I am unfamiliar with the Vue ecosystem and so I started with Webpack because it has documented support for Vue 3. I have used Webpack in the past and am familiar with it, making it ideal for the project. I considered things like Parcel which is a good tool for getting things working out of the box, but I thought Webpack would give me the flexibility I required for any surprises I get from an unfamiliar ecosystem
- Jest - I am familiar with Jest and so I used it for testing. I considered other popular Vue test tools like Vitest, but I had some difficulty in setting it up earlier and considering I was working with a deadline, I decided to go with Jest
- ESLint - I am familiar with ESLint and so I used it for linting. It holds a good reputation and I have used it in the past. I see there are many Vue-specific linting rules available for configuration
- Routing - I started off creating a typical routing system (when the old page isnot rendered to be replaced by the new). But as I developed the app further and decided to install primevuew, I decided to make it better by using a dialog for pages for a better UI experience.
- PrimeVue - I originally started off aiming to create the app with vanilla HTML. While I was able to create a simple app with vanilla HTML, I decided that it was necessary to use a UI framework for the project. The UI framework would be able to provide a consistent design and also provide some of the components I would need for the project
- Pinia - I originally started thinking the state management requirements could be simplified by using functionality provided out of the box with Composition API. But as the app grew, I decided to use Pinia for state management to store TV shows because I have a separate route for searching which could help update the local store

## Resources and notes:
- [Vue.js 3 + Webpack 5 Minimal Configuration](https://medium.com/@gersonjunior12/vue-js-3-webpack-5-minimal-configuration-35e535f399fd)
- [Vue Router Guide](https://router.vuejs.org/guide/)
- [Jest: ReferenceError: Vue is not defined (Stack Overflow)](https://stackoverflow.com/questions/72428323/jest-referenceerror-vue-is-not-defined)
- [PrimeVue](https://primevue.org/)
- Show search API is not paginated, so we can only get 10 results at a time
- The responsive options for the carousel are relative to the browser width. When using it with the search dialog, the responsive behavior is not ideal.
- The pagination from the API is not ideal for the purpose of the searching by genre so I used some creativity and decided to create caching functionality