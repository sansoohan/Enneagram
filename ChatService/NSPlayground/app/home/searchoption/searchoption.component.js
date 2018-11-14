"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var search_service_1 = require("./search-service");
var radio_option_1 = require("./radio-option");
var map_example_component_1 = require("../friendmatching/map-example/map-example.component");
var firebase_service_1 = require("../../services/firebase.service");
var action_button_component_1 = require("../searchresult/action-button/action-button.component");
var SearchOptionComponent = /** @class */ (function () {
    function SearchOptionComponent(searchService, routerExtensions, firebaseService) {
        this.searchService = searchService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.location_collapsed = "[close]";
        this.location_height = 300;
    }
    SearchOptionComponent.prototype.getMatchingLevelOptionButton = function (i) {
        return this.matchingLevelOptionButtons[i];
    };
    SearchOptionComponent.prototype.ngOnInit = function () {
        this.matchingLevelOptionButtons = [
            new radio_option_1.RadioOption("MatchingLevel", "high"),
            new radio_option_1.RadioOption("MatchingLevel", "midium"),
            new radio_option_1.RadioOption("MatchingLevel", "low")
        ];
    };
    SearchOptionComponent.prototype.onLacationToggleTap = function () {
        if (this.location_collapsed == "[close]") {
            this.location_collapsed = "[open]";
            this.location_height = 0;
        }
        else {
            this.location_collapsed = "[close]";
            this.location_height = 300;
        }
    };
    SearchOptionComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    SearchOptionComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        switch (radioOption.group) {
            case "MatchingLevel":
                this.matchingLevel = radioOption.text;
                this.matchingLevelOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
            default:
                break;
        }
    };
    SearchOptionComponent.prototype.enneagram_filter = function (user_enneagram, filter_level) {
        var enneagram_nums = [];
        if (filter_level === "high" || filter_level === "midium" || filter_level === "low") {
            switch (user_enneagram) {
                case 1:
                    enneagram_nums.push(4, 7);
                    break;
                case 2:
                    enneagram_nums.push(4, 8);
                    break;
                case 3:
                    enneagram_nums.push(6, 9);
                    break;
                case 4:
                    enneagram_nums.push(1, 2);
                    break;
                case 5:
                    enneagram_nums.push(7, 8);
                    break;
                case 6:
                    enneagram_nums.push(3, 9);
                    break;
                case 7:
                    enneagram_nums.push(1, 5);
                    break;
                case 8:
                    enneagram_nums.push(2, 5);
                    break;
                case 9:
                    enneagram_nums.push(3, 6);
                    break;
            }
        }
        if (filter_level === "midium" || filter_level === "low") {
            switch (user_enneagram) {
                case 1:
                    enneagram_nums.push(3, 8);
                    break;
                case 2:
                    enneagram_nums.push(5, 9);
                    break;
                case 3:
                    enneagram_nums.push(1, 5);
                    break;
                case 4:
                    enneagram_nums.push(6, 7);
                    break;
                case 5:
                    enneagram_nums.push(2, 3);
                    break;
                case 6:
                    enneagram_nums.push(5, 7);
                    break;
                case 7:
                    enneagram_nums.push(4, 9);
                    break;
                case 8:
                    enneagram_nums.push(1, 6);
                    break;
                case 9:
                    enneagram_nums.push(2, 7);
                    break;
            }
        }
        if (filter_level === "low") {
            switch (user_enneagram) {
                case 1:
                    enneagram_nums.push(2, 9);
                    break;
                case 2:
                    enneagram_nums.push(1, 3);
                    break;
                case 3:
                    enneagram_nums.push(2, 4);
                    break;
                case 4:
                    enneagram_nums.push(3, 5);
                    break;
                case 5:
                    enneagram_nums.push(4, 6);
                    break;
                case 6:
                    enneagram_nums.push(5, 7);
                    break;
                case 7:
                    enneagram_nums.push(6, 8);
                    break;
                case 8:
                    enneagram_nums.push(7, 9);
                    break;
                case 9:
                    enneagram_nums.push(8, 1);
                    break;
            }
        }
        return enneagram_nums;
    };
    SearchOptionComponent.prototype.onGoTap = function () {
        if (this.matchingLevel == null) {
            alert("Please Select Filter Level For Friend Searching.");
        }
        else if (isNaN(parseInt(this.distanceValue))) {
            alert("Please Input Integer number in distance for location radious.");
        }
        else {
            var user_enneagram_num;
            for (var user_id in this.firebaseService.thisUser) {
                user_enneagram_num = this.firebaseService.thisUser[user_id]['enneagram']['number'];
            }
            console.log(this.firebaseService.thisUser);
            console.log(user_enneagram_num);
            var type = this.searchService.postType;
            var enneagram_nums = this.enneagram_filter(user_enneagram_num, this.matchingLevel);
            console.log(enneagram_nums);
            var origin_latitude = this.searchService.postLocation.position.latitude;
            var origin_longitude = this.searchService.postLocation.position.longitude;
            var distance = parseInt(this.distanceValue);
            this.firebaseService.search_queries(type, enneagram_nums, origin_latitude, origin_longitude, distance);
            this.routerExtensions.navigate(['/searchresult'], { animated: false });
            this._buttonRef.makeArrow();
        }
    };
    __decorate([
        core_1.ViewChild("mapExampleComponent"),
        __metadata("design:type", map_example_component_1.MapExampleComponent)
    ], SearchOptionComponent.prototype, "mapExampleComponent", void 0);
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], SearchOptionComponent.prototype, "_buttonRef", void 0);
    SearchOptionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'SearchOption',
            templateUrl: './searchoption.component.html',
            styleUrls: ['./searchoption.component.scss']
        }),
        __metadata("design:paramtypes", [search_service_1.SearchService,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], SearchOptionComponent);
    return SearchOptionComponent;
}());
exports.SearchOptionComponent = SearchOptionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNob3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaG9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQsc0RBQStEO0FBRS9ELG1EQUFpRDtBQUNqRCwrQ0FBNkM7QUFDN0MsNkZBQTBGO0FBQzFGLG9FQUFrRTtBQUVsRSxpR0FBOEY7QUFPOUY7SUFRRSwrQkFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFWMUMsdUJBQWtCLEdBQVUsU0FBUyxDQUFDO1FBQ3RDLG9CQUFlLEdBQVUsR0FBRyxDQUFDO0lBVXpCLENBQUM7SUFFTCw0REFBNEIsR0FBNUIsVUFBNkIsQ0FBUTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLDBCQUEwQixHQUFHO1lBQ25DLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDO1lBQ3hDLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO1lBQzFDLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO1NBQ3ZDLENBQUM7SUFDRixDQUFDO0lBRUQsbURBQW1CLEdBQW5CO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDSixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQscUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUEsa0RBQWtCLEdBQWxCLFVBQW1CLFdBQXdCO1FBQzNDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUdELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssZUFBZTtnQkFDZixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQzFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7WUFDSjtnQkFDRSxLQUFLLENBQUM7UUFDWixDQUFDO0lBQ0QsQ0FBQztJQUNELGdEQUFnQixHQUFoQixVQUFpQixjQUFxQixFQUFFLFlBQW1CO1FBQ3pELElBQUksY0FBYyxHQUFpQixFQUFFLENBQUM7UUFDdEMsRUFBRSxDQUFBLENBQUMsWUFBWSxLQUFHLE1BQU0sSUFBSSxZQUFZLEtBQUcsUUFBUSxJQUFJLFlBQVksS0FBRyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQzNFLE1BQU0sQ0FBQSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7WUFDMUMsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxZQUFZLEtBQUcsUUFBUSxJQUFJLFlBQVksS0FBRyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ2xELE1BQU0sQ0FBQSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztvQkFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7WUFDMUMsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxZQUFZLEtBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztZQUN2QixNQUFNLENBQUEsQ0FBQyxjQUFjLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7b0JBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO1lBQzFDLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMzQixLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzNDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNILElBQUksa0JBQWtCLENBQUM7WUFDdkIsR0FBRyxDQUFBLENBQUMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNoRCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUN4RSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDMUUsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUV2RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBNUhpQztRQUFqQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwyQ0FBbUI7c0VBQUM7SUFDaEQ7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWEsK0NBQXFCOzZEQUFDO0lBUGxELHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDN0MsQ0FBQzt5Q0FVeUIsOEJBQWE7WUFDVix5QkFBZ0I7WUFDakIsa0NBQWU7T0FYL0IscUJBQXFCLENBbUlqQztJQUFELDRCQUFDO0NBQUEsQUFuSUQsSUFtSUM7QUFuSVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtc2VydmljZSc7XHJcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIi4vcmFkaW8tb3B0aW9uXCI7XHJcbmltcG9ydCB7IE1hcEV4YW1wbGVDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kbWF0Y2hpbmcvbWFwLWV4YW1wbGUvbWFwLWV4YW1wbGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogJ1NlYXJjaE9wdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaG9wdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNob3B0aW9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaE9wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgbG9jYXRpb25fY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGxvY2F0aW9uX2hlaWdodDpudW1iZXIgPSAzMDA7IFxyXG4gIG1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gIG1hdGNoaW5nTGV2ZWw6c3RyaW5nO1xyXG4gIHB1YmxpYyBkaXN0YW5jZVZhbHVlOnN0cmluZztcclxuICBAVmlld0NoaWxkKFwibWFwRXhhbXBsZUNvbXBvbmVudFwiKSBtYXBFeGFtcGxlQ29tcG9uZW50OiBNYXBFeGFtcGxlQ29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICBnZXRNYXRjaGluZ0xldmVsT3B0aW9uQnV0dG9uKGk6bnVtYmVyKXtcclxuICAgIHJldHVybiB0aGlzLm1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zW2ldO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJNYXRjaGluZ0xldmVsXCIsIFwiaGlnaFwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiTWF0Y2hpbmdMZXZlbFwiLCBcIm1pZGl1bVwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiTWF0Y2hpbmdMZXZlbFwiLCBcImxvd1wiKVxyXG5cdFx0XTtcclxuICB9XHJcblxyXG4gIG9uTGFjYXRpb25Ub2dnbGVUYXAoKXtcclxuICAgIGlmKHRoaXMubG9jYXRpb25fY29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcclxuICAgICAgdGhpcy5sb2NhdGlvbl9jb2xsYXBzZWQgPSBcIltvcGVuXVwiO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uX2hlaWdodCA9IDA7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5sb2NhdGlvbl9jb2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbl9oZWlnaHQgPSAzMDA7XHJcbiAgICB9ICAgIFxyXG4gIH1cclxuXHJcbiAgb25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG4gIGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuXHRcdHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG5cclxuXHRcdGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRzd2l0Y2ggKHJhZGlvT3B0aW9uLmdyb3VwKSB7XHJcblx0XHRcdGNhc2UgXCJNYXRjaGluZ0xldmVsXCI6XHJcbiAgICAgICAgdGhpcy5tYXRjaGluZ0xldmVsID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLm1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuXHRcdH1cclxuICB9XHJcbiAgZW5uZWFncmFtX2ZpbHRlcih1c2VyX2VubmVhZ3JhbTpudW1iZXIsIGZpbHRlcl9sZXZlbDpzdHJpbmcpOiBBcnJheTxudW1iZXI+e1xyXG4gICAgdmFyIGVubmVhZ3JhbV9udW1zOkFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGlmKGZpbHRlcl9sZXZlbD09PVwiaGlnaFwiIHx8IGZpbHRlcl9sZXZlbD09PVwibWlkaXVtXCIgfHwgZmlsdGVyX2xldmVsPT09XCJsb3dcIil7XHJcbiAgICAgIHN3aXRjaCh1c2VyX2VubmVhZ3JhbSl7XHJcbiAgICAgICAgY2FzZSAxOiBlbm5lYWdyYW1fbnVtcy5wdXNoKDQsNyk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogZW5uZWFncmFtX251bXMucHVzaCg0LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDM6IGVubmVhZ3JhbV9udW1zLnB1c2goNiw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDEsMik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogZW5uZWFncmFtX251bXMucHVzaCg3LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDY6IGVubmVhZ3JhbV9udW1zLnB1c2goMyw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDEsNSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogZW5uZWFncmFtX251bXMucHVzaCgyLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDk6IGVubmVhZ3JhbV9udW1zLnB1c2goMyw2KTsgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGZpbHRlcl9sZXZlbD09PVwibWlkaXVtXCIgfHwgZmlsdGVyX2xldmVsPT09XCJsb3dcIil7XHJcbiAgICAgIHN3aXRjaCh1c2VyX2VubmVhZ3JhbSl7XHJcbiAgICAgICAgY2FzZSAxOiBlbm5lYWdyYW1fbnVtcy5wdXNoKDMsOCk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogZW5uZWFncmFtX251bXMucHVzaCg1LDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDM6IGVubmVhZ3JhbV9udW1zLnB1c2goMSw1KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDYsNyk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogZW5uZWFncmFtX251bXMucHVzaCgyLDMpOyBicmVhaztcclxuICAgICAgICBjYXNlIDY6IGVubmVhZ3JhbV9udW1zLnB1c2goNSw3KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDQsOSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogZW5uZWFncmFtX251bXMucHVzaCgxLDYpOyBicmVhaztcclxuICAgICAgICBjYXNlIDk6IGVubmVhZ3JhbV9udW1zLnB1c2goMiw3KTsgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGZpbHRlcl9sZXZlbD09PVwibG93XCIpe1xyXG4gICAgICBzd2l0Y2godXNlcl9lbm5lYWdyYW0pe1xyXG4gICAgICAgIGNhc2UgMTogZW5uZWFncmFtX251bXMucHVzaCgyLDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGVubmVhZ3JhbV9udW1zLnB1c2goMSwzKTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiBlbm5lYWdyYW1fbnVtcy5wdXNoKDIsNCk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogZW5uZWFncmFtX251bXMucHVzaCgzLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDU6IGVubmVhZ3JhbV9udW1zLnB1c2goNCw2KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDUsNyk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogZW5uZWFncmFtX251bXMucHVzaCg2LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDg6IGVubmVhZ3JhbV9udW1zLnB1c2goNyw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiBlbm5lYWdyYW1fbnVtcy5wdXNoKDgsMSk7IGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW5uZWFncmFtX251bXM7XHJcbiAgfVxyXG5cclxuICBvbkdvVGFwKCl7XHJcbiAgICBpZih0aGlzLm1hdGNoaW5nTGV2ZWw9PW51bGwpe1xyXG4gICAgICBhbGVydChcIlBsZWFzZSBTZWxlY3QgRmlsdGVyIExldmVsIEZvciBGcmllbmQgU2VhcmNoaW5nLlwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoaXNOYU4ocGFyc2VJbnQodGhpcy5kaXN0YW5jZVZhbHVlKSkpe1xyXG4gICAgICBhbGVydChcIlBsZWFzZSBJbnB1dCBJbnRlZ2VyIG51bWJlciBpbiBkaXN0YW5jZSBmb3IgbG9jYXRpb24gcmFkaW91cy5cIik7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB2YXIgdXNlcl9lbm5lYWdyYW1fbnVtO1xyXG4gICAgICBmb3IodmFyIHVzZXJfaWQgaW4gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpe1xyXG4gICAgICAgIHVzZXJfZW5uZWFncmFtX251bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJfaWRdWydlbm5lYWdyYW0nXVsnbnVtYmVyJ107XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2codGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xyXG4gICAgICBjb25zb2xlLmxvZyh1c2VyX2VubmVhZ3JhbV9udW0pO1xyXG4gICAgICB2YXIgdHlwZSA9IHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZTtcclxuICAgICAgdmFyIGVubmVhZ3JhbV9udW1zID0gdGhpcy5lbm5lYWdyYW1fZmlsdGVyKHVzZXJfZW5uZWFncmFtX251bSwgdGhpcy5tYXRjaGluZ0xldmVsKTtcclxuICAgICAgY29uc29sZS5sb2coZW5uZWFncmFtX251bXMpO1xyXG4gICAgICB2YXIgb3JpZ2luX2xhdGl0dWRlID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sYXRpdHVkZTtcclxuICAgICAgdmFyIG9yaWdpbl9sb25naXR1ZGUgPSB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgdmFyIGRpc3RhbmNlID0gcGFyc2VJbnQodGhpcy5kaXN0YW5jZVZhbHVlKTtcclxuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VhcmNoX3F1ZXJpZXModHlwZSwgZW5uZWFncmFtX251bXMsIG9yaWdpbl9sYXRpdHVkZSwgb3JpZ2luX2xvbmdpdHVkZSwgZGlzdGFuY2UpO1xyXG5cclxuICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaHJlc3VsdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=