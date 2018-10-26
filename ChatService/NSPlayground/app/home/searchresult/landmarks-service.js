"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mock_landmarks_1 = require("./mock-landmarks");
var LandmarksService = /** @class */ (function () {
    function LandmarksService() {
        this._selectedId = -1;
    }
    LandmarksService.prototype.getLandmarks = function () {
        return mock_landmarks_1.LANDMARKS;
    };
    LandmarksService.prototype.getLandmark = function (id) {
        return mock_landmarks_1.LANDMARKS.filter(function (landmark) { return landmark.id === id; })[0];
    };
    LandmarksService.prototype.setSelectedId = function (id) {
        if (id < mock_landmarks_1.LANDMARKS.length) {
            this._selectedId = id;
        }
    };
    LandmarksService.prototype.getSelected = function () {
        return this._selectedId < 0 ? null : this.getLandmark(this._selectedId);
    };
    LandmarksService = __decorate([
        core_1.Injectable()
    ], LandmarksService);
    return LandmarksService;
}());
exports.LandmarksService = LandmarksService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZG1hcmtzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYW5kbWFya3Mtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyxtREFBNkM7QUFHN0M7SUFEQTtRQUVZLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFtQjdCLENBQUM7SUFqQkcsdUNBQVksR0FBWjtRQUNJLE1BQU0sQ0FBQywwQkFBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUNsQixNQUFNLENBQUMsMEJBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsRUFBVTtRQUNwQixFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsMEJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBbkJRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBb0I1QjtJQUFELHVCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IExhbmRtYXJrIH0gZnJvbSBcIi4vbGFuZG1hcmsubW9kZWxcIjtcclxuaW1wb3J0IHsgTEFORE1BUktTIH0gZnJvbSBcIi4vbW9jay1sYW5kbWFya3NcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExhbmRtYXJrc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJZCA9IC0xO1xyXG5cclxuICAgIGdldExhbmRtYXJrcygpOiBMYW5kbWFya1tdIHtcclxuICAgICAgICByZXR1cm4gTEFORE1BUktTO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhbmRtYXJrKGlkOiBudW1iZXIpOiBMYW5kbWFyayB7XHJcbiAgICAgICAgcmV0dXJuIExBTkRNQVJLUy5maWx0ZXIobGFuZG1hcmsgPT4gbGFuZG1hcmsuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RlZElkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaWQgPCBMQU5ETUFSS1MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0ZWQoKTogTGFuZG1hcmsge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZElkIDwgMCA/IG51bGwgOiB0aGlzLmdldExhbmRtYXJrKHRoaXMuX3NlbGVjdGVkSWQpO1xyXG4gICAgfVxyXG59Il19