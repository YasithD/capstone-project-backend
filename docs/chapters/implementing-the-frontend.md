## 4. Implementing the Frontend

In this section we will be implementing the frontend of the `teacher` class and connecting it with the backend features we created.

Below sections will guide you sequentially on how to implement the frontend of the **capstone project**.

### Services

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

The final `add-new-teacher` component should look like this.

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