import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { View } from "tns-core-modules/ui/core/view";
import { GestureEventData } from "tns-core-modules/ui/gestures";

@Component({
	selector: "ActionButton",
	moduleId: module.id,
	templateUrl: "./action-button.component.html",
	styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {

	@Input('isArrow') isArrow: boolean;

	@Output("tap") tap: EventEmitter<GestureEventData> = new EventEmitter<GestureEventData>();

	@ViewChild("lineTop",{static: false}) _lineTopRef: ElementRef;
	@ViewChild("lineCenter",{static: false}) _lineCenterRef: ElementRef;
	@ViewChild("lineBottom",{static: false}) _lineBottomRef: ElementRef;

	constructor() {
	}

	onTap(args: GestureEventData) {
		this.tap.next(args);
	}

	updateTop(element: View, animate: boolean) {
		if (animate) {
			if (this.isArrow) {
				element.animate({
					rotate: -45,
					scale: { x: 0.45, y: 1 },
					translate: { x: -5, y: 3 },
					duration: 200
				}).catch(() => { });
			} else {
				this.animateToHamburger(element);
			}
		} else {
			element.rotate = -45;
			element.scaleX = 0.45;
			element.translateX = -5;
			element.translateY = 3;
		}
	}

	updateCenter(element: View, animate: boolean) {
		if (animate) {
			if (this.isArrow) {
				element.animate({
					rotate: 0,
					scale: { x: 0.9, y: 1 },
					translate: { x: 1, y: 0 },
					duration: 200
				}).catch(() => { });
			} else {
				this.animateToHamburger(element);
			}
		} else {
			element.rotate = 0;
			element.scaleX = 0.9;
			element.translateX = 1;
			element.translateY = 0;
		}
	}

	updateBottom(element: View, animate: boolean) {
		if (animate) {
			if (this.isArrow) {
				element.animate({
					rotate: 45,
					scale: { x: 0.45, y: 1 },
					translate: { x: -5, y: -3 },
					duration: 200
				}).catch(() => { });
			} else {
				this.animateToHamburger(element);
			}
		} else {
			element.rotate = 45;
			element.scaleX = 0.45;
			element.translateX = -5;
			element.translateY = -3;
		}
	}

	animateToHamburger(element: View) {
		element.animate({
			rotate: 0,
			scale: { x: 1, y: 1 },
			translate: { x: 0, y: 0 },
			duration: 200
		}).catch(() => { });
	}

	public makeArrow() {
		this.updateTop(this._lineTopRef.nativeElement, false);
		this.updateCenter(this._lineCenterRef.nativeElement, false);
		this.updateBottom(this._lineBottomRef.nativeElement, false);
	}
}