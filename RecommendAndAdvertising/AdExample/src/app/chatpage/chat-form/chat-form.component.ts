import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message;

  constructor(private chat: ChatService,
    private firebaseService: FirebaseService
  ) {
    this.message = '';
  }

  ngOnInit() {
  }

  send() {
    // this.chat.sendMessage(this.message);
    this.message = '';
    this.firebaseService.sendMessage('-LQUOFlwScLlyhEjAAj0', {
      randomuser_id: '-LQUOFlwScLlyhEjAAj0',
      randomuser_enneagram_num: '8',
      message: 'hello',
      timeSent: this.firebaseService.getTimeStamp(),
      timeOpened: this.firebaseService.getTimeStamp(),
      timeClosed: this.firebaseService.getTimeStamp()
    });
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
