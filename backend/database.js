import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

export const initializeDatabase = () => {
    db.serialize(function() {
        // create teacher table and insert dummy records
        db.run("CREATE TABLE teacher (id INTEGER, name TEXT, age INTEGER)");
        db.run("INSERT INTO teacher values (10001, 'Kusuma Ranasinghe', 45)");
        db.run("INSERT INTO teacher values (10002, 'Saman De Silva', 40)");
        db.run("INSERT INTO teacher values (10003, 'Parasanna Mahagamage', 30)");
        
        // create student table and insert dummy records
        db.run("CREATE TABLE student (id INTEGER, name TEXT, age INTEGER, religion TEXT)");
        db.run("INSERT INTO student values (20001, 'Supun Mihiranga', 10, 'Buddhist')");
        db.run("INSERT INTO student values (20002, 'Sandun Perera', 9, 'Catholic')");
        db.run("INSERT INTO student values (20003, 'Isuri De Silva', 10, 'Buddhist')");
    });
}

export const readTeachers = async () => {
    return new Promise(function(resolve,reject) {
        db.all("SELECT * FROM teacher", function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully fetched teachers from database");
            resolve(rows)
        });
        
    });
}

export const readTeacherInfo = async (id) => {
    return new Promise(function(resolve,reject) {
        db.all(`SELECT * FROM teacher WHERE id = ${id}`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully fetched teacher info from database");
            resolve(rows)
        });
        
    });
}

export const addTeacher = async (id, name, age) => {
    return new Promise(function(resolve,reject) {
        db.all(`INSERT INTO teacher values (${id}, '${name}', ${age})`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully inserted teacher into database");
            resolve({status: "successfully added teacher"})
        });
        
    });
}

export const deleteTeacher = async (id) => {
    return new Promise(function(resolve,reject) {
        db.all(`DELETE FROM teacher WHERE id=${id}`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully deleted teacher from database");
            resolve({status: "successfully deleted teacher"})
        });
        
    });
}

export const readStudents = async () => {
    return new Promise(function(resolve,reject) {
        db.all("SELECT * FROM student", function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully fetched students from database");
            resolve(rows)
        });
        
    });
}

export const readStudentInfo = async (id) => {
    return new Promise(function(resolve,reject) {
        db.all(`SELECT * FROM student WHERE id = ${id}`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully fetched students from database");
            resolve(rows)
        });
        
    });
}

export const addStudent = async (id, name, age, religion) => {
    return new Promise(function(resolve,reject) {
        db.all(`INSERT INTO student values (${id}, '${name}', ${age}, '${religion}')`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully inserted student into database");
            resolve({status: "successfully added student"})
        });
        
    });
}

export const deleteStudent = async (id) => {
    return new Promise(function(resolve,reject) {
        db.all(`DELETE FROM student WHERE id=${id}`, function(err, rows) {
            if(err != null){
                console.log(err);
                reject({"status": "error"})
            }
            console.log("Successfully deleted student from database");
            resolve({status: "successfully deleted student"})
        });
        
    });
}
