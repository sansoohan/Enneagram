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
        this.friends = {};
        this.rooms = {};
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
    FirebaseService.prototype.getSelectedPost = function () {
        var selected_index;
        for (var i = 0; i < this.postSearchResultArray.length; i++) {
            for (var post_id in this.postSearchResultArray[i]) {
                if (post_id === this.selectedPostID) {
                    return this.postSearchResultArray[i];
                }
            }
        }
    };
    //------------------------ firebase cloude storage test ------------------
    // need to know how to get http img src
    // upload picture first and make post_data
    FirebaseService.prototype.add_post = function (post_data) {
        firebaseWeb.firestore()
            .collection("posts")
            .add(post_data).then(function (documentRef) {
            console.log("auto-generated post ID: " + documentRef.id);
        });
    };
    FirebaseService.prototype.update_image_src = function () {
        firebaseWeb.firestore()
            .collection("posts");
    };
    FirebaseService.prototype.update_post = function (post_id, post_data) {
        firebaseWeb.firestore()
            .collection("posts").doc(post_id)
            .update(post_data).then(function () {
            console.log("post updated");
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
                console.log(_this.postSearchResultArray);
            });
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
    // new user
    FirebaseService.prototype.set_data = function () {
        firebaseWeb.firestore().collection("cities")
            .doc(this.authuser.uid)
            .set({
            author: this.authuser.uid,
            name: "San Francisco",
            state: "CA",
            country: "USA",
            capital: false,
            population: 860000
        });
    };
    FirebaseService.prototype.update_data = function () {
        var firebaseWeb = require("nativescript-plugin-firebase/app");
        firebaseWeb.firestore()
            .collection("cities")
            .doc("SF")
            .update({
            population: 860001,
            updateTimestamp: firebaseWeb.firestore().FieldValue().serverTimestamp(),
            location: firebaseWeb.firestore().GeoPoint(4.34, 5.67)
        }).then(function () {
            console.log("SF population updated");
        });
    };
    FirebaseService.prototype.get_documents_from_collection = function () {
        var citiesCollection = firebaseWeb.firestore().collection("cities");
        citiesCollection.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id + " => " + JSON.stringify(doc.data()));
            });
        });
    };
    FirebaseService.prototype.get_date_from_document = function () {
        var sanFranciscoDocument = firebaseWeb.firestore().collection("cities").doc("SF");
        sanFranciscoDocument.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data: " + JSON.stringify(doc.data()));
            }
            else {
                console.log("No such document!");
            }
        });
    };
    FirebaseService.prototype.where_query = function () {
        // "Gimme all cities in California with a population below 550000"
        firebaseWeb.firestore()
            .collection("cities")
            .where("state", "==", "CA").where("population", "<", 2500000)
            .get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("Relatively small Californian city: " + doc.id + " => " + JSON.stringify(doc.data()));
            });
        });
    };
    FirebaseService.prototype.delete_document_from_collection = function () {
        var sanFranciscoDocument = firebaseWeb.firestore().collection("cities").doc("SF");
        sanFranciscoDocument.delete().then(function () {
            console.log("SF was erased from the face of the earth!");
        });
    };
    // delete_data_from_document(){
    //     firebaseWeb.firestore().collection("cities").doc("LA")
    //         .update({
    //           capital: firebaseWeb.firestore().FieldValue().delete(),
    //         });
    // }
    FirebaseService.prototype.arrayUnion = function () {
        var firebaseWeb = require("nativescript-plugin-firebase/app");
        firebaseWeb.firestore()
            .collection("posts")
            .doc("lopkDLG6T7jpTuY5oO6x")
            .update({
            behavior: firebaseWeb.firestore.FieldValue().arrayUnion([{ "red": "blue" }])
        });
    };
    FirebaseService.prototype.getThisUserData = function () {
        console.log(this.authuser.uid);
        console.log(firebaseWeb.firestore()
            .collection("cities")
            .where("author", "==", this.authuser.uid)
            .get());
    };
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
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
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
            console.log("Remote URL: " + url);
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
    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    FirebaseService.prototype.syncRoom = function (room_id) {
        var _this = this;
        firebase.addValueEventListener(function (result) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoom(result.key, result.value);
        }, "/rooms/" + room_id).then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (updated_room_id, room_friend_id) {
        var _this = this;
        firebase.getValue('/rooms/' + updated_room_id).then(function (result) {
            // console.log(JSON.stringify(result));
            _this.rooms[result['key']] = JSON.parse(JSON.stringify(result.value));
            _this.setRoomArray();
            // console.log(this.rooms[result['keys']]);
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    FirebaseService.prototype.syncRoomMessages = function (room_id) {
        var _this = this;
        firebase.addValueEventListener(function (result) {
            console.log("Event type: " + result.type);
            console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoomMessages(room_id, result.value);
        }, "/rooms/" + room_id + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoomMessages = function (room_id, messages) {
        console.log(messages);
        this.rooms[room_id] = {};
        this.rooms[room_id]['messages'] = JSON.parse(JSON.stringify(messages));
        if (room_id == this.selectedRoomID) {
            this.selectedRoomMessageArray = this.jsonToArray(messages);
            this.sortMessageArrayWithTimeStamp(this.selectedRoomMessageArray);
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
                message_b = b[key];
            }
            return message_a['timestamp']['time'] - message_b['timestamp']['time'];
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
                console.log("exist room with friend_id: " + friend_id);
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
                console.log("exist room: " + JSON.stringify(result.value)); // Room ID
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
                // set room access athentication on user database
                firebase.setValue('/users/' + uid + '/user_rooms/' + room_id, friend_id).then(function (result) {
                    // user can write on chat room
                    firebase.setValue('/rooms/' + room_id + '/room_users/' + uid, user_room).then(function (result2) {
                        console.log(result);
                        _this.syncRoomMessages(room_id);
                        _this.syncRoom(room_id);
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
            console.log("created key: " + result.key); // Message_pack ID
        });
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
            this.syncRoomMessages(key);
            this.syncRoom(key);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFHL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUE0QkkseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEzQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFzQlgsMEJBQXFCLEdBQWUsRUFBRSxDQUFDO1FBSzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztnQkFDZCxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsTUFBTTtnQkFDZCxPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsRUFBRTtnQkFDaEIsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsTUFBTSxFQUFHLElBQUk7Z0JBQ2IsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsSUFBSSxFQUFHLEVBQUU7Z0JBQ1QsUUFBUSxFQUFHO29CQUNULElBQUksRUFBRyxFQUFFO29CQUNULEdBQUcsRUFBRyxDQUFDO29CQUNQLEtBQUssRUFBRyxFQUFFO29CQUNWLE9BQU8sRUFBRyxFQUFFO29CQUNaLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLElBQUksRUFBRyxhQUFhO29CQUNwQixj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QUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sa0NBQVEsR0FBZjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDSSxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBOW9DUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBOEJxQix5QkFBZ0I7T0E3QnJDLGVBQWUsQ0Erb0MzQjtJQUFELHNCQUFDO0NBQUEsQUEvb0NELElBK29DQztBQS9vQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIGF1dGh1c2VyOiBmaXJlYmFzZS5Vc2VyO1xyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyBmcmllbmRzID0ge307XHJcbiAgICBwdWJsaWMgcm9vbXMgPSB7fTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBmcmllbmRBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyByb29tQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbUlEOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21Vc2VyczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuXHJcblx0cHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJyZW50QmxvZ0ltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG5cclxuICAgIHRlc3RfZGF0YTogQXJyYXk8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgcG9zdFNlYXJjaFJlc3VsdEFycmF5OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQb3N0SUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy50ZXN0X2RhdGEgPSBbe1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogXCJcIixcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyNTI0MDYwNDgwMDk0NixcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIwOTg1ODczMDQzNTQsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjUsXHJcbiAgICAgICAgICAgICAgZGF5IDogNCxcclxuICAgICAgICAgICAgICBob3VycyA6IDIwLFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA1MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ0LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwNDY4MjQ0NDAwLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiNUZncmV3SmEyTWg5QzU5OGs3MEhRNDBiMXF1MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiAyLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk1hcnZlbCBhdCBtb3JlIHRoYW4gMiwwMDAgbmF0dXJhbCByb2NrIGFyY2hlcyBhdCB0aGlzIHBhcmsganVzdCBvdXRzaWRlIG9mIE1vYWIuIFNvbWUgb2YgdGhlIGZvcm1hdGlvbnMgY2FuIGJlIHNwb3R0ZWQgZnJvbSB0aGUgcm9hZCwgYnV0IHRoZSBiZXN0IHJlcXVpcmUgYSBzY2VuaWMgaGlrZS4gRG9u4oCZdCBtaXNzIHRoZSBmYW1vdXMgRGVsaWNhdGUgQXJjaCAoMyBtaWxlcyByb3VuZC10cmlwKSBvciB0aGUgNy1taWxlIChyb3VuZC10cmlwKSBEZXZpbHMgR2FyZGVuIExvb3AuXFxuXFxuVGhlIFBhcmsgQXZlbnVlIFRyYWlsIGlzIHRoZSBtb3N0IHBvcHVsYXIgaGlrZSBpbiB0aGUgcGFyayBiZWNhdXNlIG9mIGl0cyBlYXNlIGFuZCBzY2VuZXJ5IGF0IGp1c3QgMiBtaWxlcyByb3VuZCB0cmlwLiBPciB0cnkgdGhlIG1vcmUgY2hhbGxlbmdpbmcgaGlrZSB0byBEZWxpY2F0ZSBBcmNoZXMgYXQgMy4yIG1pbGVzIHJvdW5kIHRyaXAuXFxuXFxuV2hldGhlciB5b3UgYXJlIGNhbXBpbmcgb3Igc3RheWluZyBpbiBhIGhvdGVsLCBkb27igJl0IGZvcmdldCB0byBzcGVuZCBzb21lIHRpbWUgbG9va2luZyB1cCBhdCB0aGUgc2t5IGFmdGVyIG5pZ2h0IGZhbGxzLiBZb3XigJlsbCBmaW5kIHNvbWUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gYW5kIGFyb3VuZCBVdGFo4oCZcyBuYXRpb25hbCBwYXJrcy5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJTJGYXJjaGVzLWRlbGljYXRlLWFyY2gtc2t5X2Fkb2JlXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTZjYjQ4YWI1LTk2ZjUtNDNiMi05ZWExLTY3NDljZGJlZDM4ZlwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMzA4MDQ2OTI1MjI1NCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTU3OTgyODAyMzgsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkFyY2hlcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzQsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0OSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTI4OTkxOCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogOCxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJOaWNrbmFtZWQgdGhlIFxcXCJDcm93biBvZiB0aGUgQ29udGluZW50LFxcXCIgR2xhY2llciBOYXRpb25hbCBQYXJrIHNpdHMgaW4gdGhlIG5vcnRod2VzdCBjb3JuZXIgb2YgTW9udGFuYS4gR2xhY2llciBOYXRpb25hbCBQYXJrIGlzIGp1c3QgYSBzY2VuaWMgZGF54oCZcyBkcml2ZSBub3J0aCBmcm9tIFllbGxvd3N0b25lLlxcblxcbkhpdCB0aGUgdHJhaWwgdG8gZXhwbG9yZSBwbGFjZXMgbGlrZSBGaXNoZXJjYXAgTGFrZSAocGljdHVyZWQpLCB3aGljaCBpcyBhIGdyZWF0IHBsYWNlIHRvIHNwb3QgYSBtb29zZS4gRnJvbSBNYW55IEdsYWNpZXIgQ2FtcGdyb3VuZCwgZ28gdG8gdGhlIFN3aWZ0Y3VycmVudCBNb3RvciBJbm4gcGFya2luZyBsb3QuIFRoZSB0cmFpbGhlYWQgaXMgb24gdGhlIHdlc3QgZW5kLiBZb3UnbGwgZmluZCB0aGUgbGFrZSBsZXNzIHRoYW4gYSBtaWxlIGRvd24gdGhlIHRyYWlsLiBDb250aW51ZSAxLjUgbWlsZXMgdG8gUmVkcm9jayBMYWtlIGFuZCB0YWtlIGEgc3B1ciB0byBSZWRyb2NrIEZhbGxzLlxcblxcbkEgTmF0aW9uYWwgSGlzdG9yaWMgTGFuZG1hcmssIEdvaW5nLXRvLXRoZS1TdW4gUm9hZCBpcyBvbmUgb2YgdGhlIG1vc3Qgc2NlbmljIHJvYWRzIGluIE5vcnRoIEFtZXJpY2EsIG5vdCB0byBtZW50aW9uIG9uZSBvZiB0aGUgbW9zdCBjb21wbGV4IHRvIGJ1aWxkLiBUaGUgZmluYWwgc2VjdGlvbiwgb3ZlciBMb2dhbiBQYXNzLCB3YXMgY29tcGxldGVkIGluIDE5MzIgYWZ0ZXIgMTEgeWVhcnMgb2Ygd29yay4gQ29uc2lkZXJlZCBhbiBlbmdpbmVlcmluZyBmZWF0LCB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSByb2FkIGZvcmV2ZXIgY2hhbmdlZCB0aGUgd2F5IHZpc2l0b3JzIHdvdWxkIGV4cGVyaWVuY2UgR2xhY2llciBOYXRpb25hbCBQYXJrLiBGdXR1cmUgdmlzaXRvcnMgd291bGQgYmUgYWJsZSB0byBkcml2ZSBvdmVyIHNlY3Rpb25zIG9mIHRoZSBwYXJrIHRoYXQgcHJldmlvdXNseSBoYWQgdGFrZW4gZGF5cyBvZiBob3JzZWJhY2sgcmlkaW5nIHRvIHNlZS5cXG5cXG5JbiB0aGVpciBhYmlsaXR5IHRvIHdvdyB2aXNpdG9ycywgWWVsbG93c3RvbmUgYW5kIEdsYWNpZXIgc2hhcmUgYSBjb21tb24gYm9uZC4gQnV0IGFzIHdpdGggYW55IGdyZWF0IGRlc3RpbmF0aW9uLCB0aGVyZSBhcmUgc29tZSBhZHZlbnR1cmVzIHRoYXQgYXJlIGZvdW5kIG5vd2hlcmUgZWxzZS4gR2xhY2llciBwcmVzZXJ2ZXMgb3ZlciAxLDAwMCwwMDAgYWNyZXMgb2YgZm9yZXN0cywgYWxwaW5lIG1lYWRvd3MgYW5kIGxha2VzLiBJdHMgZGl2ZXJzZSBoYWJpdGF0cyBhcmUgaG9tZSB0byBvdmVyIDcwIHNwZWNpZXMgb2YgbWFtbWFscyBhbmQgb3ZlciAyNjAgc3BlY2llcyBvZiBiaXJkcy4gVGhlIHNwZWN0YWN1bGFyIGdsYWNpYXRlZCBsYW5kc2NhcGUgaXMgYSBoaWtlcuKAmXMgcGFyYWRpc2UsIGNvbnRhaW5pbmcgNzAwIG1pbGVzIG9mIG1haW50YWluZWQgdHJhaWxzIHRoYXQgbGVhZCBkZWVwIGludG8gb25lIG9mIHRoZSBsYXJnZXN0IGludGFjdCBlY29zeXN0ZW1zIGluIHRoZSBsb3dlciA0OCBzdGF0ZXMuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGSGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDIlMkZnbGFjaWVyLWF2YWxhY2hlLWxha2Uta2lkc19hZG9iZV82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj01MDg3MGM1ZS1iMWU2LTRkNTEtYmU5YS1kOWNkMmQ2MjcyNDJcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAxNTIsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjE2MDIzMDU2NjQyMyxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTI4MDYwMTk5MzIwMzMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkdsYWNpZXIgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTU0Mzc5NCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogNixcclxuICAgICAgICAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkp1c3QgMTUgbWlsZXMgc291dGggb2YgTW9hYiwgaGlrZSB5b3VyIHdheSB0aHJvdWdoIDMzNywgNTk4IGFjcmVzIG9mIGRyYW1hdGljIHJlZC1yb2NrIGxhbmRzY2FwZSBpbiBDYW55b25sYW5kcyBOUCwgYW5kIGRvIGl0IGFsbCB3aXRob3V0IGhhdmluZyB0byBjb21wZXRlIGZvciByb29tIG9uIHRoZSB0cmFpbCAtIENhbnlvbmxhbmRzIGlzIGJvdGggVXRhaOKAmXMgbGFyZ2VzdCBhbmQgbGVhc3QgdmlzaXRlZCBwYXJrLlxcblxcblRoZSByaXZlci1jYXJ2ZWQgcGFyayBib2FzdHMgMzYwLWRlZ3JlZSB2aWV3cyBvZiBydXN0LWNvbG9yZWQgYXJjaGVzLCBidXR0ZXMsIGFuZCBjbGlmZnMgLSBidXQgYmVjYXVzZSBvZiB0aGUgaGlnaC1kZXNlcnQgcm9jayBlbnZpcm9ubWVudCwgaXRzIGNsaW1hdGUgaXMgc3ViamVjdCB0byBleHRyZW1lIHRlbXBlcmF0dXJlIGZsdWN0dWF0aW9ucy4gU2tpcCBwYWNraW5nIHRoZSBwYXJrYSwgYW5kIGdvIGluIHRoZSBzcHJpbmcgb3IgZmFsbCBmb3IgdGhlIG1vc3QgbW9kZXJhdGUsIGFuZCBtb3N0IGZvcmdpdmluZywgd2VhdGhlci5cXG5cXG5TbyBleHBhbnNpdmUgaXTigJlzIGRpdmlkZWQgaW50byBmb3VyIGRpc3RyaWN0cywgQ2FueW9ubGFuZHMgZGVsaXZlcnMgYSBxdWludGVzc2VudGlhbCBkZXNlcnQgZXhwZXJpZW5jZTogZGVlcCBjYW55b25zLCBwcmVoaXN0b3JpYyByb2NrIGFydCwgcml2ZXJzLCBhbmQgc3dlZXBpbmcgb3Zlcmxvb2tzLlxcblxcbkFtb25nIHRoZSBleGNlcHRpb25hbCwgc3RyaWF0ZWQgcm9jayBmb3JtYXRpb25zLCB0aGVyZSBhcmUgbGFuZG1hcmtzIHlvdSBzaG91bGRu4oCZdCBtaXNzLCBsaWtlIHRoZSB1bnVzdWFsIDE1MDAtZm9vdCBVcGhlYXZhbCBEb21lIC0gdGhvdWdodCB0byBiZSBhIG1ldGVvcml0ZSBjcmF0ZXIgLSBvciB0aGUgRHJ1aWQgQXJjaCwgb2Z0ZW4gcmVmZXJyZWQgdG8gYXMgVXRhaOKAmXMgb3duIFN0b25laGVuZ2UuIEtlZXAgd2F0Y2ggZm9yIHRoZSB3aWxkbGlmZSwgdG9vLiBCaWdob3JuIHNoZWVwIHRha2UgcmVzaWRlbmNlIGluIHRoZSBjYW55b25zIGFuZCBidXR0ZXMsIGFsb25nIHdpdGggbXVsZSBkZWVyLCBrYW5nYXJvbyByYXRzLCBhbmQgY295b3RlLiBMb29rIHVwIGZvciByZWQtIHRhaWxlZCBoYXdrcywgYW5kIGF0IG5pZ2h0LCBmb3Igb25lIG9mIHRoZSBkYXJrZXN0IHNraWVzIGluIHRoZSBMb3dlciA0OC4gT24gYSBtb29ubGVzcyBuaWdodCwgZ2V0IG1vcmUgdGhhbiB5b3VyIGZpbGwgb2Ygc3RhcnMgLSBvciBnZXQgb3V0IHRoZSBiaW5vY3VsYXJzIHRvIHRyeSBmb3IgdGhlIHJpbmdzIG9mIFNhdHVybi5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yJTJGY2FueW9ubGFuZHMtbWVzYS1hcmNoLXN1bnJpc2VfZG9sbGFyXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTkxNzVmNjlkLWE1YjItNDgyOC04Yjk4LWQwNWQxZDFlMGY2MVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDM4NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiQ2FueW9ubGFuZHMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMjcsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE1Njc4ODksXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDUsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJiYWRcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEaXZpZGVkIGJ5IGEgMjc3LW1pbGUgbG9uZyBjYW55b24sIGFuZCB0aGUgbWlsZS1kZWVwIENvbG9yYWRvIFJpdmVyLCB0aGUgdHdvIGhhbHZlcyBvZiBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyaywgdGhlIE5vcnRoIGFuZCBTb3V0aCBSaW0sIG9mZmVyIHR3byBwYXJrcyBpbiBvbmUsIHdpdGggZGl2ZXJzZSBsYW5kc2NhcGUgYW5kIGVjb2xvZ3kgb24gZWl0aGVyLlxcblxcbkdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCBhbmQgdGhlIGdyZWF0ZXIgR3JhbmQgQ2FueW9uIHJlZ2lvbiwgaXMgYSBoaWtlcidzIGRyZWFtLiBNb3N0IG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrIGlzIHVuZGV2ZWxvcGVkIGJhY2tjb3VudHJ5LiBUaGVyZSBhcmUgbGl0ZXJhbGx5IGh1bmRyZWRzIG9mIG1pbGVzIHRvIGhpa2UsIGJhY2twYWNrIGFuZCBleHBsb3JlLiBEZXNwaXRlIHRoZSBHcmFuZCBDYW55b24ncyBwb3B1bGFyaXR5IGFuZCBudW1iZXJzIG9mIHZpc2l0b3JzIGVhY2ggeWVhciwgdmlzaXRvcnMgb25seSBuZWVkIHRvIGhpa2UgYSBzbWFsbCBkaXN0YW5jZSB0byBlbmpveSBzb21lIHNvbGl0dWRlLlxcblxcbkV4cGxvcmUgdGhlIGRlcHRocyBvZiB0aGUgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgb24gcG9wdWxhciB0cmFpbHMgbGlrZSB0aGUgQnJpZ2h0IEFuZ2VsIGFuZCBTb3V0aCBLYWliYWIgdHJhaWwgb24gYSBtdWxlLiBBIEdyYW5kIENhbnlvbiBtdWxlIHJpZGUgaXMgYW4gYWR2ZW50dXJlIGFuZCBlYXN5IG9uIHlvdXIgbGVncy5cXG5cXG5PbmUgb2YgdGhlIG1vc3QgZXhjaXRpbmcgd2F5cyB0byBleHBlcmllbmNlIHRoZSBHcmFuZCBDYW55b24gaXMgdG8gZmxvYXQgdGhyb3VnaCBpdCBieSB3YXkgb2YgcmFmdCBvbiB0aGUgQ29sb3JhZG8gUml2ZXIuIE1vc3QgcGVvcGxlIGJvb2sgdGhlaXIgdHJpcCB3aXRoIGEgY29tbWVyY2lhbCBvdXRmaXR0ZXIgYW5kIHlvdSBjYW4gZXZlbiBjb21iaW5lIHRoZSByYWZ0aW5nIHRyaXAgd2l0aCBhIGhlbGljb3B0ZXIgcmlkZS4gRXhwZXJpZW5jZWQgd2hpdGV3YXRlciByYWZ0ZXI/IEVudGVyIHRoZSBsb3R0ZXJ5IHRvIGRvIHlvdXIgb3duIHRyaXAuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MSUyRmdjLXlhdmFwYWktcG9pbnQtc3Vuc2V0X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTUxODBlMmY0LTk5YTYtNGUxZS1iNzQ0LWZhZWJhZjkyMDRlOVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDUxNCxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ5LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNTg5Njc0LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiAxLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTWF4aW1pemUgeW91ciBleHBlcmllbmNlIGF0IEJyeWNlIENhbnlvbiBOYXRpb25hbCBQYXJrIGJ5IGRyaXZpbmcgdG8gU3VucmlzZSwgU3Vuc2V0LCBJbnNwaXJhdGlvbiBhbmQgQnJ5Y2Ugdmlld3BvaW50cy4gVGhlc2UgYXJlIGFsbCBzcGVjdGFjdWxhciBvdmVybG9va3Mgb2YgdGhlIHBhcmvigJlzIHJlZCBob29kb29zIHNob290aW5nIHVwIGFnYWluc3QgZXZlcmdyZWVuIGZvcmVzdHMgaW4gdGhlIGJhY2tncm91bmQuIERlcGVuZGluZyBvbiB0aGUgdGltZSBvZiBkYXksIGFuZCB0aGUgYW5nbGUgYW5kIGxpZ2h0IG9mIHRoZSBzdW4sIHRoZSBob29kb29zIGFuZCBteXN0ZXJpb3VzIHJvY2sgZm9ybWF0aW9ucyBvZnRlbiB0YWtlIG9uIHVudXN1YWwgcGF0dGVybnMgYW5kIHNoYXBlcywgYW5kIHNvbWUgdGhpbmssIGltYWdpbmFyeSBmYWNlcy5cXG5cXG5Gb3IgbW9yZSBpbnNwaXJhdGlvbiwgbGFjZSB1cCB5b3VyIGhpa2luZyBib290cyBvciBvdGhlciBzdHVyZHkgc2hvZXMgYW5kIGV4cGxvcmUgYSB0cmFpbC4gVGhlcmUgaXMgc29tZXRoaW5nIGZvciBldmVyeW9uZSBhdCBCcnljZSBDYW55b24uIE91ciBmYXZvcml0ZSBlYXN5IGhpa2VzIGluY2x1ZGUgQnJpc3RsZWNvbmUgTG9vcCBUcmFpbCBhbmQgUXVlZW5zIEdhcmRlbiBUcmFpbC4gSGF0IFNob3AgaXMgb3VyIGZhdm9yaXRlIG1vZGVyYXRlIGhpa2UuIEZvciBtb3JlIHBoeXNpY2FsbHkgZml0IGhpa2VycyBsb29raW5nIGZvciBhIHN0cmVudW91cyBhZHZlbnR1cmUsIGRvIHRoZSA1LjUtbWlsZSB2ZXJ0aWNhbGx5IGNoYWxsZW5naW5nIFBlZWstQS1Cb28gTG9vcCBvciB0aGUgNy45IEZhaXJ5bGFuZCBMb29wIHJhdGVkIOKAnGRpZmZpY3VsdOKAnSBieSB0aGUgcGFyayBzZXJ2aWNlLiBcIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZSejIweUM3TEVTT0NEVW9hNHNwNjl2NWNvcFQyJTJGYnJ5Y2UtYW1waGl0aGVhdGVyLWluc3BpcmF0aW9uLXBvaW50X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTA2ZDE1NGI3LTgwZDgtNDZjOS05ZmRmLWUzZTcwZWM0Mzk1MVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMDg2MzIxMjk2NzMyLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjQzNTg3NTA4Nzk3NixcclxuICAgICAgICAgICAgbmFtZSA6IFwiQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDIxLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjIxMzgxLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiUnoyMHlDN0xFU09DRFVvYTRzcDY5djVjb3BUMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBwcmVzZXJ2ZXMgYSBzcGVjdGFjdWxhciBsYW5kc2NhcGUgcmljaCB3aXRoIG1hamVzdGljIG1vdW50YWlucywgcHJpc3RpbmUgbGFrZXMsIGFuZCBleHRyYW9yZGluYXJ5IHdpbGRsaWZlLiBUaGUgYWJydXB0IHZlcnRpY2FsIHJpc2Ugb2YgdGhlIGphZ2dlZCBUZXRvbiBNb3VudGFpbnMgY29udHJhc3RzIHdpdGggdGhlIGhvcml6b250YWwgc2FnZS1jb3ZlcmVkIHZhbGxleSBhbmQgZ2xhY2lhbCBsYWtlcyBhdCBpdHMgYmFzZS5cXG5cXG5JdCB0b29rIG1vcmUgdGhhbiAzMCB5ZWFycyBmb3IgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB0byB0cmFuc2Zvcm0gZnJvbSBhbiBpZGVhIHRvIG9uZSBvZiB0aGUgY291bnRyeSdzIG1vc3Qgc3R1bm5pbmcgcGFya3MuIFdoZW4gQ29uZ3Jlc3MgY3JlYXRlZCB0aGUgcGFyayBpbiAxOTI5LCBpdCBvbmx5IGluY2x1ZGVkIHRoZSBUZXRvbiBSYW5nZSBhbmQgc2l4IGdsYWNpYWwgbGFrZXMuIEpvaG4gRC4gUm9ja2VmZWxsZXIsIEpyLiwgcGxheWVkIGEga2V5IHJvbGUgaW4gYWNxdWlyaW5nIGFuIGFkZGl0aW9uYWwgMzUsMDAwIGFjcmVzIGZvciB0aGUgcGFyayB1bmRlciB0aGUgbmFtZSBcXFwiU25ha2UgUml2ZXIgTGFuZCBDby5cXFwiIEFtaWQgY29udHJvdmVyc3kgdGhlIFxcXCJuZXdcXFwiIEdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgd2FzIGVzdGFibGlzaGVkIFNlcHQuIDE0LCAxOTUwLCBieSBQcmVzaWRlbnQgSGFycnkgVHJ1bWFuLlxcblxcbkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgYW5kIGl0cyB3b3JsZC1jbGFzcyBzY2VuZXJ5IGF0dHJhY3RzIG5lYXJseSA0IG1pbGxpb24gdmlzaXRvcnMgcGVyIHllYXIuIFdpdGggSmVubnkgTGFrZSBhbmQgSmFja3NvbiBMYWtlIGF0IDYsMzIwIGZlZXQgYW5kIHRoZSBzdW1taXQgb2YgdGhlIEdyYW5kIFRldG9uIGF0IDEzLDc3MCBmZWV0LCB0aGUgcGFyaydzIGVsZXZhdGlvbiByYW5nZXMgY3JlYXRlIG9uZSBvZiB0aGUgbmF0aW9uJ3MgbW9zdCBhd2UtaW5zcGlyaW5nIGxhbmRzY2FwZXMuIEluIGFkZGl0aW9uIHRvIGdhemluZyBhdCB0aGUgaW5jcmVkaWJsZSB2aWV3cywgdGhlcmUgaXMgbXVjaCB0byBkbyBpbiB0aGlzIHBhcmsgZnJvbSBoaWtpbmcgYW5kIHJvY2sgY2xpbWJpbmcgdG8gYm9hdGluZyBhbmQgZmlzaGluZy4gQW5kIHdoZW4geW91IG5lZWQgYSBicmVhayBmcm9tIG91dGRvb3IgYWR2ZW50dXJlLCB0aGVyZSBhcmUgZmV3IGJldHRlciBwbGFjZXMgdG8gc2ltcGx5IHJlbGF4IGFuZCB3YXRjaCB0aGUgcGFyaydzIGluY3JlZGlibGUgd2lsZGxpZmUuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMiUyRmd0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49ZDNhYmZiZDAtYjcyNS00YjBjLTk3ZTUtZjYxNmJkYjcwMzA1XCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMTY5LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIxMzc0ODcyNzkxMDgsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyMjEwMDY2NjE2NTM3LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNDAsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0NyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTY0Nzc2MixcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcImFzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMyxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJFeHBsb3JlIFNvdXRoIERha290YeKAmXMgQmxhY2sgSGlsbHMgcmVnaW9uLCBhIG5hdHVyYWwgd29uZGVyIGluIGl0cyBvd24gcmlnaHQuIExvY2F0ZWQgYWJvdXQgc2l4IGhvdXJzIGZyb20gWWVsbG93c3RvbmUsIHRoZSBCbGFjayBIaWxscyBhcmUgaG9tZSB0byBzZXZlbiBuYXRpb25hbCBzaXRlcyDigJQgQmFkbGFuZHMgTmF0aW9uYWwgUGFyaywgSmV3ZWwgQ2F2ZSBOYXRpb25hbCBNb251bWVudCwgdGhlIExld2lzICYgQ2xhcmsgTmF0aW9uYWwgSGlzdG9yaWMgVHJhaWwsIE1pbnV0ZW1hbiBNaXNzaWxlIE5hdGlvbmFsIEhpc3RvcmljIFNpdGUsIE1pc3NvdXJpIE5hdGlvbmFsIFJlY3JlYXRpb25hbCBSaXZlciwgTW91bnQgUnVzaG1vcmUgTmF0aW9uYWwgTWVtb3JpYWwsIGFuZCBXaW5kIENhdmUgTmF0aW9uYWwgUGFyay5cXG5cXG5JbiB0aGlzIG5hdHVyYWwgcGxheWdyb3VuZCwgeW91IGNhbiBlbmpveSBhbiBhYnVuZGFuY2Ugb2YgcmVjcmVhdGlvbmFsIG9wcG9ydHVuaXRpZXMsIGdvcmdlb3VzIHNjZW5pYyBkcml2ZXMg4oCUIHdoaWNoIGluY2x1ZGUgdGhlIGJlYXV0aWZ1bCBTcGVhcmZpc2ggQ2FueW9uIOKAlCBhbmQgd2lsZGxpZmUtd2F0Y2hpbmcuIFRoaXMgcmVnaW9uIGlzIGFsc28gcGFja2VkIHdpdGggY3VsdHVyYWwgYW5kIGhpc3RvcmljYWwgc2l0ZXMuXFxuXFxuV2hpbGUgeW91IHdvbuKAmXQgc2VlIHNhYmVyLXRvb3RoZWQgY2F0cyBvciByaGlub2Nlcm9zZXMgcm9hbWluZyB0aGUgQmFkbGFuZHMgbGlrZSB0aGV5IG9uY2UgZGlkLCB5b3UgbWF5IHNlZSB0aGVpciByZW1haW5zIGluIHRoaXMgc3R1bm5pbmcgbmF0aW9uYWwgcGFyayB3aXRoIHNvbWUgb2YgdGhlIHdvcmxk4oCZcyByaWNoZXN0IGZvc3NpbCBkZXBvc2l0cy5cXG5cXG5Mb2NhdGVkIGluIEltbGF5IFRvd25zaGlwIGluIFNvdXRoIERha290YSwgQmFkbGFuZHMgTmF0aW9uYWwgUGFyayBoYXMgYSBGb3NzaWwgUHJlcGFyYXRpb24gTGFiIHdoZXJlIHlvdSBjYW4gd2F0Y2ggcGFsZW9udG9sb2dpc3RzIGF0IHdvcmssIGxpdGVyYWxseSB1bmNvdmVyaW5nIHRoZSBhbmNpZW50IGhpc3Rvcnkgb2YgdGhlIGFyZWEuIEF0IHRoZSBCZW4gUmVpZmVsIFZpc2l0b3IgQ2VudGVyLCBraWRzIGNhbiB1c2UgYSB0b3VjaHNjcmVlbiB0byBhc3NlbWJsZSBhIHZpcnR1YWwgc2tlbGV0b24gYW5kIHRvdWNoIGZvc3NpbGl6ZWQgYW5pbWFsIHJlcGxpY2FzLiBZb3UgYWxzbyBjYW4gd2F0Y2ggdGhlIGZpbG0gTGFuZCBvZiBTdG9uZSBhbmQgTGlnaHQgaW4gdGhlIGNlbnRlcuKAmXMgOTUtc2VhdCBhaXItY29uZGl0aW9uZWQgdGhlYXRlci5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJTJGYmFkbGFuZHNfd2lraXBkXzY4MHgzOTIuanBnP2FsdD1tZWRpYSZ0b2tlbj01ZDY3MmMyNS03YmQxLTQyMjEtYTlkZC03MTRlYzg5MDk5MTRcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAyMjcsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjAxMDE0NDkyODc4MSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTI5MTQ5MDU1NDgsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkJhZGxhbmRzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDExLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjcxOTQ3LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkUG9zdCgpe1xyXG4gICAgICAgIHZhciBzZWxlY3RlZF9pbmRleDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIHBvc3RfaWQgaW4gdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgaWYocG9zdF9pZCA9PT0gdGhpcy5zZWxlY3RlZFBvc3RJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGZpcmViYXNlIGNsb3VkZSBzdG9yYWdlIHRlc3QgLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gbmVlZCB0byBrbm93IGhvdyB0byBnZXQgaHR0cCBpbWcgc3JjXHJcbiAgICAvLyB1cGxvYWQgcGljdHVyZSBmaXJzdCBhbmQgbWFrZSBwb3N0X2RhdGFcclxuICAgIGFkZF9wb3N0KHBvc3RfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLmFkZChwb3N0X2RhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgcG9zdCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZV9pbWFnZV9zcmMoKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgIH1cclxuICAgIHVwZGF0ZV9wb3N0KHBvc3RfaWQsIHBvc3RfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC51cGRhdGUocG9zdF9kYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0IHVwZGF0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQmxvZyBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZWFyY2hfcG9zdChcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBlbm5lYWdyYW1fbnVtOm51bWJlcixcclxuICAgICAgICBvcmlnaW5fbGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbl9sb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlX21ldGVyOm51bWJlclxyXG4gICAgKXtcclxuICAgICAgICBjb25zdCBPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUiA9IDExMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIG1heF9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgKyBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgdmFyIG1pbl9sYXRpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbGF0aXR1ZGUgLSBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgaWYobWF4X2xhdGl0dWRlX2RlZ3JlZSA+PSA5MCl7XHJcbiAgICAgICAgICAgIG1heF9sYXRpdHVkZV9kZWdyZWUgPSA5MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWluX2xhdGl0dWRlX2RlZ3JlZSA8PSAtOTApe1xyXG4gICAgICAgICAgICBtaW5fbGF0aXR1ZGVfZGVncmVlID0gLTkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSBvcmlnaW5fbG9uZ2l0dWRlICsgZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIqTWF0aC5zaW4ob3JpZ2luX2xhdGl0dWRlICogKDE4MCAvIE1hdGguUEkpKSk7XHJcbiAgICAgICAgdmFyIG1pbl9sb25naXR1ZGVfZGVncmVlID0gb3JpZ2luX2xvbmdpdHVkZSAtIGRpc3RhbmNlX21ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbl9sYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIGlmKG1heF9sb25naXR1ZGVfZGVncmVlIC0gbWluX2xvbmdpdHVkZV9kZWdyZWUgPj0gMzYwKXtcclxuICAgICAgICAgICAgbWF4X2xvbmdpdHVkZV9kZWdyZWUgPSAxODA7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gLTE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYobWF4X2xvbmdpdHVkZV9kZWdyZWUgPj0gMTgwKXtcclxuICAgICAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWUgLSAzNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPD0gLTE4MCl7XHJcbiAgICAgICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG1pbl9sb25naXR1ZGVfZGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWluX2xvbmdpdHVkZV9kZWdyZWUgPiBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWluX2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1pbl9sb25naXR1ZGVfZGVncmVlID0gbWF4X2xvbmdpdHVkZV9kZWdyZWU7XHJcbiAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbGF0XCIsbWluX2xhdGl0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbGF0XCIsb3JpZ2luX2xhdGl0dWRlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xhdFwiLG1heF9sYXRpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xvblwiLG1pbl9sb25naXR1ZGVfZGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9yaV9sb25cIixvcmlnaW5fbG9uZ2l0dWRlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sb25cIixtYXhfbG9uZ2l0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLndoZXJlKFwibnVtYmVyXCIsIFwiPT1cIiwgZW5uZWFncmFtX251bSlcclxuICAgICAgICAud2hlcmUoXCJ0eXBlXCIsIFwiPT1cIiwgdHlwZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI8PVwiLCBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAud2hlcmUoXCJsb25naXR1ZGVcIiwgXCI+PVwiLCBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkb2MuZGF0YSgpLmxhdGl0dWRlIDw9IG1heF9sYXRpdHVkZV9kZWdyZWUgJiYgZG9jLmRhdGEoKS5sYXRpdHVkZSA+PSBtaW5fbGF0aXR1ZGVfZGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc2VhcmNoZWQgZG9jIDogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkucHVzaChzZWFyY2hSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlYXJjaF9xdWVyaWVzKFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIGVubmVhZ3JhbV9udW1zOm51bWJlcltdLFxyXG4gICAgICAgIG9yaWdpbl9sYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luX2xvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VfbWV0ZXI6bnVtYmVyLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZW5uZWFncmFtX251bXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoX3Bvc3QodHlwZSxlbm5lYWdyYW1fbnVtc1tpXSxvcmlnaW5fbGF0aXR1ZGUsb3JpZ2luX2xvbmdpdHVkZSxkaXN0YW5jZV9tZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF91c2VyX3Bvc3RzKHVzZXJfaWQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJfaWQsIFwiPT1cIiwgXCJvd25lclwiKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFtkb2MuaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5wdXNoKHNlYXJjaFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZF9jb21tZW50KHBvc3RfaWQsIGNvbW1lbnRfZGF0YSl7XHJcbiAgICAgICAgdmFyIHBvc3RzID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIilcclxuICAgICAgICAuYWRkKGNvbW1lbnRfZGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlX2NvbW1lbnQocG9zdF9pZCwgY29tbWVudF9pZCwgY29tbWVudF9kYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RfaWQpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjb21tZW50c1wiKS5kb2MoY29tbWVudF9pZClcclxuICAgICAgICAudXBkYXRlKGNvbW1lbnRfZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tbWVudCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gbmV3IHVzZXJcclxuICAgIHNldF9kYXRhKCl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgICAgIC5kb2ModGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAgICAgLnNldCh7XHJcbiAgICAgICAgICAgIGF1dGhvcjogdGhpcy5hdXRodXNlci51aWQsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2FuIEZyYW5jaXNjb1wiLFxyXG4gICAgICAgICAgICBzdGF0ZTogXCJDQVwiLFxyXG4gICAgICAgICAgICBjb3VudHJ5OiBcIlVTQVwiLFxyXG4gICAgICAgICAgICBjYXBpdGFsOiBmYWxzZSxcclxuICAgICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlX2RhdGEoKXtcclxuICAgICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAgICAgLmRvYyhcIlNGXCIpXHJcbiAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMSxcclxuICAgICAgICAgICAgdXBkYXRlVGltZXN0YW1wOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5HZW9Qb2ludCg0LjM0LCA1LjY3KVxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHBvcHVsYXRpb24gdXBkYXRlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZG9jdW1lbnRzX2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IGNpdGllc0NvbGxlY3Rpb24gPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpO1xyXG5cclxuICAgICAgICBjaXRpZXNDb2xsZWN0aW9uLmdldCgpLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2RhdGVfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuXHJcbiAgICAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZ2V0KCkudGhlbihkb2MgPT4ge1xyXG4gICAgICAgICAgaWYgKGRvYy5leGlzdHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYERvY3VtZW50IGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHN1Y2ggZG9jdW1lbnQhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdoZXJlX3F1ZXJ5KCl7ICAgICAgICBcclxuICAgICAgICAvLyBcIkdpbW1lIGFsbCBjaXRpZXMgaW4gQ2FsaWZvcm5pYSB3aXRoIGEgcG9wdWxhdGlvbiBiZWxvdyA1NTAwMDBcIlxyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgICAgICAud2hlcmUoXCJzdGF0ZVwiLCBcIj09XCIsIFwiQ0FcIikud2hlcmUoXCJwb3B1bGF0aW9uXCIsIFwiPFwiLCAyNTAwMDAwKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbGF0aXZlbHkgc21hbGwgQ2FsaWZvcm5pYW4gY2l0eTogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlX2RvY3VtZW50X2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuICAgICAgICBcclxuICAgICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGRlbGV0ZV9kYXRhX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIkxBXCIpXHJcbiAgICAvLyAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICAgIGNhcGl0YWw6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5kZWxldGUoKSxcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgYXJyYXlVbmlvbigpe1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgICAgIC51cGRhdGUoe1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VGhpc1VzZXJEYXRhKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgICAgICAgICAud2hlcmUoXCJhdXRob3JcIiwgXCI9PVwiLCB0aGlzLmF1dGh1c2VyLnVpZClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBpY3R1cmUgdXBsb2FkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLyAxLiB3aGVuIHVzZXIgc2VsZWN0IHBpY3R1cmUsIHRoZSBwaWN0dXJlIHVwbG9hZGVkIGludG8gc3RvcmFnZS5cclxuICAgIHBpY2tJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxyXG5cdFx0fSk7XHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZVR5cGUsZmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICAvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbShyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb20ocmVzdWx0LmtleSwgcmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi9yb29tcy9cIiArIHJvb21faWQpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGxpc3RlbmVyV3JhcHBlcikge1xyXG4gICAgICAgICAgICAgIHZhciBwYXRoID0gbGlzdGVuZXJXcmFwcGVyLnBhdGg7XHJcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyV3JhcHBlci5saXN0ZW5lcnM7IC8vIGFuIEFycmF5IG9mIGxpc3RlbmVycyBhZGRlZFxyXG4gICAgICAgICAgICAgIC8vIHlvdSBjYW4gc3RvcmUgdGhlIHdyYXBwZXIgc29tZXdoZXJlIHRvIGxhdGVyIGNhbGwgJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJvb20odXBkYXRlZF9yb29tX2lkLCByb29tX2ZyaWVuZF9pZDphbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvcm9vbXMvJyArIHVwZGF0ZWRfcm9vbV9pZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tc1tyZXN1bHRbJ2tleXMnXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBzeW5jUm9vbU1lc3NhZ2VzKHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21faWQsIHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSwgXCIvcm9vbXMvXCIrcm9vbV9pZCtcIi9tZXNzYWdlc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tTWVzc2FnZXMocm9vbV9pZDpzdHJpbmcsIG1lc3NhZ2VzOmFueSl7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZXMpO1xyXG4gICAgICAgIHRoaXMucm9vbXNbcm9vbV9pZF0gPSB7fTtcclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlcykpO1xyXG4gICAgICAgIGlmKHJvb21faWQgPT0gdGhpcy5zZWxlY3RlZFJvb21JRCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5qc29uVG9BcnJheShtZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgIH1cclxuICAgIHNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKG1lc3NhZ2VBcnJheSl7XHJcbiAgICAgICAgaWYobWVzc2FnZUFycmF5PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2E7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlX2I7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGEpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9hID0gYVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGIpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9iID0gYltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlX2FbJ3RpbWVzdGFtcCddWyd0aW1lJ10gLSBtZXNzYWdlX2JbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBtZXNzYWdlIDpcclxuICAgIC8vIFRoaXMgd2lsbCBiYSBhY3RpdmF0ZWQgd2hlbiB1c2VyIHNlbmQgYSBtZXNzYWdlIHRvIGZyaWVuZCBhZnRlciBpbnZpdGUgZnJpZW5kLlxyXG4gICAgcHVzaEZyaWVuZE9uUm9vbSh1c2VyOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3Jvb21zLycrcm9vbV9pZCtcIi9yb29tX3VzZXJzL1wiK3VpZCwgdXNlclt1aWRdKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIHJvb21faWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFNlbGVjdGVkRnJpZW5kSUQoc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZElEID0gc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGVkRnJpZW5kSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDEuIGdlbmVyYXRlIHJvb20gaWRcclxuICAgIGdlbmVyYXRlUm9vbVdpdGhTZWxlY3RlZEZyaWVuZHModXNlcjphbnksIGZyaWVuZDphbnkpe1xyXG4gICAgICAgIHZhciBmcmllbmRfaWQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmcmllbmRfaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVzZXJfaWQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgdXNlcl9pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayByb29tIGV4aXN0IGJlZm9yZSBnZW5lcmF0ZS5cclxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGZyaWVuZCBjaGF0IHJvb20gaXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHJvb20uXHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQudmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGlzdCByb29tIHdpdGggZnJpZW5kX2lkOiBcIiArIGZyaWVuZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZW5fcm9vbSA9IHtyb29tX3VzZXJzOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ2lzT3BlbiddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuX3Jvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5fcm9vbVsnY2xvc2VUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgb3Blbl9yb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIGZyaWVuZCwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKGZyaWVuZCwgdXNlciwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHZW5lcmF0ZWRSb29tSUQocmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQyLmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIGV4aXN0LCBkb24ndCBtYWtlIG5ldyBvbmUuXHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3Qgcm9vbTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXJfaWQgKyAnL3VzZXJfcm9vbXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLlZBTFVFLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IGZyaWVuZF9pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICAgIC8vIDIuIHNldCBhdXRoZW50aWNhdGlvbiBmb3Igcm9vbXMgb24gdXNlciBkYXRhYmFzZVxyXG4gICAgcHVzaFJvb21JRE9uVXNlcih1c2VyOmFueSwgZnJpZW5kOmFueSwgcm9vbV9pZDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyX3Jvb20gPSB7fTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2luUm9vbSddID0gdHJ1ZTtcclxuICAgICAgICB1c2VyX3Jvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJfcm9vbVsnbGVhdmVUaW1lJ10gPSBcIlwiO1xyXG4gICAgICAgIGZvcih2YXIgZnJpZW5kX2lkIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdXNlcl9yb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZF9pZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfcm9vbVsndGl0bGUnXSA9IGZyaWVuZFtmcmllbmRfaWRdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyX3Jvb21bJ21lc3NhZ2VJY29uJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wicHJvZmlsZVBpY3NyY1wiXTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCByb29tIGFjY2VzcyBhdGhlbnRpY2F0aW9uIG9uIHVzZXIgZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX3Jvb21zLycrcm9vbV9pZCwgZnJpZW5kX2lkKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBjYW4gd3JpdGUgb24gY2hhdCByb29tXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jvb21faWQrJy9yb29tX3VzZXJzLycrdWlkLCB1c2VyX3Jvb20pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1Jvb21NZXNzYWdlcyhyb29tX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jUm9vbShyb29tX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBtZXNzYWdlcyA6XHJcbiAgICBwdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZV9wYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VfcGFja1sndXNlciddID0gdWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbV9pZCsnL21lc3NhZ2VzJywgbWVzc2FnZV9wYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1BdXRoIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBtYWtlIGFycmF5IHR5cGUgZGF0YWJhc2UgYW5kIHB1c2ggZGF0YSBpbiBhcnJheSB0eXBlIGRhdGFiYXNlXHJcbiAgICBwdXNoSW5BcnJheURhdGFiYXNlKGRhdGFiYXNlT2ZBcnJheVBhdGg6c3RyaW5nLCBwdXNoRGF0YTphbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlT2ZBcnJheVBhdGgsIHB1c2hEYXRhKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtlIGRhdGEgc3RydWN0dXJlIG9mIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIG1ha2VTdHJ1Y3R1cmVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgc3RydWN0dXJlOiBhbnkpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHN0cnVjdHVyZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGF0dHJpYnV0ZSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlIGFuZCB1cGRhdGUgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICB3cml0ZVZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcsIHVwZGF0ZURhdGE6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsIHVwZGF0ZURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyByZWFkIGRhdGEgaW4gdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgcmVhZFZhbHVlT2ZWYWx1ZURhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGNvbXBsZXggcXVlcnlcclxuICAgIHF1ZXJ5T25EYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXHJcbiAgICAgICAgICAgICAgICAvLyAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VQYXRoLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3QnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IG9ubHkgY29tcGFuaWVzICdzaW5jZScgYSBjZXJ0YWluIHllYXIgKFRlbGVyaWsncyB2YWx1ZSBpcyAyMDAwLCB3aGljaCBpcyBpbWFnaW5hcnkgYnR3KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBlaXRoZXIgYSAncmFuZ2UnXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAuLiBvciAnY2hhaW4nIHJhbmdlcyBsaWtlIHRoaXM6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhbmdlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLlNUQVJUX0FULFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAxOTk5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVORF9BVCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWx1ZTogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIF0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgdGhlIGZpcnN0IDIgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIChub3RlIHRoYXQgdGhlcmUncyBvbmx5IDEgaW4gdGhpcyBjYXNlIGFueXdheSlcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy8gcXVlcnkgcmVzdWx0XHJcbiAgICBvblF1ZXJ5RXZlbnQocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXHJcbiAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcclxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHF1ZXJ5VGVzdCgpe1xyXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c2VycycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LnZhbHVlWydheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJ10pKVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyByZWFkVXNlck5hbWUoKXtcclxuICAgIC8vICAgICB2YXIgdXNlcklkID0gZmlyZWJhc2VXZWIuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgIC8vICAgICByZXR1cm4gZmlyZWJhc2VXZWIuZGF0YWJhc2UoKS5yZWYoJy91c2Vycy8nICsgdXNlcklkKS5vbmNlKCd2YWx1ZScpLnRoZW4oZnVuY3Rpb24oc25hcHNob3QpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHVzZXJuYW1lID0gKHNuYXBzaG90LnZhbCgpICYmIHNuYXBzaG90LnZhbCgpLnVzZXJuYW1lKSB8fCAnQW5vbnltb3VzJztcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICByZWdpc3RlcihlbWFpbCwgcGFzc3dkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd2RcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Jbml0IFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBnZXQgY3VycmVuZFVzZXJcclxuICAgIGxvZ2luKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVXNlcih1c2VyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldEF1dGhVc2VyKHVzZXI6ZmlyZWJhc2UuVXNlcil7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgLy8gc2V0IHRoaXNVc2VyXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoaXNVc2VyKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIC8vIHNldCBmcmllbmRzXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlci51aWQgKyAnL2ZyaWVuZHMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IHJvb21zXHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyAnL3VzZXJfcm9vbXMnKS50aGVuKHJlc3VsdCA9PntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdF9rZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiByZXN1bHQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0X2tleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdF9rZXlzKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcImdldEZyaWVuZHNBbmRUaGlzVXNlckZyb21EYXRhYmFzZSBFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgc2V0VGhpc1VzZXIocmVzdWx0OmFueSl7XHJcbiAgICAgICAgdmFyIGtleSA9IHJlc3VsdC5rZXk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgIHZhciB1c2VyID0ge307XHJcbiAgICAgICAgdXNlcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGhpc1VzZXIpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRfaWRzOnN0cmluZ1tdKXsgXHJcbiAgICAgICAgY29uc29sZS5sb2coZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDsgICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZnJpZW5kX2lkcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQ9PWZyaWVuZF9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldEZyaWVuZHMoZnJpZW5kX2lkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGZyaWVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyaWVuZFsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddID0gdGhpcy5nZXRGcmllbmRzKClbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hGcmllbmRPblJvb20odGhpcy50aGlzVXNlcixcIi1MUExWTlZGMnlNMU16eUctRDcxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaE1lc3NhZ2VPblJvb20oXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiLCB0aGlzLnRoaXNVc2VyLCBcImhpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdlbmVyYXRlUG9zdCh0aGlzLnRoaXNVc2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGRGcmllbmQoZnJpZW5kKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZHNba2V5XSA9IGZyaWVuZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdldFVzZXJzQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpKTtcclxuICAgIH1cclxuICAgIHNldEZyaWVuZEFycmF5KCk6IHZvaWR7XHJcblx0XHR0aGlzLmZyaWVuZEFycmF5ID0gdGhpcy5qc29uVG9BcnJheSh0aGlzLmdldEZyaWVuZHMoKSk7XHJcblx0fVxyXG4gICAgc2V0Um9vbXMocm9vbV9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICBjb25zb2xlLmxvZyhyb29tX2lkcyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHJvb21faWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvcm9vbXMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb29tX2lkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvb20ocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09cm9vbV9pZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJvb21BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICAgICAgdGhpcy5zeW5jUm9vbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuICAgICAgICB0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuICAgICAgICAvLyB0aGlzLmFkZF9jb21tZW50KCdqM1hlVklyb0FKd0xxU0Q1cmU2Qycse2hlbGxvOidoZWxsbyd9KTtcclxuICAgICAgICAvLyBmb3IodmFyIGk9MDtpPHRoaXMudGVzdF9kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFkZF9wb3N0KHRoaXMudGVzdF9kYXRhW2ldKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hfcG9zdChcImNoYXRcIiwzLDM3LjMyMzk3MiwgMTI3LjEyNTEwOSAsMTAwMDAwKTtcclxuICAgICAgICAvLyB0aGlzLnNlYXJjaF9xdWVyaWVzKFwiY2hhdFwiLFsxLDIsMyw0LDUsNiw3LDgsOV0sMzcuMzIzOTcyLCAxMjcuMTI1MTA5ICwxMDAwMDApO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RmlsZVVSTCgnYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMicsJ2d0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZycpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0X3VzZXJfcG9zdHMoXCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICB9XHJcbn1cclxuIl19