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
            for (var userId in item[id]['likes']) {
                if (this.firebaseService.authuser.uid === userId) {
                    // partial delete
                    item[id]['like_count']--;
                }
                else {
                    // partial add
                    item[id]['like_count']++;
                }
            }
            item[id]['is_like'] = !item[id]['is_like'];
            if (item[id]['is_like']) {
            }
            else {
                var likeData = {};
                likeData[this.firebaseService.authuser.uid] = "like";
                this.firebaseService.addLike(id, likeData);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNocmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaHJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0RBQStEO0FBQy9ELGdFQUE4RDtBQUM5RCxtR0FBZ0c7QUFDaEcsZ0NBQStCO0FBUy9CO0lBVUMsK0JBQ1MsZ0JBQWtDLEVBQ2xDLGVBQWdDLEVBQ2hDLElBQVU7UUFGVixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWmhCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQVd0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO0lBQ3RELENBQUM7SUFFSix5Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRSx3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBYSxJQUFNLENBQUMsQ0FBQztRQUNqQyxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksRUFBQztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRTtvQkFDL0MsUUFBUSxFQUFFLElBQUk7b0JBQ2QsVUFBVSxFQUFFO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUsR0FBRzt3QkFDYixL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QUNqQixrQ0FBZTtZQUMxQixXQUFJO09BYlAscUJBQXFCLENBNExqQztJQUFELDRCQUFDO0NBQUEsQUE1TEQsSUE0TEM7QUE1TFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlNlYXJjaFJlc3VsdFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNocmVzdWx0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9zZWFyY2hyZXN1bHQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGxhc3REZWxZID0gMDtcclxuICAgIGhlYWRlckNvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgc2VsZWN0ZWRUYWIgPSAwO1xyXG4gICAgc2VsZWN0ZWRUYWJ2aWV3ID0gMDtcclxuXHRpdGVtczogQXJyYXk8YW55PjtcclxuXHRpc0xpa2U6IEFycmF5PGFueT47XHJcblxyXG5cdEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgYWN0aW9uQnV0dG9uOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuXHRcdHByaXZhdGUgcGFnZTogUGFnZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcblx0XHR0aGlzLml0ZW1zID0gdGhpcy5maXJlYmFzZVNlcnZpY2UucG9zdFNlYXJjaFJlc3VsdEFycmF5O1xyXG4gICAgfVxyXG5cclxuXHRvbkJhY2tUYXAoKXtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbVRhcChpdGVtKSB7XHJcblx0XHRjb25zb2xlLmxvZyhgVGFwcGVkIG9uICR7aXRlbX1gKTtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJkZXRhaWwvXCIgKyBpZCwge1xyXG5cdFx0XHRcdGFuaW1hdGVkOiB0cnVlLFxyXG5cdFx0XHRcdHRyYW5zaXRpb246IHtcclxuXHRcdFx0XHRcdG5hbWU6IFwic2xpZGVUb3BcIixcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAzODAsXHJcblx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlSW5cIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fV0pO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRzaG93SXRlbUNvdmVyKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpbWFnZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBjYXRlZ29yeUljb24oaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0c3dpdGNoIChpdGVtW2lkXVsndHlwZSddKSB7XHJcblx0XHRcdFx0Y2FzZSBcImZvb2RcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmNSk7IC8vXCJmYS1jdXRsZXJ5XCI7XHJcblx0XHRcdFx0Y2FzZSBcImNoYXRcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmYyk7IC8vXCJmYS1iZWVyXCI7XHJcblx0XHRcdFx0Y2FzZSBcImdhbWVcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmNCk7IC8vXCJmYS1jb2ZmZWVcIjtcclxuXHRcdFx0XHRjYXNlIFwiQ2FrZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMWZkKTsgLy9cImZhLWJpcnRoZGF5LWNha2VcIjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDZkKTsgLy9cImZhLWZpcmVcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRzZXRDYXRlZ29yeUNvbG9yKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHN3aXRjaCAoaXRlbVtpZF1bJ3R5cGUnXSkge1xyXG5cdFx0XHRcdGNhc2UgXCJmb29kXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCIjMkQ5Q0RCXCI7XHJcblx0XHRcdFx0Y2FzZSBcImNoYXRcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIiNlNGNlMGRcIjtcclxuXHRcdFx0XHRjYXNlIFwiZ2FtZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiIzI3QUU2MFwiO1xyXG5cdFx0XHRcdGNhc2UgXCJDYWtlXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCJ3aGl0ZVwiO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCJ3aGl0ZVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtTmFtZShpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ25hbWUnXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxpa2UoaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0Zm9yKHZhciB1c2VySWQgaW4gaXRlbVtpZF1bJ2xpa2VzJ10pe1xyXG5cdFx0XHRcdGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgZGVsZXRlXHJcblx0XHRcdFx0XHRpdGVtW2lkXVsnbGlrZV9jb3VudCddLS07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBwYXJ0aWFsIGFkZFxyXG5cdFx0XHRcdFx0aXRlbVtpZF1bJ2xpa2VfY291bnQnXSsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtW2lkXVsnaXNfbGlrZSddID0gIWl0ZW1baWRdWydpc19saWtlJ107XHJcblx0XHRcdGlmKGl0ZW1baWRdWydpc19saWtlJ10pe1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdHZhciBsaWtlRGF0YSA9IHt9O1xyXG5cdFx0XHRcdGxpa2VEYXRhW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF0gPSBcImxpa2VcIjtcclxuXHRcdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5hZGRMaWtlKGlkLCBsaWtlRGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0Z2V0SXNMaWtlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19saWtlJ107XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldExpa2VDb3VudChpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnbGlrZV9jb3VudCddO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHRvZ2dsZUhlYXJ0KGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdGZvcih2YXIgdXNlcklkIGluIGl0ZW1baWRdWydmYXZvcml0ZXMnXSl7XHJcblx0XHRcdFx0aWYodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG5cdFx0XHRcdFx0Ly8gcGFydGlhbCBkZWxldGVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgYWRkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1baWRdWydpc19mYXZvcml0ZSddID0gIWl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRvbkNvbW1lbnRUYXAoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRpdGVtW2lkXVsnaXNfY29tbWVudCddID0gIWl0ZW1baWRdWydpc19jb21tZW50J107XHJcblx0XHRcdHRoaXMub25JdGVtVGFwKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRJc0Zhdm9yaXRlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRDb21tZW50Q291bnQoaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydjb21tZW50X2NvdW50J107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcbiAgICAvL1RvcCBuYXYgYmFyIHRhcCBtZXRob2RzXHJcbiAgICBvbkJlbGxUYXAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hUYXAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qb3B1bGFyVGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJ2aWV3ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhdGVnb3J5VGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJ2aWV3ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBvblByb21vc1RhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFidmlldyA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Cb3R0b20gbmF2IGJhciB0YXAgbWV0aG9kc1xyXG4gICAgb25Ib21lVGFwKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FydFRhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpc3RvcnlUYXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgb25BYm91dFRhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMztcclxuICAgIH1cclxuXHJcbn1cclxuIl19