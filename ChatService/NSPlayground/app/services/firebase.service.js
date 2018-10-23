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
        // file upload
        // var filePath = fs.knownFolders.currentApp().path+"/images/library.png";
        // var remotePath = '/images/library.png';
        // this.uploadFile(filePath, remotePath);
        this.routerExtensions = routerExtensions;
        this.thisUser = {};
        this.friends = {};
        this.rooms = {};
        // data upload 
        // var arrayDatabasePath = "/Test/ArrayDatabase";
        // var pushData = {test: "test"};
        // this.pushInArrayDatabase(arrayDatabasePath, pushData);
        // var valueDatabasePath = "/Test/ValueDatabase";
        // var structure = {name:null, email:null};
        // this.makeStructureOfValueDatabase(valueDatabasePath,structure);
        // var updateData = {name:'sansoo', country:'korea', age:29};
        // this.writeValueOfValueDatabase(valueDatabasePath,updateData);
        // var deleteData = {age: null};
        // this.writeValueOfValueDatabase(valueDatabasePath,deleteData);
        // show data
        // var output;
        // console.log("readValueOfValueDatabase test");
        // this.readValueOfValueDatabase(valueDatabasePath, output);
        // console.log(output);
        // console.log("readValueOfValueDatabase test");
        // this.readValueOfValueDatabase(arrayDatabasePath, output);
        // console.log(output);
        // // ordering array query
        // console.log("queryOnDatabase test");
        // this.queryOnDatabase(arrayDatabasePath);
        // this.queryTest();
        // this.generateRoom("5FgrewJa2Mh9C598k70HQ40b1qu1");
    }
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
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoom(result.key, result.value);
            if (result.key == _this.selectedRoomID) {
                _this.selectedRoomMessageArray = _this.jsonToArray(result.value);
            }
        }, "/rooms/" + room_id + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (room_id, room) {
        this.rooms[room_id] = room;
        // console.log(this.rooms);
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
            firebase.push('/rooms/', "").then(function (result) {
                firebase.setValue('/rooms/' + result.key + "/room_users/" + uid, user[uid]).then(function (result2) {
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
    //----------------------------Chat Section------------------------------------------
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsc0NBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFJNUQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBRXZDO0lBZ0JJLHlCQUNZLGdCQUFrQztRQUkxQyxjQUFjO1FBQ2QsMEVBQTBFO1FBQzFFLDBDQUEwQztRQUMxQyx5Q0FBeUM7UUFQakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWY5QyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ1gsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUF1QmYsZUFBZTtRQUNmLGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFDakMseURBQXlEO1FBRXpELGlEQUFpRDtRQUNqRCwyQ0FBMkM7UUFDM0Msa0VBQWtFO1FBRWxFLDZEQUE2RDtRQUM3RCxnRUFBZ0U7UUFFaEUsZ0NBQWdDO1FBQ2hDLGdFQUFnRTtRQUVoRSxZQUFZO1FBQ1osY0FBYztRQUNkLGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsdUJBQXVCO1FBRXZCLGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsdUJBQXVCO1FBRXZCLDBCQUEwQjtRQUMxQix1Q0FBdUM7UUFDdkMsMkNBQTJDO1FBQzNDLG9CQUFvQjtRQUNwQixxREFBcUQ7SUFFekQsQ0FBQztJQUtELG9DQUFVLEdBQVYsVUFBVyxRQUFlLEVBQUUsVUFBaUI7UUFDekMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDL0Isd0RBQXdEO1lBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUN4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RyxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQUNNLDRDQUFrQixHQUF6QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTSxvQ0FBVSxHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLGtDQUFRLEdBQWY7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUk7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQXhlUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBa0JxQix5QkFBZ0I7T0FqQnJDLGVBQWUsQ0F5ZTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXplRCxJQXllQztBQXplWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEFQUExJQ0FUSU9OX01PRFVMRV9QUk9WSURFUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvYXBwbGljYXRpb25fbW9kdWxlXCI7XHJcbmltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG52YXIgbWVyZ2VKU09OID0gcmVxdWlyZShcIm1lcmdlLWpzb25cIikgO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xyXG4gICAgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7XHJcbiAgICB0aGlzVXNlcjogYW55ID0ge307XHJcbiAgICBwcml2YXRlIGZyaWVuZHMgPSB7fTtcclxuICAgIHByaXZhdGUgcm9vbXMgPSB7fTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkUm9vbUlEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZEFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvb21BcnJheTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21UaXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVVzZXJzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgXHJcbiAgICApe1xyXG5cclxuICAgICAgICAvLyBmaWxlIHVwbG9hZFxyXG4gICAgICAgIC8vIHZhciBmaWxlUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aCtcIi9pbWFnZXMvbGlicmFyeS5wbmdcIjtcclxuICAgICAgICAvLyB2YXIgcmVtb3RlUGF0aCA9ICcvaW1hZ2VzL2xpYnJhcnkucG5nJztcclxuICAgICAgICAvLyB0aGlzLnVwbG9hZEZpbGUoZmlsZVBhdGgsIHJlbW90ZVBhdGgpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gZGF0YSB1cGxvYWQgXHJcbiAgICAgICAgLy8gdmFyIGFycmF5RGF0YWJhc2VQYXRoID0gXCIvVGVzdC9BcnJheURhdGFiYXNlXCI7XHJcbiAgICAgICAgLy8gdmFyIHB1c2hEYXRhID0ge3Rlc3Q6IFwidGVzdFwifTtcclxuICAgICAgICAvLyB0aGlzLnB1c2hJbkFycmF5RGF0YWJhc2UoYXJyYXlEYXRhYmFzZVBhdGgsIHB1c2hEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gdmFyIHZhbHVlRGF0YWJhc2VQYXRoID0gXCIvVGVzdC9WYWx1ZURhdGFiYXNlXCI7XHJcbiAgICAgICAgLy8gdmFyIHN0cnVjdHVyZSA9IHtuYW1lOm51bGwsIGVtYWlsOm51bGx9O1xyXG4gICAgICAgIC8vIHRoaXMubWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZSh2YWx1ZURhdGFiYXNlUGF0aCxzdHJ1Y3R1cmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHZhciB1cGRhdGVEYXRhID0ge25hbWU6J3NhbnNvbycsIGNvdW50cnk6J2tvcmVhJywgYWdlOjI5fTtcclxuICAgICAgICAvLyB0aGlzLndyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UodmFsdWVEYXRhYmFzZVBhdGgsdXBkYXRlRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIHZhciBkZWxldGVEYXRhID0ge2FnZTogbnVsbH07XHJcbiAgICAgICAgLy8gdGhpcy53cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKHZhbHVlRGF0YWJhc2VQYXRoLGRlbGV0ZURhdGEpO1xyXG5cclxuICAgICAgICAvLyBzaG93IGRhdGFcclxuICAgICAgICAvLyB2YXIgb3V0cHV0O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlIHRlc3RcIik7XHJcbiAgICAgICAgLy8gdGhpcy5yZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UodmFsdWVEYXRhYmFzZVBhdGgsIG91dHB1dCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cob3V0cHV0KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UgdGVzdFwiKTtcclxuICAgICAgICAvLyB0aGlzLnJlYWRWYWx1ZU9mVmFsdWVEYXRhYmFzZShhcnJheURhdGFiYXNlUGF0aCwgb3V0cHV0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXQpO1xyXG5cclxuICAgICAgICAvLyAvLyBvcmRlcmluZyBhcnJheSBxdWVyeVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicXVlcnlPbkRhdGFiYXNlIHRlc3RcIik7XHJcbiAgICAgICAgLy8gdGhpcy5xdWVyeU9uRGF0YWJhc2UoYXJyYXlEYXRhYmFzZVBhdGgpO1xyXG4gICAgICAgIC8vIHRoaXMucXVlcnlUZXN0KCk7XHJcbiAgICAgICAgLy8gdGhpcy5nZW5lcmF0ZVJvb20oXCI1RmdyZXdKYTJNaDlDNTk4azcwSFE0MGIxcXUxXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICB1cGxvYWRGaWxlKGZpbGVQYXRoOnN0cmluZywgcmVtb3RlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgLy8gbm93IHVwbG9hZCB0aGUgZmlsZSB3aXRoIGVpdGhlciBvZiB0aGUgb3B0aW9ucyBiZWxvdzpcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc3RvcmFnZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAnL3VzZXJzLycgKyB1c2VyLnVpZCArIHJlbW90ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMTogYSBmaWxlLXN5c3RlbSBtb2R1bGUgRmlsZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBmaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAodXBsb2FkZWRGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gSWYgc29tZW9uZSBwdXNoIG1lc3NhZ2UoaW5jbHVkZSB5b3UpLCBmdW5jdGlvbihyZXN1bHQpIHdpbGwgYmUgYWN0aXZhdGVkLlxyXG4gICAgLy8gSXQgY2hhbmdlIHRoZSBtZXNzYWdlcyBhcnJheS5cclxuICAgIHN5bmNSb29tKHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyZXN1bHQua2V5LCByZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQua2V5ID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcIi9yb29tcy9cIityb29tX2lkK1wiL21lc3NhZ2VzXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20ocm9vbV9pZDpzdHJpbmcsIHJvb206YW55KXtcclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdID0gcm9vbTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tX2lkK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbV9pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBjcmVhdGUgcm9vbSB3aXRoIG5ldyBmcmllbmQuXHJcbiAgICAvLyBVc2VyIGhhcyBhIHJvb20gYnV0IGZyaWVuZCBkb2Vzbid0IGhhdmUgcm9vbSB5ZXQuXHJcbiAgICBnZW5lcmF0ZVJvb20odXNlcjphbnkpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgXCJcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jlc3VsdC5rZXkrXCIvcm9vbV91c2Vycy9cIit1aWQsIHVzZXJbdWlkXSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCB7aW5Sb29tOnRydWUsIGpvaW46bmV3IERhdGUoKX0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFVzZXJJRE9uUm9vbSh1aWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBtZXNzYWdlcyA6XHJcbiAgICBwdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZV9wYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VfcGFja1sndXNlciddID0gdWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbV9pZCsnL21lc3NhZ2VzJywgbWVzc2FnZV9wYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcbiAgICAvLyBtYWtlIGFycmF5IHR5cGUgZGF0YWJhc2UgYW5kIHB1c2ggZGF0YSBpbiBhcnJheSB0eXBlIGRhdGFiYXNlXHJcbiAgICBwdXNoSW5BcnJheURhdGFiYXNlKGRhdGFiYXNlT2ZBcnJheVBhdGg6c3RyaW5nLCBwdXNoRGF0YTphbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlT2ZBcnJheVBhdGgsIHB1c2hEYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtlIGRhdGEgc3RydWN0dXJlIG9mIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIG1ha2VTdHJ1Y3R1cmVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgc3RydWN0dXJlOiBhbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHN0cnVjdHVyZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGF0dHJpYnV0ZSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlIGFuZCB1cGRhdGUgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICB3cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHVwZGF0ZURhdGE6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHVwZGF0ZURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyByZWFkIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgcmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb21wbGV4IHF1ZXJ5XHJcbiAgICBxdWVyeU9uRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUV2ZW50LFxyXG4gICAgICAgICAgICAgICAgLy8gJy91c2VycycsXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHdoZW4gdHJ1ZSwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgZGF0YSBpbiB0aGUgcHJvbWlzZSBhcyB3ZWxsIVxyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0ZXN0JyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGNvbXBhbmllcyAnc2luY2UnIGEgY2VydGFpbiB5ZWFyIChUZWxlcmlrJ3MgdmFsdWUgaXMgMjAwMCwgd2hpY2ggaXMgaW1hZ2luYXJ5IGJ0dylcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZWl0aGVyIGEgJ3JhbmdlJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vL30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4gb3IgJ2NoYWluJyByYW5nZXMgbGlrZSB0aGlzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByYW5nZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5TVEFSVF9BVCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMTk5OVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FTkRfQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHRoZSBmaXJzdCAyIG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyAobm90ZSB0aGF0IHRoZXJlJ3Mgb25seSAxIGluIHRoaXMgY2FzZSBhbnl3YXkpXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8vIHF1ZXJ5IHJlc3VsdFxyXG4gICAgb25RdWVyeUV2ZW50KHJlc3VsdCkge1xyXG4gICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgcXVlcnkgcmV0dXJucyAxIG1hdGNoIGF0IGEgdGltZVxyXG4gICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XHJcbiAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBxdWVyeVRlc3QoKXtcclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZVsnYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMiddKSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gcmVhZFVzZXJOYW1lKCl7XHJcbiAgICAvLyAgICAgdmFyIHVzZXJJZCA9IGZpcmViYXNlV2ViLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZpcmViYXNlV2ViLmRhdGFiYXNlKCkucmVmKCcvdXNlcnMvJyArIHVzZXJJZCkub25jZSgndmFsdWUnKS50aGVuKGZ1bmN0aW9uKHNuYXBzaG90KSB7XHJcbiAgICAvLyAgICAgICAgIHZhciB1c2VybmFtZSA9IChzbmFwc2hvdC52YWwoKSAmJiBzbmFwc2hvdC52YWwoKS51c2VybmFtZSkgfHwgJ0Fub255bW91cyc7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmVnaXN0ZXIoZW1haWwsIHBhc3N3ZCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdDphbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgY3VycmVuZFVzZXJcclxuICAgIGxvZ2luKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVXNlcih1c2VyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldEF1dGhVc2VyKHVzZXI6ZmlyZWJhc2UuVXNlcil7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgLy8gc2V0IHRoaXNVc2VyXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoaXNVc2VyKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCBmcmllbmRzXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyAnL2ZyaWVuZHMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IHJvb21zXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3VzZXJfcm9vbXMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgc2V0VGhpc1VzZXIocmVzdWx0OmFueSl7XHJcbiAgICAgICAgdmFyIGtleSA9IHJlc3VsdC5rZXk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGhpc1VzZXIpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRfaWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgY29uc29sZS5sb2coZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDsgICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZnJpZW5kX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PWZyaWVuZF9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldEZyaWVuZHMoZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGZyaWVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyaWVuZFsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddID0gdGhpcy5nZXRGcmllbmRzKClbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hGcmllbmRPblJvb20odGhpcy50aGlzVXNlcixcIi1MUExWTlZGMnlNMU16eUctRDcxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaE1lc3NhZ2VPblJvb20oXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiLCB0aGlzLnRoaXNVc2VyLCBcImhpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkRnJpZW5kKGZyaWVuZCl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRzW2tleV0gPSBmcmllbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRVc2Vyc0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHNldFJvb21zKHJvb21faWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgY29uc29sZS5sb2cocm9vbV9pZHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxyb29tX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbV9pZHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb29tKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PXJvb21faWRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFJvb21BcnJheSgpe1xyXG5cdFx0dGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcblx0fVxyXG5cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==