# Capstone Project

![GitHub contributors](https://img.shields.io/github/contributors/YasithD/capstone-project-backend)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/YasithD/capstone-project-backend/docs)
![GitHub forks](https://img.shields.io/github/forks/YasithD/capstone-project-backend?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/YasithD/capstone-project-backend?style=social)

## Table of Contents

1. [Project description](#1-project-description).
2. [Setting up the environment](#2-setting-up-the-environment).
3. [Implementing the Backend](#3-implementing-the-backend).
4. [Implementing the Frontend](#4-implementing-the-frontend).

## 1. Project description

## 2. Setting up the environment

## 3. Implementing the Backend

Implementing the Backend can be divided into 2 parts.

1. [Generating sample data for the Database](#31-generating-sample-data-for-the-database).
2. Creating the API endpoints.
3. Creating the Backend server.

### 3.1. Generating sample data for the Database

> As mentioned in the [setting up the environment](#2-setting-up-the-environment) section, we installed `sqlite3` [npm package](https://www.npmjs.com/package/sqlite3) to create the database instance of our application. Now, let's see how we can use that package in our application.

In your application's root, create a folder named `backend`. Inside the `backend` folder create a file named `database.js` to implement our database related functionalities.

First let's `import` the package with the following code.

```js
import sqlite3 from 'sqlite3';
```

Then initialize the database with the following code section.

```js
const db = new sqlite3.Database(':memory:');
```

> The above code returns a new `Database object` and it automatically opens the database. The `filename` argument `":memory:"` passed into the function creates an `anonymous in-memory database` and an `empty string for an anonymous disk-based database`. To get further details about the method, please visit this [link](https://github.com/TryGhost/node-sqlite3/wiki/API#new-sqlite3databasefilename-mode-callback).

## 4. Implementing the Frontend
