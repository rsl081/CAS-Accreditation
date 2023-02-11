import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacultyModule } from './faculty/faculty.module';
import { AccreditorModule } from './accreditor/accreditor.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Loadinginterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule,
    AdminModule,
    FacultyModule,
    AccreditorModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    AppRoutingModule, 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Loadinginterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}