import firebase = require("nativescript-plugin-firebase");
import { firestore } from "nativescript-plugin-firebase";
import firebaseWeb = require("nativescript-plugin-firebase/app");

import {Injectable, NgZone} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";


import { android, ios } from "tns-core-modules/application";
import { ImageSource } from "image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import * as ApplicationSettings from "application-settings";
import * as imagePicker from "nativescript-imagepicker";
var fs = require("tns-core-modules/file-system");

@Injectable()
export class FirebaseService {
    public authuser: firebase.User;    
    public thisUser: any = {};
    public thisUserProfilePicsrc = "";
    public thisUserBackgroundPicsrc ="";
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

    public currentProfileImageFileURL: string;
    public currentBackgroundImageFileURL: string;
	public currentBlogImageFileURL: string;

    test_data: Array<any>;

    public postSearchResultArray: Array<any> = [];
    public selectedPostID: string;
    constructor(
        private routerExtensions: RouterExtensions,
    ){
        this.test_data = [{
            behavior : "",
            emotion : "",
            number : 9,
            state : "good",
            thought : "",
            closeTime : "",
            description : "",
            image : "",
            isOpen : true,
            likes : "",
            latitude: 37.325240604800946,
            longitude: 127.12098587304354,
            name : "",
            openTime : {
              date : 25,
              day : 4,
              hours : 20,
              minutes : 50,
              month : 9,
              seconds : 44,
              time : 1540468244400,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"5FgrewJa2Mh9C598k70HQ40b1qu1" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 2,
            state : "good",
            thought : "",
            closeTime : "",
            description : "Marvel at more than 2,000 natural rock arches at this park just outside of Moab. Some of the formations can be spotted from the road, but the best require a scenic hike. Don’t miss the famous Delicate Arch (3 miles round-trip) or the 7-mile (round-trip) Devils Garden Loop.\n\nThe Park Avenue Trail is the most popular hike in the park because of its ease and scenery at just 2 miles round trip. Or try the more challenging hike to Delicate Arches at 3.2 miles round trip.\n\nWhether you are camping or staying in a hotel, don’t forget to spend some time looking up at the sky after night falls. You’ll find some of the darkest skies in and around Utah’s national parks.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FH6U4ZRvLW6SL8RmIX18TYmg1hhV2%2Farches-delicate-arch-sky_adobe_680.jpg?alt=media&token=6cb48ab5-96f5-43b2-9ea1-6749cdbed38f",
            isOpen : true,
            likes : 245,
            latitude: 37.323080469252254,
            longitude: 127.12255798280238,
            name : "Arches National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 34,
              month : 9,
              seconds : 49,
              time : 1540341289918,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"H6U4ZRvLW6SL8RmIX18TYmg1hhV2" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 8,
            state : "good",
            thought : "",
            closeTime : "",
            description : "Nicknamed the \"Crown of the Continent,\" Glacier National Park sits in the northwest corner of Montana. Glacier National Park is just a scenic day’s drive north from Yellowstone.\n\nHit the trail to explore places like Fishercap Lake (pictured), which is a great place to spot a moose. From Many Glacier Campground, go to the Swiftcurrent Motor Inn parking lot. The trailhead is on the west end. You'll find the lake less than a mile down the trail. Continue 1.5 miles to Redrock Lake and take a spur to Redrock Falls.\n\nA National Historic Landmark, Going-to-the-Sun Road is one of the most scenic roads in North America, not to mention one of the most complex to build. The final section, over Logan Pass, was completed in 1932 after 11 years of work. Considered an engineering feat, the construction of the road forever changed the way visitors would experience Glacier National Park. Future visitors would be able to drive over sections of the park that previously had taken days of horseback riding to see.\n\nIn their ability to wow visitors, Yellowstone and Glacier share a common bond. But as with any great destination, there are some adventures that are found nowhere else. Glacier preserves over 1,000,000 acres of forests, alpine meadows and lakes. Its diverse habitats are home to over 70 species of mammals and over 260 species of birds. The spectacular glaciated landscape is a hiker’s paradise, containing 700 miles of maintained trails that lead deep into one of the largest intact ecosystems in the lower 48 states.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FHcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2%2Fglacier-avalache-lake-kids_adobe_680.jpg?alt=media&token=50870c5e-b1e6-4d51-be9a-d9cd2d627242",
            isOpen : true,
            likes : 152,
            latitude: 37.32160230566423,
            longitude: 127.12806019932033,
            name : "Glacier National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 39,
              month : 9,
              seconds : 3,
              time : 1540341543794,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"HcBjRLszVnS5tPscDWg0ZDOoxxP2" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 6,
            state : "",
            thought : "",
            closeTime : "",
            description : "Just 15 miles south of Moab, hike your way through 337, 598 acres of dramatic red-rock landscape in Canyonlands NP, and do it all without having to compete for room on the trail - Canyonlands is both Utah’s largest and least visited park.\n\nThe river-carved park boasts 360-degree views of rust-colored arches, buttes, and cliffs - but because of the high-desert rock environment, its climate is subject to extreme temperature fluctuations. Skip packing the parka, and go in the spring or fall for the most moderate, and most forgiving, weather.\n\nSo expansive it’s divided into four districts, Canyonlands delivers a quintessential desert experience: deep canyons, prehistoric rock art, rivers, and sweeping overlooks.\n\nAmong the exceptional, striated rock formations, there are landmarks you shouldn’t miss, like the unusual 1500-foot Upheaval Dome - thought to be a meteorite crater - or the Druid Arch, often referred to as Utah’s own Stonehenge. Keep watch for the wildlife, too. Bighorn sheep take residence in the canyons and buttes, along with mule deer, kangaroo rats, and coyote. Look up for red- tailed hawks, and at night, for one of the darkest skies in the Lower 48. On a moonless night, get more than your fill of stars - or get out the binoculars to try for the rings of Saturn.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FI33CAKsu5uUkq4Xqt2xUVJgcGHM2%2Fcanyonlands-mesa-arch-sunrise_dollar_680.jpg?alt=media&token=9175f69d-a5b2-4828-8b98-d05d1d1e0f61",
            isOpen : true,
            likes : 385,
            latitude: 37.32128395277468,
            longitude: 127.12614510208367,
            name : "Canyonlands National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 39,
              month : 9,
              seconds : 27,
              time : 1540341567889,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"I33CAKsu5uUkq4Xqt2xUVJgcGHM2" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 5,
            state : "bad",
            thought : "",
            closeTime : "",
            description : "Divided by a 277-mile long canyon, and the mile-deep Colorado River, the two halves of Grand Canyon National Park, the North and South Rim, offer two parks in one, with diverse landscape and ecology on either.\n\nGrand Canyon National Park, and the greater Grand Canyon region, is a hiker's dream. Most of Grand Canyon National Park is undeveloped backcountry. There are literally hundreds of miles to hike, backpack and explore. Despite the Grand Canyon's popularity and numbers of visitors each year, visitors only need to hike a small distance to enjoy some solitude.\n\nExplore the depths of the Grand Canyon National Park on popular trails like the Bright Angel and South Kaibab trail on a mule. A Grand Canyon mule ride is an adventure and easy on your legs.\n\nOne of the most exciting ways to experience the Grand Canyon is to float through it by way of raft on the Colorado River. Most people book their trip with a commercial outfitter and you can even combine the rafting trip with a helicopter ride. Experienced whitewater rafter? Enter the lottery to do your own trip.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FNfYE2dF2wlfSBWwWvEk0KsiTs1t1%2Fgc-yavapai-point-sunset_dp_680.jpg?alt=media&token=5180e2f4-99a6-4e1e-b744-faebaf9204e9",
            isOpen : true,
            likes : 514,
            latitude: 37.32128395277468,
            longitude: 127.12614510208367,
            name : "Grand Canyon National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 39,
              month : 9,
              seconds : 49,
              time : 1540341589674,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"NfYE2dF2wlfSBWwWvEk0KsiTs1t1" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 1,
            state : "",
            thought : "",
            closeTime : "",
            description : "Maximize your experience at Bryce Canyon National Park by driving to Sunrise, Sunset, Inspiration and Bryce viewpoints. These are all spectacular overlooks of the park’s red hoodoos shooting up against evergreen forests in the background. Depending on the time of day, and the angle and light of the sun, the hoodoos and mysterious rock formations often take on unusual patterns and shapes, and some think, imaginary faces.\n\nFor more inspiration, lace up your hiking boots or other sturdy shoes and explore a trail. There is something for everyone at Bryce Canyon. Our favorite easy hikes include Bristlecone Loop Trail and Queens Garden Trail. Hat Shop is our favorite moderate hike. For more physically fit hikers looking for a strenuous adventure, do the 5.5-mile vertically challenging Peek-A-Boo Loop or the 7.9 Fairyland Loop rated “difficult” by the park service. ",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FRz20yC7LESOCDUoa4sp69v5copT2%2Fbryce-amphitheater-inspiration-point_dp_680.jpg?alt=media&token=06d154b7-80d8-46c9-9fdf-e3e70ec43951",
            isOpen : true,
            likes : 245,
            latitude: 37.32086321296732,
            longitude: 127.12435875087976,
            name : "Bryce Canyon National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 40,
              month : 9,
              seconds : 21,
              time : 1540341621381,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"Rz20yC7LESOCDUoa4sp69v5copT2" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 9,
            state : "",
            thought : "",
            closeTime : "",
            description : "Grand Teton National Park preserves a spectacular landscape rich with majestic mountains, pristine lakes, and extraordinary wildlife. The abrupt vertical rise of the jagged Teton Mountains contrasts with the horizontal sage-covered valley and glacial lakes at its base.\n\nIt took more than 30 years for Grand Teton National Park to transform from an idea to one of the country's most stunning parks. When Congress created the park in 1929, it only included the Teton Range and six glacial lakes. John D. Rockefeller, Jr., played a key role in acquiring an additional 35,000 acres for the park under the name \"Snake River Land Co.\" Amid controversy the \"new\" Grand Teton National Park was established Sept. 14, 1950, by President Harry Truman.\n\nGrand Teton National Park and its world-class scenery attracts nearly 4 million visitors per year. With Jenny Lake and Jackson Lake at 6,320 feet and the summit of the Grand Teton at 13,770 feet, the park's elevation ranges create one of the nation's most awe-inspiring landscapes. In addition to gazing at the incredible views, there is much to do in this park from hiking and rock climbing to boating and fishing. And when you need a break from outdoor adventure, there are few better places to simply relax and watch the park's incredible wildlife.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FasqU21QzltYOgnT5MDcgWotRJwH2%2Fgteton-schwabachers-landing_dollar_680.jpg?alt=media&token=d3abfbd0-b725-4b0c-97e5-f616bdb70305",
            isOpen : true,
            likes : 169,
            latitude: 37.32137487279108,
            longitude: 127.12210066616537,
            name : "Grand Teton National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 40,
              month : 9,
              seconds : 47,
              time : 1540341647762,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"asqU21QzltYOgnT5MDcgWotRJwH2" : "owner"},
            type : "chat"
          },
          {
            behavior : "",
            emotion : "",
            number : 3,
            state : "good",
            thought : "",
            closeTime : "",
            description : "Explore South Dakota’s Black Hills region, a natural wonder in its own right. Located about six hours from Yellowstone, the Black Hills are home to seven national sites — Badlands National Park, Jewel Cave National Monument, the Lewis & Clark National Historic Trail, Minuteman Missile National Historic Site, Missouri National Recreational River, Mount Rushmore National Memorial, and Wind Cave National Park.\n\nIn this natural playground, you can enjoy an abundance of recreational opportunities, gorgeous scenic drives — which include the beautiful Spearfish Canyon — and wildlife-watching. This region is also packed with cultural and historical sites.\n\nWhile you won’t see saber-toothed cats or rhinoceroses roaming the Badlands like they once did, you may see their remains in this stunning national park with some of the world’s richest fossil deposits.\n\nLocated in Imlay Township in South Dakota, Badlands National Park has a Fossil Preparation Lab where you can watch paleontologists at work, literally uncovering the ancient history of the area. At the Ben Reifel Visitor Center, kids can use a touchscreen to assemble a virtual skeleton and touch fossilized animal replicas. You also can watch the film Land of Stone and Light in the center’s 95-seat air-conditioned theater.",
            image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FayQt5VfwwOhzZ7UEtPMXrHtimce2%2Fbadlands_wikipd_680x392.jpg?alt=media&token=5d672c25-7bd1-4221-a9dd-714ec8909914",
            isOpen : true,
            likes : 227,
            latitude: 37.32010144928781,
            longitude: 127.12252914905548,
            name : "Badlands National Park",
            openTime : {
              date : 24,
              day : 3,
              hours : 9,
              minutes : 41,
              month : 9,
              seconds : 11,
              time : 1540341671947,
              timezoneOffset : -540,
              year : 118
            },
            roles : {"ayQt5VfwwOhzZ7UEtPMXrHtimce2" : "owner"},
            type : "chat"
          }]
    }

