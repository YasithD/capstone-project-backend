## 3. Implementing the Frontend

In this section we will be implementing the frontend of the `teacher` class and connecting it with the backend features we created.

Below sections will guide you sequentially on how to implement the frontend of the **capstone project**.

### Services

A component shouldn't fetch data from the server directly. It should only know how to present the fetched data. To decouple fetching the data and presenting the data, `Angular` uses `Services`. Services act as an intermediate layer between the frontend and the backend.

In the [Implementing the Backend](/docs/chapters/implementing-the-backend.md) section, we created APIs for the `CRUD` operations of the Teacher class. Now, let's create a service to access those APIs.

To create a `Angular Service`, we can use the `Angular CLI`. Type the following command in the terminal to create the `Service`.

```bash
ng generate service app-service
```

Now, in your `src/app` directory, look out for a file named `app-service.service.ts` and open it. Let's add the additional code to the `Service` to implement the necessary services.

First, start by importing the `HttpClient` module from `@angular/common/http`.

```typescript
import { HttpClient } from '@angular/common/http';
```

The `@Injectable` decorator is responsible for marking the `AppServiceService` class as a class that participates in the **[dependency injection system](https://angular.io/guide/dependency-injection)**. The metadata `providedIn: 'root'` registers a provider with the *root injector* for the service. That means the service will be provided at root level and `Angular` creates a single instance of the object which shared with any class that asks for it.

Now, inside the `AppServiceService` class, add a **readonly** variable called `ROOT_URL` to specify the **root/base URL** of the backend.

```typescript
readonly ROOT_URL;
```

In the constructor add a private `HttpClien` instance called `http` and set the `ROOT_URL` to the base URL of the backend. In our case, `http://localhost:8080`.

```typescript
constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8080'
}
```

The next task is to implement the functions to call the APIs of the backend. Let's start by creating a function to retrieve teachers.

#### 1. Retrieve Teachers

```typescript
getTeacherData() {
    return this.http.get('/api/listTeachers')
}
```

> The `get` method of the `HttpClient` module constructs an **observable** that, when **subscribed**, causes the configured `GET` request to execute on the server. For more information on the method, read the following [document](https://angular.io/api/common/http/HttpClient#get).

#### 2. Retrieving a single Teacher

```typescript
getOneTeacherData(payload: Object) {
    return this.http.post('/api/getTeacherInfo', payload)
}
```

#### 3. Adding a Teacher

```typescript
addTeacher(payload: Object) {
    return this.http.post('/api/addTeacher', payload)
}
```

#### 4. Deleting a Teacher

```typescript
deleteTeacher(payload: Object) {
    return this.http.post('/api/deleteTeacher', payload)
}
```

The finalized `app-service` service should look like this.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8080'
  }

  getTeacherData(){
    return this.http.get('/api/listTeachers')
  }

  getOneTeacherData(payload: Object){
    return this.http.post('/api/getTeacherInfo', payload)
  }

  addTeacher(payload: Object){
    return this.http.post('/api/addTeacher', payload)
  }

  deleteTeacher(payload: Object){
    return this.http.post('/api/deleteTeacher', payload)
  }
  
}
```

### Routing

Routing is the mechanism that is used to tell the browser what to load when a specific **URL** is called. This is essential in any website that has multiple UIs (*User Interfaces*).

`Angular` provides an in-built routing module called the `RouterModule`, which is used to handle the routing of the frontend. Create a **router** named `app-routing` for our frontend using the `Angular CLI` by typing the following command.
```bash
ng generate module app-routing --flat --module=app
```

> Here, the additional parameters,
>
> 1. `--flat` - Puts the file in `src/app` instead of its own folder.
> 2. `--module=app` - Tells the CLI to register it in the `imports` array of the `AppModule`.
>
> For, further details on routing in `Angular`, visit the following [link](https://angular.io/guide/routing-overview).

Once the `app-routing` is created, you will find a **TypeScript** file named `app-routing.module.ts` in your `src/app` directory. It will contain a routing template. Replace the template with the following code.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewTeacherComponent } from './components/add-new-teacher/add-new-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';


const routes: Routes = [
  { path: '', component: TeacherTableComponent },
  { path: 'addTeacher', component: AddNewTeacherComponent },
  { path: 'editTeacher', component: EditTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

#### Understanding the code

First let's understand the imports.

The `Routes` and `RouterModule` modules are imported from the `@angular/router` module and is used to implement the routing functionality.

The next **component** imports are used to specify which component to load in a particular route.

The next part is the `routes` array. This array is used to specify which component should be loaded at a particular route. The `path` parameter is used to specify the route and the `component` parameter is used to specify the component to be loaded at a particular route.

> Ex: Load the `AddNewTeacherComponent` component when the URL `<base_url>/addTeacher` is specified.

> **Important**: Component specified in the route `''` will be loaded at the `base URL`.

> For more details on these modules, read the following API docs.
> 1. [Routes](https://angular.io/api/router/Routes).
> 2. [RouterModule](https://angular.io/api/router/RouterModule).

Next is the `@NgModule` decorator. It is used to mark the class as a **NgModule**, and it supplies configuration metadata for the class.

> Read more about `@NgModule` using the following [link](https://angular.io/api/core/NgModule)

Next, we provide the routes to the **AppRoutingModule's** `import` array using the **RouterModule's** `forRoot()` method. The `forRoot(routes)` method is used to tell the component the **routes** are configured ar the root level of the application.

The `exports` array is used to export the `RouterModule` so it will be available throughout the application.

After creating the `Router`, replace all the code in `app.component.html` which is located in the `src/app` directory with the following.

```html
<router-outlet></router-outlet>
```

The selector for the `Router` is `router-outlet`. Now in the `app` component, the `Router` will be loaded when the `app` is served. 

### Navigation

In this section we will create a navigation panel for our frontend. It will help a user to navigate between `Teachers`, and `Students`. Start by creating an **Angular Component** `navbar` using the **Angular CLI**.

```bash
ng generate component navbar
```

Now, navigate to the `navbar.component.ts` file in the `components/navbar` directory.

First, import the `Router` component we exported in the [Routing](#routing) section.

```typescript
import { Router } from '@angular/router';
```

We will be using this `navbar` component to display the `Title` of the page as well. Due to that we should make the component able to receive the `title` as an `input` from its parent. Nothing will be sent from the component to its parent. This is called `one-way data binding` and `Angular` uses a decorator called `@Input` for this purpose.

First, import the `@Input` decorator from `@angular/core`. Use the same object used to import `Component` and `OnInit` to import `Input`. 

```typescript
import { Component, OnInit, Input } from '@angular/core';
```

Inside the `NavbarComponent` include the `@Input` decorator and give it a `title` variable of type `string`.

```typescript
@Input() title: string;
```

Finally, inside the `constructor` of the component, pass the `Router` so it can be accessed by the component for navigation.

```typescript
constructor(  private router: Router) { }
```

The finalized file should look like this.

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  title: string;

  constructor(  private router: Router) { }

  ngOnInit(): void {
  }

}
```

