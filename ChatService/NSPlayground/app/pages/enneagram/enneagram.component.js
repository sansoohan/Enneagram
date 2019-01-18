"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var radio_option_1 = require("~/modules/buttons/radio-option");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var firebase_service_1 = require("~/services/firebase.service");
var EnneagramComponent = /** @class */ (function () {
    function EnneagramComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.emotion = "";
        this.behavior = "";
        this.thought = "";
        this.enneagramNum = 0;
    }
    EnneagramComponent.prototype.onButtonTap = function () {
        if (this.emotion === "" || this.behavior === "" || this.thought === "") {
            dialogs_1.alert("Please fill this form.");
            return;
        }
        this.enneagramNum = this.getEnneagram();
        var lastCheck = this.checkEnneagram();
        if (lastCheck === 0) {
            this.enneagramCheckConfirm("Your third answer might not be \n" + this.thought + "\n Do you want to save your state?");
        }
        else {
            this.saveUserEnneagramOnDatebase();
            this.confirm("You can change this state from your home tab.");
        }
    };
    EnneagramComponent.prototype.saveUserEnneagramOnDatebase = function () {
        this.firebaseService.thisUser.enneagram.number = this.enneagramNum;
        this.firebaseService.thisUser.enneagram.emotion = this.emotion;
        this.firebaseService.thisUser.enneagram.behavior = this.behavior;
        this.firebaseService.thisUser.enneagram.thought = this.thought;
    };
    EnneagramComponent.prototype.confirm = function (checkMessage) {
        var _this = this;
        dialogs_1.confirm({
            title: "Successfully saved!",
            message: checkMessage,
            okButtonText: "Go Home",
        }).then(function (result) {
            if (result === true) {
                _this.routerExtensions.navigate(['/'], { animated: false });
            }
        });
    };
    EnneagramComponent.prototype.enneagramCheckConfirm = function (checkMessage) {
        var _this = this;
        dialogs_1.confirm({
            title: "Last Check",
            message: checkMessage,
            cancelButtonText: "No",
            okButtonText: "Yes",
        }).then(function (result) {
            if (result === true) {
                console.log(_this.enneagramNum);
                _this.saveUserEnneagramOnDatebase();
                _this.confirm("You can change this state from your home tab.");
            }
        });
    };
    EnneagramComponent.prototype.checkEnneagram = function () {
        if (this.emotion === "Anger" && this.behavior === "Active Person" && this.thought === "Trust or Betray")
            return 8;
        if (this.emotion === "Anger" && this.behavior === "Not Active Person" && this.thought === "Positive or Negative")
            return 9;
        if (this.emotion === "Anger" && this.behavior === "Listener" && this.thought === "Success or Failure")
            return 1;
        if (this.emotion === "Shame" && this.behavior === "Listener" && this.thought === "Positive or Negative")
            return 2;
        if (this.emotion === "Shame" && this.behavior === "Active Person" && this.thought === "Success or Failure")
            return 3;
        if (this.emotion === "Shame" && this.behavior === "Not Active Person" && this.thought === "Trust or Betray")
            return 4;
        if (this.emotion === "Fear" && this.behavior === "Not Active Person" && this.thought === "Success or Failure")
            return 5;
        if (this.emotion === "Fear" && this.behavior === "Listener" && this.thought === "Trust or Betray")
            return 6;
        if (this.emotion === "Fear" && this.behavior === "Active Person" && this.thought === "Positive or Negative")
            return 7;
        return 0;
    };
    EnneagramComponent.prototype.getEnneagram = function () {
        if (this.emotion === "Anger" && this.behavior === "Active Person")
            return 8;
        if (this.emotion === "Anger" && this.behavior === "Not Active Person")
            return 9;
        if (this.emotion === "Anger" && this.behavior === "Listener")
            return 1;
        if (this.emotion === "Shame" && this.behavior === "Listener")
            return 2;
        if (this.emotion === "Shame" && this.behavior === "Active Person")
            return 3;
        if (this.emotion === "Shame" && this.behavior === "Not Active Person")
            return 4;
        if (this.emotion === "Fear" && this.behavior === "Not Active Person")
            return 5;
        if (this.emotion === "Fear" && this.behavior === "Listener")
            return 6;
        if (this.emotion === "Fear" && this.behavior === "Active Person")
            return 7;
        return 0;
    };
    EnneagramComponent.prototype.ngOnInit = function () {
        this.emotionOptionButtons = [
            new radio_option_1.RadioOption("Emotion", "Anger"),
            new radio_option_1.RadioOption("Emotion", "Shame"),
            new radio_option_1.RadioOption("Emotion", "Fear")
        ];
        this.behaviorOptionButtons = [
            new radio_option_1.RadioOption("Behavior", "Active Person"),
            new radio_option_1.RadioOption("Behavior", "Listener"),
            new radio_option_1.RadioOption("Behavior", "Not Active Person")
        ];
        this.thoughtOptionButtons = [
            new radio_option_1.RadioOption("Thought", "Positive or Negative"),
            new radio_option_1.RadioOption("Thought", "Trust or Betray"),
            new radio_option_1.RadioOption("Thought", "Success or Failure")
        ];
    };
    EnneagramComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    EnneagramComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        switch (radioOption.group) {
            case "Emotion":
                this.emotion = radioOption.text;
                this.emotionOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
            case "Behavior":
                this.behavior = radioOption.text;
                this.behaviorOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
            case "Thought":
                this.thought = radioOption.text;
                this.thoughtOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
        }
    };
    EnneagramComponent = __decorate([
        core_1.Component({
            selector: "Enneagram",
            moduleId: module.id,
            templateUrl: "./enneagram.component.html",
            styleUrls: ['./enneagram.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], EnneagramComponent);
    return EnneagramComponent;
}());
exports.EnneagramComponent = EnneagramComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5uZWFncmFtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVubmVhZ3JhbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBRS9ELCtEQUE2RDtBQUM3RCx1REFBK0Y7QUFFL0YsZ0VBQThEO0FBTzlEO0lBV0MsNEJBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVB6QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFXLENBQUMsQ0FBQztJQU16QixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxlQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLG9DQUFvQyxDQUFDLENBQUM7UUFDdkgsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9B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QkFDSCxLQUFLLENBQUM7WUFDUCxLQUFLLFVBQVU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDaEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN6QixDQUFDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQztRQUNSLENBQUM7SUFDRixDQUFDO0lBcEpXLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FZcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BWjdCLGtCQUFrQixDQXFKOUI7SUFBRCx5QkFBQztDQUFBLEFBckpELElBcUpDO0FBckpZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL3JhZGlvLW9wdGlvblwiO1xyXG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRW5uZWFncmFtXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2VubmVhZ3JhbS5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL2VubmVhZ3JhbS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEVubmVhZ3JhbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0X2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cdGVtb3Rpb25PcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdGJlaGF2aW9yT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHR0aG91Z2h0T3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRlbW90aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG5cdGJlaGF2aW9yOiBzdHJpbmcgPSBcIlwiO1xyXG5cdHRob3VnaHQ6IHN0cmluZyA9IFwiXCI7XHJcblx0ZW5uZWFncmFtTnVtOiBudW1iZXIgPSAwO1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0b25CdXR0b25UYXAoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIlwiIHx8IHRoaXMuYmVoYXZpb3IgPT09IFwiXCIgfHwgdGhpcy50aG91Z2h0ID09PSBcIlwiKSB7XHJcblx0XHRcdGFsZXJ0KFwiUGxlYXNlIGZpbGwgdGhpcyBmb3JtLlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5lbm5lYWdyYW1OdW0gPSB0aGlzLmdldEVubmVhZ3JhbSgpO1xyXG5cdFx0dmFyIGxhc3RDaGVjayA9IHRoaXMuY2hlY2tFbm5lYWdyYW0oKTtcclxuXHRcdGlmIChsYXN0Q2hlY2sgPT09IDApIHtcclxuXHRcdFx0dGhpcy5lbm5lYWdyYW1DaGVja0NvbmZpcm0oXCJZb3VyIHRoaXJkIGFuc3dlciBtaWdodCBub3QgYmUgXFxuXCIgKyB0aGlzLnRob3VnaHQgKyBcIlxcbiBEbyB5b3Ugd2FudCB0byBzYXZlIHlvdXIgc3RhdGU/XCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc2F2ZVVzZXJFbm5lYWdyYW1PbkRhdGViYXNlKCk7XHJcblx0XHRcdHRoaXMuY29uZmlybShcIllvdSBjYW4gY2hhbmdlIHRoaXMgc3RhdGUgZnJvbSB5b3VyIGhvbWUgdGFiLlwiKTtcclxuXHRcdH1cclxuICAgIH1cclxuXHRzYXZlVXNlckVubmVhZ3JhbU9uRGF0ZWJhc2UoKSB7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID0gdGhpcy5lbm5lYWdyYW1OdW07XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0uZW1vdGlvbiA9IHRoaXMuZW1vdGlvbjtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS5iZWhhdmlvciA9IHRoaXMuYmVoYXZpb3I7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0udGhvdWdodCA9IHRoaXMudGhvdWdodDtcclxuXHR9XHJcblxyXG5cdGNvbmZpcm0oY2hlY2tNZXNzYWdlKSB7XHJcblx0XHRjb25maXJtKHtcclxuXHRcdFx0dGl0bGU6IFwiU3VjY2Vzc2Z1bGx5IHNhdmVkIVwiLFxyXG5cdFx0XHRtZXNzYWdlOiBjaGVja01lc3NhZ2UsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJHbyBIb21lXCIsXHJcblx0XHR9KS50aGVuKChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRlbm5lYWdyYW1DaGVja0NvbmZpcm0oY2hlY2tNZXNzYWdlKSB7XHJcblx0XHRjb25maXJtKHtcclxuXHRcdFx0dGl0bGU6IFwiTGFzdCBDaGVja1wiLFxyXG5cdFx0XHRtZXNzYWdlOiBjaGVja01lc3NhZ2UsXHJcblx0XHRcdGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmVubmVhZ3JhbU51bSk7XHJcblx0XHRcdFx0dGhpcy5zYXZlVXNlckVubmVhZ3JhbU9uRGF0ZWJhc2UoKTtcclxuXHRcdFx0XHR0aGlzLmNvbmZpcm0oXCJZb3UgY2FuIGNoYW5nZSB0aGlzIHN0YXRlIGZyb20geW91ciBob21lIHRhYi5cIik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y2hlY2tFbm5lYWdyYW0oKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiVHJ1c3Qgb3IgQmV0cmF5XCIpIHJldHVybiA4O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiUG9zaXRpdmUgb3IgTmVnYXRpdmVcIikgcmV0dXJuIDk7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJMaXN0ZW5lclwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJTdWNjZXNzIG9yIEZhaWx1cmVcIikgcmV0dXJuIDE7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIlNoYW1lXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJMaXN0ZW5lclwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJQb3NpdGl2ZSBvciBOZWdhdGl2ZVwiKSByZXR1cm4gMjtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiU3VjY2VzcyBvciBGYWlsdXJlXCIpIHJldHVybiAzO1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiVHJ1c3Qgb3IgQmV0cmF5XCIpIHJldHVybiA0O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJGZWFyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJTdWNjZXNzIG9yIEZhaWx1cmVcIikgcmV0dXJuIDU7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlRydXN0IG9yIEJldHJheVwiKSByZXR1cm4gNjtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiRmVhclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJQb3NpdGl2ZSBvciBOZWdhdGl2ZVwiKSByZXR1cm4gNztcclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0Z2V0RW5uZWFncmFtKCk6IG51bWJlciB7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJBY3RpdmUgUGVyc29uXCIpIHJldHVybiA4O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDk7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJMaXN0ZW5lclwiKSByZXR1cm4gMTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIpIHJldHVybiAyO1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gMztcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIpIHJldHVybiA0O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJGZWFyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gNTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiRmVhclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTGlzdGVuZXJcIikgcmV0dXJuIDY7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDc7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLmVtb3Rpb25PcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJFbW90aW9uXCIsIFwiQW5nZXJcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkVtb3Rpb25cIiwgXCJTaGFtZVwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiRW1vdGlvblwiLCBcIkZlYXJcIilcclxuXHRcdF07XHJcblx0XHR0aGlzLmJlaGF2aW9yT3B0aW9uQnV0dG9ucyA9IFtcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiQmVoYXZpb3JcIiwgXCJBY3RpdmUgUGVyc29uXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJCZWhhdmlvclwiLCBcIkxpc3RlbmVyXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJCZWhhdmlvclwiLCBcIk5vdCBBY3RpdmUgUGVyc29uXCIpXHJcblx0XHRdO1xyXG5cdFx0dGhpcy50aG91Z2h0T3B0aW9uQnV0dG9ucyA9IFtcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiVGhvdWdodFwiLCBcIlBvc2l0aXZlIG9yIE5lZ2F0aXZlXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJUaG91Z2h0XCIsIFwiVHJ1c3Qgb3IgQmV0cmF5XCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJUaG91Z2h0XCIsIFwiU3VjY2VzcyBvciBGYWlsdXJlXCIpXHJcblx0XHRdO1xyXG5cdH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuXHRcdHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG5cclxuXHRcdGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRzd2l0Y2ggKHJhZGlvT3B0aW9uLmdyb3VwKSB7XHJcblx0XHRcdGNhc2UgXCJFbW90aW9uXCI6XHJcblx0XHRcdFx0dGhpcy5lbW90aW9uID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLmVtb3Rpb25PcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkJlaGF2aW9yXCI6XHJcblx0XHRcdFx0dGhpcy5iZWhhdmlvciA9IHJhZGlvT3B0aW9uLnRleHQ7XHJcblx0XHRcdFx0dGhpcy5iZWhhdmlvck9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiVGhvdWdodFwiOlxyXG5cdFx0XHRcdHRoaXMudGhvdWdodCA9IHJhZGlvT3B0aW9uLnRleHQ7XHJcblx0XHRcdFx0dGhpcy50aG91Z2h0T3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG59Il19