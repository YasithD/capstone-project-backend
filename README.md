# Capstone Project

This project is a part of the full stack developer programme on https://open.uom.lk/, and wishes to cover the areas of web development, database connections and backend development. This project also includes tests covering both frontend and backend functionality. The following technologies are used
- frontend: angular
- backend: node
- database: sqlite

## Functionalities

This system primarily contains the following classes/models.
- Teacher
- Student

### Backend

The backend is a server running on port 8080, and covers the following endpoints.
- `/listTeachers - GET`: Return all teachers in the database. A sample response:
```json
[
    {
        "id": 10001,
        "name": "Kusuma Ranasinghe",
        "age": 45
    },
    {
        "id": 10002,
        "name": "Saman De Silva",
        "age": 40
    },
    {
        "id": 10003,
        "name": "Parasanna Mahagamage",
        "age": 30
    }
]
```
- `/addTeacher - POST`: Add teacher to the database. Use the following request body:
```json
{
    "id": 10033,
    "name": "Nilanthi Fernando",
    "age": 42
}
```
- `/deleteTeacher - POST`: Deletes a specific teacher from the database. Use the following request body:
```json
{
    "id": 20033
}
```



- `/listStudents - GET`: Return all students in the database. A sample response:
```json
[
    {
        "id": 20001,
        "name": "Supun Mihiranga",
        "age": 10,
        "religion": "Buddhist"
    },
    {
        "id": 20002,
        "name": "Sandun Perera",
        "age": 9,
        "religion": "Catholic"
    },
    {
        "id": 20003,
        "name": "Isuri De Silva",
        "age": 10,
        "religion": "Buddhist"
    }
]
```
- `/addStudent - POST`: Add student to the database. Use the following request body:
```json
{
    "id": 20033,
    "name": "Rashini Shehara",
    "age": 12,
    "religion": "Buddhist"
}
```
- `/deleteStudent - POST`: Deletes a specific student from the database. Use the following request body:
```json
{
    "id": 20033
}
```

### Database

The database structure is simple, with only two tables.
- teacher 
    - id - INTEGER (primary key)
    - name - TEXT
    - age - INTEGER
- student
    - id - INTEGER (primary key)
    - name - TEXT
    - age - INTEGER
    - religion - TEXT

This gets auto initialized when the backend starts. The data will not be persisted. If the backend is down, the data gets lost


## Frontend

The frontend provides the following features.
- See all teachers
- See all students
- Add new teacher
- Add new student
- Delete teacher
- Delete student
- Edit teacher
- Edit student

## How to Run the Backend

Please install the following prerequisites. 

- Install Node JS - https://nodejs.org/en/download/
- Run `npm install`
- Run `npm start`

To run the tests, use the command - `npm test`

## How to Run the Frontend

Please install the following prerequisites. 

- Install Node JS - https://nodejs.org/en/download/
- Navigate to the `frontend` folder. `cd frontend`
- Run `npm install`
- Run `npm start`
- Navigate to http://localhost:4200/ on your browser

To run the tests, use the command - `npm test`

# Tasks

The completion of these tasks will be decided on the successful completion of the unit tests for both the frontend and the backend.

## Task one

The `/addTeacher` and `addStudent` endpoints are incomplete. Please read this ReadMe file (the api spec is given above), and complete the add teacher and add student endpoints in the backend.

## Task two

The `/deleteStudent` and `deleteTeacher` endpoints are incomplete. The Database connections need to be completed. Please read this ReadMe file (the api spec is given above), and complete the delete student and delete teacher endpoints in the backend.


## Task three

In the frontend (user interface), for Student and Teacher tables, the edit functionality is incomplete. Please complete the frontend functionality and implement two endpoints in the backend to `/editStudent` and `/editTeacher`. Feel free to come up with your own API spec (format) for this
