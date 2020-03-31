import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import * as airports from "./../../assets/apis-json/airports.json";
import * as cities from "./../../assets/apis-json/cities.json";
import * as countries from "./../../assets/apis-json/countries.json";

const urls = [
  {
    url: "http://localhost:3000/assets/apis-json/airports",
    json: airports
  },
  {
    url: "http://localhost:3000/assets/apis-json/cities",
    json: cities
  },
  {
    url: "http://localhost:3000/assets/apis-json/countries",
    json: countries
  }
];

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Intercepted request: " + request.url);
    const match = urls.find(e => e.url === request.url);
    if (match) {
      console.log("Loaded from JSON: " + request.url);
      return of(
        new HttpResponse({ status: 200, body: (match.json as any).default })
      );
    }
    return next.handle(request);
  }
}
