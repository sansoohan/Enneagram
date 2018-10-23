Chat Service for Gathering Data
==========================================================
We can give some recommendation to users with enneagram.<br>
User can make friends easy with this app.<br>
We can get some data from user. This data will be used for data analyzing.

For User win
------------
Good Service for young people.<br>

For Our win
------------
Good Serveying from user.<br>
You shouldn't let them know that they are getting surveyed.

Developement Steps.
--------------
<h1>1. Select The dev platform [done]</h1>
<h1>2. Make a login app with database [done]</h1>
<img src="result/home/login.png" height="300px">
<h1>3. Design simple function and make a simple UI [done]</h1>
<p>Home UI</p>
<p>
<img src="result/home/friendlist.jpg" height="300px">
<img src="result/home/friendchat.jpg" height="300px">
<img src="result/home/friendmatching.jpg" height="300px">
<img src="result/home/ideamatching.jpg" height="300px">
</p>

<h1>4. Design complex function and make a complex UI</h1>
<p>Unlock Friend ChatUI</p>
<p>
<img src="result/enneagramunlock/enneagramunlock01.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock02.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock03.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock04.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock05.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock06.jpg" height="300px">
</p>

<p>Friend Filtering with GPS and Enneagram ChatUI</p>
<p>
<img src="result/gpstest/gpstest00.png" height="300px">
<img src="result/gpstest/gpstest01.png" height="300px">
<img src="result/gpstest/gpstest02.png" height="300px">
</p>

```

            if(filterLevel === "high" || filterLevel === "low"){
                if((thisUserEnneagramState==="good" || thisUserEnneagramState==="") && friendEnneagramState==="bad"){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 3){this.filteredByEnneagram.push(true);}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 1){thisfriend = true;}
                }
                else if(thisUserEnneagramState==="bad" && (friendEnneagramState==="good" || friendEnneagramState==="")){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 2){thisfriend = true;}    
                }
                if(thisfriend == true){
                    this.friendListService.friends[i].marker.color = "green";
                }  
            }

            if(filterLevel === "low"){
                if((thisUserEnneagramState==="good" || thisUserEnneagramState==="") && (friendEnneagramState==="good" || friendEnneagramState==="")){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 9 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 5){thisfriend = true;}
                }
```

```
        var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=transit&origins="+origins.position.latitude+","+origins.position.longitude+"&destinations=";
        for(var i=0;i<destinations.length;i++){
            distanceURL += destinations[i].position.latitude+"%2C";
            distanceURL += destinations[i].position.longitude;
            if(i!=destinations.length-1){
                distanceURL += "%7C";
            }
        }
        distanceURL += "&key=AIzaSyDs-iKjb9fpImfEmGsEzF2ro60m0gNfxJY";
        fetch(distanceURL)
            .then((response) => response.json()).then((r) => {
                console.log(r);
                this.distancesResult = r;

                console.log("Filtering a marker with distance ...");
                this.filterByDistance(800);
                console.log(this.filteredByDistance);

                console.log("Filtering a marker with enneagram ...");
                this.filterByUserEnneagram("low");
                console.log(this.filteredByEnneagram);

                console.log("Setting a marker...");
                this.drawFilteredMarker();
            });

```
<h1>5. Link and test simple-data function to database.[done]</h1>
<h1>6. Link and test multi-interation function to database.[done]</h1>

<p>Enneagram\ChatService\NSPlayground\app\services\firebase.service.ts<p>

