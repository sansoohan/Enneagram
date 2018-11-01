"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs = require("ui/dialogs");
var radio_option_1 = require("../enneagram/radio-option");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(routerExtensions, firebaseService, _ngZone) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this._ngZone = _ngZone;
        this.isUpdating = false;
        this.isAddingNew = false;
        this.gender = "";
        this.isOnline = true;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.genderOptionButtons = [
            new radio_option_1.RadioOption("Gender", "male"),
            new radio_option_1.RadioOption("Gender", "female"),
        ];
    };
    ProfileComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ProfileComponent.prototype.counter = function (i) {
        return new Array(i);
    };
    ProfileComponent.prototype.onAddImageTap = function (imageType) {
        if (this.isOnline) {
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    ProfileComponent.prototype.changeCheckedRadio = function (radioOption) {
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
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            core_1.NgZone])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0Qsb0VBQWtFO0FBT2xFLG9DQUFzQztBQUd0QywwREFBd0Q7QUFReEQ7SUFZQywwQkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDLEVBQ2hDLE9BQWU7UUFGSixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBVGhCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFJckMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQU1uQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUMxQixJQUFJLDBCQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNqQyxJQUFJLDBCQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztTQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNELGtDQUFPLEdBQVAsVUFBUSxDQUFTO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUMsd0NBQWEsR0FBYixVQUFjLFNBQWdCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0YsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixXQUF3QjtRQUMxQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFHRCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLFFBQVE7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNGLENBQUM7SUExRFcsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQWFxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7WUFDdkIsYUFBTTtPQWRaLGdCQUFnQixDQTJENUI7SUFBRCx1QkFBQztDQUFBLEFBM0RELElBMkRDO0FBM0RZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCIuLi9lbm5lYWdyYW0vcmFkaW8tb3B0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnUHJvZmlsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Byb2ZpbGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblx0aXNPbmxpbmU6IGJvb2xlYW47XHJcbiAgXHRzdGF0dXNDaGFuZ2VTdWJzY3I6IFN1YnNjcmlwdGlvbjtcclxuICBcclxuXHRwcml2YXRlIGlzVXBkYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIGlzQWRkaW5nTmV3OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlZEltYWdlVXJsOiBzdHJpbmc7XHJcblx0Z2VuZGVyT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRnZW5kZXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcblx0XHRwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZVxyXG5cdCkgeyBcclxuXHRcdHRoaXMuaXNPbmxpbmUgPSB0cnVlO1xyXG5cdH1cclxuXHRuZ09uSW5pdCgpIHsgXHJcblx0XHR0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnMgPSBbXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkdlbmRlclwiLCBcIm1hbGVcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkdlbmRlclwiLCBcImZlbWFsZVwiKSxcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHRjb3VudGVyKGk6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIG5ldyBBcnJheShpKTtcclxuXHR9XHJcblxyXG4gIFx0b25BZGRJbWFnZVRhcChpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5pc09ubGluZSkge1xyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5waWNrSW1hZ2UoaW1hZ2VUeXBlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VDaGVja2VkUmFkaW8ocmFkaW9PcHRpb246IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcclxuXHJcblx0XHRpZiAoIXJhZGlvT3B0aW9uLnNlbGVjdGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0c3dpdGNoIChyYWRpb09wdGlvbi5ncm91cCkge1xyXG5cdFx0XHRjYXNlIFwiR2VuZGVyXCI6XHJcblx0XHRcdFx0dGhpcy5nZW5kZXIgPSByYWRpb09wdGlvbi50ZXh0O1xyXG5cdFx0XHRcdHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==