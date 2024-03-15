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
- [] add a lot of tests
- [] testing 
- [] state management- maybe not needed 
- skeletons loading
- handle errors egantly
handleloading skeletons
implement a try again button

- [] - prime vue
- tailwin
0- or styled component
or a styling library


- make fetch separated,


todo:

- add bebounce to search function



resources: 
https://medium.com/@gersonjunior12/vue-js-3-webpack-5-minimal-configuration-35e535f399fd
https://router.vuejs.org/guide/
https://stackoverflow.com/questions/72428323/jest-referenceerror-vue-is-not-defined
https://primevue.org/

note:
- show search api is not paginated, so we can only get 10 results at a time.