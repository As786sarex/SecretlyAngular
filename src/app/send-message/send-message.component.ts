import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/message';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth-service/auth.service';
import {MessagesService} from '../services/messages-service/messages.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  focus1: boolean;
  focus: boolean;
  messageForm: FormGroup;
  secretMsg: Message;
  userId: string;
  messageType: number;
  enabled: boolean;

  constructor(private auth: AuthService,
              private messageService: MessagesService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private jwt: JwtHelperService) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.messageForm = this.formBuilder.group({
      userName: [{value: this.userId, disabled: true}, Validators.required],
      message: ['', Validators.required]
    });
    this.enabled = true;
    this.messageType = Math.floor(Math.random() * 5) + 1;
    this.secretMsg = new Message(null, this.userId, null, this.messageType, null);
    this.messageForm.valueChanges.subscribe(value => {
      this.secretMsg.message = value.message;
    });
  }

  ngOnInit() {
    const token = this.jwt.tokenGetter();
    if (token) {
      const tokenUser = this.jwt.decodeToken(token).sub;
      if (this.userId === tokenUser) {
        console.log(tokenUser);
        this.router.navigate(['/showMessages'])
          .then(data => alert('you cannot send messages to yourself'))
          .catch(e => console.log(e));
      }
    }
    this.auth.isUserExists(this.userId).subscribe(data => {
      if (data.ok) {
        console.log(data);
      } else {
        this.router.navigate(['/home'])
          .catch(e => console.log(e));
      }
    }, error => {
      this.router.navigate(['/home'])
        .catch(e => console.log(e));
    });
  }


  onSubmitMessage() {
    this.enabled = false;
    const url = environment.BASE_URL + '/v1/sendMessage/' + this.userId;
    this.secretMsg.timestamp = new Date();
    this.messageService.sendMessageToUser(url, this.secretMsg).subscribe(data => {
      if (data.status === 201) {
        alert('Successfully sent!!');
      } else {
        alert('Something went wrong ' + data.statusText);
      }
      this.enabled = true;
    }, error => {
      this.enabled = true;
      window.alert('Something went wrong!! Please check your internet connection.');
    });

  }
}
