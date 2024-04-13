import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RequestDetails{
    Url:string='https://localhost:7073/api';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
}