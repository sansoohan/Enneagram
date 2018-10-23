"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var firebase_service_1 = require("../services/firebase.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, firebaseService) {
        this.location = location;
        this.firebaseService = firebaseService;
    }
    RegisterComponent.prototype.goBack = function () {
        this.location.back();
    };
    RegisterComponent.prototype.signUp = function () {
        var _this = this;
        if (this.passwd !== this.passwdConfirm) {
            alert("Password confirm error. Please retype passwd and passwdConfirm");
            this.passwd = null;
            this.passwdConfirm = null;
        }
        this.firebaseService.register(this.email, this.passwd)
            .then(function () {
            _this.location.back();
        })
            .catch(function (message) {
            alert(message);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "rr-register",
            templateUrl: "register.component.html",
            styleUrls: ['./register.component.css'],
        }),
        __metadata("design:paramtypes", [common_1.Location, firebase_service_1.FirebaseService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDBDQUEyQztBQUUzQyxpRUFBNkQ7QUFRN0Q7SUFJSSwyQkFBMkIsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3ZGLENBQUM7SUFFTSxrQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsa0NBQU0sR0FBTjtRQUFBLGlCQWFEO1FBWkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztZQUNuQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ25ELElBQUksQ0FBQztZQUNKLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsT0FBVztZQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdkJVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FLdUMsaUJBQVEsRUFBMkIsa0NBQWU7T0FKOUUsaUJBQWlCLENBeUI3QjtJQUFELHdCQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6QlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7RmlyZWJhc2VTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcInJyLXJlZ2lzdGVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJyZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVnaXN0ZXIuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQge1xyXG4gICAgZW1haWw6c3RyaW5nO1xyXG4gICAgcGFzc3dkOnN0cmluZztcclxuICAgIHBhc3N3ZENvbmZpcm06c3RyaW5nO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgIH1cclxuICAgIHNpZ25VcCgpIHtcclxuICAgIGlmKHRoaXMucGFzc3dkICE9PSB0aGlzLnBhc3N3ZENvbmZpcm0pe1xyXG4gICAgICAgIGFsZXJ0KFwiUGFzc3dvcmQgY29uZmlybSBlcnJvci4gUGxlYXNlIHJldHlwZSBwYXNzd2QgYW5kIHBhc3N3ZENvbmZpcm1cIik7XHJcbiAgICAgICAgdGhpcy5wYXNzd2QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGFzc3dkQ29uZmlybSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5yZWdpc3Rlcih0aGlzLmVtYWlsLCB0aGlzLnBhc3N3ZClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKG1lc3NhZ2U6YW55KSA9PiB7XHJcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19