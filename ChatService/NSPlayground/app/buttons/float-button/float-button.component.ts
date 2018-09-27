import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";

@Component({
	selector: "FloatButton",
	moduleId: module.id,
	templateUrl: "./float-button.component.html",
	styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {
	@Input() text: string;
	@Output() tap: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	ngOnInit(): void {
	}
	onTap(args) {
		this.tap.emit(args);
		if (args.view.className === 'float-btn down') {
			args.view.className = 'float-btn up';
		}
		else {
			args.view.className = 'float-btn down';
		}
	}
	onTouch(args) {
	}
}