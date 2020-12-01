import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {SendMessageComponent} from './send-message/send-message.component';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {MessageCardComponent} from './message-card/message-card.component';
import {ShowMessagesComponent} from './show-messages/show-messages.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ClipboardModule} from 'ngx-clipboard';
import {AuthService} from './services/auth-service/auth.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {MessagesService} from './services/messages-service/messages.service';
import {ServiceWorkerModule} from '@angular/service-worker';

export function tokenGetter() {
  return localStorage.getItem(environment.jwt_bearer_header);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SendMessageComponent,
    PageNotFoundComponent,
    MessageCardComponent,
    ShowMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    ClipboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['example.com'],
        throwNoTokenError: false,
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [AuthService, JwtHelperService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
