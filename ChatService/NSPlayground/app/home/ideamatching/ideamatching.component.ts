import { Component, OnInit,ViewChild } from '@angular/core';
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";

@Component({
  moduleId: module.id,
  selector: 'IdeaMatching',
  templateUrl: './ideamatching.component.html',
  styleUrls: ['./ideamatching.component.css']
})
export class IdeamatchingComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  selectLocation() {

  }
  selectImage() {

  }
  onUploadTap(){
    
  }
}
