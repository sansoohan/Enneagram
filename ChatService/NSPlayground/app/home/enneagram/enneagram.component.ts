import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { RadioOption } from "./radio-option";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { ActionButtonComponent } from "../ideamatching/action-button/action-button.component";
import { FirebaseService } from "../../services/firebase.service";
@Component({
	selector: "Enneagram",
	moduleId: module.id,
	templateUrl: "./enneagram.component.html",
	styleUrls: ['./enneagram.component.css']
})
export class EnneagramComponent implements OnInit {
	_buttonRef: ActionButtonComponent;
	emotionOptionButtons?: Array<RadioOption>;
	behaviorOptionButtons?: Array<RadioOption>;
	thoughtOptionButtons?: Array<RadioOption>;
	emotion: string = "";
	behavior: string = "";
	thought: string = "";
	enneagramNum: number = 0;


	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService
	) {
	}

	onButtonTap(): void {
		if (this.emotion === "" || this.behavior === "" || this.thought === "") {
			alert("Please fill this form.");
			return;
		}
		this.enneagramNum = this.getEnneagram();
		var lastCheck = this.checkEnneagram();
		if (lastCheck === 0) {
			this.enneagramCheckConfirm("Your third answer might not be \n" + this.thought + "\n Do you want to save your state?");
		}
		else {
			this.saveUserEnneagramOnDatebase();
			this.confirm("You can change this state from your home tab.");
		}
    }
	saveUserEnneagramOnDatebase() {
		this.firebaseService.thisUser.enneagram.number = this.enneagramNum;
		this.firebaseService.thisUser.enneagram.emotion = this.emotion;
		this.firebaseService.thisUser.enneagram.behavior = this.behavior;
		this.firebaseService.thisUser.enneagram.thought = this.thought;
	}

	confirm(checkMessage) {
		confirm({
			title: "Successfully saved!",
			message: checkMessage,
			okButtonText: "Go Home",
		}).then((result) => {
			if (result === true) {
				this.routerExtensions.navigate(['/'], { animated: false });
			}
		});
	}
	enneagramCheckConfirm(checkMessage) {
		confirm({
			title: "Last Check",
			message: checkMessage,
			cancelButtonText: "No",
			okButtonText: "Yes",
		}).then((result) => {
			if (result === true) {
				console.log(this.enneagramNum);
				this.saveUserEnneagramOnDatebase();
				this.confirm("You can change this state from your home tab.");
			}
		});
	}

	checkEnneagram(): number {
		if (this.emotion === "Anger" && this.behavior === "Active Person" && this.thought === "Trust or Betray") return 8;
		if (this.emotion === "Anger" && this.behavior === "Not Active Person" && this.thought === "Positive or Negative") return 9;
		if (this.emotion === "Anger" && this.behavior === "Listener" && this.thought === "Success or Failure") return 1;
		if (this.emotion === "Shame" && this.behavior === "Listener" && this.thought === "Positive or Negative") return 2;
		if (this.emotion === "Shame" && this.behavior === "Active Person" && this.thought === "Success or Failure") return 3;
		if (this.emotion === "Shame" && this.behavior === "Not Active Person" && this.thought === "Trust or Betray") return 4;
		if (this.emotion === "Fear" && this.behavior === "Not Active Person" && this.thought === "Success or Failure") return 5;
		if (this.emotion === "Fear" && this.behavior === "Listener" && this.thought === "Trust or Betray") return 6;
		if (this.emotion === "Fear" && this.behavior === "Active Person" && this.thought === "Positive or Negative") return 7;
		return 0;
	}

	getEnneagram(): number {
		if (this.emotion === "Anger" && this.behavior === "Active Person") return 8;
		if (this.emotion === "Anger" && this.behavior === "Not Active Person") return 9;
		if (this.emotion === "Anger" && this.behavior === "Listener") return 1;
		if (this.emotion === "Shame" && this.behavior === "Listener") return 2;
		if (this.emotion === "Shame" && this.behavior === "Active Person") return 3;
		if (this.emotion === "Shame" && this.behavior === "Not Active Person") return 4;
		if (this.emotion === "Fear" && this.behavior === "Not Active Person") return 5;
		if (this.emotion === "Fear" && this.behavior === "Listener") return 6;
		if (this.emotion === "Fear" && this.behavior === "Active Person") return 7;
		return 0;
	}



	ngOnInit(): void {
		this.emotionOptionButtons = [
			new RadioOption("Emotion", "Anger"),
			new RadioOption("Emotion", "Shame"),
			new RadioOption("Emotion", "Fear")
		];
		this.behaviorOptionButtons = [
			new RadioOption("Behavior", "Active Person"),
			new RadioOption("Behavior", "Listener"),
			new RadioOption("Behavior", "Not Active Person")
		];
		this.thoughtOptionButtons = [
			new RadioOption("Thought", "Positive or Negative"),
			new RadioOption("Thought", "Trust or Betray"),
			new RadioOption("Thought", "Success or Failure")
		];
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	changeCheckedRadio(radioOption: RadioOption): void {
		radioOption.selected = !radioOption.selected;

		if (!radioOption.selected) {
			return;
		}


		switch (radioOption.group) {
			case "Emotion":
				this.emotion = radioOption.text;
				this.emotionOptionButtons.forEach(option => {
					if (option.text !== radioOption.text) {
						option.selected = false;
					}
				});
				break;
			case "Behavior":
				this.behavior = radioOption.text;
				this.behaviorOptionButtons.forEach(option => {
					if (option.text !== radioOption.text) {
						option.selected = false;
					}
				});
				break;
			case "Thought":
				this.thought = radioOption.text;
				this.thoughtOptionButtons.forEach(option => {
					if (option.text !== radioOption.text) {
						option.selected = false;
					}
				});
				break;			
		}
	}
}