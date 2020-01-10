# AngularWeather

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Feladat
Készíts egy Angular SPA alkalmazást, mely időjárás előrejelzéseket képes lekérdezni egy API-ról.

* Az alkalmazás kezdőképernyője egy bejelentkező felület, melyre egy felhasználónév jelszó párost beírva enged csak tovább az alkalmazás.
* Az alkalmazás egyetlen tabos képernyőből áll, a tabokon egy-egy város aktuális időjárása látható részletesen, illetve a hőmérséklet 5 napos előrejelzése egy vonaldiagrammon.
* Az utolsó tabfül egy „+” felirat legyen, melyre kattintva nem egy újabb tab, hanem egy modal jelenik meg. A modalban megadható egy város neve, melyet az „hozzáadás” gombra kattintva új tabként jelenítünk meg.
* Egy tab belsejében a város aktuális időjárása (hőmérséklet, páratartalom, légnyomás, szélerősség-irány) illetve a hőmérséklet 5-napos előrejelzése látható egy line charton.
* A tabok jobb felső sarkában helyezzünk el egy törlés gombot is, mellyel az adott várost törölni lehet a listából.

## Egyéb követelmények
* Az alkalmazáshoz backend-et nem kell készíteni, a szükséges adatokat tároljuk a böngésző valamelyik HTML5 Storage-ában (local storage, indexeddb, stb.). Megvalósítás során ügyeljünk arra, hogy a tárolás módja nagyon egyszerűen cserélhető legyen backend hívásokra.
* A bejelentkezéshez szükséges adatokat is a böngészőben tároljuk, ha olyan felhasználót adunk meg, ami még nem létezik, akkor azt hozzuk létre és később már csak a megadott jelszóval engedélyezzük a megadott felhasználónévvel való bejelentkezést. A kiválasztott városok is a felhasználóhoz tartoznak, mindenki csak a saját városait lássa!

## Felhasználandó technológiák/eszközök
* Angular 7, Angular CLI
* Angular Bootstrap (https://ng-bootstrap.github.io/) vagy Angular Material (https://material.angular.io/): tab, modal, stb. komponensek
* Chartok: https://swimlane.github.io/ngx-charts/
* Időjárás API: https://openweathermap.org/current és https://openweathermap.org/forecast5

A megoldást a node_modules mappa nélkül várjuk, a kód egy npm install után futtatható legyen az npm start paranccsal.
