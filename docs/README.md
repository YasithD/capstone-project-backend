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
2. [Creating the API endpoints](#32-creating-the-api-endpoints).
3. [Creating the Backend server](#33-creating-the-backend-server).

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

> The SQLite query of the form `CREATE TABLE <table_name> (attribute_1, attribute_2, ...)` is used to create a table in the database. Here, a table named `teacher` and a table named `student` in created separetly.

> The SQLite query of the form `INSERT INTO <table_name> values (value_1, value_2, ...)` is used to insert data to a table in the database. Here, dummy data is inserted into the `teacher` table and the `student` table we created.

> The `run` method of the `sqlite3 Database` is used to run a SQL query which doesn't retrive any result data. Use the following [link](https://github.com/TryGhost/node-sqlite3/wiki/API#databaserunsql-param--callback) for further details about the method.

Since, we have now successfully initialized the database and added the dummy data, next let's create the API endpoints for the `CRUD operations` related to the `teacher` class.

> Here, `CRUD operations` refers to `Create`, `Read`, `Update`, and `Delete` operations of the data.

### 3.2. Creating the API endpoints

In this tutorial we will be guiding you to create the api endpoints for the `CRUD operations` of the teacher class.

- First let's create the API endpoint for adding a teacher to the database.

```js
export const addTeacher = async (id, name, age) => {
    return new Promise(function (resolve, reject) {
        db.all(
            `INSERT INTO teacher values (${id}, '${name}', ${age})`,
            function (err, rows) {
                if (err != null) {
                    console.log(err);
                    reject({ status: 'error' });
                }
                console.log('Successfully inserted teacher into database');
                resolve({ status: 'successfully added teacher' });
            }
        );
    });
};
```

> Here a `Promise` is returned when a `teacher` object is created. A `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value [[1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)]. A function can be passed into the `Promise` object with `resolve`, and `reject` methods to be called upon successfulll completion or failure respectively.

> In the above code, when a teacher is successfully added to the database, the `resolve` method will return a `status` message as `"successfully added teacher"`. If any error is occurred during the creation of a teacher, the `reject` method will return a `status` message as `"error"`.

> The `all` method of the `sqlite3 Database` accepts a SQL query, and can be provided with the `callback function` to be ran upon completion. The `callback function` includes parameters `err`, and `rows` which refers to any error occurred during the process and the resulting rows from the database. For further details about the method, refer to the following [link](https://github.com/TryGhost/node-sqlite3/wiki/API#databaseallsql-param--callback).

- Secondly let's create the API endpoint for Reading the Information of the teachers in the database.

> For this procedure we need two components.

1. A serverside endpoint to handle the request sent.
2. A database function to read the database.

> Let's look at the database function to read/retrieve the teacher data from the database.

```js
export const readTeachers = async () => {
    return new Promise(function (resolve, reject) {
        db.all('SELECT * FROM teacher', function (err, rows) {
            if (err != null) {
                console.log(err);
                reject({ status: 'error' });
            }
            console.log('Successfully fetched teachers from database');
            resolve(rows);
        });
    });
};
```

> In the above code, all the teacher infomation in the teacher table is retrived. The `resolve` method will return the database rows of the teacher table. If any error is occurred during the creation of a teacher, the `reject` method will return a `status` message as `"error"`.

> The SQLite query of the form `SELECT * FROM <table_name>` is used to retrieve all the data of a table in the database. Here, `*` is used to retrieve data of all the columns. Alternatively we can specify the column names of which the data should be retrieved.

- Next, let's implement the API endpoint for the delete operation of the teacher class.

```js
export const deleteTeacher = async id => {
    return new Promise(function (resolve, reject) {
        db.all(`DELETE FROM teacher WHERE id=${id}`, function (err, rows) {
            if (err != null) {
                console.log(err);
                reject({ status: 'error' });
            }
            console.log('Successfully deleted teacher from database');
            resolve({ status: 'successfully deleted teacher' });
        });
    });
};
```

> In SQLite, the SQL query format `DELETE FROM <table_name> WHERE <attribute_1>=<value_1> AND/OR ...` is used for deleting a row from the given table. In the above code the `teacher's id` value is used to identify the row to be deleted from the `teacher` table.

## 4. Implementing the Frontend
