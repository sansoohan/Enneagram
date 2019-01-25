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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5uZWFncmFtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVubmVhZ3JhbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBRS9ELCtEQUE2RDtBQUM3RCx1REFBK0Y7QUFFL0YsZ0VBQThEO0FBTzlEO0lBV0MsNEJBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVB6QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFXLENBQUMsQ0FBQztJQU16QixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDdkUsZUFBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDaEMsT0FBTztTQUNQO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3RIO2FBQ0k7WUFDSixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDOUQ7SUFDQyxDQUFDO0lBQ0osd0RBQTJCLEdBQTNCO1FBQ0MsSUFBSSxD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TSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQVlxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7T0FaN0Isa0JBQWtCLENBcUo5QjtJQUFELHlCQUFDO0NBQUEsQUFySkQsSUFxSkM7QUFySlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgUmFkaW9PcHRpb24gfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvcmFkaW8tb3B0aW9uXCI7XHJcbmltcG9ydCB7IGFsZXJ0LCBjb25maXJtLCBwcm9tcHQsIGxvZ2luLCBhY3Rpb24sIGlucHV0VHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJFbm5lYWdyYW1cIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vZW5uZWFncmFtLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vZW5uZWFncmFtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5uZWFncmFtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblx0ZW1vdGlvbk9wdGlvbkJ1dHRvbnM/OiBBcnJheTxSYWRpb09wdGlvbj47XHJcblx0YmVoYXZpb3JPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdHRob3VnaHRPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdGVtb3Rpb246IHN0cmluZyA9IFwiXCI7XHJcblx0YmVoYXZpb3I6IHN0cmluZyA9IFwiXCI7XHJcblx0dGhvdWdodDogc3RyaW5nID0gXCJcIjtcclxuXHRlbm5lYWdyYW1OdW06IG51bWJlciA9IDA7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRvbkJ1dHRvblRhcCgpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiXCIgfHwgdGhpcy5iZWhhdmlvciA9PT0gXCJcIiB8fCB0aGlzLnRob3VnaHQgPT09IFwiXCIpIHtcclxuXHRcdFx0YWxlcnQoXCJQbGVhc2UgZmlsbCB0aGlzIGZvcm0uXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLmVubmVhZ3JhbU51bSA9IHRoaXMuZ2V0RW5uZWFncmFtKCk7XHJcblx0XHR2YXIgbGFzdENoZWNrID0gdGhpcy5jaGVja0VubmVhZ3JhbSgpO1xyXG5cdFx0aWYgKGxhc3RDaGVjayA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLmVubmVhZ3JhbUNoZWNrQ29uZmlybShcIllvdXIgdGhpcmQgYW5zd2VyIG1pZ2h0IG5vdCBiZSBcXG5cIiArIHRoaXMudGhvdWdodCArIFwiXFxuIERvIHlvdSB3YW50IHRvIHNhdmUgeW91ciBzdGF0ZT9cIik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zYXZlVXNlckVubmVhZ3JhbU9uRGF0ZWJhc2UoKTtcclxuXHRcdFx0dGhpcy5jb25maXJtKFwiWW91IGNhbiBjaGFuZ2UgdGhpcyBzdGF0ZSBmcm9tIHlvdXIgaG9tZSB0YWIuXCIpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cdHNhdmVVc2VyRW5uZWFncmFtT25EYXRlYmFzZSgpIHtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPSB0aGlzLmVubmVhZ3JhbU51bTtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS5lbW90aW9uID0gdGhpcy5lbW90aW9uO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIuZW5uZWFncmFtLmJlaGF2aW9yID0gdGhpcy5iZWhhdmlvcjtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS50aG91Z2h0ID0gdGhpcy50aG91Z2h0O1xyXG5cdH1cclxuXHJcblx0Y29uZmlybShjaGVja01lc3NhZ2UpIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJTdWNjZXNzZnVsbHkgc2F2ZWQhXCIsXHJcblx0XHRcdG1lc3NhZ2U6IGNoZWNrTWVzc2FnZSxcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIkdvIEhvbWVcIixcclxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnLyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGVubmVhZ3JhbUNoZWNrQ29uZmlybShjaGVja01lc3NhZ2UpIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJMYXN0IENoZWNrXCIsXHJcblx0XHRcdG1lc3NhZ2U6IGNoZWNrTWVzc2FnZSxcclxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcblx0XHR9KS50aGVuKChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuZW5uZWFncmFtTnVtKTtcclxuXHRcdFx0XHR0aGlzLnNhdmVVc2VyRW5uZWFncmFtT25EYXRlYmFzZSgpO1xyXG5cdFx0XHRcdHRoaXMuY29uZmlybShcIllvdSBjYW4gY2hhbmdlIHRoaXMgc3RhdGUgZnJvbSB5b3VyIGhvbWUgdGFiLlwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjaGVja0VubmVhZ3JhbSgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJUcnVzdCBvciBCZXRyYXlcIikgcmV0dXJuIDg7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJQb3NpdGl2ZSBvciBOZWdhdGl2ZVwiKSByZXR1cm4gOTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlN1Y2Nlc3Mgb3IgRmFpbHVyZVwiKSByZXR1cm4gMTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlBvc2l0aXZlIG9yIE5lZ2F0aXZlXCIpIHJldHVybiAyO1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJTdWNjZXNzIG9yIEZhaWx1cmVcIikgcmV0dXJuIDM7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIlNoYW1lXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJUcnVzdCBvciBCZXRyYXlcIikgcmV0dXJuIDQ7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlN1Y2Nlc3Mgb3IgRmFpbHVyZVwiKSByZXR1cm4gNTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiRmVhclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTGlzdGVuZXJcIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiVHJ1c3Qgb3IgQmV0cmF5XCIpIHJldHVybiA2O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJGZWFyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJBY3RpdmUgUGVyc29uXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlBvc2l0aXZlIG9yIE5lZ2F0aXZlXCIpIHJldHVybiA3O1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cclxuXHRnZXRFbm5lYWdyYW0oKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDg7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gOTtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIpIHJldHVybiAxO1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTGlzdGVuZXJcIikgcmV0dXJuIDI7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIlNoYW1lXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJBY3RpdmUgUGVyc29uXCIpIHJldHVybiAzO1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDQ7XHJcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIpIHJldHVybiA1O1xyXG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJGZWFyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJMaXN0ZW5lclwiKSByZXR1cm4gNjtcclxuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiRmVhclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gNztcclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZW1vdGlvbk9wdGlvbkJ1dHRvbnMgPSBbXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkVtb3Rpb25cIiwgXCJBbmdlclwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiRW1vdGlvblwiLCBcIlNoYW1lXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJFbW90aW9uXCIsIFwiRmVhclwiKVxyXG5cdFx0XTtcclxuXHRcdHRoaXMuYmVoYXZpb3JPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJCZWhhdmlvclwiLCBcIkFjdGl2ZSBQZXJzb25cIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkJlaGF2aW9yXCIsIFwiTGlzdGVuZXJcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkJlaGF2aW9yXCIsIFwiTm90IEFjdGl2ZSBQZXJzb25cIilcclxuXHRcdF07XHJcblx0XHR0aGlzLnRob3VnaHRPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJUaG91Z2h0XCIsIFwiUG9zaXRpdmUgb3IgTmVnYXRpdmVcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlRob3VnaHRcIiwgXCJUcnVzdCBvciBCZXRyYXlcIiksXHJcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlRob3VnaHRcIiwgXCJTdWNjZXNzIG9yIEZhaWx1cmVcIilcclxuXHRcdF07XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcblx0Y2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG5cdFx0cmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XHJcblxyXG5cdFx0aWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHN3aXRjaCAocmFkaW9PcHRpb24uZ3JvdXApIHtcclxuXHRcdFx0Y2FzZSBcIkVtb3Rpb25cIjpcclxuXHRcdFx0XHR0aGlzLmVtb3Rpb24gPSByYWRpb09wdGlvbi50ZXh0O1xyXG5cdFx0XHRcdHRoaXMuZW1vdGlvbk9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiQmVoYXZpb3JcIjpcclxuXHRcdFx0XHR0aGlzLmJlaGF2aW9yID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLmJlaGF2aW9yT3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJUaG91Z2h0XCI6XHJcblx0XHRcdFx0dGhpcy50aG91Z2h0ID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLnRob3VnaHRPcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=