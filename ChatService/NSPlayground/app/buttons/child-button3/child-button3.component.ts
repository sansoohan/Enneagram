import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { View } from "tns-core-modules/ui/core/view";

@Component({
	selector: "ChildButton3",
	moduleId: module.id,
	templateUrl: "./child-button3.component.html",
	styleUrls: ['./child-button3.component.css']
})
export class ChildButton3Component implements OnInit {
	args: any;
	@Input() text: string;
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
			this.args.object.className = 'child3-btn drawer-down';
		}
		else {
			this.args.object.className = 'child3-btn drawer-up';
		}
	}
}