"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton2Component = /** @class */ (function () {
    function ChildButton2Component() {
        this.tap = new core_1.EventEmitter();
        this.floatButtonOn = false;
    }
    ChildButton2Component.prototype.ngOnInit = function () {
    };
    ChildButton2Component.prototype.onLoaded = function (args) {
        this.args = args;
    };
    ChildButton2Component.prototype.drawerOpen = function (drawer) {
        if (drawer) {
            this.args.object.className = 'child-btn drawer-down';
        }
        else {
            this.args.object.className = 'child-btn drawer-up';
        }
    };
    ChildButton2Component.prototype.onTap = function (args) {
        if (this.floatButtonOn) {
            this.tap.emit(args);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildButton2Component.prototype, "text", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChildButton2Component.prototype, "tap", void 0);
    ChildButton2Component = __decorate([
        core_1.Component({
            selector: "ChildButton2",
            moduleId: module.id,
            templateUrl: "./child-button2.component.html",
            styleUrls: ['./child-button2.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChildButton2Component);
    return ChildButton2Component;
}());
exports.ChildButton2Component = ChildButton2Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRjtBQVMxRjtJQU1DO1FBSFUsUUFBRyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUNwRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUd0QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtJQUNBLENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDTSwwQ0FBVSxHQUFqQixVQUFrQixNQUFlO1FBQ2hDLElBQUksTUFBTSxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHVCQUF1QixDQUFDO1NBQ3JEO2FBQ0k7WUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7U0FDbkQ7SUFDRixDQUFDO0lBQ0QscUNBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7SUFDRixDQUFDO0lBeEJRO1FBQVIsWUFBSyxFQUFFOzt1REFBYztJQUNaO1FBQVQsYUFBTSxFQUFFO2tDQUFNLG1CQUFZO3NEQUFnQztJQUgvQyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBMkJqQztJQUFELDRCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiQ2hpbGRCdXR0b24yXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9jaGlsZC1idXR0b24yLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hpbGRCdXR0b24yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRhcmdzOiBhbnk7XHJcblx0QElucHV0KCkgdGV4dDogc3RyaW5nO1xyXG5cdEBPdXRwdXQoKSB0YXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblx0cHVibGljIGZsb2F0QnV0dG9uT246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIGRyYXdlcjogYm9vbGVhbjtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdH1cclxuXHRvbkxvYWRlZChhcmdzKSB7XHJcblx0XHR0aGlzLmFyZ3MgPSBhcmdzO1xyXG5cdH1cclxuXHRwdWJsaWMgZHJhd2VyT3BlbihkcmF3ZXI6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChkcmF3ZXIpIHtcclxuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQtYnRuIGRyYXdlci1kb3duJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmFyZ3Mub2JqZWN0LmNsYXNzTmFtZSA9ICdjaGlsZC1idG4gZHJhd2VyLXVwJztcclxuXHRcdH1cclxuXHR9XHJcblx0b25UYXAoYXJncykge1xyXG5cdFx0aWYodGhpcy5mbG9hdEJ1dHRvbk9uKXtcclxuXHRcdFx0dGhpcy50YXAuZW1pdChhcmdzKTtcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=