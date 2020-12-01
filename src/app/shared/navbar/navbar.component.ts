import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location, PopStateEvent} from '@angular/common';
import {AuthService} from '../../services/auth-service/auth.service';
import {environment} from '../../../environments/environment';
import {log} from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  isAuthenticated = false;

  constructor(public location: Location,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
      this.isAuthenticated = this.auth.isAuthenticated();
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }


  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());

    return true;
  }

  isDocumentation() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return titlee === '#/documentation';
  }

  public logout() {
    localStorage.removeItem(environment.jwt_bearer_header);
    this.isAuthenticated = this.auth.isAuthenticated();
    window.alert('Successfully logged out!');
    this.router.navigate(['\home']).catch(e => log(e));
  }
}
