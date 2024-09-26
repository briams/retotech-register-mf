import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import { LocalStorageService } from "../../commons/services/local-storage.service";
import { AppConfig } from "../../config/app.config";
import { IUser } from "../../commons/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthorizationAPIService {
  constructor(private _localStorageSVC: LocalStorageService) {}

  registerUser(newUser: IUser) {
    const userList: IUser[] =
      this._localStorageSVC.getItem(AppConfig.keyUsers, true) || [];

    this._localStorageSVC.setItem(
      AppConfig.keyUsers,
      [...userList, { ...newUser, id: userList.length + 1 }],
      true
    );

    return of(true).pipe(delay(1500));
  }
}
