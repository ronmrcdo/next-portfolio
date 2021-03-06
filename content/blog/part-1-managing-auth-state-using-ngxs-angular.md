---
title: "Part 1 - Angular Authentication with NGXS and JWT"
description: "Setting up JWT Authentication with NGXS on Angular - Part 1"
date: "2020-10-01"
keywords: "Angular,NGXS,Authentication,State Management,JWT"
---

State management is a method of managing the state of the application (front end). **NGXS** is a state management pattern and library for Angular.

### What is  **NGXS**

> NGXS is a state management pattern + library. It provides as a single
> source of truth for your application's state, providing simple rules
> for predictable state mutations.
> 
> NGXS is modeled after the CQRS pattern popularly implemented in
> libraries like Redux and NgRx but reduces boilerplate by using modern
> TypeScript features such as classes and decorators.

### Introduction
In this article we will cover the auth state, auth service and dependencies.

### Getting Started
**1. Install packages and import to app.module.ts**

Using npm
    
    npm install @ngxs/store @ngxs/storage-plugin @ngxs/router-plugin @auth0/angular-jwt

Using yarn

    yarn add @ngxs/store @ngxs/storage-plugin @ngxs/router-plugin @auth0/angular-jwt

Create a **store** folder in your src. This fille will automatically import your states, persistent keys to the app.module.ts

    // src/_store/index.ts
    import { AuthState } from './auth';
    
    export * from './auth';
    
    export const AppState = [
     AuthState
    ];
    
    export const PersistAppState = {
	  key: [
	    'auth.token',
      ]
    };

Import the dependencies on the app.module.ts

    // src/app/app.module.ts
    import { NgModule } from '@angular/core';
    
    /**
     * State
     */
    import { NgxsModule } from '@ngxs/store';
    import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
    import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
    import { environment as env } from '../environments/environment';
    import { AppState, PersistAppState } from './_store';
    
    @NgModule({
      //..
      imports: [
       NgxsModule.forRoot(
         AppState,
         { developmentMode: !env.production }
       ),
       NgxsRouterPluginModule.forRoot(),
       NgxsStoragePluginModule.forRoot(PersistAppState),
       //..
      ],
      //..
    })
    export class AppModule {}
**2. Creating the Auth Service**
First we need to create our auth service. This will communicate directly to the server using http client. Inside src folder create the **services** folder and the **auth.service.ts**.

    mkdir _services && touch _services/auth.service.ts

Inside the auth.service 

    // src/_services/auth.service.ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { JwtHelperService } from '@auth0/angular-jwt';
    import { environment as env } from '../../environments/environment';
    
    @Injectable({ providedIn: 'root' })
    export class AuthService {
    
        private _jwtService: JwtHelperService;
        private readonly baseUrl: string = env.API_URL;
    
        constructor(private _httpClient: HttpClient) {
            this._jwtService = new JwtHelperService();
        }
    
        isExpired(token: string): boolean {
            try {
                return this._jwtService.isTokenExpired(token);
            } catch (err) {
                return false;
            }
        }
    
        login(credentials: { email: string, password: string }): Observable<any> {
            return this._httpClient.post(`${this.baseUrl}/login`, credentials);
        }
    
        logout(): Observable<any> {
            return this._httpClient.post(`${this.baseUrl}/logout`);
        }
    }

**3. Creating the State**
Inside your **src/_store** folder, Create another folder name **auth** 

    mkdir auth

After creating the folder, create the necessary file.

    touch auth.state.ts && touch auth.actions.ts && touch index.ts

Defining State and Actions.

> An **action** is a type of command which should be called when
> something happens or you want to trigger at an event
> 
> **States** are classes along with decorators to describe metadata and
> action mappings.

    // src/_store/auth/auth.actions.ts
    export class AuthStateModel {
      isAuthenticated: boolean;
      token: string | null;
    }
    
    export class CheckSession {
      static readonly type = '[Auth] CheckSession';
    }
    
    export class Login {
      static readonly type = '[Auth] Login';
      constructor(public credentials: { email: string, password: string}) { }
    }
    
    export class Logout {
      static readonly type = '[Auth] Logout';
    }
    
    export class LoginSuccess {
      static readonly type = '[Auth] LoginSuccess';
      constructor(public token: string) { }
    }
    
    export class LoginRedirect {
      static readonly type = '[Auth] LoginRedirect';
    }
    
    export type AuthActions =
      | CheckSession
      | Login
      | Logout
      | LoginSuccess
      | LoginRedirect;
    
    export const AuthDefaultState = {
      isAuthenticated: false,
      token: null;
    };
