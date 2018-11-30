import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public thisUser_messages: Observable<any[]>;
  public itemValue: string;
  public thisRoom_id: string;
  public thisRoomMessages: any;
  public thisRoomMessagesArray: Array<any>;
  public thisUser_id: string;
  public thisUser_state: any;
  public selectedUser_id: any;
  public thisUser_enneagram: any;
  public searchedUsers: any;
  public searchedUsersCount: number;
  public searchedUsersIndex: number;
  public filteredUsersIndex: number;
  public databaseLock: boolean;

  public userWaiting: boolean;
  public userChatting: boolean;
  public userSearching: boolean;
  constructor(public angularFireDatabase: AngularFireDatabase,
    // private angularFireList: AngularFireList<any>,
    // private angularFireList: AngularFireList<ChatMessage>
  ) {
    // this.selectedUser_id = '-LS4w0tNHzzOTfS5YcUW';
    // this.findFriend([3]);
    this.thisUser_state = 'waiting';
    this.userWaiting = true;
    this.userChatting = false;
    this.userSearching = false;
  }

  syncThisUserState() {
    // let messagePack;
    console.log('syncThisUserState');
    this.angularFireDatabase.list('/randomusers/' + this.thisUser_id)
    .snapshotChanges(['child_changed'])
    .subscribe(actions => {
      this.thisRoomMessages = {};
      this.thisRoomMessagesArray = [];
      actions.forEach(action => {
        // console.log('syncThisUserState type  :' + action.type);
        // console.log('syncThisUserState key   :' + action.key);
        // console.log('this user_id : ' + this.thisUser_id);
        // console.log('syncThisUserState value :' + action.payload.val());
        if (action.key === 'selected_user') {
          this.selectedUser_id = action.payload.val();
        }
        if (action.key === 'state') {
          if (this.thisUser_state === action.payload.val()) {
            return;
          } else {
            switch (this.thisUser_state) {
              case 'chatting':
                this.userChatting = false;
                break;
              case 'waiting':
                this.userWaiting = false;
                break;
              case 'searching':
                this.userSearching = false;
                break;
            }
          }
          this.thisUser_state = action.payload.val();
          switch (this.thisUser_state) {
            case 'chatting':
              this.userChatting = true;
              break;
            case 'waiting':
              this.userWaiting = true;
              // this.thisRoomMessages = {};
              // this.thisRoomMessagesArray = [];
              // this.setMessageDisabled();
              break;
            case 'searching':
              this.userSearching = true;
              break;
          }
          console.log('user_state :' + this.thisUser_state);
          console.log('selected_user :' + this.selectedUser_id);
        }
        // this.thisRoomMessages[action.key] = action.payload.val();
        // messagePack = {};
        // messagePack[action.key] = action.payload.val();
        // this.thisRoomMessagesArray.push(messagePack);
      });
    });
  }

  // 1. set random friend (lock database)
  findFriend(search_enneagram_nums: Array<any>, user_profile: any) {
    // Lock
    this.selectedUser_id = '-';
    this.searchedUsers = {};
    this.searchedUsersCount = 0;
    this.angularFireDatabase

    // friend search query and set friend random.
    .list('/randomusers').query.orderByChild('state').equalTo('searching')
    .on('child_added', snapshot => {
      // console.log(snapshot.key);
      // console.log(snapshot.child('/').val());
      console.log(snapshot.child('/').val()['number']);
      // console.log(search_enneagram_nums[this.searchedUsersIndex]);
      // console.log(search_enneagram_nums[this.searchedUsersIndex]);
      if (search_enneagram_nums.find(function(element) {return (element === snapshot.child('/').val()['number']); })) {
        this.searchedUsers[snapshot.key] = snapshot.child('/').val();
        this.searchedUsersCount++;
      }
    });

    // wait search query done. 1.5 sec.
    setTimeout(() => {
      // console.log(this.searchedUsers);
      this.filteredUsersIndex = 0;
      const generatedRandomIndex = Math.floor(this.searchedUsersCount * Math.random());
      for (this.selectedUser_id in this.searchedUsers) {
        if (generatedRandomIndex === this.filteredUsersIndex ) {
          break;
        } else {
          this.filteredUsersIndex++;
        }
      }
      // Unlock
      // this.databaseLock = false;
      console.log('selected_id : ' + this.selectedUser_id);
      if (this.selectedUser_id === '-') {
        user_profile['state'] = 'searching';
        this.setUserState(this.thisUser_id, user_profile);
      } else {
        user_profile['state'] = 'chatting';
        user_profile['selected_user'] = this.selectedUser_id;
        this.setUserState(this.thisUser_id, user_profile);
        this.setUserState(this.selectedUser_id, {state: 'chatting', selected_user: this.thisUser_id});
      }
    }, 1500);
  }
  // 2. set thisuser (after unlock database)
  setUserState(user_id: string, user_profile: any) {
    console.log('setting user state');
    this.angularFireDatabase.object('/randomusers/' + user_id).update(user_profile).then(result => {});
  }
  makeThisUser(user_profile: any) {
    this.databaseLock = true;
    this.angularFireDatabase.list('/randomusers').push(user_profile).then(result => {
      this.thisUser_id = result.path.pieces_[1];
      this.syncThisUserMessage();
      this.syncThisUserState();
    });
  }
  syncThisUserMessage() {
    let messagePack;
    console.log('snapshot');
    this.angularFireDatabase.list('/randomrooms/' + this.thisUser_id + '/messages').query
    .orderByChild('state')
    .equalTo('enabled')
    .on('child_added', snapshot => {
      console.log(snapshot.key);
      console.log(snapshot.child('/').val());
      messagePack = {};
      messagePack[snapshot.key] = snapshot.child('/').val();
      this.thisRoomMessagesArray.push(messagePack);
    });
  }
  // syncThisUserMessage() {
  //   let messagePack;
  //   console.log('snapshot');
  //   this.angularFireDatabase.list('/randomrooms/' + this.thisUser_id + '/messages')
  //   .snapshotChanges(['child_added'])
  //   .subscribe(actions => {
  //     this.thisRoomMessages = {};
  //     this.thisRoomMessagesArray = [];
  //     actions.forEach(action => {
  //       console.log(action.type);
  //       console.log(action.key);
  //       console.log(action.payload.val());
  //       this.thisRoomMessages[action.key] = action.payload.val();
  //       messagePack = {};
  //       messagePack[action.key] = action.payload.val();
  //       this.thisRoomMessagesArray.push(messagePack);
  //     });
  //   });
  // }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  // set message disabled. it will not show the message of closed room.
  setMessageDisabled() {
    this.angularFireDatabase
    .list('/randomrooms/' + this.thisUser_id + '/messages').query
    .orderByChild('state')
    .equalTo('enabled')
    .on('child_added', snapshot => {
      this.angularFireDatabase
      .object('/randomrooms/' + this.thisUser_id + '/messages/' + snapshot.key)
      .update({state: 'disabled'});

      this.angularFireDatabase
      .object('/randomrooms/' + this.selectedUser_id + '/messages/' + snapshot.key)
      .update({state: 'disabled'});
    });
  }
  // each user has own message list. send the message to thisUser and selectedUser.
  sendMessage(item: any) {
    item['state'] = 'enabled';
    if (this.selectedUser_id === '-' || this.thisUser_id == null) {
      console.log('user left');
    } else {
      this.angularFireDatabase.list('/randomrooms/' + this.thisUser_id + '/messages').push(item)
      .then(result => {
        this.angularFireDatabase
        .object(
          '/randomrooms/' + this.selectedUser_id + '/messages/' + result.path.pieces_[3]
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
