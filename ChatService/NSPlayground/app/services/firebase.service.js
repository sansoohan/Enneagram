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
        // var posts = firebaseWeb.firestore()
        // .collection("posts"). doc(postID)
        // .update({
        //     like: firebaseWeb.firestore().FieldValue().arrayUnion();
        // });
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
            if (application_1.android) {
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
                    "backgroundPicsrc": "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FXkM4MNwK30htBUgvW8vJPDRj4qF2%2Fimages%2Fimg_rank_s.jpg?alt=media&token=ceb99b79-8373-4c47-b97c-79cd73b12fc3",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsOERBQWlFO0FBQ2pFLHNDQUEyQztBQUMzQyxzREFBK0Q7QUFDL0QsNERBQTREO0FBSTVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFnQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEvQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFXWCx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFNdEMsK0JBQTBCLEdBQUcsa0xBQWtMLENBQUM7UUFDaE4sa0NBQTZCLEdBQUcsNExBQTRMLENBQUM7UUFLN04sMEJBQXFCLEdBQWUsRUFBRSxDQUFDO0lBTTlDLENBQUM7SUFFRCxvRUFBb0U7SUFDcEUsd0NBQWMsR0FBZCxVQUFlLFlBQW9CO1FBQy9CLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDSSxrREFBa0Q7UUFDdEQsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsMkZBQTJGO0lBQzNGLDRDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzNFLE9BQU8s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LENBQUM7UUFDdkQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFyNUJRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FrQ3FCLHlCQUFnQjtPQWpDckMsZUFBZSxDQXM1QjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXQ1QkQsSUFzNUJDO0FBdDVCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuXHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBhdXRodXNlcjogZmlyZWJhc2UuVXNlcjsgICAgXHJcbiAgICBwdWJsaWMgdGhpc1VzZXI6IGFueSA9IHt9O1xyXG4gICAgcHVibGljIHRoaXNVc2VyTmFtZSA9IFwiXCI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVU2VyRW1haWwgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRzID0ge307XHJcbiAgICBwdWJsaWMgcm9vbXMgPSB7fTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyByb29tQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIG1lc3NhZ2VVcGRhdGVkVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIjtcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZtb3VudGFpbi1yYW5nZS1vbi1ibGFjay1iYWNrZ3JvdW5kLnBuZz9hbHQ9bWVkaWEmdG9rZW49MjZjZTVmZWItMDk4ZC00NTAwLTkxNGEtZDczODgwMzUyNTM5XCI7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdERhdGE6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHBvc3RTZWFyY2hSZXN1bHRBcnJheTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUG9zdElEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBbmFseXppbmcgVXNlciBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgYW5hbHl0aWNzQ291bnQoYWN0aXZpdHlOYW1lOiBzdHJpbmcpOiB2b2lke1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dFdmVudCh7XHJcbiAgICAgICAgICAgIGtleTogYWN0aXZpdHlOYW1lXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaXJlYmFzZSBBbmFseXRpY3MgZXZlbnQgbG9nZ2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVXBkYXRpbmcgUHJvZmlsZSBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRUaGlzVXNlclByb2ZpbGUoZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3Byb2ZpbGUnLCBkYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBOZXcgUG9zdGluZyBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2VhcmNoUG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBvdGhlcnVzZXJFbm5lYWdyYW1OdW06bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5Mb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlTWV0ZXI6bnVtYmVyXHJcbiAgICApe1xyXG4gICAgICAgIGNvbnN0IE9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSID0gMTExMDAwO1xyXG5cclxuICAgICAgICB2YXIgbWF4TGF0aXR1ZGVEZWdyZWUgPSBvcmlnaW5MYXRpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5MYXRpdHVkZURlZ3JlZSA9IG9yaWdpbkxhdGl0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4TGF0aXR1ZGVEZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhMYXRpdHVkZURlZ3JlZSA9IDkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW5MYXRpdHVkZURlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5MYXRpdHVkZURlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heExvbmdpdHVkZURlZ3JlZSA9IG9yaWdpbkxvbmdpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luTGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICB2YXIgbWluTG9uZ2l0dWRlRGVncmVlID0gb3JpZ2luTG9uZ2l0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5MYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSAtIG1pbkxvbmdpdHVkZURlZ3JlZSA+PSAzNjApe1xyXG4gICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSA+PSAxODApe1xyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gbWF4TG9uZ2l0dWRlRGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA8PSAtMTgwKXtcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1pbkxvbmdpdHVkZURlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA+IG1heExvbmdpdHVkZURlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluTG9uZ2l0dWRlRGVncmVlO1xyXG4gICAgICAgICAgICBtaW5Mb25naXR1ZGVEZWdyZWUgPSBtYXhMb25naXR1ZGVEZWdyZWU7XHJcbiAgICAgICAgICAgIG1heExvbmdpdHVkZURlZ3JlZSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xhdFwiLG1pbkxhdGl0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sYXRcIixvcmlnaW5MYXRpdHVkZSk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sYXRcIixtYXhMYXRpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbG9uXCIsbWluTG9uZ2l0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5Mb25naXR1ZGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xvblwiLG1heExvbmdpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgb3RoZXJ1c2VyRW5uZWFncmFtTnVtKVxyXG4gICAgICAgIC53aGVyZShcInR5cGVcIiwgXCI9PVwiLCB0eXBlKVxyXG4gICAgICAgIC53aGVyZShcImxvbmdpdHVkZVwiLCBcIjw9XCIsIG1heExvbmdpdHVkZURlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5Mb25naXR1ZGVEZWdyZWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jLmRhdGEoKS5sYXRpdHVkZSA8PSBtYXhMYXRpdHVkZURlZ3JlZSAmJiBkb2MuZGF0YSgpLmxhdGl0dWRlID49IG1pbkxhdGl0dWRlRGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBzZWFyY2hSZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydsaWtlX2NvdW50J10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdXNlcklkIGluIHNlYXJjaFJlc3VsdFtpZF1bJ2xpa2VzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnbGlrZV9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfbGlrZSddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQrXCIgT2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2xpa2UnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gc2VhcmNoUmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1c2VySWQgaW4gc2VhcmNoUmVzdWx0W2lkXVsnZmF2b3JpdGVzJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdXRodXNlci51aWQgPT09IHVzZXJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfZmF2b3JpdGUnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2Zhdm9yaXRlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIHNlYXJjaFJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRfY291bnQnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2NvbW1lbnQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09bnVsbCB8fCBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddPT09XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yKHZhciBpPTA7IGk8c2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudF9jb3VudCddKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaFF1ZXJpZXMoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgb3RoZXJ1c2VyRW5uZWFncmFtTnVtczpudW1iZXJbXSxcclxuICAgICAgICBvcmlnaW5MYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZU1ldGVyOm51bWJlcixcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG90aGVydXNlckVubmVhZ3JhbU51bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZVwiK290aGVydXNlckVubmVhZ3JhbU51bXNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBvc3QodHlwZSxvdGhlcnVzZXJFbm5lYWdyYW1OdW1zW2ldLG9yaWdpbkxhdGl0dWRlLG9yaWdpbkxvbmdpdHVkZSxkaXN0YW5jZU1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlclBvc3RzKHVzZXJJRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwicm9sZXMuXCIrdXNlcklELCBcIj09XCIsIFwib3duZXJcIilcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQb3N0KHBvc3REYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuYWRkKHBvc3REYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRDb21tZW50KHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnREYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIGNvbW1lbnQgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZEZhdm9yaXRlKHBvc3RJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiZmF2b3JpdGVzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkTGlrZShwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICAvLyB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC8vIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuIGRvYyhwb3N0SUQpXHJcbiAgICAgICAgLy8gLnVwZGF0ZSh7XHJcbiAgICAgICAgLy8gICAgIGxpa2U6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIHVwZGF0ZUNvbW1lbnQocG9zdElELCBjb21tZW50SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpLmRvYyhjb21tZW50SUQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50RGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkUG9zdCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wIDtpPHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHBvc3RJRCBpbiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkUG9zdElEID09PSBwb3N0SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmlyZXN0b3JlIHF1ZXJpZXMgZm9yIFBvc3RpbmcgKG5vdCB1c2VkIHlldCkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gPT09IFJld3JpdGUgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwZGF0aW5nIHBvc3QpPT09XHJcbiAgICAvLyB1cGRhdGVfZGF0YSgpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAuZG9jKFwiU0ZcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAxLFxyXG4gICAgLy8gICAgICAgICB1cGRhdGVUaW1lc3RhbXA6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5zZXJ2ZXJUaW1lc3RhbXAoKSxcclxuICAgIC8vICAgICAgICAgbG9jYXRpb246IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkdlb1BvaW50KDQuMzQsIDUuNjcpXHJcbiAgICAvLyAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU0YgcG9wdWxhdGlvbiB1cGRhdGVkXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBEZWxldGUgQWxsIChUaGlzIHdpbGwgYmUgdXNlZCBhcyBkZWxldGluZyBwb3N0KSA9PT1cclxuICAgIC8vIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7ICAgICAgICBcclxuICAgIC8vICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vID09PSBQYXJ0aWFsIFJlbW92ZSAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgZGVsZXRpbmcgY29tbWVudCkgPT09XHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vID09PSBQYXJ0aWFsIEFkZCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBsb2FkaW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGljdHVyZSBVcGxvYWQgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIDEuIHdoZW4gdXNlciBzZWxlY3QgcGljdHVyZSwgdGhlIHBpY3R1cmUgdXBsb2FkZWQgaW50byBzdG9yYWdlLlxyXG4gICAgcGlja0ltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXHJcblx0XHR9KTtcclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGltYWdlVHlwZSxmaWxlUGF0aCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cdGdldEltYWdlRmlsZVBhdGgoaW1hZ2VBc3NldCwgaW1hZ2VUeXBlOnN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0Ly8gaWYgKGlvcykgeyAvLyBjcmVhdGUgZmlsZSBmcm9tIGltYWdlIGFzc2V0IGFuZCByZXR1cm4gaXRzIHBhdGhcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRm9sZGVyUGF0aCA9IGtub3duRm9sZGVycy50ZW1wKCkuZ2V0Rm9sZGVyKFwibnNpbWFnZXBpY2tlclwiKS5wYXRoO1xyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGaWxlUGF0aCA9IHBhdGguam9pbih0ZW1wRm9sZGVyUGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcblx0XHRcdC8vIFx0Y29uc3Qgb3B0aW9ucyA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9ucy5uZXcoKTtcclxuXHJcblx0XHRcdC8vIFx0b3B0aW9ucy5zeW5jaHJvbm91cyA9IHRydWU7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy52ZXJzaW9uID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zVmVyc2lvbi5DdXJyZW50O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMuZGVsaXZlcnlNb2RlID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zRGVsaXZlcnlNb2RlLkhpZ2hRdWFsaXR5Rm9ybWF0O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMubmV0d29ya0FjY2Vzc0FsbG93ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIFx0UEhJbWFnZU1hbmFnZXIuZGVmYXVsdE1hbmFnZXIoKS5yZXF1ZXN0SW1hZ2VEYXRhRm9yQXNzZXRPcHRpb25zUmVzdWx0SGFuZGxlcihpbWFnZUFzc2V0Lmlvcywgb3B0aW9ucywgKG5zRGF0YTogTlNEYXRhLCBkYXRhVVRJOiBzdHJpbmcsIG9yaWVudGF0aW9uOiBVSUltYWdlT3JpZW50YXRpb24sIGluZm86IE5TRGljdGlvbmFyeTxhbnksIGFueT4pID0+IHtcclxuXHRcdFx0Ly8gXHRcdGlmIChpbmZvLnZhbHVlRm9yS2V5KFBISW1hZ2VSZXN1bHRJc0luQ2xvdWRLZXkpKSB7XHJcblx0XHRcdC8vIFx0XHRcdC8vIEltYWdlIGlzIGluIGlDbG91ZFxyXG5cdFx0XHQvLyBcdFx0XHRpZiAobnNEYXRhKSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIE5PVCBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH1cclxuXHRcdFx0Ly8gXHRcdH1cclxuXHJcblx0XHRcdC8vIFx0XHRuc0RhdGEud3JpdGVUb0ZpbGVBdG9taWNhbGx5KHRlbXBGaWxlUGF0aCwgdHJ1ZSk7XHJcblx0XHRcdC8vIFx0XHR0aGlzLmN1cnJlbnRJbWFnZUZpbGVQYXRoID0gdGVtcEZpbGVQYXRoO1xyXG5cdFx0XHQvLyBcdFx0cmVzb2x2ZSh0ZW1wRmlsZVBhdGgpO1xyXG5cdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHQvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5kcm9pZCkgeyAvLyByZXR1cm4gaW1hZ2VBc3NldC5hbmRyb2lkLCBzaW5jZSBpdCdzIHRoZSBwYXRoIG9mIHRoZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0cmVzb2x2ZShpbWFnZUFzc2V0LmFuZHJvaWQpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUobnVsbCk7XHJcblx0XHR9KTtcclxuICAgIH1cclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENoYXR0aW5nIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBMaXN0ZW4gQ2hhdCBSb29tcyBmcm9tIENoYXQgRGF0YWJhc2UuXHJcbiAgICBzeW5jVGhpc1VzZXJSb29tTGlzdCgpe1xyXG4gICAgICAgIGZpcmViYXNlLmFkZENoaWxkRXZlbnRMaXN0ZW5lcihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgIH0sIFwiL3VzZXJzL1wiICsgdGhpcy5hdXRodXNlci51aWQgKyBcIi91c2VyX3Jvb21zXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20odXBkYXRlZFJvb21JRDogc3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Jvb21zLycgKyB1cGRhdGVkUm9vbUlEKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuIENoYXQgTWVzc2FnZXMgZnJvbSBDaGF0IERhdGFiYXNlLlxyXG4gICAgc3luY1Jvb21NZXNzYWdlcyhyb29tSUQ6IHN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQsIHJlc3VsdC5rZXkgLHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbUlEK1wiL21lc3NhZ2VzXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb21NZXNzYWdlcyhyb29tSUQ6c3RyaW5nLCBtZXNzYWdlSUQ6YW55LCBtZXNzYWdlOmFueSl7XHJcbiAgICAgICAgaWYoIXRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ11bbWVzc2FnZUlEXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlVG9BZGQgPSB7fTtcclxuICAgICAgICBtZXNzYWdlVG9BZGRbbWVzc2FnZUlEXSA9IHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXVttZXNzYWdlSURdXHJcbiAgICAgICAgaWYocm9vbUlEID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5wdXNoKG1lc3NhZ2VUb0FkZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZUE7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlQjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2IgPSBtZXNzYWdlQlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICAgICAgdmFyIHRpbWVfYSA9IG1lc3NhZ2VBWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZV9hIC0gdGltZV9iO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbUlEK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbUlEKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIE5ldyBSb29tIG9uIENoYXQgRGF0YWJhc2UuXHJcbiAgICBnZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHVzZXI6YW55LCBmcmllbmQ6YW55KXtcclxuICAgICAgICB2YXIgZnJpZW5kSUQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmcmllbmRJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXNlcklEO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHVzZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayByb29tIGV4aXN0IGJlZm9yZSBnZW5lcmF0ZS5cclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHJvb20uXHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJubyByb29tIHdpdGggZnJpZW5kSUQ6IFwiICsgZnJpZW5kSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVuUm9vbSA9IHtyb29tVXNlcnM6e319O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nLCBvcGVuUm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCBmcmllbmQsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcihmcmllbmQsIHVzZXIsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0Mi5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBleGlzdCwgZG9uJ3QgbWFrZSBuZXcgb25lLlxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm9vbUlEIGluIHJlc3VsdFsndmFsdWUnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV4aXN0IHJvb206IFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzLycgKyB1c2VySUQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZElEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgLy9TZXQgVXNlciBBY2Nlc3MgZm9yIENoYXQgUm9vbSBvbiBDaGF0IERhdGFiYXNlLlxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVzZXJSb29tID0ge307XHJcbiAgICAgICAgdXNlclJvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyUm9vbVsnam9pblRpbWUnXSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdXNlclJvb21bJ2xlYXZlVGltZSddID0gXCJcIjtcclxuICAgICAgICBmb3IodmFyIGZyaWVuZElEIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3Jvb21JY29uJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRJRF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydtZXNzYWdlSWNvbiddID0gdXNlclt1aWRdW1wicHJvZmlsZVwiXVtcInByb2ZpbGVQaWNzcmNcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsndXNlck5hbWUnXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHJvb20gYWNjZXNzIGF0aGVudGljYXRpb24gb24gdXNlciBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tSUQsIGZyaWVuZElEKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBjYW4gd3JpdGUgb24gY2hhdCByb29tXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21JRCsnVS8nK3VpZCwgdXNlclJvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhyb29tSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIE1lc3NhZ2Ugb24gQ2hhdCBEYXRhYmFzZS4oT3RoZXIgdXNlcnMgYXJlIGxpc3RlbmluZyBDaGF0IERhdGFiYXNlKVxyXG4gICAgcHVzaE1lc3NhZ2VPblJvb20ocm9vbUlEOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZVBhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZVBhY2tbJ3VzZXInXSA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tSUQrJy9tZXNzYWdlcycsIG1lc3NhZ2VQYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbGVjdCBGcmllbmQgZm9yIGEgTW9kYWwgb3IgQ2hhdCBSb29tLlxyXG4gICAgc2V0U2VsZWN0ZWRGcmllbmRJRChzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG4gICAgZ2V0U2VsZWN0ZWRGcmllbmRJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEF1dGggU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgbG9naW5CeUVtYWlsKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9naW5CeUZhY2Vib29rKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIC8vIGRlZmF1bHRzIHRvIFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2dpbkJ5R29vZ2xlKCl7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFLFxyXG4gICAgICAgICAgICAvLyBPcHRpb25hbCBcclxuICAgICAgICAgICAgZ29vZ2xlT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGhvc3RlZERvbWFpbjogXCJjaGF0LWRlbW8tNWQzYTcuZmlyZWJhc2VhcHAuY29tXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIGNoZWNrRmlyc3RVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGWGtNNE1Od0szMGh0QlVndlc4dkpQRFJqNHFGMiUyRmltYWdlcyUyRmltZ19yYW5rX3MuanBnP2FsdD1tZWRpYSZ0b2tlbj1jZWI5OWI3OS04MzczLTRjNDctYjk3Yy03OWNkNzNiMTJmYzNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmlyc3QgdXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIoKTtcclxuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5pdCBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0QXV0aFVzZXIoKXtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0S2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgICAgIHVzZXJba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGhpc1VzZXIgPSB1c2VyO1xyXG4gICAgICAgIHRoaXMuYW5hbHl6ZVVzZXJMb2dpbih0aGlzLmF1dGh1c2VyLnVpZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBhbmFseXplVXNlckxvZ2luKGlkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYW5hbHl0aWNzLnNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKHRydWUpO1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5zZXRVc2VySWQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IGlkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFuYWx5dGljcyB1c2VySWQgc2V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRJRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRJRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7ICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGZyaWVuZElEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRGcmllbmQoZnJpZW5kKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZHNba2V5XSA9IGZyaWVuZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdldFVzZXJzQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpKTtcclxuICAgIH1cclxuICAgIHNldEZyaWVuZEFycmF5KCk6IHZvaWR7XHJcblx0XHR0aGlzLmZyaWVuZEFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldEZyaWVuZHMoKSk7XHJcblx0fVxyXG4gICAgc2V0Um9vbXMocm9vbUlEczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJvb21JRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxyb29tSURzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvcm9vbXMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb29tSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb29tKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PXJvb21JRHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1RoaXNVc2VyUm9vbUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyUGljdHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcbiAgICAgICAgdGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcblx0fVxyXG5cclxuICAgIHB1YmxpYyBqc29uVG9BcnJheShqc29uKXtcclxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICBpZihqc29uIT1udWxsKXtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4ganNvbil7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRKc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZEpzb25ba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRKc29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldEN1cnJlbnRVc2VyUGljdHVyZSgpe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy50aGlzVXNlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ2JhY2tncm91bmRQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsnYmFja2dyb3VuZFBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgICAgIHRoaXMuYXV0aHVzZXIgPT0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iXX0=