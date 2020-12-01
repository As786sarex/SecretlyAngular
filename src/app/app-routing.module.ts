import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SendMessageComponent} from './send-message/send-message.component';
import {LoginComponent} from './login/login.component';
import {ShowMessagesComponent} from './show-messages/show-messages.component';
import {JwtAuthGuard} from './services/auth-service/jwt-auth.guard';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'showMessages', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sendMessage/:userId', component: SendMessageComponent},
  {path: 'showMessages', component: ShowMessagesComponent, canActivate: [JwtAuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
