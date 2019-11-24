import * as firebase from "nativescript-plugin-firebase";
import * as firebaseWeb from "nativescript-plugin-firebase/app";

import { Injectable, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { android, ios } from "tns-core-modules/application";

import { ImageAsset } from "tns-core-modules/image-asset";
import * as ApplicationSettings from "application-settings";
import * as imagePicker from "nativescript-imagepicker";
import { firestore } from "nativescript-plugin-firebase";
var fs = require("tns-core-modules/file-system");

@Injectable()
export class FirebaseService {
    public authuser: firebase.User;    
    public thisUser: any = {};
    public thisUserName = "";
    public thisUSerEmail = "";

    public friends = {};
    public rooms = {};
    private generatedRoomID: string;
    public selectedFriendID: string;

    public friendArray: Array<any>;
    public roomArray: Array<any>;

    public selectedRoomID: string;
    public selectedRoomTitle: string;

    public selectedRoomMessageArray: Array<any>;
    public messageUpdatedToggle: boolean = false;

	public currentProfileImageFilePath: string;
    public currentBackgroundImageFilePath: string;
	public currentBlogImageFilePath: string;
    
    public currentProfileImageFileURL = "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fuser-avatar-main-picture.png?alt=media&token=b749d53c-a1e5-446f-9afa-e8f7ee528333";
    public currentBackgroundImageFileURL = "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fmountain-range-on-black-background.png?alt=media&token=26ce5feb-098d-4500-914a-d73880352539";
	public currentBlogImageFileURL: string;

    testData: Array<any>;

    public postSearchResultArray: Array<any> = [];
    public selectedPostID: string;

    private androidBannerId: string = "	ca-app-pub-3940256099942544/2934735716";
    private androidBannerTestId: string = "ca-app-pub-3940256099942544/6300978111";
    private androidInterstitialId: string = "ca-app-pub-5445779750154576/2145420061";
    private androidInterstitialTestId: string = "ca-app-pub-3940256099942544/6300978111";
    private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
    private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";

    constructor(
        private routerExtensions: RouterExtensions,
    ){

    }

    //------------------------ Analyzing User Section ------------------
    analyticsCount(activityName: string): void{
        firebase.analytics.logEvent({
            key: activityName
        }).then(
            function () {
                // console.log("Firebase Analytics event logged");
            }
        );
    }

    //---------------------------- Updating Profile Section -----------------------------------
    setThisUserProfile(data){
        firebase.setValue('/users/' + this.authuser.uid + '/profile', data).then(result => {
            console.log(JSON.stringify(result));
        });
    }

    //---------------------------- New Posting Section ------------------------------------------
    public searchQueries(
        type:string,
        otheruserEnneagramNums:number[],
        originLatitude:number,
        originLongitude:number,
        distanceMeter:number,
    ){
        this.postSearchResultArray = [];
        for(var i=0;i<otheruserEnneagramNums.length;i++){
            // console.log("type"+otheruserEnneagramNums[i]);
            this.searchPost(type,otheruserEnneagramNums[i],originLatitude,originLongitude,distanceMeter);
        }
    }

    private searchPost(
        type:string,
        otheruserEnneagramNum:number,
        originLatitude:number,
        originLongitude:number,
        distanceMeter:number
    ): void {
        const ONE_DEGREE_EARTH_PER_METER = 111000;

        var maxLatitudeDegree = originLatitude + distanceMeter/(2*ONE_DEGREE_EARTH_PER_METER);
        var minLatitudeDegree = originLatitude - distanceMeter/(2*ONE_DEGREE_EARTH_PER_METER);
        if(maxLatitudeDegree >= 90){
            maxLatitudeDegree = 90;
        }
        if(minLatitudeDegree <= -90){
            minLatitudeDegree = -90;
        }
        
        var maxLongitudeDegree = originLongitude + distanceMeter/(2*ONE_DEGREE_EARTH_PER_METER*Math.sin(originLatitude * (180 / Math.PI)));
        var minLongitudeDegree = originLongitude - distanceMeter/(2*ONE_DEGREE_EARTH_PER_METER*Math.sin(originLatitude * (180 / Math.PI)));
        if(maxLongitudeDegree - minLongitudeDegree >= 360){
            maxLongitudeDegree = 180;
            minLongitudeDegree = -180;
        }
        else{
            if(maxLongitudeDegree >= 180){
                maxLongitudeDegree = maxLongitudeDegree - 360;
            }
            if(minLongitudeDegree <= -180){
                minLongitudeDegree = minLongitudeDegree - 360;
            }
        }

        if(minLongitudeDegree > maxLongitudeDegree){
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
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.data().latitude <= maxLatitudeDegree && doc.data().latitude >= minLatitudeDegree){
                    // console.log(`searched doc : ${doc.id} => ${JSON.stringify(doc.data())}`);
                    var searchResult = {};
                    searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                    for(var id in searchResult){
                        searchResult[id]['like_count'] = 0;
                        // console.log(id);
                        for(var userId in searchResult[id]['likes']){
                            searchResult[id]['like_count']++;
                            // console.log(userId);
                            if(this.authuser.uid === userId){
                                searchResult[id]['is_like'] = true;
                                console.log(userId+" Ok");
                            }
                            else{
                                searchResult[id]['is_like'] = false;
                            }
                        }
                    }
                    for(var id in searchResult){
                        for(var userId in searchResult[id]['favorites']){
                            if(this.authuser.uid === userId){
                                searchResult[id]['is_favorite'] = true;
                            }
                            else{
                                searchResult[id]['is_favorite'] = false;
                            }
                        }
                    }
                    for(var id in searchResult){
                        searchResult[id]['comment_count'] = 0;
                        searchResult[id]['is_comment'] = false;
                        if(searchResult[id]['comments']===null || searchResult[id]['comments']===""){
                            searchResult[id]['comments'] = new Array<any>();
                        }
                        else{
                            // for(var i=0; i<searchResult[id]['comments'].length; i++){
                            //     searchResult[id]['comment_count']++;
                            // }
                        }
                    }
                    this.postSearchResultArray.push(searchResult);
                }
            });
        });
    }

    public getUserPosts(userID: string) {
        this.postSearchResultArray = [];
        firebaseWeb.firestore()
        .collection("posts")
        .where("roles."+userID, "==", "owner")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                var searchResult = {};
                searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                this.postSearchResultArray.push(searchResult);
                // console.log(this.postSearchResultArray);
            });
        });
    }

    public addPost(postData: any): void {
        firebaseWeb.firestore()
        .collection("posts")
        .add(postData).then(documentRef => {
            // console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    }
    public updatePost(postData: any): void {
        firebaseWeb.firestore()
        .collection("posts")
        .add(postData).then(documentRef => {
            // console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    }
    public getPost(): firestore.DocumentData|void {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .get().then(document => {
            // console.log(document);
            if(!document.exists){
                console.log('Post is not exist!');
                return null
            }
            else{
                console.log(document.data());
                return document.data();
            }
        });
    }

    public addComment(): void{
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var postOwnerID = this.authuser.uid;
        var commentData = {};
        commentData['comment'] = "Hello";
        commentData['timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        commentData['roles'][postOwnerID] = 'owner';
        firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("comments")
        .add(commentData).then(documentRef => {
            console.log(`auto-generated comment ID: ${documentRef.id}`);
        });
    }

    public toggleLikeOnComment(): void {//postID:string, commentID: string, data: any){
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
    }
    public toggleLikeOnPost(): void {//postID:string, data: any){
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentData = {};
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        var likeCollection = firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("likes");
        this.toggleData(likeCollection, commentData);
    }
    public toggleFavoriteOnPost(): void {//postID:string, data: any){
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentData = {};
        commentData['roles'] = {};
        commentData['roles'][this.authuser.uid] = 'commenter';
        var favoriteCollection = firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("favorites");
        this.toggleData(favoriteCollection, commentData);
    }

    private toggleData(collection: firebase.firestore.CollectionReference, data: any): void {
        collection.doc(this.authuser.uid)
        .get().then(document => {
            // console.log(document);
            if(!document.exists){
                this.toggleOn(collection, data);
            }
            else{
                this.toggleOff(collection);
            }
        });
    }
    private toggleOn(collection: firebase.firestore.CollectionReference, data: any): void {
        collection.doc(this.authuser.uid)
        .set(data).then(() => {
            console.log('marked ID : ' + this.authuser.uid);
        });
    }
    private toggleOff(collection: firebase.firestore.CollectionReference): void {
        collection.doc(this.authuser.uid)
        .delete().then(()=>{
            console.log('unmarked ID :'+ this.authuser.uid);
        });
    }
    addLike(a,b){

    }

    public getLikeOnComment() :Array<any>|void {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        var commentID = 'NAE7GN4EoSJaVNkFQCBJ';
        firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("comments").doc(commentID)
        .collection("likes")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data());
            });
            return querySnapshot.docSnapshots.length;
        });
    }
    public getLikeOnPost() :number|void {
        var postID = '71tjD5w4TpfDKGt4zNZ4';
        firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("likes")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data());
            });
            return querySnapshot.docSnapshots.length;
        });
    }
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
    public updateComment(postID, commentID, commentData): void {
        firebaseWeb.firestore()
        .collection("posts").doc(postID)
        .collection("comments").doc(commentID)
        .update(commentData).then(() => {
            // console.log("comment updated");
        });
    }

    public getSelectedPost(): void {
        for(var i=0 ;i<this.postSearchResultArray.length;i++){
            for(var postID in this.postSearchResultArray[i]){
                if(this.selectedPostID === postID){
                    return this.postSearchResultArray[i];
                }
            }
        }
    }
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
    public pickImage(imageType:string): void {
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
                    this.uploadFile(imageType,filePath);
				});

			})
		).catch((errorMessage: any) => console.log(errorMessage));
    }
	private getImageFilePath(imageAsset, imageType:string): Promise<string> {
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
    private uploadFile(fileType:string, filePath:string){
        var fileClass;
        var filePathSplited = filePath.split('/');
        var fileName = filePathSplited[filePathSplited.length-1];
        if(fileType === "blog"){
            fileClass = "/blog/";
        }
        else if(fileType === "profile"){
            fileClass = "/profile/";
        }
        else if(fileType === "background"){
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
            onProgress: function(status) {
                // console.log("Uploaded fraction: " + status.fractionCompleted);
                // console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(
            uploadedFile => {
                // console.log("File uploaded: " + JSON.stringify(uploadedFile));
                this.getFileURL(fileType, this.authuser.uid, uploadedFile.name);
            },
            function (error) {
                console.log("File upload error: " + error);
            }
        );
    }

    // 2. get the picture URL for uploading the blog.
    private getFileURL(imageType, uid, fileName){
        var fileURL;
        if(imageType ==="blog"){
            fileURL = "/blog/" + fileName;
        }
        else if(imageType ==="profile"){
            fileURL = "/profile/" + fileName;
        }
        else if(imageType ==="background"){
            fileURL = "/profile/" + fileName;
        }
        firebase.storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            // bucket: 'gs://chat-demo-5d3a7.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'users/' + uid + fileURL,
        }).then(
            url => {
                // console.log("Remote URL: " + url);
                if(imageType ==="blog"){
                    this.currentBlogImageFileURL = url;
                }
                else if(imageType ==="profile"){
                    this.currentProfileImageFileURL = url;
                }
                else if(imageType ==="background"){
                    this.currentBackgroundImageFileURL = url;
                }
            },
            function (error) {
                console.log("Error: " + error);
            }
        );
    }
    
    //---------------------------- Chatting Section ------------------------------------------
    // Listen Chat Rooms from Chat Database.
    private syncThisUserRoomList(): void{
        firebase.addChildEventListener(result => {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            this.updateRoom(result.key);
        }, "/users/" + this.authuser.uid + "/user_rooms").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    private updateRoom(updatedRoomID: string): void {
        firebase.getValue('/rooms/' + updatedRoomID).then(result =>{
            // console.log(JSON.stringify(result));
            this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(error => console.log("Error: " + error));
    }

    // Listen Chat Messages from Chat Database.
    private syncRoomMessages(roomID: string): void {
        firebase.addChildEventListener(result => {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            this.updateRoomMessages(roomID, result.key ,result.value);
        }, "/rooms/"+roomID+"/messages").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    private updateRoomMessages(roomID:string, messageID:any, message:any){
        if(!this.rooms[roomID]['messages']){
            this.rooms[roomID]['messages'] = {};
        }
        this.rooms[roomID]['messages'][messageID] = JSON.parse(JSON.stringify(message));
        var messageToAdd = {};
        messageToAdd[messageID] = this.rooms[roomID]['messages'][messageID]
        if(roomID == this.selectedRoomID){
            this.selectedRoomMessageArray.push(messageToAdd);
            this.sortMessageArrayWithTimeStamp(this.selectedRoomMessageArray);
            this.messageUpdatedToggle = true;
            // console.log(this.selectedRoomMessageArray.length);
        }
        // console.log(this.rooms);
    }
    sortMessageArrayWithTimeStamp(messageArray){
        if(messageArray==null){
            return null;
        }
        messageArray.sort(function (a, b) {
            var messageA;
            var messageB;
            for(var key in a){
                messageA = a[key];
            }
            for(var key in b){
                Date
                messageB = b[key];
            }
            var time_b = messageB['timestamp']['time'];
            var time_a = messageA['timestamp']['time'];
            return time_a - time_b;
        });
    }
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    pushFriendOnRoom(user:any, roomID:string){
        for(var uid in user){
            firebase.setValue('/rooms/'+roomID+"/room_users/"+uid, user[uid]).then(result2 => {
                // this.pushRoomIDOnUser(user, roomID);
            });
        }
    }

    // Generate New Room on Chat Database.
    generateRoomWithSelectedFriends(user:any, friend:any){
        var friendID;
        for(var id in friend){
            friendID = id;
        }
        var userID;
        for(var id in user){
            userID = id;
        }
        // check room exist before generate.
        firebase.query(
            result => {
                // if friend chat room is not exist, create new room.
                if(result['value'] == null){
                    // console.log("no room with friendID: " + friendID);
                    var openRoom = {roomUsers:{}};
                    openRoom['isOpen'] = true;
                    openRoom['openTime'] = new Date();
                    openRoom['closeTime'] = "";
                    for(var uid in user){
                        firebase.push('/rooms/', openRoom).then(result2 => {
                            this.pushRoomIDOnUser(user, friend, result2.key);
                            this.pushRoomIDOnUser(friend, user, result2.key);
                            this.setGeneratedRoomID(result2.key);
                            // console.log("created key: " + result2.key);// Room ID
                        });
                    }
                }
                // if friend chat room is exist, don't make new one.
                else{
                    // console.log(result);
                    for(var roomID in result['value']){
                        this.selectedRoomMessageArray = this.jsonToArray(this.rooms[roomID]['messages']);
                    }
                    // console.log("exist room: " + JSON.parse(JSON.stringify(result['value'])));// Room ID
                }
            },
            '/users/' + userID + '/user_rooms',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.VALUE,
                    // value: 'test' // mandatory when type is 'child'
                },
                range: {
                   type: firebase.QueryRangeType.EQUAL_TO,
                   value: friendID
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 2
                }
            }
        )
        .then(result => {

        })
        .catch(error => console.log("Error: " + error));
    }
    //Set User Access for Chat Room on Chat Database.
    pushRoomIDOnUser(user:any, friend:any, roomID:string){
        var userRoom = {};
        userRoom['inRoom'] = true;
        userRoom['joinTime'] = Date.now();
        userRoom['leaveTime'] = "";
        for(var friendID in friend){
            for(var uid in user){
                userRoom['roomIcon'] = friend[friendID]["profile"]["profilePicsrc"];
                userRoom['title'] = friend[friendID]["profile"]["name"];
                userRoom['messageIcon'] = user[uid]["profile"]["profilePicsrc"];
                userRoom['userName'] = user[uid]["profile"]["name"];
                // set room access athentication on user database
                firebase.setValue('/users/'+uid+'/user_rooms/'+roomID, friendID).then(result => {
                    // user can write on chat room
                    firebase.setValue('/rooms/'+roomID+'U/'+uid, userRoom).then(result2 => {
                        // console.log(result);
                        this.syncRoomMessages(roomID);
                    });
                });
            }
        }
    }

    // Add Message on Chat Database.(Other users are listening Chat Database)
    pushMessageOnRoom(roomID:string, user:any, message:string){
        var messagePack = {};
        for(var uid in user){
            messagePack['user'] = uid;
        }
        messagePack['message'] = message;
        messagePack['timestamp'] = new Date();
        firebase.push('/rooms/'+roomID+'/messages', messagePack).then(result => {                
            // console.log("created key: " + result.key);// Message_pack ID
        });
    }

    // Select Friend for a Modal or Chat Room.
    public setSelectedFriendID(selectedFriendID: string): void {
        this.selectedFriendID = selectedFriendID;
    }
    public getSelectedFriendID(): string {
        return this.selectedFriendID;
    }

    //---------------------------- Auth Section ------------------------------------------
    public register(email, passwd): Promise<string|void> {
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

    public loginByEmail(user: any): void {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then((result: any) => {
            this.setCurrentUser();
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    public loginByFacebook(): void {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            // Optional
            facebookOptions: {
              // defaults to ['public_profile', 'email']
              scopes: ['public_profile', 'email']
            }
        }).then((result: any) => {
            this.setCurrentUser();
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    public loginByGoogle(): void {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
            // Optional 
            googleOptions: {
              hostedDomain: "chat-demo-5d3a7.firebaseapp.com"
            }
        }).then((result: any) => {
            this.setCurrentUser();
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    private setCurrentUser(): void {
        firebase.getCurrentUser().then(user => {
            this.authuser = user;
            this.checkFirstUser();
        });
    }

    // if thisuser is first user, make a firstuser data in firebase
    private checkFirstUser(): void {
        firebase.getValue('/users/' + this.authuser.uid).then(result =>{
            // console.log(JSON.stringify(result));
            let newUserData = {
                "enneagram" : {
                    "behavior" : "",
                    "emotion" : "",
                    "number" : 0,
                    "state" : "",
                    "thought" : ""
                },
                "friends" : {
                },
                "profile" : {
                    "backgroundPicsrc" : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fmountain-range-on-black-background.png?alt=media&token=26ce5feb-098d-4500-914a-d73880352539",
                    "country" : "Korea",
                    "email" : this.authuser.email,
                    "gender" : "",
                    "interest" : "",
                    "introducing" : "",
                    "language" : "",
                    "name" : this.authuser.email,
                    "profilePicsrc" : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/firstuser%2Fimages%2Fuser-avatar-main-picture.png?alt=media&token=b749d53c-a1e5-446f-9afa-e8f7ee528333"
                },
                "user_rooms" : {
                }
            }
            if(result.value == null){
                firebase.setValue('/users/' + this.authuser.uid, newUserData).then(result => {
                    // console.log("first user ok");
                    // console.log(JSON.stringify(result));
                    ApplicationSettings.setBoolean("authenticated", true);
                    this.routerExtensions.navigate(["/home"], { clearHistory: true } );
                });
            }
            else{
                // console.log("user ok");
                this.setAuthUser();
                ApplicationSettings.setBoolean("authenticated", true);
                this.routerExtensions.navigate(["/home"], { clearHistory: true } );
            }
        }).catch(error => console.log("Error: " + error));
    }

    //---------------------------- Init Section ------------------------------------------
    public setAuthUser(){
        // set thisUser
        firebase.getValue('/users/' + this.authuser.uid).then(result =>{
            this.setThisUser(result);
        }).catch(error => console.log("Error: " + error));
        // set friends
        firebase.getValue('/users/' + this.authuser.uid + '/friends').then(result =>{
            var resultKeys = [];
            for(var k in result.value){
                resultKeys.push(k);
            }
            this.setFriends(resultKeys);
        }).catch(error => console.log("getFriendsAndThisUserFromDatabase Error: " + error));
        // set rooms
        firebase.getValue('/users/' + this.authuser.uid + '/user_rooms').then(result =>{
            var resultKeys = [];
            for(var k in result.value){
                resultKeys.push(k);
            }
            this.setRooms(resultKeys);
        }).catch(error => console.log("getFriendsAndThisUserFromDatabase Error: " + error));
        // this.notifyToUser();
    }
    private setThisUser(result:any){
        var key = JSON.parse(JSON.stringify(result.key));
        var value = JSON.parse(JSON.stringify(result.value));
        var user = {};
        user[key] = value;
        this.thisUser = user;
        this.analyzeUserLogin(this.authuser.uid);
        // console.log(this.thisUser);
    }
    private analyzeUserLogin(id:string){
        firebase.analytics.setAnalyticsCollectionEnabled(true);
        firebase.analytics.setUserId({
            userId: id
        }).then(
            function () {
            // console.log("Analytics userId set");
            }
        );
    }
    
    private setFriends(friendIDs:string[]){ 
        // console.log(friendIDs);
        var count = 0;        
        for(var i=0;i<friendIDs.length;i++){
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
                        value: friendIDs[i]
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
                if(count==friendIDs.length){
                    this.setFriendArray();
                }
            })
            .catch(error => console.log("Error: " + error));;
        }
    }
    private addFriend(friend){
        for(var key in friend){
            this.friends[key] = friend[key];
        }
        // console.log(this.getUsersArray(this.getFriends()));
    }
    private setFriendArray(): void{
		this.friendArray = this.jsonToArray(this.getFriends());
	}
    private setRooms(roomIDs: string[]): void{ 
        // console.log(roomIDs);
        var count = 0;
        for(var i=0;i<roomIDs.length;i++){
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
                        value: roomIDs[i]
                    },
                    limit: {
                        type: firebase.QueryLimitType.LAST,
                        value: 3000
                    }
                }
            )
            .then(result => {
                this.addRoom(result.value);
                count++;
                if(count==roomIDs.length){
                    // console.log(this.rooms);
                    this.setRoomArray();
                    this.syncThisUserRoomList();
                    this.setCurrentUserPicture ();
                    // this.testAddComment();
                    this.toggleLikeOnComment();
                    this.toggleLikeOnPost();
                    this.toggleFavoriteOnPost();
                    this.getLikeOnComment();
                    this.getPost();
                }
            })
            .catch(error => console.log("Error: " + error));;
        }
    }

    private addRoom(room): void{
        for(var key in room){
            this.rooms[key] = room[key];
            this.syncRoomMessages(key);
        }
    }
    private setRoomArray(): void{
        this.roomArray = this.jsonToArray(this.getRooms());
	}

    public jsonToArray(json): Array<any>{
        var array = [];
        if(json!=null){
            for(var key in json){
                var childJson = {};
                childJson[key] = json[key];
                array.push(childJson);
            }
        }
        return array;
    }
    
    private setCurrentUserPicture(): void{
        for(var id in this.thisUser){
            if(this.thisUser[id]['profile']['backgroundPicsrc'] !== ""){
                this.currentBackgroundImageFileURL = this.thisUser[id]['profile']['backgroundPicsrc'];
            }
            if(this.thisUser[id]['profile']['profilePicsrc'] !== ""){
                this.currentProfileImageFileURL = this.thisUser[id]['profile']['profilePicsrc'];
            }
		}
    }

    public setGeneratedRoomID(generatedRoomID: string): void{
        this.generatedRoomID = generatedRoomID;
        this.selectedRoomID = generatedRoomID;
    }
    public getGeneratedRoomID(): string{
        return this.generatedRoomID;
    }
    public getFriends(): any {
        if(this.friends != null){
            return this.friends;
        }
        else return null;
    }
    public getRooms(): any {
        if(this.rooms != null){
            return this.rooms;
        }
        else return null;
    }

    public logout(): void {
        ApplicationSettings.setBoolean("authenticated", false);
        firebase.logout();
        this.authuser == null;
    }
}
