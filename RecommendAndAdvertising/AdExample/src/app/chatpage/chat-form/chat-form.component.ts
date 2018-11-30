import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message;

  constructor(
    public firebaseService: FirebaseService
  ) {
    this.message = '';
  }

  ngOnInit() {
  }

  send() {
    if (this.message === '') {
      return;
    }
    this.firebaseService.sendMessage({
      randomuser_id: this.firebaseService.thisUser_id,
      randomuser_enneagram_num: '8',
      message: this.message,
      timeSent: this.firebaseService.getTimeStamp(),
      timeOpened: this.firebaseService.getTimeStamp(),
      timeClosed: this.firebaseService.getTimeStamp()
    });
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
