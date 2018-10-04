import { Component, OnInit } from "@angular/core";

@Component({
	selector: "ChildButton1",
	moduleId: module.id,
	templateUrl: "./child-button1.component.html",
	styleUrls: ['./child-button1.component.css']
})
export class ChildButton1Component implements OnInit {
	constructor() {
	}

	ngOnInit(): void {
	}
	onTap(args) {
		if (args.view.className === 'child-btn down') {
			args.view.className = 'child-btn up';
		}
		else {
			args.view.className = 'child-btn down';
		}
	}
	onTouch(args) {
	}
}