import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import * as firebase from "nativescript-plugin-firebase";
import { isIOS } from "tns-core-modules/platform";

@Component({
  moduleId: module.id,
  selector: 'Admob',
  templateUrl: './admob.component.html',
  styleUrls: ['./admob.component.scss']
})
export class AdmobComponent implements OnInit {
  private androidBannerId: string = "ca-app-pub-5445779750154576/7005154644";
  private androidInterstitialId: string = "ca-app-pub-5445779750154576/2145420061";
  private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
  private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";
  constructor(
    private page: Page
  ) { 
  }

  ngOnInit() { 

    this.page.actionBarHidden = true;
  }

  public createBanner() {
    firebase.admob.showBanner({
      size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
      margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
        bottom: 10,
        top: 300
      },
      androidBannerId: this.androidBannerId,
      iosBannerId: "ca-app-pub-9517346003011652/3985369721",
      testing: false, // when not running in production set this to true, Google doesn't like it any other way
      iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
          "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
          "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
      ],
      keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
    }).then(
        function () {
          console.log("AdMob banner showing");
        },
        function (errorMessage) {
          alert({
            title: "AdMob error",
            message: errorMessage,
            okButtonText: "Hmmkay"
          });
        }
    );
  }

  public hideBanner() {
    firebase.admob.hideBanner().then(function() {
        console.log("admob hideBanner done");
    }, function(error) {
        console.log("admob hideBanner error: " + error);
    });
  }

  public createInterstitial() {
    firebase.admob.showInterstitial({
      iosInterstitialId: "ca-app-pub-9517346003011652/6938836122",
      androidInterstitialId: this.androidInterstitialId,
      testing: true,
      // Android automatically adds the connected device as test device with testing:true, iOS does not
      iosTestDeviceIds: [
        "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
        "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
      ],
      onAdClosed: () => console.log("Interstitial closed")
    }).then(
        () => {
          console.log("AdMob interstitial showing");
        },
        errorMessage => {
          alert({
            title: "AdMob error",
            message: errorMessage,
            okButtonText: "Hmmkay"
          });
        }
    );
  }
}