Now, open the `navbar.component.html` file located inside the `navbar` directory.

Copy and paste the following code to the file.

```html
<div class="navbar-container">
    <div class="logo-container">
        <img width="80px" src="http://placehold.jp/18/ffffff/000000/120x120.png?text=LOGO">
    </div>
  
    <div class="links-container">
        <a routerLink="" [ngClass]="{bold : title=='Teachers'}">Teachers</a>
        <p>|</p>
        <a routerLink="student" [ngClass]="{bold : title=='Students'}">Students</a>
    </div>
    <div class="blank-space"></div>
</div>
<div class="info-container">
    <div class="logo-container">
        <p class="info-text">{{title}}</p>
    </div>
    <div class="blank-space"></div>
    <div class="links-container">
    </div>

</div>
```

#### Understanding the code

The `navbar` contains **2** sections. One for displaying the **navigation links** (*navbar-container*) and one for **displaying the title** (*info-container*).

First, the logo is added to the *navbar-container*. The *links-container* includes the navigation links for our frontend. 

- `routerLink` links the element to the route specified. On this instance, when the HTML `a` tag is clicked, it will navigate to the route specified at `routerLink`.
- `[ngClass]` is a `property binding method` in `Angular` to add/remove a class to/from an element. Here, a logical operation is included inside the `[ngClass]`. What happens here is, if the `title` property passed in as an **input** for the element is equal to the specified name, the class `bold` is added to the `a` tag.

