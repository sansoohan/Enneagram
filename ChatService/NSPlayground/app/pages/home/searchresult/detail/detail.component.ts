import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { Page } from "ui/page";
import { PageRoute } from "nativescript-angular/router";
import { FirebaseService } from "~/services/firebase.service";

@Component({
    selector: "Detail",
    moduleId: module.id,
    templateUrl: "./detail.component.html",
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
	selectedItemId: string;
	item: any;

    constructor(
        private pageRoute: PageRoute,
        private routerExtensions: RouterExtensions,
		private page: Page,
		private firebaseService: FirebaseService
	) {
		this.page.actionBarHidden = true;
		this.pageRoute.activatedRoute.pipe(
            switchMap(activatedRoute => activatedRoute.params)
        ).forEach((params) => {
            this.selectedItemId = params["id"];
            this.item = this.firebaseService.postSearchResultArray.filter(item => {
                for(var id in item){
                    if(id === this.selectedItemId){
                        return true;
                    }
                }
            })[0];
        });
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
    getCover(item){
        for(var id in item){
            return item[id]['image'];
        }
    }

    getImages(item){
        var ret = [];
        for(var id in item){
            for(var image in item[id]['images']){
                ret.push(item[id]['images'][image]);
            }
        }
        return ret;
    }

    ngOnInit(): void {
    }

	toggleLike(item) {
		for(var id in item){
			for(var userId in item[id]['likes']){
				if(this.firebaseService.authuser.uid === userId){
					// partial delete
					item[id]['like_count']--;
				}
				else{
					// partial add
					item[id]['like_count']++;
				}
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
    
    getCommentCount(item){
        for(var id in item){
			return item[id]['comment_count'];
		}
	}
	getIsComment(item){
		for(var id in item){
			return item[id]['is_comment'];
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

	getIsFavorite(item){
		for(var id in item){
			return item[id]['is_favorite'];
		}
	}

    getItemDescription(item){
        for(var id in item){
			return item[id]['description'];
		}
    }

    onCloseTap(): void {
        this.routerExtensions.back();
    }

}
