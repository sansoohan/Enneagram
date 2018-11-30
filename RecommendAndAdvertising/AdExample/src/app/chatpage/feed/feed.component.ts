import { Component, OnInit, OnChanges } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Array<any>;
  // feed: FirebaseListObservable<ChatMessage[]>;

  constructor(
    public firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.feed = [];
    // this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
    this.feed = this.firebaseService.thisRoomMessagesArray;
    // this.feed = this.chat.getMessages();
  }
}
