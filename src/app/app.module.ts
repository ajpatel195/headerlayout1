

import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule,ɵDomSharedStylesHost } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
// import * from './../assets/m1-hea'
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
      BrowserModule,
    HttpClientModule,
    ],
    providers: [
        
    ],
    bootstrap: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
  
})
export class AppModule {
  // XXX - need to have this tested in the automation script
  constructor(private injector: Injector) {

    // this.injector.get(ɵDomSharedStylesHost).removeHost(document.head);

    // required to ensure that material styles don't leak outside of the component
    this.injector.get(ɵDomSharedStylesHost).removeHost(document.head);
  }

  ngDoBootstrap() {
    // const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const el = createCustomElement(AppComponent, { injector: this.injector});

    if (!customElements.get('app-header')) {   // to resolve build issues in tl-portal
      customElements.define('app-header', el);
     }
  }
}


