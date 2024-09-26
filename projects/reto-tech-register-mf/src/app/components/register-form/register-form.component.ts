import { Component, NgZone } from "@angular/core";
import { CustomValidator } from "../../commons/validators/custom-validators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationAPIService } from "../../api/services/authorization-api.service";
import { IUser } from "../../commons/interfaces";
import { ValidatorErrors } from "../../commons/utils/validator-errors.utils";

@Component({
  selector: "rt-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
  form: FormGroup = this._formBuilder.group(
    {
      name: ["", [Validators.required]],
      email: ["", [Validators.required, CustomValidator.Email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(4)]],
    },
    {
      validators: [
        CustomValidator.isFieldOneEqualFieldTwo("password", "passwordConfirm"),
      ],
    }
  );

  hidePass: boolean = true;

  constructor(
    private _router: Router,
    private zone: NgZone,
    // private _loaderSVC: LoaderService,
    private _authorizationAPISVC: AuthorizationAPIService,
    private _formBuilder: FormBuilder
  ) {}

  onRegister(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();
    const newUser: IUser = {
      id: 0,
      name: data.name,
      email: data.email,
      password: data.password,
    };

    this._authorizationAPISVC.registerUser(newUser).subscribe({
      next: () => {
        location.href = "/auth/login";
      },
    });
  }

  clickIconPassInput(event: MouseEvent) {
    this.hidePass = !this.hidePass;
    event.stopPropagation();
  }

  isInvalidField(field: string) {
    return ValidatorErrors.isInvalidField(this.form, field);
  }

  getErrorMessage(field: string) {
    return ValidatorErrors.getErrorMessage(this.form, field);
  }

  setFieldTouched(field: string) {
    this.form.controls[field].markAsTouched();
  }
}
