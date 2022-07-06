![room-finder-api](https://socialify.git.ci/prince-appiah/room-finder-api/image?descriptionEditable=&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark)

<!-- ### [🌐 Website](https://room-finder-api.herokuapp.com/docs/) | [📹 Demo Video](https://www.youtube.com/watch?v=bUAAgfGOfYg) -->

### API Hosted On

- **[room-finder-api.herokuapp.com](https://room-finder-api.herokuapp.com/docs/) (Primary)**

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
      - [Base Url - `{API_URL}/api`](#base-url---api_urlapi)
      - [Users](#users)
      - [Posts](#posts)
      - [Answers](#answers)
      - [Comments](#comments)
      - [Tags](#tags)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:key: Environment Variables](#key-environment-variables)
    - [:gear: Installation](#gear-installation)
    - [:running: Run Locally](#running-run-locally)
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
    - [:scroll: Code of Conduct](#scroll-code-of-conduct)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<div align="center"> 
  <img src="https://placehold.co/600x400?text=Your+Screenshot+here" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://reactjs.org/">Redux Toolkit</a></li>
    <li><a href="https://tailwindcss.com/">Chakra UI</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    
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

- Feature 1
- Feature 2
- Feature 3

### :book: API Endpoints

API is currently hosted on **[room-finder-api.herokuapp.com](https://room-finder-api.herokuapp.com/docs/)**

You can view and read the API endpoints samples [here](https://documenter.getpostman.com/view/10053385/UVC3kTiG#f02c9fce-5737-4cd6-9d8e-ad48233102c7). This is API documentation for the back-end.

But, if you want use Postman to test the API in local machine, you need to follow the steps below:

- Get the Postman app from [here](https://www.getpostman.com/downloads/).
- Download the Postman collection file in folder "/data/postman_collection"
- Import the collection file in Postman
- **Important:** will be necessary to setup the enviroment with the "VARIABLE"=urlAPI and "INITIAL VALUE"=http://localhost:5000, for example.
- **Remember**: keep the Postman collection updated with the latest API endpoints.

#### Base Url - `{API_URL}/api`

#### Users

- `GET /auth`
- `POST /auth`
- `POST /users/:id`
- `GET /users`
- `GET /users/:id`

#### Posts

- `GET /posts`
- `GET /posts/top`
- `GET /posts/tag/:tagname`
- `GET /posts/:id`
- `POST /posts/`
- `DELETE /posts/:id`

#### Answers

- `GET /posts/answers/:id`
- `POST /posts/answers/:id`
- `DELETE /posts/answers/:id`

#### Comments

- `GET /posts/comments/:id`
- `POST /posts/comments/:id`
- `DELETE /posts/comments/:id`

#### Tags

- `GET /tags`
- `GET /tags/:tag_name`

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

`API_KEY`

`ANOTHER_API_KEY`

<!-- Installation -->

### :gear: Installation

Install my-project with npm

```bash
  yarn install my-project
  cd my-project
```

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
  yarn install
```

Start the server

```bash
  yarn dev
```

<!-- Roadmap -->

## :compass: Roadmap

- [x] Todo 1
- [ ] Todo 2

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
