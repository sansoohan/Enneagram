"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var firebase_service_1 = require("~/services/firebase.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, firebaseService) {
        this.location = location;
        this.firebaseService = firebaseService;
        this.tap = new core_1.EventEmitter();
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
    RegisterComponent.prototype.onBackTap = function (args) {
        this.tap.emit(args);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RegisterComponent.prototype, "tap", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "Register",
            templateUrl: "register.component.html",
            styleUrls: ['./register.component.css'],
        }),
        __metadata("design:paramtypes", [common_1.Location, firebase_service_1.FirebaseService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdFO0FBQ2hFLDBDQUEyQztBQUMzQyxnRUFBOEQ7QUFROUQ7SUFNSSwyQkFBMkIsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRDdFLFFBQUcsR0FBc0IsSUFBSSxtQkFBWSxFQUFPLENBQUM7SUFFM0QsQ0FBQztJQUVNLGtDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxrQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaRyxJQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNyRCxJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE9BQVc7WUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBeEJZO1FBQVQsYUFBTSxFQUFFO2tDQUFNLG1CQUFZO2tEQUFnQztJQUxsRCxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBT3VDLGlCQUFRLEVBQTJCLGtDQUFlO09BTjlFLGlCQUFpQixDQThCN0I7SUFBRCx3QkFBQztDQUFBLEFBOUJELElBOEJDO0FBOUJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIlJlZ2lzdGVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJyZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVnaXN0ZXIuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQge1xyXG4gICAgZW1haWw6c3RyaW5nO1xyXG4gICAgcGFzc3dkOnN0cmluZztcclxuICAgIHBhc3N3ZENvbmZpcm06c3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0YXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG4gICAgc2lnblVwKCkge1xyXG4gICAgICAgIGlmKHRoaXMucGFzc3dkICE9PSB0aGlzLnBhc3N3ZENvbmZpcm0pe1xyXG4gICAgICAgICAgICBhbGVydChcIlBhc3N3b3JkIGNvbmZpcm0gZXJyb3IuIFBsZWFzZSByZXR5cGUgcGFzc3dkIGFuZCBwYXNzd2RDb25maXJtXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3ZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc3dkQ29uZmlybSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMuZW1haWwsIHRoaXMucGFzc3dkKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKG1lc3NhZ2U6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQmFja1RhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy50YXAuZW1pdChhcmdzKTtcclxuXHR9XHJcbn1cclxuIl19