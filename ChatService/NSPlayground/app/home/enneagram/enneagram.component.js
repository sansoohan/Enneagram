"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var radio_option_1 = require("./radio-option");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var user_home_service_1 = require("../friendchat/user-home.service");
var EnneagramComponent = /** @class */ (function () {
    function EnneagramComponent(routerExtensions, userHomeService) {
        this.routerExtensions = routerExtensions;
        this.userHomeService = userHomeService;
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
        this.userHomeService.me.index.enneagramNumber = this.enneagramNum;
        this.userHomeService.me.home.enneagram.emotion = this.emotion;
        this.userHomeService.me.home.enneagram.behavior = this.behavior;
        this.userHomeService.me.home.enneagram.thought = this.thought;
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
            user_home_service_1.UserHomeService])
    ], EnneagramComponent);
    return EnneagramComponent;
}());
exports.EnneagramComponent = EnneagramComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5uZWFncmFtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVubmVhZ3JhbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBRS9ELCtDQUE2QztBQUM3Qyx1REFBK0Y7QUFFL0YscUVBQWtFO0FBT2xFO0lBV0MsNEJBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVB6QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFXLENBQUMsQ0FBQztJQUt6QixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxlQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLG9DQUFvQyxDQUFDLENBQUM7UUFDdkgsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9B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L2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIi4vcmFkaW8tb3B0aW9uXCI7XG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFVzZXJIb21lU2VydmljZSB9IGZyb20gXCIuLi9mcmllbmRjaGF0L3VzZXItaG9tZS5zZXJ2aWNlXCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRW5uZWFncmFtXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZW5uZWFncmFtLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2VubmVhZ3JhbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5uZWFncmFtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0X2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuXHRlbW90aW9uT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcblx0YmVoYXZpb3JPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xuXHR0aG91Z2h0T3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcblx0ZW1vdGlvbjogc3RyaW5nID0gXCJcIjtcblx0YmVoYXZpb3I6IHN0cmluZyA9IFwiXCI7XG5cdHRob3VnaHQ6IHN0cmluZyA9IFwiXCI7XG5cdGVubmVhZ3JhbU51bTogbnVtYmVyID0gMDtcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIHVzZXJIb21lU2VydmljZTogVXNlckhvbWVTZXJ2aWNlKSB7XG5cdH1cblxuXHRvbkJ1dHRvblRhcCgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIlwiIHx8IHRoaXMuYmVoYXZpb3IgPT09IFwiXCIgfHwgdGhpcy50aG91Z2h0ID09PSBcIlwiKSB7XG5cdFx0XHRhbGVydChcIlBsZWFzZSBmaWxsIHRoaXMgZm9ybS5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZW5uZWFncmFtTnVtID0gdGhpcy5nZXRFbm5lYWdyYW0oKTtcblx0XHR2YXIgbGFzdENoZWNrID0gdGhpcy5jaGVja0VubmVhZ3JhbSgpO1xuXHRcdGlmIChsYXN0Q2hlY2sgPT09IDApIHtcblx0XHRcdHRoaXMuZW5uZWFncmFtQ2hlY2tDb25maXJtKFwiWW91ciB0aGlyZCBhbnN3ZXIgbWlnaHQgbm90IGJlIFxcblwiICsgdGhpcy50aG91Z2h0ICsgXCJcXG4gRG8geW91IHdhbnQgdG8gc2F2ZSB5b3VyIHN0YXRlP1wiKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnNhdmVVc2VyRW5uZWFncmFtT25EYXRlYmFzZSgpO1xuXHRcdFx0dGhpcy5jb25maXJtKFwiWW91IGNhbiBjaGFuZ2UgdGhpcyBzdGF0ZSBmcm9tIHlvdXIgaG9tZSB0YWIuXCIpO1xuXHRcdH1cbiAgICB9XG5cdHNhdmVVc2VyRW5uZWFncmFtT25EYXRlYmFzZSgpIHtcblx0XHR0aGlzLnVzZXJIb21lU2VydmljZS5tZS5pbmRleC5lbm5lYWdyYW1OdW1iZXIgPSB0aGlzLmVubmVhZ3JhbU51bTtcblx0XHR0aGlzLnVzZXJIb21lU2VydmljZS5tZS5ob21lLmVubmVhZ3JhbS5lbW90aW9uID0gdGhpcy5lbW90aW9uO1xuXHRcdHRoaXMudXNlckhvbWVTZXJ2aWNlLm1lLmhvbWUuZW5uZWFncmFtLmJlaGF2aW9yID0gdGhpcy5iZWhhdmlvcjtcblx0XHR0aGlzLnVzZXJIb21lU2VydmljZS5tZS5ob21lLmVubmVhZ3JhbS50aG91Z2h0ID0gdGhpcy50aG91Z2h0O1xuXHR9XG5cblx0Y29uZmlybShjaGVja01lc3NhZ2UpIHtcblx0XHRjb25maXJtKHtcblx0XHRcdHRpdGxlOiBcIlN1Y2Nlc3NmdWxseSBzYXZlZCFcIixcblx0XHRcdG1lc3NhZ2U6IGNoZWNrTWVzc2FnZSxcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJHbyBIb21lXCIsXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRpZiAocmVzdWx0ID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0ZW5uZWFncmFtQ2hlY2tDb25maXJtKGNoZWNrTWVzc2FnZSkge1xuXHRcdGNvbmZpcm0oe1xuXHRcdFx0dGl0bGU6IFwiTGFzdCBDaGVja1wiLFxuXHRcdFx0bWVzc2FnZTogY2hlY2tNZXNzYWdlLFxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0aWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmVubmVhZ3JhbU51bSk7XG5cdFx0XHRcdHRoaXMuc2F2ZVVzZXJFbm5lYWdyYW1PbkRhdGViYXNlKCk7XG5cdFx0XHRcdHRoaXMuY29uZmlybShcIllvdSBjYW4gY2hhbmdlIHRoaXMgc3RhdGUgZnJvbSB5b3VyIGhvbWUgdGFiLlwiKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNoZWNrRW5uZWFncmFtKCk6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiICYmIHRoaXMudGhvdWdodCA9PT0gXCJUcnVzdCBvciBCZXRyYXlcIikgcmV0dXJuIDg7XG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiUG9zaXRpdmUgb3IgTmVnYXRpdmVcIikgcmV0dXJuIDk7XG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJBbmdlclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTGlzdGVuZXJcIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiU3VjY2VzcyBvciBGYWlsdXJlXCIpIHJldHVybiAxO1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlBvc2l0aXZlIG9yIE5lZ2F0aXZlXCIpIHJldHVybiAyO1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiU3VjY2VzcyBvciBGYWlsdXJlXCIpIHJldHVybiAzO1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlRydXN0IG9yIEJldHJheVwiKSByZXR1cm4gNDtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlN1Y2Nlc3Mgb3IgRmFpbHVyZVwiKSByZXR1cm4gNTtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIgJiYgdGhpcy50aG91Z2h0ID09PSBcIlRydXN0IG9yIEJldHJheVwiKSByZXR1cm4gNjtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIiAmJiB0aGlzLnRob3VnaHQgPT09IFwiUG9zaXRpdmUgb3IgTmVnYXRpdmVcIikgcmV0dXJuIDc7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRnZXRFbm5lYWdyYW0oKTogbnVtYmVyIHtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkFuZ2VyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJBY3RpdmUgUGVyc29uXCIpIHJldHVybiA4O1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIk5vdCBBY3RpdmUgUGVyc29uXCIpIHJldHVybiA5O1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiQW5nZXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIpIHJldHVybiAxO1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIpIHJldHVybiAyO1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiU2hhbWVcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDM7XG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJTaGFtZVwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiTm90IEFjdGl2ZSBQZXJzb25cIikgcmV0dXJuIDQ7XG5cdFx0aWYgKHRoaXMuZW1vdGlvbiA9PT0gXCJGZWFyXCIgJiYgdGhpcy5iZWhhdmlvciA9PT0gXCJOb3QgQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gNTtcblx0XHRpZiAodGhpcy5lbW90aW9uID09PSBcIkZlYXJcIiAmJiB0aGlzLmJlaGF2aW9yID09PSBcIkxpc3RlbmVyXCIpIHJldHVybiA2O1xuXHRcdGlmICh0aGlzLmVtb3Rpb24gPT09IFwiRmVhclwiICYmIHRoaXMuYmVoYXZpb3IgPT09IFwiQWN0aXZlIFBlcnNvblwiKSByZXR1cm4gNztcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLmVtb3Rpb25PcHRpb25CdXR0b25zID0gW1xuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiRW1vdGlvblwiLCBcIkFuZ2VyXCIpLFxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiRW1vdGlvblwiLCBcIlNoYW1lXCIpLFxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiRW1vdGlvblwiLCBcIkZlYXJcIilcblx0XHRdO1xuXHRcdHRoaXMuYmVoYXZpb3JPcHRpb25CdXR0b25zID0gW1xuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiQmVoYXZpb3JcIiwgXCJBY3RpdmUgUGVyc29uXCIpLFxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiQmVoYXZpb3JcIiwgXCJMaXN0ZW5lclwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkJlaGF2aW9yXCIsIFwiTm90IEFjdGl2ZSBQZXJzb25cIilcblx0XHRdO1xuXHRcdHRoaXMudGhvdWdodE9wdGlvbkJ1dHRvbnMgPSBbXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJUaG91Z2h0XCIsIFwiUG9zaXRpdmUgb3IgTmVnYXRpdmVcIiksXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJUaG91Z2h0XCIsIFwiVHJ1c3Qgb3IgQmV0cmF5XCIpLFxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiVGhvdWdodFwiLCBcIlN1Y2Nlc3Mgb3IgRmFpbHVyZVwiKVxuXHRcdF07XG5cdH1cblxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG5cdGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcblxuXHRcdGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdHN3aXRjaCAocmFkaW9PcHRpb24uZ3JvdXApIHtcblx0XHRcdGNhc2UgXCJFbW90aW9uXCI6XG5cdFx0XHRcdHRoaXMuZW1vdGlvbiA9IHJhZGlvT3B0aW9uLnRleHQ7XG5cdFx0XHRcdHRoaXMuZW1vdGlvbk9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiQmVoYXZpb3JcIjpcblx0XHRcdFx0dGhpcy5iZWhhdmlvciA9IHJhZGlvT3B0aW9uLnRleHQ7XG5cdFx0XHRcdHRoaXMuYmVoYXZpb3JPcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIlRob3VnaHRcIjpcblx0XHRcdFx0dGhpcy50aG91Z2h0ID0gcmFkaW9PcHRpb24udGV4dDtcblx0XHRcdFx0dGhpcy50aG91Z2h0T3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcdFx0XHRcblx0XHR9XG5cdH1cbn0iXX0=