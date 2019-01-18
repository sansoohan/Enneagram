import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
@Component({
	selector: "FloatButton",
	moduleId: module.id,
	templateUrl: "./float-button.component.html",
	styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {
	@Input() text: string;
	@Output() tap: EventEmitter<any> = new EventEmitter<any>();
	public button: StackLayout;
	buttonState: string;
	constructor() {
		this.buttonState = "float-btn up"
	}

	ngOnInit(): void {
	}
	onTap(args) {
		this.tap.emit(args);
		if (args.view.className === 'float-btn down') {
			args.view.className = 'float-btn up';
			this.buttonState = 'float-btn up';
		}
		else {
			args.view.className = 'float-btn down';
			this.buttonState = 'float-btn down';
		}
	}
	onTouch(args) {
	}
}