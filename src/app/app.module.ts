import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { jwtInterceptorProvider } from './helpers/jwt.interceptor';
import { errorInterceptorProvider } from './helpers/error.interceptor';
import { AuthGuard } from "./guards/auth.guard";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { OptionsComponent } from './options/options.component';
import { IssueComponent } from './issue/issue.component';
import { LoginComponent } from './login/login.component';
import { AssignedToMeComponent } from './dashboard/assigned-to-me/assigned-to-me.component';
import { CreatedByMeComponent } from './dashboard/created-by-me/created-by-me.component';
import { ClosedIssuesComponent } from './dashboard/closed-issues/closed-issues.component';

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "newissue", component: NewIssueComponent, canActivate: [AuthGuard] },
  { path: "options", component: OptionsComponent, canActivate: [AuthGuard] },
  { path: "issue/:id", component: IssueComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

/**
 * 
 * The bootstrapper module
 *
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewIssueComponent,
    OptionsComponent,
    IssueComponent,
    LoginComponent,
    AssignedToMeComponent,
    CreatedByMeComponent,
    ClosedIssuesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    jwtInterceptorProvider,
    //errorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
