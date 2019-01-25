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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsOERBQWlFO0FBQ2pFLHNDQUEyQztBQUMzQyxzREFBK0Q7QUFDL0QsNERBQTREO0FBSTVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFnQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEvQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFXWCx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFNdEMsK0JBQTBCLEdBQUcsa0xBQWtMLENBQUM7UUFDaE4sa0NBQTZCLEdBQUcsNExBQTRMLENBQUM7UUFLN04sMEJBQXFCLEdBQWUsRUFBRSxDQUFDO0lBTTlDLENBQUM7SUFFRCxvRUFBb0U7SUFDcEUsd0NBQWMsR0FBZCxVQUFlLFlBQW9CO1FBQy9CLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDSSxrREFBa0Q7UUFDdEQsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsMkZBQTJGO0lBQzNGLDRDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzNFLE9BQU8s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QixDQUFDO0lBcjVCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBa0NxQix5QkFBZ0I7T0FqQ3JDLGVBQWUsQ0FzNUIzQjtJQUFELHNCQUFDO0NBQUEsQUF0NUJELElBczVCQztBQXQ1QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcblxyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB0aGlzVXNlck5hbWUgPSBcIlwiOyAgICBcclxuICAgIHB1YmxpYyB0aGlzVVNlckVtYWlsID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHVibGljIHJvb21zID0ge307XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyBtZXNzYWdlVXBkYXRlZFRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vZmlyc3R1c2VyJTJGaW1hZ2VzJTJGdXNlci1hdmF0YXItbWFpbi1waWN0dXJlLnBuZz9hbHQ9bWVkaWEmdG9rZW49Yjc0OWQ1M2MtYTFlNS00NDZmLTlhZmEtZThmN2VlNTI4MzMzXCI7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkwgPSBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vZmlyc3R1c2VyJTJGaW1hZ2VzJTJGbW91bnRhaW4tcmFuZ2Utb24tYmxhY2stYmFja2dyb3VuZC5wbmc/YWx0PW1lZGlhJnRva2VuPTI2Y2U1ZmViLTA5OGQtNDUwMC05MTRhLWQ3Mzg4MDM1MjUzOVwiO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG5cclxuICAgIHRlc3REYXRhOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBwb3N0U2VhcmNoUmVzdWx0QXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBvc3RJRDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQW5hbHl6aW5nIFVzZXIgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGFuYWx5dGljc0NvdW50KGFjdGl2aXR5TmFtZTogc3RyaW5nKTogdm9pZHtcclxuICAgICAgICBmaXJlYmFzZS5hbmFseXRpY3MubG9nRXZlbnQoe1xyXG4gICAgICAgICAgICBrZXk6IGFjdGl2aXR5TmFtZVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgQW5hbHl0aWNzIGV2ZW50IGxvZ2dlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVwZGF0aW5nIFByb2ZpbGUgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0VGhpc1VzZXJQcm9maWxlKGRhdGEpe1xyXG4gICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgJy9wcm9maWxlJywgZGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTmV3IFBvc3RpbmcgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHNlYXJjaFBvc3QoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgb3RoZXJ1c2VyRW5uZWFncmFtTnVtOm51bWJlcixcclxuICAgICAgICBvcmlnaW5MYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZU1ldGVyOm51bWJlclxyXG4gICAgKXtcclxuICAgICAgICBjb25zdCBPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUiA9IDExMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIG1heExhdGl0dWRlRGVncmVlID0gb3JpZ2luTGF0aXR1ZGUgKyBkaXN0YW5jZU1ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKTtcclxuICAgICAgICB2YXIgbWluTGF0aXR1ZGVEZWdyZWUgPSBvcmlnaW5MYXRpdHVkZSAtIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIGlmKG1heExhdGl0dWRlRGVncmVlID49IDkwKXtcclxuICAgICAgICAgICAgbWF4TGF0aXR1ZGVEZWdyZWUgPSA5MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWluTGF0aXR1ZGVEZWdyZWUgPD0gLTkwKXtcclxuICAgICAgICAgICAgbWluTGF0aXR1ZGVEZWdyZWUgPSAtOTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBtYXhMb25naXR1ZGVEZWdyZWUgPSBvcmlnaW5Mb25naXR1ZGUgKyBkaXN0YW5jZU1ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbkxhdGl0dWRlICogKDE4MCAvIE1hdGguUEkpKSk7XHJcbiAgICAgICAgdmFyIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG9yaWdpbkxvbmdpdHVkZSAtIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luTGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICBpZihtYXhMb25naXR1ZGVEZWdyZWUgLSBtaW5Mb25naXR1ZGVEZWdyZWUgPj0gMzYwKXtcclxuICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gMTgwO1xyXG4gICAgICAgICAgICBtaW5Mb25naXR1ZGVEZWdyZWUgPSAtMTgwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihtYXhMb25naXR1ZGVEZWdyZWUgPj0gMTgwKXtcclxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZURlZ3JlZSA9IG1heExvbmdpdHVkZURlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihtaW5Mb25naXR1ZGVEZWdyZWUgPD0gLTE4MCl7XHJcbiAgICAgICAgICAgICAgICBtaW5Mb25naXR1ZGVEZWdyZWUgPSBtaW5Mb25naXR1ZGVEZWdyZWUgLSAzNjA7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtaW5Mb25naXR1ZGVEZWdyZWUgPiBtYXhMb25naXR1ZGVEZWdyZWUpe1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IG1pbkxvbmdpdHVkZURlZ3JlZTtcclxuICAgICAgICAgICAgbWluTG9uZ2l0dWRlRGVncmVlID0gbWF4TG9uZ2l0dWRlRGVncmVlO1xyXG4gICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1pbl9sYXRcIixtaW5MYXRpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbGF0XCIsb3JpZ2luTGF0aXR1ZGUpOyAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtYXhfbGF0XCIsbWF4TGF0aXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xvblwiLG1pbkxvbmdpdHVkZURlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbG9uXCIsb3JpZ2luTG9uZ2l0dWRlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sb25cIixtYXhMb25naXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcIm51bWJlclwiLCBcIj09XCIsIG90aGVydXNlckVubmVhZ3JhbU51bSlcclxuICAgICAgICAud2hlcmUoXCJ0eXBlXCIsIFwiPT1cIiwgdHlwZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI8PVwiLCBtYXhMb25naXR1ZGVEZWdyZWUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPj1cIiwgbWluTG9uZ2l0dWRlRGVncmVlKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRvYy5kYXRhKCkubGF0aXR1ZGUgPD0gbWF4TGF0aXR1ZGVEZWdyZWUgJiYgZG9jLmRhdGEoKS5sYXRpdHVkZSA+PSBtaW5MYXRpdHVkZURlZ3JlZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHNlYXJjaGVkIGRvYyA6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gc2VhcmNoUmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnbGlrZV9jb3VudCddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHVzZXJJZCBpbiBzZWFyY2hSZXN1bHRbaWRdWydsaWtlcyddKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2xpa2VfY291bnQnXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2xpa2UnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklkK1wiIE9rXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydpc19saWtlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIHNlYXJjaFJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdXNlcklkIGluIHNlYXJjaFJlc3VsdFtpZF1bJ2Zhdm9yaXRlcyddKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0aHVzZXIudWlkID09PSB1c2VySWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2lzX2Zhdm9yaXRlJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydpc19mYXZvcml0ZSddID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBzZWFyY2hSZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50X2NvdW50J10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydpc19jb21tZW50J10gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXT09PW51bGwgfHwgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXT09PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudHMnXSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcih2YXIgaT0wOyBpPHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRzJ10ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRfY291bnQnXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZWFyY2hRdWVyaWVzKFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIG90aGVydXNlckVubmVhZ3JhbU51bXM6bnVtYmVyW10sXHJcbiAgICAgICAgb3JpZ2luTGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VNZXRlcjpudW1iZXIsXHJcbiAgICApe1xyXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxvdGhlcnVzZXJFbm5lYWdyYW1OdW1zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInR5cGVcIitvdGhlcnVzZXJFbm5lYWdyYW1OdW1zW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQb3N0KHR5cGUsb3RoZXJ1c2VyRW5uZWFncmFtTnVtc1tpXSxvcmlnaW5MYXRpdHVkZSxvcmlnaW5Mb25naXR1ZGUsZGlzdGFuY2VNZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJQb3N0cyh1c2VySUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJJRCwgXCI9PVwiLCBcIm93bmVyXCIpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2RvYy5pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUG9zdChwb3N0RGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLmFkZChwb3N0RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBwb3N0IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29tbWVudChwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRGYXZvcml0ZShwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImZhdm9yaXRlc1wiKVxyXG4gICAgICAgIC5hZGQoY29tbWVudERhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgY29tbWVudCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZExpa2UocG9zdElELCBjb21tZW50RGF0YSl7XHJcbiAgICAgICAgLy8gdmFyIHBvc3RzID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAvLyAuY29sbGVjdGlvbihcInBvc3RzXCIpLiBkb2MocG9zdElEKVxyXG4gICAgICAgIC8vIC51cGRhdGUoe1xyXG4gICAgICAgIC8vICAgICBsaWtlOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbigpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gZGVsZXRlX2RhdGFfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiTEFcIilcclxuICAgIC8vICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgICAgY2FwaXRhbDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLmRlbGV0ZSgpLFxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyA9PT0gUGFydGlhbCBBZGQgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwbG9hZGluZyBjb21tZW50KSA9PT1cclxuICAgIC8vIGFycmF5VW5pb24oKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICB1cGRhdGVDb21tZW50KHBvc3RJRCwgY29tbWVudElELCBjb21tZW50RGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0SUQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjb21tZW50c1wiKS5kb2MoY29tbWVudElEKVxyXG4gICAgICAgIC51cGRhdGUoY29tbWVudERhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbW1lbnQgdXBkYXRlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZFBvc3QoKXtcclxuICAgICAgICBmb3IodmFyIGk9MCA7aTx0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZm9yKHZhciBwb3N0SUQgaW4gdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFBvc3RJRCA9PT0gcG9zdElEKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZpcmVzdG9yZSBxdWVyaWVzIGZvciBQb3N0aW5nIChub3QgdXNlZCB5ZXQpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vID09PSBSZXdyaXRlIChUaGlzIHdpbGwgYmUgdXNlZCBhcyB1cGRhdGluZyBwb3N0KT09PVxyXG4gICAgLy8gdXBkYXRlX2RhdGEoKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAvLyAgICAgLmRvYyhcIlNGXCIpXHJcbiAgICAvLyAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMSxcclxuICAgIC8vICAgICAgICAgdXBkYXRlVGltZXN0YW1wOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAvLyAgICAgICAgIGxvY2F0aW9uOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5HZW9Qb2ludCg0LjM0LCA1LjY3KVxyXG4gICAgLy8gICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHBvcHVsYXRpb24gdXBkYXRlZFwiKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyA9PT0gRGVsZXRlIEFsbCAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgZGVsZXRpbmcgcG9zdCkgPT09XHJcbiAgICAvLyBkZWxldGVfZG9jdW1lbnRfZnJvbV9jb2xsZWN0aW9uKCl7XHJcbiAgICAvLyAgICAgY29uc3Qgc2FuRnJhbmNpc2NvRG9jdW1lbnQgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIlNGXCIpOyAgICAgICAgXHJcbiAgICAvLyAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZGVsZXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlNGIHdhcyBlcmFzZWQgZnJvbSB0aGUgZmFjZSBvZiB0aGUgZWFydGghXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyA9PT0gUGFydGlhbCBSZW1vdmUgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIGRlbGV0aW5nIGNvbW1lbnQpID09PVxyXG4gICAgLy8gZGVsZXRlX2RhdGFfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiTEFcIilcclxuICAgIC8vICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgICAgY2FwaXRhbDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLmRlbGV0ZSgpLFxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyA9PT0gUGFydGlhbCBBZGQgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwbG9hZGluZyBjb21tZW50KSA9PT1cclxuICAgIC8vIGFycmF5VW5pb24oKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBpY3R1cmUgVXBsb2FkIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyAxLiB3aGVuIHVzZXIgc2VsZWN0IHBpY3R1cmUsIHRoZSBwaWN0dXJlIHVwbG9hZGVkIGludG8gc3RvcmFnZS5cclxuICAgIHBpY2tJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxyXG5cdFx0fSk7XHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZVR5cGUsZmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICAvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICB1cGxvYWRGaWxlKGZpbGVUeXBlOnN0cmluZywgZmlsZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZmlsZUNsYXNzO1xyXG4gICAgICAgIHZhciBmaWxlUGF0aFNwbGl0ZWQgPSBmaWxlUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoU3BsaXRlZFtmaWxlUGF0aFNwbGl0ZWQubGVuZ3RoLTFdO1xyXG4gICAgICAgIGlmKGZpbGVUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2Jsb2cvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmlsZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvcHJvZmlsZS9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9iYWNrZ3JvdW5kL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgZmlsZUNsYXNzICsgZmlsZU5hbWUsXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICBsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgoZmlsZVBhdGgpLFxyXG4gICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeSh1cGxvYWRlZEZpbGUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsZVVSTChmaWxlVHlwZSwgdGhpcy5hdXRodXNlci51aWQsIHVwbG9hZGVkRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMi4gZ2V0IHRoZSBwaWN0dXJlIFVSTCBmb3IgdXBsb2FkaW5nIHRoZSBibG9nLlxyXG4gICAgZ2V0RmlsZVVSTChpbWFnZVR5cGUsIHVpZCwgZmlsZU5hbWUpe1xyXG4gICAgICAgIHZhciBmaWxlVVJMO1xyXG4gICAgICAgIGlmKGltYWdlVHlwZSA9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9ibG9nL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL3Byb2ZpbGUvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLmdldERvd25sb2FkVXJsKHtcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwsIGNhbiBhbHNvIGJlIHBhc3NlZCBkdXJpbmcgaW5pdCgpIGFzICdzdG9yYWdlQnVja2V0JyBwYXJhbSBzbyB3ZSBjYW4gY2FjaGUgaXRcclxuICAgICAgICAgICAgLy8gYnVja2V0OiAnZ3M6Ly9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20nLFxyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHVpZCArIGZpbGVVUkwsXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXJsID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDaGF0dGluZyBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gTGlzdGVuIENoYXQgUm9vbXMgZnJvbSBDaGF0IERhdGFiYXNlLlxyXG4gICAgc3luY1RoaXNVc2VyUm9vbUxpc3QoKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyZXN1bHQua2V5KTtcclxuICAgICAgICB9LCBcIi91c2Vycy9cIiArIHRoaXMuYXV0aHVzZXIudWlkICsgXCIvdXNlcl9yb29tc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tKHVwZGF0ZWRSb29tSUQ6IHN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy9yb29tcy8nICsgdXBkYXRlZFJvb21JRCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbiBDaGF0IE1lc3NhZ2VzIGZyb20gQ2hhdCBEYXRhYmFzZS5cclxuICAgIHN5bmNSb29tTWVzc2FnZXMocm9vbUlEOiBzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmFkZENoaWxkRXZlbnRMaXN0ZW5lcihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tTWVzc2FnZXMocm9vbUlELCByZXN1bHQua2V5ICxyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21JRCtcIi9tZXNzYWdlc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tTWVzc2FnZXMocm9vbUlEOnN0cmluZywgbWVzc2FnZUlEOmFueSwgbWVzc2FnZTphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddW21lc3NhZ2VJRF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB2YXIgbWVzc2FnZVRvQWRkID0ge307XHJcbiAgICAgICAgbWVzc2FnZVRvQWRkW21lc3NhZ2VJRF0gPSB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ11bbWVzc2FnZUlEXVxyXG4gICAgICAgIGlmKHJvb21JRCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkucHVzaChtZXNzYWdlVG9BZGQpO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5KTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZFRvZ2dsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgfVxyXG4gICAgc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAobWVzc2FnZUFycmF5KXtcclxuICAgICAgICBpZihtZXNzYWdlQXJyYXk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VBO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZUI7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGEpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUEgPSBhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYil7XHJcbiAgICAgICAgICAgICAgICBEYXRlXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQiA9IGJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZV9iID0gbWVzc2FnZUJbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2EgPSBtZXNzYWdlQVsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWVfYSAtIHRpbWVfYjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21JRCtcIi9yb29tX3VzZXJzL1wiK3VpZCwgdXNlclt1aWRdKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJvb21JRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBOZXcgUm9vbSBvbiBDaGF0IERhdGFiYXNlLlxyXG4gICAgZ2VuZXJhdGVSb29tV2l0aFNlbGVjdGVkRnJpZW5kcyh1c2VyOmFueSwgZnJpZW5kOmFueSl7XHJcbiAgICAgICAgdmFyIGZyaWVuZElEO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgZnJpZW5kSUQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVzZXJJRDtcclxuICAgICAgICBmb3IodmFyIGlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICB1c2VySUQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgcm9vbSBleGlzdCBiZWZvcmUgZ2VuZXJhdGUuXHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIG5vdCBleGlzdCwgY3JlYXRlIG5ldyByb29tLlxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnZhbHVlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibm8gcm9vbSB3aXRoIGZyaWVuZElEOiBcIiArIGZyaWVuZElEKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BlblJvb20gPSB7cm9vbVVzZXJzOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUm9vbVsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUm9vbVsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgb3BlblJvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgZnJpZW5kLCByZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIoZnJpZW5kLCB1c2VyLCByZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdlbmVyYXRlZFJvb21JRChyZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdDIua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgZXhpc3QsIGRvbid0IG1ha2UgbmV3IG9uZS5cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHJvb21JRCBpbiByZXN1bHRbJ3ZhbHVlJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJleGlzdCByb29tOiBcIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlcklEICsgJy91c2VyX3Jvb21zJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5WQUxVRSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRJRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIC8vU2V0IFVzZXIgQWNjZXNzIGZvciBDaGF0IFJvb20gb24gQ2hhdCBEYXRhYmFzZS5cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIGZyaWVuZDphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyUm9vbSA9IHt9O1xyXG4gICAgICAgIHVzZXJSb29tWydpblJvb20nXSA9IHRydWU7XHJcbiAgICAgICAgdXNlclJvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJSb29tWydsZWF2ZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgZm9yKHZhciBmcmllbmRJRCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZElEXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3RpdGxlJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsnbWVzc2FnZUljb24nXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3VzZXJOYW1lJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCByb29tIGFjY2VzcyBhdGhlbnRpY2F0aW9uIG9uIHVzZXIgZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX3Jvb21zLycrcm9vbUlELCBmcmllbmRJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgY2FuIHdyaXRlIG9uIGNoYXQgcm9vbVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tSUQrJ1UvJyt1aWQsIHVzZXJSb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMocm9vbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBNZXNzYWdlIG9uIENoYXQgRGF0YWJhc2UuKE90aGVyIHVzZXJzIGFyZSBsaXN0ZW5pbmcgQ2hhdCBEYXRhYmFzZSlcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21JRDpzdHJpbmcsIHVzZXI6YW55LCBtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VQYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VQYWNrWydtZXNzYWdlJ10gPSBtZXNzYWdlO1xyXG4gICAgICAgIG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbUlEKycvbWVzc2FnZXMnLCBtZXNzYWdlUGFjaykudGhlbihyZXN1bHQgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBNZXNzYWdlX3BhY2sgSURcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZWxlY3QgRnJpZW5kIGZvciBhIE1vZGFsIG9yIENoYXQgUm9vbS5cclxuICAgIHNldFNlbGVjdGVkRnJpZW5kSUQoc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZElEID0gc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGVkRnJpZW5kSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBdXRoIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICByZWdpc3RlcihlbWFpbCwgcGFzc3dkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd2RcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luQnlFbWFpbCh1c2VyKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZ2luQnlGYWNlYm9vaygpe1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkZBQ0VCT09LLFxyXG4gICAgICAgICAgICAvLyBPcHRpb25hbFxyXG4gICAgICAgICAgICBmYWNlYm9va09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAvLyBkZWZhdWx0cyB0byBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cclxuICAgICAgICAgICAgICBzY29wZTogWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9naW5CeUdvb2dsZSgpe1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRSxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgXHJcbiAgICAgICAgICAgIGdvb2dsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBob3N0ZWREb21haW46IFwiY2hhdC1kZW1vLTVkM2E3LmZpcmViYXNlYXBwLmNvbVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudFVzZXIoKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aHVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlyc3RVc2VyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhpc3VzZXIgaXMgZmlyc3QgdXNlciwgbWFrZSBhIGZpcnN0dXNlciBkYXRhIGluIGZpcmViYXNlXHJcbiAgICBjaGVja0ZpcnN0VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdVc2VyRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwiZW5uZWFncmFtXCIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJiZWhhdmlvclwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtb3Rpb25cIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdGF0ZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRob3VnaHRcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImZyaWVuZHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInByb2ZpbGVcIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRlhrTTRNTndLMzBodEJVZ3ZXOHZKUERSajRxRjIlMkZpbWFnZXMlMkZpbWdfcmFua19zLmpwZz9hbHQ9bWVkaWEmdG9rZW49Y2ViOTliNzktODM3My00YzQ3LWI5N2MtNzljZDczYjEyZmMzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb3VudHJ5XCIgOiBcIktvcmVhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbWFpbFwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImludGVyZXN0XCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50cm9kdWNpbmdcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYW5ndWFnZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIiA6IHRoaXMuYXV0aHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlUGljc3JjXCIgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vZmlyc3R1c2VyJTJGaW1hZ2VzJTJGdXNlci1hdmF0YXItbWFpbi1waWN0dXJlLnBuZz9hbHQ9bWVkaWEmdG9rZW49Yjc0OWQ1M2MtYTFlNS00NDZmLTlhZmEtZThmN2VlNTI4MzMzXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInVzZXJfcm9vbXNcIiA6IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCwgbmV3VXNlckRhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZpcnN0IHVzZXIgb2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVzZXIgb2tcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEluaXQgU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHNldEF1dGhVc2VyKCl7XHJcbiAgICAgICAgLy8gc2V0IHRoaXNVc2VyXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoaXNVc2VyKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCBmcmllbmRzXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL2ZyaWVuZHMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRLZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRzKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IHJvb21zXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3VzZXJfcm9vbXMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRLZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tcyhyZXN1bHRLZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgc2V0VGhpc1VzZXIocmVzdWx0OmFueSl7XHJcbiAgICAgICAgdmFyIGtleSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0LmtleSkpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB7fTtcclxuICAgICAgICB1c2VyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRoaXNVc2VyID0gdXNlcjtcclxuICAgICAgICB0aGlzLmFuYWx5emVVc2VyTG9naW4odGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGhpc1VzZXIpO1xyXG4gICAgfVxyXG4gICAgYW5hbHl6ZVVzZXJMb2dpbihpZDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5zZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBmaXJlYmFzZS5hbmFseXRpY3Muc2V0VXNlcklkKHtcclxuICAgICAgICAgICAgdXNlcklkOiBpZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBbmFseXRpY3MgdXNlcklkIHNldFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldEZyaWVuZHMoZnJpZW5kSURzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJpZW5kSURzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRJRHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy91c2VycycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZElEc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PWZyaWVuZElEcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkRnJpZW5kKGZyaWVuZCl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRzW2tleV0gPSBmcmllbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRVc2Vyc0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHNldFJvb21zKHJvb21JRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyb29tSURzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbUlEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbUlEc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNUaGlzVXNlclJvb21MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlclBpY3R1cmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFJvb20ocm9vbSl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gcm9vbSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNba2V5XSA9IHJvb21ba2V5XTtcclxuICAgICAgICAgICAgdGhpcy5zeW5jUm9vbU1lc3NhZ2VzKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFJvb21BcnJheSgpe1xyXG4gICAgICAgIHRoaXMucm9vbUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldFJvb21zKCkpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkSnNvbiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hpbGRKc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkSnNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRDdXJyZW50VXNlclBpY3R1cmUoKXtcclxuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMudGhpc1VzZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnRoaXNVc2VyW2lkXVsncHJvZmlsZSddWydiYWNrZ3JvdW5kUGljc3JjJ10gIT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ2JhY2tncm91bmRQaWNzcmMnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnRoaXNVc2VyW2lkXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ10gIT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRHZW5lcmF0ZWRSb29tSUQoZ2VuZXJhdGVkUm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHZW5lcmF0ZWRSb29tSUQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGcmllbmRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZnJpZW5kcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJpZW5kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSb29tcygpIHtcclxuICAgICAgICBpZih0aGlzLnJvb21zICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb29tcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKXtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcclxuICAgICAgICBmaXJlYmFzZS5sb2dvdXQoKTtcclxuICAgICAgICB0aGlzLmF1dGh1c2VyID09IG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19