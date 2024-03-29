import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ListView } from "tns-core-modules/ui/list-view";
import { ChildButton1Component } from "~/modules/buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "~/modules/buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "~/modules/buttons/child-button3/child-button3.component";
import { FloatButtonComponent } from "~/modules/buttons/float-button/float-button.component";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
import { ModalComponent } from "~/modules/modal/modal.component";
import { FriendchatComponent } from "../friendchat/friendchat.component";
import { FirebaseService } from "~/services/firebase.service";

import { RouterExtensions } from "nativescript-angular/router";
@Component({
	selector: "Friendlist",
	moduleId: module.id,
	templateUrl: "./friendlist.component.html",
	styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
	@ViewChild("friendList",{static: false}) friendList: ListView;
	@ViewChild("childButton1",{static: false}) childButton1: ChildButton1Component;
	@ViewChild("childButton2",{static: false}) childButton2: ChildButton2Component;
	@ViewChild("childButton3",{static: false}) childButton3: ChildButton3Component;
	@ViewChild("floatButton",{static: false}) floatButton: FloatButtonComponent;
	@ViewChild("friendchat",{static: false}) friendchat: FriendchatComponent;
	@ViewChild(ModalComponent,{static: false}) modal: ModalComponent;
	private _buttonRef: ActionButtonComponent;
	public drawer: boolean;
	constructor(
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService
	) {
		
	}
	onChildButton1Tap(){
		this.routerExtensions.navigate(['/friendadd'], { animated: false });
		this.closeModal();
		this._buttonRef.makeArrow();
	}

	getFriendProfilePicsrc(item):string{
		var ret:string = "";
		for(var friendID in item) {
			ret = item[friendID]['profile']['profilePicsrc'];			
		}
		return ret;
	}
	getFriendName(item):string{
		var ret:string = "";
		for(var friendID in item) {
			ret = item[friendID]['profile']['name'];
		}
		return ret;
	}

	getProfilePicSrcBySelectedFriendID(){
		var selectedFriendID = this.firebaseService.selectedFriendID;
		if(selectedFriendID!= null){
			return this.firebaseService.getFriends()[selectedFriendID]['profile']['profilePicsrc'];		
		}
		else return null;
	}
	getNameBySelectedFriendID(){
		var selectedFriendID = this.firebaseService.selectedFriendID;
		if(selectedFriendID!=null){
			return this.firebaseService.getFriends()[selectedFriendID]['profile']['name'];
		}
		else return null;
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		// console.log(this.friendList.items[args.index]);
		for(var selelctedFriendID in this.friendList.items[args.index]){
			this.firebaseService.selectedFriendID = selelctedFriendID;
		}
		this.firebaseService.analyticsCount("friendListItemTap");
		this.openModal();
	}
	public onFloatButtonTap() {
		if (this.drawer) {
			this.drawer = false;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton1.floatButtonOn = this.drawer;
			this.childButton2.drawerOpen(this.drawer);
			this.childButton2.floatButtonOn = this.drawer;
			this.childButton3.drawerOpen(this.drawer);
			this.childButton3.floatButtonOn = this.drawer;
		}
		else {
			this.drawer = true;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton1.floatButtonOn = this.drawer;
			this.childButton2.drawerOpen(this.drawer);
			this.childButton2.floatButtonOn = this.drawer;
			this.childButton3.drawerOpen(this.drawer);
			this.childButton3.floatButtonOn = this.drawer;
		}
	}
	onChatTap(): void {
		this.firebaseService.selectedRoomMessageArray = [];
		var selectedFriend = {};
		selectedFriend[this.firebaseService.selectedFriendID] = this.firebaseService.getFriends()[this.firebaseService.selectedFriendID];
		this.firebaseService.generateRoomWithSelectedFriends(this.firebaseService.thisUser, selectedFriend);
		this.firebaseService.analyticsCount("friendChatTap");
		this.routerExtensions.navigate(['/chatroom'], { animated: false });
		this.closeModal();
		this._buttonRef.makeArrow();
	}
	onModalTap() {
		alert("clicked an item");
	}

	openModal() {
		this.modal.show();
	}

	closeModal() {
		this.modal.hide();
	}

	onHomeTap(){
		this.modal.hide();
		this.firebaseService.getUserPosts(this.firebaseService.selectedFriendID);
		this.firebaseService.analyticsCount("friendHomeTap");
		this.routerExtensions.navigate(['/searchresult'], { animated: false });
		this._buttonRef.makeArrow();
	}

	onOpenModal() {
		console.log("opened modal");
	}

	onCloseModal() {
		console.log("closed modal");
	}
}