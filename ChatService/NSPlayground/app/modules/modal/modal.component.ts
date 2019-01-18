import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from "@angular/core";
import { View } from "ui/core/view";
import { screen, isAndroid } from "platform";
import { AnimationCurve } from "ui/enums";
import { GestureTypes } from "ui/gestures";
import { Page } from "ui/page";
import { android, AndroidApplication, AndroidActivityBackPressedEventData, ios } from "application";

declare const UITapGestureRecognizer, interop, NSObject;

// No support for Array#includes here
function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}

let GestureRecognizer, Interop;
if (ios) {
	GestureRecognizer = NSObject;
	Interop = interop;
} else {
	GestureRecognizer = class A { };
	Interop = { types: { id: void 0, void: void 0 } };
}

class HideGestureRecognizerImpl extends GestureRecognizer {
	public func: () => void;

	static initWithOwner(owner) {
		const handler = new HideGestureRecognizerImpl();
		handler._owner = owner;
		return handler;
	}

	tap() {
		this._owner.ios.resignFirstResponder();
		if (this.func) {
			this.func();
		}
	}

	static ObjCExposedMethods = {
		"tap": { returns: Interop.types.void, params: [Interop.types.id] }
	};
}

// Keep external state of views
let targetHandler = null;
let targetHandler2 = null;


@Component({
	selector: "modal, [modal]",
	moduleId: module.id,
	templateUrl: "./modal.component.html",
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	private isShowing: boolean = false;
	private pageHeight: number;
	private durationScale: number = .75;
	private overlayView: View;
	private data: any = null; // Optional data parameter
	@Input() private size: string = "sm"; // sm | md | lg
	@Input() private dismissable: boolean = true;
	@Input() private alignment: string = "center"; // center | stretch | middle | top | bottom
	@Input() private duration: number = 250; // in milliseconds
	@Output() private open = new EventEmitter<any>();
	@Output() private close = new EventEmitter<any>();
	@ViewChild("bodyEl") private bodyEl: ElementRef;
	@ViewChild("contentEl") private contentEl: ElementRef;

	constructor(
		private hostEl: ElementRef,
		private page: Page
	) {
		if (isAndroid) {
			this.page.on(Page.loadedEvent, () => {
				android.on(AndroidApplication.activityBackPressedEvent, (args: AndroidActivityBackPressedEventData) => {
					if (this.isShowing) {
						args.cancel = true;
						this.hide();
					}
				});
			});
			this.page.on(Page.unloadedEvent, () => {
				android.off(AndroidApplication.activityBackPressedEvent);
			});
		}
	}

	ngOnInit() {
		this.pageHeight = this.pageHeight ? this.pageHeight : screen.mainScreen.heightDIPs;
		this.hostView.style.translateY = this.pageHeight;
	}

	show(data: any = null) {
		if (!this.overlayView) {
			return;
		}
		this.hostView.style.translateY = 0;
		return this.overlayView.animate({
			translate: { x: 0, y: 0 }, duration: 0,
		}).then(() => this.overlayView.animate({
			opacity: 1, duration: this.timing * this.durationScale,
		})).then(() => this.bodyView.animate({
			translate: { x: 0, y: 0 },
			duration: 0,
			curve: AnimationCurve.cubicBezier(.12, .3, .58, .44),
		})).then(() => this.bodyView.animate({
			scale: { x: 1, y: 1 },
			opacity: 1,
			duration: this.timing,
			curve: AnimationCurve.cubicBezier(.12, .3, .58, .44),
		})).then(() => {
			this.open.emit(this.data = data);
			this.isShowing = true;
		}).catch(() => 0);
	}

	hide() {
		return this.bodyView.animate({
			opacity: 0,
			duration: this.timing * this.durationScale,
			curve: AnimationCurve.cubicBezier(.12, .3, .58, .44),
		}).then(() => this.bodyView.animate({
			scale: { x: .6, y: .6 },
			translate: { x: 0, y: this.pageHeight },
			duration: 0,
			curve: AnimationCurve.cubicBezier(.12, .3, .58, .44),
		})).then(() => this.overlayView.animate({
			opacity: 0, duration: this.timing * this.durationScale,
			curve: AnimationCurve.easeInOut,
		})).then(() => this.overlayView.animate({
			translate: { x: 0, y: this.pageHeight },
			duration: 0,
			curve: AnimationCurve.easeInOut,
		})).then(data => {
			this.hostView.style.translateY = this.pageHeight;
			this.close.emit(this.data);
			this.isShowing = false;
			return Promise.resolve(this.data);
		}).catch(() => 0);
	}

	onTapHide = () => {
		if (isAndroid && this.dismissable) {
			this.hide();
		}
	}

	onLoad({ object }) {
		this.overlayView = <View>object;

		this.contentView.off([GestureTypes.touch, GestureTypes.tap].join(","));

		// Event Propagation
		if (ios) {
			targetHandler = HideGestureRecognizerImpl.initWithOwner(this.overlayView);
			if (this.dismissable) {
				targetHandler.func = () => this.hide();
			}
			const gesture = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler, "tap");
			this.overlayView.ios.addGestureRecognizer(gesture);

			targetHandler2 = HideGestureRecognizerImpl.initWithOwner(this.bodyView);
			const gesture2 = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler2, "tap");
			gesture2.cancelsTouchesInView = true;
			this.bodyView.ios.addGestureRecognizer(gesture2);
		}
	}

	private get timing(): number {
		return +this.duration;
	}

	public get translateY(): number {
		return this.pageHeight;
	}

	private get hostView(): View {
		return this.hostEl.nativeElement;
	}

	private get bodyView(): View {
		return this.bodyEl.nativeElement;
	}

	private get contentView(): View {
		return this.contentEl.nativeElement;
	}

	public get modalWidth(): string {
		switch (this.size) {
			case "sm": return "65%";
			case "lg": return "98%";
			case "md":
			default: return "85%";
		}
	}

	public get modalHeight(): string {
		switch (this.size) {
			case "sm": return "50%";
			case "lg": return "98%";
			case "md":
			default: return "65%";
		}
	}

	public get vAlignment(): string {
		if (includes(["center", "stretch", "middle", "top", "bottom"], this.alignment)) {
			return this.alignment;
		}
		return "center";
	}
}

