import {Component, OnInit} from '@angular/core';
import {Message} from '../models/message';
import {ClipboardService} from 'ngx-clipboard';
import {MessagesService} from '../services/messages-service/messages.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {

  msgArray: Message[] = [];
  user: string;
  pageCount = 1;
  myMessageUrl;
  str = 'সময়ের প্রেক্ষিতে কিছু বিশেষ চরণ আর্বিভূত হয় হৃদয় গহীনে। \n' +
    'ক্ষুদ্র প্রয়াসে ব্যাকুল হৃদয়ে উচ্ছ্বাস ওঠে ক্ষুদ্র সৃষ্টিতে।\n' +
    ' যেখানে নগন্য-তুচ্ছু আমি- ওই হৃদয়ে অবস্থান সাধ্যাতীত। তবু স্বপ্ন নিয়ে এসেছি--';

  constructor(private clipboardService: ClipboardService,
              private msgService: MessagesService,
              private jwt: JwtHelperService,
              private router: Router) {
    this.myMessageUrl = environment.send_msg_base;
  }

  ngOnInit() {
    const token = this.jwt.tokenGetter();
    if (!token) {
      this.router.navigate(['/error']).catch(e => console.log(e));
    } else {
      console.log(token);
      const s = this.jwt.decodeToken(token);
      this.user = s.sub;
      this.myMessageUrl = this.myMessageUrl + this.user;
      const url = environment.BASE_URL + '/v1/viewAllMessages';
      this.msgService.getAllMessagesByUsername(url, token).subscribe(data => {
        this.msgArray = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  copyElement() {
    this.clipboardService.copy(this.myMessageUrl);
  }
}
