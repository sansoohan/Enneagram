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
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsOERBQWlFO0FBQ2pFLHNDQUEyQztBQUMzQyxzREFBK0Q7QUFDL0QsNERBQTREO0FBSTVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFnQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEvQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFXWCx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFNdEMsK0JBQTBCLEdBQUcsa0xBQWtMLENBQUM7UUFDaE4sa0NBQTZCLEdBQUcsNExBQTRMLENBQUM7UUFLN04sMEJBQXFCLEdBQWUsRUFBRSxDQUFDO0lBTTlDLENBQUM7SUFFRCxvRUFBb0U7SUFDcEUsd0NBQWMsR0FBZCxVQUFlLFlBQW9CO1FBQy9CLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDSSxrREFBa0Q7UUFDdEQsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsMkZBQTJGO0lBQzNGLDRDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzNFLE9BQU8s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QUssQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUMxQixDQUFDO0lBcjVCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBa0NxQix5QkFBZ0I7T0FqQ3JDLGVBQWUsQ0FzNUIzQjtJQUFELHNCQUFDO0NBQUEsQUF0NUJELElBczVCQztBQXQ1QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcblxyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB0aGlzVXNlck5hbWUgPSBcIlwiO1xyXG4gICAgcHVibGljIHRoaXNVU2VyRW1haWwgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRzID0ge307XHJcbiAgICBwdWJsaWMgcm9vbXMgPSB7fTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyByb29tQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIG1lc3NhZ2VVcGRhdGVkVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIjtcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZtb3VudGFpbi1yYW5nZS1vbi1ibGFjay1iYWNrZ3JvdW5kLnBuZz9hbHQ9bWVkaWEmdG9rZW49MjZjZTVmZWItMDk4ZC00NTAwLTkxNGEtZDczODgwMzUyNTM5XCI7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdERhdGE6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHBvc3RTZWFyY2hSZXN1bHRBcnJheTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUG9zdElEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBbmFseXppbmcgVXNlciBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgYW5hbHl0aWNzQ291bnQoYWN0aXZpdHlOYW1lOiBzdHJpbmcpOiB2b2lke1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dFdmVudCh7XHJcbiAgICAgICAgICAgIGtleTogYWN0aXZpdHlOYW1lXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaXJlYmFzZSBBbmFseXRpY3MgZXZlbnQgbG9nZ2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVXBkYXRpbmcgUHJvZmlsZSBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRUaGlzVXNlclByb2ZpbGUoZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3Byb2ZpbGUnLCBkYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBOZXcgUG9zdGluZyBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2VhcmNoUG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBvdGhlcnVzZXJFbm5lYWdyYW1OdW06bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5Mb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlTWV0ZXI6bnVtYmVyXHJcbiAgICApe1xyXG4gICAgICAgIGNvbnN0IE9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSID0gMTExMDAwO1xyXG5cclxuICAgICAgICB2YXIgbWF4TGF0aXR1ZGVEZWdyZWUgPSBvcmlnaW5MYXRpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5MYXRpdHVkZURlZ3JlZSA9IG9yaWdpbkxhdGl0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4TGF0aXR1ZGVEZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhMYXRpdHVkZURlZ3JlZSA9IDkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW5MYXRpdHVkZURlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5MYXRpdHVkZURlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heExvbmdpdHVkZURlZ3JlZSA9IG9yaWdpbkxvbmdpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luTGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICB2YXIgbWluTG9uZ2l0dWRlRGVncmVlID0gb3JpZ2luTG9uZ2l0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5MYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSAtIG1pbkxvbmdpdHVkZURlZ3JlZSA+PSAzNjApe1xyXG4gICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSA+PSAxODApe1xyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gbWF4TG9uZ2l0dWRlRGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA8PSAtMTgwKXtcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1pbkxvbmdpdHVkZURlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA+IG1heExvbmdpdHVkZURlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluTG9uZ2l0dWRlRGVncmVlO1xyXG4gICAgICAgICAgICBtaW5Mb25naXR1ZGVEZWdyZWUgPSBtYXhMb25naXR1ZGVEZWdyZWU7XHJcbiAgICAgICAgICAgIG1heExvbmdpdHVkZURlZ3JlZSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xhdFwiLG1pbkxhdGl0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sYXRcIixvcmlnaW5MYXRpdHVkZSk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sYXRcIixtYXhMYXRpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbG9uXCIsbWluTG9uZ2l0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5Mb25naXR1ZGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xvblwiLG1heExvbmdpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgb3RoZXJ1c2VyRW5uZWFncmFtTnVtKVxyXG4gICAgICAgIC53aGVyZShcInR5cGVcIiwgXCI9PVwiLCB0eXBlKVxyXG4gICAgICAgIC53aGVyZShcImxvbmdpdHVkZVwiLCBcIjw9XCIsIG1heExvbmdpdHVkZURlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5Mb25naXR1ZGVEZWdyZWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jLmRhdGEoKS5sYXRpdHVkZSA8PSBtYXhMYXRpdHVkZURlZ3JlZSAmJiBkb2MuZGF0YSgpLmxhdGl0dWRlID49IG1pbkxhdGl0dWRlRGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBzZWFyY2hSZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydsaWtlX2NvdW50J10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdXNlcklkIGluIHNlYXJjaFJlc3VsdFtpZF1bJ2xpa2VzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnbGlrZV9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfbGlrZSddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQrXCIgT2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2xpa2UnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gc2VhcmNoUmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1c2VySWQgaW4gc2VhcmNoUmVzdWx0W2lkXVsnZmF2b3JpdGVzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfZmF2b3JpdGUnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2Zhdm9yaXRlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIHNlYXJjaFJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRfY291bnQnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2NvbW1lbnQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09bnVsbCB8fCBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yKHZhciBpPTA7IGk8c2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudF9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaFF1ZXJpZXMoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgb3RoZXJ1c2VyRW5uZWFncmFtTnVtczpudW1iZXJbXSxcclxuICAgICAgICBvcmlnaW5MYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZU1ldGVyOm51bWJlcixcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG90aGVydXNlckVubmVhZ3JhbU51bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZVwiK290aGVydXNlckVubmVhZ3JhbU51bXNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBvc3QodHlwZSxvdGhlcnVzZXJFbm5lYWdyYW1OdW1zW2ldLG9yaWdpbkxhdGl0dWRlLG9yaWdpbkxvbmdpdHVkZSxkaXN0YW5jZU1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlclBvc3RzKHVzZXJJRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwicm9sZXMuXCIrdXNlcklELCBcIj09XCIsIFwib3duZXJcIilcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQb3N0KHBvc3REYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuYWRkKHBvc3REYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRDb21tZW50KHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnREYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIGNvbW1lbnQgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZEZhdm9yaXRlKHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiZmF2b3JpdGVzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkTGlrZShwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgbGlrZXM6IGNvbW1lbnREYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIHVwZGF0ZUNvbW1lbnQocG9zdElELCBjb21tZW50SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpLmRvYyhjb21tZW50SUQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50RGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkUG9zdCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wIDtpPHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHBvc3RJRCBpbiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkUG9zdElEID09PSBwb3N0SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmlyZXN0b3JlIHF1ZXJpZXMgZm9yIFBvc3RpbmcgKG5vdCB1c2VkIHlldCkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gPT09IFJld3JpdGUgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwZGF0aW5nIHBvc3QpPT09XHJcbiAgICAvLyB1cGRhdGVfZGF0YSgpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAuZG9jKFwiU0ZcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAxLFxyXG4gICAgLy8gICAgICAgICB1cGRhdGVUaW1lc3RhbXA6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5zZXJ2ZXJUaW1lc3RhbXAoKSxcclxuICAgIC8vICAgICAgICAgbG9jYXRpb246IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkdlb1BvaW50KDQuMzQsIDUuNjcpXHJcbiAgICAvLyAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU0YgcG9wdWxhdGlvbiB1cGRhdGVkXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBEZWxldGUgQWxsIChUaGlzIHdpbGwgYmUgdXNlZCBhcyBkZWxldGluZyBwb3N0KSA9PT1cclxuICAgIC8vIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7ICAgICAgICBcclxuICAgIC8vICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vID09PSBQYXJ0aWFsIFJlbW92ZSAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgZGVsZXRpbmcgY29tbWVudCkgPT09XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGljdHVyZSBVcGxvYWQgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIDEuIHdoZW4gdXNlciBzZWxlY3QgcGljdHVyZSwgdGhlIHBpY3R1cmUgdXBsb2FkZWQgaW50byBzdG9yYWdlLlxyXG4gICAgcGlja0ltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXHJcblx0XHR9KTtcclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGltYWdlVHlwZSxmaWxlUGF0aCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cdGdldEltYWdlRmlsZVBhdGgoaW1hZ2VBc3NldCwgaW1hZ2VUeXBlOnN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0Ly8gaWYgKGlvcykgeyAvLyBjcmVhdGUgZmlsZSBmcm9tIGltYWdlIGFzc2V0IGFuZCByZXR1cm4gaXRzIHBhdGhcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRm9sZGVyUGF0aCA9IGtub3duRm9sZGVycy50ZW1wKCkuZ2V0Rm9sZGVyKFwibnNpbWFnZXBpY2tlclwiKS5wYXRoO1xyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGaWxlUGF0aCA9IHBhdGguam9pbih0ZW1wRm9sZGVyUGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcblx0XHRcdC8vIFx0Y29uc3Qgb3B0aW9ucyA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9ucy5uZXcoKTtcclxuXHJcblx0XHRcdC8vIFx0b3B0aW9ucy5zeW5jaHJvbm91cyA9IHRydWU7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy52ZXJzaW9uID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zVmVyc2lvbi5DdXJyZW50O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMuZGVsaXZlcnlNb2RlID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zRGVsaXZlcnlNb2RlLkhpZ2hRdWFsaXR5Rm9ybWF0O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMubmV0d29ya0FjY2Vzc0FsbG93ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIFx0UEhJbWFnZU1hbmFnZXIuZGVmYXVsdE1hbmFnZXIoKS5yZXF1ZXN0SW1hZ2VEYXRhRm9yQXNzZXRPcHRpb25zUmVzdWx0SGFuZGxlcihpbWFnZUFzc2V0Lmlvcywgb3B0aW9ucywgKG5zRGF0YTogTlNEYXRhLCBkYXRhVVRJOiBzdHJpbmcsIG9yaWVudGF0aW9uOiBVSUltYWdlT3JpZW50YXRpb24sIGluZm86IE5TRGljdGlvbmFyeTxhbnksIGFueT4pID0+IHtcclxuXHRcdFx0Ly8gXHRcdGlmIChpbmZvLnZhbHVlRm9yS2V5KFBISW1hZ2VSZXN1bHRJc0luQ2xvdWRLZXkpKSB7XHJcblx0XHRcdC8vIFx0XHRcdC8vIEltYWdlIGlzIGluIGlDbG91ZFxyXG5cdFx0XHQvLyBcdFx0XHRpZiAobnNEYXRhKSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIE5PVCBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH1cclxuXHRcdFx0Ly8gXHRcdH1cclxuXHJcblx0XHRcdC8vIFx0XHRuc0RhdGEud3JpdGVUb0ZpbGVBdG9taWNhbGx5KHRlbXBGaWxlUGF0aCwgdHJ1ZSk7XHJcblx0XHRcdC8vIFx0XHR0aGlzLmN1cnJlbnRJbWFnZUZpbGVQYXRoID0gdGVtcEZpbGVQYXRoO1xyXG5cdFx0XHQvLyBcdFx0cmVzb2x2ZSh0ZW1wRmlsZVBhdGgpO1xyXG5cdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHQvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5kcm9pZCkgeyAvLyByZXR1cm4gaW1hZ2VBc3NldC5hbmRyb2lkLCBzaW5jZSBpdCdzIHRoZSBwYXRoIG9mIHRoZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0cmVzb2x2ZShpbWFnZUFzc2V0LmFuZHJvaWQpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUobnVsbCk7XHJcblx0XHR9KTtcclxuICAgIH1cclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENoYXR0aW5nIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBMaXN0ZW4gQ2hhdCBSb29tcyBmcm9tIENoYXQgRGF0YWJhc2UuXHJcbiAgICBzeW5jVGhpc1VzZXJSb29tTGlzdCgpe1xyXG4gICAgICAgIGZpcmViYXNlLmFkZENoaWxkRXZlbnRMaXN0ZW5lcihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgIH0sIFwiL3VzZXJzL1wiICsgdGhpcy5hdXRodXNlci51aWQgKyBcIi91c2VyX3Jvb21zXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20odXBkYXRlZFJvb21JRDogc3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Jvb21zLycgKyB1cGRhdGVkUm9vbUlEKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuIENoYXQgTWVzc2FnZXMgZnJvbSBDaGF0IERhdGFiYXNlLlxyXG4gICAgc3luY1Jvb21NZXNzYWdlcyhyb29tSUQ6IHN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQsIHJlc3VsdC5rZXkgLHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbUlEK1wiL21lc3NhZ2VzXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQ6c3RyaW5nLCBtZXNzYWdlSUQ6YW55LCBtZXNzYWdlOmFueSl7XHJcbiAgICAgICAgaWYoIXRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ11bbWVzc2FnZUlEXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlVG9BZGQgPSB7fTtcclxuICAgICAgICBtZXNzYWdlVG9BZGRbbWVzc2FnZUlEXSA9IHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXVttZXNzYWdlSURdXHJcbiAgICAgICAgaWYocm9vbUlEID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5wdXNoKG1lc3NhZ2VUb0FkZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZUE7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlQjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2IgPSBtZXNzYWdlQlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICAgICAgdmFyIHRpbWVfYSA9IG1lc3NhZ2VBWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZV9hIC0gdGltZV9iO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbUlEK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbUlEKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIE5ldyBSb29tIG9uIENoYXQgRGF0YWJhc2UuXHJcbiAgICBnZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHVzZXI6YW55LCBmcmllbmQ6YW55KXtcclxuICAgICAgICB2YXIgZnJpZW5kSUQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmcmllbmRJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXNlcklEO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHVzZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayByb29tIGV4aXN0IGJlZm9yZSBnZW5lcmF0ZS5cclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHJvb20uXHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJubyByb29tIHdpdGggZnJpZW5kSUQ6IFwiICsgZnJpZW5kSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVuUm9vbSA9IHtyb29tVXNlcnM6e319O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nLCBvcGVuUm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCBmcmllbmQsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcihmcmllbmQsIHVzZXIsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0Mi5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBleGlzdCwgZG9uJ3QgbWFrZSBuZXcgb25lLlxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm9vbUlEIGluIHJlc3VsdFsndmFsdWUnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV4aXN0IHJvb206IFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzLycgKyB1c2VySUQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZElEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgLy9TZXQgVXNlciBBY2Nlc3MgZm9yIENoYXQgUm9vbSBvbiBDaGF0IERhdGFiYXNlLlxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVzZXJSb29tID0ge307XHJcbiAgICAgICAgdXNlclJvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyUm9vbVsnam9pblRpbWUnXSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdXNlclJvb21bJ2xlYXZlVGltZSddID0gXCJcIjtcclxuICAgICAgICBmb3IodmFyIGZyaWVuZElEIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3Jvb21JY29uJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRJRF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydtZXNzYWdlSWNvbiddID0gdXNlclt1aWRdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndXNlck5hbWUnXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHJvb20gYWNjZXNzIGF0aGVudGljYXRpb24gb24gdXNlciBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tSUQsIGZyaWVuZElEKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBjYW4gd3JpdGUgb24gY2hhdCByb29tXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21JRCsnVS8nK3VpZCwgdXNlclJvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhyb29tSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIE1lc3NhZ2Ugb24gQ2hhdCBEYXRhYmFzZS4oT3RoZXIgdXNlcnMgYXJlIGxpc3RlbmluZyBDaGF0IERhdGFiYXNlKVxyXG4gICAgcHVzaE1lc3NhZ2VPblJvb20ocm9vbUlEOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZVBhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZVBhY2tbJ3VzZXInXSA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tSUQrJy9tZXNzYWdlcycsIG1lc3NhZ2VQYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbGVjdCBGcmllbmQgZm9yIGEgTW9kYWwgb3IgQ2hhdCBSb29tLlxyXG4gICAgc2V0U2VsZWN0ZWRGcmllbmRJRChzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG4gICAgZ2V0U2VsZWN0ZWRGcmllbmRJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEF1dGggU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgbG9naW5CeUVtYWlsKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9naW5CeUZhY2Vib29rKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIC8vIGRlZmF1bHRzIHRvIFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2dpbkJ5R29vZ2xlKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFLFxyXG4gICAgICAgICAgICAvLyBPcHRpb25hbCBcclxuICAgICAgICAgICAgZ29vZ2xlT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGhvc3RlZERvbWFpbjogXCJjaGF0LWRlbW8tNWQzYTcuZmlyZWJhc2VhcHAuY29tXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIGNoZWNrRmlyc3RVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRm1vdW50YWluLXJhbmdlLW9uLWJsYWNrLWJhY2tncm91bmQucG5nP2FsdD1tZWRpYSZ0b2tlbj0yNmNlNWZlYi0wOThkLTQ1MDAtOTE0YS1kNzM4ODAzNTI1MzlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmlyc3QgdXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIoKTtcclxuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5pdCBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0QXV0aFVzZXIoKXtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0S2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgICAgIHVzZXJba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGhpc1VzZXIgPSB1c2VyO1xyXG4gICAgICAgIHRoaXMuYW5hbHl6ZVVzZXJMb2dpbih0aGlzLmF1dGh1c2VyLnVpZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBhbmFseXplVXNlckxvZ2luKGlkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYW5hbHl0aWNzLnNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKHRydWUpO1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5zZXRVc2VySWQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IGlkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFuYWx5dGljcyB1c2VySWQgc2V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRJRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRJRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7ICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGZyaWVuZElEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRGcmllbmQoZnJpZW5kKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZHNba2V5XSA9IGZyaWVuZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdldFVzZXJzQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpKTtcclxuICAgIH1cclxuICAgIHNldEZyaWVuZEFycmF5KCk6IHZvaWR7XHJcblx0XHR0aGlzLmZyaWVuZEFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldEZyaWVuZHMoKSk7XHJcblx0fVxyXG4gICAgc2V0Um9vbXMocm9vbUlEczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJvb21JRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxyb29tSURzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvcm9vbXMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb29tSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb29tKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PXJvb21JRHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1RoaXNVc2VyUm9vbUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyUGljdHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcbiAgICAgICAgdGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcblx0fVxyXG5cclxuICAgIHB1YmxpYyBqc29uVG9BcnJheShqc29uKXtcclxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICBpZihqc29uIT1udWxsKXtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4ganNvbil7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRKc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZEpzb25ba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRKc29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldEN1cnJlbnRVc2VyUGljdHVyZSgpe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy50aGlzVXNlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ2JhY2tncm91bmRQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsnYmFja2dyb3VuZFBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgICAgIHRoaXMuYXV0aHVzZXIgPT0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iXX0=