```
import firebase = require("nativescript-plugin-firebase");
import {Injectable, NgZone} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";

import { APPLICATION_MODULE_PROVIDERS } from "@angular/core/src/application_module";
import { update } from "nativescript-plugin-firebase";
var fs = require("tns-core-modules/file-system");
var mergeJSON = require("merge-json") ;
@Injectable()
export class FirebaseService {
    authuser: firebase.User;
    thisUser: any = {};
    private friends = {};
    private rooms = {};
    private generatedRoomID: string;
    public friendArray: Array<any>;
    public roomArray: Array<any>;
    public selectedRoomID: string;
    public selectedRoomTitle: string;
    public selectedRoomUsers: any;
    public selectedRoomMessageArray: Array<any>;
    constructor(
        private routerExtensions: RouterExtensions,    
    ){
    }
    uploadFile(filePath:string, remotePath:string){
        firebase.getCurrentUser().then(user => {
            // now upload the file with either of the options below:
            firebase.storage.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: '/users/' + user.uid + remotePath,
                // option 1: a file-system module File object
                localFile: fs.File.fromPath(filePath),
                // option 2: a full file path (ignored if 'localFile' is set)
                localFullPath: filePath,
                // get notified of file upload progress
                onProgress: function(status) {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                }
            }).then(
                function (uploadedFile) {
                    console.log("File uploaded: " + JSON.stringify(uploadedFile));
                },
                function (error) {
                    console.log("File upload error: " + error);
                }
            );
        });
    }

    //----------------------------Chat Section------------------------------------------

    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    syncRoom(room_id:string){
        firebase.addValueEventListener(result => {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            this.updateRoom(result.key, result.value);
            if(result.key == this.selectedRoomID){
                this.selectedRoomMessageArray = this.jsonToArray(result.value);
            }
        }, "/rooms/"+room_id+"/messages").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    updateRoom(room_id:string, room:any){
        this.rooms[room_id] = room;
        // console.log(this.rooms);
    }
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    pushFriendOnRoom(user:any, room_id:string){
        for(var uid in user){
            firebase.setValue('/rooms/'+room_id+"/room_users/"+uid, user[uid]).then(result2 => {
                this.pushRoomIDOnUser(user, room_id);
            });
        }
    }

    // This will ba activated when user create room with new friend.
    // User has a room but friend doesn't have room yet.
    generateRoom(user:any){
        for(var uid in user){
            firebase.push('/rooms/', "").then(result => {
                firebase.setValue('/rooms/'+result.key+"/room_users/"+uid, user[uid]).then(result2 => {
                    this.pushRoomIDOnUser(user, result.key);
                });
                this.setGeneratedRoomID(result.key);
                console.log("created key: " + result.key);// Room ID
            });
        }
    }
    pushRoomIDOnUser(user:any, room_id:string){
        for(var uid in user){
            firebase.setValue('/users/'+uid+'/user_rooms/'+room_id, {inRoom:true, join:new Date()}).then(result => {
                // this.pushUserIDOnRoom(uid);
            });
        }
    }
    

    // If there are some messages :
    pushMessageOnRoom(room_id:string, user:any, message:string){
        var message_pack = {};
        for(var uid in user){
            message_pack['user'] = uid;
        }
        message_pack['message'] = message;
        message_pack['timestamp'] = new Date();
        firebase.push('/rooms/'+room_id+'/messages', message_pack).then(result => {                
            console.log("created key: " + result.key);// Message_pack ID
        });
    }



    //----------------------------Chat Section------------------------------------------



    // make array type database and push data in array type database
    pushInArrayDatabase(databaseOfArrayPath:string, pushData:any){
        firebase.getCurrentUser().then(user => {
            firebase.push('/users/' + user.uid + databaseOfArrayPath, pushData).then(result => {
                console.log("created key: " + result.key);
            });
        });
    }

    // make data structure of value type database
    makeStructureOfValueDatabase(databasePath:string, structure: any){
        firebase.getCurrentUser().then(user => {
            firebase.setValue('/users/' + user.uid + databasePath, structure);
        });
    }

    // add attribute in value type database and update data in value type database
    writeValueOfValueDatabase(databasePath:string, updateData: any){
        firebase.getCurrentUser().then(user => {
            firebase.update('/users/' + user.uid + databasePath, updateData);
        });
    }


    // read data in value type database
    readValueOfValueDatabase(databasePath:string){
        firebase.getCurrentUser().then(user => {
            firebase.getValue('/users/' + user.uid + databasePath).then(result =>{
                console.log(JSON.stringify(result));
            }).catch(error => console.log("Error: " + error));
        });
    }

    // complex query
    queryOnDatabase(databasePath:string){
        firebase.getCurrentUser().then(user => {
            firebase.query(
                this.onQueryEvent,
                // '/users',
                '/users/' + user.uid + databasePath,
                {
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
                }
            )
            .then(result => console.log(JSON.stringify(result)))
            .catch(error => console.log("Error: " + error));;
        });
    }

    
    // query result
    onQueryEvent(result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        if (!result.error) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
        }
    };

    queryTest(){
        firebase.query(
            function(result){

            },
            '/users',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                    value: 'uid'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: 'ayQt5VfwwOhzZ7UEtPMXrHtimce2'
                },
            }
        )
        .then(result => console.log(result.value['ayQt5VfwwOhzZ7UEtPMXrHtimce2']))
        .catch(error => console.log("Error: " + error));;
    }


    // readUserName(){
    //     var userId = firebaseWeb.auth().currentUser.uid;
    //     return firebaseWeb.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //         var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //     });
    // }

    register(email, passwd) {
        return firebase.createUser({
            email: email,
            password: passwd
        }).then(
            function (result:any) {
                return JSON.stringify(result);
            },
            function (errorMessage:any) {
                alert(errorMessage);
            }
        )
    }

    // get currendUser
    login(user) {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then((result: any) => {
            this.setCurrentUser();
            ApplicationSettings.setBoolean("authenticated", true);
            this.routerExtensions.navigate(["/home"], { clearHistory: true } );
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    public setCurrentUser(){
        firebase.getCurrentUser().then(user => {
            this.setAuthUser(user);
        });
    }
    setAuthUser(user:firebase.User){
        this.authuser = user;
        // set thisUser
        firebase.getValue('/users/' + user.uid).then(result =>{
            this.setThisUser(result);
        }).catch(error => console.log("Error: " + error));
        // set friends
        firebase.getValue('/users/' + user.uid + '/friends').then(result =>{
            var result_keys = [];
            for(var k in result.value){
                result_keys.push(k);
            }
            this.setFriends(result_keys);
        }).catch(error => console.log("getFriendsAndThisUserFromDatabase Error: " + error));
        // set rooms
        firebase.getValue('/users/' + this.authuser.uid + '/user_rooms').then(result =>{
            var result_keys = [];
            for(var k in result.value){
                result_keys.push(k);
            }
            this.setRooms(result_keys);
        }).catch(error => console.log("getFriendsAndThisUserFromDatabase Error: " + error));
    }
    setThisUser(result:any){
        var key = result.key;
        var value = result.value;
        var user = {};
        user[key] = value;
        this.thisUser = JSON.parse(JSON.stringify(user));
        console.log(this.thisUser);
    }
    setFriends(friend_ids:string[]){ 
        console.log(friend_ids);
        var count = 0;        
        for(var i=0;i<friend_ids.length;i++){
            firebase.query(
                function(result){},
                '/users',
                {
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
                }
            )
            .then(result => {
                this.addFriend(result.value);
                count++;
                if(count==friend_ids.length){
                    // this.setFriends(friend_ids);
                    // var friend = {};
                    // friend['H6U4ZRvLW6SL8RmIX18TYmg1hhV2'] = this.getFriends()['H6U4ZRvLW6SL8RmIX18TYmg1hhV2'];
                    // this.pushFriendOnRoom(this.thisUser,"-LPLVNVF2yM1MzyG-D71");
                    // this.pushMessageOnRoom("-LPLVNVF2yM1MzyG-D71", this.thisUser, "hi");
                    this.setFriendArray();
                }
            })
            .catch(error => console.log("Error: " + error));;
        }
    }
    addFriend(friend){
        for(var key in friend){
            this.friends[key] = friend[key];
        }
        // console.log(this.getUsersArray(this.getFriends()));
    }
    setFriendArray(): void{
		this.friendArray = this.jsonToArray(this.getFriends());
	}
    setRooms(room_ids:string[]){ 
        console.log(room_ids);
        var count = 0;
        for(var i=0;i<room_ids.length;i++){
            firebase.query(
                function(result){},
                '/rooms',
                {
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
                }
            )
            .then(result => {
                // console.log(result);
                this.addRoom(result.value);
                count++;
                if(count==room_ids.length){
                    // console.log(this.rooms);
                    this.setRoomArray();
                }
            })
            .catch(error => console.log("Error: " + error));;
        }
    }
    addRoom(room){
        for(var key in room){
            this.rooms[key] = room[key];
            this.syncRoom(key);
        }
    }
    public setRoomArray(){
		this.roomArray = this.jsonToArray(this.getRooms());
	}


    public jsonToArray(json){
        if(json!=null){
            var array = [];
            for(var key in json){
                var child_json = {};
                child_json[key] = json[key];
                array.push(child_json);
            }
            return array;
        }
        else{
            return null;
        }
    }
    
    public setGeneratedRoomID(generatedRoomID:string){
        this.generatedRoomID = generatedRoomID;
    }
    public getGeneratedRoomID(): string{
        return this.generatedRoomID;
    }
    public getFriends() {
        if(this.friends != null){
            return this.friends;
        }
        else return null;
    }
    public getRooms() {
        if(this.rooms != null){
            return this.rooms;
        }
        else return null;
    }

    logout(){
        ApplicationSettings.setBoolean("authenticated", false);
        firebase.logout();
    }
}

```
<h1>7. Design OOP model and database.</h1>
<p>Database Architect</p>
<img src="result/database/database03.png"><br>
<p>User Database</p>
<img src="result/database/database02.png"><br>
<p>User Storage</p>
<img src="result/database/database04.png"><br>
<p>Chat Database</p>
<img src="result/database/database01.png"><br>

<h1>8. Build an IOS/android App.</h1>
<h1>9. Alpha test and bug report.</h1>
<h1>10. Redesign with fancy UI.</h1>
<h1>11. Refactoring.</h1>
<h1>12. Beta test and bug report.</h1>

myApp(Back-End Development)
-----
This is fo testing database. I have tested firebase database with this.

NSPlayground(Front-End Development)
------------
This is for UI test in the application.<br>
If you want to make some UI for mobile application, it will be good choice using NSPlayground.

Contact
--------
name : SanSoo Han<br>
email : sansoo2002@naver.com<br>
phone : +82 10-8835-9229
