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
        this.test_data = [{
                behavior: "",
                emotion: "",
                number: 9,
                state: "good",
                thought: "",
                closeTime: "",
                description: "",
                image: "",
                isOpen: true,
                likes: "",
                latitude: 37.325240604800946,
                longitude: 127.12098587304354,
                name: "",
                openTime: {
                    date: 25,
                    day: 4,
                    hours: 20,
                    minutes: 50,
                    month: 9,
                    seconds: 44,
                    time: 1540468244400,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "5FgrewJa2Mh9C598k70HQ40b1qu1": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 2,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Marvel at more than 2,000 natural rock arches at this park just outside of Moab. Some of the formations can be spotted from the road, but the best require a scenic hike. Don’t miss the famous Delicate Arch (3 miles round-trip) or the 7-mile (round-trip) Devils Garden Loop.\n\nThe Park Avenue Trail is the most popular hike in the park because of its ease and scenery at just 2 miles round trip. Or try the more challenging hike to Delicate Arches at 3.2 miles round trip.\n\nWhether you are camping or staying in a hotel, don’t forget to spend some time looking up at the sky after night falls. You’ll find some of the darkest skies in and around Utah’s national parks.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FH6U4ZRvLW6SL8RmIX18TYmg1hhV2%2Farches-delicate-arch-sky_adobe_680.jpg?alt=media&token=6cb48ab5-96f5-43b2-9ea1-6749cdbed38f",
                isOpen: true,
                likes: 245,
                latitude: 37.323080469252254,
                longitude: 127.12255798280238,
                name: "Arches National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 34,
                    month: 9,
                    seconds: 49,
                    time: 1540341289918,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "H6U4ZRvLW6SL8RmIX18TYmg1hhV2": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 8,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Nicknamed the \"Crown of the Continent,\" Glacier National Park sits in the northwest corner of Montana. Glacier National Park is just a scenic day’s drive north from Yellowstone.\n\nHit the trail to explore places like Fishercap Lake (pictured), which is a great place to spot a moose. From Many Glacier Campground, go to the Swiftcurrent Motor Inn parking lot. The trailhead is on the west end. You'll find the lake less than a mile down the trail. Continue 1.5 miles to Redrock Lake and take a spur to Redrock Falls.\n\nA National Historic Landmark, Going-to-the-Sun Road is one of the most scenic roads in North America, not to mention one of the most complex to build. The final section, over Logan Pass, was completed in 1932 after 11 years of work. Considered an engineering feat, the construction of the road forever changed the way visitors would experience Glacier National Park. Future visitors would be able to drive over sections of the park that previously had taken days of horseback riding to see.\n\nIn their ability to wow visitors, Yellowstone and Glacier share a common bond. But as with any great destination, there are some adventures that are found nowhere else. Glacier preserves over 1,000,000 acres of forests, alpine meadows and lakes. Its diverse habitats are home to over 70 species of mammals and over 260 species of birds. The spectacular glaciated landscape is a hiker’s paradise, containing 700 miles of maintained trails that lead deep into one of the largest intact ecosystems in the lower 48 states.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FHcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2HcBjRLszVnS5tPscDWg0ZDOoxxP2%2Fglacier-avalache-lake-kids_adobe_680.jpg?alt=media&token=50870c5e-b1e6-4d51-be9a-d9cd2d627242",
                isOpen: true,
                likes: 152,
                latitude: 37.32160230566423,
                longitude: 127.12806019932033,
                name: "Glacier National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 39,
                    month: 9,
                    seconds: 3,
                    time: 1540341543794,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "HcBjRLszVnS5tPscDWg0ZDOoxxP2": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 6,
                state: "",
                thought: "",
                closeTime: "",
                description: "Just 15 miles south of Moab, hike your way through 337, 598 acres of dramatic red-rock landscape in Canyonlands NP, and do it all without having to compete for room on the trail - Canyonlands is both Utah’s largest and least visited park.\n\nThe river-carved park boasts 360-degree views of rust-colored arches, buttes, and cliffs - but because of the high-desert rock environment, its climate is subject to extreme temperature fluctuations. Skip packing the parka, and go in the spring or fall for the most moderate, and most forgiving, weather.\n\nSo expansive it’s divided into four districts, Canyonlands delivers a quintessential desert experience: deep canyons, prehistoric rock art, rivers, and sweeping overlooks.\n\nAmong the exceptional, striated rock formations, there are landmarks you shouldn’t miss, like the unusual 1500-foot Upheaval Dome - thought to be a meteorite crater - or the Druid Arch, often referred to as Utah’s own Stonehenge. Keep watch for the wildlife, too. Bighorn sheep take residence in the canyons and buttes, along with mule deer, kangaroo rats, and coyote. Look up for red- tailed hawks, and at night, for one of the darkest skies in the Lower 48. On a moonless night, get more than your fill of stars - or get out the binoculars to try for the rings of Saturn.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FI33CAKsu5uUkq4Xqt2xUVJgcGHM2%2Fcanyonlands-mesa-arch-sunrise_dollar_680.jpg?alt=media&token=9175f69d-a5b2-4828-8b98-d05d1d1e0f61",
                isOpen: true,
                likes: 385,
                latitude: 37.32128395277468,
                longitude: 127.12614510208367,
                name: "Canyonlands National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 39,
                    month: 9,
                    seconds: 27,
                    time: 1540341567889,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "I33CAKsu5uUkq4Xqt2xUVJgcGHM2": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 5,
                state: "bad",
                thought: "",
                closeTime: "",
                description: "Divided by a 277-mile long canyon, and the mile-deep Colorado River, the two halves of Grand Canyon National Park, the North and South Rim, offer two parks in one, with diverse landscape and ecology on either.\n\nGrand Canyon National Park, and the greater Grand Canyon region, is a hiker's dream. Most of Grand Canyon National Park is undeveloped backcountry. There are literally hundreds of miles to hike, backpack and explore. Despite the Grand Canyon's popularity and numbers of visitors each year, visitors only need to hike a small distance to enjoy some solitude.\n\nExplore the depths of the Grand Canyon National Park on popular trails like the Bright Angel and South Kaibab trail on a mule. A Grand Canyon mule ride is an adventure and easy on your legs.\n\nOne of the most exciting ways to experience the Grand Canyon is to float through it by way of raft on the Colorado River. Most people book their trip with a commercial outfitter and you can even combine the rafting trip with a helicopter ride. Experienced whitewater rafter? Enter the lottery to do your own trip.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FNfYE2dF2wlfSBWwWvEk0KsiTs1t1%2Fgc-yavapai-point-sunset_dp_680.jpg?alt=media&token=5180e2f4-99a6-4e1e-b744-faebaf9204e9",
                isOpen: true,
                likes: 514,
                latitude: 37.32128395277468,
                longitude: 127.12614510208367,
                name: "Grand Canyon National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 39,
                    month: 9,
                    seconds: 49,
                    time: 1540341589674,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "NfYE2dF2wlfSBWwWvEk0KsiTs1t1": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 1,
                state: "",
                thought: "",
                closeTime: "",
                description: "Maximize your experience at Bryce Canyon National Park by driving to Sunrise, Sunset, Inspiration and Bryce viewpoints. These are all spectacular overlooks of the park’s red hoodoos shooting up against evergreen forests in the background. Depending on the time of day, and the angle and light of the sun, the hoodoos and mysterious rock formations often take on unusual patterns and shapes, and some think, imaginary faces.\n\nFor more inspiration, lace up your hiking boots or other sturdy shoes and explore a trail. There is something for everyone at Bryce Canyon. Our favorite easy hikes include Bristlecone Loop Trail and Queens Garden Trail. Hat Shop is our favorite moderate hike. For more physically fit hikers looking for a strenuous adventure, do the 5.5-mile vertically challenging Peek-A-Boo Loop or the 7.9 Fairyland Loop rated “difficult” by the park service. ",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FRz20yC7LESOCDUoa4sp69v5copT2%2Fbryce-amphitheater-inspiration-point_dp_680.jpg?alt=media&token=06d154b7-80d8-46c9-9fdf-e3e70ec43951",
                isOpen: true,
                likes: 245,
                latitude: 37.32086321296732,
                longitude: 127.12435875087976,
                name: "Bryce Canyon National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 40,
                    month: 9,
                    seconds: 21,
                    time: 1540341621381,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "Rz20yC7LESOCDUoa4sp69v5copT2": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 9,
                state: "",
                thought: "",
                closeTime: "",
                description: "Grand Teton National Park preserves a spectacular landscape rich with majestic mountains, pristine lakes, and extraordinary wildlife. The abrupt vertical rise of the jagged Teton Mountains contrasts with the horizontal sage-covered valley and glacial lakes at its base.\n\nIt took more than 30 years for Grand Teton National Park to transform from an idea to one of the country's most stunning parks. When Congress created the park in 1929, it only included the Teton Range and six glacial lakes. John D. Rockefeller, Jr., played a key role in acquiring an additional 35,000 acres for the park under the name \"Snake River Land Co.\" Amid controversy the \"new\" Grand Teton National Park was established Sept. 14, 1950, by President Harry Truman.\n\nGrand Teton National Park and its world-class scenery attracts nearly 4 million visitors per year. With Jenny Lake and Jackson Lake at 6,320 feet and the summit of the Grand Teton at 13,770 feet, the park's elevation ranges create one of the nation's most awe-inspiring landscapes. In addition to gazing at the incredible views, there is much to do in this park from hiking and rock climbing to boating and fishing. And when you need a break from outdoor adventure, there are few better places to simply relax and watch the park's incredible wildlife.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FasqU21QzltYOgnT5MDcgWotRJwH2%2Fgteton-schwabachers-landing_dollar_680.jpg?alt=media&token=d3abfbd0-b725-4b0c-97e5-f616bdb70305",
                isOpen: true,
                likes: 169,
                latitude: 37.32137487279108,
                longitude: 127.12210066616537,
                name: "Grand Teton National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 40,
                    month: 9,
                    seconds: 47,
                    time: 1540341647762,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "asqU21QzltYOgnT5MDcgWotRJwH2": "owner" },
                type: "chat"
            },
            {
                behavior: "",
                emotion: "",
                number: 3,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Explore South Dakota’s Black Hills region, a natural wonder in its own right. Located about six hours from Yellowstone, the Black Hills are home to seven national sites — Badlands National Park, Jewel Cave National Monument, the Lewis & Clark National Historic Trail, Minuteman Missile National Historic Site, Missouri National Recreational River, Mount Rushmore National Memorial, and Wind Cave National Park.\n\nIn this natural playground, you can enjoy an abundance of recreational opportunities, gorgeous scenic drives — which include the beautiful Spearfish Canyon — and wildlife-watching. This region is also packed with cultural and historical sites.\n\nWhile you won’t see saber-toothed cats or rhinoceroses roaming the Badlands like they once did, you may see their remains in this stunning national park with some of the world’s richest fossil deposits.\n\nLocated in Imlay Township in South Dakota, Badlands National Park has a Fossil Preparation Lab where you can watch paleontologists at work, literally uncovering the ancient history of the area. At the Ben Reifel Visitor Center, kids can use a touchscreen to assemble a virtual skeleton and touch fossilized animal replicas. You also can watch the film Land of Stone and Light in the center’s 95-seat air-conditioned theater.",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-demo-5d3a7.appspot.com/o/users%2FayQt5VfwwOhzZ7UEtPMXrHtimce2%2Fbadlands_wikipd_680x392.jpg?alt=media&token=5d672c25-7bd1-4221-a9dd-714ec8909914",
                isOpen: true,
                likes: 227,
                latitude: 37.32010144928781,
                longitude: 127.12252914905548,
                name: "Badlands National Park",
                openTime: {
                    date: 24,
                    day: 3,
                    hours: 9,
                    minutes: 41,
                    month: 9,
                    seconds: 11,
                    time: 1540341671947,
                    timezoneOffset: -540,
                    year: 118
                },
                roles: { "ayQt5VfwwOhzZ7UEtPMXrHtimce2": "owner" },
                type: "chat"
            }];
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
    //----------------------------Init Section------------------------------------------
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
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFHL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFrQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFqQ3ZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLDZCQUF3QixHQUFFLEVBQUUsQ0FBQztRQUM3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQVdYLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQVl0QywwQkFBcUIsR0FBZSxFQUFFLENBQUM7UUFLMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUNkLFFBQVEsRUFBRyxFQUFFO2dCQUNiLE9BQU8sRUFBRyxFQUFFO2dCQUNaLE1BQU0sRUFBRyxDQUFDO2dCQUNWLEtBQUssRUFBRyxNQUFNO2dCQUNkLE9BQU8sRUFBRyxFQUFFO2dCQUNaLFNBQVMsRUFBRyxFQUFFO2dCQUNkLFdBQVcsRUFBRyxFQUFFO2dCQUNoQixLQUFLLEVBQUcsRUFBRTtnQkFDVixNQUFNLEVBQUcsSUFBSTtnQkFDYixLQUFLLEVBQUcsRUFBRTtnQkFDVixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixJQUFJLEVBQUcsRUFBRTtnQkFDVCxRQUFRLEVBQUc7b0JBQ1QsSUFBSSxFQUFHLEVB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ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcblxyXG5pbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0XCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxudmFyIGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGF1dGh1c2VyOiBmaXJlYmFzZS5Vc2VyOyAgICBcclxuICAgIHB1YmxpYyB0aGlzVXNlcjogYW55ID0ge307XHJcbiAgICBwdWJsaWMgdGhpc1VzZXJQcm9maWxlUGljc3JjID0gXCJcIjtcclxuICAgIHB1YmxpYyB0aGlzVXNlckJhY2tncm91bmRQaWNzcmMgPVwiXCI7XHJcbiAgICBwdWJsaWMgdGhpc1VzZXJOYW1lID0gXCJcIjsgICAgXHJcbiAgICBwdWJsaWMgdGhpc1VTZXJFbWFpbCA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZHMgPSB7fTtcclxuICAgIHB1YmxpYyByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGZyaWVuZEFycmF5OiBBcnJheTxhbnk+O1xyXG4gICAgcHVibGljIHJvb21BcnJheTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tSUQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21UaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgbWVzc2FnZVVwZGF0ZWRUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG5cclxuICAgIHRlc3RfZGF0YTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgcG9zdFNlYXJjaFJlc3VsdEFycmF5OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQb3N0SUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy50ZXN0X2RhdGEgPSBbe1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogXCJcIixcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyNTI0MDYwNDgwMDk0NixcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIwOTg1ODczMDQzNTQsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjUsXHJcbiAgICAgICAgICAgICAgZGF5IDogNCxcclxuICAgICAgICAgICAgICBob3VycyA6IDIwLFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA1MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ0LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwNDY4MjQ0NDAwLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiNUZncmV3SmEyTWg5QzU5OGs3MEhRNDBiMXF1MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiAyLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk1hcnZlbCBhdCBtb3JlIHRoYW4gMiwwMDAgbmF0dXJhbCByb2NrIGFyY2hlcyBhdCB0aGlzIHBhcmsganVzdCBvdXRzaWRlIG9mIE1vYWIuIFNvbWUgb2YgdGhlIGZvcm1hdGlvbnMgY2FuIGJlIHNwb3R0ZWQgZnJvbSB0aGUgcm9hZCwgYnV0IHRoZSBiZXN0IHJlcXVpcmUgYSBzY2VuaWMgaGlrZS4gRG9u4oCZdCBtaXNzIHRoZSBmYW1vdXMgRGVsaWNhdGUgQXJjaCAoMyBtaWxlcyByb3VuZC10cmlwKSBvciB0aGUgNy1taWxlIChyb3VuZC10cmlwKSBEZXZpbHMgR2FyZGVuIExvb3AuXFxuXFxuVGhlIFBhcmsgQXZlbnVlIFRyYWlsIGlzIHRoZSBtb3N0IHBvcHVsYXIgaGlrZSBpbiB0aGUgcGFyayBiZWNhdXNlIG9mIGl0cyBlYXNlIGFuZCBzY2VuZXJ5IGF0IGp1c3QgMiBtaWxlcyByb3VuZCB0cmlwLiBPciB0cnkgdGhlIG1vcmUgY2hhbGxlbmdpbmcgaGlrZSB0byBEZWxpY2F0ZSBBcmNoZXMgYXQgMy4yIG1pbGVzIHJvdW5kIHRyaXAuXFxuXFxuV2hldGhlciB5b3UgYXJlIGNhbXBpbmcgb3Igc3RheWluZyBpbiBhIGhvdGVsLCBkb27igJl0IGZvcmdldCB0byBzcGVuZCBzb21lIHRpbWUgbG9va2luZyB1cCBhdCB0aGUgc2t5IGFmdGVyIG5pZ2h0IGZhbGxzLiBZb3XigJlsbCBmaW5kIHNvbWUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gYW5kIGFyb3VuZCBVdGFo4oCZcyBuYXRpb25hbCBwYXJrcy5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJTJGYXJjaGVzLWRlbGljYXRlLWFyY2gtc2t5X2Fkb2JlXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTZjYjQ4YWI1LTk2ZjUtNDNiMi05ZWExLTY3NDljZGJlZDM4ZlwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMzA4MDQ2OTI1MjI1NCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTU3OTgyODAyMzgsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkFyY2hlcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzQsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0OSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTI4OTkxOCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogOCxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJOaWNrbmFtZWQgdGhlIFxcXCJDcm93biBvZiB0aGUgQ29udGluZW50LFxcXCIgR2xhY2llciBOYXRpb25hbCBQYXJrIHNpdHMgaW4gdGhlIG5vcnRod2VzdCBjb3JuZXIgb2YgTW9udGFuYS4gR2xhY2llciBOYXRpb25hbCBQYXJrIGlzIGp1c3QgYSBzY2VuaWMgZGF54oCZcyBkcml2ZSBub3J0aCBmcm9tIFllbGxvd3N0b25lLlxcblxcbkhpdCB0aGUgdHJhaWwgdG8gZXhwbG9yZSBwbGFjZXMgbGlrZSBGaXNoZXJjYXAgTGFrZSAocGljdHVyZWQpLCB3aGljaCBpcyBhIGdyZWF0IHBsYWNlIHRvIHNwb3QgYSBtb29zZS4gRnJvbSBNYW55IEdsYWNpZXIgQ2FtcGdyb3VuZCwgZ28gdG8gdGhlIFN3aWZ0Y3VycmVudCBNb3RvciBJbm4gcGFya2luZyBsb3QuIFRoZSB0cmFpbGhlYWQgaXMgb24gdGhlIHdlc3QgZW5kLiBZb3UnbGwgZmluZCB0aGUgbGFrZSBsZXNzIHRoYW4gYSBtaWxlIGRvd24gdGhlIHRyYWlsLiBDb250aW51ZSAxLjUgbWlsZXMgdG8gUmVkcm9jayBMYWtlIGFuZCB0YWtlIGEgc3B1ciB0byBSZWRyb2NrIEZhbGxzLlxcblxcbkEgTmF0aW9uYWwgSGlzdG9yaWMgTGFuZG1hcmssIEdvaW5nLXRvLXRoZS1TdW4gUm9hZCBpcyBvbmUgb2YgdGhlIG1vc3Qgc2NlbmljIHJvYWRzIGluIE5vcnRoIEFtZXJpY2EsIG5vdCB0byBtZW50aW9uIG9uZSBvZiB0aGUgbW9zdCBjb21wbGV4IHRvIGJ1aWxkLiBUaGUgZmluYWwgc2VjdGlvbiwgb3ZlciBMb2dhbiBQYXNzLCB3YXMgY29tcGxldGVkIGluIDE5MzIgYWZ0ZXIgMTEgeWVhcnMgb2Ygd29yay4gQ29uc2lkZXJlZCBhbiBlbmdpbmVlcmluZyBmZWF0LCB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSByb2FkIGZvcmV2ZXIgY2hhbmdlZCB0aGUgd2F5IHZpc2l0b3JzIHdvdWxkIGV4cGVyaWVuY2UgR2xhY2llciBOYXRpb25hbCBQYXJrLiBGdXR1cmUgdmlzaXRvcnMgd291bGQgYmUgYWJsZSB0byBkcml2ZSBvdmVyIHNlY3Rpb25zIG9mIHRoZSBwYXJrIHRoYXQgcHJldmlvdXNseSBoYWQgdGFrZW4gZGF5cyBvZiBob3JzZWJhY2sgcmlkaW5nIHRvIHNlZS5cXG5cXG5JbiB0aGVpciBhYmlsaXR5IHRvIHdvdyB2aXNpdG9ycywgWWVsbG93c3RvbmUgYW5kIEdsYWNpZXIgc2hhcmUgYSBjb21tb24gYm9uZC4gQnV0IGFzIHdpdGggYW55IGdyZWF0IGRlc3RpbmF0aW9uLCB0aGVyZSBhcmUgc29tZSBhZHZlbnR1cmVzIHRoYXQgYXJlIGZvdW5kIG5vd2hlcmUgZWxzZS4gR2xhY2llciBwcmVzZXJ2ZXMgb3ZlciAxLDAwMCwwMDAgYWNyZXMgb2YgZm9yZXN0cywgYWxwaW5lIG1lYWRvd3MgYW5kIGxha2VzLiBJdHMgZGl2ZXJzZSBoYWJpdGF0cyBhcmUgaG9tZSB0byBvdmVyIDcwIHNwZWNpZXMgb2YgbWFtbWFscyBhbmQgb3ZlciAyNjAgc3BlY2llcyBvZiBiaXJkcy4gVGhlIHNwZWN0YWN1bGFyIGdsYWNpYXRlZCBsYW5kc2NhcGUgaXMgYSBoaWtlcuKAmXMgcGFyYWRpc2UsIGNvbnRhaW5pbmcgNzAwIG1pbGVzIG9mIG1haW50YWluZWQgdHJhaWxzIHRoYXQgbGVhZCBkZWVwIGludG8gb25lIG9mIHRoZSBsYXJnZXN0IGludGFjdCBlY29zeXN0ZW1zIGluIHRoZSBsb3dlciA0OCBzdGF0ZXMuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGSGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDIlMkZnbGFjaWVyLWF2YWxhY2hlLWxha2Uta2lkc19hZG9iZV82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj01MDg3MGM1ZS1iMWU2LTRkNTEtYmU5YS1kOWNkMmQ2MjcyNDJcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAxNTIsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjE2MDIzMDU2NjQyMyxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTI4MDYwMTk5MzIwMzMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkdsYWNpZXIgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTU0Mzc5NCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogNixcclxuICAgICAgICAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkp1c3QgMTUgbWlsZXMgc291dGggb2YgTW9hYiwgaGlrZSB5b3VyIHdheSB0aHJvdWdoIDMzNywgNTk4IGFjcmVzIG9mIGRyYW1hdGljIHJlZC1yb2NrIGxhbmRzY2FwZSBpbiBDYW55b25sYW5kcyBOUCwgYW5kIGRvIGl0IGFsbCB3aXRob3V0IGhhdmluZyB0byBjb21wZXRlIGZvciByb29tIG9uIHRoZSB0cmFpbCAtIENhbnlvbmxhbmRzIGlzIGJvdGggVXRhaOKAmXMgbGFyZ2VzdCBhbmQgbGVhc3QgdmlzaXRlZCBwYXJrLlxcblxcblRoZSByaXZlci1jYXJ2ZWQgcGFyayBib2FzdHMgMzYwLWRlZ3JlZSB2aWV3cyBvZiBydXN0LWNvbG9yZWQgYXJjaGVzLCBidXR0ZXMsIGFuZCBjbGlmZnMgLSBidXQgYmVjYXVzZSBvZiB0aGUgaGlnaC1kZXNlcnQgcm9jayBlbnZpcm9ubWVudCwgaXRzIGNsaW1hdGUgaXMgc3ViamVjdCB0byBleHRyZW1lIHRlbXBlcmF0dXJlIGZsdWN0dWF0aW9ucy4gU2tpcCBwYWNraW5nIHRoZSBwYXJrYSwgYW5kIGdvIGluIHRoZSBzcHJpbmcgb3IgZmFsbCBmb3IgdGhlIG1vc3QgbW9kZXJhdGUsIGFuZCBtb3N0IGZvcmdpdmluZywgd2VhdGhlci5cXG5cXG5TbyBleHBhbnNpdmUgaXTigJlzIGRpdmlkZWQgaW50byBmb3VyIGRpc3RyaWN0cywgQ2FueW9ubGFuZHMgZGVsaXZlcnMgYSBxdWludGVzc2VudGlhbCBkZXNlcnQgZXhwZXJpZW5jZTogZGVlcCBjYW55b25zLCBwcmVoaXN0b3JpYyByb2NrIGFydCwgcml2ZXJzLCBhbmQgc3dlZXBpbmcgb3Zlcmxvb2tzLlxcblxcbkFtb25nIHRoZSBleGNlcHRpb25hbCwgc3RyaWF0ZWQgcm9jayBmb3JtYXRpb25zLCB0aGVyZSBhcmUgbGFuZG1hcmtzIHlvdSBzaG91bGRu4oCZdCBtaXNzLCBsaWtlIHRoZSB1bnVzdWFsIDE1MDAtZm9vdCBVcGhlYXZhbCBEb21lIC0gdGhvdWdodCB0byBiZSBhIG1ldGVvcml0ZSBjcmF0ZXIgLSBvciB0aGUgRHJ1aWQgQXJjaCwgb2Z0ZW4gcmVmZXJyZWQgdG8gYXMgVXRhaOKAmXMgb3duIFN0b25laGVuZ2UuIEtlZXAgd2F0Y2ggZm9yIHRoZSB3aWxkbGlmZSwgdG9vLiBCaWdob3JuIHNoZWVwIHRha2UgcmVzaWRlbmNlIGluIHRoZSBjYW55b25zIGFuZCBidXR0ZXMsIGFsb25nIHdpdGggbXVsZSBkZWVyLCBrYW5nYXJvbyByYXRzLCBhbmQgY295b3RlLiBMb29rIHVwIGZvciByZWQtIHRhaWxlZCBoYXdrcywgYW5kIGF0IG5pZ2h0LCBmb3Igb25lIG9mIHRoZSBkYXJrZXN0IHNraWVzIGluIHRoZSBMb3dlciA0OC4gT24gYSBtb29ubGVzcyBuaWdodCwgZ2V0IG1vcmUgdGhhbiB5b3VyIGZpbGwgb2Ygc3RhcnMgLSBvciBnZXQgb3V0IHRoZSBiaW5vY3VsYXJzIHRvIHRyeSBmb3IgdGhlIHJpbmdzIG9mIFNhdHVybi5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yJTJGY2FueW9ubGFuZHMtbWVzYS1hcmNoLXN1bnJpc2VfZG9sbGFyXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTkxNzVmNjlkLWE1YjItNDgyOC04Yjk4LWQwNWQxZDFlMGY2MVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDM4NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiQ2FueW9ubGFuZHMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMjcsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE1Njc4ODksXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDUsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJiYWRcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEaXZpZGVkIGJ5IGEgMjc3LW1pbGUgbG9uZyBjYW55b24sIGFuZCB0aGUgbWlsZS1kZWVwIENvbG9yYWRvIFJpdmVyLCB0aGUgdHdvIGhhbHZlcyBvZiBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyaywgdGhlIE5vcnRoIGFuZCBTb3V0aCBSaW0sIG9mZmVyIHR3byBwYXJrcyBpbiBvbmUsIHdpdGggZGl2ZXJzZSBsYW5kc2NhcGUgYW5kIGVjb2xvZ3kgb24gZWl0aGVyLlxcblxcbkdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCBhbmQgdGhlIGdyZWF0ZXIgR3JhbmQgQ2FueW9uIHJlZ2lvbiwgaXMgYSBoaWtlcidzIGRyZWFtLiBNb3N0IG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrIGlzIHVuZGV2ZWxvcGVkIGJhY2tjb3VudHJ5LiBUaGVyZSBhcmUgbGl0ZXJhbGx5IGh1bmRyZWRzIG9mIG1pbGVzIHRvIGhpa2UsIGJhY2twYWNrIGFuZCBleHBsb3JlLiBEZXNwaXRlIHRoZSBHcmFuZCBDYW55b24ncyBwb3B1bGFyaXR5IGFuZCBudW1iZXJzIG9mIHZpc2l0b3JzIGVhY2ggeWVhciwgdmlzaXRvcnMgb25seSBuZWVkIHRvIGhpa2UgYSBzbWFsbCBkaXN0YW5jZSB0byBlbmpveSBzb21lIHNvbGl0dWRlLlxcblxcbkV4cGxvcmUgdGhlIGRlcHRocyBvZiB0aGUgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgb24gcG9wdWxhciB0cmFpbHMgbGlrZSB0aGUgQnJpZ2h0IEFuZ2VsIGFuZCBTb3V0aCBLYWliYWIgdHJhaWwgb24gYSBtdWxlLiBBIEdyYW5kIENhbnlvbiBtdWxlIHJpZGUgaXMgYW4gYWR2ZW50dXJlIGFuZCBlYXN5IG9uIHlvdXIgbGVncy5cXG5cXG5PbmUgb2YgdGhlIG1vc3QgZXhjaXRpbmcgd2F5cyB0byBleHBlcmllbmNlIHRoZSBHcmFuZCBDYW55b24gaXMgdG8gZmxvYXQgdGhyb3VnaCBpdCBieSB3YXkgb2YgcmFmdCBvbiB0aGUgQ29sb3JhZG8gUml2ZXIuIE1vc3QgcGVvcGxlIGJvb2sgdGhlaXIgdHJpcCB3aXRoIGEgY29tbWVyY2lhbCBvdXRmaXR0ZXIgYW5kIHlvdSBjYW4gZXZlbiBjb21iaW5lIHRoZSByYWZ0aW5nIHRyaXAgd2l0aCBhIGhlbGljb3B0ZXIgcmlkZS4gRXhwZXJpZW5jZWQgd2hpdGV3YXRlciByYWZ0ZXI/IEVudGVyIHRoZSBsb3R0ZXJ5IHRvIGRvIHlvdXIgb3duIHRyaXAuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MSUyRmdjLXlhdmFwYWktcG9pbnQtc3Vuc2V0X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTUxODBlMmY0LTk5YTYtNGUxZS1iNzQ0LWZhZWJhZjkyMDRlOVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDUxNCxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ5LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNTg5Njc0LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiAxLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTWF4aW1pemUgeW91ciBleHBlcmllbmNlIGF0IEJyeWNlIENhbnlvbiBOYXRpb25hbCBQYXJrIGJ5IGRyaXZpbmcgdG8gU3VucmlzZSwgU3Vuc2V0LCBJbnNwaXJhdGlvbiBhbmQgQnJ5Y2Ugdmlld3BvaW50cy4gVGhlc2UgYXJlIGFsbCBzcGVjdGFjdWxhciBvdmVybG9va3Mgb2YgdGhlIHBhcmvigJlzIHJlZCBob29kb29zIHNob290aW5nIHVwIGFnYWluc3QgZXZlcmdyZWVuIGZvcmVzdHMgaW4gdGhlIGJhY2tncm91bmQuIERlcGVuZGluZyBvbiB0aGUgdGltZSBvZiBkYXksIGFuZCB0aGUgYW5nbGUgYW5kIGxpZ2h0IG9mIHRoZSBzdW4sIHRoZSBob29kb29zIGFuZCBteXN0ZXJpb3VzIHJvY2sgZm9ybWF0aW9ucyBvZnRlbiB0YWtlIG9uIHVudXN1YWwgcGF0dGVybnMgYW5kIHNoYXBlcywgYW5kIHNvbWUgdGhpbmssIGltYWdpbmFyeSBmYWNlcy5cXG5cXG5Gb3IgbW9yZSBpbnNwaXJhdGlvbiwgbGFjZSB1cCB5b3VyIGhpa2luZyBib290cyBvciBvdGhlciBzdHVyZHkgc2hvZXMgYW5kIGV4cGxvcmUgYSB0cmFpbC4gVGhlcmUgaXMgc29tZXRoaW5nIGZvciBldmVyeW9uZSBhdCBCcnljZSBDYW55b24uIE91ciBmYXZvcml0ZSBlYXN5IGhpa2VzIGluY2x1ZGUgQnJpc3RsZWNvbmUgTG9vcCBUcmFpbCBhbmQgUXVlZW5zIEdhcmRlbiBUcmFpbC4gSGF0IFNob3AgaXMgb3VyIGZhdm9yaXRlIG1vZGVyYXRlIGhpa2UuIEZvciBtb3JlIHBoeXNpY2FsbHkgZml0IGhpa2VycyBsb29raW5nIGZvciBhIHN0cmVudW91cyBhZHZlbnR1cmUsIGRvIHRoZSA1LjUtbWlsZSB2ZXJ0aWNhbGx5IGNoYWxsZW5naW5nIFBlZWstQS1Cb28gTG9vcCBvciB0aGUgNy45IEZhaXJ5bGFuZCBMb29wIHJhdGVkIOKAnGRpZmZpY3VsdOKAnSBieSB0aGUgcGFyayBzZXJ2aWNlLiBcIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZSejIweUM3TEVTT0NEVW9hNHNwNjl2NWNvcFQyJTJGYnJ5Y2UtYW1waGl0aGVhdGVyLWluc3BpcmF0aW9uLXBvaW50X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTA2ZDE1NGI3LTgwZDgtNDZjOS05ZmRmLWUzZTcwZWM0Mzk1MVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMDg2MzIxMjk2NzMyLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjQzNTg3NTA4Nzk3NixcclxuICAgICAgICAgICAgbmFtZSA6IFwiQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDIxLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjIxMzgxLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiUnoyMHlDN0xFU09DRFVvYTRzcDY5djVjb3BUMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBwcmVzZXJ2ZXMgYSBzcGVjdGFjdWxhciBsYW5kc2NhcGUgcmljaCB3aXRoIG1hamVzdGljIG1vdW50YWlucywgcHJpc3RpbmUgbGFrZXMsIGFuZCBleHRyYW9yZGluYXJ5IHdpbGRsaWZlLiBUaGUgYWJydXB0IHZlcnRpY2FsIHJpc2Ugb2YgdGhlIGphZ2dlZCBUZXRvbiBNb3VudGFpbnMgY29udHJhc3RzIHdpdGggdGhlIGhvcml6b250YWwgc2FnZS1jb3ZlcmVkIHZhbGxleSBhbmQgZ2xhY2lhbCBsYWtlcyBhdCBpdHMgYmFzZS5cXG5cXG5JdCB0b29rIG1vcmUgdGhhbiAzMCB5ZWFycyBmb3IgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB0byB0cmFuc2Zvcm0gZnJvbSBhbiBpZGVhIHRvIG9uZSBvZiB0aGUgY291bnRyeSdzIG1vc3Qgc3R1bm5pbmcgcGFya3MuIFdoZW4gQ29uZ3Jlc3MgY3JlYXRlZCB0aGUgcGFyayBpbiAxOTI5LCBpdCBvbmx5IGluY2x1ZGVkIHRoZSBUZXRvbiBSYW5nZSBhbmQgc2l4IGdsYWNpYWwgbGFrZXMuIEpvaG4gRC4gUm9ja2VmZWxsZXIsIEpyLiwgcGxheWVkIGEga2V5IHJvbGUgaW4gYWNxdWlyaW5nIGFuIGFkZGl0aW9uYWwgMzUsMDAwIGFjcmVzIGZvciB0aGUgcGFyayB1bmRlciB0aGUgbmFtZSBcXFwiU25ha2UgUml2ZXIgTGFuZCBDby5cXFwiIEFtaWQgY29udHJvdmVyc3kgdGhlIFxcXCJuZXdcXFwiIEdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgd2FzIGVzdGFibGlzaGVkIFNlcHQuIDE0LCAxOTUwLCBieSBQcmVzaWRlbnQgSGFycnkgVHJ1bWFuLlxcblxcbkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgYW5kIGl0cyB3b3JsZC1jbGFzcyBzY2VuZXJ5IGF0dHJhY3RzIG5lYXJseSA0IG1pbGxpb24gdmlzaXRvcnMgcGVyIHllYXIuIFdpdGggSmVubnkgTGFrZSBhbmQgSmFja3NvbiBMYWtlIGF0IDYsMzIwIGZlZXQgYW5kIHRoZSBzdW1taXQgb2YgdGhlIEdyYW5kIFRldG9uIGF0IDEzLDc3MCBmZWV0LCB0aGUgcGFyaydzIGVsZXZhdGlvbiByYW5nZXMgY3JlYXRlIG9uZSBvZiB0aGUgbmF0aW9uJ3MgbW9zdCBhd2UtaW5zcGlyaW5nIGxhbmRzY2FwZXMuIEluIGFkZGl0aW9uIHRvIGdhemluZyBhdCB0aGUgaW5jcmVkaWJsZSB2aWV3cywgdGhlcmUgaXMgbXVjaCB0byBkbyBpbiB0aGlzIHBhcmsgZnJvbSBoaWtpbmcgYW5kIHJvY2sgY2xpbWJpbmcgdG8gYm9hdGluZyBhbmQgZmlzaGluZy4gQW5kIHdoZW4geW91IG5lZWQgYSBicmVhayBmcm9tIG91dGRvb3IgYWR2ZW50dXJlLCB0aGVyZSBhcmUgZmV3IGJldHRlciBwbGFjZXMgdG8gc2ltcGx5IHJlbGF4IGFuZCB3YXRjaCB0aGUgcGFyaydzIGluY3JlZGlibGUgd2lsZGxpZmUuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMiUyRmd0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49ZDNhYmZiZDAtYjcyNS00YjBjLTk3ZTUtZjYxNmJkYjcwMzA1XCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMTY5LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIxMzc0ODcyNzkxMDgsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyMjEwMDY2NjE2NTM3LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNDAsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0NyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTY0Nzc2MixcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcImFzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMyxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJFeHBsb3JlIFNvdXRoIERha290YeKAmXMgQmxhY2sgSGlsbHMgcmVnaW9uLCBhIG5hdHVyYWwgd29uZGVyIGluIGl0cyBvd24gcmlnaHQuIExvY2F0ZWQgYWJvdXQgc2l4IGhvdXJzIGZyb20gWWVsbG93c3RvbmUsIHRoZSBCbGFjayBIaWxscyBhcmUgaG9tZSB0byBzZXZlbiBuYXRpb25hbCBzaXRlcyDigJQgQmFkbGFuZHMgTmF0aW9uYWwgUGFyaywgSmV3ZWwgQ2F2ZSBOYXRpb25hbCBNb251bWVudCwgdGhlIExld2lzICYgQ2xhcmsgTmF0aW9uYWwgSGlzdG9yaWMgVHJhaWwsIE1pbnV0ZW1hbiBNaXNzaWxlIE5hdGlvbmFsIEhpc3RvcmljIFNpdGUsIE1pc3NvdXJpIE5hdGlvbmFsIFJlY3JlYXRpb25hbCBSaXZlciwgTW91bnQgUnVzaG1vcmUgTmF0aW9uYWwgTWVtb3JpYWwsIGFuZCBXaW5kIENhdmUgTmF0aW9uYWwgUGFyay5cXG5cXG5JbiB0aGlzIG5hdHVyYWwgcGxheWdyb3VuZCwgeW91IGNhbiBlbmpveSBhbiBhYnVuZGFuY2Ugb2YgcmVjcmVhdGlvbmFsIG9wcG9ydHVuaXRpZXMsIGdvcmdlb3VzIHNjZW5pYyBkcml2ZXMg4oCUIHdoaWNoIGluY2x1ZGUgdGhlIGJlYXV0aWZ1bCBTcGVhcmZpc2ggQ2FueW9uIOKAlCBhbmQgd2lsZGxpZmUtd2F0Y2hpbmcuIFRoaXMgcmVnaW9uIGlzIGFsc28gcGFja2VkIHdpdGggY3VsdHVyYWwgYW5kIGhpc3RvcmljYWwgc2l0ZXMuXFxuXFxuV2hpbGUgeW91IHdvbuKAmXQgc2VlIHNhYmVyLXRvb3RoZWQgY2F0cyBvciByaGlub2Nlcm9zZXMgcm9hbWluZyB0aGUgQmFkbGFuZHMgbGlrZSB0aGV5IG9uY2UgZGlkLCB5b3UgbWF5IHNlZSB0aGVpciByZW1haW5zIGluIHRoaXMgc3R1bm5pbmcgbmF0aW9uYWwgcGFyayB3aXRoIHNvbWUgb2YgdGhlIHdvcmxk4oCZcyByaWNoZXN0IGZvc3NpbCBkZXBvc2l0cy5cXG5cXG5Mb2NhdGVkIGluIEltbGF5IFRvd25zaGlwIGluIFNvdXRoIERha290YSwgQmFkbGFuZHMgTmF0aW9uYWwgUGFyayBoYXMgYSBGb3NzaWwgUHJlcGFyYXRpb24gTGFiIHdoZXJlIHlvdSBjYW4gd2F0Y2ggcGFsZW9udG9sb2dpc3RzIGF0IHdvcmssIGxpdGVyYWxseSB1bmNvdmVyaW5nIHRoZSBhbmNpZW50IGhpc3Rvcnkgb2YgdGhlIGFyZWEuIEF0IHRoZSBCZW4gUmVpZmVsIFZpc2l0b3IgQ2VudGVyLCBraWRzIGNhbiB1c2UgYSB0b3VjaHNjcmVlbiB0byBhc3NlbWJsZSBhIHZpcnR1YWwgc2tlbGV0b24gYW5kIHRvdWNoIGZvc3NpbGl6ZWQgYW5pbWFsIHJlcGxpY2FzLiBZb3UgYWxzbyBjYW4gd2F0Y2ggdGhlIGZpbG0gTGFuZCBvZiBTdG9uZSBhbmQgTGlnaHQgaW4gdGhlIGNlbnRlcuKAmXMgOTUtc2VhdCBhaXItY29uZGl0aW9uZWQgdGhlYXRlci5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJTJGYmFkbGFuZHNfd2lraXBkXzY4MHgzOTIuanBnP2FsdD1tZWRpYSZ0b2tlbj01ZDY3MmMyNS03YmQxLTQyMjEtYTlkZC03MTRlYzg5MDk5MTRcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAyMjcsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjAxMDE0NDkyODc4MSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTI5MTQ5MDU1NDgsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkJhZGxhbmRzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDExLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjcxOTQ3LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGZpcmViYXNlIGNsb3VkZSBzdG9yYWdlIHRlc3QgLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gbmVlZCB0byBrbm93IGhvdyB0byBnZXQgaHR0cCBpbWcgc3JjXHJcbiAgICAvLyB1cGxvYWQgcGljdHVyZSBmaXJzdCBhbmQgbWFrZSBwb3N0X2RhdGFcclxuXHJcbiAgICAvLyB1cGRhdGVfaW1hZ2Vfc3JjKCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAvLyB9XHJcbiAgICAvLyB1cGRhdGVfcG9zdChwb3N0X2lkLCBwb3N0X2RhdGEpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdF9pZClcclxuICAgIC8vICAgICAudXBkYXRlKHBvc3RfZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwicG9zdCB1cGRhdGVkXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qcm9maWxlIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBzZXRUaGlzVXNlclByb2ZpbGUoZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3Byb2ZpbGUnLCBkYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJsb2cgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2VhcmNoX3Bvc3QoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgZW5uZWFncmFtX251bTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luX2xhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5fbG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZV9tZXRlcjpudW1iZXJcclxuICAgICl7XHJcbiAgICAgICAgY29uc3QgT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIgPSAxMTEwMDA7XHJcblxyXG4gICAgICAgIHZhciBtYXhfbGF0aXR1ZGVfZGVncmVlID0gb3JpZ2luX2xhdGl0dWRlICsgZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5fbGF0aXR1ZGVfZGVncmVlID0gb3JpZ2luX2xhdGl0dWRlIC0gZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIGlmKG1heF9sYXRpdHVkZV9kZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhfbGF0aXR1ZGVfZGVncmVlID0gOTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbl9sYXRpdHVkZV9kZWdyZWUgPD0gLTkwKXtcclxuICAgICAgICAgICAgbWluX2xhdGl0dWRlX2RlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heF9sb25naXR1ZGVfZGVncmVlID0gb3JpZ2luX2xvbmdpdHVkZSArIGRpc3RhbmNlX21ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbl9sYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIHZhciBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG9yaWdpbl9sb25naXR1ZGUgLSBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5fbGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICBpZihtYXhfbG9uZ2l0dWRlX2RlZ3JlZSAtIG1pbl9sb25naXR1ZGVfZGVncmVlID49IDM2MCl7XHJcbiAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gMTgwO1xyXG4gICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heF9sb25naXR1ZGVfZGVncmVlID49IDE4MCl7XHJcbiAgICAgICAgICAgICAgICBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSA9IG1heF9sb25naXR1ZGVfZGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbl9sb25naXR1ZGVfZGVncmVlIDw9IC0xODApe1xyXG4gICAgICAgICAgICAgICAgbWluX2xvbmdpdHVkZV9kZWdyZWUgPSBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1pbl9sb25naXR1ZGVfZGVncmVlID4gbWF4X2xvbmdpdHVkZV9kZWdyZWUpe1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IG1pbl9sb25naXR1ZGVfZGVncmVlO1xyXG4gICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG1heF9sb25naXR1ZGVfZGVncmVlO1xyXG4gICAgICAgICAgICBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xhdFwiLG1pbl9sYXRpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xhdFwiLG9yaWdpbl9sYXRpdHVkZSk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sYXRcIixtYXhfbGF0aXR1ZGVfZGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1pbl9sb25cIixtaW5fbG9uZ2l0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbG9uXCIsb3JpZ2luX2xvbmdpdHVkZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtYXhfbG9uXCIsbWF4X2xvbmdpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcIm51bWJlclwiLCBcIj09XCIsIGVubmVhZ3JhbV9udW0pXHJcbiAgICAgICAgLndoZXJlKFwidHlwZVwiLCBcIj09XCIsIHR5cGUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPD1cIiwgbWF4X2xvbmdpdHVkZV9kZWdyZWUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPj1cIiwgbWluX2xvbmdpdHVkZV9kZWdyZWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jLmRhdGEoKS5sYXRpdHVkZSA8PSBtYXhfbGF0aXR1ZGVfZGVncmVlICYmIGRvYy5kYXRhKCkubGF0aXR1ZGUgPj0gbWluX2xhdGl0dWRlX2RlZ3JlZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHNlYXJjaGVkIGRvYyA6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZWFyY2hfcXVlcmllcyhcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBlbm5lYWdyYW1fbnVtczpudW1iZXJbXSxcclxuICAgICAgICBvcmlnaW5fbGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbl9sb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlX21ldGVyOm51bWJlcixcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGVubmVhZ3JhbV9udW1zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaF9wb3N0KHR5cGUsZW5uZWFncmFtX251bXNbaV0sb3JpZ2luX2xhdGl0dWRlLG9yaWdpbl9sb25naXR1ZGUsZGlzdGFuY2VfbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfdXNlcl9wb3N0cyh1c2VyX2lkOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkgPSBbXTtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAud2hlcmUoXCJyb2xlcy5cIit1c2VyX2lkLCBcIj09XCIsIFwib3duZXJcIilcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRfcG9zdChwb3N0X2RhdGEpe1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC5hZGQocG9zdF9kYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRfY29tbWVudChwb3N0X2lkLCBjb21tZW50X2RhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdF9pZClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50X2RhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgY29tbWVudCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZV9jb21tZW50KHBvc3RfaWQsIGNvbW1lbnRfaWQsIGNvbW1lbnRfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIikuZG9jKGNvbW1lbnRfaWQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50X2RhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbW1lbnQgdXBkYXRlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZFBvc3QoKXtcclxuICAgICAgICBmb3IodmFyIGk9MCA7aTx0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZm9yKHZhciBwb3N0X2lkIGluIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRQb3N0SUQgPT09IHBvc3RfaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdGVzdCBxdWVyaWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIC8vIG5ldyB1c2VyXHJcbiAgICAvLyBzZXRfZGF0YSgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAuZG9jKHRoaXMuYXV0aHVzZXIudWlkKVxyXG4gICAgLy8gICAgIC5zZXQoe1xyXG4gICAgLy8gICAgICAgICBhdXRob3I6IHRoaXMuYXV0aHVzZXIudWlkLFxyXG4gICAgLy8gICAgICAgICBuYW1lOiBcIlNhbiBGcmFuY2lzY29cIixcclxuICAgIC8vICAgICAgICAgc3RhdGU6IFwiQ0FcIixcclxuICAgIC8vICAgICAgICAgY291bnRyeTogXCJVU0FcIixcclxuICAgIC8vICAgICAgICAgY2FwaXRhbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZV9kYXRhKCl7XHJcbiAgICAvLyAgICAgY29uc3QgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJTRlwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBwb3B1bGF0aW9uOiA4NjAwMDEsXHJcbiAgICAvLyAgICAgICAgIHVwZGF0ZVRpbWVzdGFtcDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLnNlcnZlclRpbWVzdGFtcCgpLFxyXG4gICAgLy8gICAgICAgICBsb2NhdGlvbjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuR2VvUG9pbnQoNC4zNCwgNS42NylcclxuICAgIC8vICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJTRiBwb3B1bGF0aW9uIHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gZ2V0X2RvY3VtZW50c19mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBjaXRpZXNDb2xsZWN0aW9uID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKTtcclxuXHJcbiAgICAvLyAgICAgY2l0aWVzQ29sbGVjdGlvbi5nZXQoKS50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgLy8gICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgIC8vICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGdldF9kYXRlX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcblxyXG4gICAgLy8gICAgIHNhbkZyYW5jaXNjb0RvY3VtZW50LmdldCgpLnRoZW4oZG9jID0+IHtcclxuICAgIC8vICAgICAgIGlmIChkb2MuZXhpc3RzKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGBEb2N1bWVudCBkYXRhOiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJObyBzdWNoIGRvY3VtZW50IVwiKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB3aGVyZV9xdWVyeSgpeyAgICAgICAgXHJcbiAgICAvLyAgICAgLy8gXCJHaW1tZSBhbGwgY2l0aWVzIGluIENhbGlmb3JuaWEgd2l0aCBhIHBvcHVsYXRpb24gYmVsb3cgNTUwMDAwXCJcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAvLyAgICAgLndoZXJlKFwic3RhdGVcIiwgXCI9PVwiLCBcIkNBXCIpLndoZXJlKFwicG9wdWxhdGlvblwiLCBcIjxcIiwgMjUwMDAwMClcclxuICAgIC8vICAgICAuZ2V0KClcclxuICAgIC8vICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgIC8vICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGBSZWxhdGl2ZWx5IHNtYWxsIENhbGlmb3JuaWFuIGNpdHk6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIC8vIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZGVsZXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlNGIHdhcyBlcmFzZWQgZnJvbSB0aGUgZmFjZSBvZiB0aGUgZWFydGghXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGFycmF5VW5pb24oKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIGdldFRoaXNVc2VyRGF0YSgpe1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAgICAgLndoZXJlKFwiYXV0aG9yXCIsIFwiPT1cIiwgdGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAvLyAgICAgICAgIC5nZXQoKVxyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwaWN0dXJlIHVwbG9hZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgLy8gMS4gd2hlbiB1c2VyIHNlbGVjdCBwaWN0dXJlLCB0aGUgcGljdHVyZSB1cGxvYWRlZCBpbnRvIHN0b3JhZ2UuXHJcbiAgICBwaWNrSW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XHJcblx0XHRcdG1vZGU6IFwic2luZ2xlXCJcclxuXHRcdH0pO1xyXG5cdFx0Y29udGV4dFxyXG5cdFx0LmF1dGhvcml6ZSgpXHJcblx0XHQudGhlbigoKSA9PiBjb250ZXh0LnByZXNlbnQoKSlcclxuXHRcdC50aGVuKChzZWxlY3Rpb24pID0+IHNlbGVjdGlvbi5mb3JFYWNoKFxyXG5cdFx0XHQoc2VsZWN0ZWRBc3NldDogSW1hZ2VBc3NldCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZ2V0SW1hZ2VGaWxlUGF0aChzZWxlY3RlZEFzc2V0LCBpbWFnZVR5cGUpLnRoZW4oKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaW1hZ2VUeXBlLGZpbGVQYXRoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0pXHJcblx0XHQpLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblx0Z2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0LCBpbWFnZVR5cGU6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHQvLyBpZiAoaW9zKSB7IC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGb2xkZXJQYXRoID0ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIoXCJuc2ltYWdlcGlja2VyXCIpLnBhdGg7XHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKHRlbXBGb2xkZXJQYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBvcHRpb25zID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zLm5ldygpO1xyXG5cclxuXHRcdFx0Ly8gXHRvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLnZlcnNpb24gPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNWZXJzaW9uLkN1cnJlbnQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5kZWxpdmVyeU1vZGUgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNEZWxpdmVyeU1vZGUuSGlnaFF1YWxpdHlGb3JtYXQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5uZXR3b3JrQWNjZXNzQWxsb3dlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gXHRQSEltYWdlTWFuYWdlci5kZWZhdWx0TWFuYWdlcigpLnJlcXVlc3RJbWFnZURhdGFGb3JBc3NldE9wdGlvbnNSZXN1bHRIYW5kbGVyKGltYWdlQXNzZXQuaW9zLCBvcHRpb25zLCAobnNEYXRhOiBOU0RhdGEsIGRhdGFVVEk6IHN0cmluZywgb3JpZW50YXRpb246IFVJSW1hZ2VPcmllbnRhdGlvbiwgaW5mbzogTlNEaWN0aW9uYXJ5PGFueSwgYW55PikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0aWYgKGluZm8udmFsdWVGb3JLZXkoUEhJbWFnZVJlc3VsdElzSW5DbG91ZEtleSkpIHtcclxuXHRcdFx0Ly8gXHRcdFx0Ly8gSW1hZ2UgaXMgaW4gaUNsb3VkXHJcblx0XHRcdC8vIFx0XHRcdGlmIChuc0RhdGEpIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgTk9UIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fVxyXG5cdFx0XHQvLyBcdFx0fVxyXG5cclxuXHRcdFx0Ly8gXHRcdG5zRGF0YS53cml0ZVRvRmlsZUF0b21pY2FsbHkodGVtcEZpbGVQYXRoLCB0cnVlKTtcclxuXHRcdFx0Ly8gXHRcdHRoaXMuY3VycmVudEltYWdlRmlsZVBhdGggPSB0ZW1wRmlsZVBhdGg7XHJcblx0XHRcdC8vIFx0XHRyZXNvbHZlKHRlbXBGaWxlUGF0aCk7XHJcblx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdC8vIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmRyb2lkKSB7IC8vIHJldHVybiBpbWFnZUFzc2V0LmFuZHJvaWQsIHNpbmNlIGl0J3MgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRyZXNvbHZlKGltYWdlQXNzZXQuYW5kcm9pZCk7XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgLy8gcmVzb2x2ZShudWxsKTtcclxuXHRcdH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGxvYWRGaWxlKGZpbGVUeXBlOnN0cmluZywgZmlsZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZmlsZUNsYXNzO1xyXG4gICAgICAgIHZhciBmaWxlUGF0aFNwbGl0ZWQgPSBmaWxlUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoU3BsaXRlZFtmaWxlUGF0aFNwbGl0ZWQubGVuZ3RoLTFdO1xyXG4gICAgICAgIGlmKGZpbGVUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2Jsb2cvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmlsZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvcHJvZmlsZS9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9iYWNrZ3JvdW5kL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgZmlsZUNsYXNzICsgZmlsZU5hbWUsXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICBsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgoZmlsZVBhdGgpLFxyXG4gICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeSh1cGxvYWRlZEZpbGUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsZVVSTChmaWxlVHlwZSwgdGhpcy5hdXRodXNlci51aWQsIHVwbG9hZGVkRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMi4gZ2V0IHRoZSBwaWN0dXJlIFVSTCBmb3IgdXBsb2FkaW5nIHRoZSBibG9nLlxyXG4gICAgZ2V0RmlsZVVSTChpbWFnZVR5cGUsIHVpZCwgZmlsZU5hbWUpe1xyXG4gICAgICAgIHZhciBmaWxlVVJMO1xyXG4gICAgICAgIGlmKGltYWdlVHlwZSA9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9ibG9nL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL3Byb2ZpbGUvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLmdldERvd25sb2FkVXJsKHtcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwsIGNhbiBhbHNvIGJlIHBhc3NlZCBkdXJpbmcgaW5pdCgpIGFzICdzdG9yYWdlQnVja2V0JyBwYXJhbSBzbyB3ZSBjYW4gY2FjaGUgaXRcclxuICAgICAgICAgICAgLy8gYnVja2V0OiAnZ3M6Ly9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20nLFxyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHVpZCArIGZpbGVVUkwsXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXJsID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoYXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHN5bmNUaGlzVXNlclJvb21MaXN0KCl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb20ocmVzdWx0LmtleSwgcmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi91c2Vycy9cIiArIHRoaXMuYXV0aHVzZXIudWlkICsgXCIvdXNlcl9yb29tc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tKHVwZGF0ZWRfcm9vbV9pZCwgcm9vbV9mcmllbmRfaWQ6YW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Jvb21zLycgKyB1cGRhdGVkX3Jvb21faWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBzb21lb25lIHB1c2ggbWVzc2FnZShpbmNsdWRlIHlvdSksIGZ1bmN0aW9uKHJlc3VsdCkgd2lsbCBiZSBhY3RpdmF0ZWQuXHJcbiAgICAvLyBJdCBjaGFuZ2UgdGhlIG1lc3NhZ2VzIGFycmF5LlxyXG4gICAgc3luY1Jvb21NZXNzYWdlcyhyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21NZXNzYWdlcyhyb29tX2lkLCByZXN1bHQua2V5ICxyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21faWQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21faWQ6c3RyaW5nLCBtZXNzYWdlX2lkOmFueSwgbWVzc2FnZTphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyb29tX2lkXVsnbWVzc2FnZXMnXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddW21lc3NhZ2VfaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VfdG9fYWRkID0ge307XHJcbiAgICAgICAgbWVzc2FnZV90b19hZGRbbWVzc2FnZV9pZF0gPSB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddW21lc3NhZ2VfaWRdXHJcbiAgICAgICAgaWYocm9vbV9pZCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkucHVzaChtZXNzYWdlX3RvX2FkZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9hO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9iO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYiA9IGJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZV9iID0gbWVzc2FnZV9iWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICB2YXIgdGltZV9hID0gbWVzc2FnZV9hWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZV9hIC0gdGltZV9iO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21faWQrXCIvcm9vbV91c2Vycy9cIit1aWQsIHVzZXJbdWlkXSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCByb29tX2lkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXRTZWxlY3RlZEZyaWVuZElEKHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3RlZEZyaWVuZElEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAxLiBnZW5lcmF0ZSByb29tIGlkXHJcbiAgICBnZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHVzZXI6YW55LCBmcmllbmQ6YW55KXtcclxuICAgICAgICB2YXIgZnJpZW5kX2lkO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgZnJpZW5kX2lkID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1c2VyX2lkO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHVzZXJfaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgcm9vbSBleGlzdCBiZWZvcmUgZ2VuZXJhdGUuXHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIG5vdCBleGlzdCwgY3JlYXRlIG5ldyByb29tLlxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnZhbHVlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gcm9vbSB3aXRoIGZyaWVuZF9pZDogXCIgKyBmcmllbmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVuX3Jvb20gPSB7cm9vbV91c2Vyczp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbl9yb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbl9yb29tWydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycsIG9wZW5fcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCBmcmllbmQsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcihmcmllbmQsIHVzZXIsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0Mi5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBleGlzdCwgZG9uJ3QgbWFrZSBuZXcgb25lLlxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm9vbV9pZCBpbiByZXN1bHRbJ3ZhbHVlJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5yb29tc1tyb29tX2lkXVsnbWVzc2FnZXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3Qgcm9vbTogXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpKTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXJfaWQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZF9pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIC8vIDIuIHNldCBhdXRoZW50aWNhdGlvbiBmb3Igcm9vbXMgb24gdXNlciBkYXRhYmFzZVxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyX3Jvb20gPSB7fTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJfcm9vbVsnbGVhdmVUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgIGZvcih2YXIgZnJpZW5kX2lkIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlcl9yb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZF9pZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRfaWRdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyX3Jvb21bJ21lc3NhZ2VJY29uJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsndXNlck5hbWUnXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHJvb20gYWNjZXNzIGF0aGVudGljYXRpb24gb24gdXNlciBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCBmcmllbmRfaWQpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGNhbiB3cml0ZSBvbiBjaGF0IHJvb21cclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbV9pZCsnL3Jvb21fdXNlcnMvJyt1aWQsIHVzZXJfcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jUm9vbU1lc3NhZ2VzKHJvb21faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN5bmNSb29tKHJvb21faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIG1lc3NhZ2VzIDpcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQ6c3RyaW5nLCB1c2VyOmFueSwgbWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBtZXNzYWdlX3BhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZV9wYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VfcGFja1snbWVzc2FnZSddID0gbWVzc2FnZTtcclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tX2lkKycvbWVzc2FnZXMnLCBtZXNzYWdlX3BhY2spLnRoZW4ocmVzdWx0ID0+IHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gTWVzc2FnZV9wYWNrIElEXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZpcmViYXNlIFJlYWx0aW1lIGRhdGFiYXNlIHRlc3QgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBtYWtlIGFycmF5IHR5cGUgZGF0YWJhc2UgYW5kIHB1c2ggZGF0YSBpbiBhcnJheSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyBwdXNoSW5BcnJheURhdGFiYXNlKGRhdGFiYXNlT2ZBcnJheVBhdGg6c3RyaW5nLCBwdXNoRGF0YTphbnkpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlT2ZBcnJheVBhdGgsIHB1c2hEYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvLyBtYWtlIGRhdGEgc3RydWN0dXJlIG9mIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIG1ha2VTdHJ1Y3R1cmVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgc3RydWN0dXJlOiBhbnkpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHN0cnVjdHVyZSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gLy8gYWRkIGF0dHJpYnV0ZSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlIGFuZCB1cGRhdGUgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyB3cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHVwZGF0ZURhdGE6IGFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHVwZGF0ZURhdGEpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyAvLyByZWFkIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgLy8gcmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAvLyAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIC8vIC8vIGNvbXBsZXggcXVlcnlcclxuICAgIC8vIHF1ZXJ5T25EYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nKXtcclxuICAgIC8vICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAvLyAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXHJcbiAgICAvLyAgICAgICAgICAgICAvLyAnL3VzZXJzJyxcclxuICAgIC8vICAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLFxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gYnV0IG9ubHkgY29tcGFuaWVzICdzaW5jZScgYSBjZXJ0YWluIHllYXIgKFRlbGVyaWsncyB2YWx1ZSBpcyAyMDAwLCB3aGljaCBpcyBpbWFnaW5hcnkgYnR3KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHVzZSBlaXRoZXIgYSAncmFuZ2UnXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9yYW5nZToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAyMDAwXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8vfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAuLiBvciAnY2hhaW4nIHJhbmdlcyBsaWtlIHRoaXM6XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHJhbmdlczogW1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLlNUQVJUX0FULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAxOTk5XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVORF9BVCxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMjAwMFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIF0sXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIG9ubHkgdGhlIGZpcnN0IDIgbWF0Y2hlc1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIChub3RlIHRoYXQgdGhlcmUncyBvbmx5IDEgaW4gdGhpcyBjYXNlIGFueXdheSlcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIFxyXG4gICAgLy8gLy8gcXVlcnkgcmVzdWx0XHJcbiAgICAvLyBvblF1ZXJ5RXZlbnQocmVzdWx0KSB7XHJcbiAgICAvLyAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAvLyAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgIC8vICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIC8vIHF1ZXJ5VGVzdCgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgLy8gICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xyXG5cclxuICAgIC8vICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgJy91c2VycycsXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgLy8gICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFsdWU6ICdheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ1xyXG4gICAgLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIClcclxuICAgIC8vICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LnZhbHVlWydheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ10pKVxyXG4gICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyByZWFkVXNlck5hbWUoKXtcclxuICAgIC8vICAgICB2YXIgdXNlcklkID0gZmlyZWJhc2VXZWIuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgIC8vICAgICByZXR1cm4gZmlyZWJhc2VXZWIuZGF0YWJhc2UoKS5yZWYoJy91c2Vycy8nICsgdXNlcklkKS5vbmNlKCd2YWx1ZScpLnRoZW4oZnVuY3Rpb24oc25hcHNob3QpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHVzZXJuYW1lID0gKHNuYXBzaG90LnZhbCgpICYmIHNuYXBzaG90LnZhbCgpLnVzZXJuYW1lKSB8fCAnQW5vbnltb3VzJztcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BdXRoIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICByZWdpc3RlcihlbWFpbCwgcGFzc3dkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd2RcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgLy8gZ2V0IGN1cnJlbmRVc2VyXHJcbiAgICBsb2dpbih1c2VyKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q3VycmVudFVzZXIoKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIodXNlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW5pdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRBdXRoVXNlcih1c2VyOmZpcmViYXNlLlVzZXIpe1xyXG4gICAgICAgIHRoaXMuYXV0aHVzZXIgPSB1c2VyO1xyXG4gICAgICAgIC8vIHNldCB0aGlzVXNlclxyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRUaGlzVXNlcihyZXN1bHQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgZnJpZW5kc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgJy9mcmllbmRzJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRzKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCByb29tc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgJy91c2VyX3Jvb21zJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIHNldFRoaXNVc2VyKHJlc3VsdDphbnkpe1xyXG4gICAgICAgIHZhciBrZXkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5rZXkpKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IHVzZXI7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZF9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRfaWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRfaWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRfaWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RnJpZW5kcyhmcmllbmRfaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZnJpZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJpZW5kWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ10gPSB0aGlzLmdldEZyaWVuZHMoKVsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaEZyaWVuZE9uUm9vbSh0aGlzLnRoaXNVc2VyLFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoTWVzc2FnZU9uUm9vbShcIi1MUExWTlZGMnlNMU16eUctRDcxXCIsIHRoaXMudGhpc1VzZXIsIFwiaGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVQb3N0KHRoaXMudGhpc1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJvb21faWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbV9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21faWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jVGhpc1VzZXJSb29tTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcbiAgICAgICAgdGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRfY29tbWVudCgnajNYZVZJcm9BSndMcVNENXJlNkMnLHtoZWxsbzonaGVsbG8nfSk7XHJcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnRlc3RfZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5hZGRfcG9zdCh0aGlzLnRlc3RfZGF0YVtpXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc2VhcmNoX3Bvc3QoXCJjaGF0XCIsMywzNy4zMjM5NzIsIDEyNy4xMjUxMDkgLDEwMDAwMCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hfcXVlcmllcyhcImNoYXRcIixbMSwyLDMsNCw1LDYsNyw4LDldLDM3LjMyMzk3MiwgMTI3LjEyNTEwOSAsMTAwMDAwKTtcclxuICAgICAgICAvLyB0aGlzLmdldEZpbGVVUkwoJ2FzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDInLCdndGV0b24tc2Nod2FiYWNoZXJzLWxhbmRpbmdfZG9sbGFyXzY4MC5qcGcnKTtcclxuICAgICAgICAvLyB0aGlzLmdldF91c2VyX3Bvc3RzKFwiSTMzQ0FLc3U1dVVrcTRYcXQyeFVWSmdjR0hNMlwiKTtcclxuXHR9XHJcblxyXG4gICAgcHVibGljIGpzb25Ub0FycmF5KGpzb24pe1xyXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgIGlmKGpzb24hPW51bGwpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==