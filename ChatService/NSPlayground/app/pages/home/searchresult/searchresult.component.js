"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var action_button_component_1 = require("~/modules/buttons/action-button/action-button.component");
var page_1 = require("ui/page");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(routerExtensions, firebaseService, page) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.lastDelY = 0;
        this.headerCollapsed = false;
        this.selectedTab = 0;
        this.selectedTabview = 0;
        this.page.actionBarHidden = true;
        this.items = this.firebaseService.postSearchResultArray;
    }
    SearchResultComponent.prototype.onBackTap = function () {
        this.routerExtensions.back();
    };
    SearchResultComponent.prototype.ngOnInit = function () {
    };
    SearchResultComponent.prototype.onItemTap = function (item) {
        console.log("Tapped on " + item);
        for (var id in item) {
            this.routerExtensions.navigate(["detail/" + id, {
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                }]);
        }
    };
    SearchResultComponent.prototype.showItemCover = function (item) {
        for (var id in item) {
            return item[id]['image'];
        }
    };
    SearchResultComponent.prototype.categoryIcon = function (item) {
        for (var id in item) {
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
    };
    SearchResultComponent.prototype.setCategoryColor = function (item) {
        for (var id in item) {
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
    };
    SearchResultComponent.prototype.getItemName = function (item) {
        for (var id in item) {
            return item[id]['name'];
        }
    };
    SearchResultComponent.prototype.toggleLike = function (item) {
        for (var id in item) {
            if (item[id]['is_like']) {
                // partial delete
                item[id]['like_count']--;
            }
            else {
                // partial add
                item[id]['like_count']++;
                var likeData = {};
                likeData[this.firebaseService.authuser.uid] = "like";
                this.firebaseService.addLike(id, likeData);
            }
            item[id]['is_like'] = !item[id]['is_like'];
        }
    };
    SearchResultComponent.prototype.getIsLike = function (item) {
        for (var id in item) {
            return item[id]['is_like'];
        }
    };
    SearchResultComponent.prototype.getLikeCount = function (item) {
        for (var id in item) {
            return item[id]['like_count'];
        }
    };
    SearchResultComponent.prototype.toggleHeart = function (item) {
        for (var id in item) {
            for (var userId in item[id]['favorites']) {
                if (this.firebaseService.authuser.uid === userId) {
                    // partial delete
                }
                else {
                    // partial add
                }
            }
            item[id]['is_favorite'] = !item[id]['is_favorite'];
        }
    };
    SearchResultComponent.prototype.onCommentTap = function (item) {
        for (var id in item) {
            item[id]['is_comment'] = !item[id]['is_comment'];
            this.onItemTap(item);
        }
    };
    SearchResultComponent.prototype.getIsFavorite = function (item) {
        for (var id in item) {
            return item[id]['is_favorite'];
        }
    };
    SearchResultComponent.prototype.getCommentCount = function (item) {
        for (var id in item) {
            return item[id]['comment_count'];
        }
    };
    //Top nav bar tap methods
    SearchResultComponent.prototype.onBellTap = function () {
    };
    SearchResultComponent.prototype.onSearchTap = function () {
    };
    SearchResultComponent.prototype.onPopularTap = function () {
        this.selectedTabview = 0;
    };
    SearchResultComponent.prototype.onCategoryTap = function () {
        this.selectedTabview = 1;
    };
    SearchResultComponent.prototype.onPromosTap = function () {
        this.selectedTabview = 2;
    };
    //Bottom nav bar tap methods
    SearchResultComponent.prototype.onHomeTap = function () {
        this.selectedTab = 0;
    };
    SearchResultComponent.prototype.onCartTap = function () {
        this.selectedTab = 1;
    };
    SearchResultComponent.prototype.onHistoryTap = function () {
        this.selectedTab = 2;
    };
    SearchResultComponent.prototype.onAboutTap = function () {
        this.selectedTab = 3;
    };
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], SearchResultComponent.prototype, "actionButton", void 0);
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: "SearchResult",
            moduleId: module.id,
            templateUrl: "./searchresult.component.html",
            styleUrls: ['./searchresult.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNocmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaHJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0RBQStEO0FBQy9ELGdFQUE4RDtBQUM5RCxtR0FBZ0c7QUFDaEcsZ0NBQStCO0FBUy9CO0lBVUMsK0JBQ1MsZ0JBQWtDLEVBQ2xDLGVBQWdDLEVBQ2hDLElBQVU7UUFGVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWmhCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQVd0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO0lBQ3RELENBQUM7SUFFSix5Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRSx3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBYSxJQUFNLENBQUMsQ0FBQztRQUNqQyxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksRUFBQztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRTtvQkFDL0MsUUFBUSxFQUFFLElBQUk7b0JBQ2QsVUFBVSxFQUFFO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUsR0FBRzt3QkFDYixL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bmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiU2VhcmNoUmVzdWx0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2hyZXN1bHQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaHJlc3VsdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgbGFzdERlbFkgPSAwO1xyXG4gICAgaGVhZGVyQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICBzZWxlY3RlZFRhYiA9IDA7XHJcbiAgICBzZWxlY3RlZFRhYnZpZXcgPSAwO1xyXG5cdGl0ZW1zOiBBcnJheTxhbnk+O1xyXG5cdGlzTGlrZTogQXJyYXk8YW55PjtcclxuXHJcblx0QFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBhY3Rpb25CdXR0b246IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlXHJcblx0KSB7XHJcblx0XHR0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuXHRcdHRoaXMuaXRlbXMgPSB0aGlzLmZpcmViYXNlU2VydmljZS5wb3N0U2VhcmNoUmVzdWx0QXJyYXk7XHJcbiAgICB9XHJcblxyXG5cdG9uQmFja1RhcCgpe1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtVGFwKGl0ZW0pIHtcclxuXHRcdGNvbnNvbGUubG9nKGBUYXBwZWQgb24gJHtpdGVtfWApO1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcImRldGFpbC9cIiArIGlkLCB7XHJcblx0XHRcdFx0YW5pbWF0ZWQ6IHRydWUsXHJcblx0XHRcdFx0dHJhbnNpdGlvbjoge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJzbGlkZVRvcFwiLFxyXG5cdFx0XHRcdFx0ZHVyYXRpb246IDM4MCxcclxuXHRcdFx0XHRcdGN1cnZlOiBcImVhc2VJblwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XSk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdHNob3dJdGVtQ292ZXIoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ2ltYWdlJ107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAgIGNhdGVnb3J5SWNvbihpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRzd2l0Y2ggKGl0ZW1baWRdWyd0eXBlJ10pIHtcclxuXHRcdFx0XHRjYXNlIFwiZm9vZFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGY1KTsgLy9cImZhLWN1dGxlcnlcIjtcclxuXHRcdFx0XHRjYXNlIFwiY2hhdFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGZjKTsgLy9cImZhLWJlZXJcIjtcclxuXHRcdFx0XHRjYXNlIFwiZ2FtZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGY0KTsgLy9cImZhLWNvZmZlZVwiO1xyXG5cdFx0XHRcdGNhc2UgXCJDYWtlXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxZmQpOyAvL1wiZmEtYmlydGhkYXktY2FrZVwiO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNmQpOyAvL1wiZmEtZmlyZVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdHNldENhdGVnb3J5Q29sb3IoaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0c3dpdGNoIChpdGVtW2lkXVsndHlwZSddKSB7XHJcblx0XHRcdFx0Y2FzZSBcImZvb2RcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIiMyRDlDREJcIjtcclxuXHRcdFx0XHRjYXNlIFwiY2hhdFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiI2U0Y2UwZFwiO1xyXG5cdFx0XHRcdGNhc2UgXCJnYW1lXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCIjMjdBRTYwXCI7XHJcblx0XHRcdFx0Y2FzZSBcIkNha2VcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIndoaXRlXCI7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiBcIndoaXRlXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEl0ZW1OYW1lKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTGlrZShpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1x0XHRcdFxyXG5cdFx0XHRpZihpdGVtW2lkXVsnaXNfbGlrZSddKXtcclxuXHRcdFx0XHQvLyBwYXJ0aWFsIGRlbGV0ZVxyXG5cdFx0XHRcdGl0ZW1baWRdWydsaWtlX2NvdW50J10tLTtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHQvLyBwYXJ0aWFsIGFkZFxyXG5cdFx0XHRcdGl0ZW1baWRdWydsaWtlX2NvdW50J10rKztcclxuXHRcdFx0XHR2YXIgbGlrZURhdGEgPSB7fTtcclxuXHRcdFx0XHRsaWtlRGF0YVt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdID0gXCJsaWtlXCI7XHJcblx0XHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkTGlrZShpZCwgbGlrZURhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1baWRdWydpc19saWtlJ10gPSAhaXRlbVtpZF1bJ2lzX2xpa2UnXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0Z2V0SXNMaWtlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19saWtlJ107XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldExpa2VDb3VudChpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnbGlrZV9jb3VudCddO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHRvZ2dsZUhlYXJ0KGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdGZvcih2YXIgdXNlcklkIGluIGl0ZW1baWRdWydmYXZvcml0ZXMnXSl7XHJcblx0XHRcdFx0aWYodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG5cdFx0XHRcdFx0Ly8gcGFydGlhbCBkZWxldGVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgYWRkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1baWRdWydpc19mYXZvcml0ZSddID0gIWl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRvbkNvbW1lbnRUYXAoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRpdGVtW2lkXVsnaXNfY29tbWVudCddID0gIWl0ZW1baWRdWydpc19jb21tZW50J107XHJcblx0XHRcdHRoaXMub25JdGVtVGFwKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRJc0Zhdm9yaXRlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRDb21tZW50Q291bnQoaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydjb21tZW50X2NvdW50J107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcbiAgICAvL1RvcCBuYXYgYmFyIHRhcCBtZXRob2RzXHJcbiAgICBvbkJlbGxUYXAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hUYXAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qb3B1bGFyVGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJ2aWV3ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhdGVnb3J5VGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJ2aWV3ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBvblByb21vc1RhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFidmlldyA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Cb3R0b20gbmF2IGJhciB0YXAgbWV0aG9kc1xyXG4gICAgb25Ib21lVGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FydFRhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpc3RvcnlUYXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgb25BYm91dFRhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMztcclxuICAgIH1cclxuXHJcbn1cclxuIl19