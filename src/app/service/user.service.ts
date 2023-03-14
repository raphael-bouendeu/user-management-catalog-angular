import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiurl: string = 'https://randomuser.me/api'

  constructor(private http: HttpClient) {
  }
  // Fetc h users
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<any>(`${this.apiurl}/?results=${size}`).pipe(
      map(this.processResponse)
    )
  }
  // Fetch one user using the user UUID
  getUser(uuid: string): Observable<Response> {
    return this.http.get<any>(`${this.apiurl}/?uuid=${uuid}`).pipe(
      map(this.processResponse)
    )
  }

  private processResponse(response: Response): Response {
    return {
      info: {
        ...response.info
      },
      results: response.results.map((user: any) => (<User>{

        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number}, ${user.location.street.name} ,${user.location.city},${user.location.street.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: {
          latitude: +user.location.coordinates.latitude,
          longitude: +user.location.coordinates.longitude
        }
      })
      )
    }
  }
}
