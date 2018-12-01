import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: any;
  userName: string;
  timeStamp: Date = new Date();
  messageContent: string;
  isOwnMessage: boolean;
  isSystemMessage: boolean;

  constructor(
    private firebaseService: FirebaseService
  ) {

  }

  ngOnInit() {
    let messageID;
    for (messageID in this.chatMessage) {
      if (this.chatMessage[messageID] != null) {
        this.messageContent = this.chatMessage[messageID]['message'];
        this.timeStamp = this.chatMessage[messageID]['timeSent'];
        console.log(this.chatMessage[messageID]['randomuser_id']);
        console.log(this.firebaseService.thisUser_id);
        this.isOwnMessage = (this.chatMessage[messageID]['randomuser_id'] === this.firebaseService.thisUser_id);
        this.userName = this.isOwnMessage ? 'You' : 'Apponent';
        if (this.chatMessage[messageID]['randomuser_id'] === 'system') {
          this.userName = 'System';
        }
      }
    }
  }
}
