"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var nativescript_plugin_firebase_1 = require("nativescript-plugin-firebase");
var GoogleAnalyticsComponent = /** @class */ (function () {
    function GoogleAnalyticsComponent() {
    }
    GoogleAnalyticsComponent.prototype.ngOnInit = function () {
    };
    GoogleAnalyticsComponent.prototype.button1Tap = function () {
        firebase.analytics.logEvent({
            key: "Button1Click",
            parameters: [
                {
                    key: "item_id",
                    value: "p7654"
                },
                {
                    key: "item_name",
                    value: "abc"
                }
            ]
        }).then(function () {
            console.log("Firebase Analytics event logged");
        });
    };
    GoogleAnalyticsComponent.prototype.button2Tap = function () {
        firebase.analytics.logEvent({
            // see https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event.html
            key: "add_to_cart",
            parameters: [{
                    key: "item_id",
                    value: "p7655"
                },
                {
                    key: "item_name",
                    value: "abcd"
                }]
        }).then(function () {
            console.log("Analytics event logged");
            alert({
                title: "Analytics event pushed",
                okButtonText: "Awesome :)"
            });
        }, function (errorMessage) {
            alert({
                title: "Analytics error",
                message: errorMessage,
                okButtonText: "Ehh, OK"
            });
        });
        /**
         * Same thing as logEvent but can add an array or specific types not just string (LogComplexEventTypeParameter.BOOLEAN, LogComplexEventTypeParameter.STRING,
         * LogComplexEventTypeParameter.DOUBLE, LogComplexEventTypeParameter.FLOAT, LogComplexEventTypeParameter.INT, LogComplexEventTypeParameter.ARRAY)
         */
        firebase.analytics.logComplexEvent({
            key: "view_item_list",
            parameters: [{
                    key: "item1",
                    type: "array",
                    value: [
                        {
                            parameters: [
                                { key: "item_id", value: "id of item", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_name", value: "name of item", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_category", value: "category", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_variant", value: "variant", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_brand", value: "name of item brand", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "price", value: 1, type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.DOUBLE },
                                { key: "item_list", value: "name of list", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "index", value: 1, type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.INT }
                            ]
                        },
                        {
                            parameters: [
                                { key: "item_id", value: "id of item", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_name", value: "name of item", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_category", value: "category", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_variant", value: "variant", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "item_brand", value: "name of item brand", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "price", value: 1, type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.DOUBLE },
                                { key: "item_list", value: "name of list", type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.STRING },
                                { key: "index", value: 2, type: nativescript_plugin_firebase_1.LogComplexEventTypeParameter.INT }
                            ]
                        }
                    ]
                }]
        });
    };
    GoogleAnalyticsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'GoogleAnalytics',
            templateUrl: './google-analytics.component.html',
            styleUrls: ['./google-analytics.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GoogleAnalyticsComponent);
    return GoogleAnalyticsComponent;
}());
exports.GoogleAnalyticsComponent = GoogleAnalyticsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnb29nbGUtYW5hbHl0aWNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1REFBMEQ7QUFDMUQsNkVBQTRFO0FBTzVFO0lBRUU7SUFFQSxDQUFDO0lBRUQsMkNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQ0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDMUIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLEdBQUcsRUFBRSxTQUFTO29CQUNkLEtBQUssRUFBRSxPQUFPO2lCQUNmO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsS0FBSztpQkFDYjthQUFDO1NBQ0wsQ0FBQyxDQUFDLElBQUksQ0FDSDtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFTSw2Q0FBVSxHQUFqQjtRQUNFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzFCLG9IQUFvSDtZQUNwSCxHQUFHLEVBQUUsYUFBYTtZQUNsQixVQUFVLEVBQUUsQ0FBQztvQkFDWCxHQUFHLEVBQUUsU0FBUztvQkFDZCxLQUFLLEVBQUUsT0FBTztpQkFDZjtnQkFDQztvQkFDRSxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFLE1BQU07aUJBQ2QsQ0FBQztTQUNMLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLFlBQVksRUFBRSxZQUFZO2FBQzNCLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFB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USxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ2pELENBQUM7O09BQ1csd0JBQXdCLENBZ0dwQztJQUFELCtCQUFDO0NBQUEsQUFoR0QsSUFnR0M7QUFoR1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHsgTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdHb29nbGVBbmFseXRpY3MnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ29vZ2xlLWFuYWx5dGljcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dvb2dsZS1hbmFseXRpY3MuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHb29nbGVBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgYnV0dG9uMVRhcCgpe1xuICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dFdmVudCh7XG4gICAgICBrZXk6IFwiQnV0dG9uMUNsaWNrXCIsXG4gICAgICBwYXJhbWV0ZXJzOiBbIC8vIG9wdGlvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IFwiaXRlbV9pZFwiLFxuICAgICAgICAgIHZhbHVlOiBcInA3NjU0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogXCJpdGVtX25hbWVcIixcbiAgICAgICAgICB2YWx1ZTogXCJhYmNcIlxuICAgICAgICB9XVxuICAgIH0pLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIEFuYWx5dGljcyBldmVudCBsb2dnZWRcIik7XG4gICAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGJ1dHRvbjJUYXAoKTogdm9pZCB7XG4gICAgZmlyZWJhc2UuYW5hbHl0aWNzLmxvZ0V2ZW50KHtcbiAgICAgIC8vIHNlZSBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvYW5kcm9pZC9jb20vZ29vZ2xlL2ZpcmViYXNlL2FuYWx5dGljcy9GaXJlYmFzZUFuYWx5dGljcy5FdmVudC5odG1sXG4gICAgICBrZXk6IFwiYWRkX3RvX2NhcnRcIixcbiAgICAgIHBhcmFtZXRlcnM6IFt7IC8vIG9wdGlvbmFsXG4gICAgICAgIGtleTogXCJpdGVtX2lkXCIsXG4gICAgICAgIHZhbHVlOiBcInA3NjU1XCJcbiAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IFwiaXRlbV9uYW1lXCIsXG4gICAgICAgICAgdmFsdWU6IFwiYWJjZFwiXG4gICAgICAgIH1dXG4gICAgfSkudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQW5hbHl0aWNzIGV2ZW50IGxvZ2dlZFwiKTtcbiAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogXCJBbmFseXRpY3MgZXZlbnQgcHVzaGVkXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQXdlc29tZSA6KVwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yTWVzc2FnZSA9PiB7XG4gICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiQW5hbHl0aWNzIGVycm9yXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRWhoLCBPS1wiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSB0aGluZyBhcyBsb2dFdmVudCBidXQgY2FuIGFkZCBhbiBhcnJheSBvciBzcGVjaWZpYyB0eXBlcyBub3QganVzdCBzdHJpbmcgKExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuQk9PTEVBTiwgTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkcsXG4gICAgICogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5ET1VCTEUsIExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuRkxPQVQsIExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuSU5ULCBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLkFSUkFZKVxuICAgICAqL1xuICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dDb21wbGV4RXZlbnQoe1xuICAgICAga2V5OiBcInZpZXdfaXRlbV9saXN0XCIsXG4gICAgICBwYXJhbWV0ZXJzOiBbe1xuICAgICAgICBrZXk6IFwiaXRlbTFcIixcbiAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICB2YWx1ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2lkXCIsIHZhbHVlOiBcImlkIG9mIGl0ZW1cIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fbmFtZVwiLCB2YWx1ZTogXCJuYW1lIG9mIGl0ZW1cIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fY2F0ZWdvcnlcIiwgdmFsdWU6IFwiY2F0ZWdvcnlcIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fdmFyaWFudFwiLCB2YWx1ZTogXCJ2YXJpYW50XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2JyYW5kXCIsIHZhbHVlOiBcIm5hbWUgb2YgaXRlbSBicmFuZFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXG4gICAgICAgICAgICAgIHtrZXk6IFwicHJpY2VcIiwgdmFsdWU6IDEsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuRE9VQkxFfSxcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2xpc3RcIiwgdmFsdWU6IFwibmFtZSBvZiBsaXN0XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcbiAgICAgICAgICAgICAge2tleTogXCJpbmRleFwiLCB2YWx1ZTogMSwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5JTlR9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9pZFwiLCB2YWx1ZTogXCJpZCBvZiBpdGVtXCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX25hbWVcIiwgdmFsdWU6IFwibmFtZSBvZiBpdGVtXCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2NhdGVnb3J5XCIsIHZhbHVlOiBcImNhdGVnb3J5XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX3ZhcmlhbnRcIiwgdmFsdWU6IFwidmFyaWFudFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9icmFuZFwiLCB2YWx1ZTogXCJuYW1lIG9mIGl0ZW0gYnJhbmRcIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxuICAgICAgICAgICAgICB7a2V5OiBcInByaWNlXCIsIHZhbHVlOiAxLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLkRPVUJMRX0sXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9saXN0XCIsIHZhbHVlOiBcIm5hbWUgb2YgbGlzdFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXG4gICAgICAgICAgICAgIHtrZXk6IFwiaW5kZXhcIiwgdmFsdWU6IDIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuSU5UfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfV1cbiAgICB9KTtcblxuICB9XG59XG4iXX0=