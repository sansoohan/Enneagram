"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var application_1 = require("tns-core-modules/application");
var imagePicker = require("nativescript-imagepicker");
var fs = require("tns-core-modules/file-system");
var mergeJSON = require("merge-json");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.thisUser = {};
        this.friends = {};
        this.rooms = {};
    }
    //----------------------------Profile Section------------------------------------------
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
    FirebaseService.prototype.uploadFile = function (filePath, remotePath) {
        firebase.getCurrentUser().then(function (user) {
            // now upload the file with either of the options below:
            firebase.storage.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: '/users/' + user.uid + remotePath,
                // option 1: a file-system module File object
                localFile: fs.File.fromPath(filePath),
                // option 2: a full file path (ignored if 'localFile' is set)
                localFullPath: filePath,
                // get notified of file upload progress
                onProgress: function (status) {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                }
            }).then(function (uploadedFile) {
                console.log("File uploaded: " + JSON.stringify(uploadedFile));
            }, function (error) {
                console.log("File upload error: " + error);
            });
        });
    };
    //----------------------------Chat Section------------------------------------------
    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    FirebaseService.prototype.syncRoom = function (room_id) {
        var _this = this;
        firebase.addValueEventListener(function (result) {
            var room = room_id;
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoom(room, result.value);
        }, "/rooms/" + room_id + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (room_id, messages) {
        this.rooms[room_id]['messages'] = messages;
        if (room_id == this.selectedRoomID) {
            this.selectedRoomMessageArray = this.jsonToArray(messages);
            this.sortMessageArrayWithTimeStamp(this.selectedRoomMessageArray);
            console.log(this.selectedRoomMessageArray.length);
        }
        // console.log(this.rooms);
    };
    FirebaseService.prototype.sortMessageArrayWithTimeStamp = function (messageArray) {
        if (messageArray == null) {
            return null;
        }
        messageArray.sort(function (a, b) {
            var message_a;
            var message_b;
            for (var key in a) {
                message_a = a[key];
            }
            for (var key in b) {
                message_b = b[key];
            }
            return message_a['timestamp']['time'] - message_b['timestamp']['time'];
        });
    };
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    FirebaseService.prototype.pushFriendOnRoom = function (user, room_id) {
        var _this = this;
        for (var uid in user) {
            firebase.setValue('/rooms/' + room_id + "/room_users/" + uid, user[uid]).then(function (result2) {
                _this.pushRoomIDOnUser(user, room_id);
            });
        }
    };
    // This will ba activated when user create room with new friend.
    // User has a room but friend doesn't have room yet.
    FirebaseService.prototype.generateRoom = function (user) {
        var _this = this;
        for (var uid in user) {
            var open_room = { room_users: "" };
            open_room['room_users'][uid] = user[uid];
            open_room['isOpen'] = true;
            open_room['openTime'] = new Date();
            open_room['closeTime'] = "";
            open_room['title'] = "";
            open_room['iconsrc'] = "";
            firebase.push('/rooms/', "").then(function (result) {
                firebase.setValue('/rooms/' + result.key, open_room).then(function (result2) {
                    _this.pushRoomIDOnUser(user, result.key);
                });
                _this.setGeneratedRoomID(result.key);
                console.log("created key: " + result.key); // Room ID
            });
        }
    };
    FirebaseService.prototype.pushRoomIDOnUser = function (user, room_id) {
        for (var uid in user) {
            firebase.setValue('/users/' + uid + '/user_rooms/' + room_id, { inRoom: true, join: new Date() }).then(function (result) {
                // this.pushUserIDOnRoom(uid);
            });
        }
    };
    // If there are some messages :
    FirebaseService.prototype.pushMessageOnRoom = function (room_id, user, message) {
        var message_pack = {};
        for (var uid in user) {
            message_pack['user'] = uid;
        }
        message_pack['message'] = message;
        message_pack['timestamp'] = new Date();
        firebase.push('/rooms/' + room_id + '/messages', message_pack).then(function (result) {
            console.log("created key: " + result.key); // Message_pack ID
        });
    };
    //----------------------------Blog Section------------------------------------------
    FirebaseService.prototype.generatePost = function (user, post_id, post) {
        var _this = this;
        var open_post = {};
        if (post == null) {
            open_post['isOpen'] = true;
            open_post['name'] = "";
            open_post['type'] = "";
            open_post['description'] = "";
            open_post['image'] = "";
            open_post['location'] = "";
            open_post['likes'] = "";
            open_post['comments'] = "";
            open_post['openTime'] = new Date();
            open_post['closeTime'] = "";
        }
        else {
            open_post = post;
        }
        for (var uid in user) {
            if (post_id == null) {
                firebase.push('/blogs/' + uid + '/posts', "").then(function (result) {
                    firebase.setValue('/blogs/' + uid + "/posts/" + result.key, open_post).then(function (result2) {
                        _this.pushPostIDOnUser(user, result.key);
                    });
                    console.log("created key: " + result.key); // Room ID
                });
            }
            else {
                open_post = post[post_id];
                firebase.setValue('/blogs/' + uid + "/posts/" + post_id, open_post).then(function (result2) {
                });
            }
        }
    };
    FirebaseService.prototype.pushPostIDOnUser = function (user, room_id) {
        for (var uid in user) {
            firebase.setValue('/users/' + uid + '/user_blogs/' + room_id, true).then(function (result) {
                // this.pushUserIDOnRoom(uid);
            });
        }
    };
    //----------------------------Auth Section------------------------------------------
    // make array type database and push data in array type database
    FirebaseService.prototype.pushInArrayDatabase = function (databaseOfArrayPath, pushData) {
        firebase.getCurrentUser().then(function (user) {
            firebase.push('/users/' + user.uid + databaseOfArrayPath, pushData).then(function (result) {
                console.log("created key: " + result.key);
            });
        });
    };
    // make data structure of value type database
    FirebaseService.prototype.makeStructureOfValueDatabase = function (databasePath, structure) {
        firebase.getCurrentUser().then(function (user) {
            firebase.setValue('/users/' + user.uid + databasePath, structure);
        });
    };
    // add attribute in value type database and update data in value type database
    FirebaseService.prototype.writeValueOfValueDatabase = function (databasePath, updateData) {
        firebase.getCurrentUser().then(function (user) {
            firebase.update('/users/' + user.uid + databasePath, updateData);
        });
    };
    // read data in value type database
    FirebaseService.prototype.readValueOfValueDatabase = function (databasePath) {
        firebase.getCurrentUser().then(function (user) {
            firebase.getValue('/users/' + user.uid + databasePath).then(function (result) {
                console.log(JSON.stringify(result));
            }).catch(function (error) { return console.log("Error: " + error); });
        });
    };
    // complex query
    FirebaseService.prototype.queryOnDatabase = function (databasePath) {
        var _this = this;
        firebase.getCurrentUser().then(function (user) {
            firebase.query(_this.onQueryEvent, 
            // '/users',
            '/users/' + user.uid + databasePath, {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously.
                // Only when true, this function will return the data in the promise as well!
                singleEvent: true,
                // order by company.country
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'test' // mandatory when type is 'child'
                },
                // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
                // use either a 'range'
                //range: {
                //    type: firebase.QueryRangeType.EQUAL_TO,
                //    value: 2000
                ///},
                // .. or 'chain' ranges like this:
                // ranges: [
                //   {
                //       type: firebase.QueryRangeType.START_AT,
                //       value: 1999
                //   },
                //   {
                //       type: firebase.QueryRangeType.END_AT,
                //       value: 2000
                //   }
                // ],
                // only the first 2 matches
                // (note that there's only 1 in this case anyway)
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 2
                }
            })
                .then(function (result) { return console.log(JSON.stringify(result)); })
                .catch(function (error) { return console.log("Error: " + error); });
            ;
        });
    };
    // query result
    FirebaseService.prototype.onQueryEvent = function (result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };
    ;
    FirebaseService.prototype.queryTest = function () {
        firebase.query(function (result) {
        }, '/users', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
                value: 'uid'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: 'ayQt5VfwwOhzZ7UEtPMXrHtimce2'
            },
        })
            .then(function (result) { return console.log(result.value['ayQt5VfwwOhzZ7UEtPMXrHtimce2']); })
            .catch(function (error) { return console.log("Error: " + error); });
        ;
    };
    // readUserName(){
    //     var userId = firebaseWeb.auth().currentUser.uid;
    //     return firebaseWeb.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //         var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //     });
    // }
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
    //----------------------------Init Section------------------------------------------
    // get currendUser
    FirebaseService.prototype.login = function (user) {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then(function (result) {
            _this.setCurrentUser();
            ApplicationSettings.setBoolean("authenticated", true);
            _this.routerExtensions.navigate(["/home"], { clearHistory: true });
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.setCurrentUser = function () {
        var _this = this;
        firebase.getCurrentUser().then(function (user) {
            _this.setAuthUser(user);
        });
    };
    FirebaseService.prototype.setAuthUser = function (user) {
        var _this = this;
        this.authuser = user;
        // set thisUser
        firebase.getValue('/users/' + user.uid).then(function (result) {
            _this.setThisUser(result);
        }).catch(function (error) { return console.log("Error: " + error); });
        // set friends
        firebase.getValue('/users/' + user.uid + '/friends').then(function (result) {
            var result_keys = [];
            for (var k in result.value) {
                result_keys.push(k);
            }
            _this.setFriends(result_keys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
        // set rooms
        firebase.getValue('/users/' + this.authuser.uid + '/user_rooms').then(function (result) {
            var result_keys = [];
            for (var k in result.value) {
                result_keys.push(k);
            }
            _this.setRooms(result_keys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
    };
    FirebaseService.prototype.setThisUser = function (result) {
        var key = result.key;
        var value = result.value;
        var user = {};
        user[key] = value;
        this.thisUser = JSON.parse(JSON.stringify(user));
        console.log(this.thisUser);
    };
    FirebaseService.prototype.setFriends = function (friend_ids) {
        var _this = this;
        console.log(friend_ids);
        var count = 0;
        for (var i = 0; i < friend_ids.length; i++) {
            firebase.query(function (result) { }, '/users', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                    value: 'uid'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: friend_ids[i]
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 3000
                }
            })
                .then(function (result) {
                _this.addFriend(result.value);
                count++;
                if (count == friend_ids.length) {
                    // this.setFriends(friend_ids);
                    // var friend = {};
                    // friend['H6U4ZRvLW6SL8RmIX18TYmg1hhV2'] = this.getFriends()['H6U4ZRvLW6SL8RmIX18TYmg1hhV2'];
                    // this.pushFriendOnRoom(this.thisUser,"-LPLVNVF2yM1MzyG-D71");
                    _this.pushMessageOnRoom("-LPLVNVF2yM1MzyG-D71", _this.thisUser, "hi");
                    _this.setFriendArray();
                    // this.generatePost(this.thisUser);
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
    FirebaseService.prototype.setRooms = function (room_ids) {
        var _this = this;
        console.log(room_ids);
        var count = 0;
        for (var i = 0; i < room_ids.length; i++) {
            firebase.query(function (result) { }, '/rooms', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                    value: 'uid'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: room_ids[i]
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 3000
                }
            })
                .then(function (result) {
                // console.log(result);
                _this.addRoom(result.value);
                count++;
                if (count == room_ids.length) {
                    // console.log(this.rooms);
                    _this.setRoomArray();
                }
            })
                .catch(function (error) { return console.log("Error: " + error); });
            ;
        }
    };
    FirebaseService.prototype.addRoom = function (room) {
        for (var key in room) {
            this.rooms[key] = room[key];
            this.syncRoom(key);
        }
    };
    FirebaseService.prototype.setRoomArray = function () {
        this.roomArray = this.jsonToArray(this.getRooms());
    };
    FirebaseService.prototype.jsonToArray = function (json) {
        if (json != null) {
            var array = [];
            for (var key in json) {
                var child_json = {};
                child_json[key] = json[key];
                array.push(child_json);
            }
            return array;
        }
        else {
            return null;
        }
    };
    FirebaseService.prototype.setGeneratedRoomID = function (generatedRoomID) {
        this.generatedRoomID = generatedRoomID;
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
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsc0NBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFFNUQsNERBQTREO0FBRzVELHNEQUF3RDtBQUl4RCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUNqRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUU7QUFFdkM7SUFvQkkseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFuQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7SUFvQm5CLENBQUM7SUFFRCx1RkFBdUY7SUFFdkYsbUNBQVMsR0FBVCxVQUFVLFNBQWdCO1FBQTFCLGlCQXdCRjtRQXZCQSxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ2xDLElBQUksRUFBRSxRQUFRO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsT0FBTzthQUNOLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFqQixDQUFpQixDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQ3JDLFVBQUMsYUFBeUI7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFnQjtnQkFDdEQsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7Z0JBQzFDLENBQUM7Z0JB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QUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBamxCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBc0JxQix5QkFBZ0I7T0FyQnJDLGVBQWUsQ0FrbEIzQjtJQUFELHNCQUFDO0NBQUEsQUFsbEJELElBa2xCQztBQWxsQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0XCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxuXHJcbmltcG9ydCB7IEFQUExJQ0FUSU9OX01PRFVMRV9QUk9WSURFUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvYXBwbGljYXRpb25fbW9kdWxlXCI7XHJcbmltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG52YXIgbWVyZ2VKU09OID0gcmVxdWlyZShcIm1lcmdlLWpzb25cIikgO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xyXG4gICAgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7XHJcbiAgICBwdWJsaWMgdGhpc1VzZXI6IGFueSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBmcmllbmRzID0ge307XHJcbiAgICBwcml2YXRlIHJvb21zID0ge307XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlZFJvb21JRDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyByb29tQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21Vc2VyczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuXHJcblx0cHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUHJvZmlsZSBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcGlja0ltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBpbWFnZVBpY2tlci5jcmVhdGUoe1xyXG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG5cdH1cclxuXHJcblx0Z2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0LCBpbWFnZVR5cGU6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHQvLyBpZiAoaW9zKSB7IC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGb2xkZXJQYXRoID0ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIoXCJuc2ltYWdlcGlja2VyXCIpLnBhdGg7XHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKHRlbXBGb2xkZXJQYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBvcHRpb25zID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zLm5ldygpO1xyXG5cclxuXHRcdFx0Ly8gXHRvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLnZlcnNpb24gPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNWZXJzaW9uLkN1cnJlbnQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5kZWxpdmVyeU1vZGUgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNEZWxpdmVyeU1vZGUuSGlnaFF1YWxpdHlGb3JtYXQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5uZXR3b3JrQWNjZXNzQWxsb3dlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gXHRQSEltYWdlTWFuYWdlci5kZWZhdWx0TWFuYWdlcigpLnJlcXVlc3RJbWFnZURhdGFGb3JBc3NldE9wdGlvbnNSZXN1bHRIYW5kbGVyKGltYWdlQXNzZXQuaW9zLCBvcHRpb25zLCAobnNEYXRhOiBOU0RhdGEsIGRhdGFVVEk6IHN0cmluZywgb3JpZW50YXRpb246IFVJSW1hZ2VPcmllbnRhdGlvbiwgaW5mbzogTlNEaWN0aW9uYXJ5PGFueSwgYW55PikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0aWYgKGluZm8udmFsdWVGb3JLZXkoUEhJbWFnZVJlc3VsdElzSW5DbG91ZEtleSkpIHtcclxuXHRcdFx0Ly8gXHRcdFx0Ly8gSW1hZ2UgaXMgaW4gaUNsb3VkXHJcblx0XHRcdC8vIFx0XHRcdGlmIChuc0RhdGEpIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgTk9UIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fVxyXG5cdFx0XHQvLyBcdFx0fVxyXG5cclxuXHRcdFx0Ly8gXHRcdG5zRGF0YS53cml0ZVRvRmlsZUF0b21pY2FsbHkodGVtcEZpbGVQYXRoLCB0cnVlKTtcclxuXHRcdFx0Ly8gXHRcdHRoaXMuY3VycmVudEltYWdlRmlsZVBhdGggPSB0ZW1wRmlsZVBhdGg7XHJcblx0XHRcdC8vIFx0XHRyZXNvbHZlKHRlbXBGaWxlUGF0aCk7XHJcblx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdC8vIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmRyb2lkKSB7IC8vIHJldHVybiBpbWFnZUFzc2V0LmFuZHJvaWQsIHNpbmNlIGl0J3MgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVzb2x2ZShpbWFnZUFzc2V0LmFuZHJvaWQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIHJlc29sdmUobnVsbCk7XHJcblx0XHR9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBsb2FkRmlsZShmaWxlUGF0aDpzdHJpbmcsIHJlbW90ZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIC8vIG5vdyB1cGxvYWQgdGhlIGZpbGUgd2l0aCBlaXRoZXIgb2YgdGhlIG9wdGlvbnMgYmVsb3c6XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJy91c2Vycy8nICsgdXNlci51aWQgKyByZW1vdGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgoZmlsZVBhdGgpLFxyXG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxyXG4gICAgICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHVwbG9hZGVkRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeSh1cGxvYWRlZEZpbGUpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DaGF0IFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBJZiBzb21lb25lIHB1c2ggbWVzc2FnZShpbmNsdWRlIHlvdSksIGZ1bmN0aW9uKHJlc3VsdCkgd2lsbCBiZSBhY3RpdmF0ZWQuXHJcbiAgICAvLyBJdCBjaGFuZ2UgdGhlIG1lc3NhZ2VzIGFycmF5LlxyXG4gICAgc3luY1Jvb20ocm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcm9vbSA9IHJvb21faWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb20ocm9vbSwgcmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi9yb29tcy9cIityb29tX2lkK1wiL21lc3NhZ2VzXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20ocm9vbV9pZDpzdHJpbmcsIG1lc3NhZ2VzOmFueSl7XHJcbiAgICAgICAgdGhpcy5yb29tc1tyb29tX2lkXVsnbWVzc2FnZXMnXSA9IG1lc3NhZ2VzO1xyXG4gICAgICAgIGlmKHJvb21faWQgPT0gdGhpcy5zZWxlY3RlZFJvb21JRCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheShtZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgIH1cclxuICAgIHNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKG1lc3NhZ2VBcnJheSl7XHJcbiAgICAgICAgaWYobWVzc2FnZUFycmF5PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2E7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2I7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGEpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9hID0gYVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGIpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9iID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlX2FbJ3RpbWVzdGFtcCddWyd0aW1lJ10gLSBtZXNzYWdlX2JbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBtZXNzYWdlIDpcclxuICAgIC8vIFRoaXMgd2lsbCBiYSBhY3RpdmF0ZWQgd2hlbiB1c2VyIHNlbmQgYSBtZXNzYWdlIHRvIGZyaWVuZCBhZnRlciBpbnZpdGUgZnJpZW5kLlxyXG4gICAgcHVzaEZyaWVuZE9uUm9vbSh1c2VyOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbV9pZCtcIi9yb29tX3VzZXJzL1wiK3VpZCwgdXNlclt1aWRdKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJvb21faWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgY3JlYXRlIHJvb20gd2l0aCBuZXcgZnJpZW5kLlxyXG4gICAgLy8gVXNlciBoYXMgYSByb29tIGJ1dCBmcmllbmQgZG9lc24ndCBoYXZlIHJvb20geWV0LlxyXG4gICAgZ2VuZXJhdGVSb29tKHVzZXI6YW55KXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgdmFyIG9wZW5fcm9vbSA9IHtyb29tX3VzZXJzOlwiXCJ9O1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ3Jvb21fdXNlcnMnXVt1aWRdID0gdXNlclt1aWRdO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ2lzT3BlbiddID0gdHJ1ZTtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsndGl0bGUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnaWNvbnNyYyddID0gXCJcIjtcclxuICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycsIFwiXCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyZXN1bHQua2V5LCBvcGVuX3Jvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdlbmVyYXRlZFJvb21JRChyZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdXNoUm9vbUlET25Vc2VyKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX3Jvb21zLycrcm9vbV9pZCwge2luUm9vbTp0cnVlLCBqb2luOm5ldyBEYXRlKCl9KS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hVc2VySURPblJvb20odWlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlIHNvbWUgbWVzc2FnZXMgOlxyXG4gICAgcHVzaE1lc3NhZ2VPblJvb20ocm9vbV9pZDpzdHJpbmcsIHVzZXI6YW55LCBtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VfcGFjayA9IHt9O1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBtZXNzYWdlX3BhY2tbJ3VzZXInXSA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWydtZXNzYWdlJ10gPSBtZXNzYWdlO1xyXG4gICAgICAgIG1lc3NhZ2VfcGFja1sndGltZXN0YW1wJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nK3Jvb21faWQrJy9tZXNzYWdlcycsIG1lc3NhZ2VfcGFjaykudGhlbihyZXN1bHQgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBNZXNzYWdlX3BhY2sgSURcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CbG9nIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBnZW5lcmF0ZVBvc3QodXNlcjphbnksIHBvc3RfaWQ6c3RyaW5nLCBwb3N0OmFueSl7XHJcbiAgICAgICAgdmFyIG9wZW5fcG9zdCA9IHt9O1xyXG4gICAgICAgIGlmKHBvc3Q9PW51bGwpe1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2lzT3BlbiddID0gdHJ1ZTtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WyduYW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ3R5cGUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnZGVzY3JpcHRpb24nXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnaW1hZ2UnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnbG9jYXRpb24nXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnbGlrZXMnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnY29tbWVudHMnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnb3BlblRpbWUnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3QgPSBwb3N0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGlmKHBvc3RfaWQ9PW51bGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL2Jsb2dzLycrdWlkKycvcG9zdHMnLCBcIlwiKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9ibG9ncy8nK3VpZCtcIi9wb3N0cy9cIityZXN1bHQua2V5LCBvcGVuX3Bvc3QpLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFBvc3RJRE9uVXNlcih1c2VyLCByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBvcGVuX3Bvc3QgPSBwb3N0W3Bvc3RfaWRdO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9ibG9ncy8nK3VpZCtcIi9wb3N0cy9cIitwb3N0X2lkLCBvcGVuX3Bvc3QpLnRoZW4ocmVzdWx0MiA9PiB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdXNoUG9zdElET25Vc2VyKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX2Jsb2dzLycrcm9vbV9pZCwgdHJ1ZSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoVXNlcklET25Sb29tKHVpZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BdXRoIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBtYWtlIGFycmF5IHR5cGUgZGF0YWJhc2UgYW5kIHB1c2ggZGF0YSBpbiBhcnJheSB0eXBlIGRhdGFiYXNlXHJcbiAgICBwdXNoSW5BcnJheURhdGFiYXNlKGRhdGFiYXNlT2ZBcnJheVBhdGg6c3RyaW5nLCBwdXNoRGF0YTphbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlT2ZBcnJheVBhdGgsIHB1c2hEYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtlIGRhdGEgc3RydWN0dXJlIG9mIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIG1ha2VTdHJ1Y3R1cmVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgc3RydWN0dXJlOiBhbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHN0cnVjdHVyZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGF0dHJpYnV0ZSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlIGFuZCB1cGRhdGUgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICB3cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHVwZGF0ZURhdGE6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHVwZGF0ZURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyByZWFkIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgcmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb21wbGV4IHF1ZXJ5XHJcbiAgICBxdWVyeU9uRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUV2ZW50LFxyXG4gICAgICAgICAgICAgICAgLy8gJy91c2VycycsXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHdoZW4gdHJ1ZSwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgZGF0YSBpbiB0aGUgcHJvbWlzZSBhcyB3ZWxsIVxyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0ZXN0JyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGNvbXBhbmllcyAnc2luY2UnIGEgY2VydGFpbiB5ZWFyIChUZWxlcmlrJ3MgdmFsdWUgaXMgMjAwMCwgd2hpY2ggaXMgaW1hZ2luYXJ5IGJ0dylcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZWl0aGVyIGEgJ3JhbmdlJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vL30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4gb3IgJ2NoYWluJyByYW5nZXMgbGlrZSB0aGlzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByYW5nZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5TVEFSVF9BVCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMTk5OVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FTkRfQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHRoZSBmaXJzdCAyIG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyAobm90ZSB0aGF0IHRoZXJlJ3Mgb25seSAxIGluIHRoaXMgY2FzZSBhbnl3YXkpXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8vIHF1ZXJ5IHJlc3VsdFxyXG4gICAgb25RdWVyeUV2ZW50KHJlc3VsdCkge1xyXG4gICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgcXVlcnkgcmV0dXJucyAxIG1hdGNoIGF0IGEgdGltZVxyXG4gICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XHJcbiAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBxdWVyeVRlc3QoKXtcclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZVsnYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMiddKSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gcmVhZFVzZXJOYW1lKCl7XHJcbiAgICAvLyAgICAgdmFyIHVzZXJJZCA9IGZpcmViYXNlV2ViLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZpcmViYXNlV2ViLmRhdGFiYXNlKCkucmVmKCcvdXNlcnMvJyArIHVzZXJJZCkub25jZSgndmFsdWUnKS50aGVuKGZ1bmN0aW9uKHNuYXBzaG90KSB7XHJcbiAgICAvLyAgICAgICAgIHZhciB1c2VybmFtZSA9IChzbmFwc2hvdC52YWwoKSAmJiBzbmFwc2hvdC52YWwoKS51c2VybmFtZSkgfHwgJ0Fub255bW91cyc7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmVnaXN0ZXIoZW1haWwsIHBhc3N3ZCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdDphbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW5pdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gZ2V0IGN1cnJlbmRVc2VyXHJcbiAgICBsb2dpbih1c2VyKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q3VycmVudFVzZXIoKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIodXNlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRBdXRoVXNlcih1c2VyOmZpcmViYXNlLlVzZXIpe1xyXG4gICAgICAgIHRoaXMuYXV0aHVzZXIgPSB1c2VyO1xyXG4gICAgICAgIC8vIHNldCB0aGlzVXNlclxyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRUaGlzVXNlcihyZXN1bHQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgZnJpZW5kc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgJy9mcmllbmRzJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRzKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCByb29tc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgJy91c2VyX3Jvb21zJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIHNldFRoaXNVc2VyKHJlc3VsdDphbnkpe1xyXG4gICAgICAgIHZhciBrZXkgPSByZXN1bHQua2V5O1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcclxuICAgICAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgICAgIHVzZXJba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGhpc1VzZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRoaXNVc2VyKTtcclxuICAgIH1cclxuICAgIHNldEZyaWVuZHMoZnJpZW5kX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZyaWVuZF9pZHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7ICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGZyaWVuZF9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy91c2VycycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZF9pZHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZyaWVuZChyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1mcmllbmRfaWRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRGcmllbmRzKGZyaWVuZF9pZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBmcmllbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmcmllbmRbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXSA9IHRoaXMuZ2V0RnJpZW5kcygpWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoRnJpZW5kT25Sb29tKHRoaXMudGhpc1VzZXIsXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hNZXNzYWdlT25Sb29tKFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIiwgdGhpcy50aGlzVXNlciwgXCJoaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZyaWVuZEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5nZW5lcmF0ZVBvc3QodGhpcy50aGlzVXNlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRGcmllbmQoZnJpZW5kKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZHNba2V5XSA9IGZyaWVuZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdldFVzZXJzQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpKTtcclxuICAgIH1cclxuICAgIHNldEZyaWVuZEFycmF5KCk6IHZvaWR7XHJcblx0XHR0aGlzLmZyaWVuZEFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldEZyaWVuZHMoKSk7XHJcblx0fVxyXG4gICAgc2V0Um9vbXMocm9vbV9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICBjb25zb2xlLmxvZyhyb29tX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHJvb21faWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvcm9vbXMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb29tX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvb20ocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09cm9vbV9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRSb29tKHJvb20pe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHJvb20pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW2tleV0gPSByb29tW2tleV07XHJcbiAgICAgICAgICAgIHRoaXMuc3luY1Jvb20oa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcblx0XHR0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuXHR9XHJcblxyXG5cclxuICAgIHB1YmxpYyBqc29uVG9BcnJheShqc29uKXtcclxuICAgICAgICBpZihqc29uIT1udWxsKXtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkX2pzb24gPSB7fTtcclxuICAgICAgICAgICAgICAgIGNoaWxkX2pzb25ba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRfanNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRHZW5lcmF0ZWRSb29tSUQoZ2VuZXJhdGVkUm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICB9XHJcbn1cclxuIl19