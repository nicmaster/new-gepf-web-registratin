import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainModule} from './main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { MaterialComponentsModule} from './material-components.module';
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from "./service/rest-service"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgxSpinnerModule } from "ngx-spinner";

// const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true,
//     swipePropagation: false
// };

const sortablejsConfig: SortablejsOptions = {
  animation: 300
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    SortablejsModule,
    MainModule,
    PerfectScrollbarModule,
    NgxSpinnerModule
  ],
  providers: [
    MatIconRegistry,
    RestService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
