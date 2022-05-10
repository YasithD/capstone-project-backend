import server from "../server.js";
import supertest from "supertest";
const requestWithSupertest = supertest(server);

describe("Teacher Endpoints", () => {
  it("GET /listTeachers should show all teachers", async () => {
    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;
    expect(body.length).toEqual(3);
    body.forEach(element => {
        expect(element).toHaveProperty('age');
        expect(element).toHaveProperty('name');
        expect(element).toHaveProperty('id');
    });
  });

  it("POST /addTeacher should show a newly added teacher", async () => {
    // add new teacher
    await requestWithSupertest.post("/addTeacher").send({
        "id": 10033,
        "name": "Nilanthi Fernando",
        "age": 42
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;
    
    expect(body).toContainEqual({
        "id": 10033,
        "name": "Nilanthi Fernando",
        "age": 42
    });
  });

  it("POST /deleteTeacher should delete a teacher", async () => {
    // add new teacher
    await requestWithSupertest.post("/addTeacher").send({
        "id": 100333,
        "name": "Pasindu Fernando",
        "age": 45
    });

    // delete Teacher
    await requestWithSupertest.post("/deleteTeacher").send({
        "id": 100333
    });

    const res = await requestWithSupertest.get("/listTeachers");
    expect(res.status).toEqual(200);
    let body = res.body;
    
    expect(body).not.toContainEqual({
        "id": 100333,
        "name": "Pasindu Fernando",
        "age": 45
    });
  });
});

describe("Student Endpoints", () => {
    it("GET /listStudents should show all students", async () => {
      const res = await requestWithSupertest.get("/listStudents");
      expect(res.status).toEqual(200);
      let body = res.body;
      expect(body.length).toEqual(3);
      body.forEach(element => {
          expect(element).toHaveProperty('age');
          expect(element).toHaveProperty('name');
          expect(element).toHaveProperty('id');
          expect(element).toHaveProperty('religion');
      });
    });
  
    it("POST /addStudent should show a newly added student", async () => {
      // add new student
      await requestWithSupertest.post("/addStudent").send({
        "id": 20033,
        "name": "Rashini Shehara",
        "age": 12,
        "religion": "Buddhist"
    });
  
      const res = await requestWithSupertest.get("/listStudents");
      expect(res.status).toEqual(200);
      let body = res.body;
      
      expect(body).toContainEqual({
        "id": 20033,
        "name": "Rashini Shehara",
        "age": 12,
        "religion": "Buddhist"
    });
    });
  
    it("POST /deleteStudent should delete a student", async () => {
      // add new teacher
      await requestWithSupertest.post("/addStudents").send({
        "id": 20033,
        "name": "Rashini Shehara",
        "age": 12,
        "religion": "Buddhist"
    });
  
      // delete Student
      await requestWithSupertest.post("/deleteStudent").send({
          "id": 20033
      });
  
      const res = await requestWithSupertest.get("/listStudents");
      expect(res.status).toEqual(200);
      let body = res.body;
      
      expect(body).not.toContainEqual({
        "id": 20033,
        "name": "Rashini Shehara",
        "age": 12,
        "religion": "Buddhist"
    });
    });
  });
