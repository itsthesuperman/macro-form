import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = '/api/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getUsers() {
    return this.http.get(this.userURL,this.httpOptions).pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.userURL, user, this.httpOptions).pipe(catchError(this.handleError));
  }

  /** DELETE: delete the user from the server */
deleteUser(id: string): Observable<{}> {
  const url = `${this.userURL}/${id}`; 
  return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

/** PUT: update the user on the server. Returns the updated user upon success. */
updateUser(user: User): Observable<any> {
  return this.http.put<User>(this.userURL, user, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
}
