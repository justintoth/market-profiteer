import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ClientStorage } from '../shared/client-storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService
  ) { }

  public save(user: User): Observable<User> {
    console.log('User Service > Saving user...', user);
    return this.http.post<User>(`${environment.apiUrl}/users`, user)
      .pipe(
        tap(result => {
          console.log('User Service > Saved user: ', result);
          // Save user to local storage.
          ClientStorage.saveUser(result);
        })
      );
  }

  public authenticate(user: User): Observable<boolean> {
    console.log('User Service > Authenticating user...', user);
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, user)
      .pipe(
        map(result => {
          console.log('User Service > Authentication succeeded: ', result);
          // Save user to local storage.
          ClientStorage.saveUser(result);
          return true;
        })
      );
  }

  public signOut() {
    console.log('User Service > Signing out user...');
    ClientStorage.deleteUser();
  }

  public getAuthenticatedUser(): User {
    return ClientStorage.getUser();
  }

  public isAuthenticated(): boolean {
    /*if (ClientStorage.getUser() != null) {
      console.log('ClientStorage.getUser().AuthToken: ' + ClientStorage.getUser().AuthToken);
      console.log('this.jwtHelper.isTokenExpired(): ' + this.jwtHelper.isTokenExpired());
      console.log('this.jwtHelper.isTokenExpired(ClientStorage.getUser().AuthToken): ' + this.jwtHelper.isTokenExpired(ClientStorage.getUser().AuthToken));
    }*/
    return ClientStorage.getUser() != null && !this.jwtHelper.isTokenExpired();
  }

}
