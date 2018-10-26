"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
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
                    // this.pushMessageOnRoom("-LPLVNVF2yM1MzyG-D71", this.thisUser, "hi");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsc0NBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFJNUQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBRXZDO0lBZ0JJLHlCQUNZLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBZjlDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQWdCbkIsQ0FBQztJQUVELHVGQUF1RjtJQUV2RixvQ0FBVSxHQUFWLFVBQVcsUUFBZSxFQUFFLFVBQWlCO1FBQ3pDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLHdEQUF3RDtZQUN4RCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDeEIsK0VBQStFO2dCQUMvRSxjQUFjLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVTtnQkFDakQsNkNBQTZDO2dCQUM3QyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNyQyw2REFBNkQ7Z0JBQzdELGFBQWEsRUFBRSxRQUFRO2dCQUN2Qix1Q0FBdUM7Z0JBQ3ZDLFVBQVUsRUFBRSxVQUFTLE1BQU07b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENB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RUQsZ0NBQU0sR0FBTjtRQUNJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUF2Z0JRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FrQnFCLHlCQUFnQjtPQWpCckMsZUFBZSxDQXdnQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXhnQkQsSUF3Z0JDO0FBeGdCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEFQUExJQ0FUSU9OX01PRFVMRV9QUk9WSURFUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvYXBwbGljYXRpb25fbW9kdWxlXCI7XHJcbmltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG52YXIgbWVyZ2VKU09OID0gcmVxdWlyZShcIm1lcmdlLWpzb25cIikgO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xyXG4gICAgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7XHJcbiAgICB0aGlzVXNlcjogYW55ID0ge307XHJcbiAgICBwcml2YXRlIGZyaWVuZHMgPSB7fTtcclxuICAgIHByaXZhdGUgcm9vbXMgPSB7fTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkUm9vbUlEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZEFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvb21BcnJheTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21UaXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVVzZXJzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qcm9maWxlIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICB1cGxvYWRGaWxlKGZpbGVQYXRoOnN0cmluZywgcmVtb3RlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgLy8gbm93IHVwbG9hZCB0aGUgZmlsZSB3aXRoIGVpdGhlciBvZiB0aGUgb3B0aW9ucyBiZWxvdzpcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc3RvcmFnZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAnL3VzZXJzLycgKyB1c2VyLnVpZCArIHJlbW90ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMTogYSBmaWxlLXN5c3RlbSBtb2R1bGUgRmlsZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBmaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAodXBsb2FkZWRGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoYXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbShyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHZhciByb29tID0gcm9vbV9pZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyb29tLCByZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21faWQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbShyb29tX2lkOnN0cmluZywgbWVzc2FnZXM6YW55KXtcclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddID0gbWVzc2FnZXM7XHJcbiAgICAgICAgaWYocm9vbV9pZCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgfVxyXG4gICAgc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAobWVzc2FnZUFycmF5KXtcclxuICAgICAgICBpZihtZXNzYWdlQXJyYXk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYTtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2EgPSBhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYil7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2IgPSBiW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VfYVsndGltZXN0YW1wJ11bJ3RpbWUnXSAtIG1lc3NhZ2VfYlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tX2lkK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbV9pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBjcmVhdGUgcm9vbSB3aXRoIG5ldyBmcmllbmQuXHJcbiAgICAvLyBVc2VyIGhhcyBhIHJvb20gYnV0IGZyaWVuZCBkb2Vzbid0IGhhdmUgcm9vbSB5ZXQuXHJcbiAgICBnZW5lcmF0ZVJvb20odXNlcjphbnkpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICB2YXIgb3Blbl9yb29tID0ge3Jvb21fdXNlcnM6XCJcIn07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsncm9vbV91c2VycyddW3VpZF0gPSB1c2VyW3VpZF07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWyd0aXRsZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydpY29uc3JjJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgXCJcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jlc3VsdC5rZXksIG9wZW5fcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCB7aW5Sb29tOnRydWUsIGpvaW46bmV3IERhdGUoKX0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFVzZXJJRE9uUm9vbSh1aWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBtZXNzYWdlcyA6XHJcbiAgICBwdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZV9wYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VfcGFja1sndXNlciddID0gdWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbV9pZCsnL21lc3NhZ2VzJywgbWVzc2FnZV9wYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJsb2cgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGdlbmVyYXRlUG9zdCh1c2VyOmFueSwgcG9zdF9pZDpzdHJpbmcsIHBvc3Q6YW55KXtcclxuICAgICAgICB2YXIgb3Blbl9wb3N0ID0ge307XHJcbiAgICAgICAgaWYocG9zdD09bnVsbCl7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ25hbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsndHlwZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydkZXNjcmlwdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydpbWFnZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydsb2NhdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydsaWtlcyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydjb21tZW50cyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgaWYocG9zdF9pZD09bnVsbCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvYmxvZ3MvJyt1aWQrJy9wb3N0cycsIFwiXCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Jlc3VsdC5rZXksIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUG9zdElET25Vc2VyKHVzZXIsIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3RbcG9zdF9pZF07XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Bvc3RfaWQsIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1c2hQb3N0SURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfYmxvZ3MvJytyb29tX2lkLCB0cnVlKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hVc2VySURPblJvb20odWlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUF1dGggU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIG1ha2UgYXJyYXkgdHlwZSBkYXRhYmFzZSBhbmQgcHVzaCBkYXRhIGluIGFycmF5IHR5cGUgZGF0YWJhc2VcclxuICAgIHB1c2hJbkFycmF5RGF0YWJhc2UoZGF0YWJhc2VPZkFycmF5UGF0aDpzdHJpbmcsIHB1c2hEYXRhOmFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VPZkFycmF5UGF0aCwgcHVzaERhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2UgZGF0YSBzdHJ1Y3R1cmUgb2YgdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgbWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCBzdHJ1Y3R1cmU6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgc3RydWN0dXJlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgYXR0cmlidXRlIGluIHZhbHVlIHR5cGUgZGF0YWJhc2UgYW5kIHVwZGF0ZSBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIHdyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgdXBkYXRlRGF0YTogYW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgdXBkYXRlRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWQgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICByZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbXBsZXggcXVlcnlcclxuICAgIHF1ZXJ5T25EYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXHJcbiAgICAgICAgICAgICAgICAvLyAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IG9ubHkgY29tcGFuaWVzICdzaW5jZScgYSBjZXJ0YWluIHllYXIgKFRlbGVyaWsncyB2YWx1ZSBpcyAyMDAwLCB3aGljaCBpcyBpbWFnaW5hcnkgYnR3KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBlaXRoZXIgYSAncmFuZ2UnXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAuLiBvciAnY2hhaW4nIHJhbmdlcyBsaWtlIHRoaXM6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhbmdlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLlNUQVJUX0FULFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAxOTk5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVORF9BVCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIF0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgdGhlIGZpcnN0IDIgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIChub3RlIHRoYXQgdGhlcmUncyBvbmx5IDEgaW4gdGhpcyBjYXNlIGFueXdheSlcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy8gcXVlcnkgcmVzdWx0XHJcbiAgICBvblF1ZXJ5RXZlbnQocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHF1ZXJ5VGVzdCgpe1xyXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c2VycycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LnZhbHVlWydheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ10pKVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyByZWFkVXNlck5hbWUoKXtcclxuICAgIC8vICAgICB2YXIgdXNlcklkID0gZmlyZWJhc2VXZWIuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgIC8vICAgICByZXR1cm4gZmlyZWJhc2VXZWIuZGF0YWJhc2UoKS5yZWYoJy91c2Vycy8nICsgdXNlcklkKS5vbmNlKCd2YWx1ZScpLnRoZW4oZnVuY3Rpb24oc25hcHNob3QpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHVzZXJuYW1lID0gKHNuYXBzaG90LnZhbCgpICYmIHNuYXBzaG90LnZhbCgpLnVzZXJuYW1lKSB8fCAnQW5vbnltb3VzJztcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICByZWdpc3RlcihlbWFpbCwgcGFzc3dkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd2RcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbml0IFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBnZXQgY3VycmVuZFVzZXJcclxuICAgIGxvZ2luKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVXNlcih1c2VyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldEF1dGhVc2VyKHVzZXI6ZmlyZWJhc2UuVXNlcil7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgLy8gc2V0IHRoaXNVc2VyXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoaXNVc2VyKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCBmcmllbmRzXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyAnL2ZyaWVuZHMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IHJvb21zXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3VzZXJfcm9vbXMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgc2V0VGhpc1VzZXIocmVzdWx0OmFueSl7XHJcbiAgICAgICAgdmFyIGtleSA9IHJlc3VsdC5rZXk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGhpc1VzZXIpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRfaWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgY29uc29sZS5sb2coZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDsgICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZnJpZW5kX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PWZyaWVuZF9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldEZyaWVuZHMoZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGZyaWVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyaWVuZFsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddID0gdGhpcy5nZXRGcmllbmRzKClbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hGcmllbmRPblJvb20odGhpcy50aGlzVXNlcixcIi1MUExWTlZGMnlNMU16eUctRDcxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaE1lc3NhZ2VPblJvb20oXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiLCB0aGlzLnRoaXNVc2VyLCBcImhpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdlbmVyYXRlUG9zdCh0aGlzLnRoaXNVc2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21faWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbV9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21faWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZFJvb20ocm9vbSl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gcm9vbSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNba2V5XSA9IHJvb21ba2V5XTtcclxuICAgICAgICAgICAgdGhpcy5zeW5jUm9vbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuXHRcdHRoaXMucm9vbUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldFJvb21zKCkpO1xyXG5cdH1cclxuXHJcblxyXG4gICAgcHVibGljIGpzb25Ub0FycmF5KGpzb24pe1xyXG4gICAgICAgIGlmKGpzb24hPW51bGwpe1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4ganNvbil7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRfanNvbiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hpbGRfanNvbltrZXldID0ganNvbltrZXldO1xyXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChjaGlsZF9qc29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHZW5lcmF0ZWRSb29tSUQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFJvb21JRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGcmllbmRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZnJpZW5kcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJpZW5kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSb29tcygpIHtcclxuICAgICAgICBpZih0aGlzLnJvb21zICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb29tcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKXtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcclxuICAgICAgICBmaXJlYmFzZS5sb2dvdXQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=