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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdFO0FBQ2hFLDBDQUEyQztBQUMzQyxnRUFBOEQ7QUFROUQ7SUFNSSwyQkFBMkIsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRDdFLFFBQUcsR0FBc0IsSUFBSSxtQkFBWSxFQUFPLENBQUM7SUFFM0QsQ0FBQztJQUVNLGtDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxrQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaRyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO1lBQ25DLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDckQsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxPQUFXO1lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQXhCWTtRQUFULGFBQU0sRUFBRTtrQ0FBTSxtQkFBWTtrREFBZ0M7SUFMbEQsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU91QyxpQkFBUSxFQUEyQixrQ0FBZTtPQU45RSxpQkFBaUIsQ0E4QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTlCRCxJQThCQztBQTlCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJSZWdpc3RlclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicmVnaXN0ZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcG9uZW50IHtcclxuICAgIGVtYWlsOnN0cmluZztcclxuICAgIHBhc3N3ZDpzdHJpbmc7XHJcbiAgICBwYXNzd2RDb25maXJtOnN0cmluZztcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgIH1cclxuICAgIHNpZ25VcCgpIHtcclxuICAgICAgICBpZih0aGlzLnBhc3N3ZCAhPT0gdGhpcy5wYXNzd2RDb25maXJtKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJQYXNzd29yZCBjb25maXJtIGVycm9yLiBQbGVhc2UgcmV0eXBlIHBhc3N3ZCBhbmQgcGFzc3dkQ29uZmlybVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXNzd2QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3ZENvbmZpcm0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5yZWdpc3Rlcih0aGlzLmVtYWlsLCB0aGlzLnBhc3N3ZClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChtZXNzYWdlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJhY2tUYXAoYXJncykge1xyXG4gICAgICAgIHRoaXMudGFwLmVtaXQoYXJncyk7XHJcblx0fVxyXG59XHJcbiJdfQ==