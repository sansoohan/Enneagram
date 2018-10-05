"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AnimationsService = /** @class */ (function () {
    function AnimationsService() {
    }
    Object.defineProperty(AnimationsService.prototype, "animationOffset", {
        get: function () {
            return this._animationOffset;
        },
        set: function (offset) {
            this._animationOffset = offset;
        },
        enumerable: true,
        configurable: true
    });
    AnimationsService = __decorate([
        core_1.Injectable()
    ], AnimationsService);
    return AnimationsService;
}());
exports.AnimationsService = AnimationsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5pbWF0aW9ucy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDO0lBQUE7SUFVQSxDQUFDO0lBUEcsc0JBQUksOENBQWU7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixNQUFjO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7SUFMUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTtPQUNBLGlCQUFpQixDQVU3QjtJQUFELHdCQUFDO0NBQUEsQUFWRCxJQVVDO0FBVlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25zU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9hbmltYXRpb25PZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICBnZXQgYW5pbWF0aW9uT2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbk9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYW5pbWF0aW9uT2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uT2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgfVxyXG59Il19