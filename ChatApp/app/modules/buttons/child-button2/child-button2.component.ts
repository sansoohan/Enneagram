import { Component, EventEmitter, Output, OnInit, ViewChild, Input } from "@angular/core";
import { View } from "tns-core-modules/ui/core/view";

@Component({
	selector: "ChildButton2",
	moduleId: module.id,
	templateUrl: "./child-button2.component.html",
	styleUrls: ['./child-button2.component.css']
})
export class ChildButton2Component implements OnInit {
	args: any;
	@Input() text: string;
	@Output() tap: EventEmitter<any> = new EventEmitter<any>();
	public floatButtonOn: boolean = false;
	private drawer: boolean;
	constructor() {
	}

	ngOnInit(): void {
	}
	onLoaded(args) {
		this.args = args;
	}
	public drawerOpen(drawer: boolean) {
		if (drawer) {
			this.args.object.className = 'child-btn drawer-down';
		}
		else {
			this.args.object.className = 'child-btn drawer-up';
		}
	}
	onTap(args) {
		if(this.floatButtonOn){
			this.tap.emit(args);
		}
	}
}