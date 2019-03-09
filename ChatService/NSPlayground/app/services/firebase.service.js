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
    FirebaseService.prototype.searchQueries = function (type, otheruserEnneagramNums, originLatitude, originLongitude, distanceMeter) {
        this.postSearchResultArray = [];
        for (var i = 0; i < otheruserEnneagramNums.length; i++) {
            // console.log("type"+otheruserEnneagramNums[i]);
            this.searchPost(type, otheruserEnneagramNums[i], originLatitude, originLongitude, distanceMeter);
        }
    };
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
    FirebaseService.prototype.updatePost = function (postData) {
        firebaseWeb.firestore()
            .collection("posts")
            .add(postData).then(function (documentRef) {
            // console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.getPost = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .get().then(function (document) {
            // console.log(document);
            if (!document.exists) {
                console.log('Post is not exist!');
                return null;
            }
            else {
                console.log(document.data());
                return document.data();
            }
        });
    };
    FirebaseService.prototype.toggleLikeOnComment = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentID = 'NAE7GN4EoSJaVNkFQCBJ';
        var commentData = {};
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        var likeCollection = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments").doc(commentID)
            .collection("likes");
        this.toggleData(likeCollection, commentData);
    };
    FirebaseService.prototype.toggleLikeOnPost = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentData = {};
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        var likeCollection = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("likes");
        this.toggleData(likeCollection, commentData);
    };
    FirebaseService.prototype.toggleFavoriteOnPost = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentData = {};
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        var favoriteCollection = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("favorites");
        this.toggleData(favoriteCollection, commentData);
    };
    FirebaseService.prototype.toggleData = function (collection, data) {
        var _this = this;
        collection.doc(this.authuser.uid)
            .get().then(function (document) {
            // console.log(document);
            if (!document.exists) {
                _this.toggleOn(collection, data);
            }
            else {
                _this.toggleOff(collection);
            }
        });
    };
    FirebaseService.prototype.toggleOn = function (collection, data) {
        var _this = this;
        collection.doc(this.authuser.uid)
            .set(data).then(function () {
            console.log('marked ID : ' + _this.authuser.uid);
        });
    };
    FirebaseService.prototype.toggleOff = function (collection) {
        var _this = this;
        collection.doc(this.authuser.uid)
            .delete().then(function () {
            console.log('unmarked ID :' + _this.authuser.uid);
        });
    };
    FirebaseService.prototype.addLike = function (a, b) {
    };
    FirebaseService.prototype.getLikeOnComment = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentID = 'NAE7GN4EoSJaVNkFQCBJ';
        firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments").doc(commentID)
            .collection("likes")
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data());
            });
            return querySnapshot.docSnapshots.length;
        });
    };
    FirebaseService.prototype.getLikeOnPost = function () {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("likes")
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data());
            });
            return querySnapshot.docSnapshots.length;
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
        // this.notifyToUser();
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
                    // this.testAddComment();
                    _this.toggleLikeOnComment();
                    _this.toggleLikeOnPost();
                    _this.toggleFavoriteOnPost();
                    _this.getLikeOnComment();
                    _this.getPost();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsOERBQWlFO0FBRWpFLHNDQUF1RDtBQUN2RCxzREFBK0Q7QUFDL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFFeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUF3Q0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUF2Q3ZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFXWCx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFNdEMsK0JBQTBCLEdBQUcsa0xBQWtMLENBQUM7UUFDaE4sa0NBQTZCLEdBQUcsNExBQTRMLENBQUM7UUFLN04sMEJBQXFCLEdBQWUsRUFBRSxDQUFDO1FBR3RDLG9CQUFlLEdBQVcseUNBQXlDLENBQUM7UUFDcEUsd0JBQW1CLEdBQVcsd0NBQXdDLENBQUM7UUFDdkUsMEJBQXFCLEdBQVcsd0NBQXdDLENBQUM7UUFDekUsOEJBQXlCLEdBQVcsd0NBQXdDLENBQUM7UUFDN0UsZ0JBQVcsR0FBVyxzQkFBc0IsQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxzQkFBc0IsQ0FBQztJQU0zRCxDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLHdDQUFjLEdBQWQsVUFBZSxZQUFvQjtRQUMvQixRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUMsSUFBSSxDQUNIO1lBQ0ksa0RBQWtEO1FBQ3RELENBQUMsQ0FDSixD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QUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO0lBQzFDLENBQUM7SUFDTSw0Q0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNNLG9DQUFVLEdBQWpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQztZQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7O1lBQ0ksT0FBTyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLGtDQUFRLEdBQWY7UUFDSSxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQjs7WUFDSSxPQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0NBQU0sR0FBYjtRQUNJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzFCLENBQUM7SUF6L0JRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0EwQ3FCLHlCQUFnQjtPQXpDckMsZUFBZSxDQTAvQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQTEvQkQsSUEwL0JDO0FBMS9CWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBhdXRodXNlcjogZmlyZWJhc2UuVXNlcjsgICAgXHJcbiAgICBwdWJsaWMgdGhpc1VzZXI6IGFueSA9IHt9O1xyXG4gICAgcHVibGljIHRoaXNVc2VyTmFtZSA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdGhpc1VTZXJFbWFpbCA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZHMgPSB7fTtcclxuICAgIHB1YmxpYyByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZEFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvb21BcnJheTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21UaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgbWVzc2FnZVVwZGF0ZWRUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMID0gXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRnVzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmc/YWx0PW1lZGlhJnRva2VuPWI3NDlkNTNjLWExZTUtNDQ2Zi05YWZhLWU4ZjdlZTUyODMzM1wiO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRm1vdW50YWluLXJhbmdlLW9uLWJsYWNrLWJhY2tncm91bmQucG5nP2FsdD1tZWRpYSZ0b2tlbj0yNmNlNWZlYi0wOThkLTQ1MDAtOTE0YS1kNzM4ODAzNTI1MzlcIjtcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuXHJcbiAgICB0ZXN0RGF0YTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgcG9zdFNlYXJjaFJlc3VsdEFycmF5OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQb3N0SUQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIGFuZHJvaWRCYW5uZXJJZDogc3RyaW5nID0gXCJcdGNhLWFwcC1wdWItMzk0MDI1NjA5OTk0MjU0NC8yOTM0NzM1NzE2XCI7XHJcbiAgICBwcml2YXRlIGFuZHJvaWRCYW5uZXJUZXN0SWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi0zOTQwMjU2MDk5OTQyNTQ0LzYzMDA5NzgxMTFcIjtcclxuICAgIHByaXZhdGUgYW5kcm9pZEludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItNTQ0NTc3OTc1MDE1NDU3Ni8yMTQ1NDIwMDYxXCI7XHJcbiAgICBwcml2YXRlIGFuZHJvaWRJbnRlcnN0aXRpYWxUZXN0SWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi0zOTQwMjU2MDk5OTQyNTQ0LzYzMDA5NzgxMTFcIjtcclxuICAgIHByaXZhdGUgaW9zQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1SUlJSL1RUVFRcIjtcclxuICAgIHByaXZhdGUgaW9zSW50ZXJzdGl0aWFsSWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1HR0dHL0hISEhcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBBbmFseXppbmcgVXNlciBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgYW5hbHl0aWNzQ291bnQoYWN0aXZpdHlOYW1lOiBzdHJpbmcpOiB2b2lke1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5sb2dFdmVudCh7XHJcbiAgICAgICAgICAgIGtleTogYWN0aXZpdHlOYW1lXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaXJlYmFzZSBBbmFseXRpY3MgZXZlbnQgbG9nZ2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVXBkYXRpbmcgUHJvZmlsZSBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRUaGlzVXNlclByb2ZpbGUoZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3Byb2ZpbGUnLCBkYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBOZXcgUG9zdGluZyBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIHNlYXJjaFF1ZXJpZXMoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgb3RoZXJ1c2VyRW5uZWFncmFtTnVtczpudW1iZXJbXSxcclxuICAgICAgICBvcmlnaW5MYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZU1ldGVyOm51bWJlcixcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPG90aGVydXNlckVubmVhZ3JhbU51bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZVwiK290aGVydXNlckVubmVhZ3JhbU51bXNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBvc3QodHlwZSxvdGhlcnVzZXJFbm5lYWdyYW1OdW1zW2ldLG9yaWdpbkxhdGl0dWRlLG9yaWdpbkxvbmdpdHVkZSxkaXN0YW5jZU1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWFyY2hQb3N0KFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIG90aGVydXNlckVubmVhZ3JhbU51bTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VNZXRlcjpudW1iZXJcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IE9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSID0gMTExMDAwO1xyXG5cclxuICAgICAgICB2YXIgbWF4TGF0aXR1ZGVEZWdyZWUgPSBvcmlnaW5MYXRpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5MYXRpdHVkZURlZ3JlZSA9IG9yaWdpbkxhdGl0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4TGF0aXR1ZGVEZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhMYXRpdHVkZURlZ3JlZSA9IDkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW5MYXRpdHVkZURlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5MYXRpdHVkZURlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heExvbmdpdHVkZURlZ3JlZSA9IG9yaWdpbkxvbmdpdHVkZSArIGRpc3RhbmNlTWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luTGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICB2YXIgbWluTG9uZ2l0dWRlRGVncmVlID0gb3JpZ2luTG9uZ2l0dWRlIC0gZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5MYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSAtIG1pbkxvbmdpdHVkZURlZ3JlZSA+PSAzNjApe1xyXG4gICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heExvbmdpdHVkZURlZ3JlZSA+PSAxODApe1xyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gbWF4TG9uZ2l0dWRlRGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbkxvbmdpdHVkZURlZ3JlZSA8PSAtMTgwKXtcclxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1pbkxvbmdpdHVkZURlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWluTG9uZ2l0dWRlRGVncmVlID4gbWF4TG9uZ2l0dWRlRGVncmVlKXtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBtaW5Mb25naXR1ZGVEZWdyZWU7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1heExvbmdpdHVkZURlZ3JlZTtcclxuICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbGF0XCIsbWluTGF0aXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xhdFwiLG9yaWdpbkxhdGl0dWRlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xhdFwiLG1heExhdGl0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1pbl9sb25cIixtaW5Mb25naXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xvblwiLG9yaWdpbkxvbmdpdHVkZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtYXhfbG9uXCIsbWF4TG9uZ2l0dWRlRGVncmVlKTtcclxuICAgICAgICBcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAud2hlcmUoXCJudW1iZXJcIiwgXCI9PVwiLCBvdGhlcnVzZXJFbm5lYWdyYW1OdW0pXHJcbiAgICAgICAgLndoZXJlKFwidHlwZVwiLCBcIj09XCIsIHR5cGUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPD1cIiwgbWF4TG9uZ2l0dWRlRGVncmVlKVxyXG4gICAgICAgIC53aGVyZShcImxvbmdpdHVkZVwiLCBcIj49XCIsIG1pbkxvbmdpdHVkZURlZ3JlZSlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkb2MuZGF0YSgpLmxhdGl0dWRlIDw9IG1heExhdGl0dWRlRGVncmVlICYmIGRvYy5kYXRhKCkubGF0aXR1ZGUgPj0gbWluTGF0aXR1ZGVEZWdyZWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBzZWFyY2hlZCBkb2MgOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2RvYy5pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlkIGluIHNlYXJjaFJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2xpa2VfY291bnQnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciB1c2VySWQgaW4gc2VhcmNoUmVzdWx0W2lkXVsnbGlrZXMnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydsaWtlX2NvdW50J10rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydpc19saWtlJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJJZCtcIiBPa1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfbGlrZSddID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZCBpbiBzZWFyY2hSZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHVzZXJJZCBpbiBzZWFyY2hSZXN1bHRbaWRdWydmYXZvcml0ZXMnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmF1dGh1c2VyLnVpZCA9PT0gdXNlcklkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbaWRdWydpc19mYXZvcml0ZSddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfZmF2b3JpdGUnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaWQgaW4gc2VhcmNoUmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnY29tbWVudF9jb3VudCddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2lkXVsnaXNfY29tbWVudCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRzJ109PT1udWxsIHx8IHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRzJ109PT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtpZF1bJ2NvbW1lbnRzJ10gPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IodmFyIGk9MDsgaTxzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50cyddLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzZWFyY2hSZXN1bHRbaWRdWydjb21tZW50X2NvdW50J10rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5wdXNoKHNlYXJjaFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyUG9zdHModXNlcklEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJJRCwgXCI9PVwiLCBcIm93bmVyXCIpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2RvYy5pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBvc3QocG9zdERhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC5hZGQocG9zdERhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgcG9zdCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVQb3N0KHBvc3REYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuYWRkKHBvc3REYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UG9zdCgpOiBmaXJlc3RvcmUuRG9jdW1lbnREYXRhfHZvaWQge1xyXG4gICAgICAgIHZhciBwb3N0SUQgPSAnNzF0akQ1dzRUcGZES0d0NHpOWjQnO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5nZXQoKS50aGVuKGRvY3VtZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZXhpc3RzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGlzIG5vdCBleGlzdCEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmRhdGEoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZUxpa2VPbkNvbW1lbnQoKTogdm9pZCB7Ly9wb3N0SUQ6c3RyaW5nLCBjb21tZW50SUQ6IHN0cmluZywgZGF0YTogYW55KXtcclxuICAgICAgICB2YXIgcG9zdElEID0gJzcxdGpENXc0VHBmREtHdDR6Tlo0JztcclxuICAgICAgICB2YXIgY29tbWVudElEID0gJ05BRTdHTjRFb1NKYVZOa0ZRQ0JKJztcclxuICAgICAgICB2YXIgY29tbWVudERhdGEgPSB7fTtcclxuICAgICAgICBjb21tZW50RGF0YVsncm9sZXMnXSA9IHt9O1xyXG4gICAgICAgIGNvbW1lbnREYXRhWydyb2xlcyddW3RoaXMuYXV0aHVzZXIudWlkXSA9ICdjb21tZW50ZXInO1xyXG4gICAgICAgIHZhciBsaWtlQ29sbGVjdGlvbiA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIikuZG9jKGNvbW1lbnRJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImxpa2VzXCIpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRGF0YShsaWtlQ29sbGVjdGlvbiwgY29tbWVudERhdGEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvZ2dsZUxpa2VPblBvc3QoKTogdm9pZCB7Ly9wb3N0SUQ6c3RyaW5nLCBkYXRhOiBhbnkpe1xyXG4gICAgICAgIHZhciBwb3N0SUQgPSAnNzF0akQ1dzRUcGZES0d0NHpOWjQnO1xyXG4gICAgICAgIHZhciBjb21tZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGNvbW1lbnREYXRhWydyb2xlcyddID0ge307XHJcbiAgICAgICAgY29tbWVudERhdGFbJ3JvbGVzJ11bdGhpcy5hdXRodXNlci51aWRdID0gJ2NvbW1lbnRlcic7XHJcbiAgICAgICAgdmFyIGxpa2VDb2xsZWN0aW9uID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0SUQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJsaWtlc1wiKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZURhdGEobGlrZUNvbGxlY3Rpb24sIGNvbW1lbnREYXRhKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b2dnbGVGYXZvcml0ZU9uUG9zdCgpOiB2b2lkIHsvL3Bvc3RJRDpzdHJpbmcsIGRhdGE6IGFueSl7XHJcbiAgICAgICAgdmFyIHBvc3RJRCA9ICc3MXRqRDV3NFRwZkRLR3Q0ek5aNCc7XHJcbiAgICAgICAgdmFyIGNvbW1lbnREYXRhID0ge307XHJcbiAgICAgICAgY29tbWVudERhdGFbJ3JvbGVzJ10gPSB7fTtcclxuICAgICAgICBjb21tZW50RGF0YVsncm9sZXMnXVt0aGlzLmF1dGh1c2VyLnVpZF0gPSAnY29tbWVudGVyJztcclxuICAgICAgICB2YXIgZmF2b3JpdGVDb2xsZWN0aW9uID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0SUQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJmYXZvcml0ZXNcIik7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEYXRhKGZhdm9yaXRlQ29sbGVjdGlvbiwgY29tbWVudERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlRGF0YShjb2xsZWN0aW9uOiBmaXJlYmFzZS5maXJlc3RvcmUuQ29sbGVjdGlvblJlZmVyZW5jZSwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29sbGVjdGlvbi5kb2ModGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAgICAgLmdldCgpLnRoZW4oZG9jdW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5leGlzdHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVPbihjb2xsZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVPZmYoY29sbGVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdG9nZ2xlT24oY29sbGVjdGlvbjogZmlyZWJhc2UuZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbGxlY3Rpb24uZG9jKHRoaXMuYXV0aHVzZXIudWlkKVxyXG4gICAgICAgIC5zZXQoZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXJrZWQgSUQgOiAnICsgdGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB0b2dnbGVPZmYoY29sbGVjdGlvbjogZmlyZWJhc2UuZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UpOiB2b2lkIHtcclxuICAgICAgICBjb2xsZWN0aW9uLmRvYyh0aGlzLmF1dGh1c2VyLnVpZClcclxuICAgICAgICAuZGVsZXRlKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndW5tYXJrZWQgSUQgOicrIHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZExpa2UoYSxiKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExpa2VPbkNvbW1lbnQoKSA6QXJyYXk8YW55Pnx2b2lkIHtcclxuICAgICAgICB2YXIgcG9zdElEID0gJzcxdGpENXc0VHBmREtHdDR6Tlo0JztcclxuICAgICAgICB2YXIgY29tbWVudElEID0gJ05BRTdHTjRFb1NKYVZOa0ZRQ0JKJztcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpLmRvYyhjb21tZW50SUQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJsaWtlc1wiKVxyXG4gICAgICAgIC5nZXQoKS50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvYy5kYXRhKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5U25hcHNob3QuZG9jU25hcHNob3RzLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMaWtlT25Qb3N0KCkgOm51bWJlcnx2b2lkIHtcclxuICAgICAgICB2YXIgcG9zdElEID0gJzcxdGpENXc0VHBmREtHdDR6Tlo0JztcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImxpa2VzXCIpXHJcbiAgICAgICAgLmdldCgpLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jLmRhdGEoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlTbmFwc2hvdC5kb2NTbmFwc2hvdHMubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gZGVsZXRlX2RhdGFfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiTEFcIilcclxuICAgIC8vICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgICAgY2FwaXRhbDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLmRlbGV0ZSgpLFxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyA9PT0gUGFydGlhbCBBZGQgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIHVwbG9hZGluZyBjb21tZW50KSA9PT1cclxuICAgIC8vIGFycmF5VW5pb24oKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBwdWJsaWMgdXBkYXRlQ29tbWVudChwb3N0SUQsIGNvbW1lbnRJRCwgY29tbWVudERhdGEpOiB2b2lkIHtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpLmRvYyhjb21tZW50SUQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50RGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZWxlY3RlZFBvc3QoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yKHZhciBpPTAgO2k8dGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgcG9zdElEIGluIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRQb3N0SUQgPT09IHBvc3RJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGaXJlc3RvcmUgcXVlcmllcyBmb3IgUG9zdGluZyAobm90IHVzZWQgeWV0KSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyA9PT0gUmV3cml0ZSAoVGhpcyB3aWxsIGJlIHVzZWQgYXMgdXBkYXRpbmcgcG9zdCk9PT1cclxuICAgIC8vIHVwZGF0ZV9kYXRhKCl7XHJcbiAgICAvLyAgICAgY29uc3QgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJTRlwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBwb3B1bGF0aW9uOiA4NjAwMDEsXHJcbiAgICAvLyAgICAgICAgIHVwZGF0ZVRpbWVzdGFtcDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLnNlcnZlclRpbWVzdGFtcCgpLFxyXG4gICAgLy8gICAgICAgICBsb2NhdGlvbjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuR2VvUG9pbnQoNC4zNCwgNS42NylcclxuICAgIC8vICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJTRiBwb3B1bGF0aW9uIHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gPT09IERlbGV0ZSBBbGwgKFRoaXMgd2lsbCBiZSB1c2VkIGFzIGRlbGV0aW5nIHBvc3QpID09PVxyXG4gICAgLy8gZGVsZXRlX2RvY3VtZW50X2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTsgICAgICAgIFxyXG4gICAgLy8gICAgIHNhbkZyYW5jaXNjb0RvY3VtZW50LmRlbGV0ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJTRiB3YXMgZXJhc2VkIGZyb20gdGhlIGZhY2Ugb2YgdGhlIGVhcnRoIVwiKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gPT09IFBhcnRpYWwgUmVtb3ZlIChUaGlzIHdpbGwgYmUgdXNlZCBhcyBkZWxldGluZyBjb21tZW50KSA9PT1cclxuICAgIC8vIGRlbGV0ZV9kYXRhX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIkxBXCIpXHJcbiAgICAvLyAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICAgIGNhcGl0YWw6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5kZWxldGUoKSxcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gPT09IFBhcnRpYWwgQWRkIChUaGlzIHdpbGwgYmUgdXNlZCBhcyB1cGxvYWRpbmcgY29tbWVudCkgPT09XHJcbiAgICAvLyBhcnJheVVuaW9uKCl7XHJcbiAgICAvLyAgICAgY29uc3QgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAvLyAgICAgLmRvYyhcImxvcGtETEc2VDdqcFR1WTVvTzZ4XCIpXHJcbiAgICAvLyAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgIGJlaGF2aW9yOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUuRmllbGRWYWx1ZSgpLmFycmF5VW5pb24oW3tcInJlZFwiOiBcImJsdWVcIn1dKVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQaWN0dXJlIFVwbG9hZCBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gMS4gd2hlbiB1c2VyIHNlbGVjdCBwaWN0dXJlLCB0aGUgcGljdHVyZSB1cGxvYWRlZCBpbnRvIHN0b3JhZ2UuXHJcbiAgICBwdWJsaWMgcGlja0ltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXHJcblx0XHR9KTtcclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGltYWdlVHlwZSxmaWxlUGF0aCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cdHByaXZhdGUgZ2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0LCBpbWFnZVR5cGU6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHQvLyBpZiAoaW9zKSB7IC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGb2xkZXJQYXRoID0ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIoXCJuc2ltYWdlcGlja2VyXCIpLnBhdGg7XHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKHRlbXBGb2xkZXJQYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBvcHRpb25zID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zLm5ldygpO1xyXG5cclxuXHRcdFx0Ly8gXHRvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLnZlcnNpb24gPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNWZXJzaW9uLkN1cnJlbnQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5kZWxpdmVyeU1vZGUgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNEZWxpdmVyeU1vZGUuSGlnaFF1YWxpdHlGb3JtYXQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5uZXR3b3JrQWNjZXNzQWxsb3dlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gXHRQSEltYWdlTWFuYWdlci5kZWZhdWx0TWFuYWdlcigpLnJlcXVlc3RJbWFnZURhdGFGb3JBc3NldE9wdGlvbnNSZXN1bHRIYW5kbGVyKGltYWdlQXNzZXQuaW9zLCBvcHRpb25zLCAobnNEYXRhOiBOU0RhdGEsIGRhdGFVVEk6IHN0cmluZywgb3JpZW50YXRpb246IFVJSW1hZ2VPcmllbnRhdGlvbiwgaW5mbzogTlNEaWN0aW9uYXJ5PGFueSwgYW55PikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0aWYgKGluZm8udmFsdWVGb3JLZXkoUEhJbWFnZVJlc3VsdElzSW5DbG91ZEtleSkpIHtcclxuXHRcdFx0Ly8gXHRcdFx0Ly8gSW1hZ2UgaXMgaW4gaUNsb3VkXHJcblx0XHRcdC8vIFx0XHRcdGlmIChuc0RhdGEpIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgTk9UIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fVxyXG5cdFx0XHQvLyBcdFx0fVxyXG5cclxuXHRcdFx0Ly8gXHRcdG5zRGF0YS53cml0ZVRvRmlsZUF0b21pY2FsbHkodGVtcEZpbGVQYXRoLCB0cnVlKTtcclxuXHRcdFx0Ly8gXHRcdHRoaXMuY3VycmVudEltYWdlRmlsZVBhdGggPSB0ZW1wRmlsZVBhdGg7XHJcblx0XHRcdC8vIFx0XHRyZXNvbHZlKHRlbXBGaWxlUGF0aCk7XHJcblx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdC8vIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmRyb2lkKSB7IC8vIHJldHVybiBpbWFnZUFzc2V0LmFuZHJvaWQsIHNpbmNlIGl0J3MgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRyZXNvbHZlKGltYWdlQXNzZXQuYW5kcm9pZCk7XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgLy8gcmVzb2x2ZShudWxsKTtcclxuXHRcdH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGVUeXBlOnN0cmluZywgZmlsZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZmlsZUNsYXNzO1xyXG4gICAgICAgIHZhciBmaWxlUGF0aFNwbGl0ZWQgPSBmaWxlUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoU3BsaXRlZFtmaWxlUGF0aFNwbGl0ZWQubGVuZ3RoLTFdO1xyXG4gICAgICAgIGlmKGZpbGVUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2Jsb2cvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmlsZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvcHJvZmlsZS9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9iYWNrZ3JvdW5kL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgZmlsZUNsYXNzICsgZmlsZU5hbWUsXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICBsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgoZmlsZVBhdGgpLFxyXG4gICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeSh1cGxvYWRlZEZpbGUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsZVVSTChmaWxlVHlwZSwgdGhpcy5hdXRodXNlci51aWQsIHVwbG9hZGVkRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMi4gZ2V0IHRoZSBwaWN0dXJlIFVSTCBmb3IgdXBsb2FkaW5nIHRoZSBibG9nLlxyXG4gICAgcHJpdmF0ZSBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENoYXR0aW5nIFNlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBMaXN0ZW4gQ2hhdCBSb29tcyBmcm9tIENoYXQgRGF0YWJhc2UuXHJcbiAgICBwcml2YXRlIHN5bmNUaGlzVXNlclJvb21MaXN0KCk6IHZvaWR7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb20ocmVzdWx0LmtleSk7XHJcbiAgICAgICAgfSwgXCIvdXNlcnMvXCIgKyB0aGlzLmF1dGh1c2VyLnVpZCArIFwiL3VzZXJfcm9vbXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVSb29tKHVwZGF0ZWRSb29tSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvcm9vbXMvJyArIHVwZGF0ZWRSb29tSUQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaXN0ZW4gQ2hhdCBNZXNzYWdlcyBmcm9tIENoYXQgRGF0YWJhc2UuXHJcbiAgICBwcml2YXRlIHN5bmNSb29tTWVzc2FnZXMocm9vbUlEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21JRCwgcmVzdWx0LmtleSAscmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi9yb29tcy9cIityb29tSUQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVSb29tTWVzc2FnZXMocm9vbUlEOnN0cmluZywgbWVzc2FnZUlEOmFueSwgbWVzc2FnZTphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ10gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddW21lc3NhZ2VJRF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB2YXIgbWVzc2FnZVRvQWRkID0ge307XHJcbiAgICAgICAgbWVzc2FnZVRvQWRkW21lc3NhZ2VJRF0gPSB0aGlzLnJvb21zW3Jvb21JRF1bJ21lc3NhZ2VzJ11bbWVzc2FnZUlEXVxyXG4gICAgICAgIGlmKHJvb21JRCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkucHVzaChtZXNzYWdlVG9BZGQpO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5KTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZFRvZ2dsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgfVxyXG4gICAgc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAobWVzc2FnZUFycmF5KXtcclxuICAgICAgICBpZihtZXNzYWdlQXJyYXk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VBO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZUI7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGEpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUEgPSBhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYil7XHJcbiAgICAgICAgICAgICAgICBEYXRlXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQiA9IGJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZV9iID0gbWVzc2FnZUJbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2EgPSBtZXNzYWdlQVsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWVfYSAtIHRpbWVfYjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21JRCtcIi9yb29tX3VzZXJzL1wiK3VpZCwgdXNlclt1aWRdKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJvb21JRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBOZXcgUm9vbSBvbiBDaGF0IERhdGFiYXNlLlxyXG4gICAgZ2VuZXJhdGVSb29tV2l0aFNlbGVjdGVkRnJpZW5kcyh1c2VyOmFueSwgZnJpZW5kOmFueSl7XHJcbiAgICAgICAgdmFyIGZyaWVuZElEO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgZnJpZW5kSUQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVzZXJJRDtcclxuICAgICAgICBmb3IodmFyIGlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICB1c2VySUQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgcm9vbSBleGlzdCBiZWZvcmUgZ2VuZXJhdGUuXHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIG5vdCBleGlzdCwgY3JlYXRlIG5ldyByb29tLlxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnZhbHVlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibm8gcm9vbSB3aXRoIGZyaWVuZElEOiBcIiArIGZyaWVuZElEKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BlblJvb20gPSB7cm9vbVVzZXJzOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUm9vbVsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Sb29tWydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUm9vbVsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgb3BlblJvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgZnJpZW5kLCByZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIoZnJpZW5kLCB1c2VyLCByZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdlbmVyYXRlZFJvb21JRChyZXN1bHQyLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdDIua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgZXhpc3QsIGRvbid0IG1ha2UgbmV3IG9uZS5cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHJvb21JRCBpbiByZXN1bHRbJ3ZhbHVlJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJleGlzdCByb29tOiBcIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlcklEICsgJy91c2VyX3Jvb21zJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5WQUxVRSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRJRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIC8vU2V0IFVzZXIgQWNjZXNzIGZvciBDaGF0IFJvb20gb24gQ2hhdCBEYXRhYmFzZS5cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIGZyaWVuZDphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyUm9vbSA9IHt9O1xyXG4gICAgICAgIHVzZXJSb29tWydpblJvb20nXSA9IHRydWU7XHJcbiAgICAgICAgdXNlclJvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJSb29tWydsZWF2ZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgZm9yKHZhciBmcmllbmRJRCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZElEXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3RpdGxlJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsnbWVzc2FnZUljb24nXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3VzZXJOYW1lJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCByb29tIGFjY2VzcyBhdGhlbnRpY2F0aW9uIG9uIHVzZXIgZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX3Jvb21zLycrcm9vbUlELCBmcmllbmRJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgY2FuIHdyaXRlIG9uIGNoYXQgcm9vbVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tSUQrJ1UvJyt1aWQsIHVzZXJSb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMocm9vbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBNZXNzYWdlIG9uIENoYXQgRGF0YWJhc2UuKE90aGVyIHVzZXJzIGFyZSBsaXN0ZW5pbmcgQ2hhdCBEYXRhYmFzZSlcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21JRDpzdHJpbmcsIHVzZXI6YW55LCBtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VQYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VQYWNrWydtZXNzYWdlJ10gPSBtZXNzYWdlO1xyXG4gICAgICAgIG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbUlEKycvbWVzc2FnZXMnLCBtZXNzYWdlUGFjaykudGhlbihyZXN1bHQgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBNZXNzYWdlX3BhY2sgSURcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZWxlY3QgRnJpZW5kIGZvciBhIE1vZGFsIG9yIENoYXQgUm9vbS5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZEZyaWVuZElEKHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRGcmllbmRJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEF1dGggU2VjdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyByZWdpc3RlcihlbWFpbCwgcGFzc3dkKTogUHJvbWlzZTxzdHJpbmd8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdDphbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5CeUVtYWlsKHVzZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxyXG4gICAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2dpbkJ5RmFjZWJvb2soKTogdm9pZCB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXHJcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIC8vIGRlZmF1bHRzIHRvIFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2dpbkJ5R29vZ2xlKCk6IHZvaWQge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRSxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgXHJcbiAgICAgICAgICAgIGdvb2dsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBob3N0ZWREb21haW46IFwiY2hhdC1kZW1vLTVkM2E3LmZpcmViYXNlYXBwLmNvbVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldEN1cnJlbnRVc2VyKCk6IHZvaWQge1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIHByaXZhdGUgY2hlY2tGaXJzdFVzZXIoKTogdm9pZCB7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL2ZpcnN0dXNlciUyRmltYWdlcyUyRm1vdW50YWluLXJhbmdlLW9uLWJsYWNrLWJhY2tncm91bmQucG5nP2FsdD1tZWRpYSZ0b2tlbj0yNmNlNWZlYi0wOThkLTQ1MDAtOTE0YS1kNzM4ODAzNTI1MzlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmlyc3QgdXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXNlciBva1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIoKTtcclxuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5pdCBTZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIHNldEF1dGhVc2VyKCl7XHJcbiAgICAgICAgLy8gc2V0IHRoaXNVc2VyXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoaXNVc2VyKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCBmcmllbmRzXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL2ZyaWVuZHMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRLZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRzKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IHJvb21zXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3VzZXJfcm9vbXMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRLZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tcyhyZXN1bHRLZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHRoaXMubm90aWZ5VG9Vc2VyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFRoaXNVc2VyKHJlc3VsdDphbnkpe1xyXG4gICAgICAgIHZhciBrZXkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5rZXkpKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5hbmFseXplVXNlckxvZ2luKHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRoaXNVc2VyKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYW5hbHl6ZVVzZXJMb2dpbihpZDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5zZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBmaXJlYmFzZS5hbmFseXRpY3Muc2V0VXNlcklkKHtcclxuICAgICAgICAgICAgdXNlcklkOiBpZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBbmFseXRpY3MgdXNlcklkIHNldFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc2V0RnJpZW5kcyhmcmllbmRJRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRJRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7ICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGZyaWVuZElEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHByaXZhdGUgc2V0Um9vbXMocm9vbUlEczogc3RyaW5nW10pOiB2b2lkeyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyb29tSURzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbUlEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbUlEc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNUaGlzVXNlclJvb21MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlclBpY3R1cmUgKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50ZXN0QWRkQ29tbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTGlrZU9uQ29tbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTGlrZU9uUG9zdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRmF2b3JpdGVPblBvc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExpa2VPbkNvbW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBvc3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkUm9vbShyb29tKTogdm9pZHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFJvb21BcnJheSgpOiB2b2lke1xyXG4gICAgICAgIHRoaXMucm9vbUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldFJvb21zKCkpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbik6IEFycmF5PGFueT57XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkSnNvbiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hpbGRKc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkSnNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHNldEN1cnJlbnRVc2VyUGljdHVyZSgpOiB2b2lke1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy50aGlzVXNlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ2JhY2tncm91bmRQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsnYmFja2dyb3VuZFBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGhpc1VzZXJbaWRdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXSAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMID0gdGhpcy50aGlzVXNlcltpZF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZyk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHZW5lcmF0ZWRSb29tSUQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGcmllbmRzKCk6IGFueSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCk6IGFueSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcclxuICAgICAgICBmaXJlYmFzZS5sb2dvdXQoKTtcclxuICAgICAgICB0aGlzLmF1dGh1c2VyID09IG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19