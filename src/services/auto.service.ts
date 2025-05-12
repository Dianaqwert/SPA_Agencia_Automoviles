// src/app/services/auto.service.ts
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private http: HttpClient) {}

  retornar(){
    return this.http.get("https://autos.free.beeceptor.com/autos").pipe(take(1));
  }
}