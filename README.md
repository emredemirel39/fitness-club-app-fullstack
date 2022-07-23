# fitness-club-app-fullstack

MongoDb must be installed to run this application.

## Client

In the client folder, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Server

In the server folder, you can run:

### `npm run server`

Runs the server in  [http://localhost:3001](http://localhost:3001)

## About Application

Frontend:
Typescript, Redux, Redux Thunk, Tailwind, and async CRUD operations

Backend:
Nodejs, Express, Mongo, JWT, Bcrypt and Cors

There are 2 main routes in the project:

1-) A simple landing page.
2-) An admin panel where only members, trainers and administrators can login.

2 API endpoints in the project, users and events.

In the admin panel, routes are shown according to the user's role. Some components are also rendered according to the user role. In order to prevent unauthorized users from making API requests, buttons that make API requests are rendered according to the user role.It also has token-based authorization control to prevent unauthorized Apı requests.

There is a dynamically created weekly schedule in the admin panel. When the weekly program is rendered, making API request, when there are matching lessons, it is shown in the weekly program. When adding or removing lessons, requests sending to the backend and schedule is updating instantly as a result of the process.

### Default users

Default user names and passwords to login dashboard:

(Admin)
login: admin
password: admin

(Manager)
login: manager
password: manager

(Trainer)
login: trainer
password: trainer

(Member)
login: member
password: member
