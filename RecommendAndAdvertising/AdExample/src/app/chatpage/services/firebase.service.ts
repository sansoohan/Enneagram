import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  thisUser_messages: Observable<any[]>;
  itemValue: string;
  thisRoom_id: string;
  thisUser_id: string;
  thisUser_enneagram: any;
  constructor(private angularFireDatabase: AngularFireDatabase,
    // private angularFireList: AngularFireList<ChatMessage>
  ) {
    this.makeUser({
      enneagram: {
        behavior: '',
        emotion: '',
        thought: '',
        number: '',
        state: '',
      },
      state: 'in_room'
    });
  }
  makeUser(init_item: any) {
    this.angularFireDatabase.list('/randomusers').push(init_item).then(result => {
      this.thisUser_id = result.path.pieces_[1];
    });
  }
  sendMessage(selectedUser_id: string, item: any) {
    if (selectedUser_id == null || this.thisUser_id == null) {
      console.log('user left');
    } else {
      this.angularFireDatabase.list('/messages/' + this.thisUser_id + '/messages').push(item)
      .then(result => {
        this.angularFireDatabase
        .object(
          '/messages/' + selectedUser_id + '/messages/' + result.path.pieces_[3]
        ).set(item);
      });
    }
  }
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