After creating the actions. Create now the state it will contain the global state of auth.

    // src/_store/auth/auth.state.ts
    import { Injectable } from '@angular/core';
    import { State, Selector, StateContext, Action, NgxsOnInit } from '@ngxs/store';
    import { Navigate } from '@ngxs/router-plugin';
    import { Observable, throwError } from 'rxjs';
    import { tap, catchError } from 'rxjs/operators';
    
    import { AuthService } from '../../_services/auth.service';
    import {
      AuthStateModel,
      AuthDefaultState,
      CheckSession,
      Login,
      Logout
      LoginSuccess,
      LoginRedirect
    } from './auth.actions';
    
    interface ITokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
    }
    
    @State<AuthStateModel>({
        name: 'auth',
        defaults: AuthDefaultState
    })
    @Injectable({ providedIn: 'root' }) // For specific version of angular you need to include this to make it work
    export class AuthState implements NgxsOnInit {
    
        protected readonly fallBackUrl = '/dashboard';
        protected readonly loginUrl = '/login';
    
        constructor(private _authService: AuthService) { }
    
        @Selector()
        static token(state: AuthStateModel): string|null {
            return state.token;
        }
    
        @Selector()
        static isAuthenticated(state: AuthStateModel): boolean {
            return state.isAUthenticated;
        }
    
        // This will trigger to check the token if it's still valid
        ngxsOnInit({ dispatch }: StateContext<AuthStateModel>): void {
            dispatch(new CheckSession());
        }
    
        @Action(CheckSession)
        validateSession({ dispatch, getState }: StateContext<AuthStateModel>): void {
            const { token } = getState();
    
            if (token && !this._authService.isExpired(token)) {
                dispatch(new LoginSuccess(token));
            } else {
                dispatch(new LoginRedirect());
            }
        }
    
        @Action(Login)
        authenticateUser({ dispatch }: StateContext<AuthStateModel>, { credentials }): Observable<any> {
            return this._authService.login(credentials)
                .pipe(
                    tap(({ acess_token, refresh_token }: ITokenResponse) => {
                        dispatch(new LoginSuccess(access_token));
                    })
                );
        }
    
        @Action(Logout)
        logout({ dispatch }: StateContext<AuthStateModel>): Observable<any> {
            return this._authService.logout()
                .pipe(
                    tap(_ => dispatch(new LoginRedirect())),
                    catchError((err: any) => dispatch(new LoginRedirect()))
                );
        }
    
        @Action(LoginSuccess)
        onLoginSuccess({ patchState: dispatch }: StateContext<AuthStateModel>, { token }: LoginSuccess): void {
            patchState({
                isAuthenticated: true,
                token
            });
    
            dispatch(new Navigate([this.fallBackUrl]));
        }
    
        @Action(LoginRedirect)
        onRedirection({ patchState, dispatch }: StateContext<AuthStateModel>): void {
            patchState(AuthDefaultState);
            dispatch(new Navigate([this.loginUrl]));
        }
    }

For index.ts you just need to export this state and actions

    // src/_store/auth/index.ts
    export * from './auth.actions.ts';
    export * from './auth.state.ts';


**4. Using NGXS on the Login Component**

On your login.component.html

    // login.component.html
    <form role="form" [formGroup]="form" (ngSubmit)="form.valid && onSubmit()">
	    <mat-form-field appearance="outline">
	        <mat-label>Email</mat-label>
	        <input 
	            matInput 
	            formControlName="email" 
	            placeholder="Email"
	        />
	    </mat-form-field>

	    <mat-form-field appearance="outline">
	        <mat-label>Password</mat-label>
	        <input 
	            matInput
	            type="password"
	            formControlName="password"
	            placeholder="Password"
	        />
	    </mat-form-field>

	    <div class="block">
	        <button 
	            mat-raised-button
	            type="submit" 
	            color="primary" 
	            class="w-full"
	        >
	            Login
	        </button>
	    </div>
    </form>
This is a simple form for login. In your login.component.ts 

    import { Component, OnDestroy } from '@angular/core;
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { Store } from '@ngxs/store';
    import { Login } from '../../_store/auth';
    import { takeUntil } from 'rxjs/operators';
    import { Subject } from 'rxjs';
    
    @Component({
      selector: 'app-login',
      templateUrl: './login.component.html'
    })
    export class LoginComponent implements  OnDestroy {
    
      public form: FormGroup;
      protected subscription: = new Subject();
    
      constructor(
        private _fb: FormBuilder,
        private _store: Store
      ) {
        this.form = this._fb.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, Validators.required]
        });
      }
    
      ngOnDestroy(): void {
        this._subscription.next();
        this._subscription.complete();
      }
    
      onSubmit(): void {
        const credentials = this.form.value;
    
        this._store
          .dispatch(new Login(credentials))
          .pipe(takeUntil(this._subscription))
          .subscribe(
            (res: any) => {
              // Message
            },
            (err: any) => {
              // Error Message
            }
          );
      }
    }

So when the user submit the form, it will dispatch Login Action in the Auth State if the response is success it will redirect the user on the set fallback url.

    // src/_store/auth/auth.state.ts
    protected readonly fallbackUrl = 'dashboard';

On the next part we will cover the **token interceptor**, **route guard** and **refresh token**.