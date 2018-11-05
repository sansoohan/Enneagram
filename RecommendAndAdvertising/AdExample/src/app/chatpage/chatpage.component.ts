import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
  }
}
