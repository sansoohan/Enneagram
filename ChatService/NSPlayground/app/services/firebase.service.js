"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var application_1 = require("tns-core-modules/application");
var image_source_1 = require("image-source");
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
            (new image_source_1.ImageSource()).fromAsset(selectedAsset).then(function (imageSource) {
                if (imageType === "blog") {
                    _this.currentBlogImageSource = imageSource;
                }
                if (imageType === "profile") {
                    _this.currentProfileImageSource = imageSource;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageSource = imageSource;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsc0NBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFFNUQsNERBQTREO0FBQzVELDZDQUEyQztBQUUzQyxzREFBd0Q7QUFJeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBRXZDO0lBdUJJLHlCQUNZLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBdEJ2QyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBdUJuQixDQUFDO0lBRUQsdUZBQXVGO0lBRXZGLG1DQUFTLEdBQVQsVUFBVSxTQUFnQjtRQUExQixpQkFtQ0Y7UUFsQ0EsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxJQUFJLEVBQUUsUUFBUTtTQUNkLENBQUMsQ0FBQztRQUVILE9BQU87YUFDTixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBQyxTQUFTLElBQUssT0FBQSxTQUFTLENBQUMsT0FBTyxDQUNyQyxVQUFDLGFBQXlCO1lBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBZ0I7Z0JBQ3RELEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDO29CQUN2QyxLQUFJLENBQUMsd0JBQXdCLEdBQUcsUUFBUSxDQUFDO2dCQUMxQyxDQUFDO2dCQUNjLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDO29CQUMxQyxLQUFJLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDO2dCQUM5QixDQUFDO2dCQUNoQixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxDQUFBLENBQUM7b0JBQ25DLEtBQUksQ0FBQyw4QkFBOEIsR0FBRyxRQUFRLENBQUM7Z0JBQ2hELENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsSUFBSSwwQkFBVyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVztnQkFDOUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUM7Z0JBQzNDLENBQUM7Z0JBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7b0JBQzNCLEtBQUksQ0FBQyx5QkFBeUIsR0FBRyxXQUFXLENBQUM7Z0JBQzlDLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQSxDQUFDO29CQUNuQyxLQUFJLENBQUMsNEJBQTRCLEdBQUcsV0FBVyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsRUF6QmtCLENBeUJsQixDQUNGLENBQUMsS0FBSyxDQUFDLFVBQUMsWUFBaUIsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsMENBQWdCLEdBQWhCLFVBQWlCLFVBQVUsRUFBRSxTQUFnQjtRQUE3QyxpQkEwQ0k7UUF6Q0gsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUMxQixpRUFBaUU7WUFDakUsK0VBQStFO1lBQy9FLHdFQUF3RTtZQUN4RSxnREFBZ0Q7WUFFaEQsK0JBQStCO1lBQy9CLDJEQUEyRDtZQUMzRCwrRUFBK0U7WUFDL0UseUNBQXlDO1lBRXpDLCtNQUErTTtZQUMvTSx1REFBdUQ7WUFDdkQsMkJBQTJCO1lBQzNCLG1CQUFtQjtZQUNuQiw2QkFBNkI7WUFDN0IsY0FBYztZQUNkLGlDQUFpQztZQUNqQyxPQUFPO1lBQ1AsTUFBTTtZQUVOLHNEQUFzRDtZQUN0RCw4Q0FBOEM7WUFDOUMsMkJBQTJCO1lBQzNCLE9BQU87WUFDUCxJQUFJO1lBRUssRUFBRSxDQUFDLENBQUMscUJBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUN2RCxDQUFDO2dCQUNiLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDO29CQUMzQixLQUFJLENBQUMsMkJBQTJCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDdkQsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxDQUFBLENBQUM7b0JBQ25DLEtBQUksQ0FBQyw4QkFBOEIsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUMxRCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELGlCQUFpQjtRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsUUFBZSxFQUFFLFVBQWlCO1FBQ3pDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLHdEQUF3RDtZQUN4RCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDeEIsK0VBQStFO2dCQUMvRSxjQUFjLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVTtnQkFDakQsNkNBQTZDO2dCQUM3QyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNyQyw2REFBNkQ7Z0JBQzdELGFBQWEsRUFBRSxRQUFRO2dCQUN2Qix1Q0FBdUM7Z0JBQ3ZDLFVBQVUsRUFBRSxVQUFTLE1BQU07b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3RFLENBQUM7YUFDSixDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsWUFBWTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxFQUNELFVBQVUsS0FBSztnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0ZBQW9GO0lBRXBGLDRFQUE0RTtJQUM1RSxnQ0FBZ0M7SUFDaEMsa0NBQVEsR0FBUixVQUFTLE9BQWM7UUFBdkIsaUJBY0M7UUFiRyxRQUFRLENBQUMscUJBQXFCLENBQUMsVUFBQSxNQUFNO1lBQ2pDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBRSxTQUFTLEdBQUMsT0FBTyxHQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDbEMsVUFBUyxlQUFlO1lBQ3RCLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLDhCQUE4QjtZQUN6RSwyRUFBMkU7UUFDN0UsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBQ0Qsb0NBQVUsR0FBVixVQUFXLE9BQWMsRUFBRSxRQUFZO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzNDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBQztZQUMvQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELDJCQUEyQjtJQUMvQixDQUFDO0lBQ0QsdURBQTZCLEdBQTdCLFVBQThCLFlBQVk7UUFDdEMsRUFBRSxDQUFBLENBQUMsWUFBWSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQzVCLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBSSxTQUFTLENBQUM7WUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNkLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2QsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMkJBQTJCO0lBQzNCLGlGQUFpRjtJQUNqRiwwQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBUSxFQUFFLE9BQWM7UUFBekMsaUJBTUM7UUFMRyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFDLE9BQU8sR0FBQyxjQUFjLEdBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87Z0JBQzNFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxvREFBb0Q7SUFDcEQsc0NBQVksR0FBWixVQUFhLElBQVE7UUFBckIsaUJBaUJDO1FBaEJHLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxTQUFTLEdBQUcsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLENBQUM7WUFDaEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ3BDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFDM0QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLFVBQVU7WUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUNELDBDQUFnQixHQUFoQixVQUFpQixJQUFRLEVBQUUsT0FBYztRQUNyQyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxjQUFjLEdBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsSUFBSSxJQUFJLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDL0YsOEJBQThCO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFHRCwrQkFBK0I7SUFDL0IsMkNBQWlCLEdBQWpCLFVBQWtCLE9BQWMsRUFBRSxJQUFRLEVBQUUsT0FBYztRQUN0RCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNqQixZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQy9CLENBQUM7UUFDRCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLE9BQU8sR0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxrQkFBa0I7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0ZBQW9GO0lBRXBGLHNDQUFZLEdBQVosVUFBYSxJQUFRLEVBQUUsT0FBYyxFQUFFLElBQVE7UUFBL0MsaUJBaUNDO1FBaENHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixFQUFFLENBQUEsQ0FBQyxJQUFJLElBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNYLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsR0FBRyxHQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO29CQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTzt3QkFDekUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVDLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLFVBQVU7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELElBQUksQ0FBQSxDQUFDO2dCQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxTQUFTLEdBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87Z0JBQzFFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQWdCLEdBQWhCLFVBQWlCLElBQVEsRUFBRSxPQUFjO1FBQ3JDLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUMsR0FBRyxHQUFDLGNBQWMsR0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDckUsOEJBQThCO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFRCxvRkFBb0Y7SUFFcEYsZ0VBQWdFO0lBQ2hFLDZDQUFtQixHQUFuQixVQUFvQixtQkFBMEIsRUFBRSxRQUFZO1FBQ3hELFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLHNEQUE0QixHQUE1QixVQUE2QixZQUFtQixFQUFFLFNBQWM7UUFDNUQsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDL0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOEVBQThFO0lBQzlFLG1EQUF5QixHQUF6QixVQUEwQixZQUFtQixFQUFFLFVBQWU7UUFDMUQsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDL0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsbUNBQW1DO0lBQ25DLGtEQUF3QixHQUF4QixVQUF5QixZQUFtQjtRQUN4QyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUMvQixRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLHlDQUFlLEdBQWYsVUFBZ0IsWUFBbUI7UUFBbkMsaUJBOENDO1FBN0NHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQ1YsS0FBSSxDQUFDLFlBQVk7WUFDakIsWUFBWTtZQUNaLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksRUFDbkM7Z0JBQ0ksZ0dBQWdHO2dCQUNoRyw2Q0FBNkM7Z0JBQzdDLDZFQUE2RTtnQkFDN0UsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLDJCQUEyQjtnQkFDM0IsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztvQkFDckMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxpQ0FBaUM7aUJBQ2xEO2dCQUNELDhGQUE4RjtnQkFDOUYsdUJBQXVCO2dCQUN2QixVQUFVO2dCQUNWLDZDQUE2QztnQkFDN0MsaUJBQWlCO2dCQUNqQixLQUFLO2dCQUNMLGtDQUFrQztnQkFFbEMsWUFBWTtnQkFDWixNQUFNO2dCQUNOLGdEQUFnRDtnQkFDaEQsb0JBQW9CO2dCQUNwQixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sOENBQThDO2dCQUM5QyxvQkFBb0I7Z0JBQ3BCLE1BQU07Z0JBQ04sS0FBSztnQkFFTCwyQkFBMkI7Z0JBQzNCLGlEQUFpRDtnQkFDakQsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2xDLEtBQUssRUFBRSxDQUFDO2lCQUNYO2FBQ0osQ0FDSjtpQkFDQSxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztpQkFDbkQsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztZQUFBLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsZUFBZTtJQUNmLHNDQUFZLEdBQVosVUFBYSxNQUFNO1FBQ2YsZ0RBQWdEO1FBQ2hELHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFFRixtQ0FBUyxHQUFUO1FBQ0ksUUFBUSxDQUFDLEtBQUssQ0FDVixVQUFTLE1BQU07UUFFZixDQUFDLEVBQ0QsUUFBUSxFQUNSO1lBQ0ksV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRztnQkFDbkMsS0FBSyxFQUFFLEtBQUs7YUFDZjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRO2dCQUN0QyxLQUFLLEVBQUUsOEJBQThCO2FBQ3hDO1NBQ0osQ0FDSjthQUNBLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQXpELENBQXlELENBQUM7YUFDekUsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztRQUFBLENBQUM7SUFDckQsQ0FBQztJQUdELGtCQUFrQjtJQUNsQix1REFBdUQ7SUFDdkQsb0dBQW9HO0lBQ3BHLHFGQUFxRjtJQUNyRixVQUFVO0lBQ1YsSUFBSTtJQUVKLGtDQUFRLEdBQVIsVUFBUyxLQUFLLEVBQUUsTUFBTTtRQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN2QixLQUFLLEVBQUUsS0FBSztZQUNaLFFBQVEsRUFBRSxNQUFNO1NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBVSxNQUFVO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFDRCxVQUFVLFlBQWdCO1lBQ3RCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFHRCxvRkFBb0Y7SUFFcEYsa0JBQWtCO0lBQ2xCLCtCQUFLLEdBQUwsVUFBTSxJQUFJO1FBQVYsaUJBZUM7UUFkRyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ1gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUNqQyxlQUFlLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDMUI7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztZQUNoQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUUsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUUsVUFBQyxZQUFpQjtZQUNqQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ00sd0NBQWMsR0FBckI7UUFBQSxpQkFJQztRQUhHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLElBQWtCO1FBQTlCLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixlQUFlO1FBQ2YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDL0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBQ2xELGNBQWM7UUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDNUQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN2QixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLEVBQWhFLENBQWdFLENBQUMsQ0FBQztRQUNwRixZQUFZO1FBQ1osUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUN4RSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ3ZCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxLQUFLLENBQUMsRUFBaEUsQ0FBZ0UsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDRCxxQ0FBVyxHQUFYLFVBQVksTUFBVTtRQUNsQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxvQ0FBVSxHQUFWLFVBQVcsVUFBbUI7UUFBOUIsaUJBc0NDO1FBckNHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLEtBQUssQ0FDVixVQUFTLE1BQU0sSUFBRSxDQUFDLEVBQ2xCLFFBQVEsRUFDUjtnQkFDSSxXQUFXLEVBQUUsSUFBSTtnQkFDakIsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRztvQkFDbkMsS0FBSyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVE7b0JBQ3RDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSTtvQkFDbEMsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSixDQUNKO2lCQUNBLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxDQUFDO2dCQUNSLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDekIsK0JBQStCO29CQUMvQixtQkFBbUI7b0JBQ25CLDhGQUE4RjtvQkFDOUYsK0RBQStEO29CQUMvRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEUsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixvQ0FBb0M7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztZQUFBLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsTUFBTTtRQUNaLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELHNEQUFzRDtJQUMxRCxDQUFDO0lBQ0Qsd0NBQWMsR0FBZDtRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Usa0NBQVEsR0FBUixVQUFTLFFBQWlCO1FBQTFCLGlCQWtDQztRQWpDRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQ1YsVUFBUyxNQUFNLElBQUUsQ0FBQyxFQUNsQixRQUFRLEVBQ1I7Z0JBQ0ksV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7b0JBQ25DLEtBQUssRUFBRSxLQUFLO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRO29CQUN0QyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2xDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0osQ0FDSjtpQkFDQSxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNSLHVCQUF1QjtnQkFDdkIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssRUFBRSxDQUFDO2dCQUNSLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDdkIsMkJBQTJCO29CQUMzQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztZQUFBLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFDRCxpQ0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNSLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUNNLHNDQUFZLEdBQW5CO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFHUyxxQ0FBVyxHQUFsQixVQUFtQixJQUFJO1FBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1gsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDakIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFTSw0Q0FBa0IsR0FBekIsVUFBMEIsZUFBc0I7UUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQUNNLDRDQUFrQixHQUF6QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTSxvQ0FBVSxHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLGtDQUFRLEdBQWY7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUk7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQS9sQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQXlCcUIseUJBQWdCO09BeEJyQyxlQUFlLENBZ21CM0I7SUFBRCxzQkFBQztDQUFBLEFBaG1CRCxJQWdtQkM7QUFobUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcblxyXG5pbXBvcnQgeyBBUFBMSUNBVElPTl9NT0RVTEVfUFJPVklERVJTIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvc3JjL2FwcGxpY2F0aW9uX21vZHVsZVwiO1xyXG5pbXBvcnQgeyB1cGRhdGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxudmFyIG1lcmdlSlNPTiA9IHJlcXVpcmUoXCJtZXJnZS1qc29uXCIpIDtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIGF1dGh1c2VyOiBmaXJlYmFzZS5Vc2VyO1xyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVXNlcnM6IGFueTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VTb3VyY2U6IEltYWdlU291cmNlO1xyXG5cdHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2U7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJsb2dJbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2U7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qcm9maWxlIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBwaWNrSW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XHJcblx0XHRcdG1vZGU6IFwic2luZ2xlXCJcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0KG5ldyBJbWFnZVNvdXJjZSgpKS5mcm9tQXNzZXQoc2VsZWN0ZWRBc3NldCkudGhlbigoaW1hZ2VTb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmxvZ0ltYWdlU291cmNlID0gaW1hZ2VTb3VyY2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlU291cmNlID0gaW1hZ2VTb3VyY2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuXHR9XHJcblxyXG5cdGdldEltYWdlRmlsZVBhdGgoaW1hZ2VBc3NldCwgaW1hZ2VUeXBlOnN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0Ly8gaWYgKGlvcykgeyAvLyBjcmVhdGUgZmlsZSBmcm9tIGltYWdlIGFzc2V0IGFuZCByZXR1cm4gaXRzIHBhdGhcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRm9sZGVyUGF0aCA9IGtub3duRm9sZGVycy50ZW1wKCkuZ2V0Rm9sZGVyKFwibnNpbWFnZXBpY2tlclwiKS5wYXRoO1xyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGaWxlUGF0aCA9IHBhdGguam9pbih0ZW1wRm9sZGVyUGF0aCwgYCR7RGF0ZS5ub3coKX0uanBnYCk7XHJcblx0XHRcdC8vIFx0Y29uc3Qgb3B0aW9ucyA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9ucy5uZXcoKTtcclxuXHJcblx0XHRcdC8vIFx0b3B0aW9ucy5zeW5jaHJvbm91cyA9IHRydWU7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy52ZXJzaW9uID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zVmVyc2lvbi5DdXJyZW50O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMuZGVsaXZlcnlNb2RlID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zRGVsaXZlcnlNb2RlLkhpZ2hRdWFsaXR5Rm9ybWF0O1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMubmV0d29ya0FjY2Vzc0FsbG93ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIFx0UEhJbWFnZU1hbmFnZXIuZGVmYXVsdE1hbmFnZXIoKS5yZXF1ZXN0SW1hZ2VEYXRhRm9yQXNzZXRPcHRpb25zUmVzdWx0SGFuZGxlcihpbWFnZUFzc2V0Lmlvcywgb3B0aW9ucywgKG5zRGF0YTogTlNEYXRhLCBkYXRhVVRJOiBzdHJpbmcsIG9yaWVudGF0aW9uOiBVSUltYWdlT3JpZW50YXRpb24sIGluZm86IE5TRGljdGlvbmFyeTxhbnksIGFueT4pID0+IHtcclxuXHRcdFx0Ly8gXHRcdGlmIChpbmZvLnZhbHVlRm9yS2V5KFBISW1hZ2VSZXN1bHRJc0luQ2xvdWRLZXkpKSB7XHJcblx0XHRcdC8vIFx0XHRcdC8vIEltYWdlIGlzIGluIGlDbG91ZFxyXG5cdFx0XHQvLyBcdFx0XHRpZiAobnNEYXRhKSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIE5PVCBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH1cclxuXHRcdFx0Ly8gXHRcdH1cclxuXHJcblx0XHRcdC8vIFx0XHRuc0RhdGEud3JpdGVUb0ZpbGVBdG9taWNhbGx5KHRlbXBGaWxlUGF0aCwgdHJ1ZSk7XHJcblx0XHRcdC8vIFx0XHR0aGlzLmN1cnJlbnRJbWFnZUZpbGVQYXRoID0gdGVtcEZpbGVQYXRoO1xyXG5cdFx0XHQvLyBcdFx0cmVzb2x2ZSh0ZW1wRmlsZVBhdGgpO1xyXG5cdFx0XHQvLyBcdH0pO1xyXG5cdFx0XHQvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5kcm9pZCkgeyAvLyByZXR1cm4gaW1hZ2VBc3NldC5hbmRyb2lkLCBzaW5jZSBpdCdzIHRoZSBwYXRoIG9mIHRoZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwbG9hZEZpbGUoZmlsZVBhdGg6c3RyaW5nLCByZW1vdGVQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAvLyBub3cgdXBsb2FkIHRoZSBmaWxlIHdpdGggZWl0aGVyIG9mIHRoZSBvcHRpb25zIGJlbG93OlxyXG4gICAgICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2UgKGZvbGRlcnMgd2lsbCBiZSBjcmVhdGVkKVxyXG4gICAgICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICcvdXNlcnMvJyArIHVzZXIudWlkICsgcmVtb3RlUGF0aCxcclxuICAgICAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgbG9jYWxGaWxlOiBmcy5GaWxlLmZyb21QYXRoKGZpbGVQYXRoKSxcclxuICAgICAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IG5vdGlmaWVkIG9mIGZpbGUgdXBsb2FkIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh1cGxvYWRlZEZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZCBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gSWYgc29tZW9uZSBwdXNoIG1lc3NhZ2UoaW5jbHVkZSB5b3UpLCBmdW5jdGlvbihyZXN1bHQpIHdpbGwgYmUgYWN0aXZhdGVkLlxyXG4gICAgLy8gSXQgY2hhbmdlIHRoZSBtZXNzYWdlcyBhcnJheS5cclxuICAgIHN5bmNSb29tKHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdmFyIHJvb20gPSByb29tX2lkO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tKHJvb20sIHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbV9pZCtcIi9tZXNzYWdlc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tKHJvb21faWQ6c3RyaW5nLCBtZXNzYWdlczphbnkpe1xyXG4gICAgICAgIHRoaXMucm9vbXNbcm9vbV9pZF1bJ21lc3NhZ2VzJ10gPSBtZXNzYWdlcztcclxuICAgICAgICBpZihyb29tX2lkID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuanNvblRvQXJyYXkobWVzc2FnZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9hO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9iO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYiA9IGJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZV9hWyd0aW1lc3RhbXAnXVsndGltZSddIC0gbWVzc2FnZV9iWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21faWQrXCIvcm9vbV91c2Vycy9cIit1aWQsIHVzZXJbdWlkXSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCByb29tX2lkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgd2lsbCBiYSBhY3RpdmF0ZWQgd2hlbiB1c2VyIGNyZWF0ZSByb29tIHdpdGggbmV3IGZyaWVuZC5cclxuICAgIC8vIFVzZXIgaGFzIGEgcm9vbSBidXQgZnJpZW5kIGRvZXNuJ3QgaGF2ZSByb29tIHlldC5cclxuICAgIGdlbmVyYXRlUm9vbSh1c2VyOmFueSl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHZhciBvcGVuX3Jvb20gPSB7cm9vbV91c2VyczpcIlwifTtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydyb29tX3VzZXJzJ11bdWlkXSA9IHVzZXJbdWlkXTtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnb3BlblRpbWUnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ3RpdGxlJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ2ljb25zcmMnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nLCBcIlwiKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcmVzdWx0LmtleSwgb3Blbl9yb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHZW5lcmF0ZWRSb29tSUQocmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycrdWlkKycvdXNlcl9yb29tcy8nK3Jvb21faWQsIHtpblJvb206dHJ1ZSwgam9pbjpuZXcgRGF0ZSgpfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoVXNlcklET25Sb29tKHVpZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIG1lc3NhZ2VzIDpcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQ6c3RyaW5nLCB1c2VyOmFueSwgbWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBtZXNzYWdlX3BhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZV9wYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VfcGFja1snbWVzc2FnZSddID0gbWVzc2FnZTtcclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tX2lkKycvbWVzc2FnZXMnLCBtZXNzYWdlX3BhY2spLnRoZW4ocmVzdWx0ID0+IHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gTWVzc2FnZV9wYWNrIElEXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQmxvZyBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgZ2VuZXJhdGVQb3N0KHVzZXI6YW55LCBwb3N0X2lkOnN0cmluZywgcG9zdDphbnkpe1xyXG4gICAgICAgIHZhciBvcGVuX3Bvc3QgPSB7fTtcclxuICAgICAgICBpZihwb3N0PT1udWxsKXtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnbmFtZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wyd0eXBlJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2Rlc2NyaXB0aW9uJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2ltYWdlJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2xvY2F0aW9uJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2xpa2VzJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2NvbW1lbnRzJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgb3Blbl9wb3N0ID0gcG9zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBpZihwb3N0X2lkPT1udWxsKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy9ibG9ncy8nK3VpZCsnL3Bvc3RzJywgXCJcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvYmxvZ3MvJyt1aWQrXCIvcG9zdHMvXCIrcmVzdWx0LmtleSwgb3Blbl9wb3N0KS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hQb3N0SURPblVzZXIodXNlciwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgb3Blbl9wb3N0ID0gcG9zdFtwb3N0X2lkXTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvYmxvZ3MvJyt1aWQrXCIvcG9zdHMvXCIrcG9zdF9pZCwgb3Blbl9wb3N0KS50aGVuKHJlc3VsdDIgPT4geyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVzaFBvc3RJRE9uVXNlcih1c2VyOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycrdWlkKycvdXNlcl9ibG9ncy8nK3Jvb21faWQsIHRydWUpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFVzZXJJRE9uUm9vbSh1aWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQXV0aCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gbWFrZSBhcnJheSB0eXBlIGRhdGFiYXNlIGFuZCBwdXNoIGRhdGEgaW4gYXJyYXkgdHlwZSBkYXRhYmFzZVxyXG4gICAgcHVzaEluQXJyYXlEYXRhYmFzZShkYXRhYmFzZU9mQXJyYXlQYXRoOnN0cmluZywgcHVzaERhdGE6YW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnB1c2goJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZU9mQXJyYXlQYXRoLCBwdXNoRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFrZSBkYXRhIHN0cnVjdHVyZSBvZiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICBtYWtlU3RydWN0dXJlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHN0cnVjdHVyZTogYW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLCBzdHJ1Y3R1cmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhdHRyaWJ1dGUgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZSBhbmQgdXBkYXRlIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgd3JpdGVWYWx1ZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCB1cGRhdGVEYXRhOiBhbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLCB1cGRhdGVEYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gcmVhZCBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIHJlYWRWYWx1ZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tcGxleCBxdWVyeVxyXG4gICAgcXVlcnlPbkRhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUXVlcnlFdmVudCxcclxuICAgICAgICAgICAgICAgIC8vICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgb25seSBjb21wYW5pZXMgJ3NpbmNlJyBhIGNlcnRhaW4geWVhciAoVGVsZXJpaydzIHZhbHVlIGlzIDIwMDAsIHdoaWNoIGlzIGltYWdpbmFyeSBidHcpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgICAgICAgICAgICAgICAgICAvL3JhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAvLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uIG9yICdjaGFpbicgcmFuZ2VzIGxpa2UgdGhpczpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDE5OTlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRU5EX0FULFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3QgMiBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvLyBxdWVyeSByZXN1bHRcclxuICAgIG9uUXVlcnlFdmVudChyZXN1bHQpIHtcclxuICAgICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcclxuICAgICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxyXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcXVlcnlUZXN0KCl7XHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVbJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXSkpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWRVc2VyTmFtZSgpe1xyXG4gICAgLy8gICAgIHZhciB1c2VySWQgPSBmaXJlYmFzZVdlYi5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgLy8gICAgIHJldHVybiBmaXJlYmFzZVdlYi5kYXRhYmFzZSgpLnJlZignL3VzZXJzLycgKyB1c2VySWQpLm9uY2UoJ3ZhbHVlJykudGhlbihmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdXNlcm5hbWUgPSAoc25hcHNob3QudmFsKCkgJiYgc25hcHNob3QudmFsKCkudXNlcm5hbWUpIHx8ICdBbm9ueW1vdXMnO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluaXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIGdldCBjdXJyZW5kVXNlclxyXG4gICAgbG9naW4odXNlcikge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxyXG4gICAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEN1cnJlbnRVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKHVzZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0QXV0aFVzZXIodXNlcjpmaXJlYmFzZS5Vc2VyKXtcclxuICAgICAgICB0aGlzLmF1dGh1c2VyID0gdXNlcjtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbXMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gcmVzdWx0LmtleTtcclxuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB7fTtcclxuICAgICAgICB1c2VyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRoaXNVc2VyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZF9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICBjb25zb2xlLmxvZyhmcmllbmRfaWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRfaWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRfaWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RnJpZW5kcyhmcmllbmRfaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZnJpZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJpZW5kWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ10gPSB0aGlzLmdldEZyaWVuZHMoKVsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaEZyaWVuZE9uUm9vbSh0aGlzLnRoaXNVc2VyLFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoTWVzc2FnZU9uUm9vbShcIi1MUExWTlZGMnlNMU16eUctRDcxXCIsIHRoaXMudGhpc1VzZXIsIFwiaGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVQb3N0KHRoaXMudGhpc1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRnJpZW5kKGZyaWVuZCl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRzW2tleV0gPSBmcmllbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRVc2Vyc0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHNldFJvb21zKHJvb21faWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgY29uc29sZS5sb2cocm9vbV9pZHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxyb29tX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbV9pZHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb29tKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PXJvb21faWRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFJvb21BcnJheSgpe1xyXG5cdFx0dGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcblx0fVxyXG5cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==