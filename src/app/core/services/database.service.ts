import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { User } from '../models/user';
import { CityList } from '../models/cities';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const exists = (data: any) => (data !== null) && (data !== undefined);

@Injectable()
export class DatabaseService {

  private LOGGED_IN_USER_KEY = 'angular_weather_logged_in_user';
  private USERS_KEY = 'angular_weather_users';
  private CITY_LISTS_KEY = 'angular_weather_cities';
  private NEXT_ID_KEY = 'angular_next_id';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  private get nextUserId(): number {
    const id = this.storage.get(this.NEXT_ID_KEY) || 0;
    this.storage.set(this.NEXT_ID_KEY, id + 1);
    return id;
  }

  private loggedInUserSubscription = new Subject<User>();
  private loggedInUserCityListSubscription = new Subject<CityList>();

  private loggedInUserChanged(): void {
    this.loggedInUserSubscription.next(this._loggedInUser);
    this.loggedInUserCityListSubscription.next(this._loggedInUserCities);
  }

  private loggedInUserCityListChanged(): void {
    this.loggedInUserCityListSubscription.next(this._loggedInUserCities);
  }

  public get loggedInUserChanges(): Observable<User> {
    return this.loggedInUserSubscription.asObservable();
  }

  public get loggedInUserCityListChanges(): Observable<CityList> {
    return this.loggedInUserCityListSubscription.asObservable();
  }

  public getLoggedInUser(): Observable<User> {
    return of(this._loggedInUser);
  }

  public getLoggedInUserCityList(): Observable<CityList> {
    return of(this._loggedInUserCities);
  }

  private get _loggedInUser(): User {
    return this.storage.get(this.LOGGED_IN_USER_KEY) || null;
  }

  private set _loggedInUser(user: User) {
    this.storage.set(this.LOGGED_IN_USER_KEY, user);
    this.loggedInUserChanged();
  }

  private get _users(): User[] {
    return this.storage.get(this.USERS_KEY) || [];
  }

  private set _users(users: User[]) {
    this.storage.set(this.USERS_KEY, users);
  }

  private get _cityLists(): CityList[] {
    return this.storage.get(this.CITY_LISTS_KEY) || [];
  }

  private set _cityLists(cityLists: CityList[]) {
    this.storage.set(this.CITY_LISTS_KEY, cityLists);
  }

  private get _loggedInUserCities(): CityList {
    if (exists(this._loggedInUser)) {
      return this._cityLists.find((cl: CityList) => (cl.userId === this._loggedInUser.id));
    } else {
      return null;
    }
  }

  private set _loggedInUserCities(cityList: CityList) {
    this._cityLists = this._cityLists.filter((cl: CityList) => (cl.userId !== cityList.userId));
    this._cityLists = this._cityLists.concat([cityList]);
    this.loggedInUserCityListChanged();
  }

  public authenticateUser(userData: {name: string, password: string}): Observable<User> {
    return of(this._users.find((u: User) =>
      (userData.name === u.name) && (userData.password === u.password)
    ));
  }

  public loginUser(userData: {name: string, password: string}): Observable<boolean> {
    return this.authenticateUser(userData).pipe(
      map((user: User) => {
        if (exists(user)) {
          this._loggedInUser = user;
          return true;
        }
        return false;
      }
    ));
  }

  public logoutCurrentUser(): Observable<boolean> {
    if (exists(this._loggedInUser)) {
      this._loggedInUser = null;
    }
    return of(true);
  }

  public registerUser(userData: {name: string, password: string}): Observable<{ success: boolean, reason: string }> {

    const sameUser = this._users.find((u: User) => (userData.name === u.name));
    if (exists(sameUser)) {
      return of({
        success: false,
        reason: 'User already exists'
      });
    } else {
      const user = {
        id: this.nextUserId,
        name: userData.name,
        password: userData.password
      } as User;
      const cityList = {
        userId: user.id,
        cities: []
      } as CityList;
      this._users = this._users.concat([user]);
      this._cityLists = this._cityLists.concat([cityList]);
      return this.loginUser(user).pipe(
        map(
          (r: boolean) => {
            return {
              success: r,
              reason: ''
            };
          }
        )
      );
    }
  }

  public addCityToLoggedInUser(city: string): Observable<{ success: boolean, reason: string }> {
    const sameCity = this._loggedInUserCities.cities.find((c: string) => c === city);

    if (exists(sameCity)) {
      return of({
        success: false,
        reason: 'City already exists'
      });
    }

    this._loggedInUserCities = {
      userId: this._loggedInUserCities.userId,
      cities: this._loggedInUserCities.cities.concat([city])
    } as CityList;

    return of({
      success: true,
      reason: ''
    });
  }

  public removeCityFromLoggedInUser(city: string): void {
    this._loggedInUserCities = {
      userId: this._loggedInUserCities.userId,
      cities: this._loggedInUserCities.cities.filter((c: string) => (c !== city))
    } as CityList;
  }

}
