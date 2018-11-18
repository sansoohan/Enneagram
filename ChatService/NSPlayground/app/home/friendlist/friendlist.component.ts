import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ListView } from "tns-core-modules/ui/list-view";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
import { FloatButtonComponent } from "../../buttons/float-button/float-button.component";
import { FriendchatComponent } from "../friendchat/friendchat.component";
import { ModalComponent } from "../../modal/modal.component";
import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";

import { FirebaseService } from "../../services/firebase.service";

import { RouterExtensions } from "nativescript-angular/router";
@Component({
	selector: "Friendlist",
	moduleId: module.id,
	templateUrl: "./friendlist.component.html",
	styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
	@ViewChild("friendList") friendList: ListView;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
	@ViewChild("floatButton") public floatButton: FloatButtonComponent;
	@ViewChild("friendchat") friendchat: FriendchatComponent;
	@ViewChild(ModalComponent) modal: ModalComponent;
	private _buttonRef: ActionButtonComponent;
	public drawer: boolean;
	constructor(
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService
	) {
		
	}
	onChildButton1Tap(){

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
		console.log(this.friendList.items[args.index]);
		for(var selelctedFriendID in this.friendList.items[args.index]){
			this.firebaseService.selectedFriendID = selelctedFriendID;
		}
		this.openModal();
	}
	public onTap() {
		if (this.drawer) {
			this.drawer = false;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton2.drawerOpen(this.drawer);
			this.childButton3.drawerOpen(this.drawer);
		}
		else {
			this.drawer = true;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton2.drawerOpen(this.drawer);
			this.childButton3.drawerOpen(this.drawer);
		}
	}
	onChatTap(): void {
		var selectedFriend = {};
		selectedFriend[this.firebaseService.selectedFriendID] = this.firebaseService.getFriends()[this.firebaseService.selectedFriendID];
		this.firebaseService.generateRoomWithSelectedFriends(this.firebaseService.thisUser, selectedFriend);
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
		this.firebaseService.get_user_posts(this.firebaseService.selectedFriendID);
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