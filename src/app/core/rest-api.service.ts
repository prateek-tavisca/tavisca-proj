import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestApiService {
  // API path
  base_path = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  post<T>(url: string, payLoad: T, httpOpts?: HttpHeaders): Observable<T> {
    let opts = { ...httpOpts };
    if (httpOpts) {
      opts = {
        ...opts,
        ...httpOpts
      };
    }
    return this.http
      .post<T>(this.base_path + url, JSON.stringify(payLoad), opts)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  put<T>(url: string, payLoad: T, httpOpts?: HttpHeaders): Observable<T> {
    let opts = { ...httpOpts };
    if (httpOpts) {
      opts = {
        ...opts,
        ...httpOpts
      };
    }
    return this.http
      .post<T>(this.base_path + url, JSON.stringify(payLoad), opts)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  get<T>(url: string, httpOpts?: HttpHeaders): Observable<T> {
    let opts = { ...httpOpts };
    if (httpOpts) {
      opts = {
        ...opts,
        ...httpOpts
      };
    }
    return this.http.get<T>(this.base_path + url, opts).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, httpOpts?: HttpHeaders): Observable<T> {
    const options = {
      ...this.httpOptions,
      ...httpOpts
    };
    return this.http.delete<T>(this.base_path + url, options).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
