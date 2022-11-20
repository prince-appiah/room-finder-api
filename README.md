![room-finder-api](https://socialify.git.ci/prince-appiah/room-finder-api/image?descriptionEditable=&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark)

<!-- ### [🌐 Website](https://room-finder-api.herokuapp.com/docs/) | [📹 Demo Video](https://www.youtube.com/watch?v=bUAAgfGOfYg) -->

### API Hosted On

- **[shelter-api.cyclic.app](https://shelter-api.cyclic.app/docs/) (Primary)**

### Frontend Hosted On

- **[shelter-three.vercel.app/](https://shelter-three.vercel.app/) (Live Preview)**
- **[github.com/prince-appiah/shelter](https://github.com/prince-appiah/shelter) (Source Code)**

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [:notebook_with_decorative_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:space_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:book: API Endpoints](#book-api-endpoints)
      - [Base Url - `{API_URL}/api/v1`](#base-url---api_urlapiv1)
      - [Authentication](#authentication)
      - [Admin](#admin)
      - [Customers](#customers)
      - [Hosts](#hosts)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:key: Environment Variables](#key-environment-variables)
    - [:running: Run Locally](#running-run-locally)
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
    - [:scroll: Code of Conduct](#scroll-code-of-conduct)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<div align="center"> 
  <img src="https://res.cloudinary.com/ddnozuc0s/image/upload/v1662229955/portfolio/shelter-api_jg9e8m.png" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
     <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://redux-toolkit.js.org">Redux Toolkit</a></li>
    <li><a href="https://github.com/rt2zz/redux-persist#readme">Redux Persist</a></li>
    <li><a href="https://chakra-ui.com">Chakra UI</a></li>
    <li><a href="https://axios-http.com">Axios</a></li>
    <li><a href="https://formik.org/">Formik</a></li>
    <li><a href="https://github.com/jquense/yup">Yup</a></li>
 
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://github.com/expressjs/cors#readme">CORS</a></li>
    <li><a href="https://helmetjs.github.io">Helmet</a></li>
    <li><a href="https://mongoosejs.com">Mongoose ORM</a></li>
    <li><a href="https://nodemailer.com/">Node Mailer</a></li>
    <li><a href="https://github.com/auth0/node-jsonwebtoken">JSON Webtoken</a></li>
    <li><a href="https://github.com/getsentry/sentry-javascript">Sentry</a></li>
    <li><a href="https://cloudinary.com/">Cloudinary</a></li>
    
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.heroku.com/">Heroku</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Property listing - by hosts and admin (on behalf of hosts)
- Property booking - by customers
- Approval and Decline of properties uploaded by hosts

### :book: API Endpoints

API is currently hosted on **[shelter-api.cyclic.app](https://shelter-api.cyclic.app/docs/)**

<!-- You can view and read the API endpoints samples [here](https://documenter.getpostman.com/view/10053385/UVC3kTiG#f02c9fce-5737-4cd6-9d8e-ad48233102c7). This is API documentation for the back-end.

But, if you want use Postman to test the API in local machine, you need to follow the steps below:

- Get the Postman app from [here](https://www.getpostman.com/downloads/).
- Download the Postman collection file in folder "/data/postman_collection"
- Import the collection file in Postman
- **Important:** will be necessary to setup the enviroment with the "VARIABLE"=urlAPI and "INITIAL VALUE"=http://localhost:5000, for example.
- **Remember**: keep the Postman collection updated with the latest API endpoints. -->

#### Base Url - `{API_URL}/api/v1`

#### Authentication

- `POST /signup`
- `POST /otp`
- `POST /login`
- `POST /logout`

#### Admin

- `GET /dashboard-reports`
- `POST /users`
- `PATCH /users/:user_id`
- `DELETE /users/:user_id`
- `GET /users`
- `GET /bookings`
- `GET /property`
- `GET /property/:id`
- `PATCH /property/:id`
- `DELETE /property/:id`
- `POST /property`
- `POST /approve`
- `GET /hosts`
- `GET /hosts/:id`
- `PATCH /hosts/:id`
- `DELETE /hosts/:id`
- `GET /room-types`
- `POST /room-types`
- `GET /room-types/:id`
- `PATCH /room-types/:id`
- `DELETE /room-types/:id`
- `GET /amenities`
- `GET /amenities/:id`
- `PATCH /amenities/:id`
- `DELETE /amenities/:id`
- `POST /amenities`

#### Customers

- `GET /customer-bookings`
- `GET /customer-bookings/:property_id`
- `PATCH /customer-bookings/:property_id`
- `GET /property`
- `GET /property/:id`
- `GET /room-types`
- `GET /room-types/:id`
- `GET /amenities`
- `GET /amenities/:id`

#### Hosts

- `GET /property`
- `GET /property/:id`
- `GET /room-types`
- `GET /room-types/:id`
- `GET /amenities`
- `GET /amenities/:id`

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLOUDINARY_API_SECRET`

`CLOUDINARY_API_KEY`

`CLOUDINARY_CLOUD_NAME`

`MAILGUN_DOMAIN`

`MAILGUN_API_KEY`

`DB_CLUSTER`

`DB_NAME`

`DB_PASSWORD`

`DB_USER`

`AUTH_PASSWORD`

`AUTH_EMAIL`

`JWT_EXPIRY_TIME`

`JWT_SECRET`

`DSN`

`PORT`

`HOST`

`NODE_ENV`

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/prince-appiah/room-finder-api.git
```

Go to the project directory

```bash
  cd room-finder-api
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

<!-- Roadmap -->

## :compass: Roadmap

- [ ] Verify hosts through ID Verification
- [ ] Rate properties - by customers

<!-- Contributing -->

## :wave: Contributing

<a href="https://github.com/prince-appiah/room-finder-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=prince-appiah/room-finder-api" />
</a>

Contributions are always welcome!

See `contributing.md` for ways to get started.

<!-- Code of Conduct -->

### :scroll: Code of Conduct

Please read the [Code of Conduct](https://github.com/prince-appiah/room-finder-api/blob/master/CODE_OF_CONDUCT.md)

<!-- License -->

## :warning: License

Distributed under the no License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

- [Gmail](mailto:pappiah00@gmail.com)
- [Dribbble](https://www.dribbble.com/prince-appiah)
- [Github](https://github.com/prince-appiah)

<h2>💖Like my work?</h2>
This project needs a ⭐️ from you. Don't forget to leave a star ⭐️.
