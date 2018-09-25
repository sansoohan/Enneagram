"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var firebase_service_1 = require("../../services/firebase.service");
var user_model_1 = require("../../models/user.model");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, firebaseService) {
        this.location = location;
        this.firebaseService = firebaseService;
        this.isAuthenticating = false;
        this.user = new user_model_1.User();
    }
    RegisterComponent.prototype.goBack = function () {
        this.location.back();
    };
    RegisterComponent.prototype.signUp = function () {
        var _this = this;
        this.firebaseService.register(this.user)
            .then(function () {
            _this.isAuthenticating = false;
            _this.location.back();
            //  this.toggleDisplay();
        })
            .catch(function (message) {
            alert(message);
            _this.isAuthenticating = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDBDQUEyQztBQUUzQyxvRUFBZ0U7QUFDaEUsc0RBQTZDO0FBUTdDO0lBSUksMkJBQTJCLFFBQWtCLEVBQVUsZUFBZ0M7UUFBNUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUh2RixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sa0NBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELGtDQUFNLEdBQU47UUFBQSxpQkFXRDtRQVZDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDckMsSUFBSSxDQUFDO1lBQ0osS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLHlCQUF5QjtRQUN6QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxPQUFXO1lBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNmLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdkJVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FLdUMsaUJBQVEsRUFBMkIsa0NBQWU7T0FKOUUsaUJBQWlCLENBeUI3QjtJQUFELHdCQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6QlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7RmlyZWJhc2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJyci1yZWdpc3RlclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicmVnaXN0ZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcG9uZW50IHtcclxuICAgIGlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyB1c2VyOiBVc2VyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzaWduVXAoKSB7XHJcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5yZWdpc3Rlcih0aGlzLnVzZXIpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgLy8gIHRoaXMudG9nZ2xlRGlzcGxheSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKG1lc3NhZ2U6YW55KSA9PiB7XHJcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19