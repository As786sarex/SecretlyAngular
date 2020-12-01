import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../models/message';
import htmlToImage from 'html-to-image';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  currentBg;

  bgColorArray = ['bg-gradient-success', 'bg-gradient-info', 'bg-gradient-warning' , 'bg-gradient-danger', 'bg-gradient-primary'];

  @Input()
  public messageItem: Message;

  constructor() {
  }

  ngOnInit() {
    this.currentBg = this.bgColorArray[this.messageItem.backgroundType % 5];
    console.log(this.messageItem);
  }

  downloadImage(id: number) {
    htmlToImage.toPng(document.getElementById(String(id)))
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'message-' + id + '.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }
}
