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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFHL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFrQ0kseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFqQ3ZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLDZCQUF3QixHQUFFLEVBQUUsQ0FBQztRQUM3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQVdYLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQVl0QywwQkFBcUIsR0FBZSxFQUFFLENBQUM7UUFLMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUNkLFFBQVEsRUFBRyxFQUFFO2dCQUNiLE9BQU8sRUFBRyxFQUFFO2dCQUNaLE1BQU0sRUFBRyxDQUFDO2dCQUNWLEtBQUssRUFBRyxNQUFNO2dCQUNkLE9BQU8sRUFBRyxFQUFFO2dCQUNaLFNBQVMsRUFBRyxFQUFFO2dCQUNkLFdBQVcsRUFBRyxFQUFFO2dCQUNoQixLQUFLLEVBQUcsRUFBRTtnQkFDVixNQUFNLEVBQUcsSUFBSTtnQkFDYixLQUFLLEVBQUcsRUFBRTtnQkFDVixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixJQUFJLEVBQUcsRUFBRTtnQkFDVCxRQUFRLEVBQUc7b0JBQ1QsSUFBSSxFQUFHLEVB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QUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLGtDQUFRLEdBQWY7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUk7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQTVwQ1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQW9DcUIseUJBQWdCO09BbkNyQyxlQUFlLENBNnBDM0I7SUFBRCxzQkFBQztDQUFBLEFBN3BDRCxJQTZwQ0M7QUE3cENZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbmltcG9ydCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB0aGlzVXNlclByb2ZpbGVQaWNzcmMgPSBcIlwiO1xyXG4gICAgcHVibGljIHRoaXNVc2VyQmFja2dyb3VuZFBpY3NyYyA9XCJcIjtcclxuICAgIHB1YmxpYyB0aGlzVXNlck5hbWUgPSBcIlwiOyAgICBcclxuICAgIHB1YmxpYyB0aGlzVVNlckVtYWlsID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHVibGljIHJvb21zID0ge307XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyBtZXNzYWdlVXBkYXRlZFRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdF9kYXRhOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBwb3N0U2VhcmNoUmVzdWx0QXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBvc3RJRDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnRlc3RfZGF0YSA9IFt7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiBcIlwiLFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzI1MjQwNjA0ODAwOTQ2LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjA5ODU4NzMwNDM1NCxcclxuICAgICAgICAgICAgbmFtZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNSxcclxuICAgICAgICAgICAgICBkYXkgOiA0LFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogMjAsXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDUwLFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDQsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDA0NjgyNDQ0MDAsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCI1RmdyZXdKYTJNaDlDNTk4azcwSFE0MGIxcXUxXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDIsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTWFydmVsIGF0IG1vcmUgdGhhbiAyLDAwMCBuYXR1cmFsIHJvY2sgYXJjaGVzIGF0IHRoaXMgcGFyayBqdXN0IG91dHNpZGUgb2YgTW9hYi4gU29tZSBvZiB0aGUgZm9ybWF0aW9ucyBjYW4gYmUgc3BvdHRlZCBmcm9tIHRoZSByb2FkLCBidXQgdGhlIGJlc3QgcmVxdWlyZSBhIHNjZW5pYyBoaWtlLiBEb27igJl0IG1pc3MgdGhlIGZhbW91cyBEZWxpY2F0ZSBBcmNoICgzIG1pbGVzIHJvdW5kLXRyaXApIG9yIHRoZSA3LW1pbGUgKHJvdW5kLXRyaXApIERldmlscyBHYXJkZW4gTG9vcC5cXG5cXG5UaGUgUGFyayBBdmVudWUgVHJhaWwgaXMgdGhlIG1vc3QgcG9wdWxhciBoaWtlIGluIHRoZSBwYXJrIGJlY2F1c2Ugb2YgaXRzIGVhc2UgYW5kIHNjZW5lcnkgYXQganVzdCAyIG1pbGVzIHJvdW5kIHRyaXAuIE9yIHRyeSB0aGUgbW9yZSBjaGFsbGVuZ2luZyBoaWtlIHRvIERlbGljYXRlIEFyY2hlcyBhdCAzLjIgbWlsZXMgcm91bmQgdHJpcC5cXG5cXG5XaGV0aGVyIHlvdSBhcmUgY2FtcGluZyBvciBzdGF5aW5nIGluIGEgaG90ZWwsIGRvbuKAmXQgZm9yZ2V0IHRvIHNwZW5kIHNvbWUgdGltZSBsb29raW5nIHVwIGF0IHRoZSBza3kgYWZ0ZXIgbmlnaHQgZmFsbHMuIFlvdeKAmWxsIGZpbmQgc29tZSBvZiB0aGUgZGFya2VzdCBza2llcyBpbiBhbmQgYXJvdW5kIFV0YWjigJlzIG5hdGlvbmFsIHBhcmtzLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjIlMkZhcmNoZXMtZGVsaWNhdGUtYXJjaC1za3lfYWRvYmVfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49NmNiNDhhYjUtOTZmNS00M2IyLTllYTEtNjc0OWNkYmVkMzhmXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMjQ1LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIzMDgwNDY5MjUyMjU0LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjI1NTc5ODI4MDIzOCxcclxuICAgICAgICAgICAgbmFtZSA6IFwiQXJjaGVzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzNCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ5LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxMjg5OTE4LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA4LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk5pY2tuYW1lZCB0aGUgXFxcIkNyb3duIG9mIHRoZSBDb250aW5lbnQsXFxcIiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgc2l0cyBpbiB0aGUgbm9ydGh3ZXN0IGNvcm5lciBvZiBNb250YW5hLiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgaXMganVzdCBhIHNjZW5pYyBkYXnigJlzIGRyaXZlIG5vcnRoIGZyb20gWWVsbG93c3RvbmUuXFxuXFxuSGl0IHRoZSB0cmFpbCB0byBleHBsb3JlIHBsYWNlcyBsaWtlIEZpc2hlcmNhcCBMYWtlIChwaWN0dXJlZCksIHdoaWNoIGlzIGEgZ3JlYXQgcGxhY2UgdG8gc3BvdCBhIG1vb3NlLiBGcm9tIE1hbnkgR2xhY2llciBDYW1wZ3JvdW5kLCBnbyB0byB0aGUgU3dpZnRjdXJyZW50IE1vdG9yIElubiBwYXJraW5nIGxvdC4gVGhlIHRyYWlsaGVhZCBpcyBvbiB0aGUgd2VzdCBlbmQuIFlvdSdsbCBmaW5kIHRoZSBsYWtlIGxlc3MgdGhhbiBhIG1pbGUgZG93biB0aGUgdHJhaWwuIENvbnRpbnVlIDEuNSBtaWxlcyB0byBSZWRyb2NrIExha2UgYW5kIHRha2UgYSBzcHVyIHRvIFJlZHJvY2sgRmFsbHMuXFxuXFxuQSBOYXRpb25hbCBIaXN0b3JpYyBMYW5kbWFyaywgR29pbmctdG8tdGhlLVN1biBSb2FkIGlzIG9uZSBvZiB0aGUgbW9zdCBzY2VuaWMgcm9hZHMgaW4gTm9ydGggQW1lcmljYSwgbm90IHRvIG1lbnRpb24gb25lIG9mIHRoZSBtb3N0IGNvbXBsZXggdG8gYnVpbGQuIFRoZSBmaW5hbCBzZWN0aW9uLCBvdmVyIExvZ2FuIFBhc3MsIHdhcyBjb21wbGV0ZWQgaW4gMTkzMiBhZnRlciAxMSB5ZWFycyBvZiB3b3JrLiBDb25zaWRlcmVkIGFuIGVuZ2luZWVyaW5nIGZlYXQsIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIHJvYWQgZm9yZXZlciBjaGFuZ2VkIHRoZSB3YXkgdmlzaXRvcnMgd291bGQgZXhwZXJpZW5jZSBHbGFjaWVyIE5hdGlvbmFsIFBhcmsuIEZ1dHVyZSB2aXNpdG9ycyB3b3VsZCBiZSBhYmxlIHRvIGRyaXZlIG92ZXIgc2VjdGlvbnMgb2YgdGhlIHBhcmsgdGhhdCBwcmV2aW91c2x5IGhhZCB0YWtlbiBkYXlzIG9mIGhvcnNlYmFjayByaWRpbmcgdG8gc2VlLlxcblxcbkluIHRoZWlyIGFiaWxpdHkgdG8gd293IHZpc2l0b3JzLCBZZWxsb3dzdG9uZSBhbmQgR2xhY2llciBzaGFyZSBhIGNvbW1vbiBib25kLiBCdXQgYXMgd2l0aCBhbnkgZ3JlYXQgZGVzdGluYXRpb24sIHRoZXJlIGFyZSBzb21lIGFkdmVudHVyZXMgdGhhdCBhcmUgZm91bmQgbm93aGVyZSBlbHNlLiBHbGFjaWVyIHByZXNlcnZlcyBvdmVyIDEsMDAwLDAwMCBhY3JlcyBvZiBmb3Jlc3RzLCBhbHBpbmUgbWVhZG93cyBhbmQgbGFrZXMuIEl0cyBkaXZlcnNlIGhhYml0YXRzIGFyZSBob21lIHRvIG92ZXIgNzAgc3BlY2llcyBvZiBtYW1tYWxzIGFuZCBvdmVyIDI2MCBzcGVjaWVzIG9mIGJpcmRzLiBUaGUgc3BlY3RhY3VsYXIgZ2xhY2lhdGVkIGxhbmRzY2FwZSBpcyBhIGhpa2Vy4oCZcyBwYXJhZGlzZSwgY29udGFpbmluZyA3MDAgbWlsZXMgb2YgbWFpbnRhaW5lZCB0cmFpbHMgdGhhdCBsZWFkIGRlZXAgaW50byBvbmUgb2YgdGhlIGxhcmdlc3QgaW50YWN0IGVjb3N5c3RlbXMgaW4gdGhlIGxvd2VyIDQ4IHN0YXRlcy5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMiUyRmdsYWNpZXItYXZhbGFjaGUtbGFrZS1raWRzX2Fkb2JlXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTUwODcwYzVlLWIxZTYtNGQ1MS1iZTlhLWQ5Y2QyZDYyNzI0MlwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDE1MixcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTYwMjMwNTY2NDIzLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjgwNjAxOTkzMjAzMyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiR2xhY2llciBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzksXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiAzLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNTQzNzk0LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiSGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA2LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiSnVzdCAxNSBtaWxlcyBzb3V0aCBvZiBNb2FiLCBoaWtlIHlvdXIgd2F5IHRocm91Z2ggMzM3LCA1OTggYWNyZXMgb2YgZHJhbWF0aWMgcmVkLXJvY2sgbGFuZHNjYXBlIGluIENhbnlvbmxhbmRzIE5QLCBhbmQgZG8gaXQgYWxsIHdpdGhvdXQgaGF2aW5nIHRvIGNvbXBldGUgZm9yIHJvb20gb24gdGhlIHRyYWlsIC0gQ2FueW9ubGFuZHMgaXMgYm90aCBVdGFo4oCZcyBsYXJnZXN0IGFuZCBsZWFzdCB2aXNpdGVkIHBhcmsuXFxuXFxuVGhlIHJpdmVyLWNhcnZlZCBwYXJrIGJvYXN0cyAzNjAtZGVncmVlIHZpZXdzIG9mIHJ1c3QtY29sb3JlZCBhcmNoZXMsIGJ1dHRlcywgYW5kIGNsaWZmcyAtIGJ1dCBiZWNhdXNlIG9mIHRoZSBoaWdoLWRlc2VydCByb2NrIGVudmlyb25tZW50LCBpdHMgY2xpbWF0ZSBpcyBzdWJqZWN0IHRvIGV4dHJlbWUgdGVtcGVyYXR1cmUgZmx1Y3R1YXRpb25zLiBTa2lwIHBhY2tpbmcgdGhlIHBhcmthLCBhbmQgZ28gaW4gdGhlIHNwcmluZyBvciBmYWxsIGZvciB0aGUgbW9zdCBtb2RlcmF0ZSwgYW5kIG1vc3QgZm9yZ2l2aW5nLCB3ZWF0aGVyLlxcblxcblNvIGV4cGFuc2l2ZSBpdOKAmXMgZGl2aWRlZCBpbnRvIGZvdXIgZGlzdHJpY3RzLCBDYW55b25sYW5kcyBkZWxpdmVycyBhIHF1aW50ZXNzZW50aWFsIGRlc2VydCBleHBlcmllbmNlOiBkZWVwIGNhbnlvbnMsIHByZWhpc3RvcmljIHJvY2sgYXJ0LCByaXZlcnMsIGFuZCBzd2VlcGluZyBvdmVybG9va3MuXFxuXFxuQW1vbmcgdGhlIGV4Y2VwdGlvbmFsLCBzdHJpYXRlZCByb2NrIGZvcm1hdGlvbnMsIHRoZXJlIGFyZSBsYW5kbWFya3MgeW91IHNob3VsZG7igJl0IG1pc3MsIGxpa2UgdGhlIHVudXN1YWwgMTUwMC1mb290IFVwaGVhdmFsIERvbWUgLSB0aG91Z2h0IHRvIGJlIGEgbWV0ZW9yaXRlIGNyYXRlciAtIG9yIHRoZSBEcnVpZCBBcmNoLCBvZnRlbiByZWZlcnJlZCB0byBhcyBVdGFo4oCZcyBvd24gU3RvbmVoZW5nZS4gS2VlcCB3YXRjaCBmb3IgdGhlIHdpbGRsaWZlLCB0b28uIEJpZ2hvcm4gc2hlZXAgdGFrZSByZXNpZGVuY2UgaW4gdGhlIGNhbnlvbnMgYW5kIGJ1dHRlcywgYWxvbmcgd2l0aCBtdWxlIGRlZXIsIGthbmdhcm9vIHJhdHMsIGFuZCBjb3lvdGUuIExvb2sgdXAgZm9yIHJlZC0gdGFpbGVkIGhhd2tzLCBhbmQgYXQgbmlnaHQsIGZvciBvbmUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gdGhlIExvd2VyIDQ4LiBPbiBhIG1vb25sZXNzIG5pZ2h0LCBnZXQgbW9yZSB0aGFuIHlvdXIgZmlsbCBvZiBzdGFycyAtIG9yIGdldCBvdXQgdGhlIGJpbm9jdWxhcnMgdG8gdHJ5IGZvciB0aGUgcmluZ3Mgb2YgU2F0dXJuLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRkkzM0NBS3N1NXVVa3E0WHF0MnhVVkpnY0dITTIlMkZjYW55b25sYW5kcy1tZXNhLWFyY2gtc3VucmlzZV9kb2xsYXJfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49OTE3NWY2OWQtYTViMi00ODI4LThiOTgtZDA1ZDFkMWUwZjYxXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMzg1LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIxMjgzOTUyNzc0NjgsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyNjE0NTEwMjA4MzY3LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJDYW55b25sYW5kcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzksXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiAyNyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTU2Nzg4OSxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkkzM0NBS3N1NXVVa3E0WHF0MnhVVkpnY0dITTJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogNSxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImJhZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRpdmlkZWQgYnkgYSAyNzctbWlsZSBsb25nIGNhbnlvbiwgYW5kIHRoZSBtaWxlLWRlZXAgQ29sb3JhZG8gUml2ZXIsIHRoZSB0d28gaGFsdmVzIG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCB0aGUgTm9ydGggYW5kIFNvdXRoIFJpbSwgb2ZmZXIgdHdvIHBhcmtzIGluIG9uZSwgd2l0aCBkaXZlcnNlIGxhbmRzY2FwZSBhbmQgZWNvbG9neSBvbiBlaXRoZXIuXFxuXFxuR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmssIGFuZCB0aGUgZ3JlYXRlciBHcmFuZCBDYW55b24gcmVnaW9uLCBpcyBhIGhpa2VyJ3MgZHJlYW0uIE1vc3Qgb2YgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgaXMgdW5kZXZlbG9wZWQgYmFja2NvdW50cnkuIFRoZXJlIGFyZSBsaXRlcmFsbHkgaHVuZHJlZHMgb2YgbWlsZXMgdG8gaGlrZSwgYmFja3BhY2sgYW5kIGV4cGxvcmUuIERlc3BpdGUgdGhlIEdyYW5kIENhbnlvbidzIHBvcHVsYXJpdHkgYW5kIG51bWJlcnMgb2YgdmlzaXRvcnMgZWFjaCB5ZWFyLCB2aXNpdG9ycyBvbmx5IG5lZWQgdG8gaGlrZSBhIHNtYWxsIGRpc3RhbmNlIHRvIGVuam95IHNvbWUgc29saXR1ZGUuXFxuXFxuRXhwbG9yZSB0aGUgZGVwdGhzIG9mIHRoZSBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyayBvbiBwb3B1bGFyIHRyYWlscyBsaWtlIHRoZSBCcmlnaHQgQW5nZWwgYW5kIFNvdXRoIEthaWJhYiB0cmFpbCBvbiBhIG11bGUuIEEgR3JhbmQgQ2FueW9uIG11bGUgcmlkZSBpcyBhbiBhZHZlbnR1cmUgYW5kIGVhc3kgb24geW91ciBsZWdzLlxcblxcbk9uZSBvZiB0aGUgbW9zdCBleGNpdGluZyB3YXlzIHRvIGV4cGVyaWVuY2UgdGhlIEdyYW5kIENhbnlvbiBpcyB0byBmbG9hdCB0aHJvdWdoIGl0IGJ5IHdheSBvZiByYWZ0IG9uIHRoZSBDb2xvcmFkbyBSaXZlci4gTW9zdCBwZW9wbGUgYm9vayB0aGVpciB0cmlwIHdpdGggYSBjb21tZXJjaWFsIG91dGZpdHRlciBhbmQgeW91IGNhbiBldmVuIGNvbWJpbmUgdGhlIHJhZnRpbmcgdHJpcCB3aXRoIGEgaGVsaWNvcHRlciByaWRlLiBFeHBlcmllbmNlZCB3aGl0ZXdhdGVyIHJhZnRlcj8gRW50ZXIgdGhlIGxvdHRlcnkgdG8gZG8geW91ciBvd24gdHJpcC5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZOZllFMmRGMndsZlNCV3dXdkVrMEtzaVRzMXQxJTJGZ2MteWF2YXBhaS1wb2ludC1zdW5zZXRfZHBfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49NTE4MGUyZjQtOTlhNi00ZTFlLWI3NDQtZmFlYmFmOTIwNGU5XCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogNTE0LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIxMjgzOTUyNzc0NjgsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyNjE0NTEwMjA4MzY3LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDksXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE1ODk2NzQsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJOZllFMmRGMndsZlNCV3dXdkVrMEtzaVRzMXQxXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDEsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJNYXhpbWl6ZSB5b3VyIGV4cGVyaWVuY2UgYXQgQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmsgYnkgZHJpdmluZyB0byBTdW5yaXNlLCBTdW5zZXQsIEluc3BpcmF0aW9uIGFuZCBCcnljZSB2aWV3cG9pbnRzLiBUaGVzZSBhcmUgYWxsIHNwZWN0YWN1bGFyIG92ZXJsb29rcyBvZiB0aGUgcGFya+KAmXMgcmVkIGhvb2Rvb3Mgc2hvb3RpbmcgdXAgYWdhaW5zdCBldmVyZ3JlZW4gZm9yZXN0cyBpbiB0aGUgYmFja2dyb3VuZC4gRGVwZW5kaW5nIG9uIHRoZSB0aW1lIG9mIGRheSwgYW5kIHRoZSBhbmdsZSBhbmQgbGlnaHQgb2YgdGhlIHN1biwgdGhlIGhvb2Rvb3MgYW5kIG15c3RlcmlvdXMgcm9jayBmb3JtYXRpb25zIG9mdGVuIHRha2Ugb24gdW51c3VhbCBwYXR0ZXJucyBhbmQgc2hhcGVzLCBhbmQgc29tZSB0aGluaywgaW1hZ2luYXJ5IGZhY2VzLlxcblxcbkZvciBtb3JlIGluc3BpcmF0aW9uLCBsYWNlIHVwIHlvdXIgaGlraW5nIGJvb3RzIG9yIG90aGVyIHN0dXJkeSBzaG9lcyBhbmQgZXhwbG9yZSBhIHRyYWlsLiBUaGVyZSBpcyBzb21ldGhpbmcgZm9yIGV2ZXJ5b25lIGF0IEJyeWNlIENhbnlvbi4gT3VyIGZhdm9yaXRlIGVhc3kgaGlrZXMgaW5jbHVkZSBCcmlzdGxlY29uZSBMb29wIFRyYWlsIGFuZCBRdWVlbnMgR2FyZGVuIFRyYWlsLiBIYXQgU2hvcCBpcyBvdXIgZmF2b3JpdGUgbW9kZXJhdGUgaGlrZS4gRm9yIG1vcmUgcGh5c2ljYWxseSBmaXQgaGlrZXJzIGxvb2tpbmcgZm9yIGEgc3RyZW51b3VzIGFkdmVudHVyZSwgZG8gdGhlIDUuNS1taWxlIHZlcnRpY2FsbHkgY2hhbGxlbmdpbmcgUGVlay1BLUJvbyBMb29wIG9yIHRoZSA3LjkgRmFpcnlsYW5kIExvb3AgcmF0ZWQg4oCcZGlmZmljdWx04oCdIGJ5IHRoZSBwYXJrIHNlcnZpY2UuIFwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRlJ6MjB5QzdMRVNPQ0RVb2E0c3A2OXY1Y29wVDIlMkZicnljZS1hbXBoaXRoZWF0ZXItaW5zcGlyYXRpb24tcG9pbnRfZHBfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49MDZkMTU0YjctODBkOC00NmM5LTlmZGYtZTNlNzBlYzQzOTUxXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMjQ1LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIwODYzMjEyOTY3MzIsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyNDM1ODc1MDg3OTc2LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJCcnljZSBDYW55b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDQwLFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMjEsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE2MjEzODEsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJSejIweUM3TEVTT0NEVW9hNHNwNjl2NWNvcFQyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHByZXNlcnZlcyBhIHNwZWN0YWN1bGFyIGxhbmRzY2FwZSByaWNoIHdpdGggbWFqZXN0aWMgbW91bnRhaW5zLCBwcmlzdGluZSBsYWtlcywgYW5kIGV4dHJhb3JkaW5hcnkgd2lsZGxpZmUuIFRoZSBhYnJ1cHQgdmVydGljYWwgcmlzZSBvZiB0aGUgamFnZ2VkIFRldG9uIE1vdW50YWlucyBjb250cmFzdHMgd2l0aCB0aGUgaG9yaXpvbnRhbCBzYWdlLWNvdmVyZWQgdmFsbGV5IGFuZCBnbGFjaWFsIGxha2VzIGF0IGl0cyBiYXNlLlxcblxcbkl0IHRvb2sgbW9yZSB0aGFuIDMwIHllYXJzIGZvciBHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHRvIHRyYW5zZm9ybSBmcm9tIGFuIGlkZWEgdG8gb25lIG9mIHRoZSBjb3VudHJ5J3MgbW9zdCBzdHVubmluZyBwYXJrcy4gV2hlbiBDb25ncmVzcyBjcmVhdGVkIHRoZSBwYXJrIGluIDE5MjksIGl0IG9ubHkgaW5jbHVkZWQgdGhlIFRldG9uIFJhbmdlIGFuZCBzaXggZ2xhY2lhbCBsYWtlcy4gSm9obiBELiBSb2NrZWZlbGxlciwgSnIuLCBwbGF5ZWQgYSBrZXkgcm9sZSBpbiBhY3F1aXJpbmcgYW4gYWRkaXRpb25hbCAzNSwwMDAgYWNyZXMgZm9yIHRoZSBwYXJrIHVuZGVyIHRoZSBuYW1lIFxcXCJTbmFrZSBSaXZlciBMYW5kIENvLlxcXCIgQW1pZCBjb250cm92ZXJzeSB0aGUgXFxcIm5ld1xcXCIgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB3YXMgZXN0YWJsaXNoZWQgU2VwdC4gMTQsIDE5NTAsIGJ5IFByZXNpZGVudCBIYXJyeSBUcnVtYW4uXFxuXFxuR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBhbmQgaXRzIHdvcmxkLWNsYXNzIHNjZW5lcnkgYXR0cmFjdHMgbmVhcmx5IDQgbWlsbGlvbiB2aXNpdG9ycyBwZXIgeWVhci4gV2l0aCBKZW5ueSBMYWtlIGFuZCBKYWNrc29uIExha2UgYXQgNiwzMjAgZmVldCBhbmQgdGhlIHN1bW1pdCBvZiB0aGUgR3JhbmQgVGV0b24gYXQgMTMsNzcwIGZlZXQsIHRoZSBwYXJrJ3MgZWxldmF0aW9uIHJhbmdlcyBjcmVhdGUgb25lIG9mIHRoZSBuYXRpb24ncyBtb3N0IGF3ZS1pbnNwaXJpbmcgbGFuZHNjYXBlcy4gSW4gYWRkaXRpb24gdG8gZ2F6aW5nIGF0IHRoZSBpbmNyZWRpYmxlIHZpZXdzLCB0aGVyZSBpcyBtdWNoIHRvIGRvIGluIHRoaXMgcGFyayBmcm9tIGhpa2luZyBhbmQgcm9jayBjbGltYmluZyB0byBib2F0aW5nIGFuZCBmaXNoaW5nLiBBbmQgd2hlbiB5b3UgbmVlZCBhIGJyZWFrIGZyb20gb3V0ZG9vciBhZHZlbnR1cmUsIHRoZXJlIGFyZSBmZXcgYmV0dGVyIHBsYWNlcyB0byBzaW1wbHkgcmVsYXggYW5kIHdhdGNoIHRoZSBwYXJrJ3MgaW5jcmVkaWJsZSB3aWxkbGlmZS5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZhc3FVMjFRemx0WU9nblQ1TURjZ1dvdFJKd0gyJTJGZ3RldG9uLXNjaHdhYmFjaGVycy1sYW5kaW5nX2RvbGxhcl82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj1kM2FiZmJkMC1iNzI1LTRiMGMtOTdlNS1mNjE2YmRiNzAzMDVcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAxNjksXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjEzNzQ4NzI3OTEwOCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyMTAwNjY2MTY1MzcsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ3LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjQ3NzYyLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiAzLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkV4cGxvcmUgU291dGggRGFrb3Rh4oCZcyBCbGFjayBIaWxscyByZWdpb24sIGEgbmF0dXJhbCB3b25kZXIgaW4gaXRzIG93biByaWdodC4gTG9jYXRlZCBhYm91dCBzaXggaG91cnMgZnJvbSBZZWxsb3dzdG9uZSwgdGhlIEJsYWNrIEhpbGxzIGFyZSBob21lIHRvIHNldmVuIG5hdGlvbmFsIHNpdGVzIOKAlCBCYWRsYW5kcyBOYXRpb25hbCBQYXJrLCBKZXdlbCBDYXZlIE5hdGlvbmFsIE1vbnVtZW50LCB0aGUgTGV3aXMgJiBDbGFyayBOYXRpb25hbCBIaXN0b3JpYyBUcmFpbCwgTWludXRlbWFuIE1pc3NpbGUgTmF0aW9uYWwgSGlzdG9yaWMgU2l0ZSwgTWlzc291cmkgTmF0aW9uYWwgUmVjcmVhdGlvbmFsIFJpdmVyLCBNb3VudCBSdXNobW9yZSBOYXRpb25hbCBNZW1vcmlhbCwgYW5kIFdpbmQgQ2F2ZSBOYXRpb25hbCBQYXJrLlxcblxcbkluIHRoaXMgbmF0dXJhbCBwbGF5Z3JvdW5kLCB5b3UgY2FuIGVuam95IGFuIGFidW5kYW5jZSBvZiByZWNyZWF0aW9uYWwgb3Bwb3J0dW5pdGllcywgZ29yZ2VvdXMgc2NlbmljIGRyaXZlcyDigJQgd2hpY2ggaW5jbHVkZSB0aGUgYmVhdXRpZnVsIFNwZWFyZmlzaCBDYW55b24g4oCUIGFuZCB3aWxkbGlmZS13YXRjaGluZy4gVGhpcyByZWdpb24gaXMgYWxzbyBwYWNrZWQgd2l0aCBjdWx0dXJhbCBhbmQgaGlzdG9yaWNhbCBzaXRlcy5cXG5cXG5XaGlsZSB5b3Ugd29u4oCZdCBzZWUgc2FiZXItdG9vdGhlZCBjYXRzIG9yIHJoaW5vY2Vyb3NlcyByb2FtaW5nIHRoZSBCYWRsYW5kcyBsaWtlIHRoZXkgb25jZSBkaWQsIHlvdSBtYXkgc2VlIHRoZWlyIHJlbWFpbnMgaW4gdGhpcyBzdHVubmluZyBuYXRpb25hbCBwYXJrIHdpdGggc29tZSBvZiB0aGUgd29ybGTigJlzIHJpY2hlc3QgZm9zc2lsIGRlcG9zaXRzLlxcblxcbkxvY2F0ZWQgaW4gSW1sYXkgVG93bnNoaXAgaW4gU291dGggRGFrb3RhLCBCYWRsYW5kcyBOYXRpb25hbCBQYXJrIGhhcyBhIEZvc3NpbCBQcmVwYXJhdGlvbiBMYWIgd2hlcmUgeW91IGNhbiB3YXRjaCBwYWxlb250b2xvZ2lzdHMgYXQgd29yaywgbGl0ZXJhbGx5IHVuY292ZXJpbmcgdGhlIGFuY2llbnQgaGlzdG9yeSBvZiB0aGUgYXJlYS4gQXQgdGhlIEJlbiBSZWlmZWwgVmlzaXRvciBDZW50ZXIsIGtpZHMgY2FuIHVzZSBhIHRvdWNoc2NyZWVuIHRvIGFzc2VtYmxlIGEgdmlydHVhbCBza2VsZXRvbiBhbmQgdG91Y2ggZm9zc2lsaXplZCBhbmltYWwgcmVwbGljYXMuIFlvdSBhbHNvIGNhbiB3YXRjaCB0aGUgZmlsbSBMYW5kIG9mIFN0b25lIGFuZCBMaWdodCBpbiB0aGUgY2VudGVy4oCZcyA5NS1zZWF0IGFpci1jb25kaXRpb25lZCB0aGVhdGVyLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRmF5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTIlMkZiYWRsYW5kc193aWtpcGRfNjgweDM5Mi5qcGc/YWx0PW1lZGlhJnRva2VuPTVkNjcyYzI1LTdiZDEtNDIyMS1hOWRkLTcxNGVjODkwOTkxNFwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDIyNyxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMDEwMTQ0OTI4NzgxLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjI1MjkxNDkwNTU0OCxcclxuICAgICAgICAgICAgbmFtZSA6IFwiQmFkbGFuZHMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDQxLFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMTEsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE2NzE5NDcsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH1dXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZmlyZWJhc2UgY2xvdWRlIHN0b3JhZ2UgdGVzdCAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBuZWVkIHRvIGtub3cgaG93IHRvIGdldCBodHRwIGltZyBzcmNcclxuICAgIC8vIHVwbG9hZCBwaWN0dXJlIGZpcnN0IGFuZCBtYWtlIHBvc3RfZGF0YVxyXG5cclxuICAgIC8vIHVwZGF0ZV9pbWFnZV9zcmMoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vIH1cclxuICAgIC8vIHVwZGF0ZV9wb3N0KHBvc3RfaWQsIHBvc3RfZGF0YSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgLy8gICAgIC51cGRhdGUocG9zdF9kYXRhKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0IHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVByb2ZpbGUgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHNldFRoaXNVc2VyUHJvZmlsZShkYXRhKXtcclxuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvcHJvZmlsZScsIGRhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQmxvZyBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZWFyY2hfcG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBlbm5lYWdyYW1fbnVtOm51bWJlcixcclxuICAgICAgICBvcmlnaW5fbGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbl9sb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlX21ldGVyOm51bWJlclxyXG4gICAgKXtcclxuICAgICAgICBjb25zdCBPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUiA9IDExMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIG1heF9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgKyBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgdmFyIG1pbl9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgLSBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4X2xhdGl0dWRlX2RlZ3JlZSA+PSA5MCl7XHJcbiAgICAgICAgICAgIG1heF9sYXRpdHVkZV9kZWdyZWUgPSA5MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWluX2xhdGl0dWRlX2RlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5fbGF0aXR1ZGVfZGVncmVlID0gLTkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbG9uZ2l0dWRlICsgZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luX2xhdGl0dWRlICogKDE4MCAvIE1hdGguUEkpKSk7XHJcbiAgICAgICAgdmFyIG1pbl9sb25naXR1ZGVfZGVncmVlID0gb3JpZ2luX2xvbmdpdHVkZSAtIGRpc3RhbmNlX21ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbl9sYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heF9sb25naXR1ZGVfZGVncmVlIC0gbWluX2xvbmdpdHVkZV9kZWdyZWUgPj0gMzYwKXtcclxuICAgICAgICAgICAgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gLTE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYobWF4X2xvbmdpdHVkZV9kZWdyZWUgPj0gMTgwKXtcclxuICAgICAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWUgLSAzNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPD0gLTE4MCl7XHJcbiAgICAgICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG1pbl9sb25naXR1ZGVfZGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPiBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluX2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbGF0XCIsbWluX2xhdGl0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbGF0XCIsb3JpZ2luX2xhdGl0dWRlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xhdFwiLG1heF9sYXRpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xvblwiLG1pbl9sb25naXR1ZGVfZGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5fbG9uZ2l0dWRlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sb25cIixtYXhfbG9uZ2l0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgZW5uZWFncmFtX251bSlcclxuICAgICAgICAud2hlcmUoXCJ0eXBlXCIsIFwiPT1cIiwgdHlwZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI8PVwiLCBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkb2MuZGF0YSgpLmxhdGl0dWRlIDw9IG1heF9sYXRpdHVkZV9kZWdyZWUgJiYgZG9jLmRhdGEoKS5sYXRpdHVkZSA+PSBtaW5fbGF0aXR1ZGVfZGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaF9xdWVyaWVzKFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIGVubmVhZ3JhbV9udW1zOm51bWJlcltdLFxyXG4gICAgICAgIG9yaWdpbl9sYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luX2xvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VfbWV0ZXI6bnVtYmVyLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZW5uZWFncmFtX251bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoX3Bvc3QodHlwZSxlbm5lYWdyYW1fbnVtc1tpXSxvcmlnaW5fbGF0aXR1ZGUsb3JpZ2luX2xvbmdpdHVkZSxkaXN0YW5jZV9tZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF91c2VyX3Bvc3RzKHVzZXJfaWQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJfaWQsIFwiPT1cIiwgXCJvd25lclwiKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5wdXNoKHNlYXJjaFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZF9wb3N0KHBvc3RfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLmFkZChwb3N0X2RhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgcG9zdCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZF9jb21tZW50KHBvc3RfaWQsIGNvbW1lbnRfZGF0YSl7XHJcbiAgICAgICAgdmFyIHBvc3RzID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnRfZGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlX2NvbW1lbnQocG9zdF9pZCwgY29tbWVudF9pZCwgY29tbWVudF9kYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RfaWQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjb21tZW50c1wiKS5kb2MoY29tbWVudF9pZClcclxuICAgICAgICAudXBkYXRlKGNvbW1lbnRfZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdGVzdCBxdWVyaWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIC8vIG5ldyB1c2VyXHJcbiAgICAvLyBzZXRfZGF0YSgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAuZG9jKHRoaXMuYXV0aHVzZXIudWlkKVxyXG4gICAgLy8gICAgIC5zZXQoe1xyXG4gICAgLy8gICAgICAgICBhdXRob3I6IHRoaXMuYXV0aHVzZXIudWlkLFxyXG4gICAgLy8gICAgICAgICBuYW1lOiBcIlNhbiBGcmFuY2lzY29cIixcclxuICAgIC8vICAgICAgICAgc3RhdGU6IFwiQ0FcIixcclxuICAgIC8vICAgICAgICAgY291bnRyeTogXCJVU0FcIixcclxuICAgIC8vICAgICAgICAgY2FwaXRhbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZV9kYXRhKCl7XHJcbiAgICAvLyAgICAgY29uc3QgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJTRlwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBwb3B1bGF0aW9uOiA4NjAwMDEsXHJcbiAgICAvLyAgICAgICAgIHVwZGF0ZVRpbWVzdGFtcDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLnNlcnZlclRpbWVzdGFtcCgpLFxyXG4gICAgLy8gICAgICAgICBsb2NhdGlvbjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuR2VvUG9pbnQoNC4zNCwgNS42NylcclxuICAgIC8vICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJTRiBwb3B1bGF0aW9uIHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gZ2V0X2RvY3VtZW50c19mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBjaXRpZXNDb2xsZWN0aW9uID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKTtcclxuXHJcbiAgICAvLyAgICAgY2l0aWVzQ29sbGVjdGlvbi5nZXQoKS50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgLy8gICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgIC8vICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGdldF9kYXRlX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcblxyXG4gICAgLy8gICAgIHNhbkZyYW5jaXNjb0RvY3VtZW50LmdldCgpLnRoZW4oZG9jID0+IHtcclxuICAgIC8vICAgICAgIGlmIChkb2MuZXhpc3RzKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGBEb2N1bWVudCBkYXRhOiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJObyBzdWNoIGRvY3VtZW50IVwiKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB3aGVyZV9xdWVyeSgpeyAgICAgICAgXHJcbiAgICAvLyAgICAgLy8gXCJHaW1tZSBhbGwgY2l0aWVzIGluIENhbGlmb3JuaWEgd2l0aCBhIHBvcHVsYXRpb24gYmVsb3cgNTUwMDAwXCJcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAvLyAgICAgLndoZXJlKFwic3RhdGVcIiwgXCI9PVwiLCBcIkNBXCIpLndoZXJlKFwicG9wdWxhdGlvblwiLCBcIjxcIiwgMjUwMDAwMClcclxuICAgIC8vICAgICAuZ2V0KClcclxuICAgIC8vICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgIC8vICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGBSZWxhdGl2ZWx5IHNtYWxsIENhbGlmb3JuaWFuIGNpdHk6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIC8vIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgIC8vICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZGVsZXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlNGIHdhcyBlcmFzZWQgZnJvbSB0aGUgZmFjZSBvZiB0aGUgZWFydGghXCIpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGFycmF5VW5pb24oKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIC8vICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgIC8vICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIGdldFRoaXNVc2VyRGF0YSgpe1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAgICAgLndoZXJlKFwiYXV0aG9yXCIsIFwiPT1cIiwgdGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAvLyAgICAgICAgIC5nZXQoKVxyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwaWN0dXJlIHVwbG9hZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgLy8gMS4gd2hlbiB1c2VyIHNlbGVjdCBwaWN0dXJlLCB0aGUgcGljdHVyZSB1cGxvYWRlZCBpbnRvIHN0b3JhZ2UuXHJcbiAgICBwaWNrSW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XHJcblx0XHRcdG1vZGU6IFwic2luZ2xlXCJcclxuXHRcdH0pO1xyXG5cdFx0Y29udGV4dFxyXG5cdFx0LmF1dGhvcml6ZSgpXHJcblx0XHQudGhlbigoKSA9PiBjb250ZXh0LnByZXNlbnQoKSlcclxuXHRcdC50aGVuKChzZWxlY3Rpb24pID0+IHNlbGVjdGlvbi5mb3JFYWNoKFxyXG5cdFx0XHQoc2VsZWN0ZWRBc3NldDogSW1hZ2VBc3NldCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZ2V0SW1hZ2VGaWxlUGF0aChzZWxlY3RlZEFzc2V0LCBpbWFnZVR5cGUpLnRoZW4oKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaW1hZ2VUeXBlLGZpbGVQYXRoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0pXHJcblx0XHQpLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblx0Z2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0LCBpbWFnZVR5cGU6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHQvLyBpZiAoaW9zKSB7IC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGb2xkZXJQYXRoID0ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIoXCJuc2ltYWdlcGlja2VyXCIpLnBhdGg7XHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKHRlbXBGb2xkZXJQYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBvcHRpb25zID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zLm5ldygpO1xyXG5cclxuXHRcdFx0Ly8gXHRvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLnZlcnNpb24gPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNWZXJzaW9uLkN1cnJlbnQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5kZWxpdmVyeU1vZGUgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNEZWxpdmVyeU1vZGUuSGlnaFF1YWxpdHlGb3JtYXQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5uZXR3b3JrQWNjZXNzQWxsb3dlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gXHRQSEltYWdlTWFuYWdlci5kZWZhdWx0TWFuYWdlcigpLnJlcXVlc3RJbWFnZURhdGFGb3JBc3NldE9wdGlvbnNSZXN1bHRIYW5kbGVyKGltYWdlQXNzZXQuaW9zLCBvcHRpb25zLCAobnNEYXRhOiBOU0RhdGEsIGRhdGFVVEk6IHN0cmluZywgb3JpZW50YXRpb246IFVJSW1hZ2VPcmllbnRhdGlvbiwgaW5mbzogTlNEaWN0aW9uYXJ5PGFueSwgYW55PikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0aWYgKGluZm8udmFsdWVGb3JLZXkoUEhJbWFnZVJlc3VsdElzSW5DbG91ZEtleSkpIHtcclxuXHRcdFx0Ly8gXHRcdFx0Ly8gSW1hZ2UgaXMgaW4gaUNsb3VkXHJcblx0XHRcdC8vIFx0XHRcdGlmIChuc0RhdGEpIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgTk9UIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fVxyXG5cdFx0XHQvLyBcdFx0fVxyXG5cclxuXHRcdFx0Ly8gXHRcdG5zRGF0YS53cml0ZVRvRmlsZUF0b21pY2FsbHkodGVtcEZpbGVQYXRoLCB0cnVlKTtcclxuXHRcdFx0Ly8gXHRcdHRoaXMuY3VycmVudEltYWdlRmlsZVBhdGggPSB0ZW1wRmlsZVBhdGg7XHJcblx0XHRcdC8vIFx0XHRyZXNvbHZlKHRlbXBGaWxlUGF0aCk7XHJcblx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdC8vIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmRyb2lkKSB7IC8vIHJldHVybiBpbWFnZUFzc2V0LmFuZHJvaWQsIHNpbmNlIGl0J3MgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRyZXNvbHZlKGltYWdlQXNzZXQuYW5kcm9pZCk7XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgLy8gcmVzb2x2ZShudWxsKTtcclxuXHRcdH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGxvYWRGaWxlKGZpbGVUeXBlOnN0cmluZywgZmlsZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZmlsZUNsYXNzO1xyXG4gICAgICAgIHZhciBmaWxlUGF0aFNwbGl0ZWQgPSBmaWxlUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoU3BsaXRlZFtmaWxlUGF0aFNwbGl0ZWQubGVuZ3RoLTFdO1xyXG4gICAgICAgIGlmKGZpbGVUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2Jsb2cvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmlsZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvcHJvZmlsZS9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9iYWNrZ3JvdW5kL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgZmlsZUNsYXNzICsgZmlsZU5hbWUsXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICBsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgoZmlsZVBhdGgpLFxyXG4gICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeSh1cGxvYWRlZEZpbGUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsZVVSTChmaWxlVHlwZSwgdGhpcy5hdXRodXNlci51aWQsIHVwbG9hZGVkRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMi4gZ2V0IHRoZSBwaWN0dXJlIFVSTCBmb3IgdXBsb2FkaW5nIHRoZSBibG9nLlxyXG4gICAgZ2V0RmlsZVVSTChpbWFnZVR5cGUsIHVpZCwgZmlsZU5hbWUpe1xyXG4gICAgICAgIHZhciBmaWxlVVJMO1xyXG4gICAgICAgIGlmKGltYWdlVHlwZSA9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9ibG9nL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwicHJvZmlsZVwiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL3Byb2ZpbGUvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLmdldERvd25sb2FkVXJsKHtcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwsIGNhbiBhbHNvIGJlIHBhc3NlZCBkdXJpbmcgaW5pdCgpIGFzICdzdG9yYWdlQnVja2V0JyBwYXJhbSBzbyB3ZSBjYW4gY2FjaGUgaXRcclxuICAgICAgICAgICAgLy8gYnVja2V0OiAnZ3M6Ly9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20nLFxyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHVpZCArIGZpbGVVUkwsXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXJsID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoYXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHN5bmNUaGlzVXNlclJvb21MaXN0KCl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb20ocmVzdWx0LmtleSwgcmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi91c2Vycy9cIiArIHRoaXMuYXV0aHVzZXIudWlkICsgXCIvdXNlcl9yb29tc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tKHVwZGF0ZWRfcm9vbV9pZCwgcm9vbV9mcmllbmRfaWQ6YW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Jvb21zLycgKyB1cGRhdGVkX3Jvb21faWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBzb21lb25lIHB1c2ggbWVzc2FnZShpbmNsdWRlIHlvdSksIGZ1bmN0aW9uKHJlc3VsdCkgd2lsbCBiZSBhY3RpdmF0ZWQuXHJcbiAgICAvLyBJdCBjaGFuZ2UgdGhlIG1lc3NhZ2VzIGFycmF5LlxyXG4gICAgc3luY1Jvb21NZXNzYWdlcyhyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkQ2hpbGRFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21NZXNzYWdlcyhyb29tX2lkLCByZXN1bHQua2V5ICxyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21faWQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21faWQ6c3RyaW5nLCBtZXNzYWdlX2lkOmFueSwgbWVzc2FnZTphbnkpe1xyXG4gICAgICAgIGlmKCF0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyb29tX2lkXVsnbWVzc2FnZXMnXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddW21lc3NhZ2VfaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VfdG9fYWRkID0ge307XHJcbiAgICAgICAgbWVzc2FnZV90b19hZGRbbWVzc2FnZV9pZF0gPSB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddW21lc3NhZ2VfaWRdXHJcbiAgICAgICAgaWYocm9vbV9pZCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkucHVzaChtZXNzYWdlX3RvX2FkZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tcyk7XHJcbiAgICB9XHJcbiAgICBzb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcChtZXNzYWdlQXJyYXkpe1xyXG4gICAgICAgIGlmKG1lc3NhZ2VBcnJheT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9hO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9iO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYSA9IGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBiKXtcclxuICAgICAgICAgICAgICAgIERhdGVcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfYiA9IGJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZV9iID0gbWVzc2FnZV9iWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICB2YXIgdGltZV9hID0gbWVzc2FnZV9hWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZV9hIC0gdGltZV9iO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbWVzc2FnZSA6XHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBzZW5kIGEgbWVzc2FnZSB0byBmcmllbmQgYWZ0ZXIgaW52aXRlIGZyaWVuZC5cclxuICAgIHB1c2hGcmllbmRPblJvb20odXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21faWQrXCIvcm9vbV91c2Vycy9cIit1aWQsIHVzZXJbdWlkXSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCByb29tX2lkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXRTZWxlY3RlZEZyaWVuZElEKHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3RlZEZyaWVuZElEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAxLiBnZW5lcmF0ZSByb29tIGlkXHJcbiAgICBnZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHVzZXI6YW55LCBmcmllbmQ6YW55KXtcclxuICAgICAgICB2YXIgZnJpZW5kX2lkO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgZnJpZW5kX2lkID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1c2VyX2lkO1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIHVzZXJfaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgcm9vbSBleGlzdCBiZWZvcmUgZ2VuZXJhdGUuXHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIG5vdCBleGlzdCwgY3JlYXRlIG5ldyByb29tLlxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnZhbHVlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gcm9vbSB3aXRoIGZyaWVuZF9pZDogXCIgKyBmcmllbmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVuX3Jvb20gPSB7cm9vbV91c2Vyczp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbl9yb29tWydpc09wZW4nXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbl9yb29tWydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycsIG9wZW5fcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCBmcmllbmQsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFJvb21JRE9uVXNlcihmcmllbmQsIHVzZXIsIHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdDIua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0Mi5rZXkpOy8vIFJvb20gSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBleGlzdCwgZG9uJ3QgbWFrZSBuZXcgb25lLlxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm9vbV9pZCBpbiByZXN1bHRbJ3ZhbHVlJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5yb29tc1tyb29tX2lkXVsnbWVzc2FnZXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3Qgcm9vbTogXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpKTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXJfaWQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZF9pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIC8vIDIuIHNldCBhdXRoZW50aWNhdGlvbiBmb3Igcm9vbXMgb24gdXNlciBkYXRhYmFzZVxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyX3Jvb20gPSB7fTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJfcm9vbVsnbGVhdmVUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgIGZvcih2YXIgZnJpZW5kX2lkIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlcl9yb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZF9pZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRfaWRdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyX3Jvb21bJ21lc3NhZ2VJY29uJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsndXNlck5hbWUnXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHJvb20gYWNjZXNzIGF0aGVudGljYXRpb24gb24gdXNlciBkYXRhYmFzZVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCBmcmllbmRfaWQpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGNhbiB3cml0ZSBvbiBjaGF0IHJvb21cclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbV9pZCsnL3Jvb21fdXNlcnMvJyt1aWQsIHVzZXJfcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jUm9vbU1lc3NhZ2VzKHJvb21faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN5bmNSb29tKHJvb21faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIG1lc3NhZ2VzIDpcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQ6c3RyaW5nLCB1c2VyOmFueSwgbWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBtZXNzYWdlX3BhY2sgPSB7fTtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgbWVzc2FnZV9wYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VfcGFja1snbWVzc2FnZSddID0gbWVzc2FnZTtcclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ3RpbWVzdGFtcCddID0gbmV3IERhdGUoKTtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJytyb29tX2lkKycvbWVzc2FnZXMnLCBtZXNzYWdlX3BhY2spLnRoZW4ocmVzdWx0ID0+IHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gTWVzc2FnZV9wYWNrIElEXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZpcmViYXNlIFJlYWx0aW1lIGRhdGFiYXNlIHRlc3QgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBtYWtlIGFycmF5IHR5cGUgZGF0YWJhc2UgYW5kIHB1c2ggZGF0YSBpbiBhcnJheSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyBwdXNoSW5BcnJheURhdGFiYXNlKGRhdGFiYXNlT2ZBcnJheVBhdGg6c3RyaW5nLCBwdXNoRGF0YTphbnkpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlT2ZBcnJheVBhdGgsIHB1c2hEYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvLyBtYWtlIGRhdGEgc3RydWN0dXJlIG9mIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIG1ha2VTdHJ1Y3R1cmVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgc3RydWN0dXJlOiBhbnkpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHN0cnVjdHVyZSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gLy8gYWRkIGF0dHJpYnV0ZSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlIGFuZCB1cGRhdGUgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyB3cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHVwZGF0ZURhdGE6IGFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHVwZGF0ZURhdGEpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyAvLyByZWFkIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgLy8gcmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAvLyAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuICAgIC8vIC8vIGNvbXBsZXggcXVlcnlcclxuICAgIC8vIHF1ZXJ5T25EYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nKXtcclxuICAgIC8vICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAvLyAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXHJcbiAgICAvLyAgICAgICAgICAgICAvLyAnL3VzZXJzJyxcclxuICAgIC8vICAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLFxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gYnV0IG9ubHkgY29tcGFuaWVzICdzaW5jZScgYSBjZXJ0YWluIHllYXIgKFRlbGVyaWsncyB2YWx1ZSBpcyAyMDAwLCB3aGljaCBpcyBpbWFnaW5hcnkgYnR3KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHVzZSBlaXRoZXIgYSAncmFuZ2UnXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9yYW5nZToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAyMDAwXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8vfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAuLiBvciAnY2hhaW4nIHJhbmdlcyBsaWtlIHRoaXM6XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHJhbmdlczogW1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLlNUQVJUX0FULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAxOTk5XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVORF9BVCxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMjAwMFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIF0sXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIG9ubHkgdGhlIGZpcnN0IDIgbWF0Y2hlc1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIChub3RlIHRoYXQgdGhlcmUncyBvbmx5IDEgaW4gdGhpcyBjYXNlIGFueXdheSlcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIFxyXG4gICAgLy8gLy8gcXVlcnkgcmVzdWx0XHJcbiAgICAvLyBvblF1ZXJ5RXZlbnQocmVzdWx0KSB7XHJcbiAgICAvLyAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAvLyAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgIC8vICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIC8vIHF1ZXJ5VGVzdCgpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgLy8gICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xyXG5cclxuICAgIC8vICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgJy91c2VycycsXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgLy8gICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFsdWU6ICdheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ1xyXG4gICAgLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIClcclxuICAgIC8vICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LnZhbHVlWydheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ10pKVxyXG4gICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyByZWFkVXNlck5hbWUoKXtcclxuICAgIC8vICAgICB2YXIgdXNlcklkID0gZmlyZWJhc2VXZWIuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgIC8vICAgICByZXR1cm4gZmlyZWJhc2VXZWIuZGF0YWJhc2UoKS5yZWYoJy91c2Vycy8nICsgdXNlcklkKS5vbmNlKCd2YWx1ZScpLnRoZW4oZnVuY3Rpb24oc25hcHNob3QpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHVzZXJuYW1lID0gKHNuYXBzaG90LnZhbCgpICYmIHNuYXBzaG90LnZhbCgpLnVzZXJuYW1lKSB8fCAnQW5vbnltb3VzJztcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BdXRoIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICByZWdpc3RlcihlbWFpbCwgcGFzc3dkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd2RcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgLy8gZ2V0IGN1cnJlbmRVc2VyXHJcbiAgICBsb2dpbih1c2VyKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q3VycmVudFVzZXIoKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFVzZXIodXNlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSW5pdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXRBdXRoVXNlcih1c2VyOmZpcmViYXNlLlVzZXIpe1xyXG4gICAgICAgIHRoaXMuYXV0aHVzZXIgPSB1c2VyO1xyXG4gICAgICAgIC8vIHNldCB0aGlzVXNlclxyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRUaGlzVXNlcihyZXN1bHQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgZnJpZW5kc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHVzZXIudWlkICsgJy9mcmllbmRzJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRzKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCByb29tc1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkICsgJy91c2VyX3Jvb21zJykudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRfa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdF9rZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIHNldFRoaXNVc2VyKHJlc3VsdDphbnkpe1xyXG4gICAgICAgIHZhciBrZXkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5rZXkpKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IHVzZXI7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZF9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRfaWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRfaWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRfaWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RnJpZW5kcyhmcmllbmRfaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZnJpZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJpZW5kWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ10gPSB0aGlzLmdldEZyaWVuZHMoKVsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaEZyaWVuZE9uUm9vbSh0aGlzLnRoaXNVc2VyLFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoTWVzc2FnZU9uUm9vbShcIi1MUExWTlZGMnlNMU16eUctRDcxXCIsIHRoaXMudGhpc1VzZXIsIFwiaGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVQb3N0KHRoaXMudGhpc1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJvb21faWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbV9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21faWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jVGhpc1VzZXJSb29tTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcbiAgICAgICAgdGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRfY29tbWVudCgnajNYZVZJcm9BSndMcVNENXJlNkMnLHtoZWxsbzonaGVsbG8nfSk7XHJcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnRlc3RfZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5hZGRfcG9zdCh0aGlzLnRlc3RfZGF0YVtpXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc2VhcmNoX3Bvc3QoXCJjaGF0XCIsMywzNy4zMjM5NzIsIDEyNy4xMjUxMDkgLDEwMDAwMCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hfcXVlcmllcyhcImNoYXRcIixbMSwyLDMsNCw1LDYsNyw4LDldLDM3LjMyMzk3MiwgMTI3LjEyNTEwOSAsMTAwMDAwKTtcclxuICAgICAgICAvLyB0aGlzLmdldEZpbGVVUkwoJ2FzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDInLCdndGV0b24tc2Nod2FiYWNoZXJzLWxhbmRpbmdfZG9sbGFyXzY4MC5qcGcnKTtcclxuICAgICAgICAvLyB0aGlzLmdldF91c2VyX3Bvc3RzKFwiSTMzQ0FLc3U1dVVrcTRYcXQyeFVWSmdjR0hNMlwiKTtcclxuXHR9XHJcblxyXG4gICAgcHVibGljIGpzb25Ub0FycmF5KGpzb24pe1xyXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgIGlmKGpzb24hPW51bGwpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldEdlbmVyYXRlZFJvb21JRChnZW5lcmF0ZWRSb29tSUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFJvb21JRCA9IGdlbmVyYXRlZFJvb21JRDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==