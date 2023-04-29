<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![CI for LOMAP ES1B1](https://github.com/Arquisoft/lomap_es1b1/actions/workflows/lomap_es1b1.yml/badge.svg)](https://github.com/Arquisoft/lomap_es1b1/actions/workflows/lomap_es1b1.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1b1&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1b1)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1b1&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1b1)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Arquisoft/lomap_es1b1">
    <img src="https://github.com/Arquisoft/lomap_es1b/blob/develop/docs/images/logo-no-background.png" alt="Logo" height="80">
  </a>

<h3 align="center">LOMAP_ES1B1</h3>

  <p align="center">
    Discover your city with LoMap - your personalized map, your way!
    <br />
    <a href="https://arquisoft.github.io/lomap_es1b1/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/Arquisoft/lomap_es1b1/issues">Report Bug</a>
    ·
    <a href="https://github.com/Arquisoft/lomap_es1b1/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![LOMAP_screenshot](https://github.com/Arquisoft/lomap_es1b1/blob/develop/docs/images/screenshot.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/es/)
* [React.js](https://reactjs.org/)
* [MUI Core](https://mui.com/)
* [MongoDB](https://www.mongodb.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [SOLID Pods](https://solidproject.org/)
* [Mongoose.js](https://mongoosejs.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

<p align="justify">If you already have Node.js and npm, ensure that you update them before trying to construct the images. To run the project, you'll need <a href="https://nodejs.org/en/download">Node.js</a>, <a href="https://www.docker.com/">Docker</a>, <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a> and <a href="https://git-scm.com/downloads">git</a> installed on your machine. Make certain that all four are installed.</p>

### Installation
<p align="justify">You can obtain the project by using the command <code>git clone https://github.com/Arquisoft/lomap_es1b1</code>.</p>

#### With Docker
<p align="justify">The most efficient method to initiate everything is by using Docker:</p>

```sh
docker-compose up --build
```
<p align="justify">Two docker images will be generated for the webapp and the restapi since they are not currently present on your system.</p>

#### Without Docker
<p align="justify">Compile and run the restapi:</p>

```shell
cd restapi
npm install
npm start
```

<p align="justify">Now the webapp:</p>

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
Joaquín Hermida Giganto - [Jhergig](https://github.com/Jhergig)

Óscar Davila Sampedro - [OscarDavilaSampedro](https://github.com/OscarDavilaSampedro)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
