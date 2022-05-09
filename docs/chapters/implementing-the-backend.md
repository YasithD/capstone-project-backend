## 3. Implementing the Backend

Implementing the Backend can be divided into 2 parts.

1. [Generating sample data for the Database](#31-generating-sample-data-for-the-database).
2. [Creating the functions to interact with the Database](#32-creating-the-functions-to-interact-with-the-database).
3. [Creating the Backend server](#33-creating-the-backend-server).

### 3.1. Generating sample data for the Database

> As mentioned in the [setting up the environment](/docs/chapters/setting-up-the-environment.md) section, we installed `sqlite3` [npm package](https://www.npmjs.com/package/sqlite3) to create the database instance of our application. Now, let's see how we can use that package in our application.

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

- The SQLite query of the form `CREATE TABLE <table_name> (attribute_1, attribute_2, ...)` is used to create a table in the database. Here, a table named `teacher` and a table named `student` in created separately.


- The SQLite query of the form `INSERT INTO <table_name> values (value_1, value_2, ...)` is used to insert data to a table in the database. Here, dummy data is inserted into the `teacher` table and the `student` table we created.


- The `run` method of the `sqlite3 Database` is used to run a SQL query which doesn't retrieve any result data. Use the following [link](https://github.com/TryGhost/node-sqlite3/wiki/API#databaserunsql-param--callback) for further details about the method.

Since, we have now successfully initialized the database and added the dummy data, next let's create the methods for the `CRUD operations` related to the `teacher` class.

> Here, `CRUD operations` refers to `Create`, `Read`, `Update`, and `Delete` operations of the data.

### 3.2. Creating the functions to interact with the Database

In this tutorial we will be guiding you to creating the functions for the `CRUD operations` of the teacher class.

#### First let's create the function for adding a teacher to the database.

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

- Here a `Promise` is returned when a `teacher` object is created. A `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value [[1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)]. A function can be passed into the `Promise` object with `resolve`, and `reject` methods to be called upon successfully completion or failure respectively.


- In the above code, when a teacher is successfully added to the database, the `resolve` method will return a `status` message as `"successfully added teacher"`. If any error is occurred during the creation of a teacher, the `reject` method will return a `status` message as `"error"`.


- The `all` method of the `sqlite3 Database` accepts a SQL query, and can be provided with the `callback function` to be run upon completion. The `callback function` includes parameters `err`, and `rows` which refers to any error occurred during the process and the resulting rows from the database. For further details about the method, refer to the following [link](https://github.com/TryGhost/node-sqlite3/wiki/API#databaseallsql-param--callback).


#### Secondly let's create the function for Reading the Information of the teachers in the database.

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

- In the above code, all the teacher information in the teacher table is retrieved. The `resolve` method will return the database rows of the teacher table. If any error is occurred during the creation of a teacher, the `reject` method will return a `status` message as `"error"`.


- The SQLite query of the form `SELECT * FROM <table_name>` is used to retrieve all the data of a table in the database. Here, `*` is used to retrieve data of all the columns. Alternatively we can specify the column names of which the data should be retrieved.

#### Next, let's implement the function for the delete operation of the teacher class.

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

- In SQLite, the SQL query format `DELETE FROM <table_name> WHERE <attribute_1>=<value_1> AND/OR ...` is used for deleting a row from the given table. In the above code the `teacher's id` value is used to identify the row to be deleted from the `teacher` table.

### 3.3. Creating the Backend server

Inside the `backend` folder we created in the [Generating sample data for the Database](#31-generating-sample-data-for-the-database) section, create a file named `server.js` to manage the Backend server.

#### Now let's first import the essentials to run our Backend server.

```js
import express from "express";
import bodyParser from "body-parser";
import {
    initializeDatabase,
    readTeachers,
    addTeacher,
    deleteTeacher,
} from "./database.js";
```

- `Express` is a Node.js web application that provides facilities to run the services we need to initiate the server. We will be creating APIs using `express` and the functions we created in last section.


- The next import is the `body-parser`. It is a Node.js middleware which will parse the incoming request bodies before getting to the handlers. This is essential for validating the inputs received before the request proceeds.


- The next set of imports are the functions we created in the `database.js` file.

#### Next step is to create APIs using the functions we created in the last section.

##### 1. API for retrieving teachers
```js
app.get("/listTeachers", async function (req, res) {
    console.log("Request received to list teachers");
    let data = await readTeachers();
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
});
```

- This is the API for retrieving the list of teachers using the `readTeachers` function.

> Depending on what we need to do with an API, different methods are used to send requests to the APIs. Following are the most commonly used methods.
> 1. `POST` - This method is used when an API is used to send data (*create*).
> 2. `GET` - This method is used when an API is used to retrieve data (*read*).
> 3. `PUT` - This method is used when an API is used to update already existing data (*update*).
> 4. `DELETE` - This method is used when an API is used to delete data (*delete*).
>
> As mentioned in the parentheses, these methods map to the `CRUD` operations.

- In the `express` module, we pass a `path` argument and a `callback` function to the `get` method. Here the `path` refers to the endpoint we will be using to call the API. The `callback` function contains a `Request` and a `Response` object which is denoted by `req` and `res` respectively. Those objects contain methods to manipulate the request and the response of the API. For further details, access the documentation of `express` using this [link](https://expressjs.com/).


- In the above example, the `readTeachers` API is accessed through a `get` method. The endpoint `/listTeachers` is used to direct the requests to the API.


- Note that an `async` function is used for the callback function. An `async` function are used to return a `Promise`. In the [section](#secondly-lets-create-the-function-for-reading-the-information-of-the-teachers-in-the-database) when we created the `readTeachers` function, note that a `Promise` is returned. To return this `Promise` value, an `async` function is used as the callback function of the `get` method. To access the `Promise` value, an `await` statement is used. This stops the execution of the function until the returned `Promise` is resolved or rejected.


- Finally, `res.setHeader()` is used to set the header values of the response, and `res.end()` is used to end the response process. For further details about the methods, use this [link](https://expressjs.com/en/5x/api.html#res).

##### 2. API for adding/creating a teacher
```js
app.post("/addTeacher", async function (req, res) {
    let reqBody = req.body;
    console.log(
    "Request received to add teacher. Req body: " + JSON.stringify(reqBody)
    );
    let data = await addTeacher(reqBody.id, reqBody.name, reqBody.age);
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
});
```

- This is the API for creating/adding a teacher to the database via the `addTeacher` method we created earlier.


- Similar to the previous API, this API uses the endpoint `/addTeacher` to access the API via a `post` method/request. The data required to create the teacher object is passed to the `post` method as a javascript object in the following format.

```json
{
  "id": "teacher_id",
  "name": "teacher_name",
  "age": "teacher_age"
}
```

- This incoming data object can be captured by the `body` attribute of the `req` object.


- By triggering this API, a teacher object will be created in the database with the specified details in the data object of the request.

##### 3. API for deleting a teacher
```js
app.post("/deleteTeacher", async function (req, res) {
    let reqBody = req.body;
    console.log(
    "Request received to delete teacher. Req body: " + JSON.stringify(reqBody)
    );
    let data = await deleteTeacher(reqBody.id);
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
});
```

- This API is used to delete a `teacher` object from the database using the `teacher's id` specified in the body of the `post` request.


- Similar to the above APIs, the endpoint `/deleteTeacher` is used via a `post` method/request to delete the teacher object. The `teacher's id` is passed in the data object of the request in the following format as a javascript object.

```json
{
  "id": "teacher_id"
}
```

- This will pass the `id` value to the `deleteTeacher` method, and eventually it will delete the teacher object from the database with the specified `id` value.