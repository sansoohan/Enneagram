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
            item[id]['is_like'] = !item[id]['is_like'];
            if (item[id]['is_like']) {
                item[id]['like_count']++;
            }
            else {
                item[id]['like_count']--;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDRDQUEyQztBQUMzQyxnQ0FBK0I7QUFDL0Isc0RBQXdEO0FBQ3hELGdFQUE4RDtBQVM5RDtJQUlJLHlCQUNZLFNBQW9CLEVBQ3BCLGdCQUFrQyxFQUN4QyxJQUFVLEVBQ1YsZUFBZ0M7UUFKdEMsaUJBbUJDO1FBbEJXLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3hCLHFCQUFTLENBQUMsVUFBQSxjQUFjLElBQUksT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQ3JELENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNiLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO2dCQUM5RCxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksRUFBQztvQkFDZixJQUFHLEVBQUUsS0FBSyxLQUFJLENBQUMsY0FBYyxFQUFDO3dCQUMxQixPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Qsc0NBQVksR0FBWixVQUFhLElBQUk7UUFDbkIs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UUFDbkIsS0FBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7SUFDQyxDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBaEpRLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3hDLENBQUM7eUNBT3lCLGtCQUFTO1lBQ0YseUJBQWdCO1lBQ2xDLFdBQUk7WUFDTyxrQ0FBZTtPQVI3QixlQUFlLENBa0ozQjtJQUFELHNCQUFDO0NBQUEsQUFsSkQsSUFrSkM7QUFsSlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkRldGFpbFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9kZXRhaWwuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRzZWxlY3RlZEl0ZW1JZDogc3RyaW5nO1xyXG5cdGl0ZW06IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG5cdFx0dGhpcy5wYWdlUm91dGUuYWN0aXZhdGVkUm91dGUucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKGFjdGl2YXRlZFJvdXRlID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcclxuICAgICAgICApLmZvckVhY2goKHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbUlkID0gcGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlkID09PSB0aGlzLnNlbGVjdGVkSXRlbUlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVswXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2F0ZWdvcnlJY29uKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHN3aXRjaCAoaXRlbVtpZF1bJ3R5cGUnXSkge1xyXG5cdFx0XHRcdGNhc2UgXCJmb29kXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwZjUpOyAvL1wiZmEtY3V0bGVyeVwiO1xyXG5cdFx0XHRcdGNhc2UgXCJjaGF0XCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwZmMpOyAvL1wiZmEtYmVlclwiO1xyXG5cdFx0XHRcdGNhc2UgXCJnYW1lXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwZjQpOyAvL1wiZmEtY29mZmVlXCI7XHJcblx0XHRcdFx0Y2FzZSBcIkNha2VcIjpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjFmZCk7IC8vXCJmYS1iaXJ0aGRheS1jYWtlXCI7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA2ZCk7IC8vXCJmYS1maXJlXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDYXRlZ29yeUNvbG9yKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHN3aXRjaCAoaXRlbVtpZF1bJ3R5cGUnXSkge1xyXG5cdFx0XHRcdGNhc2UgXCJmb29kXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCIjMkQ5Q0RCXCI7XHJcblx0XHRcdFx0Y2FzZSBcImNoYXRcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIiNlNGNlMGRcIjtcclxuXHRcdFx0XHRjYXNlIFwiZ2FtZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiIzI3QUU2MFwiO1xyXG5cdFx0XHRcdGNhc2UgXCJDYWtlXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCJ3aGl0ZVwiO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCJ3aGl0ZVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAgIGdldEl0ZW1OYW1lKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIGdldENvdmVyKGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtW2lkXVsnaW1hZ2UnXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW1hZ2VzKGl0ZW0pe1xyXG4gICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG4gICAgICAgICAgICBmb3IodmFyIGltYWdlIGluIGl0ZW1baWRdWydpbWFnZXMnXSl7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaChpdGVtW2lkXVsnaW1hZ2VzJ11baW1hZ2VdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuXHR0b2dnbGVMaWtlKGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdGl0ZW1baWRdWydpc19saWtlJ10gPSAhaXRlbVtpZF1bJ2lzX2xpa2UnXTtcclxuXHRcdFx0aWYoaXRlbVtpZF1bJ2lzX2xpa2UnXSl7XHJcblx0XHRcdFx0aXRlbVtpZF1bJ2xpa2VfY291bnQnXSsrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0aXRlbVtpZF1bJ2xpa2VfY291bnQnXS0tO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldElzTGlrZShpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnaXNfbGlrZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRMaWtlQ291bnQoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ2xpa2VfY291bnQnXTtcclxuXHRcdH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0Q29tbWVudENvdW50KGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnY29tbWVudF9jb3VudCddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRJc0NvbW1lbnQoaXRlbSl7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ2lzX2NvbW1lbnQnXTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICB0b2dnbGVIZWFydChpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRmb3IodmFyIHVzZXJJZCBpbiBpdGVtW2lkXVsnZmF2b3JpdGVzJ10pe1xyXG5cdFx0XHRcdGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgZGVsZXRlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBwYXJ0aWFsIGFkZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXSA9ICFpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0Z2V0SXNGYXZvcml0ZShpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnaXNfZmF2b3JpdGUnXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgZ2V0SXRlbURlc2NyaXB0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnZGVzY3JpcHRpb24nXTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==