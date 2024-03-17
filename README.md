# abn

deployment: https://xoron.github.io/abn/#/

Frontend developer assignment

Introduction
The purpose of this assignment is to evaluate the candidate’s familiarity with frontend technologies,
programming patterns and to showcase a sample of what clean and reusable code means to the candidate.
This also helps in understanding the candidate’s basic design knowledge.
Requirement
You will use an open TV shows API http://www.tvmaze.com/api to create an application that allows users
to view a few lists (preferably horizontal list) of TV shows based on different genres (drama, comedy,
sports, etc.).
Your goal is to display a few popular TV shows based on their rating and genre on a dashboard and when
the user clicks on a TV show then the details of that TV show should be displayed on another screen. Also,
the user should be able to search for a TV show to get the details. You can design your own UI which fits
this requirement.
Architecture
There is no limit for this. Design your application as you wish. But make sure you will focus on clean code,
reusability, frontend best practices. Show us that you know how to produce top notch applications.
Notes
• Please keep in mind that we use VueJS in ABN AMRO. Preferably, you complete this assessment
using this framework.
• Application must be responsive and mobile friendly
• Please keep the leverage/use of scaffolding tools, boilerplate templates,
plugins etc. to a minimum. We don’t expect you to create things from scratch but, we also would
like to see your own creation
• Please create a readme file that explains your architectural decisions (E.G. why did you choose a
specific framework) and make sure you include instructions on how to run your solution, add
details about NodeJS version being used and NPM. • Please include unit tests
• Please check that application is running and there are no console errors before sending it to us
• Please make sure that the UI is simple yet eye-catching
• Please feel free to include more features other than the few mentioned above.

todo:
- [x] create a vue app
- [x] add webpack
- [x] add linting
- [x] add router - remesate variables.
- [x] testing 
- [x] state management- maybe not needed 
- [x] skeletons loading
- [x] handle errors egantly
- [x] implement a try again button
- [x] prime vue

needed fixes:
- unit test assetion of html elements is not working
- code coverage is not clear for vue components
- remove skipped tests
- unit testing

improvements:
- introduce stae management
- add bebounce to search function
- break up components curther in to the atomic design pattern
- add more unit tests
- more code coverage - i am learning about vue unit testing and i would need to investigate more on common practices and patterns for testing vue components.
- sanitize html when using v-html - would need to creae a function that would filter out certain tags and attributes
- linting rules to be dicussed with a team to come up with am agreed upon standard
- code formatter like prettier to help keep code consistent - i did not use it because i dont think it was needed for the purpose of the project.
- typescript to make the code more readable and maintainable - i though doing this on an unfamiliar ecosystem would be too much for the time i had.
- add more show details on the details dialog

note:
- show search api is not paginated, so we can only get 10 results at a time.
- the responsive options for the carousel are reletive to the browser width. when using it with the search dialog, the responsive behaviour is not good.
- the pagination from the api is not idea for the purpose of the function of the requirements and so i used some creativity and decied to create cacheing functionality.

architecture:
- vue - as per the requirement, im using vuew3 becaiuse it is the latest version of vue,
- webpack - i am unfamiliar with the vue ecosystem and so i started with webpack because i see it has documented support for vue3. i have used webpack in the past and am familiar with it making idea for the project. i considered things like parcel which is a good tool for getting things working out of the box, but i though webpack would give me the flexibility i required for any suprises i get from an unfamiliar ecosystem.
- jest - i am familiar with jest and so i used it for testing. i considered other popular vue test tools like Vitest, but i had some difficulting in setting it up earlier and considering i was working with a deadline, i decided to go with jest.
- eslint - i am familiar with eslint and so i used it for linting. it holds a good reputation and i have used it in the past. i see there are many vue specific linting rules available for confiiuration.
- routing - i started of creating a typical routing system. but as i developed the app further i decided to make it easier to use by using a dialog for pages after i decided to introduce prime-vue.
- prime-vue - i originally started off aiming to create the app with vanilla html. while i was able to create a simple app with vanilla html, i decided that it was nessesary to use a UI framework for the project. the ui framework would be able to provide a consistent design and also provide some of the components i would need for the project.

resources: 
https://medium.com/@gersonjunior12/vue-js-3-webpack-5-minimal-configuration-35e535f399fd
https://router.vuejs.org/guide/
https://stackoverflow.com/questions/72428323/jest-referenceerror-vue-is-not-defined
https://primevue.org/