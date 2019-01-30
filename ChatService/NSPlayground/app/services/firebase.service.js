"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var firebaseWeb = require("nativescript-plugin-firebase/app");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var application_1 = require("tns-core-modules/application");
var ApplicationSettings = require("application-settings");
var imagePicker = require("nativescript-imagepicker");
var fs = require("tns-core-modules/file-system");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.thisUser = {};
        this.thisUserName = "";
        this.thisUSerEmail = "";
        this.friends = {};
        this.rooms = {};
        this.messageUpdatedToggle = false;
        this.currentProfileImageFileURL = "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fuser-avatar-main-picture.png?alt=media&token=b749d53c-a1e5-446f-9afa-e8f7ee528333";
        this.currentBackgroundImageFileURL = "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fmountain-range-on-black-background.png?alt=media&token=26ce5feb-098d-4500-914a-d73880352539";
        this.postSearchResultArray = [];
        this.androidBannerId = "	ca-app-pub-3940256099942544/2934735716";
        this.androidBannerTestId = "ca-app-pub-3940256099942544/6300978111";
        this.androidInterstitialId = "ca-app-pub-5445779750154576/2145420061";
        this.androidInterstitialTestId = "ca-app-pub-3940256099942544/6300978111";
        this.iosBannerId = "ca-app-pub-RRRR/TTTT";
        this.iosInterstitialId = "ca-app-pub-GGGG/HHHH";
    }
    FirebaseService.prototype.createBanner = function () {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER,
            margins: {
                bottom: 0,
            },
            androidBannerId: this.androidBannerTestId,
            iosBannerId: "ca-app-pub-9517346003011652/3985369721",
            testing: false,
            iosTestDeviceIds: [
                "45d77bf513dfabc2949ba053da83c0c7b7e87715",
                "fee4cf319a242eab4701543e4c16db89c722731f" // Eddy's iPad Pro
            ],
            keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
        }).then(function () {
            console.log("AdMob banner showing");
        }, function (errorMessage) {
            alert({
                title: "AdMob error",
                message: errorMessage,
                okButtonText: "Hmmkay"
            });
        });
    };
    FirebaseService.prototype.hideBanner = function () {
        firebase.admob.hideBanner().then(function () {
            console.log("admob hideBanner done");
        }, function (error) {
            console.log("admob hideBanner error: " + error);
        });
    };
    //------------------------ Analyzing User Section ------------------
    FirebaseService.prototype.analyticsCount = function (activityName) {
        firebase.analytics.logEvent({
            key: activityName
        }).then(function () {
            // console.log("Firebase Analytics event logged");
        });
    };
    //---------------------------- Updating Profile Section -----------------------------------
    FirebaseService.prototype.setThisUserProfile = function (data) {
        firebase.setValue('/users/' + this.authuser.uid + '/profile', data).then(function (result) {
            console.log(JSON.stringify(result));
        });
    };
    //---------------------------- New Posting Section ------------------------------------------
    FirebaseService.prototype.searchPost = function (type, otheruserEnneagramNum, originLatitude, originLongitude, distanceMeter) {
        var _this = this;
        var ONE_DEGREE_EARTH_PER_METER = 111000;
        var maxLatitudeDegree = originLatitude + distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER);
        var minLatitudeDegree = originLatitude - distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER);
        if (maxLatitudeDegree >= 90) {
            maxLatitudeDegree = 90;
        }
        if (minLatitudeDegree <= -90) {
            minLatitudeDegree = -90;
        }
        var maxLongitudeDegree = originLongitude + distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(originLatitude * (180 / Math.PI)));
        var minLongitudeDegree = originLongitude - distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(originLatitude * (180 / Math.PI)));
        if (maxLongitudeDegree - minLongitudeDegree >= 360) {
            maxLongitudeDegree = 180;
            minLongitudeDegree = -180;
        }
        else {
            if (maxLongitudeDegree >= 180) {
                maxLongitudeDegree = maxLongitudeDegree - 360;
            }
            if (minLongitudeDegree <= -180) {
                minLongitudeDegree = minLongitudeDegree - 360;
            }
        }
        if (minLongitudeDegree > maxLongitudeDegree) {
            var temp = minLongitudeDegree;
            minLongitudeDegree = maxLongitudeDegree;
            maxLongitudeDegree = temp;
        }
        // console.log("min_lat",minLatitudeDegree);
        // console.log("ori_lat",originLatitude);        
        // console.log("max_lat",maxLatitudeDegree);
        // console.log("min_lon",minLongitudeDegree);
        // console.log("ori_lon",originLongitude);
        // console.log("max_lon",maxLongitudeDegree);
        firebaseWeb.firestore()
            .collection("posts")
            .where("number", "==", otheruserEnneagramNum)
            .where("type", "==", type)
            .where("longitude", "<=", maxLongitudeDegree)
            .where("longitude", ">=", minLongitudeDegree)
            .get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().latitude <= maxLatitudeDegree && doc.data().latitude >= minLatitudeDegree) {
                    // console.log(`searched doc : ${doc.id} => ${JSON.stringify(doc.data())}`);
                    var searchResult = {};
                    searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                    for (var id in searchResult) {
                        searchResult[id]['like_count'] = 0;
                        // console.log(id);
                        for (var userId in searchResult[id]['likes']) {
                            searchResult[id]['like_count']++;
                            // console.log(userId);
                            if (_this.authuser.uid === userId) {
                                searchResult[id]['is_like'] = true;
                                console.log(userId + " Ok");
                            }
                            else {
                                searchResult[id]['is_like'] = false;
                            }
                        }
                    }
                    for (var id in searchResult) {
                        for (var userId in searchResult[id]['favorites']) {
                            if (_this.authuser.uid === userId) {
                                searchResult[id]['is_favorite'] = true;
                            }
                            else {
                                searchResult[id]['is_favorite'] = false;
                            }
                        }
                    }
                    for (var id in searchResult) {
                        searchResult[id]['comment_count'] = 0;
                        searchResult[id]['is_comment'] = false;
                        if (searchResult[id]['comments'] === null || searchResult[id]['comments'] === "") {
                            searchResult[id]['comments'] = new Array();
                        }
                        else {
                            // for(var i=0; i<searchResult[id]['comments'].length; i++){
                            //     searchResult[id]['comment_count']++;
                            // }
                        }
                    }
                    _this.postSearchResultArray.push(searchResult);
                }
            });
        });
    };
    FirebaseService.prototype.searchQueries = function (type, otheruserEnneagramNums, originLatitude, originLongitude, distanceMeter) {
        this.postSearchResultArray = [];
        for (var i = 0; i < otheruserEnneagramNums.length; i++) {
            // console.log("type"+otheruserEnneagramNums[i]);
            this.searchPost(type, otheruserEnneagramNums[i], originLatitude, originLongitude, distanceMeter);
        }
    };
    FirebaseService.prototype.getUserPosts = function (userID) {
        var _this = this;
        this.postSearchResultArray = [];
        firebaseWeb.firestore()
            .collection("posts")
            .where("roles." + userID, "==", "owner")
            .get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var searchResult = {};
                searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                _this.postSearchResultArray.push(searchResult);
                // console.log(this.postSearchResultArray);
            });
        });
    };
    FirebaseService.prototype.addPost = function (postData) {
        firebaseWeb.firestore()
            .collection("posts")
            .add(postData).then(function (documentRef) {
            // console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.addComment = function (postID, commentData) {
        var posts = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments")
            .add(commentData).then(function (documentRef) {
            // console.log(`auto-generated comment ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.addFavorite = function (postID, commentData) {
        var posts = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("favorites")
            .add(commentData).then(function (documentRef) {
            // console.log(`auto-generated comment ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.addLike = function (postID, commentData) {
        var posts = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .update({
            likes: commentData
        });
    };
    // delete_data_from_document(){
    //     firebaseWeb.firestore().collection("cities").doc("LA")
    //         .update({
    //           capital: firebaseWeb.firestore().FieldValue().delete(),
    //         });
    // }
    // === Partial Add (This will be used as uploading comment) ===
    // arrayUnion(){
    //     const firebaseWeb = require("nativescript-plugin-firebase/app");
    //     firebaseWeb.firestore()
    //     .collection("posts")
    //     .doc("lopkDLG6T7jpTuY5oO6x")
    //     .update({
    //         behavior: firebaseWeb.firestore.FieldValue().arrayUnion([{"red": "blue"}])
    //     });
    // }
    FirebaseService.prototype.updateComment = function (postID, commentID, commentData) {
        firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments").doc(commentID)
            .update(commentData).then(function () {
            // console.log("comment updated");
        });
    };
    FirebaseService.prototype.getSelectedPost = function () {
        for (var i = 0; i < this.postSearchResultArray.length; i++) {
            for (var postID in this.postSearchResultArray[i]) {
                if (this.selectedPostID === postID) {
                    return this.postSearchResultArray[i];
                }
            }
        }
    };
    // ---------------------- Firestore queries for Posting (not used yet) ------------------------------------
    // === Rewrite (This will be used as updating post)===
    // update_data(){
    //     const firebaseWeb = require("nativescript-plugin-firebase/app");
    //     firebaseWeb.firestore()
    //     .collection("cities")
    //     .doc("SF")
    //     .update({
    //         population: 860001,
    //         updateTimestamp: firebaseWeb.firestore().FieldValue().serverTimestamp(),
    //         location: firebaseWeb.firestore().GeoPoint(4.34, 5.67)
    //     }).then(() => {
    //         console.log("SF population updated");
    //     });
    // }
    // === Delete All (This will be used as deleting post) ===
    // delete_document_from_collection(){
    //     const sanFranciscoDocument = firebaseWeb.firestore().collection("cities").doc("SF");        
    //     sanFranciscoDocument.delete().then(() => {
    //       console.log("SF was erased from the face of the earth!");
    //     });
    // }
    // === Partial Remove (This will be used as deleting comment) ===
    // delete_data_from_document(){
    //     firebaseWeb.firestore().collection("cities").doc("LA")
    //         .update({
    //           capital: firebaseWeb.firestore().FieldValue().delete(),
    //         });
    // }
    // === Partial Add (This will be used as uploading comment) ===
    // arrayUnion(){
    //     const firebaseWeb = require("nativescript-plugin-firebase/app");
    //     firebaseWeb.firestore()
    //     .collection("posts")
    //     .doc("lopkDLG6T7jpTuY5oO6x")
    //     .update({
    //         behavior: firebaseWeb.firestore.FieldValue().arrayUnion([{"red": "blue"}])
    //     });
    // }
    //---------------------------- Picture Upload Section ------------------------------------------
    // 1. when user select picture, the picture uploaded into storage.
    FirebaseService.prototype.pickImage = function (imageType) {
        var _this = this;
        var context = imagePicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () { return context.present(); })
            .then(function (selection) { return selection.forEach(function (selectedAsset) {
            _this.getImageFilePath(selectedAsset, imageType).then(function (filePath) {
                if (imageType === "blog") {
                    _this.currentBlogImageFilePath = filePath;
                }
                if (imageType === "profile") {
                    _this.currentProfileImageFilePath = filePath;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageFilePath = filePath;
                }
                _this.uploadFile(imageType, filePath);
            });
        }); }).catch(function (errorMessage) { return console.log(errorMessage); });
    };
    FirebaseService.prototype.getImageFilePath = function (imageAsset, imageType) {
        var _this = this;
        return new Promise(function (resolve) {
            // if (ios) { // create file from image asset and return its path
            // 	const tempFolderPath = knownFolders.temp().getFolder("nsimagepicker").path;
            // 	const tempFilePath = path.join(tempFolderPath, `${Date.now()}.jpg`);
            // 	const options = PHImageRequestOptions.new();
            // 	options.synchronous = true;
            // 	options.version = PHImageRequestOptionsVersion.Current;
            // 	options.deliveryMode = PHImageRequestOptionsDeliveryMode.HighQualityFormat;
            // 	options.networkAccessAllowed = false;
            // 	PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(imageAsset.ios, options, (nsData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
            // 		if (info.valueForKey(PHImageResultIsInCloudKey)) {
            // 			// Image is in iCloud
            // 			if (nsData) {
            // 				// Image is downloaded
            // 			} else {
            // 				// Image is NOT downloaded
            // 			}
            // 		}
            // 		nsData.writeToFileAtomically(tempFilePath, true);
            // 		this.currentImageFilePath = tempFilePath;
            // 		resolve(tempFilePath);
            // 	});
            // }
            if (application_1.android) { // return imageAsset.android, since it's the path of the file
                if (imageType === "blog") {
                    _this.currentBlogImageFilePath = imageAsset.android;
                }
                if (imageType === "profile") {
                    _this.currentProfileImageFilePath = imageAsset.android;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageFilePath = imageAsset.android;
                }
                resolve(imageAsset.android);
            }
            // resolve(null);
        });
    };
    FirebaseService.prototype.uploadFile = function (fileType, filePath) {
        var _this = this;
        var fileClass;
        var filePathSplited = filePath.split('/');
        var fileName = filePathSplited[filePathSplited.length - 1];
        if (fileType === "blog") {
            fileClass = "/blog/";
        }
        else if (fileType === "profile") {
            fileClass = "/profile/";
        }
        else if (fileType === "background") {
            fileClass = "/background/";
        }
        firebase.storage.uploadFile({
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'users/' + this.authuser.uid + fileClass + fileName,
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(filePath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: filePath,
            // get notified of file upload progress
            onProgress: function (status) {
                // console.log("Uploaded fraction: " + status.fractionCompleted);
                // console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(function (uploadedFile) {
            // console.log("File uploaded: " + JSON.stringify(uploadedFile));
            _this.getFileURL(fileType, _this.authuser.uid, uploadedFile.name);
        }, function (error) {
            console.log("File upload error: " + error);
        });
    };
    // 2. get the picture URL for uploading the blog.
    FirebaseService.prototype.getFileURL = function (imageType, uid, fileName) {
        var _this = this;
        var fileURL;
        if (imageType === "blog") {
            fileURL = "/blog/" + fileName;
        }
        else if (imageType === "profile") {
            fileURL = "/profile/" + fileName;
        }
        else if (imageType === "background") {
            fileURL = "/profile/" + fileName;
        }
        firebase.storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            // bucket: 'gs://chat-demo-5d3a7.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'users/' + uid + fileURL,
        }).then(function (url) {
            // console.log("Remote URL: " + url);
            if (imageType === "blog") {
                _this.currentBlogImageFileURL = url;
            }
            else if (imageType === "profile") {
                _this.currentProfileImageFileURL = url;
            }
            else if (imageType === "background") {
                _this.currentBackgroundImageFileURL = url;
            }
        }, function (error) {
            console.log("Error: " + error);
        });
    };
    //---------------------------- Chatting Section ------------------------------------------
    // Listen Chat Rooms from Chat Database.
    FirebaseService.prototype.syncThisUserRoomList = function () {
        var _this = this;
        firebase.addChildEventListener(function (result) {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoom(result.key);
        }, "/users/" + this.authuser.uid + "/user_rooms").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (updatedRoomID) {
        var _this = this;
        firebase.getValue('/rooms/' + updatedRoomID).then(function (result) {
            // console.log(JSON.stringify(result));
            _this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            _this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    // Listen Chat Messages from Chat Database.
    FirebaseService.prototype.syncRoomMessages = function (roomID) {
        var _this = this;
        firebase.addChildEventListener(function (result) {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoomMessages(roomID, result.key, result.value);
        }, "/rooms/" + roomID + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoomMessages = function (roomID, messageID, message) {
        if (!this.rooms[roomID]['messages']) {
            this.rooms[roomID]['messages'] = {};
        }
        this.rooms[roomID]['messages'][messageID] = JSON.parse(JSON.stringify(message));
        var messageToAdd = {};
        messageToAdd[messageID] = this.rooms[roomID]['messages'][messageID];
        if (roomID == this.selectedRoomID) {
            this.selectedRoomMessageArray.push(messageToAdd);
            this.sortMessageArrayWithTimeStamp(this.selectedRoomMessageArray);
            this.messageUpdatedToggle = true;
            // console.log(this.selectedRoomMessageArray.length);
        }
        // console.log(this.rooms);
    };
    FirebaseService.prototype.sortMessageArrayWithTimeStamp = function (messageArray) {
        if (messageArray == null) {
            return null;
        }
        messageArray.sort(function (a, b) {
            var messageA;
            var messageB;
            for (var key in a) {
                messageA = a[key];
            }
            for (var key in b) {
                Date;
                messageB = b[key];
            }
            var time_b = messageB['timestamp']['time'];
            var time_a = messageA['timestamp']['time'];
            return time_a - time_b;
        });
    };
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    FirebaseService.prototype.pushFriendOnRoom = function (user, roomID) {
        for (var uid in user) {
            firebase.setValue('/rooms/' + roomID + "/room_users/" + uid, user[uid]).then(function (result2) {
                // this.pushRoomIDOnUser(user, roomID);
            });
        }
    };
    // Generate New Room on Chat Database.
    FirebaseService.prototype.generateRoomWithSelectedFriends = function (user, friend) {
        var _this = this;
        var friendID;
        for (var id in friend) {
            friendID = id;
        }
        var userID;
        for (var id in user) {
            userID = id;
        }
        // check room exist before generate.
        firebase.query(function (result) {
            // if friend chat room is not exist, create new room.
            if (result.value == null) {
                // console.log("no room with friendID: " + friendID);
                var openRoom = { roomUsers: {} };
                openRoom['isOpen'] = true;
                openRoom['openTime'] = new Date();
                openRoom['closeTime'] = "";
                for (var uid in user) {
                    firebase.push('/rooms/', openRoom).then(function (result2) {
                        _this.pushRoomIDOnUser(user, friend, result2.key);
                        _this.pushRoomIDOnUser(friend, user, result2.key);
                        _this.setGeneratedRoomID(result2.key);
                        // console.log("created key: " + result2.key);// Room ID
                    });
                }
            }
            // if friend chat room is exist, don't make new one.
            else {
                // console.log(result);
                for (var roomID in result['value']) {
                    _this.selectedRoomMessageArray = _this.jsonToArray(_this.rooms[roomID]['messages']);
                }
                // console.log("exist room: " + JSON.parse(JSON.stringify(result['value'])));// Room ID
            }
        }, '/users/' + userID + '/user_rooms', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.VALUE,
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: friendID
            },
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 2
            }
        })
            .then(function (result) {
        })
            .catch(function (error) { return console.log("Error: " + error); });
    };
    //Set User Access for Chat Room on Chat Database.
    FirebaseService.prototype.pushRoomIDOnUser = function (user, friend, roomID) {
        var _this = this;
        var userRoom = {};
        userRoom['inRoom'] = true;
        userRoom['joinTime'] = Date.now();
        userRoom['leaveTime'] = "";
        for (var friendID in friend) {
            for (var uid in user) {
                userRoom['roomIcon'] = friend[friendID]["profile"]["profilePicsrc"];
                userRoom['title'] = friend[friendID]["profile"]["name"];
                userRoom['messageIcon'] = user[uid]["profile"]["profilePicsrc"];
                userRoom['userName'] = user[uid]["profile"]["name"];
                // set room access athentication on user database
                firebase.setValue('/users/' + uid + '/user_rooms/' + roomID, friendID).then(function (result) {
                    // user can write on chat room
                    firebase.setValue('/rooms/' + roomID + 'U/' + uid, userRoom).then(function (result2) {
                        // console.log(result);
                        _this.syncRoomMessages(roomID);
                    });
                });
            }
        }
    };
    // Add Message on Chat Database.(Other users are listening Chat Database)
    FirebaseService.prototype.pushMessageOnRoom = function (roomID, user, message) {
        var messagePack = {};
        for (var uid in user) {
            messagePack['user'] = uid;
        }
        messagePack['message'] = message;
        messagePack['timestamp'] = new Date();
        firebase.push('/rooms/' + roomID + '/messages', messagePack).then(function (result) {
            // console.log("created key: " + result.key);// Message_pack ID
        });
    };
    // Select Friend for a Modal or Chat Room.
    FirebaseService.prototype.setSelectedFriendID = function (selectedFriendID) {
        this.selectedFriendID = selectedFriendID;
    };
    FirebaseService.prototype.getSelectedFriendID = function () {
        return this.selectedFriendID;
    };
    //---------------------------- Auth Section ------------------------------------------
    FirebaseService.prototype.register = function (email, passwd) {
        return firebase.createUser({
            email: email,
            password: passwd
        }).then(function (result) {
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.loginByEmail = function (user) {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then(function (result) {
            _this.setCurrentUser();
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.loginByFacebook = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            // Optional
            facebookOptions: {
                // defaults to ['public_profile', 'email']
                scope: ['public_profile', 'email']
            }
        }).then(function (result) {
            _this.setCurrentUser();
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.loginByGoogle = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.GOOGLE,
            // Optional 
            googleOptions: {
                hostedDomain: "chat-demo-5d3a7.firebaseapp.com"
            }
        }).then(function (result) {
            _this.setCurrentUser();
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.setCurrentUser = function () {
        var _this = this;
        firebase.getCurrentUser().then(function (user) {
            _this.authuser = user;
            _this.checkFirstUser();
        });
    };
    // if thisuser is first user, make a firstuser data in firebase
    FirebaseService.prototype.checkFirstUser = function () {
        var _this = this;
        firebase.getValue('/users/' + this.authuser.uid).then(function (result) {
            // console.log(JSON.stringify(result));
            var newUserData = {
                "enneagram": {
                    "behavior": "",
                    "emotion": "",
                    "number": 0,
                    "state": "",
                    "thought": ""
                },
                "friends": {},
                "profile": {
                    "backgroundPicsrc": "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fmountain-range-on-black-background.png?alt=media&token=26ce5feb-098d-4500-914a-d73880352539",
                    "country": "Korea",
                    "email": _this.authuser.email,
                    "gender": "",
                    "interest": "",
                    "introducing": "",
                    "language": "",
                    "name": _this.authuser.email,
                    "profilePicsrc": "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fuser-avatar-main-picture.png?alt=media&token=b749d53c-a1e5-446f-9afa-e8f7ee528333"
                },
                "user_rooms": {}
            };
            if (result.value == null) {
                firebase.setValue('/users/' + _this.authuser.uid, newUserData).then(function (result) {
                    // console.log("first user ok");
                    // console.log(JSON.stringify(result));
                    ApplicationSettings.setBoolean("authenticated", true);
                    _this.routerExtensions.navigate(["/home"], { clearHistory: true });
                });
            }
            else {
                // console.log("user ok");
                _this.setAuthUser();
                ApplicationSettings.setBoolean("authenticated", true);
                _this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    //---------------------------- Init Section ------------------------------------------
    FirebaseService.prototype.setAuthUser = function () {
        var _this = this;
        // set thisUser
        firebase.getValue('/users/' + this.authuser.uid).then(function (result) {
            _this.setThisUser(result);
        }).catch(function (error) { return console.log("Error: " + error); });
        // set friends
        firebase.getValue('/users/' + this.authuser.uid + '/friends').then(function (result) {
            var resultKeys = [];
            for (var k in result.value) {
                resultKeys.push(k);
            }
            _this.setFriends(resultKeys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
        // set rooms
        firebase.getValue('/users/' + this.authuser.uid + '/user_rooms').then(function (result) {
            var resultKeys = [];
            for (var k in result.value) {
                resultKeys.push(k);
            }
            _this.setRooms(resultKeys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
        // set Advertising
        this.createBanner();
    };
    FirebaseService.prototype.setThisUser = function (result) {
        var key = JSON.parse(JSON.stringify(result.key));
        var value = JSON.parse(JSON.stringify(result.value));
        var user = {};
        user[key] = value;
        this.thisUser = user;
        this.analyzeUserLogin(this.authuser.uid);
        // console.log(this.thisUser);
    };
    FirebaseService.prototype.analyzeUserLogin = function (id) {
        firebase.analytics.setAnalyticsCollectionEnabled(true);
        firebase.analytics.setUserId({
            userId: id
        }).then(function () {
            // console.log("Analytics userId set");
        });
    };
    FirebaseService.prototype.setFriends = function (friendIDs) {
        var _this = this;
        // console.log(friendIDs);
        var count = 0;
        for (var i = 0; i < friendIDs.length; i++) {
            firebase.query(function (result) { }, '/users', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                    value: 'uid'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: friendIDs[i]
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 3000
                }
            })
                .then(function (result) {
                _this.addFriend(result.value);
                count++;
                if (count == friendIDs.length) {
                    _this.setFriendArray();
                }
            })
                .catch(function (error) { return console.log("Error: " + error); });
            ;
        }
    };
    FirebaseService.prototype.addFriend = function (friend) {
        for (var key in friend) {
            this.friends[key] = friend[key];
        }
        // console.log(this.getUsersArray(this.getFriends()));
    };
    FirebaseService.prototype.setFriendArray = function () {
        this.friendArray = this.jsonToArray(this.getFriends());
    };
    FirebaseService.prototype.setRooms = function (roomIDs) {
        var _this = this;
        // console.log(roomIDs);
        var count = 0;
        for (var i = 0; i < roomIDs.length; i++) {
            firebase.query(function (result) { }, '/rooms', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                    value: 'uid'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: roomIDs[i]
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 3000
                }
            })
                .then(function (result) {
                _this.addRoom(result.value);
                count++;
                if (count == roomIDs.length) {
                    // console.log(this.rooms);
                    _this.setRoomArray();
                    _this.syncThisUserRoomList();
                    _this.setCurrentUserPicture();
                }
            })
                .catch(function (error) { return console.log("Error: " + error); });
            ;
        }
    };
    FirebaseService.prototype.addRoom = function (room) {
        for (var key in room) {
            this.rooms[key] = room[key];
            this.syncRoomMessages(key);
        }
    };
    FirebaseService.prototype.setRoomArray = function () {
        this.roomArray = this.jsonToArray(this.getRooms());
    };
    FirebaseService.prototype.jsonToArray = function (json) {
        var array = [];
        if (json != null) {
            for (var key in json) {
                var childJson = {};
                childJson[key] = json[key];
                array.push(childJson);
            }
        }
        return array;
    };
    FirebaseService.prototype.setCurrentUserPicture = function () {
        for (var id in this.thisUser) {
            if (this.thisUser[id]['profile']['backgroundPicsrc'] !== "") {
                this.currentBackgroundImageFileURL = this.thisUser[id]['profile']['backgroundPicsrc'];
            }
            if (this.thisUser[id]['profile']['profilePicsrc'] !== "") {
                this.currentProfileImageFileURL = this.thisUser[id]['profile']['profilePicsrc'];
            }
        }
    };
    FirebaseService.prototype.setGeneratedRoomID = function (generatedRoomID) {
        this.generatedRoomID = generatedRoomID;
        this.selectedRoomID = generatedRoomID;
    };
    FirebaseService.prototype.getGeneratedRoomID = function () {
        return this.generatedRoomID;
    };
    FirebaseService.prototype.getFriends = function () {
        if (this.friends != null) {
            return this.friends;
        }
        else
            return null;
    };
    FirebaseService.prototype.getRooms = function () {
        if (this.rooms != null) {
            return this.rooms;
        }
        else
            return null;
    };
    FirebaseService.prototype.logout = function () {
        ApplicationSettings.setBoolean("authenticated", false);
        this.hideBanner();
        firebase.logout();
        this.authuser == null;
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsOERBQWlFO0FBQ2pFLHNDQUEyQztBQUMzQyxzREFBK0Q7QUFDL0QsNERBQTREO0FBSTVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUF3Q0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUF2Q3ZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFXWCx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFNdEMsK0JBQTBCLEdBQUcsa0xBQWtMLENBQUM7UUFDaE4sa0NBQTZCLEdBQUcsNExBQTRMLENBQUM7UUFLN04sMEJBQXFCLEdBQWUsRUFBRSxDQUFDO1FBR3RDLG9CQUFlLEdBQVcseUNBQXlDLENBQUM7UUFDcEUsd0JBQW1CLEdBQVcsd0NBQXdDLENBQUM7UUFDdkUsMEJBQXFCLEdBQVcsd0NBQXdDLENBQUM7UUFDekUsOEJBQXlCLEdBQVcsd0NBQXdDLENBQUM7UUFDN0UsZ0JBQVcsR0FBVyxzQkFBc0IsQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxzQkFBc0IsQ0FBQztJQU0zRCxDQUFDO0lBRU0sc0NBQVksR0FBbkI7UUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN0QixJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN6QyxPQUFPLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFFUjtZQUNELGVB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QUFDO1NBQ3JCOztZQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFyOEJRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0EwQ3FCLHlCQUFnQjtPQXpDckMsZUFBZSxDQXM4QjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXQ4QkQsSUFzOEJDO0FBdDhCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuXHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBhdXRodXNlcjogZmlyZWJhc2UuVXNlcjsgICAgXHJcbiAgICBwdWJsaWMgdGhpc1VzZXI6IGFueSA9IHt9O1xyXG4gICAgcHVibGljIHRoaXNVc2VyTmFtZSA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdGhpc1VTZXJFbWFpbCA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZHMgPSB7fTtcclxuICAgIHB1YmxpYyByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZEFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvb21BcnJheTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21UaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgbWVzc2FnZVVwZGF0ZWRUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMID0gXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRnVzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmc/YWx0PW1lZGlhJnRva2VuPWI3NDlkNTNjLWExZTUtNDQ2Zi05YWZhLWU4ZjdlZTUyODMzM1wiO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRm1vdW50YWluLXJhbmdlLW9uLWJsYWNrLWJhY2tncm91bmQucG5nP2FsdD1tZWRpYSZ0b2tlbj0yNmNlNWZlYi0wOThkLTQ1MDAtOTE0YS1kNzM4ODAzNTI1MzlcIjtcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuXHJcbiAgICB0ZXN0RGF0YTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgcG9zdFNlYXJjaFJlc3VsdEFycmF5OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQb3N0SUQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIGFuZHJvaWRCYW5uZXJJZDogc3RyaW5nID0gXCJcdGNhLWFwcC1wdWItMzk0MDI1NjA5OTk0MjU0NC8yOTM0NzM1NzE2XCI7XHJcbiAgICBwcml2YXRlIGFuZHJvaWRCYW5uZXJUZXN0SWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi0zOTQwMjU2MDk5OTQyNTQ0LzYzMDA5NzgxMTFcIjtcclxuICAgIHByaXZhdGUgYW5kcm9pZEludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItNTQ0NTc3OTc1MDE1NDU3Ni8yMTQ1NDIwMDYxXCI7XHJcbiAgICBwcml2YXRlIGFuZHJvaWRJbnRlcnN0aXRpYWxUZXN0SWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi0zOTQwMjU2MDk5OTQyNTQ0LzYzMDA5NzgxMTFcIjtcclxuICAgIHByaXZhdGUgaW9zQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1SUlJSL1RUVFRcIjtcclxuICAgIHByaXZhdGUgaW9zSW50ZXJzdGl0aWFsSWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1HR0dHL0hISEhcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQmFubmVyKCkge1xyXG4gICAgZmlyZWJhc2UuYWRtb2Iuc2hvd0Jhbm5lcih7XHJcbiAgICAgICAgc2l6ZTogZmlyZWJhc2UuYWRtb2IuQURfU0laRS5TTUFSVF9CQU5ORVIsIC8vIHNlZSBmaXJlYmFzZS5hZG1vYi5BRF9TSVpFIGZvciBhbGwgb3B0aW9uc1xyXG4gICAgICAgIG1hcmdpbnM6IHsgLy8gb3B0aW9uYWwgbnIgb2YgZGV2aWNlIGluZGVwZW5kZW50IHBpeGVscyBmcm9tIHRoZSB0b3Agb3IgYm90dG9tIChkb24ndCBzZXQgYm90aClcclxuICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgLy8gdG9wOiAzMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuZHJvaWRCYW5uZXJJZDogdGhpcy5hbmRyb2lkQmFubmVyVGVzdElkLFxyXG4gICAgICAgIGlvc0Jhbm5lcklkOiBcImNhLWFwcC1wdWItOTUxNzM0NjAwMzAxMTY1Mi8zOTg1MzY5NzIxXCIsXHJcbiAgICAgICAgdGVzdGluZzogZmFsc2UsIC8vIHdoZW4gbm90IHJ1bm5pbmcgaW4gcHJvZHVjdGlvbiBzZXQgdGhpcyB0byB0cnVlLCBHb29nbGUgZG9lc24ndCBsaWtlIGl0IGFueSBvdGhlciB3YXlcclxuICAgICAgICBpb3NUZXN0RGV2aWNlSWRzOiBbIC8vQW5kcm9pZCBhdXRvbWF0aWNhbGx5IGFkZHMgdGhlIGNvbm5lY3RlZCBkZXZpY2UgYXMgdGVzdCBkZXZpY2Ugd2l0aCB0ZXN0aW5nOnRydWUsIGlPUyBkb2VzIG5vdFxyXG4gICAgICAgICAgICBcIjQ1ZDc3YmY1MTNkZmFiYzI5NDliYTA1M2RhODNjMGM3YjdlODc3MTVcIiwgLy8gRWRkeSdzIGlQaG9uZSA2c1xyXG4gICAgICAgICAgICBcImZlZTRjZjMxOWEyNDJlYWI0NzAxNTQzZTRjMTZkYjg5YzcyMjczMWZcIiAgLy8gRWRkeSdzIGlQYWQgUHJvXHJcbiAgICAgICAgXSxcclxuICAgICAgICBrZXl3b3JkczogW1wia2V5d29yZDFcIiwgXCJrZXl3b3JkMlwiXSAvLyBhZGQga2V5d29yZHMgZm9yIGFkIHRhcmdldGluZ1xyXG4gICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZE1vYiBiYW5uZXIgc2hvd2luZ1wiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQWRNb2IgZXJyb3JcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJIbW1rYXlcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQmFubmVyKCkge1xyXG4gICAgZmlyZWJhc2UuYWRtb2IuaGlkZUJhbm5lcigpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBoaWRlQmFubmVyIGRvbmVcIik7XHJcbiAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgaGlkZUJhbm5lciBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBbmFseXppbmcgVXNlciBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgYW5hbHl0aWNzQ291bnQoYWN0aXZpdHlOYW1lOiBzdHJpbmcpOiB2b2lke1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dFdmVudCh7XHJcbiAgICAgICAgICAgIGtleTogYWN0aXZpdHlOYW1lXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaXJlYmFzZSBBbmFseXRpY3MgZXZlbnQgbG9nZ2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVXBkYXRpbmcgUHJvZmlsZSBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRUaGlzVXNlclByb2ZpbGUoZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3Byb2ZpbGUnLCBkYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBOZXcgUG9zdGluZyBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2VhcmNoUG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBvdGhlcnVzZXJFbm5lYWdyYW1OdW06bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5Mb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlTWV0ZXI6bnVtYmVyXHJcbiAgICApe1xyXG4gICAgICAgIGNvbnN0IE9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSID0gMTExMDAwO1xyXG5cclxuICAgICAgICB2YXIgbWF4TGF0aXR1ZGVEZWdyZWUgPSBvcmlnaW5MYXRpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5MYXRpdHVkZURlZ3JlZSA9IG9yaWdpbkxhdGl0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4TGF0aXR1ZGVEZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhMYXRpdHVkZURlZ3JlZSA9IDkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW5MYXRpdHVkZURlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5MYXRpdHVkZURlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heExvbmdpdHVkZURlZ3JlZSA9IG9yaWdpbkxvbmdpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luTGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICB2YXIgbWluTG9uZ2l0dWRlRGVncmVlID0gb3JpZ2luTG9uZ2l0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5MYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSAtIG1pbkxvbmdpdHVkZURlZ3JlZSA+PSAzNjApe1xyXG4gICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSA+PSAxODApe1xyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gbWF4TG9uZ2l0dWRlRGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA8PSAtMTgwKXtcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1pbkxvbmdpdHVkZURlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA+IG1heExvbmdpdHVkZURlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluTG9uZ2l0dWRlRGVncmVlO1xyXG4gICAgICAgICAgICBtaW5Mb25naXR1ZGVEZWdyZWUgPSBtYXhMb25naXR1ZGVEZWdyZWU7XHJcbiAgICAgICAgICAgIG1heExvbmdpdHVkZURlZ3JlZSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xhdFwiLG1pbkxhdGl0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sYXRcIixvcmlnaW5MYXRpdHVkZSk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sYXRcIixtYXhMYXRpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbG9uXCIsbWluTG9uZ2l0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5Mb25naXR1ZGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xvblwiLG1heExvbmdpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgb3RoZXJ1c2VyRW5uZWFncmFtTnVtKVxyXG4gICAgICAgIC53aGVyZShcInR5cGVcIiwgXCI9PVwiLCB0eXBlKVxyXG4gICAgICAgIC53aGVyZShcImxvbmdpdHVkZVwiLCBcIjw9XCIsIG1heExvbmdpdHVkZURlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5Mb25naXR1ZGVEZWdyZWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jLmRhdGEoKS5sYXRpdHVkZSA8PSBtYXhMYXRpdHVkZURlZ3JlZSAmJiBkb2MuZGF0YSgpLmxhdGl0dWRlID49IG1pbkxhdGl0dWRlRGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBzZWFyY2hSZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydsaWtlX2NvdW50J10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdXNlcklkIGluIHNlYXJjaFJlc3VsdFtpZF1bJ2xpa2VzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnbGlrZV9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfbGlrZSddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQrXCIgT2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2xpa2UnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gc2VhcmNoUmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1c2VySWQgaW4gc2VhcmNoUmVzdWx0W2lkXVsnZmF2b3JpdGVzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfZmF2b3JpdGUnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2Zhdm9yaXRlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIHNlYXJjaFJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRfY291bnQnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2NvbW1lbnQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09bnVsbCB8fCBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yKHZhciBpPTA7IGk8c2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudF9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaFF1ZXJpZXMoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgb3RoZXJ1c2VyRW5uZWFncmFtTnVtczpudW1iZXJbXSxcclxuICAgICAgICBvcmlnaW5MYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZU1ldGVyOm51bWJlcixcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG90aGVydXNlckVubmVhZ3JhbU51bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZVwiK290aGVydXNlckVubmVhZ3JhbU51bXNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBvc3QodHlwZSxvdGhlcnVzZXJFbm5lYWdyYW1OdW1zW2ldLG9yaWdpbkxhdGl0dWRlLG9yaWdpbkxvbmdpdHVkZSxkaXN0YW5jZU1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlclBvc3RzKHVzZXJJRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwicm9sZXMuXCIrdXNlcklELCBcIj09XCIsIFwib3duZXJcIilcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQb3N0KHBvc3REYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuYWRkKHBvc3REYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRDb21tZW50KHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnREYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIGNvbW1lbnQgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZEZhdm9yaXRlKHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiZmF2b3JpdGVzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkTGlrZShwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgbGlrZXM6IGNvbW1lbnREYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIHVwZGF0ZUNvbW1lbnQocG9zdElELCBjb21tZW50SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpLmRvYyhjb21tZW50SUQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50RGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkUG9zdCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wIDtpPHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHBvc3RJRCBpbiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkUG9zdElEID09PSBwb3N0SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmlyZXN0b3JlIHF1ZXJpZXMgZm9yIFBvc3RpbmcgKG5vdCB1c2VkIHlldCkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gPT09IFJld3JpdGUgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwZGF0aW5nIHBvc3QpPT09XHJcbiAgICAvLyB1cGRhdGVfZGF0YSgpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAuZG9jKFwiU0ZcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAxLFxyXG4gICAgLy8gICAgICAgICB1cGRhdGVUaW1lc3RhbXA6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5zZXJ2ZXJUaW1lc3RhbXAoKSxcclxuICAgIC8vICAgICAgICAgbG9jYXRpb246IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkdlb1BvaW50KDQuMzQsIDUuNjcpXHJcbiAgICAvLyAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU0YgcG9wdWxhdGlvbiB1cGRhdGVkXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBEZWxldGUgQWxsIChUaGlzIHdpbGwgYmUgdXNlZCBhcyBkZWxldGluZyBwb3N0KSA9PT1cclxuICAgIC8vIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7ICAgICAgICBcclxuICAgIC8vICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vID09PSBQYXJ0aWFsIFJlbW92ZSAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgZGVsZXRpbmcgY29tbWVudCkgPT09XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGljdHVyZSBVcGxvYWQgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIDEuIHdoZW4gdXNlciBzZWxlY3QgcGljdHVyZSwgdGhlIHBpY3R1cmUgdXBsb2FkZWQgaW50byBzdG9yYWdlLlxyXG4gICAgcGlja0ltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXHJcblx0XHR9KTtcclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGltYWdlVHlwZSxmaWxlUGF0aCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cdGdldEltYWdlRmlsZVBhdGgoaW1hZ2VBc3NldCwgaW1hZ2VUeXBlOnN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0Ly8gaWYgKGlvcykgeyAvLyBjcmVhdGUgZmlsZSBmcm9tIGltYWdlIGFzc2V0IGFuZCByZXR1cm4gaXRzIHBhdGhcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRm9sZGVyUGF0aCA9IGtub3duRm9sZGVycy50ZW1wKCkuZ2V0Rm9sZGVyKFwibnNpbWFnZXBpY2tlclwiKS5wYXRoO1xyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGaWxlUGF0aCA9IHBhdGguam9pbih0ZW1wRm9sZGVyUGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcblx0XHRcdC8vIFx0Y29uc3Qgb3B0aW9ucyA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9ucy5uZXcoKTtcclxuXHJcblx0XHRcdC8vIFx0b3B0aW9ucy5zeW5jaHJvbm91cyA9IHRydWU7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy52ZXJzaW9uID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zVmVyc2lvbi5DdXJyZW50O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMuZGVsaXZlcnlNb2RlID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zRGVsaXZlcnlNb2RlLkhpZ2hRdWFsaXR5Rm9ybWF0O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMubmV0d29ya0FjY2Vzc0FsbG93ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIFx0UEhJbWFnZU1hbmFnZXIuZGVmYXVsdE1hbmFnZXIoKS5yZXF1ZXN0SW1hZ2VEYXRhRm9yQXNzZXRPcHRpb25zUmVzdWx0SGFuZGxlcihpbWFnZUFzc2V0Lmlvcywgb3B0aW9ucywgKG5zRGF0YTogTlNEYXRhLCBkYXRhVVRJOiBzdHJpbmcsIG9yaWVudGF0aW9uOiBVSUltYWdlT3JpZW50YXRpb24sIGluZm86IE5TRGljdGlvbmFyeTxhbnksIGFueT4pID0+IHtcclxuXHRcdFx0Ly8gXHRcdGlmIChpbmZvLnZhbHVlRm9yS2V5KFBISW1hZ2VSZXN1bHRJc0luQ2xvdWRLZXkpKSB7XHJcblx0XHRcdC8vIFx0XHRcdC8vIEltYWdlIGlzIGluIGlDbG91ZFxyXG5cdFx0XHQvLyBcdFx0XHRpZiAobnNEYXRhKSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIE5PVCBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH1cclxuXHRcdFx0Ly8gXHRcdH1cclxuXHJcblx0XHRcdC8vIFx0XHRuc0RhdGEud3JpdGVUb0ZpbGVBdG9taWNhbGx5KHRlbXBGaWxlUGF0aCwgdHJ1ZSk7XHJcblx0XHRcdC8vIFx0XHR0aGlzLmN1cnJlbnRJbWFnZUZpbGVQYXRoID0gdGVtcEZpbGVQYXRoO1xyXG5cdFx0XHQvLyBcdFx0cmVzb2x2ZSh0ZW1wRmlsZVBhdGgpO1xyXG5cdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHQvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5kcm9pZCkgeyAvLyByZXR1cm4gaW1hZ2VBc3NldC5hbmRyb2lkLCBzaW5jZSBpdCdzIHRoZSBwYXRoIG9mIHRoZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0cmVzb2x2ZShpbWFnZUFzc2V0LmFuZHJvaWQpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUobnVsbCk7XHJcblx0XHR9KTtcclxuICAgIH1cclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENoYXR0aW5nIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBMaXN0ZW4gQ2hhdCBSb29tcyBmcm9tIENoYXQgRGF0YWJhc2UuXHJcbiAgICBzeW5jVGhpc1VzZXJSb29tTGlzdCgpe1xyXG4gICAgICAgIGZpcmViYXNlLmFkZENoaWxkRXZlbnRMaXN0ZW5lcihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgIH0sIFwiL3VzZXJzL1wiICsgdGhpcy5hdXRodXNlci51aWQgKyBcIi91c2VyX3Jvb21zXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20odXBkYXRlZFJvb21JRDogc3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Jvb21zLycgKyB1cGRhdGVkUm9vbUlEKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuIENoYXQgTWVzc2FnZXMgZnJvbSBDaGF0IERhdGFiYXNlLlxyXG4gICAgc3luY1Jvb21NZXNzYWdlcyhyb29tSUQ6IHN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQsIHJlc3VsdC5rZXkgLHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbUlEK1wiL21lc3NhZ2VzXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQ6c3RyaW5nLCBtZXNzYWdlSUQ6YW55LCBtZXNzYWdlOmFueSl7XHJcbiAgICAgICAgaWYoIXRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ11bbWVzc2FnZUlEXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlVG9BZGQgPSB7fTtcclxuICAgICAgICBtZXNzYWdlVG9BZGRbbWVzc2FnZUlEXSA9IHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXVttZXNzYWdlSURdXHJcbiAgICAgICAgaWYocm9vbUlEID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5wdXNoKG1lc3NhZ2VUb0FkZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZUE7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlQjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2IgPSBtZXNzYWdlQlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICAgICAgdmFyIHRpbWVfYSA9IG1lc3NhZ2VBWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZV9hIC0gdGltZV9iO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbUlEK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbUlEKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIE5ldyBSb29tIG9uIENoYXQgRGF0YWJhc2UuXHJcbiAgICBnZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHVzZXI6YW55LCBmcmllbmQ6YW55KXtcclxuICAgICAgICB2YXIgZnJpZW5kSUQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmcmllbmRJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXNlcklEO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHVzZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayByb29tIGV4aXN0IGJlZm9yZSBnZW5lcmF0ZS5cclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHJvb20uXHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJubyByb29tIHdpdGggZnJpZW5kSUQ6IFwiICsgZnJpZW5kSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVuUm9vbSA9IHtyb29tVXNlcnM6e319O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nLCBvcGVuUm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCBmcmllbmQsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcihmcmllbmQsIHVzZXIsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0Mi5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBleGlzdCwgZG9uJ3QgbWFrZSBuZXcgb25lLlxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm9vbUlEIGluIHJlc3VsdFsndmFsdWUnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV4aXN0IHJvb206IFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzLycgKyB1c2VySUQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZElEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgLy9TZXQgVXNlciBBY2Nlc3MgZm9yIENoYXQgUm9vbSBvbiBDaGF0IERhdGFiYXNlLlxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVzZXJSb29tID0ge307XHJcbiAgICAgICAgdXNlclJvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyUm9vbVsnam9pblRpbWUnXSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdXNlclJvb21bJ2xlYXZlVGltZSddID0gXCJcIjtcclxuICAgICAgICBmb3IodmFyIGZyaWVuZElEIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3Jvb21JY29uJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRJRF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydtZXNzYWdlSWNvbiddID0gdXNlclt1aWRdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndXNlck5hbWUnXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHJvb20gYWNjZXNzIGF0aGVudGljYXRpb24gb24gdXNlciBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tSUQsIGZyaWVuZElEKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBjYW4gd3JpdGUgb24gY2hhdCByb29tXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21JRCsnVS8nK3VpZCwgdXNlclJvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhyb29tSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIE1lc3NhZ2Ugb24gQ2hhdCBEYXRhYmFzZS4oT3RoZXIgdXNlcnMgYXJlIGxpc3RlbmluZyBDaGF0IERhdGFiYXNlKVxyXG4gICAgcHVzaE1lc3NhZ2VPblJvb20ocm9vbUlEOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZVBhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZVBhY2tbJ3VzZXInXSA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tSUQrJy9tZXNzYWdlcycsIG1lc3NhZ2VQYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbGVjdCBGcmllbmQgZm9yIGEgTW9kYWwgb3IgQ2hhdCBSb29tLlxyXG4gICAgc2V0U2VsZWN0ZWRGcmllbmRJRChzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG4gICAgZ2V0U2VsZWN0ZWRGcmllbmRJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEF1dGggU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgbG9naW5CeUVtYWlsKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9naW5CeUZhY2Vib29rKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIC8vIGRlZmF1bHRzIHRvIFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2dpbkJ5R29vZ2xlKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFLFxyXG4gICAgICAgICAgICAvLyBPcHRpb25hbCBcclxuICAgICAgICAgICAgZ29vZ2xlT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGhvc3RlZERvbWFpbjogXCJjaGF0LWRlbW8tNWQzYTcuZmlyZWJhc2VhcHAuY29tXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIGNoZWNrRmlyc3RVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRm1vdW50YWluLXJhbmdlLW9uLWJsYWNrLWJhY2tncm91bmQucG5nP2FsdD1tZWRpYSZ0b2tlbj0yNmNlNWZlYi0wOThkLTQ1MDAtOTE0YS1kNzM4ODAzNTI1MzlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmlyc3QgdXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIoKTtcclxuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5pdCBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0QXV0aFVzZXIoKXtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0S2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IEFkdmVydGlzaW5nXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCYW5uZXIoKTtcclxuICAgIH1cclxuICAgIHNldFRoaXNVc2VyKHJlc3VsdDphbnkpe1xyXG4gICAgICAgIHZhciBrZXkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5rZXkpKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5hbmFseXplVXNlckxvZ2luKHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRoaXNVc2VyKTtcclxuICAgIH1cclxuICAgIGFuYWx5emVVc2VyTG9naW4oaWQ6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hbmFseXRpY3Muc2V0QW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgZmlyZWJhc2UuYW5hbHl0aWNzLnNldFVzZXJJZCh7XHJcbiAgICAgICAgICAgIHVzZXJJZDogaWRcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQW5hbHl0aWNzIHVzZXJJZCBzZXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZElEczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZElEcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDsgICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZnJpZW5kSURzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRJRHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZyaWVuZChyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1mcmllbmRJRHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZyaWVuZEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tSURzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocm9vbUlEcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHJvb21JRHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21JRHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvb20ocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09cm9vbUlEcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jVGhpc1VzZXJSb29tTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXJQaWN0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRSb29tKHJvb20pe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHJvb20pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW2tleV0gPSByb29tW2tleV07XHJcbiAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuICAgICAgICB0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuXHR9XHJcblxyXG4gICAgcHVibGljIGpzb25Ub0FycmF5KGpzb24pe1xyXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgIGlmKGpzb24hPW51bGwpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZEpzb24gPSB7fTtcclxuICAgICAgICAgICAgICAgIGNoaWxkSnNvbltrZXldID0ganNvbltrZXldO1xyXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChjaGlsZEpzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0Q3VycmVudFVzZXJQaWN0dXJlKCl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLnRoaXNVc2VyKXtcclxuICAgICAgICAgICAgaWYodGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsnYmFja2dyb3VuZFBpY3NyYyddICE9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkwgPSB0aGlzLnRoaXNVc2VyW2lkXVsncHJvZmlsZSddWydiYWNrZ3JvdW5kUGljc3JjJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddICE9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSB0aGlzLnRoaXNVc2VyW2lkXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlQmFubmVyKCk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9PSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==