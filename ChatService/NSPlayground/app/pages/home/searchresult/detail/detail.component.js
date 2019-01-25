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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDRDQUEyQztBQUMzQyxnQ0FBK0I7QUFDL0Isc0RBQXdEO0FBQ3hELGdFQUE4RDtBQVM5RDtJQUlJLHlCQUNZLFNBQW9CLEVBQ3BCLGdCQUFrQyxFQUN4QyxJQUFVLEVBQ1YsZUFBZ0M7UUFKdEMsaUJBbUJDO1FBbEJXLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3hCLHFCQUFTLENBQUMsVUFBQSxjQUFjLElBQUksT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQ3JELENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNiLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO2dCQUM5RCxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksRUFBQztvQkFDZixJQUFHLEVBQUUsS0FBSyxLQUFJLENBQUMsY0FBYyxFQUFDO3dCQUMxQixPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Qsc0NBQVksR0FBWixVQUFhLElBQUk7UUFDbkIs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QUksSUFBSSxFQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9CO0lBQ0YsQ0FBQztJQUVFLDRDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLEtBQUksSUFBSSxFQUFFLElBQUksSUFBSSxFQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9CO0lBQ0MsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQXBKUSxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN4QyxDQUFDO3lDQU95QixrQkFBUztZQUNGLHlCQUFnQjtZQUNsQyxXQUFJO1lBQ08sa0NBQWU7T0FSN0IsZUFBZSxDQXNKM0I7SUFBRCxzQkFBQztDQUFBLEFBdEpELElBc0pDO0FBdEpZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFBhZ2VSb3V0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJEZXRhaWxcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2RldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGV0YWlsLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0c2VsZWN0ZWRJdGVtSWQ6IHN0cmluZztcclxuXHRpdGVtOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlUm91dGU6IFBhZ2VSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuXHRcdHRoaXMucGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcChhY3RpdmF0ZWRSb3V0ZSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXHJcbiAgICAgICAgKS5mb3JFYWNoKChwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1JZCA9IHBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS5wb3N0U2VhcmNoUmVzdWx0QXJyYXkuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpZCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1JZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNhdGVnb3J5SWNvbihpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRzd2l0Y2ggKGl0ZW1baWRdWyd0eXBlJ10pIHtcclxuXHRcdFx0XHRjYXNlIFwiZm9vZFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGY1KTsgLy9cImZhLWN1dGxlcnlcIjtcclxuXHRcdFx0XHRjYXNlIFwiY2hhdFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGZjKTsgLy9cImZhLWJlZXJcIjtcclxuXHRcdFx0XHRjYXNlIFwiZ2FtZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMGY0KTsgLy9cImZhLWNvZmZlZVwiO1xyXG5cdFx0XHRcdGNhc2UgXCJDYWtlXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxZmQpOyAvL1wiZmEtYmlydGhkYXktY2FrZVwiO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNmQpOyAvL1wiZmEtZmlyZVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2F0ZWdvcnlDb2xvcihpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRzd2l0Y2ggKGl0ZW1baWRdWyd0eXBlJ10pIHtcclxuXHRcdFx0XHRjYXNlIFwiZm9vZFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiIzJEOUNEQlwiO1xyXG5cdFx0XHRcdGNhc2UgXCJjaGF0XCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCIjZTRjZTBkXCI7XHJcblx0XHRcdFx0Y2FzZSBcImdhbWVcIjpcclxuXHRcdFx0XHRcdHJldHVybiBcIiMyN0FFNjBcIjtcclxuXHRcdFx0XHRjYXNlIFwiQ2FrZVwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwid2hpdGVcIjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwid2hpdGVcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBnZXRJdGVtTmFtZShpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRyZXR1cm4gaXRlbVtpZF1bJ25hbWUnXTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICBnZXRDb3ZlcihpdGVtKXtcclxuICAgICAgICBmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbVtpZF1bJ2ltYWdlJ107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEltYWdlcyhpdGVtKXtcclxuICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpbWFnZSBpbiBpdGVtW2lkXVsnaW1hZ2VzJ10pe1xyXG4gICAgICAgICAgICAgICAgcmV0LnB1c2goaXRlbVtpZF1bJ2ltYWdlcyddW2ltYWdlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcblx0dG9nZ2xlTGlrZShpdGVtKSB7XHJcblx0XHRmb3IodmFyIGlkIGluIGl0ZW0pe1xyXG5cdFx0XHRmb3IodmFyIHVzZXJJZCBpbiBpdGVtW2lkXVsnbGlrZXMnXSl7XHJcblx0XHRcdFx0aWYodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG5cdFx0XHRcdFx0Ly8gcGFydGlhbCBkZWxldGVcclxuXHRcdFx0XHRcdGl0ZW1baWRdWydsaWtlX2NvdW50J10tLTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgYWRkXHJcblx0XHRcdFx0XHRpdGVtW2lkXVsnbGlrZV9jb3VudCddKys7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1baWRdWydpc19saWtlJ10gPSAhaXRlbVtpZF1bJ2lzX2xpa2UnXTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0SXNMaWtlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19saWtlJ107XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldExpa2VDb3VudChpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnbGlrZV9jb3VudCddO1xyXG5cdFx0fVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRDb21tZW50Q291bnQoaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydjb21tZW50X2NvdW50J107XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldElzQ29tbWVudChpdGVtKXtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdHJldHVybiBpdGVtW2lkXVsnaXNfY29tbWVudCddO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHRvZ2dsZUhlYXJ0KGl0ZW0pIHtcclxuXHRcdGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcblx0XHRcdGZvcih2YXIgdXNlcklkIGluIGl0ZW1baWRdWydmYXZvcml0ZXMnXSl7XHJcblx0XHRcdFx0aWYodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG5cdFx0XHRcdFx0Ly8gcGFydGlhbCBkZWxldGVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIHBhcnRpYWwgYWRkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGl0ZW1baWRdWydpc19mYXZvcml0ZSddID0gIWl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRnZXRJc0Zhdm9yaXRlKGl0ZW0pe1xyXG5cdFx0Zm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydpc19mYXZvcml0ZSddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBnZXRJdGVtRGVzY3JpcHRpb24oaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuXHRcdFx0cmV0dXJuIGl0ZW1baWRdWydkZXNjcmlwdGlvbiddO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2VUYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19