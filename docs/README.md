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

Next, let's implement a function to add some dummy data to our database. We will call the function as `initializeDatabase`.

```js
export const initializeDatabase = () => {
	db.serialize(function () {
		// create teacher table and insert dummy records
		db.run('CREATE TABLE teacher (id INTEGER, name TEXT, age INTEGER)');
		db.run("INSERT INTO teacher values (10001, 'Kusuma Ranasinghe', 45)");
		db.run("INSERT INTO teacher values (10002, 'Saman De Silva', 40)");
		db.run("INSERT INTO teacher values (10003, 'Parasanna Mahagamage', 30)");

		// create student table and insert dummy records
		db.run(
			'CREATE TABLE student (id INTEGER, name TEXT, age INTEGER, religion TEXT)'
		);
		db.run(
			"INSERT INTO student values (20001, 'Supun Mihiranga', 10, 'Buddhist')"
		);
		db.run(
			"INSERT INTO student values (20002, 'Sandun Perera', 9, 'Catholic')"
		);
		db.run(
			"INSERT INTO student values (20003, 'Isuri De Silva', 10, 'Buddhist')"
		);
	});
};
```

> The SQL query of the form `CREATE TABLE <table_name> (attribute_1, attribute_2, ...)` is used to create a table in the database. Here, a table named `teacher` and a table named `student` in created separetly.

> The SQL query of the form `INSERT INTO <table_name> values (value_1, value_2, ...)` is used to insert data to a table in the database. Here, dummy data is inserted into the `teacher` table and the `student` table we created.

> The `run` method of the `sqlite3 Database` is used to run a SQL query which doesn't retrive any result data. Use the following [link](https://github.com/TryGhost/node-sqlite3/wiki/API#databaserunsql-param--callback) for further details about the method.

## 4. Implementing the Frontend
