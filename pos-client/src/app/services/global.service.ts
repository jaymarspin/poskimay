import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any
  constructor() {
    this.loading = false
   }
}
