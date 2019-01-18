"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var search_service_1 = require("./search-service");
var radio_option_1 = require("~/modules/buttons/radio-option");
var google_map_component_1 = require("~/modules/google-map/google-map.component");
var firebase_service_1 = require("~/services/firebase.service");
var action_button_component_1 = require("~/modules/buttons/action-button/action-button.component");
var SearchOptionComponent = /** @class */ (function () {
    function SearchOptionComponent(searchService, routerExtensions, firebaseService) {
        this.searchService = searchService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.locationCollapsed = "[close]";
        this.locationHeight = 300;
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
        if (this.locationCollapsed == "[close]") {
            this.locationCollapsed = "[open]";
            this.locationHeight = 0;
        }
        else {
            this.locationCollapsed = "[close]";
            this.locationHeight = 300;
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
    SearchOptionComponent.prototype.enneagramFilter = function (userEnneagram, filterLevel) {
        var enneagramNums = [];
        if (filterLevel === "high" || filterLevel === "midium" || filterLevel === "low") {
            switch (userEnneagram) {
                case 1:
                    enneagramNums.push(4, 7);
                    break;
                case 2:
                    enneagramNums.push(4, 8);
                    break;
                case 3:
                    enneagramNums.push(6, 9);
                    break;
                case 4:
                    enneagramNums.push(1, 2);
                    break;
                case 5:
                    enneagramNums.push(7, 8);
                    break;
                case 6:
                    enneagramNums.push(3, 9);
                    break;
                case 7:
                    enneagramNums.push(1, 5);
                    break;
                case 8:
                    enneagramNums.push(2, 5);
                    break;
                case 9:
                    enneagramNums.push(3, 6);
                    break;
            }
        }
        if (filterLevel === "midium" || filterLevel === "low") {
            switch (userEnneagram) {
                case 1:
                    enneagramNums.push(3, 8);
                    break;
                case 2:
                    enneagramNums.push(5, 9);
                    break;
                case 3:
                    enneagramNums.push(1, 5);
                    break;
                case 4:
                    enneagramNums.push(6, 7);
                    break;
                case 5:
                    enneagramNums.push(2, 3);
                    break;
                case 6:
                    enneagramNums.push(5, 7);
                    break;
                case 7:
                    enneagramNums.push(4, 9);
                    break;
                case 8:
                    enneagramNums.push(1, 6);
                    break;
                case 9:
                    enneagramNums.push(2, 7);
                    break;
            }
        }
        if (filterLevel === "low") {
            switch (userEnneagram) {
                case 1:
                    enneagramNums.push(2, 9);
                    break;
                case 2:
                    enneagramNums.push(1, 3);
                    break;
                case 3:
                    enneagramNums.push(2, 4);
                    break;
                case 4:
                    enneagramNums.push(3, 5);
                    break;
                case 5:
                    enneagramNums.push(4, 6);
                    break;
                case 6:
                    enneagramNums.push(5, 7);
                    break;
                case 7:
                    enneagramNums.push(6, 8);
                    break;
                case 8:
                    enneagramNums.push(7, 9);
                    break;
                case 9:
                    enneagramNums.push(8, 1);
                    break;
            }
        }
        return enneagramNums;
    };
    SearchOptionComponent.prototype.onGoTap = function () {
        if (this.matchingLevel == null) {
            alert("Please Select Filter Level For Friend Searching.");
        }
        else if (isNaN(parseInt(this.distanceValue))) {
            alert("Please Input Integer number in distance for location radious.");
        }
        else {
            var userEnneagramNum;
            for (var userID in this.firebaseService.thisUser) {
                userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
            }
            // console.log(this.firebaseService.thisUser);
            // console.log(userEnneagramNum);
            var type = this.searchService.postType;
            var otheruserEnneagramNums = this.enneagramFilter(userEnneagramNum, this.matchingLevel);
            // console.log(otheruserEnneagramNums);
            var originLatitude = this.searchService.postLocation.position.latitude;
            var originLongitude = this.searchService.postLocation.position.longitude;
            var distance = parseInt(this.distanceValue);
            this.firebaseService.searchQueries(type, otheruserEnneagramNums, originLatitude, originLongitude, distance);
            this.routerExtensions.navigate(['/searchresult'], { animated: false });
        }
    };
    __decorate([
        core_1.ViewChild("googleMapComponent"),
        __metadata("design:type", google_map_component_1.GoogleMapComponent)
    ], SearchOptionComponent.prototype, "googleMapComponent", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNob3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaG9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQsc0RBQStEO0FBRS9ELG1EQUFpRDtBQUNqRCwrREFBNkQ7QUFDN0Qsa0ZBQStFO0FBQy9FLGdFQUE4RDtBQUM5RCxtR0FBZ0c7QUFRaEc7SUFRRSwrQkFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFWMUMsc0JBQWlCLEdBQVUsU0FBUyxDQUFDO1FBQ3JDLG1CQUFjLEdBQVUsR0FBRyxDQUFDO0lBVXhCLENBQUM7SUFFTCw0REFBNEIsR0FBNUIsVUFBNkIsQ0FBUTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLDBCQUEwQixHQUFHO1lBQ25DLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDO1lBQ3hDLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO1lBQzFDLElBQUksMEJBQVcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO1NBQ3ZDLENBQUM7SUFDRixDQUFDO0lBRUQsbURBQW1CLEdBQW5CO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDSixJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQscUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUEsa0RBQWtCLEdBQWxCLFVBQW1CLFdBQXdCO1FBQzNDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUdELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssZUFBZTtnQkFDZixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQzFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7WUFDSjtnQkFDRSxLQUFLLENBQUM7UUFDWixDQUFDO0lBQ0QsQ0FBQztJQUNELCtDQUFlLEdBQWYsVUFBZ0IsYUFBb0IsRUFBRSxXQUFrQjtRQUN0RCxJQUFJLGFBQWEsR0FBaUIsRUFBRSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsS0FBRyxNQUFNLElBQUksV0FBVyxLQUFHLFFBQVEsSUFBSSxXQUFXLEtBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztZQUN4RSxNQUFNLENBQUEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsV0FBVyxLQUFHLFFBQVEsSUFBSSxXQUFXLEtBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztZQUNoRCxNQUFNLENBQUEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7b0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsV0FBVyxLQUFHLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDdEIsTUFBTSxDQUFBLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO29CQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENB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QUNILENBQUM7SUEzSGdDO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXFCLHlDQUFrQjtxRUFBQztJQUM3QztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBYSwrQ0FBcUI7NkRBQUM7SUFQbEQscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQVV5Qiw4QkFBYTtZQUNWLHlCQUFnQjtZQUNqQixrQ0FBZTtPQVgvQixxQkFBcUIsQ0FrSWpDO0lBQUQsNEJBQUM7Q0FBQSxBQWxJRCxJQWtJQztBQWxJWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmFkaW9PcHRpb24gfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvcmFkaW8tb3B0aW9uXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1hcENvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvZ29vZ2xlLW1hcC9nb29nbGUtbWFwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnU2VhcmNoT3B0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNob3B0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2hvcHRpb24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoT3B0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBsb2NhdGlvbkNvbGxhcHNlZDpzdHJpbmcgPSBcIltjbG9zZV1cIjtcclxuICBsb2NhdGlvbkhlaWdodDpudW1iZXIgPSAzMDA7IFxyXG4gIG1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gIG1hdGNoaW5nTGV2ZWw6c3RyaW5nO1xyXG4gIHB1YmxpYyBkaXN0YW5jZVZhbHVlOnN0cmluZztcclxuICBAVmlld0NoaWxkKFwiZ29vZ2xlTWFwQ29tcG9uZW50XCIpIGdvb2dsZU1hcENvbXBvbmVudDogR29vZ2xlTWFwQ29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICBnZXRNYXRjaGluZ0xldmVsT3B0aW9uQnV0dG9uKGk6bnVtYmVyKXtcclxuICAgIHJldHVybiB0aGlzLm1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zW2ldO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm1hdGNoaW5nTGV2ZWxPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJNYXRjaGluZ0xldmVsXCIsIFwiaGlnaFwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiTWF0Y2hpbmdMZXZlbFwiLCBcIm1pZGl1bVwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiTWF0Y2hpbmdMZXZlbFwiLCBcImxvd1wiKVxyXG5cdFx0XTtcclxuICB9XHJcblxyXG4gIG9uTGFjYXRpb25Ub2dnbGVUYXAoKXtcclxuICAgIGlmKHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xyXG4gICAgICB0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID0gXCJbb3Blbl1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbkhlaWdodCA9IDA7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uSGVpZ2h0ID0gMzAwO1xyXG4gICAgfSAgICBcclxuICB9XHJcblxyXG4gIG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuICBjaGFuZ2VDaGVja2VkUmFkaW8ocmFkaW9PcHRpb246IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcclxuXHJcblx0XHRpZiAoIXJhZGlvT3B0aW9uLnNlbGVjdGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0c3dpdGNoIChyYWRpb09wdGlvbi5ncm91cCkge1xyXG5cdFx0XHRjYXNlIFwiTWF0Y2hpbmdMZXZlbFwiOlxyXG4gICAgICAgIHRoaXMubWF0Y2hpbmdMZXZlbCA9IHJhZGlvT3B0aW9uLnRleHQ7XHJcblx0XHRcdFx0dGhpcy5tYXRjaGluZ0xldmVsT3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcblx0XHR9XHJcbiAgfVxyXG4gIGVubmVhZ3JhbUZpbHRlcih1c2VyRW5uZWFncmFtOm51bWJlciwgZmlsdGVyTGV2ZWw6c3RyaW5nKTogQXJyYXk8bnVtYmVyPntcclxuICAgIHZhciBlbm5lYWdyYW1OdW1zOkFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGlmKGZpbHRlckxldmVsPT09XCJoaWdoXCIgfHwgZmlsdGVyTGV2ZWw9PT1cIm1pZGl1bVwiIHx8IGZpbHRlckxldmVsPT09XCJsb3dcIil7XHJcbiAgICAgIHN3aXRjaCh1c2VyRW5uZWFncmFtKXtcclxuICAgICAgICBjYXNlIDE6IGVubmVhZ3JhbU51bXMucHVzaCg0LDcpOyBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGVubmVhZ3JhbU51bXMucHVzaCg0LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDM6IGVubmVhZ3JhbU51bXMucHVzaCg2LDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IGVubmVhZ3JhbU51bXMucHVzaCgxLDIpOyBicmVhaztcclxuICAgICAgICBjYXNlIDU6IGVubmVhZ3JhbU51bXMucHVzaCg3LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDY6IGVubmVhZ3JhbU51bXMucHVzaCgzLDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDc6IGVubmVhZ3JhbU51bXMucHVzaCgxLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDg6IGVubmVhZ3JhbU51bXMucHVzaCgyLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDk6IGVubmVhZ3JhbU51bXMucHVzaCgzLDYpOyBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZmlsdGVyTGV2ZWw9PT1cIm1pZGl1bVwiIHx8IGZpbHRlckxldmVsPT09XCJsb3dcIil7XHJcbiAgICAgIHN3aXRjaCh1c2VyRW5uZWFncmFtKXtcclxuICAgICAgICBjYXNlIDE6IGVubmVhZ3JhbU51bXMucHVzaCgzLDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGVubmVhZ3JhbU51bXMucHVzaCg1LDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDM6IGVubmVhZ3JhbU51bXMucHVzaCgxLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IGVubmVhZ3JhbU51bXMucHVzaCg2LDcpOyBicmVhaztcclxuICAgICAgICBjYXNlIDU6IGVubmVhZ3JhbU51bXMucHVzaCgyLDMpOyBicmVhaztcclxuICAgICAgICBjYXNlIDY6IGVubmVhZ3JhbU51bXMucHVzaCg1LDcpOyBicmVhaztcclxuICAgICAgICBjYXNlIDc6IGVubmVhZ3JhbU51bXMucHVzaCg0LDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDg6IGVubmVhZ3JhbU51bXMucHVzaCgxLDYpOyBicmVhaztcclxuICAgICAgICBjYXNlIDk6IGVubmVhZ3JhbU51bXMucHVzaCgyLDcpOyBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZmlsdGVyTGV2ZWw9PT1cImxvd1wiKXtcclxuICAgICAgc3dpdGNoKHVzZXJFbm5lYWdyYW0pe1xyXG4gICAgICAgIGNhc2UgMTogZW5uZWFncmFtTnVtcy5wdXNoKDIsOSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogZW5uZWFncmFtTnVtcy5wdXNoKDEsMyk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogZW5uZWFncmFtTnVtcy5wdXNoKDIsNCk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogZW5uZWFncmFtTnVtcy5wdXNoKDMsNSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogZW5uZWFncmFtTnVtcy5wdXNoKDQsNik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogZW5uZWFncmFtTnVtcy5wdXNoKDUsNyk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogZW5uZWFncmFtTnVtcy5wdXNoKDYsOCk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogZW5uZWFncmFtTnVtcy5wdXNoKDcsOSk7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogZW5uZWFncmFtTnVtcy5wdXNoKDgsMSk7IGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW5uZWFncmFtTnVtcztcclxuICB9XHJcblxyXG4gIG9uR29UYXAoKXtcclxuICAgIGlmKHRoaXMubWF0Y2hpbmdMZXZlbD09bnVsbCl7XHJcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIFNlbGVjdCBGaWx0ZXIgTGV2ZWwgRm9yIEZyaWVuZCBTZWFyY2hpbmcuXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihpc05hTihwYXJzZUludCh0aGlzLmRpc3RhbmNlVmFsdWUpKSl7XHJcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIElucHV0IEludGVnZXIgbnVtYmVyIGluIGRpc3RhbmNlIGZvciBsb2NhdGlvbiByYWRpb3VzLlwiKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHZhciB1c2VyRW5uZWFncmFtTnVtO1xyXG4gICAgICBmb3IodmFyIHVzZXJJRCBpbiB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcil7XHJcbiAgICAgICAgdXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJFbm5lYWdyYW1OdW0pO1xyXG4gICAgICB2YXIgdHlwZSA9IHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZTtcclxuICAgICAgdmFyIG90aGVydXNlckVubmVhZ3JhbU51bXMgPSB0aGlzLmVubmVhZ3JhbUZpbHRlcih1c2VyRW5uZWFncmFtTnVtLCB0aGlzLm1hdGNoaW5nTGV2ZWwpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhvdGhlcnVzZXJFbm5lYWdyYW1OdW1zKTtcclxuICAgICAgdmFyIG9yaWdpbkxhdGl0dWRlID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sYXRpdHVkZTtcclxuICAgICAgdmFyIG9yaWdpbkxvbmdpdHVkZSA9IHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICB2YXIgZGlzdGFuY2UgPSBwYXJzZUludCh0aGlzLmRpc3RhbmNlVmFsdWUpO1xyXG4gICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5zZWFyY2hRdWVyaWVzKHR5cGUsIG90aGVydXNlckVubmVhZ3JhbU51bXMsIG9yaWdpbkxhdGl0dWRlLCBvcmlnaW5Mb25naXR1ZGUsIGRpc3RhbmNlKTtcclxuICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaHJlc3VsdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==