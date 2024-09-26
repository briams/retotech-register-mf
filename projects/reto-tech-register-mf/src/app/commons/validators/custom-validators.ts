import {
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import SCHEMA from "./../utils/schemas.utils";

export class CustomValidator extends Validators {
  static Email(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length > 0) {
      return control.value.match(SCHEMA.email) ? null : { invalid_email: true };
    }
    return null;
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value || "";
      const fieldValue2 = formGroup.get(field2)?.value || "";

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
