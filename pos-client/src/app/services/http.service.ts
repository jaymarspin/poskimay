import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import "rxjs"
import "rxjs-compat"
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  server: string = environment.apiUrl;
  constructor( private http: HttpClient ) { }

  public getData() {
    return this.http.get<any[]>(this.server+ "get-crimes.php?lat=12&lng=33&id=1")
              
  }

//   $crime_type = $postjson['crime_type'];
// $description = $postjson['description'];
// $lat = $postjson['lat'];
// $lng = $postjson['lng'];
// $id = intval($postjson['id']);
  addPerson():any {
    const headers = { 'content-type': 'application/json'}  
    const body={
      crime_type: "awdaw",
      description: "awdawd",
      lat: 456456,
      lng: 9877,
      id: 1
    };
   return this.http.post(this.server + 'add-crime.php', body,{'headers':headers , observe: 'response'})
      
}
 
}
