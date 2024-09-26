import {
  ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NgModule,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";

import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { LocalCommonModule } from "./commons/local-common.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    LocalCommonModule,
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    try {
      customElements.define("rtech-register-mf", webComponent);
    } catch (e) {
      console.log("Try recreating custom element", e);
    }
  }

  public ngDoBootstrap(appRef: ApplicationRef) {
    //
  }
}
