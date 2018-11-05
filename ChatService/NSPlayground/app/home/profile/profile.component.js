"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs = require("ui/dialogs");
var radio_option_1 = require("../enneagram/radio-option");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
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
            firebase_service_1.FirebaseService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0Qsb0VBQWtFO0FBT2xFLG9DQUFzQztBQUd0QywwREFBd0Q7QUFReEQ7SUFZQywwQkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUmpDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFJckMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQU1uQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUMxQixJQUFJLDBCQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNqQyxJQUFJLDBCQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztTQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNELGtDQUFPLEdBQVAsVUFBUSxDQUFTO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUMsd0NBQWEsR0FBYixVQUFjLFNBQWdCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0YsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixXQUF3QjtRQUMxQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFHRCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLFFBQVE7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNGLENBQUM7SUExRFcsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQWFxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7T0FiN0IsZ0JBQWdCLENBMkQ1QjtJQUFELHVCQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsga25vd25Gb2xkZXJzLCBwYXRoIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIi4uL2VubmVhZ3JhbS9yYWRpby1vcHRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdQcm9maWxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZmlsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZmlsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuXHRpc09ubGluZTogYm9vbGVhbjtcclxuICBcdHN0YXR1c0NoYW5nZVN1YnNjcjogU3Vic2NyaXB0aW9uO1xyXG4gIFxyXG5cdHByaXZhdGUgaXNVcGRhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgaXNBZGRpbmdOZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSByZW1vdmVkSW1hZ2VVcmw6IHN0cmluZztcclxuXHRnZW5kZXJPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdGdlbmRlcjogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuXHRcdFxyXG5cdCkgeyBcclxuXHRcdHRoaXMuaXNPbmxpbmUgPSB0cnVlO1xyXG5cdH1cclxuXHRuZ09uSW5pdCgpIHsgXHJcblx0XHR0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnMgPSBbXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkdlbmRlclwiLCBcIm1hbGVcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkdlbmRlclwiLCBcImZlbWFsZVwiKSxcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHRjb3VudGVyKGk6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIG5ldyBBcnJheShpKTtcclxuXHR9XHJcblxyXG4gIFx0b25BZGRJbWFnZVRhcChpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5pc09ubGluZSkge1xyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5waWNrSW1hZ2UoaW1hZ2VUeXBlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VDaGVja2VkUmFkaW8ocmFkaW9PcHRpb246IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcclxuXHJcblx0XHRpZiAoIXJhZGlvT3B0aW9uLnNlbGVjdGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0c3dpdGNoIChyYWRpb09wdGlvbi5ncm91cCkge1xyXG5cdFx0XHRjYXNlIFwiR2VuZGVyXCI6XHJcblx0XHRcdFx0dGhpcy5nZW5kZXIgPSByYWRpb09wdGlvbi50ZXh0O1xyXG5cdFx0XHRcdHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==