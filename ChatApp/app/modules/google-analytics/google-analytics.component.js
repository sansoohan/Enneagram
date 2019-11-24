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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWFuYWx5dGljcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnb29nbGUtYW5hbHl0aWNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1REFBMEQ7QUFDMUQsNkVBQTRFO0FBTzVFO0lBRUU7SUFFQSxDQUFDO0lBRUQsMkNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQ0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDMUIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLEdBQUcsRUFBRSxTQUFTO29CQUNkLEtBQUssRUFBRSxPQUFPO2lCQUNmO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsS0FBSztpQkFDYjthQUFDO1NBQ0wsQ0FBQyxDQUFDLElBQUksQ0FDSDtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFTSw2Q0FBVSxHQUFqQjtRQUNFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzFCLG9IQUFvSDtZQUNwSCxHQUFHLEVBQUUsYUFBYTtZQUNsQixVQUFVLEVBQUUsQ0FBQztvQkFDWCxHQUFHLEVBQUUsU0FBUztvQkFDZCxLQUFLLEVBQUUsT0FBTztpQkFDZjtnQkFDQztvQkFDRSxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFLE1BQU07aUJBQ2QsQ0FBQztTQUNMLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLFlBQVksRUFBRSxZQUFZO2FBQzNCLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFBLFlBQVk7WUFDYixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxTQUFTO2FBQ3hCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDSixDQUFDO1FBRUY7OztXQUdHO1FBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7WUFDakMsR0FBRyxFQUFFLGdCQUFnQjtZQUNyQixVQUFVLEVBQUUsQ0FBQztvQkFDWCxHQUFHLEVBQUUsT0FBTztvQkFDWixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUU7d0JBQ0w7NEJBQ0UsVUFBVSxFQUFFO2dDQUNWLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ2hGLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ3BGLEVBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ3BGLEVBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ2xGLEVBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDM0YsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDbkUsRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDcEYsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLEdBQUcsRUFBQzs2QkFDakU7eUJBQ0Y7d0JBQ0Q7NEJBQ0UsVUFBVSxFQUFFO2dDQUNWLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ2hGLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ3BGLEVBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ3BGLEVBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSwyREFBNEIsQ0FBQyxNQUFNLEVBQUM7Z0NBQ2xGLEVBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDM0YsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDbkUsRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLE1BQU0sRUFBQztnQ0FDcEYsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJEQUE0QixDQUFDLEdBQUcsRUFBQzs2QkFDakU7eUJBQ0Y7cUJBQ0Y7aUJBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztJQUVMLENBQUM7SUEvRlUsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ2pELENBQUM7O09BQ1csd0JBQXdCLENBZ0dwQztJQUFELCtCQUFDO0NBQUEsQUFoR0QsSUFnR0M7QUFoR1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnR29vZ2xlQW5hbHl0aWNzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ29vZ2xlLWFuYWx5dGljcy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ29vZ2xlLWFuYWx5dGljcy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBidXR0b24xVGFwKCl7XHJcbiAgICBmaXJlYmFzZS5hbmFseXRpY3MubG9nRXZlbnQoe1xyXG4gICAgICBrZXk6IFwiQnV0dG9uMUNsaWNrXCIsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFsgLy8gb3B0aW9uYWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBrZXk6IFwiaXRlbV9pZFwiLFxyXG4gICAgICAgICAgdmFsdWU6IFwicDc2NTRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5OiBcIml0ZW1fbmFtZVwiLFxyXG4gICAgICAgICAgdmFsdWU6IFwiYWJjXCJcclxuICAgICAgICB9XVxyXG4gICAgfSkudGhlbihcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIEFuYWx5dGljcyBldmVudCBsb2dnZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBidXR0b24yVGFwKCk6IHZvaWQge1xyXG4gICAgZmlyZWJhc2UuYW5hbHl0aWNzLmxvZ0V2ZW50KHtcclxuICAgICAgLy8gc2VlIGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9hbmRyb2lkL2NvbS9nb29nbGUvZmlyZWJhc2UvYW5hbHl0aWNzL0ZpcmViYXNlQW5hbHl0aWNzLkV2ZW50Lmh0bWxcclxuICAgICAga2V5OiBcImFkZF90b19jYXJ0XCIsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFt7IC8vIG9wdGlvbmFsXHJcbiAgICAgICAga2V5OiBcIml0ZW1faWRcIixcclxuICAgICAgICB2YWx1ZTogXCJwNzY1NVwiXHJcbiAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAga2V5OiBcIml0ZW1fbmFtZVwiLFxyXG4gICAgICAgICAgdmFsdWU6IFwiYWJjZFwiXHJcbiAgICAgICAgfV1cclxuICAgIH0pLnRoZW4oXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJBbmFseXRpY3MgZXZlbnQgbG9nZ2VkXCIpO1xyXG4gICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBbmFseXRpY3MgZXZlbnQgcHVzaGVkXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJBd2Vzb21lIDopXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICBhbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkFuYWx5dGljcyBlcnJvclwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJFaGgsIE9LXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYW1lIHRoaW5nIGFzIGxvZ0V2ZW50IGJ1dCBjYW4gYWRkIGFuIGFycmF5IG9yIHNwZWNpZmljIHR5cGVzIG5vdCBqdXN0IHN0cmluZyAoTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5CT09MRUFOLCBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklORyxcclxuICAgICAqIExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuRE9VQkxFLCBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLkZMT0FULCBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLklOVCwgTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5BUlJBWSlcclxuICAgICAqL1xyXG4gICAgZmlyZWJhc2UuYW5hbHl0aWNzLmxvZ0NvbXBsZXhFdmVudCh7XHJcbiAgICAgIGtleTogXCJ2aWV3X2l0ZW1fbGlzdFwiLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbe1xyXG4gICAgICAgIGtleTogXCJpdGVtMVwiLFxyXG4gICAgICAgIHR5cGU6IFwiYXJyYXlcIixcclxuICAgICAgICB2YWx1ZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2lkXCIsIHZhbHVlOiBcImlkIG9mIGl0ZW1cIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxyXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9uYW1lXCIsIHZhbHVlOiBcIm5hbWUgb2YgaXRlbVwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXHJcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2NhdGVnb3J5XCIsIHZhbHVlOiBcImNhdGVnb3J5XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcclxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fdmFyaWFudFwiLCB2YWx1ZTogXCJ2YXJpYW50XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcclxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fYnJhbmRcIiwgdmFsdWU6IFwibmFtZSBvZiBpdGVtIGJyYW5kXCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcclxuICAgICAgICAgICAgICB7a2V5OiBcInByaWNlXCIsIHZhbHVlOiAxLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLkRPVUJMRX0sXHJcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2xpc3RcIiwgdmFsdWU6IFwibmFtZSBvZiBsaXN0XCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcclxuICAgICAgICAgICAgICB7a2V5OiBcImluZGV4XCIsIHZhbHVlOiAxLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLklOVH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9pZFwiLCB2YWx1ZTogXCJpZCBvZiBpdGVtXCIsIHR5cGU6IExvZ0NvbXBsZXhFdmVudFR5cGVQYXJhbWV0ZXIuU1RSSU5HfSxcclxuICAgICAgICAgICAgICB7a2V5OiBcIml0ZW1fbmFtZVwiLCB2YWx1ZTogXCJuYW1lIG9mIGl0ZW1cIiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5TVFJJTkd9LFxyXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9jYXRlZ29yeVwiLCB2YWx1ZTogXCJjYXRlZ29yeVwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXHJcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX3ZhcmlhbnRcIiwgdmFsdWU6IFwidmFyaWFudFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXHJcbiAgICAgICAgICAgICAge2tleTogXCJpdGVtX2JyYW5kXCIsIHZhbHVlOiBcIm5hbWUgb2YgaXRlbSBicmFuZFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXHJcbiAgICAgICAgICAgICAge2tleTogXCJwcmljZVwiLCB2YWx1ZTogMSwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5ET1VCTEV9LFxyXG4gICAgICAgICAgICAgIHtrZXk6IFwiaXRlbV9saXN0XCIsIHZhbHVlOiBcIm5hbWUgb2YgbGlzdFwiLCB0eXBlOiBMb2dDb21wbGV4RXZlbnRUeXBlUGFyYW1ldGVyLlNUUklOR30sXHJcbiAgICAgICAgICAgICAge2tleTogXCJpbmRleFwiLCB2YWx1ZTogMiwgdHlwZTogTG9nQ29tcGxleEV2ZW50VHlwZVBhcmFtZXRlci5JTlR9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1dXHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==