In the *info-container* we display the `title` received using the `{{ title }}` syntax.

Now, open the `navbar.component.css` file located in the `navbar` directory.

Copy and paste the following CSS styles for the classed specified in the HTML template.

```css
.navbar-container{
    width: 100%;
    height: 120px;
    background-color: #272928;
    display: flex;
}

.logo-container{
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blank-space{
    width: 33%;
}

.links-container{
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: 100;
}

a{
    font-size: 22px;
    margin: 20px;
    color: white;
    font-weight: 300;
}

.bold{
    font-weight: 400;
}

.logout{
    font-weight: 200;
}

.info-container{
    background-color: #EEEEEE;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;

}

.info-text-container{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6%;
   
}

.info-text{
    font-size: 32px;
    font-weight: 500;
    letter-spacing: -2px;
}
```

### Components

#### 1. Add new Teacher

The component `add-new-teacher` can be found in the `src/app/components` directory. It contains 4 files. Open the `add-new-teacher.component.ts` file.

The file content will look like this.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.css']
})
export class AddNewTeacherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
}
```

Here, inside the `@Component` decorator there are some fields defined. Let's go through them one by one.

1. **selector** - The component's CSS element selector.
2. **templateUrl** - The location of the component's template file.
3. **styleUrls** - The location of the component's private CSS styles.

Now let's add the additional content to implement functionality of the `add-new-teacher` component.

First let's import the necessary modules for the component. Add the following lines of code the imports.

```typescript
import { AppServiceService } from '../../app-service.service';
import { Router } from '@angular/router';
```

Now let's add the necessary parameters to the constructor of the `AddNewTeacherComponent`.

```typescript
constructor(private service : AppServiceService, private router: Router) { }
```

- Here we are passing the `AppServiceService` we exported under the section [Services](#services) as a private `service` instance. Also, we are passing a `Router` we exported in the section [Routing](#routing) as a private `router` instance.

Next, let's create a method to create a teacher. Add the following line of code inside `AddNewTeacherComponent`.

```typescript
createTeacher(value) {
    const teacher = {
      id : value.id,
      name : value.name,
      age : value.age
    }
    
    
    this.service.addTeacher(teacher).subscribe((response)=>{
      this.router.navigate([''])
    },(error)=>{
      console.log('ERROR - ', error)
    })
}
```

Here, first a teacher object will be created using the `value` object passed into the `createTeacher` function.

By using the `AppServiceService` instance `service` passed into the constructor, the `addTeacher` method of the service is called. The `subscribe` method is used to receive the data **asynchronously** and update the website.

> The `subscribe` method is used when the data is fetched from a remote server. Receiving data after requesting from a server tends to take some time. Because of this, when the code is read sequentially the function might not return the data immediately. Whenever the data is received it should update the frontend. To implement this functionality the frontend property assignments should be done **asynchronously**. This asynchronous updating mechanism is handled by the `subscribe` method.

The `subscribe` method first catches the `response` of the server if the request is successful. Then using the `router` it navigates to the `''` route (*home page*) upon a successful `post` request.

If an **error** occurs during the request, the `error` is caught using the next callback function. In the code it is logged into the console. 

The final `add-new-teacher.component` component should look like this.

```typescript
import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.css']
})
export class AddNewTeacherComponent implements OnInit {

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  createTeacher(value){

    const teacher = {
      id : value.id,
      name : value.name,
      age : value.age
    }


    this.service.addTeacher(teacher).subscribe((response)=>{
      this.router.navigate([''])
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

}
```

Next, let's take look at the HTML template of the `add-new-teacher` component. In the `add-new-teacher` directory, look out for a file named `add-new-teacher.component.html` and open it.

Copy and paste the following code into the file.

```html
<app-navbar title="Add New Teacher"></app-navbar>
<div>
    <form #addTeacherForm="ngForm"  class="form-container" (ngSubmit)="createTeacher(addTeacherForm.value)">
        <input id="teacher-id" ngModel name="id" type="text" placeholder="ID">
        <input id="teacher-name" ngModel name="name" type="text" placeholder="Name">
        <input id="teacher-age" ngModel name="age" type="text" placeholder="Age">
        <button id="teacher-add" class="form-button">Create</button>
    </form>
</div>
```

#### Understanding the code

The `navbar` component created in the [Navigation](#navigation) section have been added at the top of the code with setting the `title` to **Add New Teacher**.

Next, a `form` HTML element is added to submit the data given provided by the user.



Now let's add the necessary `CSS` for the HTML template. Open the `add-new-teacher.component.css` file and paste the following CSS styles.

```css
.form-container{
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
```

This code will style our component

#### 2. Edit Teacher

The component `edit-teacher` can be found in the `src/app/components` directory. It contains 4 files. Open the `edit-teacher.component.ts` file.

```js
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {


  teacherData: any;


  constructor(private service : AppServiceService, private router: Router) { }

  navigation = this.router.getCurrentNavigation();

  ngOnInit(): void {
    this.getTeacherData();
  }

}
```

The initial code segments as similar to the ones explained in the previous [component](#1-add-new-teacher).

The only Difference is the the code segment

```js
ngOnInit(): void {
    this.getTeacherData();
  }
```

Which instructs the component to run the function `getTeacherData` (which must be defined and explained below) during the initialization of the component.

Now, let's create the two methods to get the teachers details which is named `getTeacherData` and a method to edit the Teacher data named `editTeacher`.

Add these lines of code inside `EditTeacherComponent` 

```typescript
  getTeacherData(){
    let teacher = {
      id : this.navigation.extras.state.id
    }
    this.service.getOneTeacherData(teacher).subscribe((response)=>{
      this.teacherData = response[0];
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  editTeacher(values){
    console.log("Still hasn't been Implemented")
  }
```
Here, firstly considering the function `getTeacherData` we get the id of the teacher from the state object saved on the navigation.

By using the `AppServiceService` instance `service` passed into the constructor, the `getOneTeacherData` method of the service is called. The `subscribe` method is used to receive the data **asynchronously** and update the website.

The final `edit-teacher.component` component should look like this.

```typescript

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {


  teacherData: any;


  constructor(private service : AppServiceService, private router: Router) { }

  navigation = this.router.getCurrentNavigation();

  ngOnInit(): void {
    this.getTeacherData();
  }

  getTeacherData(){
    let teacher = {
      id : this.navigation.extras.state.id
    }
    this.service.getOneTeacherData(teacher).subscribe((response)=>{
      this.teacherData = response[0];
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  editTeacher(values){
    console.log("Still hasn't been Implemented")
  }

}

```

Next, let's take look at the HTML template of the `edit-teacher` component. In the `edit-teacher` directory, look out for a file named `edit-teacher.component.html` and open it.

Copy and paste the following code into the file.

```html
<app-navbar title="Edit Teacher Details"></app-navbar>
<div>
    <form #editTeacherForm="ngForm"  class="form-container" (ngSubmit)="editTeacher(editTeacherForm.value)">
        <input id="teacher-name" ngModel name="name" type="text" placeholder="Name" value="{{teacherData?.name}}">
        <input id="teacher-age" ngModel name="age" type="text" placeholder="Age" value="{{teacherData?.age}}">
        <button id="teacher-edit" class="form-button">Edit & Save</button>
    </form>
</div>
```

#### Understanding the code

The `navbar` component created in the [Navigation](#navigation) section have been added at the top of the code with setting the `title` to **Edit Teacher Details**.

Next, a `form` HTML element is added to submit the data given provided by the user.

In the form data the `value` option is filled with the data recieved by the `getTeacherData` function which is the `teacherData` object.


Now let's add the necessary `CSS` for the HTML template. Open the `edit-teacher.component.css` file and paste the following CSS styles.

```css
.form-container{
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
```

This code will style our component

#### 2. Teacher Table

The component `teacher-table` can be found in the `src/app/components` directory. It contains 4 files. Open the `teacher-table.component.ts` file.

```js
import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }
```

The initial code segments as similar to the ones explained in the previous [component](#1-add-new-teacher).

The Differences is the the code segment

```js
ngOnInit(): void {
    this.getTeacherData();
  }
```

Which instructs the component to run the function `getTeacherData` (which must be defined and explained below) during the initialization of the component.

```js
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';

faTrash = faTrash;
faPlus = faPlus;
faPenSquare = faPenSquare;
```

`faTrash`, `faPlus` and `faPenSqure` are icons that are imported from fontawesome package, these icons are used in the `teacher-table.component.html` file.

Now, let's create the 4 methods in `TeacherTableComponent` to get data for the component and route to specific functions on the system.

`addNewTeacher` -> Route to add new teacher component.
`editTeacher` -> Route to add edit teacher component.
`getTeacherData` -> Get the data of the list of teachers in the system.
`deleteTeacher` -> Delete the teacher with the id that is passed.


Add these lines of code inside `EditTeacherComponent` 

```typescript
addNewTeacher(){
  this.router.navigate(['addTeacher'])
}

editTeacher(id){
  const navigationExtras: NavigationExtras = {
    state: {
      id : id
    }
  };
  this.router.navigate(['editTeacher'], navigationExtras )
}

getTeacherData(){
  this.selected = 'Teachers';
  this.service.getTeacherData().subscribe((response)=>{
    this.teacherData = response;
  },(error)=>{
    console.log('ERROR - ', error)
  })
}

getStudentData(){
  this.selected = 'Students';
  this.service.getStudentData().subscribe((response)=>{
    this.teacherData = response;
  },(error)=>{
    console.log('ERROR - ', error)
  })
}

deleteTeacher(itemid){
  const test = {
    id: itemid
  }
  this.service.deleteTeacher(test).subscribe((response)=>{
    this.getTeacherData()
  })
}
```

Further lets all so add a function to implement the functionality of searching a teacher from the table.

```typescript
search(value) {
    let foundItems = [];
    if (value.length <= 0) {
      this.getTeacherData();
    } else {
      let b = this.teacherData.filter((teacher) => {
        if (teacher[0].name.toLowerCase().indexOf(value) > -1) {
          foundItems.push(teacher)
        }
      });
      this.teacherData = foundItems;
    }
  }
```

This function first checks the length of the keyword given (In this case the the variable `value`) if it's zero (when the page is first loaded it is zero as well) it calls the `getTeacherData` method which gets all the teachers in the database. But if we type a search word in the input we filter the data using `.filter()` to get the relevant rows in the table.
And at last the filtered values are assigned to `this.teacherData` attribute which is used to populate the table.

The final `teacher-table.component` component should look like this.

```typescript
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras)
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response) => {
      this.teacherData = Object.keys(response).map((key) => [response[key]]);
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  getStudentData() {
    this.selected = 'Students';
    this.service.getStudentData().subscribe((response) => {
      this.teacherData = response;
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  search(value) {
    let foundItems = [];
    if (value.length <= 0) {
      this.getTeacherData();
    } else {
      let b = this.teacherData.filter((teacher) => {
        if (teacher[0].name.toLowerCase().indexOf(value) > -1) {
          foundItems.push(teacher)
        }
      });
      this.teacherData = foundItems;
    }
  }

  deleteTeacher(itemid) {
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
      this.getTeacherData()
    })
  }
}

```

Next, let's take look at the HTML template of the `teacher-table` component. In the `teacher-table` directory, look out for a file named `teacher-table.component.html` and open it.

Copy and paste the following code into the file.

```html
<app-navbar title="Teachers"></app-navbar>
<div class="add-btn-container">
  <div class="add-btn-elements-container">
    <input id="teacher-search" style="height: 20px;" #box (keyup)="search(box.value)" placeholder="Search">
    <button style="width: 120px; height: 43px; font-size: 14px;" (click)="addNewTeacher()" class="btn">Add New &nbsp;<fa-icon [icon]="faPlus"></fa-icon></button>
  </div>
</div>
<div class="table-container">
  <table id="teacher-table">
    <tr>
      <th>Name</th>
      <th>Staff ID</th>
      <th>DOB</th>
      <th style="width: 50px;"></th>
      <th style="width: 50px;"></th>
    </tr>
    <tr *ngFor="let teacher of teacherData">
      <td>{{teacher[0].name}}</td>
      <td>{{teacher[0].id}}</td>
      <td>{{2022 - teacher[0].age}}</td>
      <td id="teacher-edit-{{teacher[0].id}}" (click)="editTeacher(teacher[0].id)" style="text-align: center;">
        <fa-icon class="edit-icon" [icon]="faPenSquare"></fa-icon>
      </td>
      <td id="teacher-delete-{{teacher[0].id}}" (click)="deleteTeacher(teacher[0].id)"
        style="text-align: center; color: #FC4F4F;">
        <fa-icon class="trash-icon" [icon]="faTrash"></fa-icon>
      </td>
    </tr>
  </table>
</div>
```

#### Understanding the code

The `navbar` component created in the [Navigation](#navigation) section have been added at the top of the code with setting the `title` to **Teachers**.

Check the `<input>` tag under the `<div class="add-btn-elements-container">` tag, this controlls the table search functionality, if you enter a value for the input tag it will run (`(keyup)="search(box.value)"`) the function search which was defined in the `teacher-table.component` file.

Next, a `button` is added to add a teacher which on click execute the `addNewTeacher()` function defined in the component file.

Note the usage of `faTrash`,`faPlus` and `faPenSquare` which are the imported icons from the awesome package mentioned above. 

Next, a `table`,`<tr>` and `<td>`  HTML elements are used to create a table and `*ngFor="let teacher of teacherData"` is used to loop over teacherData where each item is accessed as teacher variable during the loop. the teacher variable is used to access the row data.

Now let's add the necessary `CSS` for the HTML template. Open the `teacher-table.component.css` file and paste the following CSS styles.

```css
table {
    font-family: 'Poppins', sans-serif;
    border-collapse: collapse;
    width: 75%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
  
  td, th {
    /* border: 0.01px solid #dddddd; */
    text-align: left;
    padding: 8px;
  }
  
  /* tr:nth-child(even) {
    background-color: #dddddd;
  } */

  th{
    font-size: 16px;
    background-color: #dddddd;
  }

  tr{
    font-size: 14px;
    background-color: white;
  }

.table-container{
    padding: 0px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.trash-icon{
  font-size: 16px;
  margin-left: -75px;
}

.trash-icon:hover{
  cursor: pointer;
  color: #f44009;
}

.add-btn-container{
  padding: 20px 220px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.btn{
  /* width: 70px; */
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
}

.navbar-container{
  width: 100%;
  height: 120px;
  background-color: #272928;
  display: flex;
}

.logo-container{
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* border-color: white;
  border-style: solid; */
}

.blank-space{
  width: 33%;

  /* border-color: white;
  border-style: solid; */
}

.links-container{
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: 100;

  /* border-color: white;
  border-style: solid; */
}

a{
  font-size: 22px;
  margin: 20px;
  color: white;
  font-weight: 500;
}

.logout{
  font-weight: 200;
}

.info-container{
  background-color: #EEEEEE;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;

}

.info-text-container{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6%;
 
}

.edit-icon{
  font-size: 20px;
  margin-left: -75px;
  color: #5c625f;
}

.edit-icon:hover{
  cursor: pointer;
  color: #212322;
}

.info-text{
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -2px;
}
```

`:hover` tag will apply the css styling when mouse pointer hovers over the element