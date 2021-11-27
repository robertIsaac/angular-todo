import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FirebaseInterceptor } from './interceptor/firebase.interceptor';
import { DEFAULTS, SETTINGS } from '@angular/fire/compat/remote-config';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NzIconModule,
        NzButtonModule,
        AngularFireModule.initializeApp(environment.firebase),
        NzTableModule,
        NzDividerModule,
        ReactiveFormsModule,
        HttpClientModule,
        NzFormModule,
        BrowserAnimationsModule,
        NzPopconfirmModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirebaseInterceptor,
      multi: true,
    },
    {provide: DEFAULTS, useValue: {delay_time: 500}},
    {
      provide: SETTINGS,
      useFactory: () => isDevMode() ? {minimumFetchIntervalMillis: 10_000} : {},
    },
    NzMessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
