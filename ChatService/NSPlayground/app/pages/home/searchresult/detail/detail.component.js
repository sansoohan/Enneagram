"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var operators_1 = require("rxjs/operators");
var page_1 = require("ui/page");
var router_2 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var DetailComponent = /** @class */ (function () {
    function DetailComponent(pageRoute, routerExtensions, page, firebaseService) {
        var _this = this;
        this.pageRoute = pageRoute;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.firebaseService = firebaseService;
        this.page.actionBarHidden = true;
        this.pageRoute.activatedRoute.pipe(operators_1.switchMap(function (activatedRoute) { return activatedRoute.params; })).forEach(function (params) {
            _this.selectedItemId = params["id"];
            _this.item = _this.firebaseService.postSearchResultArray.filter(function (item) {
                for (var id in item) {
                    if (id === _this.selectedItemId) {
                        return true;
                    }
                }
            })[0];
        });
    }
    DetailComponent.prototype.categoryIcon = function (item) {
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
    DetailComponent.prototype.setCategoryColor = function (item) {
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
    DetailComponent.prototype.getItemName = function (item) {
        for (var id in item) {
            return item[id]['name'];
        }
    };
    DetailComponent.prototype.getCover = function (item) {
        for (var id in item) {
            return item[id]['image'];
        }
    };
    DetailComponent.prototype.getImages = function (item) {
        var ret = [];
        for (var id in item) {
            for (var image in item[id]['images']) {
                ret.push(item[id]['images'][image]);
            }
        }
        return ret;
    };
    DetailComponent.prototype.ngOnInit = function () {
    };
    DetailComponent.prototype.toggleLike = function (item) {
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
        }
    };
    DetailComponent.prototype.getIsLike = function (item) {
        for (var id in item) {
            return item[id]['is_like'];
        }
    };
    DetailComponent.prototype.getLikeCount = function (item) {
        for (var id in item) {
            return item[id]['like_count'];
        }
    };
    DetailComponent.prototype.getCommentCount = function (item) {
        for (var id in item) {
            return item[id]['comment_count'];
        }
    };
    DetailComponent.prototype.getIsComment = function (item) {
        for (var id in item) {
            return item[id]['is_comment'];
        }
    };
    DetailComponent.prototype.toggleHeart = function (item) {
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
    DetailComponent.prototype.getIsFavorite = function (item) {
        for (var id in item) {
            return item[id]['is_favorite'];
        }
    };
    DetailComponent.prototype.getItemDescription = function (item) {
        for (var id in item) {
            return item[id]['description'];
        }
    };
    DetailComponent.prototype.onCloseTap = function () {
        this.routerExtensions.back();
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: "Detail",
            moduleId: module.id,
            templateUrl: "./detail.component.html",
            styleUrls: ['./detail.component.css']
        }),
        __metadata("design:paramtypes", [router_2.PageRoute,
            router_1.RouterExtensions,
            page_1.Page,
            firebase_service_1.FirebaseService])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDRDQUEyQztBQUMzQyxnQ0FBK0I7QUFDL0Isc0RBQXdEO0FBQ3hELGdFQUE4RDtBQVM5RDtJQUlJLHlCQUNZLFNBQW9CLEVBQ3BCLGdCQUFrQyxFQUN4QyxJQUFVLEVBQ1YsZUFBZ0M7UUFKdEMsaUJBbUJDO1FBbEJXLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3hCLHFCQUFTLENBQUMsVUFBQSxjQUFjLElBQUksT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQ3JELENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNiLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO2dCQUM5RCxHQUFHLENBQUEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO29CQUNoQixFQUFFLENBQUEsQ0FBQyxFQUFFLEtBQUssS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1Ys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LENBQUM7SUFFRCxvQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFwSlEsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDeEMsQ0FBQzt5Q0FPeUIsa0JBQVM7WUFDRix5QkFBZ0I7WUFDbEMsV0FBSTtZQUNPLGtDQUFlO09BUjdCLGVBQWUsQ0FzSjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXRKRCxJQXNKQztBQXRKWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBQYWdlUm91dGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiRGV0YWlsXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2RldGFpbC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHNlbGVjdGVkSXRlbUlkOiBzdHJpbmc7XHJcblx0aXRlbTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGFnZVJvdXRlOiBQYWdlUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcblx0XHR0aGlzLnBhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoYWN0aXZhdGVkUm91dGUgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxyXG4gICAgICAgICkuZm9yRWFjaCgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtSWQgPSBwYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5maXJlYmFzZVNlcnZpY2UucG9zdFNlYXJjaFJlc3VsdEFycmF5LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWQgPT09IHRoaXMuc2VsZWN0ZWRJdGVtSWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pWzBdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYXRlZ29yeUljb24oaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0c3dpdGNoIChpdGVtW2lkXVsndHlwZSddKSB7XHJcblx0XHRcdFx0Y2FzZSBcImZvb2RcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmNSk7IC8vXCJmYS1jdXRsZXJ5XCI7XHJcblx0XHRcdFx0Y2FzZSBcImNoYXRcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmYyk7IC8vXCJmYS1iZWVyXCI7XHJcblx0XHRcdFx0Y2FzZSBcImdhbWVcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjBmNCk7IC8vXCJmYS1jb2ZmZWVcIjtcclxuXHRcdFx0XHRjYXNlIFwiQ2FrZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMWZkKTsgLy9cImZhLWJpcnRoZGF5LWNha2VcIjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDZkKTsgLy9cImZhLWZpcmVcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHNldENhdGVnb3J5Q29sb3IoaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0c3dpdGNoIChpdGVtW2lkXVsndHlwZSddKSB7XHJcblx0XHRcdFx0Y2FzZSBcImZvb2RcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIiMyRDlDREJcIjtcclxuXHRcdFx0XHRjYXNlIFwiY2hhdFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiI2U0Y2UwZFwiO1xyXG5cdFx0XHRcdGNhc2UgXCJnYW1lXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCIjMjdBRTYwXCI7XHJcblx0XHRcdFx0Y2FzZSBcIkNha2VcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIndoaXRlXCI7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiBcIndoaXRlXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgZ2V0SXRlbU5hbWUoaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWyduYW1lJ107XHJcblx0XHR9XHJcblx0fVxyXG4gICAgZ2V0Q292ZXIoaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1baWRdWydpbWFnZSddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJbWFnZXMoaXRlbSl7XHJcbiAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaW1hZ2UgaW4gaXRlbVtpZF1bJ2ltYWdlcyddKXtcclxuICAgICAgICAgICAgICAgIHJldC5wdXNoKGl0ZW1baWRdWydpbWFnZXMnXVtpbWFnZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG5cdHRvZ2dsZUxpa2UoaXRlbSkge1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0Zm9yKHZhciB1c2VySWQgaW4gaXRlbVtpZF1bJ2xpa2VzJ10pe1xyXG5cdFx0XHRcdGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgZGVsZXRlXHJcblx0XHRcdFx0XHRpdGVtW2lkXVsnbGlrZV9jb3VudCddLS07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBwYXJ0aWFsIGFkZFxyXG5cdFx0XHRcdFx0aXRlbVtpZF1bJ2xpa2VfY291bnQnXSsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtW2lkXVsnaXNfbGlrZSddID0gIWl0ZW1baWRdWydpc19saWtlJ107XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldElzTGlrZShpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnaXNfbGlrZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRMaWtlQ291bnQoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ2xpa2VfY291bnQnXTtcclxuXHRcdH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0Q29tbWVudENvdW50KGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnY29tbWVudF9jb3VudCddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRJc0NvbW1lbnQoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ2lzX2NvbW1lbnQnXTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICB0b2dnbGVIZWFydChpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRmb3IodmFyIHVzZXJJZCBpbiBpdGVtW2lkXVsnZmF2b3JpdGVzJ10pe1xyXG5cdFx0XHRcdGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgZGVsZXRlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBwYXJ0aWFsIGFkZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXSA9ICFpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0Z2V0SXNGYXZvcml0ZShpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgZ2V0SXRlbURlc2NyaXB0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnZGVzY3JpcHRpb24nXTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==