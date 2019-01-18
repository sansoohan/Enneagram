import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { View } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { screen } from "tns-core-modules/platform";
import { FirebaseService } from "~/services/firebase.service";
import { AnimationsService } from "../animations-service";

@Component({
	selector: "Details",
	moduleId: module.id,
	templateUrl: "./details.component.html",
	styleUrls: ['./details.component.css']
})
export class DetailsComponent {
	@Input() landmark: any;
	@Input() offset: number;
	@Input() imageOpacity: number = 1;
	@Input() dockedLabelOpacity: number = 0;
	@Input() dockedLabelTextOpacity: number = 0;
	@ViewChild("imageContainer") imageContainerRef: ElementRef;
	@ViewChild("image") imageRef: ElementRef;
	@ViewChild("title") titleRef: ElementRef;
	static IMAGE_MIN_HEIGHT = 48;

	constructor(private animationsService: AnimationsService,
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
	) {
		this.offset = this.animationsService.animationOffset;
		this.landmark = this.firebaseService.getSelectedPost()[this.firebaseService.selectedPostID];
	}


	
	get minHeight() {
		return screen.mainScreen.heightDIPs + 2 * DetailsComponent.IMAGE_MIN_HEIGHT;
	}

	animateIn(view: View, duration: number, delay: number) {
		view.animate({
			scale: { x: 1, y: 1 },
			translate: { x: 0, y: 0 },
			duration: duration,
			delay: delay,
			curve: AnimationCurve.easeOut
		}).catch(() => { });
	}

	animateOut(view: View) {
		view.animate({
			opacity: 0,
			duration: 200
		}).catch(() => { });
	}

	onScroll(args: ScrollEventData) {
		let imageContainer = this.imageContainerRef.nativeElement;

		let offset = args.scrollY < 0 ? 0 : args.scrollY;
		let imageHeight = imageContainer.getActualSize().height;

		this.applyImageTransition(offset, imageHeight);
		this.applyTitleTransition(offset, imageHeight);
		this.applyDockHeaderTransition(offset, imageHeight);
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	private applyImageTransition(scrollOffset: number, imageHeight: number) {
		let imageContainer = this.imageContainerRef.nativeElement;
		let image = this.imageRef.nativeElement;
		let imageHeightMaxChange = imageHeight - DetailsComponent.IMAGE_MIN_HEIGHT;

		imageContainer.translateY = scrollOffset / 1.5;
		image.scaleX = 1 + scrollOffset / imageHeightMaxChange;
		image.scaleY = 1 + scrollOffset / imageHeightMaxChange;
		this.imageOpacity = 1 - scrollOffset / imageHeightMaxChange;
	}

	private applyTitleTransition(scrollOffset: number, imageHeight: number) {
		let imageHeightMaxChange = imageHeight - DetailsComponent.IMAGE_MIN_HEIGHT;
		let title = this.titleRef.nativeElement;

		if (imageHeightMaxChange < scrollOffset) {
			title.translateX = -(scrollOffset - imageHeightMaxChange) / 1.2;
			title.translateY = -(scrollOffset - imageHeightMaxChange) * 2;
			title.scaleX = 1 - (scrollOffset - imageHeightMaxChange) / imageHeight;
			title.scaleY = 1 - (scrollOffset - imageHeightMaxChange) / imageHeight;
		} else {
			title.translateX = 0;
			title.translateY = 0;
			title.scaleX = 1;
			title.scaleY = 1;
		}
	}

	private applyDockHeaderTransition(scrollOffset: number, imageHeight: number) {
		this.dockedLabelOpacity = this.imageOpacity <= 0 ? 1 : 0;
		this.dockedLabelTextOpacity = (scrollOffset - (imageHeight - DetailsComponent.IMAGE_MIN_HEIGHT)) / DetailsComponent.IMAGE_MIN_HEIGHT - 0.2;
	}
}