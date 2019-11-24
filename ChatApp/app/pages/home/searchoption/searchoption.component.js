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
    ], SearchOptionComponent.prototype, "actionButton", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNob3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaG9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQsc0RBQStEO0FBRS9ELG1EQUFpRDtBQUNqRCwrREFBNkQ7QUFDN0Qsa0ZBQStFO0FBQy9FLGdFQUE4RDtBQUM5RCxtR0FBZ0c7QUFRaEc7SUFRRSwrQkFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFWMUMsc0JBQWlCLEdBQVUsU0FBUyxDQUFDO1FBQ3JDLG1CQUFjLEdBQVUsR0FBRyxDQUFDO0lBVXhCLENBQUM7SUFFTCw0REFBNEIsR0FBNUIsVUFBNkIsQ0FBUTtRQUNuQyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQywwQkFBMEIsR0FBRztZQUNuQyxJQUFJLDBCQUFXLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztZQUN4QyxJQUFJLDBCQUFXLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQztZQUMxQyxJQUFJLDBCQUFXLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQztTQUN2QyxDQUFDO0lBQ0YsQ0FBQztJQUVELG1EQUFtQixHQUFuQjtRQUNFLElBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFNBQVMsRUFBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO2FBQUk7WUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFj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Q0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDdkUsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUN6RSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQztJQTFIZ0M7UUFBaEMsZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FBcUIseUNBQWtCO3FFQUFDO0lBQzdDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjsrREFBQztJQVBwRCxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzdDLENBQUM7eUNBVXlCLDhCQUFhO1lBQ1YseUJBQWdCO1lBQ2pCLGtDQUFlO09BWC9CLHFCQUFxQixDQWlJakM7SUFBRCw0QkFBQztDQUFBLEFBaklELElBaUlDO0FBaklZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9yYWRpby1vcHRpb25cIjtcclxuaW1wb3J0IHsgR29vZ2xlTWFwQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9nb29nbGUtbWFwL2dvb2dsZS1tYXAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdTZWFyY2hPcHRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2hvcHRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaG9wdGlvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGxvY2F0aW9uQ29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGxvY2F0aW9uSGVpZ2h0Om51bWJlciA9IDMwMDsgXHJcbiAgbWF0Y2hpbmdMZXZlbE9wdGlvbkJ1dHRvbnM/OiBBcnJheTxSYWRpb09wdGlvbj47XHJcbiAgbWF0Y2hpbmdMZXZlbDpzdHJpbmc7XHJcbiAgcHVibGljIGRpc3RhbmNlVmFsdWU6c3RyaW5nO1xyXG4gIEBWaWV3Q2hpbGQoXCJnb29nbGVNYXBDb21wb25lbnRcIikgZ29vZ2xlTWFwQ29tcG9uZW50OiBHb29nbGVNYXBDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBhY3Rpb25CdXR0b246IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgZ2V0TWF0Y2hpbmdMZXZlbE9wdGlvbkJ1dHRvbihpOm51bWJlcil7XHJcbiAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0xldmVsT3B0aW9uQnV0dG9uc1tpXTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5tYXRjaGluZ0xldmVsT3B0aW9uQnV0dG9ucyA9IFtcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiTWF0Y2hpbmdMZXZlbFwiLCBcImhpZ2hcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIk1hdGNoaW5nTGV2ZWxcIiwgXCJtaWRpdW1cIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIk1hdGNoaW5nTGV2ZWxcIiwgXCJsb3dcIilcclxuXHRcdF07XHJcbiAgfVxyXG5cclxuICBvbkxhY2F0aW9uVG9nZ2xlVGFwKCl7XHJcbiAgICBpZih0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcclxuICAgICAgdGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9IFwiW29wZW5dXCI7XHJcbiAgICAgIHRoaXMubG9jYXRpb25IZWlnaHQgPSAwO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbkhlaWdodCA9IDMwMDtcclxuICAgIH0gICAgXHJcbiAgfVxyXG5cclxuICBvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcbiAgY2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG5cdFx0cmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XHJcblxyXG5cdFx0aWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHN3aXRjaCAocmFkaW9PcHRpb24uZ3JvdXApIHtcclxuXHRcdFx0Y2FzZSBcIk1hdGNoaW5nTGV2ZWxcIjpcclxuICAgICAgICB0aGlzLm1hdGNoaW5nTGV2ZWwgPSByYWRpb09wdGlvbi50ZXh0O1xyXG5cdFx0XHRcdHRoaXMubWF0Y2hpbmdMZXZlbE9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG5cdFx0fVxyXG4gIH1cclxuICBlbm5lYWdyYW1GaWx0ZXIodXNlckVubmVhZ3JhbTpudW1iZXIsIGZpbHRlckxldmVsOnN0cmluZyk6IEFycmF5PG51bWJlcj57XHJcbiAgICB2YXIgZW5uZWFncmFtTnVtczpBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBpZihmaWx0ZXJMZXZlbD09PVwiaGlnaFwiIHx8IGZpbHRlckxldmVsPT09XCJtaWRpdW1cIiB8fCBmaWx0ZXJMZXZlbD09PVwibG93XCIpe1xyXG4gICAgICBzd2l0Y2godXNlckVubmVhZ3JhbSl7XHJcbiAgICAgICAgY2FzZSAxOiBlbm5lYWdyYW1OdW1zLnB1c2goNCw3KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOiBlbm5lYWdyYW1OdW1zLnB1c2goNCw4KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiBlbm5lYWdyYW1OdW1zLnB1c2goNiw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiBlbm5lYWdyYW1OdW1zLnB1c2goMSwyKTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiBlbm5lYWdyYW1OdW1zLnB1c2goNyw4KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiBlbm5lYWdyYW1OdW1zLnB1c2goMyw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiBlbm5lYWdyYW1OdW1zLnB1c2goMSw1KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OiBlbm5lYWdyYW1OdW1zLnB1c2goMiw1KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiBlbm5lYWdyYW1OdW1zLnB1c2goMyw2KTsgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGZpbHRlckxldmVsPT09XCJtaWRpdW1cIiB8fCBmaWx0ZXJMZXZlbD09PVwibG93XCIpe1xyXG4gICAgICBzd2l0Y2godXNlckVubmVhZ3JhbSl7XHJcbiAgICAgICAgY2FzZSAxOiBlbm5lYWdyYW1OdW1zLnB1c2goMyw4KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOiBlbm5lYWdyYW1OdW1zLnB1c2goNSw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiBlbm5lYWdyYW1OdW1zLnB1c2goMSw1KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiBlbm5lYWdyYW1OdW1zLnB1c2goNiw3KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiBlbm5lYWdyYW1OdW1zLnB1c2goMiwzKTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiBlbm5lYWdyYW1OdW1zLnB1c2goNSw3KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiBlbm5lYWdyYW1OdW1zLnB1c2goNCw5KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OiBlbm5lYWdyYW1OdW1zLnB1c2goMSw2KTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiBlbm5lYWdyYW1OdW1zLnB1c2goMiw3KTsgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGZpbHRlckxldmVsPT09XCJsb3dcIil7XHJcbiAgICAgIHN3aXRjaCh1c2VyRW5uZWFncmFtKXtcclxuICAgICAgICBjYXNlIDE6IGVubmVhZ3JhbU51bXMucHVzaCgyLDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGVubmVhZ3JhbU51bXMucHVzaCgxLDMpOyBicmVhaztcclxuICAgICAgICBjYXNlIDM6IGVubmVhZ3JhbU51bXMucHVzaCgyLDQpOyBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IGVubmVhZ3JhbU51bXMucHVzaCgzLDUpOyBicmVhaztcclxuICAgICAgICBjYXNlIDU6IGVubmVhZ3JhbU51bXMucHVzaCg0LDYpOyBicmVhaztcclxuICAgICAgICBjYXNlIDY6IGVubmVhZ3JhbU51bXMucHVzaCg1LDcpOyBicmVhaztcclxuICAgICAgICBjYXNlIDc6IGVubmVhZ3JhbU51bXMucHVzaCg2LDgpOyBicmVhaztcclxuICAgICAgICBjYXNlIDg6IGVubmVhZ3JhbU51bXMucHVzaCg3LDkpOyBicmVhaztcclxuICAgICAgICBjYXNlIDk6IGVubmVhZ3JhbU51bXMucHVzaCg4LDEpOyBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVubmVhZ3JhbU51bXM7XHJcbiAgfVxyXG5cclxuICBvbkdvVGFwKCl7XHJcbiAgICBpZih0aGlzLm1hdGNoaW5nTGV2ZWw9PW51bGwpe1xyXG4gICAgICBhbGVydChcIlBsZWFzZSBTZWxlY3QgRmlsdGVyIExldmVsIEZvciBGcmllbmQgU2VhcmNoaW5nLlwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoaXNOYU4ocGFyc2VJbnQodGhpcy5kaXN0YW5jZVZhbHVlKSkpe1xyXG4gICAgICBhbGVydChcIlBsZWFzZSBJbnB1dCBJbnRlZ2VyIG51bWJlciBpbiBkaXN0YW5jZSBmb3IgbG9jYXRpb24gcmFkaW91cy5cIik7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB2YXIgdXNlckVubmVhZ3JhbU51bTtcclxuICAgICAgZm9yKHZhciB1c2VySUQgaW4gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpe1xyXG4gICAgICAgIHVzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsnbnVtYmVyJ107XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh1c2VyRW5uZWFncmFtTnVtKTtcclxuICAgICAgdmFyIHR5cGUgPSB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGU7XHJcbiAgICAgIHZhciBvdGhlcnVzZXJFbm5lYWdyYW1OdW1zID0gdGhpcy5lbm5lYWdyYW1GaWx0ZXIodXNlckVubmVhZ3JhbU51bSwgdGhpcy5tYXRjaGluZ0xldmVsKTtcclxuICAgICAgLy8gY29uc29sZS5sb2cob3RoZXJ1c2VyRW5uZWFncmFtTnVtcyk7XHJcbiAgICAgIHZhciBvcmlnaW5MYXRpdHVkZSA9IHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubGF0aXR1ZGU7XHJcbiAgICAgIHZhciBvcmlnaW5Mb25naXR1ZGUgPSB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgdmFyIGRpc3RhbmNlID0gcGFyc2VJbnQodGhpcy5kaXN0YW5jZVZhbHVlKTtcclxuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VhcmNoUXVlcmllcyh0eXBlLCBvdGhlcnVzZXJFbm5lYWdyYW1OdW1zLCBvcmlnaW5MYXRpdHVkZSwgb3JpZ2luTG9uZ2l0dWRlLCBkaXN0YW5jZSk7XHJcbiAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hyZXN1bHQnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==