    //------------------------ firebase cloude storage test ------------------

    // need to know how to get http img src
    // upload picture first and make post_data

    // update_image_src(){
    //     firebaseWeb.firestore()
    //     .collection("posts")
    // }
    // update_post(post_id, post_data){
    //     firebaseWeb.firestore()
    //     .collection("posts").doc(post_id)
    //     .update(post_data).then(() => {
    //         console.log("post updated");
    //     });
    // }


    //----------------------------Profile Section------------------------------------------

    setThisUserProfile(data){
        firebase.setValue('/users/' + this.authuser.uid + '/profile', data).then(result => {
            console.log(JSON.stringify(result));
        });
    }

    //----------------------------Blog Section------------------------------------------
    search_post(
        type:string,
        enneagram_num:number,
        origin_latitude:number,
        origin_longitude:number,
        distance_meter:number
    ){
        const ONE_DEGREE_EARTH_PER_METER = 111000;

        var max_latitude_degree = origin_latitude + distance_meter/(2*ONE_DEGREE_EARTH_PER_METER);
        var min_latitude_degree = origin_latitude - distance_meter/(2*ONE_DEGREE_EARTH_PER_METER);
        if(max_latitude_degree >= 90){
            max_latitude_degree = 90;
        }
        if(min_latitude_degree <= -90){
            min_latitude_degree = -90;
        }
        
        var max_longitude_degree = origin_longitude + distance_meter/(2*ONE_DEGREE_EARTH_PER_METER*Math.sin(origin_latitude * (180 / Math.PI)));
        var min_longitude_degree = origin_longitude - distance_meter/(2*ONE_DEGREE_EARTH_PER_METER*Math.sin(origin_latitude * (180 / Math.PI)));
        if(max_longitude_degree - min_longitude_degree >= 360){
            max_longitude_degree = 180;
            min_longitude_degree = -180;
        }
        else{
            if(max_longitude_degree >= 180){
                max_longitude_degree = max_longitude_degree - 360;
            }
            if(min_longitude_degree <= -180){
                min_longitude_degree = min_longitude_degree - 360;
            }    
        }

        if(min_longitude_degree > max_longitude_degree){
            var temp = min_longitude_degree;
            min_longitude_degree = max_longitude_degree;
            max_longitude_degree = temp;
        }
        // console.log("min_lat",min_latitude_degree);
        // console.log("ori_lat",origin_latitude);        
        // console.log("max_lat",max_latitude_degree);
        // console.log("min_lon",min_longitude_degree);
        // console.log("ori_lon",origin_longitude);
        // console.log("max_lon",max_longitude_degree);
        firebaseWeb.firestore()
        .collection("posts")
        .where("number", "==", enneagram_num)
        .where("type", "==", type)
        .where("longitude", "<=", max_longitude_degree)
        .where("longitude", ">=", min_longitude_degree)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.data().latitude <= max_latitude_degree && doc.data().latitude >= min_latitude_degree){
                    // console.log(`searched doc : ${doc.id} => ${JSON.stringify(doc.data())}`);
                    var searchResult = {};
                    searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                    this.postSearchResultArray.push(searchResult);
                }
            });
        });
    }
    search_queries(
        type:string,
        enneagram_nums:number[],
        origin_latitude:number,
        origin_longitude:number,
        distance_meter:number,
    ){
        this.postSearchResultArray = [];
        for(var i=0;i<enneagram_nums.length;i++){
            this.search_post(type,enneagram_nums[i],origin_latitude,origin_longitude,distance_meter);
        }
    }

    get_user_posts(user_id:string){
        this.postSearchResultArray = [];
        firebaseWeb.firestore()
        .collection("posts")
        .where("roles."+user_id, "==", "owner")
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

    add_post(post_data){
        firebaseWeb.firestore()
        .collection("posts")
        .add(post_data).then(documentRef => {
            console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    }
    add_comment(post_id, comment_data){
        var posts = firebaseWeb.firestore()
        .collection("posts").doc(post_id)
        .collection("comments")
        .add(comment_data).then(documentRef => {
            console.log(`auto-generated comment ID: ${documentRef.id}`);
        });
    }
    update_comment(post_id, comment_id, comment_data){
        firebaseWeb.firestore()
        .collection("posts").doc(post_id)
        .collection("comments").doc(comment_id)
        .update(comment_data).then(() => {
            console.log("comment updated");
        });
    }

    getSelectedPost(){
        for(var i=0 ;i<this.postSearchResultArray.length;i++){
            for(var post_id in this.postSearchResultArray[i]){
                if(this.selectedPostID === post_id){
                    return this.postSearchResultArray[i];
                }
            }
        }
    }
    // ---------------------- test queries ------------------------------------

    // // new user
    // set_data(){
    //     firebaseWeb.firestore().collection("cities")
    //     .doc(this.authuser.uid)
    //     .set({
    //         author: this.authuser.uid,
    //         name: "San Francisco",
    //         state: "CA",
    //         country: "USA",
    //         capital: false,
    //         population: 860000
    //     });
    // }

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

    // get_documents_from_collection(){
    //     const citiesCollection = firebaseWeb.firestore().collection("cities");

    //     citiesCollection.get().then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //       });
    //     });
    // }

    // get_date_from_document(){
    //     const sanFranciscoDocument = firebaseWeb.firestore().collection("cities").doc("SF");

    //     sanFranciscoDocument.get().then(doc => {
    //       if (doc.exists) {
    //         console.log(`Document data: ${JSON.stringify(doc.data())}`);
    //       } else {
    //         console.log("No such document!");
    //       }
    //     });
    // }

    // where_query(){        
    //     // "Gimme all cities in California with a population below 550000"
    //     firebaseWeb.firestore()
    //     .collection("cities")
    //     .where("state", "==", "CA").where("population", "<", 2500000)
    //     .get()
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //         console.log(`Relatively small Californian city: ${doc.id} => ${JSON.stringify(doc.data())}`);
    //         });
    //     });
    // }
    // delete_document_from_collection(){
    //     const sanFranciscoDocument = firebaseWeb.firestore().collection("cities").doc("SF");
        
    //     sanFranciscoDocument.delete().then(() => {
    //       console.log("SF was erased from the face of the earth!");
    //     });
    // }
    
    // delete_data_from_document(){
    //     firebaseWeb.firestore().collection("cities").doc("LA")
    //         .update({
    //           capital: firebaseWeb.firestore().FieldValue().delete(),
    //         });
    // }

    // arrayUnion(){
    //     const firebaseWeb = require("nativescript-plugin-firebase/app");
    //     firebaseWeb.firestore()
    //     .collection("posts")
    //     .doc("lopkDLG6T7jpTuY5oO6x")
    //     .update({
    //         behavior: firebaseWeb.firestore.FieldValue().arrayUnion([{"red": "blue"}])
    //     });
    // }


    // getThisUserData(){
    //     console.log(this.authuser.uid);
    //     console.log(
    //         firebaseWeb.firestore()
    //         .collection("cities")
    //         .where("author", "==", this.authuser.uid)
    //         .get()
    //     );
    // }
    
    //---------------------------- picture upload ------------------------------------------


    // 1. when user select picture, the picture uploaded into storage.
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
                    this.uploadFile(imageType,filePath);
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
    
    uploadFile(fileType:string, filePath:string){
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
                console.log("File uploaded: " + JSON.stringify(uploadedFile));
                this.getFileURL(fileType, this.authuser.uid, uploadedFile.name);
            },
            function (error) {
                console.log("File upload error: " + error);
            }
        );
    }

    // 2. get the picture URL for uploading the blog.
    getFileURL(imageType, uid, fileName){
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
    
    //----------------------------Chat Section------------------------------------------

    syncThisUserRoomList(){
        firebase.addChildEventListener(result => {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            this.updateRoom(result.key, result.value);
        }, "/users/" + this.authuser.uid + "/user_rooms").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    updateRoom(updated_room_id, room_friend_id:any){
        firebase.getValue('/rooms/' + updated_room_id).then(result =>{
            // console.log(JSON.stringify(result));
            this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(error => console.log("Error: " + error));
    }

    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    syncRoomMessages(room_id:string){
        firebase.addChildEventListener(result => {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            this.updateRoomMessages(room_id, result.key ,result.value);
        }, "/rooms/"+room_id+"/messages").then(
            function(listenerWrapper) {
              var path = listenerWrapper.path;
              var listeners = listenerWrapper.listeners; // an Array of listeners added
              // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }
    updateRoomMessages(room_id:string, message_id:any, message:any){
        if(!this.rooms[room_id]['messages']){
            this.rooms[room_id]['messages'] = {};
        }
        this.rooms[room_id]['messages'][message_id] = JSON.parse(JSON.stringify(message));
        var message_to_add = {};
        message_to_add[message_id] = this.rooms[room_id]['messages'][message_id]
        if(room_id == this.selectedRoomID){
            this.selectedRoomMessageArray.push(message_to_add);
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
            var message_a;
            var message_b;
            for(var key in a){
                message_a = a[key];
            }
            for(var key in b){
                Date
                message_b = b[key];
            }
            var time_b = message_b['timestamp']['time'];
            var time_a = message_a['timestamp']['time'];
            return time_a - time_b;
        });
    }
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    pushFriendOnRoom(user:any, room_id:string){
        for(var uid in user){
            firebase.setValue('/rooms/'+room_id+"/room_users/"+uid, user[uid]).then(result2 => {
                // this.pushRoomIDOnUser(user, room_id);
            });
        }
    }


    setSelectedFriendID(selectedFriendID: string): void {
        this.selectedFriendID = selectedFriendID;
    }
    getSelectedFriendID(): string {
        return this.selectedFriendID;
    }

    // 1. generate room id
    generateRoomWithSelectedFriends(user:any, friend:any){
        var friend_id;
        for(var id in friend){
            friend_id = id;
        }
        var user_id;
        for(var id in user){
            user_id = id;
        }
        // check room exist before generate.
        firebase.query(
            result => {
                // if friend chat room is not exist, create new room.
                if(result.value == null){
                    console.log("no room with friend_id: " + friend_id);
                    var open_room = {room_users:{}};
                    open_room['isOpen'] = true;
                    open_room['openTime'] = new Date();
                    open_room['closeTime'] = "";
                    for(var uid in user){
                        firebase.push('/rooms/', open_room).then(result2 => {
                            this.pushRoomIDOnUser(user, friend, result2.key);
                            this.pushRoomIDOnUser(friend, user, result2.key);
                            this.setGeneratedRoomID(result2.key);
                            console.log("created key: " + result2.key);// Room ID
                        });
                    }
                }
                // if friend chat room is exist, don't make new one.
                else{
                    // console.log(result);
                    for(var room_id in result['value']){
                        this.selectedRoomMessageArray = this.jsonToArray(this.rooms[room_id]['messages']);
                    }
                    console.log("exist room: " + JSON.parse(JSON.stringify(result['value'])));// Room ID
                }
            },
            '/users/' + user_id + '/user_rooms',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.VALUE,
                    // value: 'test' // mandatory when type is 'child'
                },
                range: {
                   type: firebase.QueryRangeType.EQUAL_TO,
                   value: friend_id
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
    // 2. set authentication for rooms on user database
    pushRoomIDOnUser(user:any, friend:any, room_id:string){
        var user_room = {};
        user_room['inRoom'] = true;
        user_room['joinTime'] = Date.now();
        user_room['leaveTime'] = "";
        for(var friend_id in friend){
            for(var uid in user){
                user_room['roomIcon'] = friend[friend_id]["profile"]["profilePicsrc"];
                user_room['title'] = friend[friend_id]["profile"]["name"];
                user_room['messageIcon'] = user[uid]["profile"]["profilePicsrc"];
                user_room['userName'] = user[uid]["profile"]["name"];
                // set room access athentication on user database
                firebase.setValue('/users/'+uid+'/user_rooms/'+room_id, friend_id).then(result => {
                    // user can write on chat room
                    firebase.setValue('/rooms/'+room_id+'/room_users/'+uid, user_room).then(result2 => {
                        // console.log(result);
                        this.syncRoomMessages(room_id);
                        // this.syncRoom(room_id);
                    });
                });
            }
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
            // console.log("created key: " + result.key);// Message_pack ID
        });
    }

    

    //---------------------------- Firebase Realtime database test Section--------------------
    // make array type database and push data in array type database
    // pushInArrayDatabase(databaseOfArrayPath:string, pushData:any){
    //     firebase.getCurrentUser().then(user => {
    //         firebase.push('/users/' + user.uid + databaseOfArrayPath, pushData).then(result => {
    //             // console.log("created key: " + result.key);
    //         });
    //     });
    // }

    // // make data structure of value type database
    // makeStructureOfValueDatabase(databasePath:string, structure: any){
    //     firebase.getCurrentUser().then(user => {
    //         firebase.setValue('/users/' + user.uid + databasePath, structure);
    //     });
    // }

    // // add attribute in value type database and update data in value type database
    // writeValueOfValueDatabase(databasePath:string, updateData: any){
    //     firebase.getCurrentUser().then(user => {
    //         firebase.update('/users/' + user.uid + databasePath, updateData);
    //     });
    // }


    // // read data in value type database
    // readValueOfValueDatabase(databasePath:string){
    //     firebase.getCurrentUser().then(user => {
    //         firebase.getValue('/users/' + user.uid + databasePath).then(result =>{
    //             // console.log(JSON.stringify(result));
    //         }).catch(error => console.log("Error: " + error));
    //     });
    // }
    // // complex query
    // queryOnDatabase(databasePath:string){
    //     firebase.getCurrentUser().then(user => {
    //         firebase.query(
    //             this.onQueryEvent,
    //             // '/users',
    //             '/users/' + user.uid + databasePath,
    //             {
    //                 // set this to true if you want to check if the value exists or just want the event to fire once
    //                 // default false, so it listens continuously.
    //                 // Only when true, this function will return the data in the promise as well!
    //                 singleEvent: true,
    //                 // order by company.country
    //                 orderBy: {
    //                     type: firebase.QueryOrderByType.CHILD,
    //                     value: 'test' // mandatory when type is 'child'
    //                 },
    //                 // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
    //                 // use either a 'range'
    //                 //range: {
    //                 //    type: firebase.QueryRangeType.EQUAL_TO,
    //                 //    value: 2000
    //                 ///},
    //                 // .. or 'chain' ranges like this:

    //                 // ranges: [
    //                 //   {
    //                 //       type: firebase.QueryRangeType.START_AT,
    //                 //       value: 1999
    //                 //   },
    //                 //   {
    //                 //       type: firebase.QueryRangeType.END_AT,
    //                 //       value: 2000
    //                 //   }
    //                 // ],

    //                 // only the first 2 matches
    //                 // (note that there's only 1 in this case anyway)
    //                 limit: {
    //                     type: firebase.QueryLimitType.LAST,
    //                     value: 2
    //                 }
    //             }
    //         )
    //         .then(result => console.log(JSON.stringify(result)))
    //         .catch(error => console.log("Error: " + error));;
    //     });
    // }

    
    // // query result
    // onQueryEvent(result) {
    //     // note that the query returns 1 match at a time
    //     // in the order specified in the query
    //     if (!result.error) {
    //         console.log("Event type: " + result.type);
    //         console.log("Key: " + result.key);
    //         console.log("Value: " + JSON.stringify(result.value));
    //     }
    // };

    // queryTest(){
    //     firebase.query(
    //         function(result){

    //         },
    //         '/users',
    //         {
    //             singleEvent: true,
    //             orderBy: {
    //                 type: firebase.QueryOrderByType.KEY,
    //                 value: 'uid'
    //             },
    //             range: {
    //                 type: firebase.QueryRangeType.EQUAL_TO,
    //                 value: 'ayQt5VfwwOhzZ7UEtPMXrHtimce2'
    //             },
    //         }
    //     )
    //     .then(result => console.log(result.value['ayQt5VfwwOhzZ7UEtPMXrHtimce2']))
    //     .catch(error => console.log("Error: " + error));;
    // }


    // readUserName(){
    //     var userId = firebaseWeb.auth().currentUser.uid;
    //     return firebaseWeb.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //         var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //     });
    // }

    //----------------------------Auth Section------------------------------------------

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

    //----------------------------Init Section------------------------------------------
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
        var key = JSON.parse(JSON.stringify(result.key));
        var value = JSON.parse(JSON.stringify(result.value));
        var user = {};
        user[key] = value;
        this.thisUser = user;
        // console.log(this.thisUser);
    }
    setFriends(friend_ids:string[]){ 
        // console.log(friend_ids);
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
        // console.log(room_ids);
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
                    this.syncThisUserRoomList();
                }
            })
            .catch(error => console.log("Error: " + error));;
        }
    }

    addRoom(room){
        for(var key in room){
            this.rooms[key] = room[key];
            this.syncRoomMessages(key);
        }
    }
    public setRoomArray(){
        this.roomArray = this.jsonToArray(this.getRooms());
        // this.add_comment('j3XeVIroAJwLqSD5re6C',{hello:'hello'});
        // for(var i=0;i<this.test_data.length;i++){
        //     this.add_post(this.test_data[i]);
        // }
        // this.search_post("chat",3,37.323972, 127.125109 ,100000);
        // this.search_queries("chat",[1,2,3,4,5,6,7,8,9],37.323972, 127.125109 ,100000);
        // this.getFileURL('asqU21QzltYOgnT5MDcgWotRJwH2','gteton-schwabachers-landing_dollar_680.jpg');
        // this.get_user_posts("I33CAKsu5uUkq4Xqt2xUVJgcGHM2");
	}

    public jsonToArray(json){
        var array = [];
        if(json!=null){
            for(var key in json){
                var child_json = {};
                child_json[key] = json[key];
                array.push(child_json);
            }
        }
        return array;
    }
    
    public setGeneratedRoomID(generatedRoomID:string){
        this.generatedRoomID = generatedRoomID;
        this.selectedRoomID = generatedRoomID;
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
