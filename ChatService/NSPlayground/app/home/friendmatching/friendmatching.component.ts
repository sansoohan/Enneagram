import { ItemEventData } from "ui/list-view"
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
@Component({
	selector: "Friendmatching",
	moduleId: module.id,
	templateUrl: "./friendmatching.component.html",
	styleUrls: ['./friendmatching.component.css']
})
export class FriendmatchingComponent implements OnInit {


    
    constructor() {

    }

	ngOnInit(): void {
	}

}