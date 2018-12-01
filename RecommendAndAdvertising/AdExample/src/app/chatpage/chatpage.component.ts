import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
// import {MatDialog, MatDialogConfig} from '@angular/material';
import * as $ from 'jquery';
@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit, AfterViewChecked {
  message;
  feed: Array<any>;

  behavior = '';
  emotion = '';
  thought = '';
  filterLevel;

  number;
  checkNum;
  enneagram_nums = [];

  resultOut = '';
  resultOut2 = '';

  userProfile = {};
  friendProfile = {};
  selectedUser_id_temp: string;
  @ViewChild('scroller') private feedContainer: ElementRef;
  constructor(
    public firebaseService: FirebaseService,
    // private dialog: MatDialog
  ) {
    this.message = '';
  }

  ngOnInit() {
    setInterval(() => {
      this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollTop;
    }, 100);
  }
  onToggleButton() {
    this.userProfile = {
      behavior: this.behavior,
      emotion: this.emotion,
      thought: this.thought,
      number: this.number,
      selected_user: '-'
    };

    if (!this.number || !this.filterLevel) {
      alert('Please Select All.');
      return;
    }
    // start chatting
    if (this.firebaseService.userWaiting) {
      this.userProfile['state'] = 'chatting';
      if (!this.firebaseService.thisUser_id) {
        this.firebaseService.makeThisUser(this.userProfile);
      }
      console.log(this.enneagram_nums);
      this.firebaseService.findFriend(this.enneagram_nums, this.userProfile);
    // quit room
    } else if (this.firebaseService.userSearching) {
      this.userProfile['state'] = 'waiting';
      this.firebaseService.setUserState(this.firebaseService.thisUser_id, this.userProfile);
    } else if (this.firebaseService.userChatting) {
      this.userProfile['state'] = 'waiting';
      this.userProfile['selected_user'] = this.firebaseService.selectedUser_id;
      this.firebaseService.setUserState(this.firebaseService.thisUser_id, this.userProfile);
      this.friendProfile['state'] = 'waiting';
      this.friendProfile['selected_user'] = this.firebaseService.thisUser_id;
      this.firebaseService.setUserState(this.firebaseService.selectedUser_id, this.friendProfile);
    }
    this.firebaseService.userWaiting = !this.firebaseService.userWaiting;
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  send() {
    if (this.message === '') {
      return;
    }
    this.firebaseService.sendMessage({
      randomuser_id: this.firebaseService.thisUser_id,
      randomuser_enneagram_num: this.firebaseService.selectedUser_id,
      message: this.message,
      timeSent: this.firebaseService.getTimeStamp(),
    });
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  onSelectionChange() {
    setTimeout(() => {
      if ($('#emotionButton input:radio:checked').val()) {
        this.emotion = $('#emotionButton input:radio:checked').val();
      }
      console.log(this.emotion);
    }, 10);
    setTimeout(() => {
      if ($('#behaviorButton input:radio:checked').val()) {
        this.behavior = $('#behaviorButton input:radio:checked').val();
      }
      console.log(this.behavior);
    }, 20);
    setTimeout(() => {
      if ($('#thoughtButton input:radio:checked').val()) {
        this.thought = $('#thoughtButton input:radio:checked').val();
      }
      console.log(this.thought);
    }, 30);
    setTimeout(() => {
      if (this.emotion === '' || this.behavior === '' || this.thought === '') {
        this.resultOut = 'Please fill the form.';
      } else {
        this.number = this.getEnneagram();
        this.resultOut = 'Your enneagram type is ' + this.number + '.<br>';
        this.checkNum = this.checkEnneagram();
        if (this.checkNum === 0) {
          this.resultOut += 'Your third answer might not be ' + this.thought + '. Do you want to save your state?';
        }
      }
      setTimeout(() => {$('#resultOut').html(this.resultOut); }, 10);
    }, 40);
  }
  onFilterChange() {
    setTimeout(() => {
      if ($('#filterButton input:radio:checked').val()) {
        this.filterLevel = $('#filterButton input:radio:checked').val();
      }
      console.log(this.filterLevel);
      this.enneagram_filter(this.filterLevel);
      this.resultOut2 = 'Type ' + this.enneagram_nums.join(', ') + ' of friend will be searched.';
      setTimeout(() => {$('#resultOut2').html(this.resultOut2); }, 10);
    }, 10);
  }

  checkEnneagram(): number {
    if (this.emotion === 'Anger' && this.behavior === 'Active Person' && this.thought === 'Trust or Betray') {return 8; }
    if (this.emotion === 'Anger' && this.behavior === 'Not Active Person' && this.thought === 'Positive or Negative') {return 9; }
    if (this.emotion === 'Anger' && this.behavior === 'Listener' && this.thought === 'Success or Failure') {return 1; }
    if (this.emotion === 'Shame' && this.behavior === 'Listener' && this.thought === 'Positive or Negative') {return 2; }
    if (this.emotion === 'Shame' && this.behavior === 'Active Person' && this.thought === 'Success or Failure') {return 3; }
    if (this.emotion === 'Shame' && this.behavior === 'Not Active Person' && this.thought === 'Trust or Betray') {return 4; }
    if (this.emotion === 'Fear' && this.behavior === 'Not Active Person' && this.thought === 'Success or Failure') {return 5; }
    if (this.emotion === 'Fear' && this.behavior === 'Listener' && this.thought === 'Trust or Betray') {return 6; }
    if (this.emotion === 'Fear' && this.behavior === 'Active Person' && this.thought === 'Positive or Negative') {return 7; }
    return 0;
  }

  getEnneagram(): number {
    if (this.emotion === 'Anger' && this.behavior === 'Active Person') {return 8; }
    if (this.emotion === 'Anger' && this.behavior === 'Not Active Person') {return 9; }
    if (this.emotion === 'Anger' && this.behavior === 'Listener') {return 1; }
    if (this.emotion === 'Shame' && this.behavior === 'Listener') {return 2; }
    if (this.emotion === 'Shame' && this.behavior === 'Active Person') {return 3; }
    if (this.emotion === 'Shame' && this.behavior === 'Not Active Person') {return 4; }
    if (this.emotion === 'Fear' && this.behavior === 'Not Active Person') {return 5; }
    if (this.emotion === 'Fear' && this.behavior === 'Listener') {return 6; }
    if (this.emotion === 'Fear' && this.behavior === 'Active Person') {return 7; }
    return 0;
  }
  enneagram_filter(filter_level: string): void {
    this.enneagram_nums = [];
    if (filter_level === 'High' || filter_level === 'Midium' || filter_level === 'Low') {
      switch (this.number) {
        case 1: this.enneagram_nums.push(4, 7); break;
        case 2: this.enneagram_nums.push(4, 8); break;
        case 3: this.enneagram_nums.push(6, 9); break;
        case 4: this.enneagram_nums.push(1, 2); break;
        case 5: this.enneagram_nums.push(7, 8); break;
        case 6: this.enneagram_nums.push(3, 9); break;
        case 7: this.enneagram_nums.push(1, 5); break;
        case 8: this.enneagram_nums.push(2, 5); break;
        case 9: this.enneagram_nums.push(3, 6); break;
      }
    }
    if (filter_level === 'Midium' || filter_level === 'Low') {
      switch (this.number) {
        case 1: this.enneagram_nums.push(3, 8); break;
        case 2: this.enneagram_nums.push(5, 9); break;
        case 3: this.enneagram_nums.push(1, 5); break;
        case 4: this.enneagram_nums.push(6, 7); break;
        case 5: this.enneagram_nums.push(2, 3); break;
        case 6: this.enneagram_nums.push(5, 7); break;
        case 7: this.enneagram_nums.push(4, 9); break;
        case 8: this.enneagram_nums.push(1, 6); break;
        case 9: this.enneagram_nums.push(2, 7); break;
      }
    }
    if (filter_level === 'Low') {
      switch (this.number) {
        case 1: this.enneagram_nums.push(2, 9); break;
        case 2: this.enneagram_nums.push(1, 3); break;
        case 3: this.enneagram_nums.push(2, 4); break;
        case 4: this.enneagram_nums.push(3, 5); break;
        case 5: this.enneagram_nums.push(4, 6); break;
        case 6: this.enneagram_nums.push(5, 7); break;
        case 7: this.enneagram_nums.push(6, 8); break;
        case 8: this.enneagram_nums.push(7, 9); break;
        case 9: this.enneagram_nums.push(8, 1); break;
      }
    }
  }
}
