import { NgModule } from "@angular/core";
import { LocalCommonModule } from "../commons/local-common.module";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RegisterFormComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, LocalCommonModule, ReactiveFormsModule],
  exports: [RegisterFormComponent],
})
export class ComponentsModule {}
