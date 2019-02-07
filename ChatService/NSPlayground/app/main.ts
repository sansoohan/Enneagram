// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { enableProdMode } from '@angular/core';
import { Message } from "nativescript-plugin-firebase";

import { AppModule } from "./app.module";
import firebase = require("nativescript-plugin-firebase");
enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
firebase.init({
    onPushTokenReceivedCallback: function(token) {
        console.log("Firebase push token: " + token);
    },
    onMessageReceivedCallback: (message: Message) => {
        console.log(`Title: ${message.title}`);
        console.log(`Body: ${message.body}`);
        // if your server passed a custom property called 'foo', then do this:
        console.log(`Value of 'foo': ${message.data.foo}`);
    },
    //persist should be set to false as otherwise numbers aren't returned during livesync
    persist: true,
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
        // console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
        //   console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        }
    },
    onDynamicLinkCallback: function (result) {
        console.log("Dynamic Link: " + result.url);
    },
    //storageBucket: 'gs://yowwlr.appspot.com',
}).then(
    function (instance) {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
);