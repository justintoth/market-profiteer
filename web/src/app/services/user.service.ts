import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ClientStorage } from '../shared/client-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
  ) { }

  public save(user: User): Observable<User> {
    console.log('Saving user...', user);
    return this.http.post<User>(`${this.apiUrl}/users`, user)
      .pipe(
        tap(result => {
          console.log('Saved user: ', result);
          // Save user to local storage.
          ClientStorage.saveUser(result);
        })
      );
  }

  public authenticate(user: User): Observable<User> {
    console.log('Authenticating user...', user);
    return this.http.post<User>(`${this.apiUrl}/users/authenticate`, user)
      .pipe(
        tap(result => {
          if (result) {
            console.log('Authentication succeeded: ', result);
            // Save user to local storage.
            ClientStorage.saveUser(result);
          } else
            console.warn('Authentication failed: ', result);
        })
      );
  }

  public signOut() {
    console.log('Signing out user...');
    ClientStorage.deleteUser();
  }

  public getAuthenticatedUser(): User {
    return ClientStorage.getUser();
  }

}
