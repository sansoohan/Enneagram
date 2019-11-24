"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var InvitationComponent = /** @class */ (function () {
    function InvitationComponent() {
    }
    InvitationComponent.prototype.ngOnInit = function () {
        this.getInvitation();
        // this.invite();
    };
    InvitationComponent.prototype.invite = function () {
        firebase.invites.sendInvitation({
            title: "Invite title here",
            message: "Invite message here",
            customImage: "./test/images/qrcode.png",
            deepLink: "https://friendlibrary.page.link/welcome"
        }).then(function (result) {
            console.log(result.count + "invitations sent, ID's: " + JSON.stringify(result.invitationIds));
        }, function (error) {
            console.log("sendInvitation error: " + error);
        });
    };
    InvitationComponent.prototype.getInvitation = function () {
        firebase.invites.getInvitation().then(function (result) {
            console.log("deepLink: " + result.deepLink + ", invitationId: " + result.invitationId + ", matchType: " + result.matchType);
        }, function (error) {
            console.log("getInvitation error: " + error);
        });
    };
    InvitationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Invitation',
            templateUrl: './invitation.component.html',
            styleUrls: ['./invitation.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], InvitationComponent);
    return InvitationComponent;
}());
exports.InvitationComponent = InvitationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZpdGF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1REFBMEQ7QUFPMUQ7SUFDSTtJQUVBLENBQUM7SUFDRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0lBQ0Qsb0NBQU0sR0FBTjtRQUNJLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ2hDLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFFBQVEsRUFBRSx5Q0FBeUM7U0FDbEQsQ0FBQyxDQUFDLElBQUksQ0FDSCxVQUFVLE1BQU07WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLDBCQUEwQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDOUYsQ0FBQyxFQUNELFVBQVUsS0FBSztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsMkNBQWEsR0FBYjtRQUNJLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUNqQyxVQUFVLE1BQU07WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxZQUFZLEdBQUUsZUFBZSxHQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1SCxDQUFDLEVBQ0QsVUFBVSxLQUFLO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFoQ1EsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDOztPQUNXLG1CQUFtQixDQWlDL0I7SUFBRCwwQkFBQztDQUFBLEFBakNELElBaUNDO0FBakNZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ0ludml0YXRpb24nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ludml0YXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaW52aXRhdGlvbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEludml0YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZpdGF0aW9uKCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnZpdGUoKTtcclxuICAgIH1cclxuICAgIGludml0ZSgpe1xyXG4gICAgICAgIGZpcmViYXNlLmludml0ZXMuc2VuZEludml0YXRpb24oe1xyXG4gICAgICAgIHRpdGxlOiBcIkludml0ZSB0aXRsZSBoZXJlXCIsXHJcbiAgICAgICAgbWVzc2FnZTogXCJJbnZpdGUgbWVzc2FnZSBoZXJlXCIsXHJcbiAgICAgICAgY3VzdG9tSW1hZ2U6IFwiLi90ZXN0L2ltYWdlcy9xcmNvZGUucG5nXCIsXHJcbiAgICAgICAgZGVlcExpbms6IFwiaHR0cHM6Ly9mcmllbmRsaWJyYXJ5LnBhZ2UubGluay93ZWxjb21lXCJcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7IC8vIFNlbmRJbnZpdGF0aW9uUmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5jb3VudCArIFwiaW52aXRhdGlvbnMgc2VudCwgSUQnczogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQuaW52aXRhdGlvbklkcykpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZEludml0YXRpb24gZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldEludml0YXRpb24oKXtcclxuICAgICAgICBmaXJlYmFzZS5pbnZpdGVzLmdldEludml0YXRpb24oKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7IC8vIEdldEludml0YXRpb25SZXN1bHRcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZXBMaW5rOiBcIiArIHJlc3VsdC5kZWVwTGluayArIFwiLCBpbnZpdGF0aW9uSWQ6IFwiICsgcmVzdWx0Lmludml0YXRpb25JZCsgXCIsIG1hdGNoVHlwZTogXCIrIHJlc3VsdC5tYXRjaFR5cGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldEludml0YXRpb24gZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXX0=