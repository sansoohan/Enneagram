import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "~/services/firebase.service";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
import { Page } from "ui/page";

@Component({
    selector: "SearchResult",
    moduleId: module.id,
    templateUrl: "./searchresult.component.html",
    styleUrls: ['./searchresult.component.css']
})

export class SearchResultComponent implements OnInit {
    lastDelY = 0;
    headerCollapsed = false;
    selectedTab = 0;
    selectedTabview = 0;
	items: Array<any>;
	isLike: Array<any>;

	@ViewChild("actionButton",{static: false}) actionButton: ActionButtonComponent;

	constructor(
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		private page: Page
	) {
		this.page.actionBarHidden = true;
		this.items = this.firebaseService.postSearchResultArray;
    }

	onBackTap(){
		this.routerExtensions.back();
	}

    ngOnInit(): void {
    }

    onItemTap(item) {
		console.log(`Tapped on ${item}`);
		for(var id in item){
			this.routerExtensions.navigate(["detail/" + id, {
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			}]);
		}
    }

	showItemCover(item){
		for(var id in item){
			return item[id]['image'];
		}
	}

    categoryIcon(item) {
		for(var id in item){
			switch (item[id]['type']) {
				case "food":
					return String.fromCharCode(0xf0f5); //"fa-cutlery";
				case "chat":
					return String.fromCharCode(0xf0fc); //"fa-beer";
				case "game":
					return String.fromCharCode(0xf0f4); //"fa-coffee";
				case "Cake":
					return String.fromCharCode(0xf1fd); //"fa-birthday-cake";
				default:
					return String.fromCharCode(0xf06d); //"fa-fire";
			}
		}
    }

	setCategoryColor(item) {
		for(var id in item){
			switch (item[id]['type']) {
				case "food":
					return "#2D9CDB";
				case "chat":
					return "#e4ce0d";
				case "game":
					return "#27AE60";
				case "Cake":
					return "white";
				default:
					return "white";
			}
		}
	}

	getItemName(item) {
		for(var id in item){
			return item[id]['name'];
		}
	}

	toggleLike(item) {
		for(var id in item){			
			if(item[id]['is_like']){
				// partial delete
				item[id]['like_count']--;

			}
			else{
				// partial add
				item[id]['like_count']++;
				var likeData = {};
				likeData[this.firebaseService.authuser.uid] = "like";
				this.firebaseService.addLike(id, likeData);
			}
			item[id]['is_like'] = !item[id]['is_like'];
		}
	}
	
	getIsLike(item){
		for(var id in item){
			return item[id]['is_like'];
		}
	}
	getLikeCount(item){
		for(var id in item){
			return item[id]['like_count'];
		}
	}
    toggleHeart(item) {
		for(var id in item){
			for(var userId in item[id]['favorites']){
				if(this.firebaseService.authuser.uid === userId){
					// partial delete
				}
				else{
					// partial add
				}
			}
			item[id]['is_favorite'] = !item[id]['is_favorite'];
		}
    }

	onCommentTap(item){
		for(var id in item){
			item[id]['is_comment'] = !item[id]['is_comment'];
			this.onItemTap(item);
		}
	}
	getIsFavorite(item){
		for(var id in item){
			return item[id]['is_favorite'];
		}
	}
	getCommentCount(item){
        for(var id in item){
			return item[id]['comment_count'];
		}
	}


    //Top nav bar tap methods
    onBellTap() {
    }

    onSearchTap() {
    }

    onPopularTap() {
        this.selectedTabview = 0;
    }

    onCategoryTap() {
        this.selectedTabview = 1;
    }

    onPromosTap() {
        this.selectedTabview = 2;
    }

    //Bottom nav bar tap methods
    onHomeTap() {
        this.selectedTab = 0;
    }

    onCartTap() {
        this.selectedTab = 1;
    }

    onHistoryTap() {
        this.selectedTab = 2;
    }

    onAboutTap() {
        this.selectedTab = 3;
    }

}
