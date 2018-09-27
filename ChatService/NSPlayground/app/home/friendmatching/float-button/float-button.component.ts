import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
import { TouchGestureEventData, GestureEventData } from "ui/gestures";
import { StackLayout } from "ui/layouts/stack-layout";

@Component({
	selector: "FloatButton",
	moduleId: module.id,
	templateUrl: "./float-button.component.html",
	styleUrls: ['./float-button.component.css', './child-button1/child-button1.component.css']
})
export class FloatButtonComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}
	onTap(args) {
		var parent = args.view.parent as this;
		console.log(parent);
		
		if (args.view.className === 'float-btn down') {
			args.view.className = 'float-btn up';
		}
		else {
			args.view.className = 'float-btn down';
		}
		if (args.view.className === 'child-btn down') {
			args.view.className = 'child-btn up';
		}
		else {
			args.view.className = 'child-btn down';
		}
	}
}