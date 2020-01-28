import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { User } from '../models/user';

@Injectable()
export class UserService {

  private STORAGE_KEY = 'angular_weather_users';
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public authenticateUser(user: User): any {
    const users = this.storage.get(this.STORAGE_KEY) || [];

    const foundUser = users.find((u: User) => {
      if (user.username === u.username) {
        return u;
      }
    });
    if (foundUser !== null && foundUser !== undefined) {
      if (foundUser.password === user.password) {
        return {
          success: true,
          reason: 'Found user!'
        };
      } else {
        return {
          success: false,
          reason: 'Username and password do not match!'
        };
      }
    } else {
      user.cities = [];
      users.push(user);
      this.storage.set(this.STORAGE_KEY, users);
      return {
        success: true,
        reason: 'Registered user!'
      };
    }
  }

  public getCitiesFromUsername(username: string): string[] {
    const users = this.storage.get(this.STORAGE_KEY) || [];
    return users.find((u: User) => (username === u.username)).cities;
  }

  public addCityToUsername(username: string, city: string): void {
    const users = this.storage.get(this.STORAGE_KEY) || [];
    users.find((u: User) => {
      if (username === u.username) {
        u.cities.push(city);
      }
    });
    this.storage.set(this.STORAGE_KEY, users);
  }

}
