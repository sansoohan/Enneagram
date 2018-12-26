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
        this.thisUserProfilePicsrc = "";
        this.thisUserBackgroundPicsrc = "";
        this.thisUserName = "";
        this.thisUSerEmail = "";
        this.friends = {};
        this.rooms = {};
        this.messageUpdatedToggle = false;
        this.postSearchResultArray = [];
        // this.test_data = [{
        //     behavior : "",
        //     emotion : "",
        //     number : 9,
        //     state : "good",
        //     thought : "",
        //     closeTime : "",
        //     description : "",
        //     image : "",
        //     isOpen : true,
        //     likes : "",
        //     latitude: 37.325240604800946,
        //     longitude: 127.12098587304354,
        //     name : "",
        //     openTime : {
        //       date : 25,
        //       day : 4,
        //       hours : 20,
        //       minutes : 50,
        //       month : 9,
        //       seconds : 44,
        //       time : 1540468244400,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"5FgrewJa2Mh9C598k70HQ40b1qu1" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 2,
        //     state : "good",
        //     thought : "",
        //     closeTime : "",
        //     description : "Marvel at more than 2,000 natural rock arches at this park just outside of Moab. Some of the formations can be spotted from the road, but the best require a scenic hike. Don’t miss the famous Delicate Arch (3 miles round-trip) or the 7-mile (round-trip) Devils Garden Loop.\n\nThe Park Avenue Trail is the most popular hike in the park because of its ease and scenery at just 2 miles round trip. Or try the more challenging hike to Delicate Arches at 3.2 miles round trip.\n\nWhether you are camping or staying in a hotel, don’t forget to spend some time looking up at the sky after night falls. You’ll find some of the darkest skies in and around Utah’s national parks.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FH6U4ZRvLW6SL8RmIX18TYmg1hhV2%2Farches-delicate-arch-sky_adobe_680.jpg?alt=media&token=6cb48ab5-96f5-43b2-9ea1-6749cdbed38f",
        //     isOpen : true,
        //     likes : 245,
        //     latitude: 37.323080469252254,
        //     longitude: 127.12255798280238,
        //     name : "Arches National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 34,
        //       month : 9,
        //       seconds : 49,
        //       time : 1540341289918,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"H6U4ZRvLW6SL8RmIX18TYmg1hhV2" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 8,
        //     state : "good",
        //     thought : "",
        //     closeTime : "",
        //     description : "Nicknamed the \"Crown of the Continent,\" Glacier National Park sits in the northwest corner of Montana. Glacier National Park is just a scenic day’s drive north from Yellowstone.\n\nHit the trail to explore places like Fishercap Lake (pictured), which is a great place to spot a moose. From Many Glacier Campground, go to the Swiftcurrent Motor Inn parking lot. The trailhead is on the west end. You'll find the lake less than a mile down the trail. Continue 1.5 miles to Redrock Lake and take a spur to Redrock Falls.\n\nA National Historic Landmark, Going-to-the-Sun Road is one of the most scenic roads in North America, not to mention one of the most complex to build. The final section, over Logan Pass, was completed in 1932 after 11 years of work. Considered an engineering feat, the construction of the road forever changed the way visitors would experience Glacier National Park. Future visitors would be able to drive over sections of the park that previously had taken days of horseback riding to see.\n\nIn their ability to wow visitors, Yellowstone and Glacier share a common bond. But as with any great destination, there are some adventures that are found nowhere else. Glacier preserves over 1,000,000 acres of forests, alpine meadows and lakes. Its diverse habitats are home to over 70 species of mammals and over 260 species of birds. The spectacular glaciated landscape is a hiker’s paradise, containing 700 miles of maintained trails that lead deep into one of the largest intact ecosystems in the lower 48 states.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FHcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2%2Fglacier-avalache-lake-kids_adobe_680.jpg?alt=media&token=50870c5e-b1e6-4d51-be9a-d9cd2d627242",
        //     isOpen : true,
        //     likes : 152,
        //     latitude: 37.32160230566423,
        //     longitude: 127.12806019932033,
        //     name : "Glacier National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 39,
        //       month : 9,
        //       seconds : 3,
        //       time : 1540341543794,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"HcBjRLszVnS5tPscDWg0ZDOoxxP2" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 6,
        //     state : "",
        //     thought : "",
        //     closeTime : "",
        //     description : "Just 15 miles south of Moab, hike your way through 337, 598 acres of dramatic red-rock landscape in Canyonlands NP, and do it all without having to compete for room on the trail - Canyonlands is both Utah’s largest and least visited park.\n\nThe river-carved park boasts 360-degree views of rust-colored arches, buttes, and cliffs - but because of the high-desert rock environment, its climate is subject to extreme temperature fluctuations. Skip packing the parka, and go in the spring or fall for the most moderate, and most forgiving, weather.\n\nSo expansive it’s divided into four districts, Canyonlands delivers a quintessential desert experience: deep canyons, prehistoric rock art, rivers, and sweeping overlooks.\n\nAmong the exceptional, striated rock formations, there are landmarks you shouldn’t miss, like the unusual 1500-foot Upheaval Dome - thought to be a meteorite crater - or the Druid Arch, often referred to as Utah’s own Stonehenge. Keep watch for the wildlife, too. Bighorn sheep take residence in the canyons and buttes, along with mule deer, kangaroo rats, and coyote. Look up for red- tailed hawks, and at night, for one of the darkest skies in the Lower 48. On a moonless night, get more than your fill of stars - or get out the binoculars to try for the rings of Saturn.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FI33CAKsu5uUkq4Xqt2xUVJgcGHM2%2Fcanyonlands-mesa-arch-sunrise_dollar_680.jpg?alt=media&token=9175f69d-a5b2-4828-8b98-d05d1d1e0f61",
        //     isOpen : true,
        //     likes : 385,
        //     latitude: 37.32128395277468,
        //     longitude: 127.12614510208367,
        //     name : "Canyonlands National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 39,
        //       month : 9,
        //       seconds : 27,
        //       time : 1540341567889,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"I33CAKsu5uUkq4Xqt2xUVJgcGHM2" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 5,
        //     state : "bad",
        //     thought : "",
        //     closeTime : "",
        //     description : "Divided by a 277-mile long canyon, and the mile-deep Colorado River, the two halves of Grand Canyon National Park, the North and South Rim, offer two parks in one, with diverse landscape and ecology on either.\n\nGrand Canyon National Park, and the greater Grand Canyon region, is a hiker's dream. Most of Grand Canyon National Park is undeveloped backcountry. There are literally hundreds of miles to hike, backpack and explore. Despite the Grand Canyon's popularity and numbers of visitors each year, visitors only need to hike a small distance to enjoy some solitude.\n\nExplore the depths of the Grand Canyon National Park on popular trails like the Bright Angel and South Kaibab trail on a mule. A Grand Canyon mule ride is an adventure and easy on your legs.\n\nOne of the most exciting ways to experience the Grand Canyon is to float through it by way of raft on the Colorado River. Most people book their trip with a commercial outfitter and you can even combine the rafting trip with a helicopter ride. Experienced whitewater rafter? Enter the lottery to do your own trip.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FNfYE2dF2wlfSBWwWvEk0KsiTs1t1%2Fgc-yavapai-point-sunset_dp_680.jpg?alt=media&token=5180e2f4-99a6-4e1e-b744-faebaf9204e9",
        //     isOpen : true,
        //     likes : 514,
        //     latitude: 37.32128395277468,
        //     longitude: 127.12614510208367,
        //     name : "Grand Canyon National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 39,
        //       month : 9,
        //       seconds : 49,
        //       time : 1540341589674,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"NfYE2dF2wlfSBWwWvEk0KsiTs1t1" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 1,
        //     state : "",
        //     thought : "",
        //     closeTime : "",
        //     description : "Maximize your experience at Bryce Canyon National Park by driving to Sunrise, Sunset, Inspiration and Bryce viewpoints. These are all spectacular overlooks of the park’s red hoodoos shooting up against evergreen forests in the background. Depending on the time of day, and the angle and light of the sun, the hoodoos and mysterious rock formations often take on unusual patterns and shapes, and some think, imaginary faces.\n\nFor more inspiration, lace up your hiking boots or other sturdy shoes and explore a trail. There is something for everyone at Bryce Canyon. Our favorite easy hikes include Bristlecone Loop Trail and Queens Garden Trail. Hat Shop is our favorite moderate hike. For more physically fit hikers looking for a strenuous adventure, do the 5.5-mile vertically challenging Peek-A-Boo Loop or the 7.9 Fairyland Loop rated “difficult” by the park service. ",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FRz20yC7LESOCDUoa4sp69v5copT2%2Fbryce-amphitheater-inspiration-point_dp_680.jpg?alt=media&token=06d154b7-80d8-46c9-9fdf-e3e70ec43951",
        //     isOpen : true,
        //     likes : 245,
        //     latitude: 37.32086321296732,
        //     longitude: 127.12435875087976,
        //     name : "Bryce Canyon National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 40,
        //       month : 9,
        //       seconds : 21,
        //       time : 1540341621381,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"Rz20yC7LESOCDUoa4sp69v5copT2" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 9,
        //     state : "",
        //     thought : "",
        //     closeTime : "",
        //     description : "Grand Teton National Park preserves a spectacular landscape rich with majestic mountains, pristine lakes, and extraordinary wildlife. The abrupt vertical rise of the jagged Teton Mountains contrasts with the horizontal sage-covered valley and glacial lakes at its base.\n\nIt took more than 30 years for Grand Teton National Park to transform from an idea to one of the country's most stunning parks. When Congress created the park in 1929, it only included the Teton Range and six glacial lakes. John D. Rockefeller, Jr., played a key role in acquiring an additional 35,000 acres for the park under the name \"Snake River Land Co.\" Amid controversy the \"new\" Grand Teton National Park was established Sept. 14, 1950, by President Harry Truman.\n\nGrand Teton National Park and its world-class scenery attracts nearly 4 million visitors per year. With Jenny Lake and Jackson Lake at 6,320 feet and the summit of the Grand Teton at 13,770 feet, the park's elevation ranges create one of the nation's most awe-inspiring landscapes. In addition to gazing at the incredible views, there is much to do in this park from hiking and rock climbing to boating and fishing. And when you need a break from outdoor adventure, there are few better places to simply relax and watch the park's incredible wildlife.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FasqU21QzltYOgnT5MDcgWotRJwH2%2Fgteton-schwabachers-landing_dollar_680.jpg?alt=media&token=d3abfbd0-b725-4b0c-97e5-f616bdb70305",
        //     isOpen : true,
        //     likes : 169,
        //     latitude: 37.32137487279108,
        //     longitude: 127.12210066616537,
        //     name : "Grand Teton National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 40,
        //       month : 9,
        //       seconds : 47,
        //       time : 1540341647762,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"asqU21QzltYOgnT5MDcgWotRJwH2" : "owner"},
        //     type : "chat"
        //   },
        //   {
        //     behavior : "",
        //     emotion : "",
        //     number : 3,
        //     state : "good",
        //     thought : "",
        //     closeTime : "",
        //     description : "Explore South Dakota’s Black Hills region, a natural wonder in its own right. Located about six hours from Yellowstone, the Black Hills are home to seven national sites — Badlands National Park, Jewel Cave National Monument, the Lewis & Clark National Historic Trail, Minuteman Missile National Historic Site, Missouri National Recreational River, Mount Rushmore National Memorial, and Wind Cave National Park.\n\nIn this natural playground, you can enjoy an abundance of recreational opportunities, gorgeous scenic drives — which include the beautiful Spearfish Canyon — and wildlife-watching. This region is also packed with cultural and historical sites.\n\nWhile you won’t see saber-toothed cats or rhinoceroses roaming the Badlands like they once did, you may see their remains in this stunning national park with some of the world’s richest fossil deposits.\n\nLocated in Imlay Township in South Dakota, Badlands National Park has a Fossil Preparation Lab where you can watch paleontologists at work, literally uncovering the ancient history of the area. At the Ben Reifel Visitor Center, kids can use a touchscreen to assemble a virtual skeleton and touch fossilized animal replicas. You also can watch the film Land of Stone and Light in the center’s 95-seat air-conditioned theater.",
        //     image : "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FayQt5VfwwOhzZ7UEtPMXrHtimce2%2Fbadlands_wikipd_680x392.jpg?alt=media&token=5d672c25-7bd1-4221-a9dd-714ec8909914",
        //     isOpen : true,
        //     likes : 227,
        //     latitude: 37.32010144928781,
        //     longitude: 127.12252914905548,
        //     name : "Badlands National Park",
        //     openTime : {
        //       date : 24,
        //       day : 3,
        //       hours : 9,
        //       minutes : 41,
        //       month : 9,
        //       seconds : 11,
        //       time : 1540341671947,
        //       timezoneOffset : -540,
        //       year : 118
        //     },
        //     roles : {"ayQt5VfwwOhzZ7UEtPMXrHtimce2" : "owner"},
        //     type : "chat"
        //   }]
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
    FirebaseService.prototype.setThisUserProfile = function (data) {
        firebase.setValue('/users/' + this.authuser.uid + '/profile', data).then(function (result) {
            console.log(JSON.stringify(result));
        });
    };
    //----------------------------Blog Section------------------------------------------
    FirebaseService.prototype.search_post = function (type, enneagram_num, origin_latitude, origin_longitude, distance_meter) {
        var _this = this;
        var ONE_DEGREE_EARTH_PER_METER = 111000;
        var max_latitude_degree = origin_latitude + distance_meter / (2 * ONE_DEGREE_EARTH_PER_METER);
        var min_latitude_degree = origin_latitude - distance_meter / (2 * ONE_DEGREE_EARTH_PER_METER);
        if (max_latitude_degree >= 90) {
            max_latitude_degree = 90;
        }
        if (min_latitude_degree <= -90) {
            min_latitude_degree = -90;
        }
        var max_longitude_degree = origin_longitude + distance_meter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(origin_latitude * (180 / Math.PI)));
        var min_longitude_degree = origin_longitude - distance_meter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(origin_latitude * (180 / Math.PI)));
        if (max_longitude_degree - min_longitude_degree >= 360) {
            max_longitude_degree = 180;
            min_longitude_degree = -180;
        }
        else {
            if (max_longitude_degree >= 180) {
                max_longitude_degree = max_longitude_degree - 360;
            }
            if (min_longitude_degree <= -180) {
                min_longitude_degree = min_longitude_degree - 360;
            }
        }
        if (min_longitude_degree > max_longitude_degree) {
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
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().latitude <= max_latitude_degree && doc.data().latitude >= min_latitude_degree) {
                    // console.log(`searched doc : ${doc.id} => ${JSON.stringify(doc.data())}`);
                    var searchResult = {};
                    searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                    _this.postSearchResultArray.push(searchResult);
                }
            });
        });
    };
    FirebaseService.prototype.search_queries = function (type, enneagram_nums, origin_latitude, origin_longitude, distance_meter) {
        this.postSearchResultArray = [];
        for (var i = 0; i < enneagram_nums.length; i++) {
            this.search_post(type, enneagram_nums[i], origin_latitude, origin_longitude, distance_meter);
        }
    };
    FirebaseService.prototype.get_user_posts = function (user_id) {
        var _this = this;
        this.postSearchResultArray = [];
        firebaseWeb.firestore()
            .collection("posts")
            .where("roles." + user_id, "==", "owner")
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
    FirebaseService.prototype.add_post = function (post_data) {
        firebaseWeb.firestore()
            .collection("posts")
            .add(post_data).then(function (documentRef) {
            console.log("auto-generated post ID: " + documentRef.id);
        });
    };
    FirebaseService.prototype.add_comment = function (post_id, comment_data) {
        var posts = firebaseWeb.firestore()
            .collection("posts").doc(post_id)
            .collection("comments")
            .add(comment_data).then(function (documentRef) {
            console.log("auto-generated comment ID: " + documentRef.id);
        });
    };
    FirebaseService.prototype.update_comment = function (post_id, comment_id, comment_data) {
        firebaseWeb.firestore()
            .collection("posts").doc(post_id)
            .collection("comments").doc(comment_id)
            .update(comment_data).then(function () {
            console.log("comment updated");
        });
    };
    FirebaseService.prototype.getSelectedPost = function () {
        for (var i = 0; i < this.postSearchResultArray.length; i++) {
            for (var post_id in this.postSearchResultArray[i]) {
                if (this.selectedPostID === post_id) {
                    return this.postSearchResultArray[i];
                }
            }
        }
    };
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
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
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
    //----------------------------Chat Section------------------------------------------
    FirebaseService.prototype.syncThisUserRoomList = function () {
        var _this = this;
        firebase.addChildEventListener(function (result) {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoom(result.key, result.value);
        }, "/users/" + this.authuser.uid + "/user_rooms").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (updated_room_id, room_friend_id) {
        var _this = this;
        firebase.getValue('/rooms/' + updated_room_id).then(function (result) {
            // console.log(JSON.stringify(result));
            _this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            _this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    FirebaseService.prototype.syncRoomMessages = function (room_id) {
        var _this = this;
        firebase.addChildEventListener(function (result) {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoomMessages(room_id, result.key, result.value);
        }, "/rooms/" + room_id + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoomMessages = function (room_id, message_id, message) {
        if (!this.rooms[room_id]['messages']) {
            this.rooms[room_id]['messages'] = {};
        }
        this.rooms[room_id]['messages'][message_id] = JSON.parse(JSON.stringify(message));
        var message_to_add = {};
        message_to_add[message_id] = this.rooms[room_id]['messages'][message_id];
        if (room_id == this.selectedRoomID) {
            this.selectedRoomMessageArray.push(message_to_add);
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
            var message_a;
            var message_b;
            for (var key in a) {
                message_a = a[key];
            }
            for (var key in b) {
                Date;
                message_b = b[key];
            }
            var time_b = message_b['timestamp']['time'];
            var time_a = message_a['timestamp']['time'];
            return time_a - time_b;
        });
    };
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    FirebaseService.prototype.pushFriendOnRoom = function (user, room_id) {
        for (var uid in user) {
            firebase.setValue('/rooms/' + room_id + "/room_users/" + uid, user[uid]).then(function (result2) {
                // this.pushRoomIDOnUser(user, room_id);
            });
        }
    };
    FirebaseService.prototype.setSelectedFriendID = function (selectedFriendID) {
        this.selectedFriendID = selectedFriendID;
    };
    FirebaseService.prototype.getSelectedFriendID = function () {
        return this.selectedFriendID;
    };
    // 1. generate room id
    FirebaseService.prototype.generateRoomWithSelectedFriends = function (user, friend) {
        var _this = this;
        var friend_id;
        for (var id in friend) {
            friend_id = id;
        }
        var user_id;
        for (var id in user) {
            user_id = id;
        }
        // check room exist before generate.
        firebase.query(function (result) {
            // if friend chat room is not exist, create new room.
            if (result.value == null) {
                console.log("no room with friend_id: " + friend_id);
                var open_room = { room_users: {} };
                open_room['isOpen'] = true;
                open_room['openTime'] = new Date();
                open_room['closeTime'] = "";
                for (var uid in user) {
                    firebase.push('/rooms/', open_room).then(function (result2) {
                        _this.pushRoomIDOnUser(user, friend, result2.key);
                        _this.pushRoomIDOnUser(friend, user, result2.key);
                        _this.setGeneratedRoomID(result2.key);
                        console.log("created key: " + result2.key); // Room ID
                    });
                }
            }
            else {
                // console.log(result);
                for (var room_id in result['value']) {
                    _this.selectedRoomMessageArray = _this.jsonToArray(_this.rooms[room_id]['messages']);
                }
                console.log("exist room: " + JSON.parse(JSON.stringify(result['value']))); // Room ID
            }
        }, '/users/' + user_id + '/user_rooms', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.VALUE,
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: friend_id
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
    // 2. set authentication for rooms on user database
    FirebaseService.prototype.pushRoomIDOnUser = function (user, friend, room_id) {
        var _this = this;
        var user_room = {};
        user_room['inRoom'] = true;
        user_room['joinTime'] = Date.now();
        user_room['leaveTime'] = "";
        for (var friend_id in friend) {
            for (var uid in user) {
                user_room['roomIcon'] = friend[friend_id]["profile"]["profilePicsrc"];
                user_room['title'] = friend[friend_id]["profile"]["name"];
                user_room['messageIcon'] = user[uid]["profile"]["profilePicsrc"];
                user_room['userName'] = user[uid]["profile"]["name"];
                // set room access athentication on user database
                firebase.setValue('/users/' + uid + '/user_rooms/' + room_id, friend_id).then(function (result) {
                    // user can write on chat room
                    firebase.setValue('/rooms/' + room_id + '/room_users/' + uid, user_room).then(function (result2) {
                        // console.log(result);
                        _this.syncRoomMessages(room_id);
                        // this.syncRoom(room_id);
                    });
                });
            }
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
            // console.log("created key: " + result.key);// Message_pack ID
        });
    };
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
            console.log(JSON.stringify(result));
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
                    console.log("first ok");
                    console.log(JSON.stringify(result));
                    ApplicationSettings.setBoolean("authenticated", true);
                    _this.routerExtensions.navigate(["/home"], { clearHistory: true });
                });
            }
            else {
                console.log("user ok");
                _this.setAuthUser();
                ApplicationSettings.setBoolean("authenticated", true);
                _this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }
            // this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            // this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    //----------------------------Init Section------------------------------------------
    FirebaseService.prototype.setAuthUser = function () {
        var _this = this;
        // set thisUser
        firebase.getValue('/users/' + this.authuser.uid).then(function (result) {
            _this.setThisUser(result);
        }).catch(function (error) { return console.log("Error: " + error); });
        // set friends
        firebase.getValue('/users/' + this.authuser.uid + '/friends').then(function (result) {
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
        var key = JSON.parse(JSON.stringify(result.key));
        var value = JSON.parse(JSON.stringify(result.value));
        var user = {};
        user[key] = value;
        this.thisUser = user;
        // console.log(this.thisUser);
    };
    FirebaseService.prototype.setFriends = function (friend_ids) {
        var _this = this;
        // console.log(friend_ids);
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
        // console.log(room_ids);
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
                    _this.syncThisUserRoomList();
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
        // this.add_comment('j3XeVIroAJwLqSD5re6C',{hello:'hello'});
        // for(var i=0;i<this.test_data.length;i++){
        //     this.add_post(this.test_data[i]);
        // }
        // this.search_post("chat",3,37.323972, 127.125109 ,100000);
        // this.search_queries("chat",[1,2,3,4,5,6,7,8,9],37.323972, 127.125109 ,100000);
        // this.getFileURL('asqU21QzltYOgnT5MDcgWotRJwH2','gteton-schwabachers-landing_dollar_680.jpg');
        // this.get_user_posts("I33CAKsu5uUkq4Xqt2xUVJgcGHM2");
    };
    FirebaseService.prototype.jsonToArray = function (json) {
        var array = [];
        if (json != null) {
            for (var key in json) {
                var child_json = {};
                child_json[key] = json[key];
                array.push(child_json);
            }
        }
        return array;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFHL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFrQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFqQ3ZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLDZCQUF3QixHQUFFLEVBQUUsQ0FBQztRQUM3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQVdYLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQVl0QywwQkFBcUIsR0FBZSxFQUFFLENBQUM7UUFLMUMsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQixvQ0FBb0M7UUFDcEMscUNBQXFDO1FBQ3JDLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsOEJBQThCO1FBQzlCLCtCQUErQjtRQUMvQixtQkFBbUI7UUFDbkIsU0FBUztRQUNULDBEQUEwRDtRQUMxRCxvQkFB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QUM7UUFDdEIsQ0FBQztRQUNELElBQUk7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQXh2Q1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQW9DcUIseUJBQWdCO09BbkNyQyxlQUFlLENBeXZDM0I7SUFBRCxzQkFBQztDQUFBLEFBenZDRCxJQXl2Q0M7QUF6dkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbmltcG9ydCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB0aGlzVXNlclByb2ZpbGVQaWNzcmMgPSBcIlwiO1xyXG4gICAgcHVibGljIHRoaXNVc2VyQmFja2dyb3VuZFBpY3NyYyA9XCJcIjtcclxuICAgIHB1YmxpYyB0aGlzVXNlck5hbWUgPSBcIlwiOyAgICBcclxuICAgIHB1YmxpYyB0aGlzVVNlckVtYWlsID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHVibGljIHJvb21zID0ge307XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyBtZXNzYWdlVXBkYXRlZFRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdF9kYXRhOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBwb3N0U2VhcmNoUmVzdWx0QXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBvc3RJRDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgKXtcclxuICAgICAgICAvLyB0aGlzLnRlc3RfZGF0YSA9IFt7XHJcbiAgICAgICAgLy8gICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgLy8gICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgLy8gICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGltYWdlIDogXCJcIixcclxuICAgICAgICAvLyAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgbGlrZXMgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzI1MjQwNjA0ODAwOTQ2LFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjA5ODU4NzMwNDM1NCxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgIC8vICAgICAgIGRhdGUgOiAyNSxcclxuICAgICAgICAvLyAgICAgICBkYXkgOiA0LFxyXG4gICAgICAgIC8vICAgICAgIGhvdXJzIDogMjAsXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDUwLFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogNDQsXHJcbiAgICAgICAgLy8gICAgICAgdGltZSA6IDE1NDA0NjgyNDQ0MDAsXHJcbiAgICAgICAgLy8gICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgIC8vICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgcm9sZXMgOiB7XCI1RmdyZXdKYTJNaDlDNTk4azcwSFE0MGIxcXUxXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgIC8vICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gICB7XHJcbiAgICAgICAgLy8gICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG51bWJlciA6IDIsXHJcbiAgICAgICAgLy8gICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgLy8gICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBkZXNjcmlwdGlvbiA6IFwiTWFydmVsIGF0IG1vcmUgdGhhbiAyLDAwMCBuYXR1cmFsIHJvY2sgYXJjaGVzIGF0IHRoaXMgcGFyayBqdXN0IG91dHNpZGUgb2YgTW9hYi4gU29tZSBvZiB0aGUgZm9ybWF0aW9ucyBjYW4gYmUgc3BvdHRlZCBmcm9tIHRoZSByb2FkLCBidXQgdGhlIGJlc3QgcmVxdWlyZSBhIHNjZW5pYyBoaWtlLiBEb27igJl0IG1pc3MgdGhlIGZhbW91cyBEZWxpY2F0ZSBBcmNoICgzIG1pbGVzIHJvdW5kLXRyaXApIG9yIHRoZSA3LW1pbGUgKHJvdW5kLXRyaXApIERldmlscyBHYXJkZW4gTG9vcC5cXG5cXG5UaGUgUGFyayBBdmVudWUgVHJhaWwgaXMgdGhlIG1vc3QgcG9wdWxhciBoaWtlIGluIHRoZSBwYXJrIGJlY2F1c2Ugb2YgaXRzIGVhc2UgYW5kIHNjZW5lcnkgYXQganVzdCAyIG1pbGVzIHJvdW5kIHRyaXAuIE9yIHRyeSB0aGUgbW9yZSBjaGFsbGVuZ2luZyBoaWtlIHRvIERlbGljYXRlIEFyY2hlcyBhdCAzLjIgbWlsZXMgcm91bmQgdHJpcC5cXG5cXG5XaGV0aGVyIHlvdSBhcmUgY2FtcGluZyBvciBzdGF5aW5nIGluIGEgaG90ZWwsIGRvbuKAmXQgZm9yZ2V0IHRvIHNwZW5kIHNvbWUgdGltZSBsb29raW5nIHVwIGF0IHRoZSBza3kgYWZ0ZXIgbmlnaHQgZmFsbHMuIFlvdeKAmWxsIGZpbmQgc29tZSBvZiB0aGUgZGFya2VzdCBza2llcyBpbiBhbmQgYXJvdW5kIFV0YWjigJlzIG5hdGlvbmFsIHBhcmtzLlwiLFxyXG4gICAgICAgIC8vICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjIlMkZhcmNoZXMtZGVsaWNhdGUtYXJjaC1za3lfYWRvYmVfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49NmNiNDhhYjUtOTZmNS00M2IyLTllYTEtNjc0OWNkYmVkMzhmXCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogMjQ1LFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzIzMDgwNDY5MjUyMjU0LFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjI1NTc5ODI4MDIzOCxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiQXJjaGVzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAvLyAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgLy8gICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgIC8vICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgLy8gICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiAzNCxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDQ5LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxMjg5OTE4LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiA4LFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIk5pY2tuYW1lZCB0aGUgXFxcIkNyb3duIG9mIHRoZSBDb250aW5lbnQsXFxcIiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgc2l0cyBpbiB0aGUgbm9ydGh3ZXN0IGNvcm5lciBvZiBNb250YW5hLiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgaXMganVzdCBhIHNjZW5pYyBkYXnigJlzIGRyaXZlIG5vcnRoIGZyb20gWWVsbG93c3RvbmUuXFxuXFxuSGl0IHRoZSB0cmFpbCB0byBleHBsb3JlIHBsYWNlcyBsaWtlIEZpc2hlcmNhcCBMYWtlIChwaWN0dXJlZCksIHdoaWNoIGlzIGEgZ3JlYXQgcGxhY2UgdG8gc3BvdCBhIG1vb3NlLiBGcm9tIE1hbnkgR2xhY2llciBDYW1wZ3JvdW5kLCBnbyB0byB0aGUgU3dpZnRjdXJyZW50IE1vdG9yIElubiBwYXJraW5nIGxvdC4gVGhlIHRyYWlsaGVhZCBpcyBvbiB0aGUgd2VzdCBlbmQuIFlvdSdsbCBmaW5kIHRoZSBsYWtlIGxlc3MgdGhhbiBhIG1pbGUgZG93biB0aGUgdHJhaWwuIENvbnRpbnVlIDEuNSBtaWxlcyB0byBSZWRyb2NrIExha2UgYW5kIHRha2UgYSBzcHVyIHRvIFJlZHJvY2sgRmFsbHMuXFxuXFxuQSBOYXRpb25hbCBIaXN0b3JpYyBMYW5kbWFyaywgR29pbmctdG8tdGhlLVN1biBSb2FkIGlzIG9uZSBvZiB0aGUgbW9zdCBzY2VuaWMgcm9hZHMgaW4gTm9ydGggQW1lcmljYSwgbm90IHRvIG1lbnRpb24gb25lIG9mIHRoZSBtb3N0IGNvbXBsZXggdG8gYnVpbGQuIFRoZSBmaW5hbCBzZWN0aW9uLCBvdmVyIExvZ2FuIFBhc3MsIHdhcyBjb21wbGV0ZWQgaW4gMTkzMiBhZnRlciAxMSB5ZWFycyBvZiB3b3JrLiBDb25zaWRlcmVkIGFuIGVuZ2luZWVyaW5nIGZlYXQsIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIHJvYWQgZm9yZXZlciBjaGFuZ2VkIHRoZSB3YXkgdmlzaXRvcnMgd291bGQgZXhwZXJpZW5jZSBHbGFjaWVyIE5hdGlvbmFsIFBhcmsuIEZ1dHVyZSB2aXNpdG9ycyB3b3VsZCBiZSBhYmxlIHRvIGRyaXZlIG92ZXIgc2VjdGlvbnMgb2YgdGhlIHBhcmsgdGhhdCBwcmV2aW91c2x5IGhhZCB0YWtlbiBkYXlzIG9mIGhvcnNlYmFjayByaWRpbmcgdG8gc2VlLlxcblxcbkluIHRoZWlyIGFiaWxpdHkgdG8gd293IHZpc2l0b3JzLCBZZWxsb3dzdG9uZSBhbmQgR2xhY2llciBzaGFyZSBhIGNvbW1vbiBib25kLiBCdXQgYXMgd2l0aCBhbnkgZ3JlYXQgZGVzdGluYXRpb24sIHRoZXJlIGFyZSBzb21lIGFkdmVudHVyZXMgdGhhdCBhcmUgZm91bmQgbm93aGVyZSBlbHNlLiBHbGFjaWVyIHByZXNlcnZlcyBvdmVyIDEsMDAwLDAwMCBhY3JlcyBvZiBmb3Jlc3RzLCBhbHBpbmUgbWVhZG93cyBhbmQgbGFrZXMuIEl0cyBkaXZlcnNlIGhhYml0YXRzIGFyZSBob21lIHRvIG92ZXIgNzAgc3BlY2llcyBvZiBtYW1tYWxzIGFuZCBvdmVyIDI2MCBzcGVjaWVzIG9mIGJpcmRzLiBUaGUgc3BlY3RhY3VsYXIgZ2xhY2lhdGVkIGxhbmRzY2FwZSBpcyBhIGhpa2Vy4oCZcyBwYXJhZGlzZSwgY29udGFpbmluZyA3MDAgbWlsZXMgb2YgbWFpbnRhaW5lZCB0cmFpbHMgdGhhdCBsZWFkIGRlZXAgaW50byBvbmUgb2YgdGhlIGxhcmdlc3QgaW50YWN0IGVjb3N5c3RlbXMgaW4gdGhlIGxvd2VyIDQ4IHN0YXRlcy5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMiUyRmdsYWNpZXItYXZhbGFjaGUtbGFrZS1raWRzX2Fkb2JlXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTUwODcwYzVlLWIxZTYtNGQ1MS1iZTlhLWQ5Y2QyZDYyNzI0MlwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDE1MixcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMTYwMjMwNTY2NDIzLFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjgwNjAxOTkzMjAzMyxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiR2xhY2llciBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgLy8gICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgIC8vICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAvLyAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgIC8vICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAvLyAgICAgICBtaW51dGVzIDogMzksXHJcbiAgICAgICAgLy8gICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgIC8vICAgICAgIHNlY29uZHMgOiAzLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxNTQzNzk0LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiSGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiA2LFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBkZXNjcmlwdGlvbiA6IFwiSnVzdCAxNSBtaWxlcyBzb3V0aCBvZiBNb2FiLCBoaWtlIHlvdXIgd2F5IHRocm91Z2ggMzM3LCA1OTggYWNyZXMgb2YgZHJhbWF0aWMgcmVkLXJvY2sgbGFuZHNjYXBlIGluIENhbnlvbmxhbmRzIE5QLCBhbmQgZG8gaXQgYWxsIHdpdGhvdXQgaGF2aW5nIHRvIGNvbXBldGUgZm9yIHJvb20gb24gdGhlIHRyYWlsIC0gQ2FueW9ubGFuZHMgaXMgYm90aCBVdGFo4oCZcyBsYXJnZXN0IGFuZCBsZWFzdCB2aXNpdGVkIHBhcmsuXFxuXFxuVGhlIHJpdmVyLWNhcnZlZCBwYXJrIGJvYXN0cyAzNjAtZGVncmVlIHZpZXdzIG9mIHJ1c3QtY29sb3JlZCBhcmNoZXMsIGJ1dHRlcywgYW5kIGNsaWZmcyAtIGJ1dCBiZWNhdXNlIG9mIHRoZSBoaWdoLWRlc2VydCByb2NrIGVudmlyb25tZW50LCBpdHMgY2xpbWF0ZSBpcyBzdWJqZWN0IHRvIGV4dHJlbWUgdGVtcGVyYXR1cmUgZmx1Y3R1YXRpb25zLiBTa2lwIHBhY2tpbmcgdGhlIHBhcmthLCBhbmQgZ28gaW4gdGhlIHNwcmluZyBvciBmYWxsIGZvciB0aGUgbW9zdCBtb2RlcmF0ZSwgYW5kIG1vc3QgZm9yZ2l2aW5nLCB3ZWF0aGVyLlxcblxcblNvIGV4cGFuc2l2ZSBpdOKAmXMgZGl2aWRlZCBpbnRvIGZvdXIgZGlzdHJpY3RzLCBDYW55b25sYW5kcyBkZWxpdmVycyBhIHF1aW50ZXNzZW50aWFsIGRlc2VydCBleHBlcmllbmNlOiBkZWVwIGNhbnlvbnMsIHByZWhpc3RvcmljIHJvY2sgYXJ0LCByaXZlcnMsIGFuZCBzd2VlcGluZyBvdmVybG9va3MuXFxuXFxuQW1vbmcgdGhlIGV4Y2VwdGlvbmFsLCBzdHJpYXRlZCByb2NrIGZvcm1hdGlvbnMsIHRoZXJlIGFyZSBsYW5kbWFya3MgeW91IHNob3VsZG7igJl0IG1pc3MsIGxpa2UgdGhlIHVudXN1YWwgMTUwMC1mb290IFVwaGVhdmFsIERvbWUgLSB0aG91Z2h0IHRvIGJlIGEgbWV0ZW9yaXRlIGNyYXRlciAtIG9yIHRoZSBEcnVpZCBBcmNoLCBvZnRlbiByZWZlcnJlZCB0byBhcyBVdGFo4oCZcyBvd24gU3RvbmVoZW5nZS4gS2VlcCB3YXRjaCBmb3IgdGhlIHdpbGRsaWZlLCB0b28uIEJpZ2hvcm4gc2hlZXAgdGFrZSByZXNpZGVuY2UgaW4gdGhlIGNhbnlvbnMgYW5kIGJ1dHRlcywgYWxvbmcgd2l0aCBtdWxlIGRlZXIsIGthbmdhcm9vIHJhdHMsIGFuZCBjb3lvdGUuIExvb2sgdXAgZm9yIHJlZC0gdGFpbGVkIGhhd2tzLCBhbmQgYXQgbmlnaHQsIGZvciBvbmUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gdGhlIExvd2VyIDQ4LiBPbiBhIG1vb25sZXNzIG5pZ2h0LCBnZXQgbW9yZSB0aGFuIHlvdXIgZmlsbCBvZiBzdGFycyAtIG9yIGdldCBvdXQgdGhlIGJpbm9jdWxhcnMgdG8gdHJ5IGZvciB0aGUgcmluZ3Mgb2YgU2F0dXJuLlwiLFxyXG4gICAgICAgIC8vICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRkkzM0NBS3N1NXVVa3E0WHF0MnhVVkpnY0dITTIlMkZjYW55b25sYW5kcy1tZXNhLWFyY2gtc3VucmlzZV9kb2xsYXJfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49OTE3NWY2OWQtYTViMi00ODI4LThiOTgtZDA1ZDFkMWUwZjYxXCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogMzg1LFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzIxMjgzOTUyNzc0NjgsXHJcbiAgICAgICAgLy8gICAgIGxvbmdpdHVkZTogMTI3LjEyNjE0NTEwMjA4MzY3LFxyXG4gICAgICAgIC8vICAgICBuYW1lIDogXCJDYW55b25sYW5kcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgLy8gICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgIC8vICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAvLyAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgIC8vICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAvLyAgICAgICBtaW51dGVzIDogMzksXHJcbiAgICAgICAgLy8gICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgIC8vICAgICAgIHNlY29uZHMgOiAyNyxcclxuICAgICAgICAvLyAgICAgICB0aW1lIDogMTU0MDM0MTU2Nzg4OSxcclxuICAgICAgICAvLyAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgLy8gICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICByb2xlcyA6IHtcIkkzM0NBS3N1NXVVa3E0WHF0MnhVVkpnY0dITTJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgLy8gICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgIC8vICAgfSxcclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAvLyAgICAgbnVtYmVyIDogNSxcclxuICAgICAgICAvLyAgICAgc3RhdGUgOiBcImJhZFwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIkRpdmlkZWQgYnkgYSAyNzctbWlsZSBsb25nIGNhbnlvbiwgYW5kIHRoZSBtaWxlLWRlZXAgQ29sb3JhZG8gUml2ZXIsIHRoZSB0d28gaGFsdmVzIG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCB0aGUgTm9ydGggYW5kIFNvdXRoIFJpbSwgb2ZmZXIgdHdvIHBhcmtzIGluIG9uZSwgd2l0aCBkaXZlcnNlIGxhbmRzY2FwZSBhbmQgZWNvbG9neSBvbiBlaXRoZXIuXFxuXFxuR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmssIGFuZCB0aGUgZ3JlYXRlciBHcmFuZCBDYW55b24gcmVnaW9uLCBpcyBhIGhpa2VyJ3MgZHJlYW0uIE1vc3Qgb2YgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgaXMgdW5kZXZlbG9wZWQgYmFja2NvdW50cnkuIFRoZXJlIGFyZSBsaXRlcmFsbHkgaHVuZHJlZHMgb2YgbWlsZXMgdG8gaGlrZSwgYmFja3BhY2sgYW5kIGV4cGxvcmUuIERlc3BpdGUgdGhlIEdyYW5kIENhbnlvbidzIHBvcHVsYXJpdHkgYW5kIG51bWJlcnMgb2YgdmlzaXRvcnMgZWFjaCB5ZWFyLCB2aXNpdG9ycyBvbmx5IG5lZWQgdG8gaGlrZSBhIHNtYWxsIGRpc3RhbmNlIHRvIGVuam95IHNvbWUgc29saXR1ZGUuXFxuXFxuRXhwbG9yZSB0aGUgZGVwdGhzIG9mIHRoZSBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyayBvbiBwb3B1bGFyIHRyYWlscyBsaWtlIHRoZSBCcmlnaHQgQW5nZWwgYW5kIFNvdXRoIEthaWJhYiB0cmFpbCBvbiBhIG11bGUuIEEgR3JhbmQgQ2FueW9uIG11bGUgcmlkZSBpcyBhbiBhZHZlbnR1cmUgYW5kIGVhc3kgb24geW91ciBsZWdzLlxcblxcbk9uZSBvZiB0aGUgbW9zdCBleGNpdGluZyB3YXlzIHRvIGV4cGVyaWVuY2UgdGhlIEdyYW5kIENhbnlvbiBpcyB0byBmbG9hdCB0aHJvdWdoIGl0IGJ5IHdheSBvZiByYWZ0IG9uIHRoZSBDb2xvcmFkbyBSaXZlci4gTW9zdCBwZW9wbGUgYm9vayB0aGVpciB0cmlwIHdpdGggYSBjb21tZXJjaWFsIG91dGZpdHRlciBhbmQgeW91IGNhbiBldmVuIGNvbWJpbmUgdGhlIHJhZnRpbmcgdHJpcCB3aXRoIGEgaGVsaWNvcHRlciByaWRlLiBFeHBlcmllbmNlZCB3aGl0ZXdhdGVyIHJhZnRlcj8gRW50ZXIgdGhlIGxvdHRlcnkgdG8gZG8geW91ciBvd24gdHJpcC5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZOZllFMmRGMndsZlNCV3dXdkVrMEtzaVRzMXQxJTJGZ2MteWF2YXBhaS1wb2ludC1zdW5zZXRfZHBfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49NTE4MGUyZjQtOTlhNi00ZTFlLWI3NDQtZmFlYmFmOTIwNGU5XCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogNTE0LFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzIxMjgzOTUyNzc0NjgsXHJcbiAgICAgICAgLy8gICAgIGxvbmdpdHVkZTogMTI3LjEyNjE0NTEwMjA4MzY3LFxyXG4gICAgICAgIC8vICAgICBuYW1lIDogXCJHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogMyxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogNDksXHJcbiAgICAgICAgLy8gICAgICAgdGltZSA6IDE1NDAzNDE1ODk2NzQsXHJcbiAgICAgICAgLy8gICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgIC8vICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgcm9sZXMgOiB7XCJOZllFMmRGMndsZlNCV3dXdkVrMEtzaVRzMXQxXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgIC8vICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gICB7XHJcbiAgICAgICAgLy8gICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG51bWJlciA6IDEsXHJcbiAgICAgICAgLy8gICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAvLyAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uIDogXCJNYXhpbWl6ZSB5b3VyIGV4cGVyaWVuY2UgYXQgQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmsgYnkgZHJpdmluZyB0byBTdW5yaXNlLCBTdW5zZXQsIEluc3BpcmF0aW9uIGFuZCBCcnljZSB2aWV3cG9pbnRzLiBUaGVzZSBhcmUgYWxsIHNwZWN0YWN1bGFyIG92ZXJsb29rcyBvZiB0aGUgcGFya+KAmXMgcmVkIGhvb2Rvb3Mgc2hvb3RpbmcgdXAgYWdhaW5zdCBldmVyZ3JlZW4gZm9yZXN0cyBpbiB0aGUgYmFja2dyb3VuZC4gRGVwZW5kaW5nIG9uIHRoZSB0aW1lIG9mIGRheSwgYW5kIHRoZSBhbmdsZSBhbmQgbGlnaHQgb2YgdGhlIHN1biwgdGhlIGhvb2Rvb3MgYW5kIG15c3RlcmlvdXMgcm9jayBmb3JtYXRpb25zIG9mdGVuIHRha2Ugb24gdW51c3VhbCBwYXR0ZXJucyBhbmQgc2hhcGVzLCBhbmQgc29tZSB0aGluaywgaW1hZ2luYXJ5IGZhY2VzLlxcblxcbkZvciBtb3JlIGluc3BpcmF0aW9uLCBsYWNlIHVwIHlvdXIgaGlraW5nIGJvb3RzIG9yIG90aGVyIHN0dXJkeSBzaG9lcyBhbmQgZXhwbG9yZSBhIHRyYWlsLiBUaGVyZSBpcyBzb21ldGhpbmcgZm9yIGV2ZXJ5b25lIGF0IEJyeWNlIENhbnlvbi4gT3VyIGZhdm9yaXRlIGVhc3kgaGlrZXMgaW5jbHVkZSBCcmlzdGxlY29uZSBMb29wIFRyYWlsIGFuZCBRdWVlbnMgR2FyZGVuIFRyYWlsLiBIYXQgU2hvcCBpcyBvdXIgZmF2b3JpdGUgbW9kZXJhdGUgaGlrZS4gRm9yIG1vcmUgcGh5c2ljYWxseSBmaXQgaGlrZXJzIGxvb2tpbmcgZm9yIGEgc3RyZW51b3VzIGFkdmVudHVyZSwgZG8gdGhlIDUuNS1taWxlIHZlcnRpY2FsbHkgY2hhbGxlbmdpbmcgUGVlay1BLUJvbyBMb29wIG9yIHRoZSA3LjkgRmFpcnlsYW5kIExvb3AgcmF0ZWQg4oCcZGlmZmljdWx04oCdIGJ5IHRoZSBwYXJrIHNlcnZpY2UuIFwiLFxyXG4gICAgICAgIC8vICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRlJ6MjB5QzdMRVNPQ0RVb2E0c3A2OXY1Y29wVDIlMkZicnljZS1hbXBoaXRoZWF0ZXItaW5zcGlyYXRpb24tcG9pbnRfZHBfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49MDZkMTU0YjctODBkOC00NmM5LTlmZGYtZTNlNzBlYzQzOTUxXCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogMjQ1LFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzIwODYzMjEyOTY3MzIsXHJcbiAgICAgICAgLy8gICAgIGxvbmdpdHVkZTogMTI3LjEyNDM1ODc1MDg3OTc2LFxyXG4gICAgICAgIC8vICAgICBuYW1lIDogXCJCcnljZSBDYW55b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogMyxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDQwLFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogMjEsXHJcbiAgICAgICAgLy8gICAgICAgdGltZSA6IDE1NDAzNDE2MjEzODEsXHJcbiAgICAgICAgLy8gICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgIC8vICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgcm9sZXMgOiB7XCJSejIweUM3TEVTT0NEVW9hNHNwNjl2NWNvcFQyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgIC8vICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gICB7XHJcbiAgICAgICAgLy8gICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgLy8gICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAvLyAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHByZXNlcnZlcyBhIHNwZWN0YWN1bGFyIGxhbmRzY2FwZSByaWNoIHdpdGggbWFqZXN0aWMgbW91bnRhaW5zLCBwcmlzdGluZSBsYWtlcywgYW5kIGV4dHJhb3JkaW5hcnkgd2lsZGxpZmUuIFRoZSBhYnJ1cHQgdmVydGljYWwgcmlzZSBvZiB0aGUgamFnZ2VkIFRldG9uIE1vdW50YWlucyBjb250cmFzdHMgd2l0aCB0aGUgaG9yaXpvbnRhbCBzYWdlLWNvdmVyZWQgdmFsbGV5IGFuZCBnbGFjaWFsIGxha2VzIGF0IGl0cyBiYXNlLlxcblxcbkl0IHRvb2sgbW9yZSB0aGFuIDMwIHllYXJzIGZvciBHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHRvIHRyYW5zZm9ybSBmcm9tIGFuIGlkZWEgdG8gb25lIG9mIHRoZSBjb3VudHJ5J3MgbW9zdCBzdHVubmluZyBwYXJrcy4gV2hlbiBDb25ncmVzcyBjcmVhdGVkIHRoZSBwYXJrIGluIDE5MjksIGl0IG9ubHkgaW5jbHVkZWQgdGhlIFRldG9uIFJhbmdlIGFuZCBzaXggZ2xhY2lhbCBsYWtlcy4gSm9obiBELiBSb2NrZWZlbGxlciwgSnIuLCBwbGF5ZWQgYSBrZXkgcm9sZSBpbiBhY3F1aXJpbmcgYW4gYWRkaXRpb25hbCAzNSwwMDAgYWNyZXMgZm9yIHRoZSBwYXJrIHVuZGVyIHRoZSBuYW1lIFxcXCJTbmFrZSBSaXZlciBMYW5kIENvLlxcXCIgQW1pZCBjb250cm92ZXJzeSB0aGUgXFxcIm5ld1xcXCIgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB3YXMgZXN0YWJsaXNoZWQgU2VwdC4gMTQsIDE5NTAsIGJ5IFByZXNpZGVudCBIYXJyeSBUcnVtYW4uXFxuXFxuR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBhbmQgaXRzIHdvcmxkLWNsYXNzIHNjZW5lcnkgYXR0cmFjdHMgbmVhcmx5IDQgbWlsbGlvbiB2aXNpdG9ycyBwZXIgeWVhci4gV2l0aCBKZW5ueSBMYWtlIGFuZCBKYWNrc29uIExha2UgYXQgNiwzMjAgZmVldCBhbmQgdGhlIHN1bW1pdCBvZiB0aGUgR3JhbmQgVGV0b24gYXQgMTMsNzcwIGZlZXQsIHRoZSBwYXJrJ3MgZWxldmF0aW9uIHJhbmdlcyBjcmVhdGUgb25lIG9mIHRoZSBuYXRpb24ncyBtb3N0IGF3ZS1pbnNwaXJpbmcgbGFuZHNjYXBlcy4gSW4gYWRkaXRpb24gdG8gZ2F6aW5nIGF0IHRoZSBpbmNyZWRpYmxlIHZpZXdzLCB0aGVyZSBpcyBtdWNoIHRvIGRvIGluIHRoaXMgcGFyayBmcm9tIGhpa2luZyBhbmQgcm9jayBjbGltYmluZyB0byBib2F0aW5nIGFuZCBmaXNoaW5nLiBBbmQgd2hlbiB5b3UgbmVlZCBhIGJyZWFrIGZyb20gb3V0ZG9vciBhZHZlbnR1cmUsIHRoZXJlIGFyZSBmZXcgYmV0dGVyIHBsYWNlcyB0byBzaW1wbHkgcmVsYXggYW5kIHdhdGNoIHRoZSBwYXJrJ3MgaW5jcmVkaWJsZSB3aWxkbGlmZS5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZhc3FVMjFRemx0WU9nblQ1TURjZ1dvdFJKd0gyJTJGZ3RldG9uLXNjaHdhYmFjaGVycy1sYW5kaW5nX2RvbGxhcl82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj1kM2FiZmJkMC1iNzI1LTRiMGMtOTdlNS1mNjE2YmRiNzAzMDVcIixcclxuICAgICAgICAvLyAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgbGlrZXMgOiAxNjksXHJcbiAgICAgICAgLy8gICAgIGxhdGl0dWRlOiAzNy4zMjEzNzQ4NzI3OTEwOCxcclxuICAgICAgICAvLyAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyMTAwNjY2MTY1MzcsXHJcbiAgICAgICAgLy8gICAgIG5hbWUgOiBcIkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAvLyAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgLy8gICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgIC8vICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgLy8gICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDQ3LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxNjQ3NzYyLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiAzLFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIkV4cGxvcmUgU291dGggRGFrb3Rh4oCZcyBCbGFjayBIaWxscyByZWdpb24sIGEgbmF0dXJhbCB3b25kZXIgaW4gaXRzIG93biByaWdodC4gTG9jYXRlZCBhYm91dCBzaXggaG91cnMgZnJvbSBZZWxsb3dzdG9uZSwgdGhlIEJsYWNrIEhpbGxzIGFyZSBob21lIHRvIHNldmVuIG5hdGlvbmFsIHNpdGVzIOKAlCBCYWRsYW5kcyBOYXRpb25hbCBQYXJrLCBKZXdlbCBDYXZlIE5hdGlvbmFsIE1vbnVtZW50LCB0aGUgTGV3aXMgJiBDbGFyayBOYXRpb25hbCBIaXN0b3JpYyBUcmFpbCwgTWludXRlbWFuIE1pc3NpbGUgTmF0aW9uYWwgSGlzdG9yaWMgU2l0ZSwgTWlzc291cmkgTmF0aW9uYWwgUmVjcmVhdGlvbmFsIFJpdmVyLCBNb3VudCBSdXNobW9yZSBOYXRpb25hbCBNZW1vcmlhbCwgYW5kIFdpbmQgQ2F2ZSBOYXRpb25hbCBQYXJrLlxcblxcbkluIHRoaXMgbmF0dXJhbCBwbGF5Z3JvdW5kLCB5b3UgY2FuIGVuam95IGFuIGFidW5kYW5jZSBvZiByZWNyZWF0aW9uYWwgb3Bwb3J0dW5pdGllcywgZ29yZ2VvdXMgc2NlbmljIGRyaXZlcyDigJQgd2hpY2ggaW5jbHVkZSB0aGUgYmVhdXRpZnVsIFNwZWFyZmlzaCBDYW55b24g4oCUIGFuZCB3aWxkbGlmZS13YXRjaGluZy4gVGhpcyByZWdpb24gaXMgYWxzbyBwYWNrZWQgd2l0aCBjdWx0dXJhbCBhbmQgaGlzdG9yaWNhbCBzaXRlcy5cXG5cXG5XaGlsZSB5b3Ugd29u4oCZdCBzZWUgc2FiZXItdG9vdGhlZCBjYXRzIG9yIHJoaW5vY2Vyb3NlcyByb2FtaW5nIHRoZSBCYWRsYW5kcyBsaWtlIHRoZXkgb25jZSBkaWQsIHlvdSBtYXkgc2VlIHRoZWlyIHJlbWFpbnMgaW4gdGhpcyBzdHVubmluZyBuYXRpb25hbCBwYXJrIHdpdGggc29tZSBvZiB0aGUgd29ybGTigJlzIHJpY2hlc3QgZm9zc2lsIGRlcG9zaXRzLlxcblxcbkxvY2F0ZWQgaW4gSW1sYXkgVG93bnNoaXAgaW4gU291dGggRGFrb3RhLCBCYWRsYW5kcyBOYXRpb25hbCBQYXJrIGhhcyBhIEZvc3NpbCBQcmVwYXJhdGlvbiBMYWIgd2hlcmUgeW91IGNhbiB3YXRjaCBwYWxlb250b2xvZ2lzdHMgYXQgd29yaywgbGl0ZXJhbGx5IHVuY292ZXJpbmcgdGhlIGFuY2llbnQgaGlzdG9yeSBvZiB0aGUgYXJlYS4gQXQgdGhlIEJlbiBSZWlmZWwgVmlzaXRvciBDZW50ZXIsIGtpZHMgY2FuIHVzZSBhIHRvdWNoc2NyZWVuIHRvIGFzc2VtYmxlIGEgdmlydHVhbCBza2VsZXRvbiBhbmQgdG91Y2ggZm9zc2lsaXplZCBhbmltYWwgcmVwbGljYXMuIFlvdSBhbHNvIGNhbiB3YXRjaCB0aGUgZmlsbSBMYW5kIG9mIFN0b25lIGFuZCBMaWdodCBpbiB0aGUgY2VudGVy4oCZcyA5NS1zZWF0IGFpci1jb25kaXRpb25lZCB0aGVhdGVyLlwiLFxyXG4gICAgICAgIC8vICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRmF5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTIlMkZiYWRsYW5kc193aWtpcGRfNjgweDM5Mi5qcGc/YWx0PW1lZGlhJnRva2VuPTVkNjcyYzI1LTdiZDEtNDIyMS1hOWRkLTcxNGVjODkwOTkxNFwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDIyNyxcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMDEwMTQ0OTI4NzgxLFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjI1MjkxNDkwNTU0OCxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiQmFkbGFuZHMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogMyxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDQxLFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogMTEsXHJcbiAgICAgICAgLy8gICAgICAgdGltZSA6IDE1NDAzNDE2NzE5NDcsXHJcbiAgICAgICAgLy8gICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgIC8vICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgcm9sZXMgOiB7XCJheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgIC8vICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAvLyAgIH1dXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZmlyZWJhc2UgY2xvdWRlIHN0b3JhZ2UgdGVzdCAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBuZWVkIHRvIGtub3cgaG93IHRvIGdldCBodHRwIGltZyBzcmNcclxuICAgIC8vIHVwbG9hZCBwaWN0dXJlIGZpcnN0IGFuZCBtYWtlIHBvc3RfZGF0YVxyXG5cclxuICAgIC8vIHVwZGF0ZV9pbWFnZV9zcmMoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vIH1cclxuICAgIC8vIHVwZGF0ZV9wb3N0KHBvc3RfaWQsIHBvc3RfZGF0YSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgLy8gICAgIC51cGRhdGUocG9zdF9kYXRhKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0IHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVByb2ZpbGUgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHNldFRoaXNVc2VyUHJvZmlsZShkYXRhKXtcclxuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvcHJvZmlsZScsIGRhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQmxvZyBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZWFyY2hfcG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBlbm5lYWdyYW1fbnVtOm51bWJlcixcclxuICAgICAgICBvcmlnaW5fbGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbl9sb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlX21ldGVyOm51bWJlclxyXG4gICAgKXtcclxuICAgICAgICBjb25zdCBPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUiA9IDExMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIG1heF9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgKyBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgdmFyIG1pbl9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgLSBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4X2xhdGl0dWRlX2RlZ3JlZSA+PSA5MCl7XHJcbiAgICAgICAgICAgIG1heF9sYXRpdHVkZV9kZWdyZWUgPSA5MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWluX2xhdGl0dWRlX2RlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5fbGF0aXR1ZGVfZGVncmVlID0gLTkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbG9uZ2l0dWRlICsgZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luX2xhdGl0dWRlICogKDE4MCAvIE1hdGguUEkpKSk7XHJcbiAgICAgICAgdmFyIG1pbl9sb25naXR1ZGVfZGVncmVlID0gb3JpZ2luX2xvbmdpdHVkZSAtIGRpc3RhbmNlX21ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbl9sYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heF9sb25naXR1ZGVfZGVncmVlIC0gbWluX2xvbmdpdHVkZV9kZWdyZWUgPj0gMzYwKXtcclxuICAgICAgICAgICAgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gLTE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYobWF4X2xvbmdpdHVkZV9kZWdyZWUgPj0gMTgwKXtcclxuICAgICAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWUgLSAzNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPD0gLTE4MCl7XHJcbiAgICAgICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG1pbl9sb25naXR1ZGVfZGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPiBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluX2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbGF0XCIsbWluX2xhdGl0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbGF0XCIsb3JpZ2luX2xhdGl0dWRlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xhdFwiLG1heF9sYXRpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xvblwiLG1pbl9sb25naXR1ZGVfZGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5fbG9uZ2l0dWRlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sb25cIixtYXhfbG9uZ2l0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgZW5uZWFncmFtX251bSlcclxuICAgICAgICAud2hlcmUoXCJ0eXBlXCIsIFwiPT1cIiwgdHlwZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI8PVwiLCBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkb2MuZGF0YSgpLmxhdGl0dWRlIDw9IG1heF9sYXRpdHVkZV9kZWdyZWUgJiYgZG9jLmRhdGEoKS5sYXRpdHVkZSA+PSBtaW5fbGF0aXR1ZGVfZGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaF9xdWVyaWVzKFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIGVubmVhZ3JhbV9udW1zOm51bWJlcltdLFxyXG4gICAgICAgIG9yaWdpbl9sYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luX2xvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VfbWV0ZXI6bnVtYmVyLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZW5uZWFncmFtX251bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoX3Bvc3QodHlwZSxlbm5lYWdyYW1fbnVtc1tpXSxvcmlnaW5fbGF0aXR1ZGUsb3JpZ2luX2xvbmdpdHVkZSxkaXN0YW5jZV9tZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF91c2VyX3Bvc3RzKHVzZXJfaWQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJfaWQsIFwiPT1cIiwgXCJvd25lclwiKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5wdXNoKHNlYXJjaFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZF9wb3N0KHBvc3RfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLmFkZChwb3N0X2RhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgcG9zdCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZF9jb21tZW50KHBvc3RfaWQsIGNvbW1lbnRfZGF0YSl7XHJcbiAgICAgICAgdmFyIHBvc3RzID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnRfZGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlX2NvbW1lbnQocG9zdF9pZCwgY29tbWVudF9pZCwgY29tbWVudF9kYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RfaWQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjb21tZW50c1wiKS5kb2MoY29tbWVudF9pZClcclxuICAgICAgICAudXBkYXRlKGNvbW1lbnRfZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkUG9zdCgpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wIDtpPHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHBvc3RfaWQgaW4gdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFBvc3RJRCA9PT0gcG9zdF9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB0ZXN0IHF1ZXJpZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gLy8gbmV3IHVzZXJcclxuICAgIC8vIHNldF9kYXRhKCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgIC5kb2ModGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAvLyAgICAgLnNldCh7XHJcbiAgICAvLyAgICAgICAgIGF1dGhvcjogdGhpcy5hdXRodXNlci51aWQsXHJcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiU2FuIEZyYW5jaXNjb1wiLFxyXG4gICAgLy8gICAgICAgICBzdGF0ZTogXCJDQVwiLFxyXG4gICAgLy8gICAgICAgICBjb3VudHJ5OiBcIlVTQVwiLFxyXG4gICAgLy8gICAgICAgICBjYXBpdGFsOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAwXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlX2RhdGEoKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAvLyAgICAgLmRvYyhcIlNGXCIpXHJcbiAgICAvLyAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMSxcclxuICAgIC8vICAgICAgICAgdXBkYXRlVGltZXN0YW1wOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAvLyAgICAgICAgIGxvY2F0aW9uOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5HZW9Qb2ludCg0LjM0LCA1LjY3KVxyXG4gICAgLy8gICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHBvcHVsYXRpb24gdXBkYXRlZFwiKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBnZXRfZG9jdW1lbnRzX2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNpdGllc0NvbGxlY3Rpb24gPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpO1xyXG5cclxuICAgIC8vICAgICBjaXRpZXNDb2xsZWN0aW9uLmdldCgpLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAvLyAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYCR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gZ2V0X2RhdGVfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgLy8gICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuXHJcbiAgICAvLyAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZ2V0KCkudGhlbihkb2MgPT4ge1xyXG4gICAgLy8gICAgICAgaWYgKGRvYy5leGlzdHMpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYERvY3VtZW50IGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAvLyAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHN1Y2ggZG9jdW1lbnQhXCIpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHdoZXJlX3F1ZXJ5KCl7ICAgICAgICBcclxuICAgIC8vICAgICAvLyBcIkdpbW1lIGFsbCBjaXRpZXMgaW4gQ2FsaWZvcm5pYSB3aXRoIGEgcG9wdWxhdGlvbiBiZWxvdyA1NTAwMDBcIlxyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAud2hlcmUoXCJzdGF0ZVwiLCBcIj09XCIsIFwiQ0FcIikud2hlcmUoXCJwb3B1bGF0aW9uXCIsIFwiPFwiLCAyNTAwMDAwKVxyXG4gICAgLy8gICAgIC5nZXQoKVxyXG4gICAgLy8gICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgLy8gICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYFJlbGF0aXZlbHkgc21hbGwgQ2FsaWZvcm5pYW4gY2l0eTogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZGVsZXRlX2RvY3VtZW50X2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIGRlbGV0ZV9kYXRhX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIkxBXCIpXHJcbiAgICAvLyAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICAgIGNhcGl0YWw6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5kZWxldGUoKSxcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gZ2V0VGhpc1VzZXJEYXRhKCl7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFxyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgICAgICAud2hlcmUoXCJhdXRob3JcIiwgXCI9PVwiLCB0aGlzLmF1dGh1c2VyLnVpZClcclxuICAgIC8vICAgICAgICAgLmdldCgpXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBpY3R1cmUgdXBsb2FkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLyAxLiB3aGVuIHVzZXIgc2VsZWN0IHBpY3R1cmUsIHRoZSBwaWN0dXJlIHVwbG9hZGVkIGludG8gc3RvcmFnZS5cclxuICAgIHBpY2tJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxyXG5cdFx0fSk7XHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZVR5cGUsZmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICAvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgc3luY1RoaXNVc2VyUm9vbUxpc3QoKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyZXN1bHQua2V5LCByZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3VzZXJzL1wiICsgdGhpcy5hdXRodXNlci51aWQgKyBcIi91c2VyX3Jvb21zXCIpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20odXBkYXRlZF9yb29tX2lkLCByb29tX2ZyaWVuZF9pZDphbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvcm9vbXMvJyArIHVwZGF0ZWRfcm9vbV9pZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbU1lc3NhZ2VzKHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21faWQsIHJlc3VsdC5rZXkgLHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbV9pZCtcIi9tZXNzYWdlc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tTWVzc2FnZXMocm9vbV9pZDpzdHJpbmcsIG1lc3NhZ2VfaWQ6YW55LCBtZXNzYWdlOmFueSl7XHJcbiAgICAgICAgaWYoIXRoaXMucm9vbXNbcm9vbV9pZF1bJ21lc3NhZ2VzJ10pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9vbXNbcm9vbV9pZF1bJ21lc3NhZ2VzJ11bbWVzc2FnZV9pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB2YXIgbWVzc2FnZV90b19hZGQgPSB7fTtcclxuICAgICAgICBtZXNzYWdlX3RvX2FkZFttZXNzYWdlX2lkXSA9IHRoaXMucm9vbXNbcm9vbV9pZF1bJ21lc3NhZ2VzJ11bbWVzc2FnZV9pZF1cclxuICAgICAgICBpZihyb29tX2lkID09IHRoaXMuc2VsZWN0ZWRSb29tSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5wdXNoKG1lc3NhZ2VfdG9fYWRkKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWRUb2dnbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgIH1cclxuICAgIHNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKG1lc3NhZ2VBcnJheSl7XHJcbiAgICAgICAgaWYobWVzc2FnZUFycmF5PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2E7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2I7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGEpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9hID0gYVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGIpe1xyXG4gICAgICAgICAgICAgICAgRGF0ZVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9iID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2IgPSBtZXNzYWdlX2JbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgICAgIHZhciB0aW1lX2EgPSBtZXNzYWdlX2FbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lX2EgLSB0aW1lX2I7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBtZXNzYWdlIDpcclxuICAgIC8vIFRoaXMgd2lsbCBiYSBhY3RpdmF0ZWQgd2hlbiB1c2VyIHNlbmQgYSBtZXNzYWdlIHRvIGZyaWVuZCBhZnRlciBpbnZpdGUgZnJpZW5kLlxyXG4gICAgcHVzaEZyaWVuZE9uUm9vbSh1c2VyOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbV9pZCtcIi9yb29tX3VzZXJzL1wiK3VpZCwgdXNlclt1aWRdKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJvb21faWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFNlbGVjdGVkRnJpZW5kSUQoc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZElEID0gc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGVkRnJpZW5kSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDEuIGdlbmVyYXRlIHJvb20gaWRcclxuICAgIGdlbmVyYXRlUm9vbVdpdGhTZWxlY3RlZEZyaWVuZHModXNlcjphbnksIGZyaWVuZDphbnkpe1xyXG4gICAgICAgIHZhciBmcmllbmRfaWQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmcmllbmRfaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVzZXJfaWQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgdXNlcl9pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayByb29tIGV4aXN0IGJlZm9yZSBnZW5lcmF0ZS5cclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHJvb20uXHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByb29tIHdpdGggZnJpZW5kX2lkOiBcIiArIGZyaWVuZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZW5fcm9vbSA9IHtyb29tX3VzZXJzOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ2lzT3BlbiddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5fcm9vbVsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgb3Blbl9yb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIGZyaWVuZCwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKGZyaWVuZCwgdXNlciwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHZW5lcmF0ZWRSb29tSUQocmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQyLmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIGV4aXN0LCBkb24ndCBtYWtlIG5ldyBvbmUuXHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciByb29tX2lkIGluIHJlc3VsdFsndmFsdWUnXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGlzdCByb29tOiBcIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlcl9pZCArICcvdXNlcl9yb29tcycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuVkFMVUUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWU6ICd0ZXN0JyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kX2lkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgLy8gMi4gc2V0IGF1dGhlbnRpY2F0aW9uIGZvciByb29tcyBvbiB1c2VyIGRhdGFiYXNlXHJcbiAgICBwdXNoUm9vbUlET25Vc2VyKHVzZXI6YW55LCBmcmllbmQ6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVzZXJfcm9vbSA9IHt9O1xyXG4gICAgICAgIHVzZXJfcm9vbVsnaW5Sb29tJ10gPSB0cnVlO1xyXG4gICAgICAgIHVzZXJfcm9vbVsnam9pblRpbWUnXSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdXNlcl9yb29tWydsZWF2ZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgZm9yKHZhciBmcmllbmRfaWQgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgICAgICB1c2VyX3Jvb21bJ3Jvb21JY29uJ10gPSBmcmllbmRbZnJpZW5kX2lkXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9yb29tWyd0aXRsZSddID0gZnJpZW5kW2ZyaWVuZF9pZF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsnbWVzc2FnZUljb24nXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9yb29tWyd1c2VyTmFtZSddID0gdXNlclt1aWRdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgcm9vbSBhY2Nlc3MgYXRoZW50aWNhdGlvbiBvbiB1c2VyIGRhdGFiYXNlXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycrdWlkKycvdXNlcl9yb29tcy8nK3Jvb21faWQsIGZyaWVuZF9pZCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgY2FuIHdyaXRlIG9uIGNoYXQgcm9vbVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tX2lkKycvcm9vbV91c2Vycy8nK3VpZCwgdXNlcl9yb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMocm9vbV9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3luY1Jvb20ocm9vbV9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlIHNvbWUgbWVzc2FnZXMgOlxyXG4gICAgcHVzaE1lc3NhZ2VPblJvb20ocm9vbV9pZDpzdHJpbmcsIHVzZXI6YW55LCBtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VfcGFjayA9IHt9O1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBtZXNzYWdlX3BhY2tbJ3VzZXInXSA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWydtZXNzYWdlJ10gPSBtZXNzYWdlO1xyXG4gICAgICAgIG1lc3NhZ2VfcGFja1sndGltZXN0YW1wJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGZpcmViYXNlLnB1c2goJy9yb29tcy8nK3Jvb21faWQrJy9tZXNzYWdlcycsIG1lc3NhZ2VfcGFjaykudGhlbihyZXN1bHQgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBNZXNzYWdlX3BhY2sgSURcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmlyZWJhc2UgUmVhbHRpbWUgZGF0YWJhc2UgdGVzdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIG1ha2UgYXJyYXkgdHlwZSBkYXRhYmFzZSBhbmQgcHVzaCBkYXRhIGluIGFycmF5IHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIHB1c2hJbkFycmF5RGF0YWJhc2UoZGF0YWJhc2VPZkFycmF5UGF0aDpzdHJpbmcsIHB1c2hEYXRhOmFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5wdXNoKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VPZkFycmF5UGF0aCwgcHVzaERhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8vIG1ha2UgZGF0YSBzdHJ1Y3R1cmUgb2YgdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgLy8gbWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCBzdHJ1Y3R1cmU6IGFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgc3RydWN0dXJlKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvLyBhZGQgYXR0cmlidXRlIGluIHZhbHVlIHR5cGUgZGF0YWJhc2UgYW5kIHVwZGF0ZSBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIHdyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgdXBkYXRlRGF0YTogYW55KXtcclxuICAgIC8vICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAvLyAgICAgICAgIGZpcmViYXNlLnVwZGF0ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgdXBkYXRlRGF0YSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIC8vIHJlYWQgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyByZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgIC8vICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gLy8gY29tcGxleCBxdWVyeVxyXG4gICAgLy8gcXVlcnlPbkRhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm9uUXVlcnlFdmVudCxcclxuICAgIC8vICAgICAgICAgICAgIC8vICcvdXNlcnMnLFxyXG4gICAgLy8gICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgIC8vICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgIC8vICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBidXQgb25seSBjb21wYW5pZXMgJ3NpbmNlJyBhIGNlcnRhaW4geWVhciAoVGVsZXJpaydzIHZhbHVlIGlzIDIwMDAsIHdoaWNoIGlzIGltYWdpbmFyeSBidHcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL3JhbmdlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLy99LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIC4uIG9yICdjaGFpbicgcmFuZ2VzIGxpa2UgdGhpczpcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gcmFuZ2VzOiBbXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDE5OTlcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRU5EX0FULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gXSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3QgMiBtYXRjaGVzXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICApXHJcbiAgICAvLyAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgIC8vICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgXHJcbiAgICAvLyAvLyBxdWVyeSByZXN1bHRcclxuICAgIC8vIG9uUXVlcnlFdmVudChyZXN1bHQpIHtcclxuICAgIC8vICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcclxuICAgIC8vICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxyXG4gICAgLy8gICAgIGlmICghcmVzdWx0LmVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH07XHJcblxyXG4gICAgLy8gcXVlcnlUZXN0KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAvLyAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAnL3VzZXJzJyxcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgIC8vICAgICAgICAgICAgICAgICB2YWx1ZTogJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgKVxyXG4gICAgLy8gICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVbJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXSkpXHJcbiAgICAvLyAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIHJlYWRVc2VyTmFtZSgpe1xyXG4gICAgLy8gICAgIHZhciB1c2VySWQgPSBmaXJlYmFzZVdlYi5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgLy8gICAgIHJldHVybiBmaXJlYmFzZVdlYi5kYXRhYmFzZSgpLnJlZignL3VzZXJzLycgKyB1c2VySWQpLm9uY2UoJ3ZhbHVlJykudGhlbihmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdXNlcm5hbWUgPSAoc25hcHNob3QudmFsKCkgJiYgc25hcHNob3QudmFsKCkudXNlcm5hbWUpIHx8ICdBbm9ueW1vdXMnO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUF1dGggU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGdldCBjdXJyZW5kVXNlclxyXG4gICAgbG9naW5CeUVtYWlsKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbkJ5RmFjZWJvb2soKXtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWxcclxuICAgICAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgLy8gZGVmYXVsdHMgdG8gWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXHJcbiAgICAgICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5CeUdvb2dsZSgpe1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRSxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgXHJcbiAgICAgICAgICAgIGdvb2dsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBob3N0ZWREb21haW46IFwiY2hhdC1kZW1vLTVkM2E3LmZpcmViYXNlYXBwLmNvbVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIGNoZWNrRmlyc3RVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGWGtNNE1Od0szMGh0QlVndlc4dkpQRFJqNHFGMiUyRmltYWdlcyUyRmltZ19yYW5rX3MuanBnP2FsdD1tZWRpYSZ0b2tlbj1jZWI5OWI3OS04MzczLTRjNDctYjk3Yy03OWNkNzNiMTJmYzNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3Qgb2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgb2tcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluaXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0QXV0aFVzZXIoKXtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbXMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgICAgIHVzZXJba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGhpc1VzZXIgPSB1c2VyO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGhpc1VzZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRfaWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDsgICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZnJpZW5kX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PWZyaWVuZF9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldEZyaWVuZHMoZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGZyaWVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyaWVuZFsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddID0gdGhpcy5nZXRGcmllbmRzKClbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hGcmllbmRPblJvb20odGhpcy50aGlzVXNlcixcIi1MUExWTlZGMnlNMU16eUctRDcxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaE1lc3NhZ2VPblJvb20oXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiLCB0aGlzLnRoaXNVc2VyLCBcImhpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdlbmVyYXRlUG9zdCh0aGlzLnRoaXNVc2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkRnJpZW5kKGZyaWVuZCl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRzW2tleV0gPSBmcmllbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRVc2Vyc0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHNldFJvb21zKHJvb21faWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocm9vbV9pZHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxyb29tX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbV9pZHNbaV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb29tKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PXJvb21faWRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNUaGlzVXNlclJvb21MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRSb29tKHJvb20pe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHJvb20pe1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW2tleV0gPSByb29tW2tleV07XHJcbiAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuICAgICAgICB0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuICAgICAgICAvLyB0aGlzLmFkZF9jb21tZW50KCdqM1hlVklyb0FKd0xxU0Q1cmU2Qycse2hlbGxvOidoZWxsbyd9KTtcclxuICAgICAgICAvLyBmb3IodmFyIGk9MDtpPHRoaXMudGVzdF9kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFkZF9wb3N0KHRoaXMudGVzdF9kYXRhW2ldKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hfcG9zdChcImNoYXRcIiwzLDM3LjMyMzk3MiwgMTI3LjEyNTEwOSAsMTAwMDAwKTtcclxuICAgICAgICAvLyB0aGlzLnNlYXJjaF9xdWVyaWVzKFwiY2hhdFwiLFsxLDIsMyw0LDUsNiw3LDgsOV0sMzcuMzIzOTcyLCAxMjcuMTI1MTA5ICwxMDAwMDApO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RmlsZVVSTCgnYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMicsJ2d0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZycpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0X3VzZXJfcG9zdHMoXCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkX2pzb24gPSB7fTtcclxuICAgICAgICAgICAgICAgIGNoaWxkX2pzb25ba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRfanNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9PSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==