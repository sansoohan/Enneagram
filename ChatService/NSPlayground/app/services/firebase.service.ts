import firebase = require("nativescript-plugin-firebase");
import {Injectable, NgZone} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";

import { android, ios } from "tns-core-modules/application";
import { ImageSource } from "image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import * as imagePicker from "nativescript-imagepicker";

import { APPLICATION_MODULE_PROVIDERS } from "@angular/core/src/application_module";
import { update } from "nativescript-plugin-firebase";
var fs = require("tns-core-modules/file-system");
var mergeJSON = require("merge-json") ;
@Injectable()
export class FirebaseService {
    authuser: firebase.User;
    public thisUser: any = {};
    private friends = {};
    private rooms = {};
    private generatedRoomID: string;

    public friendArray: Array<any>;
    public roomArray: Array<any>;

    public selectedRoomID: string;
    public selectedRoomTitle: string;
    public selectedRoomUsers: any;
    public selectedRoomMessageArray: Array<any>;

    public currentProfileImageSource: ImageSource;
	public currentProfileImageFilePath: string;
	public currentBackgroundImageSource: ImageSource;
    public currentBackgroundImageFilePath: string;
    public currentBlogImageSource: ImageSource;
	public currentBlogImageFilePath: string;


    constructor(
        private routerExtensions: RouterExtensions,
    ){

    }

    //----------------------------Profile Section------------------------------------------

    pickImage(imageType:string): void {
		const context = imagePicker.create({
			mode: "single"
		});

		context
		.authorize()
		.then(() => context.present())
		.then((selection) => selection.forEach(
			(selectedAsset: ImageAsset) => {
				this.getImageFilePath(selectedAsset, imageType).then((filePath: string) => {
                    if(imageType === "blog"){
						this.currentBlogImageFilePath = filePath;
					}
                    if(imageType === "profile"){
						this.currentProfileImageFilePath = filePath;
                    }
					else if(imageType === "background"){
						this.currentBackgroundImageFilePath = filePath;
					}
				});

				(new ImageSource()).fromAsset(selectedAsset).then((imageSource) => {
                    if(imageType === "blog"){
						this.currentBlogImageSource = imageSource;
					}
					if(imageType === "profile"){
						this.currentProfileImageSource = imageSource;
					}
					else if(imageType === "background"){
						this.currentBackgroundImageSource = imageSource;
					}
				});
			})
		).catch((errorMessage: any) => console.log(errorMessage));
	}

	getImageFilePath(imageAsset, imageType:string): Promise<string> {
		return new Promise((resolve) => {
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

            if (android) { // return imageAsset.android, since it's the path of the file
                if(imageType === "blog"){
                    this.currentBlogImageFilePath = imageAsset.android;
                }
				if(imageType === "profile"){
					this.currentProfileImageFilePath = imageAsset.android;
				}
				else if(imageType === "background"){
					this.currentBackgroundImageFilePath = imageAsset.android;
				}
				resolve(imageAsset.android);
			}
			// resolve(null);
		});
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
            var room = room_id;
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            this.updateRoom(room, result.value);
        }, "/rooms/"+room_id+"/messages").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    updateRoom(room_id:string, messages:any){
        this.rooms[room_id]['messages'] = messages;
        if(room_id == this.selectedRoomID){
            this.selectedRoomMessageArray = this.jsonToArray(messages);
            this.sortMessageArrayWithTimeStamp(this.selectedRoomMessageArray);
            console.log(this.selectedRoomMessageArray.length);
        }
        // console.log(this.rooms);
    }
    sortMessageArrayWithTimeStamp(messageArray){
        if(messageArray==null){
            return null;
        }
        messageArray.sort(function (a, b) {
            var message_a;
            var message_b;
            for(var key in a){
                message_a = a[key];
            }
            for(var key in b){
                message_b = b[key];
            }
            return message_a['timestamp']['time'] - message_b['timestamp']['time'];
        });
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
            var open_room = {room_users:""};
            open_room['room_users'][uid] = user[uid];
            open_room['isOpen'] = true;
            open_room['openTime'] = new Date();
            open_room['closeTime'] = "";
            open_room['title'] = "";
            open_room['iconsrc'] = "";
            firebase.push('/rooms/', "").then(result => {
                firebase.setValue('/rooms/'+result.key, open_room).then(result2 => {
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

    //----------------------------Blog Section------------------------------------------

    generatePost(user:any, post_id:string, post:any){
        var open_post = {};
        if(post==null){
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
        else{
            open_post = post;
        }

        for(var uid in user){
            if(post_id==null){            
                firebase.push('/blogs/'+uid+'/posts', "").then(result => {
                    firebase.setValue('/blogs/'+uid+"/posts/"+result.key, open_post).then(result2 => {
                        this.pushPostIDOnUser(user, result.key);
                    });
                    console.log("created key: " + result.key);// Room ID
                });
            }
            else{
                open_post = post[post_id];
                firebase.setValue('/blogs/'+uid+"/posts/"+post_id, open_post).then(result2 => {                    
                });
            }
        }
    }
    
    pushPostIDOnUser(user:any, room_id:string){
        for(var uid in user){
            firebase.setValue('/users/'+uid+'/user_blogs/'+room_id, true).then(result => {
                // this.pushUserIDOnRoom(uid);
            });
        }
    }

    //----------------------------Auth Section------------------------------------------

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


    //----------------------------Init Section------------------------------------------

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
                    this.pushMessageOnRoom("-LPLVNVF2yM1MzyG-D71", this.thisUser, "hi");
                    this.setFriendArray();
                    // this.generatePost(this.thisUser);
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
