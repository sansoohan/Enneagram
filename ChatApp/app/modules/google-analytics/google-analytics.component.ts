import { Component, OnInit } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");
import { LogComplexEventTypeParameter } from "nativescript-plugin-firebase";
@Component({
  moduleId: module.id,
  selector: 'GoogleAnalytics',
  templateUrl: './google-analytics.component.html',
  styleUrls: ['./google-analytics.component.scss']
})
export class GoogleAnalyticsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

  button1Tap(){
    firebase.analytics.logEvent({
      key: "Button1Click",
      parameters: [ // optional
        {
          key: "item_id",
          value: "p7654"
        },
        {
          key: "item_name",
          value: "abc"
        }]
    }).then(
        function () {
          console.log("Firebase Analytics event logged");
        }
    );
  }

  public button2Tap(): void {
    firebase.analytics.logEvent({
      // see https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event.html
      key: "add_to_cart",
      parameters: [{ // optional
        key: "item_id",
        value: "p7655"
      },
        {
          key: "item_name",
          value: "abcd"
        }]
    }).then(
        () => {
          console.log("Analytics event logged");
          alert({
            title: "Analytics event pushed",
            okButtonText: "Awesome :)"
          });
        }, errorMessage => {
          alert({
            title: "Analytics error",
            message: errorMessage,
            okButtonText: "Ehh, OK"
          });
        }
    );

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
              {key: "item_id", value: "id of item", type: LogComplexEventTypeParameter.STRING},
              {key: "item_name", value: "name of item", type: LogComplexEventTypeParameter.STRING},
              {key: "item_category", value: "category", type: LogComplexEventTypeParameter.STRING},
              {key: "item_variant", value: "variant", type: LogComplexEventTypeParameter.STRING},
              {key: "item_brand", value: "name of item brand", type: LogComplexEventTypeParameter.STRING},
              {key: "price", value: 1, type: LogComplexEventTypeParameter.DOUBLE},
              {key: "item_list", value: "name of list", type: LogComplexEventTypeParameter.STRING},
              {key: "index", value: 1, type: LogComplexEventTypeParameter.INT}
            ]
          },
          {
            parameters: [
              {key: "item_id", value: "id of item", type: LogComplexEventTypeParameter.STRING},
              {key: "item_name", value: "name of item", type: LogComplexEventTypeParameter.STRING},
              {key: "item_category", value: "category", type: LogComplexEventTypeParameter.STRING},
              {key: "item_variant", value: "variant", type: LogComplexEventTypeParameter.STRING},
              {key: "item_brand", value: "name of item brand", type: LogComplexEventTypeParameter.STRING},
              {key: "price", value: 1, type: LogComplexEventTypeParameter.DOUBLE},
              {key: "item_list", value: "name of list", type: LogComplexEventTypeParameter.STRING},
              {key: "index", value: 2, type: LogComplexEventTypeParameter.INT}
            ]
          }
        ]
      }]
    });

  }
}
