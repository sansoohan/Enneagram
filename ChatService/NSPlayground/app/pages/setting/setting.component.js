"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var radio_option_1 = require("~/modules/buttons/radio-option");
var page_1 = require("ui/page");
var SettingComponent = /** @class */ (function () {
    function SettingComponent(routerExtensions, firebaseService, page) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.email = "";
        this.name = "";
        this.gender = "";
        this.page.actionBarHidden = true;
    }
    SettingComponent.prototype.ngOnInit = function () {
        this.genderOptionButtons = [
            new radio_option_1.RadioOption("Gender", "male"),
            new radio_option_1.RadioOption("Gender", "female"),
        ];
        this.email = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];
        this.name = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
        this.gender = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['gender'];
        if (this.gender === 'male') {
            this.changeCheckedRadio(this.genderOptionButtons[0]);
        }
        else if (this.gender === 'female') {
            this.changeCheckedRadio(this.genderOptionButtons[1]);
        }
    };
    SettingComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    SettingComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        switch (radioOption.group) {
            case "Gender":
                this.gender = radioOption.text;
                this.genderOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
        }
    };
    SettingComponent.prototype.onSaveTap = function () {
        var userProfileToUpdate = {
            email: this.email,
            gender: this.gender,
            name: this.name,
        };
        this.firebaseService.setThisUserProfile(userProfileToUpdate);
    };
    SettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Setting',
            templateUrl: './setting.component.html',
            styleUrls: ['./setting.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0QsZ0VBQThEO0FBVTlELCtEQUE2RDtBQUM3RCxnQ0FBK0I7QUFPL0I7SUFPQywwQkFDUyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUZWLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFUbkIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFTbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxtQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzFCLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRyxJQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFDO1lBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRDthQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0YsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixXQUF3QjtRQUMxQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUMxQixPQUFPO1NBQ1A7UUFHRCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDMUIsS0FBSyxRQUFRO2dCQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07b0JBQ3RDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO3dCQUNyQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDeEI7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNQO0lBQ0YsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDQyxJQUFJLG1CQUFtQixHQUFHO1lBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2YsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBN0RXLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FTMEIseUJBQWdCO1lBQ2pCLGtDQUFlO1lBQzFCLFdBQUk7T0FWUCxnQkFBZ0IsQ0E4RDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTlERCxJQThEQztBQTlEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9yYWRpby1vcHRpb25cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdTZXR0aW5nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2V0dGluZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2V0dGluZy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGVtYWlsOiBzdHJpbmcgPSBcIlwiO1xyXG5cdG5hbWU6IHN0cmluZyA9XCJcIlxyXG5cdGdlbmRlcjogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0Z2VuZGVyT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2VcclxuXHQpIHsgXHJcblx0XHR0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuXHR9XHJcblx0bmdPbkluaXQoKSB7IFxyXG5cdFx0dGhpcy5nZW5kZXJPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJtYWxlXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJmZW1hbGVcIiksXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5lbWFpbCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnZW1haWwnXTtcclxuXHRcdHRoaXMubmFtZSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdFx0dGhpcy5nZW5kZXIgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ2dlbmRlciddO1xyXG5cdFx0aWYodGhpcy5nZW5kZXIgPT09ICdtYWxlJyl7XHJcblx0XHRcdHRoaXMuY2hhbmdlQ2hlY2tlZFJhZGlvKHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9uc1swXSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKHRoaXMuZ2VuZGVyID09PSAnZmVtYWxlJyl7XHJcblx0XHRcdHRoaXMuY2hhbmdlQ2hlY2tlZFJhZGlvKHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9uc1sxXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcblx0Y2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG5cdFx0cmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XHJcblxyXG5cdFx0aWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHN3aXRjaCAocmFkaW9PcHRpb24uZ3JvdXApIHtcclxuXHRcdFx0Y2FzZSBcIkdlbmRlclwiOlxyXG5cdFx0XHRcdHRoaXMuZ2VuZGVyID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25TYXZlVGFwKCl7XHJcblx0XHR2YXIgdXNlclByb2ZpbGVUb1VwZGF0ZSA9IHtcclxuXHRcdFx0ZW1haWw6IHRoaXMuZW1haWwsXHJcblx0XHRcdGdlbmRlcjogdGhpcy5nZW5kZXIsXHJcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNldFRoaXNVc2VyUHJvZmlsZSh1c2VyUHJvZmlsZVRvVXBkYXRlKTtcclxuXHR9XHJcbn1cclxuIl19