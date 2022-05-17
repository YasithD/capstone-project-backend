## 4. Implementing the Frontend

In this section we will be implementing the frontend of the `teacher` class and connecting it with the backend features we created.

Below sections will guide you sequentially on how to implement the frontend of the **capstone project**.

### Routing

- Routing is the mechanism that is used to tell the browser what to load when a specific **URL** is called. This is essential in any website that has multiple UIs (*User Interfaces*).
- `Angular` provides an in-built routing module called the `RouterModule`, which is used to handle the routing of the frontend. Create a **router** named `app-routing` for our frontend using the `Angular CLI` by typing the following command.
```bash
ng generate module app-routing --flat --module=app
```

> Here, the additional parameters,
> 
> 1. `--flat` - Puts the file in `src/app` instead of its own folder.
> 2. `--module=app` - Tells the CLI to register it in the `imports` array of the `AppModule`.
> 
> For, further details on routing in `Angular`, visit the following [link](https://angular.io/guide/routing-overview).

- Once the `app-routing` is created, you will find a **TypeScript** file named `app-routing.module.ts` in your `src/app` directory. It will contain a routing template. Replace the template with the following code.

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

> Important: Component specified in the route `''` will be loaded at the `base URL`.

> For more details on these modules, read the following API docs.
> 1. [Routes](https://angular.io/api/router/Routes).
> 2. [RouterModule](https://angular.io/api/router/RouterModule).

Next is the `@NgModule` decorator. It is used to mark the class as an **NgModule**, and it supplies configuration metadata for the class.

> Read more about `@NgModule` using the following [link](https://angular.io/api/core/NgModule)

Next, we provide the routes to the **AppRoutingModule's** `import` array using the **RouterModule's** `forRoot()` method. The `forRoot(routes)` method is used to tell the component the **routes** are configured ar the root level of the application.

The `exports` array is used to export the `RouterModule` so it will be available throughout the application.