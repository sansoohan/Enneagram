import { Component, OnInit,ViewChild } from '@angular/core';
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";

@Component({
  moduleId: module.id,
  selector: 'Blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  selectedImagePath;
  selectedLocation;
  blogTypes: Array<string> = ["Australia", "Belgium", "Bulgaria", "Canada", "Switzerland",
  "China", "Czech Republic", "Germany", "Spain", "Ethiopia", "Croatia", "Hungary",
  "Italy", "Jamaica", "Romania", "Russia", "United States"];
  selectedListPickerIndex: number = 0;

  constructor() { }

  ngOnInit() { }

  selectLocation() {

  }
  selectImage() {

  }
  onUploadTap(){
    
  }
}
