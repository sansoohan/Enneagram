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
        else if (fileType === "profile" || fileType === "background") {
            fileClass = "/profile/";
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
        else if (imageType === "profile" || imageType === "background") {
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
                    _this.pushMessageOnRoom("-LPLVNVF2yM1MzyG-D71", _this.thisUser, "hi");
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
        // this.add_comment('j3XeVIroAJwLqSD5re6C',{hello:'hello'});
        // for(var i=0;i<this.test_data.length;i++){
        //     this.add_post(this.test_data[i]);
        // }
        // this.search_post("chat",3,37.323972, 127.125109 ,100000);
        // this.search_queries("chat",[1,2,3,4,5,6,7,8,9],37.323972, 127.125109 ,100000);
        // this.getFileURL('asqU21QzltYOgnT5MDcgWotRJwH2','gteton-schwabachers-landing_dollar_680.jpg');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFHL0QsNERBQTREO0FBRzVELDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUEyQkkseUJBQ1ksZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUExQnZDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFFLENBQUM7UUFxQlosMEJBQXFCLEdBQWUsRUFBRSxDQUFDO1FBSzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztnQkFDZCxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsTUFBTTtnQkFDZCxPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsRUFBRTtnQkFDaEIsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsTUFBTSxFQUFHLElBQUk7Z0JBQ2IsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsSUFBSSxFQUFHLEVBQUU7Z0JBQ1QsUUFBUSxFQUFHO29CQUNULElBQUksRUFBRyxFQUFFO29CQUNULEdBQUcsRUFBRyxDQUFDO29CQUNQLEtBQUssRUFBRyxFQUFFO29CQUNWLE9BQU8sRUFBRyxFQUFFO29CQUNaLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLElBQUksRUFBRyxhQUFhO29CQUNwQixjQUFjLEVBQUcsQ0FBQyxHQUFHO29CQUNyQixJQUFJLEVBQUcsR0FBRztpQkFDWDtnQkFDRCxLQUFLLEVBQUcsRUFBQyw4QkFBOEIsRUFBRyxPQUFPLEVBQUM7Z0JBQ2xELElBQUksRUFBRyxNQUFNO2FBQ2Q7WUFDRDtnQkFDRSxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsTUFBTTtnQkFDZCxPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsZ3FCQUFncUI7Z0JBQzlxQixLQUFLLEVBQUcsOE1BQThNO2dCQUN0TixNQUFNLEVBQUcsSUFBSTtnQkFDYixLQUFLLEVBQUcsR0FBRztnQkFDWCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixJQUFJLEVBQUcsc0JBQXNCO2dCQUM3QixRQUFRLEVBQUc7b0JBQ1QsSUFBSSxFQUFHLEVBQUU7b0JBQ1QsR0FBRyxFQUFHLENBQUM7b0JBQ1AsS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osSUFBSSxFQUFHLGFBQWE7b0JBQ3BCLGNBQWMsRUFBRyxDQUFDLEdBQUc7b0JBQ3JCLElBQUksRUFBRyxHQUFHO2lCQUNYO2dCQUNELEtBQUssRUFBRyxFQUFDLDhCQUE4QixFQUFHLE9BQU8sRUFBQztnQkFDbEQsSUFBSSxFQUFHLE1BQU07YUFDZDtZQUNEO2dCQUNFLFFBQVEsRUFBRyxFQUFFO2dCQUNiLE9BQU8sRUFBRyxFQUFFO2dCQUNaLE1BQU0sRUFBRyxDQUFDO2dCQUNWLEtBQUssRUFBRyxNQUFNO2dCQUNkLE9BQU8sRUFBRyxFQUFFO2dCQUNaLFNBQVMsRUFBRyxFQUFFO2dCQUNkLFdBQVcsRUFBRyxpZ0RBQWlnRDtnQkFDL2dELEtBQUssRUFBRyx3ZUFBd2U7Z0JBQ2hmLE1BQU0sRUFBRyxJQUFJO2dCQUNiLEtBQUssRUFBRyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLElBQUksRUFBRyx1QkFBdUI7Z0JBQzlCLFFBQVEsRUFBRztvQkFDVCxJQUFJLEVBQUcsRUFBRTtvQkFDVCxHQUFHLEVBQUcsQ0FBQztvQkFDUCxLQUFLLEVBQUcsQ0FBQztvQkFDVCxPQUFPLEVBQUcsRUFBRTtvQkFDWixLQUFLLEVBQUcsQ0FBQztvQkFDVCxPQUFPLEVBQUcsQ0FBQztvQkFDWCxJQUFJLEVBQUcsYUFBYTtvQkFDcEIsY0FBYyxFQUFHLENBQUMsR0FBRztvQkFDckIsSUFBSSxFQUFHLEdBQUc7aUJBQ1g7Z0JBQ0QsS0FBSyxFQUFHLEVBQUMsOEJBQThCLEVBQUcsT0FBTyxFQUFDO2dCQUNsRCxJQUFJLEVBQUcsTUFBTTthQUNkO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFHLEVBQUU7Z0JBQ2IsT0FBTyxFQUFHLEVBQUU7Z0JBQ1osTUFBTSxFQUFHLENBQUM7Z0JBQ1YsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsT0FBTyxFQUFHLEVBQUU7Z0JBQ1osU0FBUyxFQUFHLEVBQUU7Z0JBQ2QsV0FBVyxFQUFHLG94Q0FBb3hDO2dCQUNseUMsS0FBSyxFQUFHLG9OQUFvTjtnQkFDNU4sTUFBTSxFQUFHLElBQUk7Z0JBQ2IsS0FBSyxFQUFHLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsSUFBSSxFQUFHLDJCQUEyQjtnQkFDbEMsUUFBUSxFQUFHO29CQUNULElBQUksRUFBRyxFQUFFO29CQUNULEdBQUcsRUFBRyxDQUFDO29CQUNQLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLElBQUksRUFBRyxhQUFhO29CQUNwQixjQUFjLEVBQUcsQ0FBQyxHQUFHO29CQUNyQixJQUFJLEVBQUcsR0FBRztpQkFDWDtnQkFDRCxLQUFLLEVBQUcsRUFBQyw4QkFBOEIsRUFBRyxPQUFPLEVBQUM7Z0JBQ2xELElBQUksRUFBRyxNQUFNO2FBQ2Q7WUFDRDtnQkFDRSxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsS0FBSztnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsMmpDQUEyakM7Z0JBQ3prQyxLQUFLLEVBQUcsME1BQTBNO2dCQUNsTixNQUFNLEVBQUcsSUFBSTtnQkFDYixLQUFLLEVBQUcsR0FBRztnQkFDWCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixJQUFJLEVBQUcsNEJBQTRCO2dCQUNuQyxRQUFRLEVBQUc7b0JBQ1QsSUFBSSxFQUFHLEVBQUU7b0JBQ1QsR0FBRyxFQUFHLENBQUM7b0JBQ1AsS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osSUFBSSxFQUFHLGFBQWE7b0JBQ3BCLGNBQWMsRUFBRyxDQUFDLEdBQUc7b0JBQ3JCLElBQUksRUFBRyxHQUFHO2lCQUNYO2dCQUNELEtBQUssRUFBRyxFQUFDLDhCQUE4QixFQUFHLE9BQU8sRUFBQztnQkFDbEQsSUFBSSxFQUFHLE1BQU07YUFDZDtZQUNEO2dCQUNFLFFBQVEsRUFBRyxFQUFFO2dCQUNiLE9BQU8sRUFBRyxFQUFFO2dCQUNaLE1BQU0sRUFBRyxDQUFDO2dCQUNWLEtBQUssRUFBRyxFQUFFO2dCQUNWLE9BQU8sRUFBRyxFQUFFO2dCQUNaLFNBQVMsRUFBRyxFQUFFO2dCQUNkLFdBQVcsRUFBRywyMkJBQTIyQjtnQkFDejNCLEtBQUssRUFBRyx1TkFBdU47Z0JBQy9OLE1BQU0sRUFBRyxJQUFJO2dCQUNiLEtBQUssRUFBRyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLElBQUksRUFBRyw0QkFBNEI7Z0JBQ25DLFFBQVEsRUFBRztvQkFDVCxJQUFJLEVBQUcsRUFBRTtvQkFDVCxHQUFHLEVBQUcsQ0FBQztvQkFDUCxLQUFLLEVBQUcsQ0FBQztvQkFDVCxPQUFPLEVBQUcsRUFBRTtvQkFDWixLQUFLLEVBQUcsQ0FBQztvQkFDVCxPQUFPLEVBQUcsRUFBRTtvQkFDWixJQUFJLEVBQUcsYUFBYTtvQkFDcEIsY0FBYyxFQUFHLENBQUMsR0FBRztvQkFDckIsSUFBSSxFQUFHLEdBQUc7aUJBQ1g7Z0JBQ0QsS0FBSyxFQUFHLEVBQUMsOEJBQThCLEVBQUcsT0FBTyxFQUFDO2dCQUNsRCxJQUFJLEVBQUcsTUFBTTthQUNkO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFHLEVBQUU7Z0JBQ2IsT0FBTyxFQUFHLEVBQUU7Z0JBQ1osTUFBTSxFQUFHLENBQUM7Z0JBQ1YsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsT0FBTyxFQUFHLEVBQUU7Z0JBQ1osU0FBUyxFQUFHLEVBQUU7Z0JBQ2QsV0FBVyxFQUFHLHd4Q0FBd3hDO2dCQUN0eUMsS0FBSyxFQUFHLGtOQUFrTjtnQkFDMU4sTUFBTSxFQUFHLElBQUk7Z0JBQ2IsS0FBSyxFQUFHLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsSUFBSSxFQUFHLDJCQUEyQjtnQkFDbEMsUUFBUSxFQUFHO29CQUNULElBQUksRUFBRyxFQUFFO29CQUNULEdBQUcsRUFBRyxDQUFDO29CQUNQLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLElBQUksRUFBRyxhQUFhO29CQUNwQixjQUFjLEVBQUcsQ0FBQyxHQUFHO29CQUNyQixJQUFJLEVBQUcsR0FBRztpQkFDWDtnQkFDRCxLQUFLLEVBQUcsRUFBQyw4QkFBOEIsRUFBRyxPQUFPLEVBQUM7Z0JBQ2xELElBQUksRUFBRyxNQUFNO2FBQ2Q7WUFDRDtnQkFDRSxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsTUFBTTtnQkFDZCxPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsNndDQUE2d0M7Z0JBQzN4QyxLQUFLLEVBQUcsbU1BQW1NO2dCQUMzTSxNQUFNLEVBQUcsSUFBSTtnQkFDYixLQUFLLEVBQUcsR0FBRztnQkFDWCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QixJQUFJLEVBQUcsd0JBQXdCO2dCQUMvQixRQUFRLEVBQUc7b0JBQ1QsSUFBSSxFQUFHLEVBQUU7b0JBQ1QsR0FBRyxFQUFHLENBQUM7b0JBQ1AsS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osS0FBSyxFQUFHLENBQUM7b0JBQ1QsT0FBTyxFQUFHLEVBQUU7b0JBQ1osSUFBSSxFQUFHLGFBQWE7b0JBQ3BCLGNBQWMsRUFBRyxDQUFDLEdBQUc7b0JBQ3JCLElBQUksRUFBRyxHQUFHO2lCQUNYO2dCQUNELEtBQUssRUFBRyxFQUFDLDhCQUE4QixFQUFHLE9BQU8sRUFBQztnQkFDbEQsSUFBSSxFQUFHLE1BQU07YUFDZCxDQUFDLENBQUE7SUFDUixDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNJLElBQUksY0FBYyxDQUFDO1FBQ25CLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ2pELEdBQUcsQ0FBQSxDQUFDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQzlDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBQztvQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELDBFQUEwRTtJQUUxRSx1Q0FBdUM7SUFDdkMsMENBQTBDO0lBQzFDLGtDQUFRLEdBQVIsVUFBUyxTQUFTO1FBQ2QsV0FBVyxDQUFDLFNBQVMsRUFBRTthQUN0QixVQUFVLENBQUMsT0FBTyxDQUFDO2FBQ25CLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTJCLFdBQVcsQ0FBQyxFQUFJLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCwwQ0FBZ0IsR0FBaEI7UUFDSSxXQUFXLENBQUMsU0FBUyxFQUFFO2FBQ3RCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLE9BQU8sRUFBRSxTQUFTO1FBQzFCLFdBQVcsQ0FBQyxTQUFTLEVBQUU7YUFDdEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDaEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFDSSxJQUFXLEVBQ1gsYUFBb0IsRUFDcEIsZUFBc0IsRUFDdEIsZ0JBQXVCLEVBQ3ZCLGNBQWM7UUFMbEIsaUJBNkRDO1FBdERHLElBQU0sMEJBQTBCLEdBQUcsTUFBTSxDQUFDO1FBRTFDLElBQUksbUJBQW1CLEdBQUcsZUFBZSxHQUFHLGNBQWMsR0FBQyxDQUFDLENBQUMsR0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzFGLElBQUksbUJBQW1CLEdBQUcsZUFBZSxHQUFHLGNBQWMsR0FBQyxDQUFDLENBQUMsR0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzFGLEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDMUIsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDM0IsbUJBQW1CLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksb0JBQW9CLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYyxHQUFDLENBQUMsQ0FBQyxHQUFDLDBCQUEwQixHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEksSUFBSSxvQkFBb0IsR0FBRyxnQkFBZ0IsR0FBRyxjQUFjLEdBQUMsQ0FBQyxDQUFDLEdBQUMsMEJBQTBCLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4SSxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ25ELG9CQUFvQixHQUFHLEdBQUcsQ0FBQztZQUMzQixvQkFBb0IsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7WUFDdEQsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDN0Isb0JBQW9CLEdBQUcsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO1lBQ3RELENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMsQ0FBQSxDQUFDO1lBQzVDLElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBQzVDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO1FBQ0QsOENBQThDO1FBQzlDLGtEQUFrRDtRQUNsRCw4Q0FBOEM7UUFDOUMsK0NBQStDO1FBQy9DLDJDQUEyQztRQUMzQywrQ0FBK0M7UUFDL0MsV0FBVyxDQUFDLFNBQVMsRUFBRTthQUN0QixVQUFVLENBQUMsT0FBTyxDQUFDO2FBQ25CLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQzthQUNwQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDekIsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUM7YUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUM7YUFDOUMsR0FBRyxFQUFFO2FBQ0wsSUFBSSxDQUFDLFVBQUEsYUFBYTtZQUNmLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNyQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLG1CQUFtQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksbUJBQW1CLENBQUMsQ0FBQSxDQUFDO29CQUN6Riw0RUFBNEU7b0JBQzVFLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUQsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUNJLElBQVcsRUFDWCxjQUF1QixFQUN2QixlQUFzQixFQUN0QixnQkFBdUIsRUFDdkIsY0FBcUI7UUFFckIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdGLENBQUM7SUFDTCxDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLE9BQU8sRUFBRSxZQUFZO1FBQzdCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUU7YUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDaEMsVUFBVSxDQUFDLFVBQVUsQ0FBQzthQUN0QixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsV0FBVztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUE4QixXQUFXLENBQUMsRUFBSSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Qsd0NBQWMsR0FBZCxVQUFlLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWTtRQUM1QyxXQUFXLENBQUMsU0FBUyxFQUFFO2FBQ3RCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ2hDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO2FBQ3RDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFdBQVc7SUFDWCxrQ0FBUSxHQUFSO1FBQ0ksV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ3RCLEdBQUcsQ0FBQztZQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDekIsSUFBSSxFQUFFLGVBQWU7WUFDckIsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1lBQ2QsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDSSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRSxXQUFXLENBQUMsU0FBUyxFQUFFO2FBQ3RCLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQzthQUNULE1BQU0sQ0FBQztZQUNKLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLGVBQWUsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsZUFBZSxFQUFFO1lBQ3ZFLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7U0FDekQsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1REFBNkIsR0FBN0I7UUFDSSxJQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEUsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsYUFBYTtZQUN2QyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBSSxHQUFHLENBQUMsRUFBRSxZQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFHLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFzQixHQUF0QjtRQUNJLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEYsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNqQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBRyxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNJLGtFQUFrRTtRQUNsRSxXQUFXLENBQUMsU0FBUyxFQUFFO2FBQ3RCLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDcEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQzVELEdBQUcsRUFBRTthQUNMLElBQUksQ0FBQyxVQUFBLGFBQWE7WUFDZixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBc0MsR0FBRyxDQUFDLEVBQUUsWUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBRyxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCx5REFBK0IsR0FBL0I7UUFDSSxJQUFNLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBGLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLDZEQUE2RDtJQUM3RCxvQkFBb0I7SUFDcEIsb0VBQW9FO0lBQ3BFLGNBQWM7SUFDZCxJQUFJO0lBRUosb0NBQVUsR0FBVjtRQUNJLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hFLFdBQVcsQ0FBQyxTQUFTLEVBQUU7YUFDdEIsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUNuQixHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDM0IsTUFBTSxDQUFDO1lBQ0osUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUM3RSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QseUNBQWUsR0FBZjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUNQLFdBQVcsQ0FBQyxTQUFTLEVBQUU7YUFDdEIsVUFBVSxDQUFDLFFBQVEsQ0FBQzthQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUN4QyxHQUFHLEVBQUUsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVELHdGQUF3RjtJQUd4RixrRUFBa0U7SUFDbEUsbUNBQVMsR0FBVCxVQUFVLFNBQWdCO1FBQTFCLGlCQXdCQztRQXZCSCxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ2xDLElBQUksRUFBRSxRQUFRO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsT0FBTzthQUNOLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFqQixDQUFpQixDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLFNBQVMsQ0FBQyxPQUFPLENBQ3JDLFVBQUMsYUFBeUI7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFnQjtnQkFDdEQsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7Z0JBQzFDLENBQUM7Z0JBQ2MsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7b0JBQzFDLEtBQUksQ0FBQywyQkFBMkIsR0FBRyxRQUFRLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLENBQUEsQ0FBQztvQkFDbkMsS0FBSSxDQUFDLDhCQUE4QixHQUFHLFFBQVEsQ0FBQztnQkFDakMsQ0FBQztnQkFDRCxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVKLENBQUMsQ0FBQyxFQWZrQixDQWVsQixDQUNGLENBQUMsS0FBSyxDQUFDLFVBQUMsWUFBaUIsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0osMENBQWdCLEdBQWhCLFVBQWlCLFVBQVUsRUFBRSxTQUFnQjtRQUE3QyxpQkEwQ0k7UUF6Q0gsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUMxQixpRUFBaUU7WUFDakUsK0VBQStFO1lBQy9FLHdFQUF3RTtZQUN4RSxnREFBZ0Q7WUFFaEQsK0JBQStCO1lBQy9CLDJEQUEyRDtZQUMzRCwrRUFBK0U7WUFDL0UseUNBQXlDO1lBRXpDLCtNQUErTTtZQUMvTSx1REFBdUQ7WUFDdkQsMkJBQTJCO1lBQzNCLG1CQUFtQjtZQUNuQiw2QkFBNkI7WUFDN0IsY0FBYztZQUNkLGlDQUFpQztZQUNqQyxPQUFPO1lBQ1AsTUFBTTtZQUVOLHNEQUFzRDtZQUN0RCw4Q0FBOEM7WUFDOUMsMkJBQTJCO1lBQzNCLE9BQU87WUFDUCxJQUFJO1lBRUssRUFBRSxDQUFDLENBQUMscUJBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUN2RCxDQUFDO2dCQUNiLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDO29CQUMzQixLQUFJLENBQUMsMkJBQTJCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDdkQsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxDQUFBLENBQUM7b0JBQ25DLEtBQUksQ0FBQyw4QkFBOEIsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUM5QyxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNRLGlCQUFpQjtRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsUUFBZSxFQUFFLFFBQWU7UUFBM0MsaUJBK0JDO1FBOUJHLElBQUksU0FBUyxDQUFDO1FBQ2QsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUEsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQztZQUNwQixTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUEsQ0FBQztZQUN6RCxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzVCLENBQUM7UUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN4QiwrRUFBK0U7WUFDL0UsY0FBYyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsUUFBUTtZQUNuRSw2Q0FBNkM7WUFDN0MsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNyQyw2REFBNkQ7WUFDN0QsYUFBYSxFQUFFLFFBQVE7WUFDdkIsdUNBQXVDO1lBQ3ZDLFVBQVUsRUFBRSxVQUFTLE1BQU07Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEUsQ0FBQztTQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQSxZQUFZO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFDRCxVQUFVLEtBQUs7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxvQ0FBVSxHQUFWLFVBQVcsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQW5DLGlCQThCQztRQTdCRyxJQUFJLE9BQU8sQ0FBQztRQUNaLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSSxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ3BCLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUksWUFBWSxDQUFDLENBQUEsQ0FBQztZQUN6RCxPQUFPLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDNUIseUZBQXlGO1lBQ3pGLDhDQUE4QztZQUM5Qyw2REFBNkQ7WUFDN0QsY0FBYyxFQUFFLFFBQVEsR0FBRyxHQUFHLEdBQUcsT0FBTztTQUMzQyxDQUFDLENBQUMsSUFBSSxDQUNILFVBQUEsR0FBRztZQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQSxDQUFDLFNBQVMsS0FBSSxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixLQUFJLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsU0FBUyxLQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLEtBQUksQ0FBQywwQkFBMEIsR0FBRyxHQUFHLENBQUM7WUFDMUMsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxTQUFTLEtBQUksWUFBWSxDQUFDLENBQUEsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLDZCQUE2QixHQUFHLEdBQUcsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQyxFQUNELFVBQVUsS0FBSztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELG9GQUFvRjtJQUVwRiw0RUFBNEU7SUFDNUUsZ0NBQWdDO0lBQ2hDLGtDQUFRLEdBQVIsVUFBUyxPQUFjO1FBQXZCLGlCQWNDO1FBYkcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFVBQUEsTUFBTTtZQUNqQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLEVBQUUsU0FBUyxHQUFDLE9BQU8sR0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2xDLFVBQVMsZUFBZTtZQUN0QixJQUFJLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyw4QkFBOEI7WUFDekUsMkVBQTJFO1FBQzdFLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUNELG9DQUFVLEdBQVYsVUFBVyxPQUFjLEVBQUUsUUFBWTtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMzQyxFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7WUFDL0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDRCwyQkFBMkI7SUFDL0IsQ0FBQztJQUNELHVEQUE2QixHQUE3QixVQUE4QixZQUFZO1FBQ3RDLEVBQUUsQ0FBQSxDQUFDLFlBQVksSUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM1QixJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksU0FBUyxDQUFDO1lBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDZCxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNkLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDJCQUEyQjtJQUMzQixpRkFBaUY7SUFDakYsMENBQWdCLEdBQWhCLFVBQWlCLElBQVEsRUFBRSxPQUFjO1FBQXpDLGlCQU1DO1FBTEcsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNqQixRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxPQUFPLEdBQUMsY0FBYyxHQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUMzRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsb0RBQW9EO0lBQ3BELHNDQUFZLEdBQVosVUFBYSxJQUFRO1FBQXJCLGlCQWlCQztRQWhCRyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLElBQUksU0FBUyxHQUFHLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMzQixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNwQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87b0JBQzNELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxVQUFVO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDRCwwQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBUSxFQUFFLE9BQWM7UUFDckMsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNqQixRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsY0FBYyxHQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLElBQUksSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQy9GLDhCQUE4QjtZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBR0QsK0JBQStCO0lBQy9CLDJDQUFpQixHQUFqQixVQUFrQixPQUFjLEVBQUUsSUFBUSxFQUFFLE9BQWM7UUFDdEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMvQixDQUFDO1FBQ0QsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLEdBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsa0JBQWtCO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9GQUFvRjtJQUVwRixzQ0FBWSxHQUFaLFVBQWEsSUFBUSxFQUFFLE9BQWMsRUFBRSxJQUFRO1FBQS9DLGlCQWlDQztRQWhDRyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDWCxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUMsR0FBRyxHQUFDLFNBQVMsR0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87d0JBQ3pFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxVQUFVO2dCQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxJQUFJLENBQUEsQ0FBQztnQkFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsU0FBUyxHQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUMxRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFnQixHQUFoQixVQUFpQixJQUFRLEVBQUUsT0FBYztRQUNyQyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxjQUFjLEdBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ3JFLDhCQUE4QjtZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsb0ZBQW9GO0lBRXBGLGdFQUFnRTtJQUNoRSw2Q0FBbUIsR0FBbkIsVUFBb0IsbUJBQTBCLEVBQUUsUUFBWTtRQUN4RCxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUE2QztJQUM3QyxzREFBNEIsR0FBNUIsVUFBNkIsWUFBbUIsRUFBRSxTQUFjO1FBQzVELFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhFQUE4RTtJQUM5RSxtREFBeUIsR0FBekIsVUFBMEIsWUFBbUIsRUFBRSxVQUFlO1FBQzFELFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQy9CLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELG1DQUFtQztJQUNuQyxrREFBd0IsR0FBeEIsVUFBeUIsWUFBbUI7UUFDeEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDL0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGdCQUFnQjtJQUNoQix5Q0FBZSxHQUFmLFVBQWdCLFlBQW1CO1FBQW5DLGlCQThDQztRQTdDRyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUMvQixRQUFRLENBQUMsS0FBSyxDQUNWLEtBQUksQ0FBQyxZQUFZO1lBQ2pCLFlBQVk7WUFDWixTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLEVBQ25DO2dCQUNJLGdHQUFnRztnQkFDaEcsNkNBQTZDO2dCQUM3Qyw2RUFBNkU7Z0JBQzdFLFdBQVcsRUFBRSxJQUFJO2dCQUNqQiwyQkFBMkI7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7b0JBQ3JDLEtBQUssRUFBRSxNQUFNLENBQUMsaUNBQWlDO2lCQUNsRDtnQkFDRCw4RkFBOEY7Z0JBQzlGLHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDViw2Q0FBNkM7Z0JBQzdDLGlCQUFpQjtnQkFDakIsS0FBSztnQkFDTCxrQ0FBa0M7Z0JBRWxDLFlBQVk7Z0JBQ1osTUFBTTtnQkFDTixnREFBZ0Q7Z0JBQ2hELG9CQUFvQjtnQkFDcEIsT0FBTztnQkFDUCxNQUFNO2dCQUNOLDhDQUE4QztnQkFDOUMsb0JBQW9CO2dCQUNwQixNQUFNO2dCQUNOLEtBQUs7Z0JBRUwsMkJBQTJCO2dCQUMzQixpREFBaUQ7Z0JBQ2pELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUNsQyxLQUFLLEVBQUUsQ0FBQztpQkFDWDthQUNKLENBQ0o7aUJBQ0EsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQW5DLENBQW1DLENBQUM7aUJBQ25ELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7WUFBQSxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELGVBQWU7SUFDZixzQ0FBWSxHQUFaLFVBQWEsTUFBTTtRQUNmLGdEQUFnRDtRQUNoRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYsbUNBQVMsR0FBVDtRQUNJLFFBQVEsQ0FBQyxLQUFLLENBQ1YsVUFBUyxNQUFNO1FBRWYsQ0FBQyxFQUNELFFBQVEsRUFDUjtZQUNJLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7Z0JBQ25DLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUTtnQkFDdEMsS0FBSyxFQUFFLDhCQUE4QjthQUN4QztTQUNKLENBQ0o7YUFDQSxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUF6RCxDQUF5RCxDQUFDO2FBQ3pFLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFBQSxDQUFDO0lBQ3JELENBQUM7SUFHRCxrQkFBa0I7SUFDbEIsdURBQXVEO0lBQ3ZELG9HQUFvRztJQUNwRyxxRkFBcUY7SUFDckYsVUFBVTtJQUNWLElBQUk7SUFFSixrQ0FBUSxHQUFSLFVBQVMsS0FBSyxFQUFFLE1BQU07UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDdkIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsTUFBTTtTQUNuQixDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsTUFBVTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsVUFBVSxZQUFnQjtZQUN0QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBR0Qsb0ZBQW9GO0lBRXBGLGtCQUFrQjtJQUNsQiwrQkFBSyxHQUFMLFVBQU0sSUFBSTtRQUFWLGlCQWVDO1FBZEcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNYLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7WUFDakMsZUFBZSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQzFCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQVc7WUFDaEIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7WUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFFLFVBQUMsWUFBaUI7WUFDakIsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLHdDQUFjLEdBQXJCO1FBQUEsaUJBSUM7UUFIRyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUMvQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHFDQUFXLEdBQVgsVUFBWSxJQUFrQjtRQUE5QixpQkFzQkM7UUFyQkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsZUFBZTtRQUNmLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQy9DLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztRQUNsRCxjQUFjO1FBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzVELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDdkIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBQ0QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLEtBQUssQ0FBQyxFQUFoRSxDQUFnRSxDQUFDLENBQUM7UUFDcEYsWUFBWTtRQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDeEUsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN2QixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLEVBQWhFLENBQWdFLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLE1BQVU7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0Qsb0NBQVUsR0FBVixVQUFXLFVBQW1CO1FBQTlCLGlCQXNDQztRQXJDRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxLQUFLLENBQ1YsVUFBUyxNQUFNLElBQUUsQ0FBQyxFQUNsQixRQUFRLEVBQ1I7Z0JBQ0ksV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7b0JBQ25DLEtBQUssRUFBRSxLQUFLO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRO29CQUN0QyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2xDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0osQ0FDSjtpQkFDQSxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNSLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixLQUFLLEVBQUUsQ0FBQztnQkFDUixFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3pCLCtCQUErQjtvQkFDL0IsbUJBQW1CO29CQUNuQiw4RkFBOEY7b0JBQzlGLCtEQUErRDtvQkFDL0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BFLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsb0NBQW9DO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7WUFBQSxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBR0QsbUNBQVMsR0FBVCxVQUFVLE1BQU07UUFDWixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxzREFBc0Q7SUFDMUQsQ0FBQztJQUNELHdDQUFjLEdBQWQ7UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNFLGtDQUFRLEdBQVIsVUFBUyxRQUFpQjtRQUExQixpQkFrQ0M7UUFqQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsS0FBSyxDQUNWLFVBQVMsTUFBTSxJQUFFLENBQUMsRUFDbEIsUUFBUSxFQUNSO2dCQUNJLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO29CQUNuQyxLQUFLLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUTtvQkFDdEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUNsQyxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKLENBQ0o7aUJBQ0EsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDUix1QkFBdUI7Z0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixLQUFLLEVBQUUsQ0FBQztnQkFDUixFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ3ZCLDJCQUEyQjtvQkFDM0IsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7WUFBQSxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBQ0QsaUNBQU8sR0FBUCxVQUFRLElBQUk7UUFDUixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFDTSxzQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRCw0REFBNEQ7UUFDNUQsNENBQTRDO1FBQzVDLHdDQUF3QztRQUN4QyxJQUFJO1FBQ0osNERBQTREO1FBQzVELGlGQUFpRjtRQUNqRixnR0FBZ0c7SUFDdkcsQ0FBQztJQUVTLHFDQUFXLEdBQWxCLFVBQW1CLElBQUk7UUFDbkIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDWCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNqQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFrQixHQUF6QixVQUEwQixlQUFzQjtRQUM1QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBQ00sNENBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNNLG9DQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sa0NBQVEsR0FBZjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDSSxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBdmtDUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBNkJxQix5QkFBZ0I7T0E1QnJDLGVBQWUsQ0F3a0MzQjtJQUFELHNCQUFDO0NBQUEsQUF4a0NELElBd2tDQztBQXhrQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIGF1dGh1c2VyOiBmaXJlYmFzZS5Vc2VyO1xyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVXNlcnM6IGFueTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG5cdHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVVUkw6IHN0cmluZztcclxuXHJcbiAgICB0ZXN0X2RhdGE6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHBvc3RTZWFyY2hSZXN1bHRBcnJheTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUG9zdElEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG4gICAgICAgIHRoaXMudGVzdF9kYXRhID0gW3tcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogOSxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcIlwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IFwiXCIsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjUyNDA2MDQ4MDA5NDYsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyMDk4NTg3MzA0MzU0LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI1LFxyXG4gICAgICAgICAgICAgIGRheSA6IDQsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiAyMCxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNTAsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0NCxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDQ2ODI0NDQwMCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIjVGZ3Jld0phMk1oOUM1OThrNzBIUTQwYjFxdTFcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMixcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJNYXJ2ZWwgYXQgbW9yZSB0aGFuIDIsMDAwIG5hdHVyYWwgcm9jayBhcmNoZXMgYXQgdGhpcyBwYXJrIGp1c3Qgb3V0c2lkZSBvZiBNb2FiLiBTb21lIG9mIHRoZSBmb3JtYXRpb25zIGNhbiBiZSBzcG90dGVkIGZyb20gdGhlIHJvYWQsIGJ1dCB0aGUgYmVzdCByZXF1aXJlIGEgc2NlbmljIGhpa2UuIERvbuKAmXQgbWlzcyB0aGUgZmFtb3VzIERlbGljYXRlIEFyY2ggKDMgbWlsZXMgcm91bmQtdHJpcCkgb3IgdGhlIDctbWlsZSAocm91bmQtdHJpcCkgRGV2aWxzIEdhcmRlbiBMb29wLlxcblxcblRoZSBQYXJrIEF2ZW51ZSBUcmFpbCBpcyB0aGUgbW9zdCBwb3B1bGFyIGhpa2UgaW4gdGhlIHBhcmsgYmVjYXVzZSBvZiBpdHMgZWFzZSBhbmQgc2NlbmVyeSBhdCBqdXN0IDIgbWlsZXMgcm91bmQgdHJpcC4gT3IgdHJ5IHRoZSBtb3JlIGNoYWxsZW5naW5nIGhpa2UgdG8gRGVsaWNhdGUgQXJjaGVzIGF0IDMuMiBtaWxlcyByb3VuZCB0cmlwLlxcblxcbldoZXRoZXIgeW91IGFyZSBjYW1waW5nIG9yIHN0YXlpbmcgaW4gYSBob3RlbCwgZG9u4oCZdCBmb3JnZXQgdG8gc3BlbmQgc29tZSB0aW1lIGxvb2tpbmcgdXAgYXQgdGhlIHNreSBhZnRlciBuaWdodCBmYWxscy4gWW914oCZbGwgZmluZCBzb21lIG9mIHRoZSBkYXJrZXN0IHNraWVzIGluIGFuZCBhcm91bmQgVXRhaOKAmXMgbmF0aW9uYWwgcGFya3MuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiUyRmFyY2hlcy1kZWxpY2F0ZS1hcmNoLXNreV9hZG9iZV82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj02Y2I0OGFiNS05NmY1LTQzYjItOWVhMS02NzQ5Y2RiZWQzOGZcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAyNDUsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjMwODA0NjkyNTIyNTQsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyMjU1Nzk4MjgwMjM4LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJBcmNoZXMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM0LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDksXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDEyODk5MTgsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDgsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTmlja25hbWVkIHRoZSBcXFwiQ3Jvd24gb2YgdGhlIENvbnRpbmVudCxcXFwiIEdsYWNpZXIgTmF0aW9uYWwgUGFyayBzaXRzIGluIHRoZSBub3J0aHdlc3QgY29ybmVyIG9mIE1vbnRhbmEuIEdsYWNpZXIgTmF0aW9uYWwgUGFyayBpcyBqdXN0IGEgc2NlbmljIGRheeKAmXMgZHJpdmUgbm9ydGggZnJvbSBZZWxsb3dzdG9uZS5cXG5cXG5IaXQgdGhlIHRyYWlsIHRvIGV4cGxvcmUgcGxhY2VzIGxpa2UgRmlzaGVyY2FwIExha2UgKHBpY3R1cmVkKSwgd2hpY2ggaXMgYSBncmVhdCBwbGFjZSB0byBzcG90IGEgbW9vc2UuIEZyb20gTWFueSBHbGFjaWVyIENhbXBncm91bmQsIGdvIHRvIHRoZSBTd2lmdGN1cnJlbnQgTW90b3IgSW5uIHBhcmtpbmcgbG90LiBUaGUgdHJhaWxoZWFkIGlzIG9uIHRoZSB3ZXN0IGVuZC4gWW91J2xsIGZpbmQgdGhlIGxha2UgbGVzcyB0aGFuIGEgbWlsZSBkb3duIHRoZSB0cmFpbC4gQ29udGludWUgMS41IG1pbGVzIHRvIFJlZHJvY2sgTGFrZSBhbmQgdGFrZSBhIHNwdXIgdG8gUmVkcm9jayBGYWxscy5cXG5cXG5BIE5hdGlvbmFsIEhpc3RvcmljIExhbmRtYXJrLCBHb2luZy10by10aGUtU3VuIFJvYWQgaXMgb25lIG9mIHRoZSBtb3N0IHNjZW5pYyByb2FkcyBpbiBOb3J0aCBBbWVyaWNhLCBub3QgdG8gbWVudGlvbiBvbmUgb2YgdGhlIG1vc3QgY29tcGxleCB0byBidWlsZC4gVGhlIGZpbmFsIHNlY3Rpb24sIG92ZXIgTG9nYW4gUGFzcywgd2FzIGNvbXBsZXRlZCBpbiAxOTMyIGFmdGVyIDExIHllYXJzIG9mIHdvcmsuIENvbnNpZGVyZWQgYW4gZW5naW5lZXJpbmcgZmVhdCwgdGhlIGNvbnN0cnVjdGlvbiBvZiB0aGUgcm9hZCBmb3JldmVyIGNoYW5nZWQgdGhlIHdheSB2aXNpdG9ycyB3b3VsZCBleHBlcmllbmNlIEdsYWNpZXIgTmF0aW9uYWwgUGFyay4gRnV0dXJlIHZpc2l0b3JzIHdvdWxkIGJlIGFibGUgdG8gZHJpdmUgb3ZlciBzZWN0aW9ucyBvZiB0aGUgcGFyayB0aGF0IHByZXZpb3VzbHkgaGFkIHRha2VuIGRheXMgb2YgaG9yc2ViYWNrIHJpZGluZyB0byBzZWUuXFxuXFxuSW4gdGhlaXIgYWJpbGl0eSB0byB3b3cgdmlzaXRvcnMsIFllbGxvd3N0b25lIGFuZCBHbGFjaWVyIHNoYXJlIGEgY29tbW9uIGJvbmQuIEJ1dCBhcyB3aXRoIGFueSBncmVhdCBkZXN0aW5hdGlvbiwgdGhlcmUgYXJlIHNvbWUgYWR2ZW50dXJlcyB0aGF0IGFyZSBmb3VuZCBub3doZXJlIGVsc2UuIEdsYWNpZXIgcHJlc2VydmVzIG92ZXIgMSwwMDAsMDAwIGFjcmVzIG9mIGZvcmVzdHMsIGFscGluZSBtZWFkb3dzIGFuZCBsYWtlcy4gSXRzIGRpdmVyc2UgaGFiaXRhdHMgYXJlIGhvbWUgdG8gb3ZlciA3MCBzcGVjaWVzIG9mIG1hbW1hbHMgYW5kIG92ZXIgMjYwIHNwZWNpZXMgb2YgYmlyZHMuIFRoZSBzcGVjdGFjdWxhciBnbGFjaWF0ZWQgbGFuZHNjYXBlIGlzIGEgaGlrZXLigJlzIHBhcmFkaXNlLCBjb250YWluaW5nIDcwMCBtaWxlcyBvZiBtYWludGFpbmVkIHRyYWlscyB0aGF0IGxlYWQgZGVlcCBpbnRvIG9uZSBvZiB0aGUgbGFyZ2VzdCBpbnRhY3QgZWNvc3lzdGVtcyBpbiB0aGUgbG93ZXIgNDggc3RhdGVzLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAyJTJGZ2xhY2llci1hdmFsYWNoZS1sYWtlLWtpZHNfYWRvYmVfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49NTA4NzBjNWUtYjFlNi00ZDUxLWJlOWEtZDljZDJkNjI3MjQyXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMTUyLFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIxNjAyMzA1NjY0MjMsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyODA2MDE5OTMyMDMzLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJHbGFjaWVyIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDMsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE1NDM3OTQsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDYsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJKdXN0IDE1IG1pbGVzIHNvdXRoIG9mIE1vYWIsIGhpa2UgeW91ciB3YXkgdGhyb3VnaCAzMzcsIDU5OCBhY3JlcyBvZiBkcmFtYXRpYyByZWQtcm9jayBsYW5kc2NhcGUgaW4gQ2FueW9ubGFuZHMgTlAsIGFuZCBkbyBpdCBhbGwgd2l0aG91dCBoYXZpbmcgdG8gY29tcGV0ZSBmb3Igcm9vbSBvbiB0aGUgdHJhaWwgLSBDYW55b25sYW5kcyBpcyBib3RoIFV0YWjigJlzIGxhcmdlc3QgYW5kIGxlYXN0IHZpc2l0ZWQgcGFyay5cXG5cXG5UaGUgcml2ZXItY2FydmVkIHBhcmsgYm9hc3RzIDM2MC1kZWdyZWUgdmlld3Mgb2YgcnVzdC1jb2xvcmVkIGFyY2hlcywgYnV0dGVzLCBhbmQgY2xpZmZzIC0gYnV0IGJlY2F1c2Ugb2YgdGhlIGhpZ2gtZGVzZXJ0IHJvY2sgZW52aXJvbm1lbnQsIGl0cyBjbGltYXRlIGlzIHN1YmplY3QgdG8gZXh0cmVtZSB0ZW1wZXJhdHVyZSBmbHVjdHVhdGlvbnMuIFNraXAgcGFja2luZyB0aGUgcGFya2EsIGFuZCBnbyBpbiB0aGUgc3ByaW5nIG9yIGZhbGwgZm9yIHRoZSBtb3N0IG1vZGVyYXRlLCBhbmQgbW9zdCBmb3JnaXZpbmcsIHdlYXRoZXIuXFxuXFxuU28gZXhwYW5zaXZlIGl04oCZcyBkaXZpZGVkIGludG8gZm91ciBkaXN0cmljdHMsIENhbnlvbmxhbmRzIGRlbGl2ZXJzIGEgcXVpbnRlc3NlbnRpYWwgZGVzZXJ0IGV4cGVyaWVuY2U6IGRlZXAgY2FueW9ucywgcHJlaGlzdG9yaWMgcm9jayBhcnQsIHJpdmVycywgYW5kIHN3ZWVwaW5nIG92ZXJsb29rcy5cXG5cXG5BbW9uZyB0aGUgZXhjZXB0aW9uYWwsIHN0cmlhdGVkIHJvY2sgZm9ybWF0aW9ucywgdGhlcmUgYXJlIGxhbmRtYXJrcyB5b3Ugc2hvdWxkbuKAmXQgbWlzcywgbGlrZSB0aGUgdW51c3VhbCAxNTAwLWZvb3QgVXBoZWF2YWwgRG9tZSAtIHRob3VnaHQgdG8gYmUgYSBtZXRlb3JpdGUgY3JhdGVyIC0gb3IgdGhlIERydWlkIEFyY2gsIG9mdGVuIHJlZmVycmVkIHRvIGFzIFV0YWjigJlzIG93biBTdG9uZWhlbmdlLiBLZWVwIHdhdGNoIGZvciB0aGUgd2lsZGxpZmUsIHRvby4gQmlnaG9ybiBzaGVlcCB0YWtlIHJlc2lkZW5jZSBpbiB0aGUgY2FueW9ucyBhbmQgYnV0dGVzLCBhbG9uZyB3aXRoIG11bGUgZGVlciwga2FuZ2Fyb28gcmF0cywgYW5kIGNveW90ZS4gTG9vayB1cCBmb3IgcmVkLSB0YWlsZWQgaGF3a3MsIGFuZCBhdCBuaWdodCwgZm9yIG9uZSBvZiB0aGUgZGFya2VzdCBza2llcyBpbiB0aGUgTG93ZXIgNDguIE9uIGEgbW9vbmxlc3MgbmlnaHQsIGdldCBtb3JlIHRoYW4geW91ciBmaWxsIG9mIHN0YXJzIC0gb3IgZ2V0IG91dCB0aGUgYmlub2N1bGFycyB0byB0cnkgZm9yIHRoZSByaW5ncyBvZiBTYXR1cm4uXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGSTMzQ0FLc3U1dVVrcTRYcXQyeFVWSmdjR0hNMiUyRmNhbnlvbmxhbmRzLW1lc2EtYXJjaC1zdW5yaXNlX2RvbGxhcl82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj05MTc1ZjY5ZC1hNWIyLTQ4MjgtOGI5OC1kMDVkMWQxZTBmNjFcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAzODUsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjEyODM5NTI3NzQ2OCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTI2MTQ1MTAyMDgzNjcsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkNhbnlvbmxhbmRzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDI3LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNTY3ODg5LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiSTMzQ0FLc3U1dVVrcTRYcXQyeFVWSmdjR0hNMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA1LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiYmFkXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGl2aWRlZCBieSBhIDI3Ny1taWxlIGxvbmcgY2FueW9uLCBhbmQgdGhlIG1pbGUtZGVlcCBDb2xvcmFkbyBSaXZlciwgdGhlIHR3byBoYWx2ZXMgb2YgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmssIHRoZSBOb3J0aCBhbmQgU291dGggUmltLCBvZmZlciB0d28gcGFya3MgaW4gb25lLCB3aXRoIGRpdmVyc2UgbGFuZHNjYXBlIGFuZCBlY29sb2d5IG9uIGVpdGhlci5cXG5cXG5HcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyaywgYW5kIHRoZSBncmVhdGVyIEdyYW5kIENhbnlvbiByZWdpb24sIGlzIGEgaGlrZXIncyBkcmVhbS4gTW9zdCBvZiBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyayBpcyB1bmRldmVsb3BlZCBiYWNrY291bnRyeS4gVGhlcmUgYXJlIGxpdGVyYWxseSBodW5kcmVkcyBvZiBtaWxlcyB0byBoaWtlLCBiYWNrcGFjayBhbmQgZXhwbG9yZS4gRGVzcGl0ZSB0aGUgR3JhbmQgQ2FueW9uJ3MgcG9wdWxhcml0eSBhbmQgbnVtYmVycyBvZiB2aXNpdG9ycyBlYWNoIHllYXIsIHZpc2l0b3JzIG9ubHkgbmVlZCB0byBoaWtlIGEgc21hbGwgZGlzdGFuY2UgdG8gZW5qb3kgc29tZSBzb2xpdHVkZS5cXG5cXG5FeHBsb3JlIHRoZSBkZXB0aHMgb2YgdGhlIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrIG9uIHBvcHVsYXIgdHJhaWxzIGxpa2UgdGhlIEJyaWdodCBBbmdlbCBhbmQgU291dGggS2FpYmFiIHRyYWlsIG9uIGEgbXVsZS4gQSBHcmFuZCBDYW55b24gbXVsZSByaWRlIGlzIGFuIGFkdmVudHVyZSBhbmQgZWFzeSBvbiB5b3VyIGxlZ3MuXFxuXFxuT25lIG9mIHRoZSBtb3N0IGV4Y2l0aW5nIHdheXMgdG8gZXhwZXJpZW5jZSB0aGUgR3JhbmQgQ2FueW9uIGlzIHRvIGZsb2F0IHRocm91Z2ggaXQgYnkgd2F5IG9mIHJhZnQgb24gdGhlIENvbG9yYWRvIFJpdmVyLiBNb3N0IHBlb3BsZSBib29rIHRoZWlyIHRyaXAgd2l0aCBhIGNvbW1lcmNpYWwgb3V0Zml0dGVyIGFuZCB5b3UgY2FuIGV2ZW4gY29tYmluZSB0aGUgcmFmdGluZyB0cmlwIHdpdGggYSBoZWxpY29wdGVyIHJpZGUuIEV4cGVyaWVuY2VkIHdoaXRld2F0ZXIgcmFmdGVyPyBFbnRlciB0aGUgbG90dGVyeSB0byBkbyB5b3VyIG93biB0cmlwLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRk5mWUUyZEYyd2xmU0JXd1d2RWswS3NpVHMxdDElMkZnYy15YXZhcGFpLXBvaW50LXN1bnNldF9kcF82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj01MTgwZTJmNC05OWE2LTRlMWUtYjc0NC1mYWViYWY5MjA0ZTlcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiA1MTQsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjEyODM5NTI3NzQ2OCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTI2MTQ1MTAyMDgzNjcsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzksXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0OSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTU4OTY3NCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIk5mWUUyZEYyd2xmU0JXd1d2RWswS3NpVHMxdDFcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMSxcclxuICAgICAgICAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk1heGltaXplIHlvdXIgZXhwZXJpZW5jZSBhdCBCcnljZSBDYW55b24gTmF0aW9uYWwgUGFyayBieSBkcml2aW5nIHRvIFN1bnJpc2UsIFN1bnNldCwgSW5zcGlyYXRpb24gYW5kIEJyeWNlIHZpZXdwb2ludHMuIFRoZXNlIGFyZSBhbGwgc3BlY3RhY3VsYXIgb3Zlcmxvb2tzIG9mIHRoZSBwYXJr4oCZcyByZWQgaG9vZG9vcyBzaG9vdGluZyB1cCBhZ2FpbnN0IGV2ZXJncmVlbiBmb3Jlc3RzIGluIHRoZSBiYWNrZ3JvdW5kLiBEZXBlbmRpbmcgb24gdGhlIHRpbWUgb2YgZGF5LCBhbmQgdGhlIGFuZ2xlIGFuZCBsaWdodCBvZiB0aGUgc3VuLCB0aGUgaG9vZG9vcyBhbmQgbXlzdGVyaW91cyByb2NrIGZvcm1hdGlvbnMgb2Z0ZW4gdGFrZSBvbiB1bnVzdWFsIHBhdHRlcm5zIGFuZCBzaGFwZXMsIGFuZCBzb21lIHRoaW5rLCBpbWFnaW5hcnkgZmFjZXMuXFxuXFxuRm9yIG1vcmUgaW5zcGlyYXRpb24sIGxhY2UgdXAgeW91ciBoaWtpbmcgYm9vdHMgb3Igb3RoZXIgc3R1cmR5IHNob2VzIGFuZCBleHBsb3JlIGEgdHJhaWwuIFRoZXJlIGlzIHNvbWV0aGluZyBmb3IgZXZlcnlvbmUgYXQgQnJ5Y2UgQ2FueW9uLiBPdXIgZmF2b3JpdGUgZWFzeSBoaWtlcyBpbmNsdWRlIEJyaXN0bGVjb25lIExvb3AgVHJhaWwgYW5kIFF1ZWVucyBHYXJkZW4gVHJhaWwuIEhhdCBTaG9wIGlzIG91ciBmYXZvcml0ZSBtb2RlcmF0ZSBoaWtlLiBGb3IgbW9yZSBwaHlzaWNhbGx5IGZpdCBoaWtlcnMgbG9va2luZyBmb3IgYSBzdHJlbnVvdXMgYWR2ZW50dXJlLCBkbyB0aGUgNS41LW1pbGUgdmVydGljYWxseSBjaGFsbGVuZ2luZyBQZWVrLUEtQm9vIExvb3Agb3IgdGhlIDcuOSBGYWlyeWxhbmQgTG9vcCByYXRlZCDigJxkaWZmaWN1bHTigJ0gYnkgdGhlIHBhcmsgc2VydmljZS4gXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGUnoyMHlDN0xFU09DRFVvYTRzcDY5djVjb3BUMiUyRmJyeWNlLWFtcGhpdGhlYXRlci1pbnNwaXJhdGlvbi1wb2ludF9kcF82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj0wNmQxNTRiNy04MGQ4LTQ2YzktOWZkZi1lM2U3MGVjNDM5NTFcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAyNDUsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiAzNy4zMjA4NjMyMTI5NjczMixcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiAxMjcuMTI0MzU4NzUwODc5NzYsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkJyeWNlIENhbnlvbiBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNDAsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiAyMSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTYyMTM4MSxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIlJ6MjB5QzdMRVNPQ0RVb2E0c3A2OXY1Y29wVDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogOSxcclxuICAgICAgICAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgcHJlc2VydmVzIGEgc3BlY3RhY3VsYXIgbGFuZHNjYXBlIHJpY2ggd2l0aCBtYWplc3RpYyBtb3VudGFpbnMsIHByaXN0aW5lIGxha2VzLCBhbmQgZXh0cmFvcmRpbmFyeSB3aWxkbGlmZS4gVGhlIGFicnVwdCB2ZXJ0aWNhbCByaXNlIG9mIHRoZSBqYWdnZWQgVGV0b24gTW91bnRhaW5zIGNvbnRyYXN0cyB3aXRoIHRoZSBob3Jpem9udGFsIHNhZ2UtY292ZXJlZCB2YWxsZXkgYW5kIGdsYWNpYWwgbGFrZXMgYXQgaXRzIGJhc2UuXFxuXFxuSXQgdG9vayBtb3JlIHRoYW4gMzAgeWVhcnMgZm9yIEdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgdG8gdHJhbnNmb3JtIGZyb20gYW4gaWRlYSB0byBvbmUgb2YgdGhlIGNvdW50cnkncyBtb3N0IHN0dW5uaW5nIHBhcmtzLiBXaGVuIENvbmdyZXNzIGNyZWF0ZWQgdGhlIHBhcmsgaW4gMTkyOSwgaXQgb25seSBpbmNsdWRlZCB0aGUgVGV0b24gUmFuZ2UgYW5kIHNpeCBnbGFjaWFsIGxha2VzLiBKb2huIEQuIFJvY2tlZmVsbGVyLCBKci4sIHBsYXllZCBhIGtleSByb2xlIGluIGFjcXVpcmluZyBhbiBhZGRpdGlvbmFsIDM1LDAwMCBhY3JlcyBmb3IgdGhlIHBhcmsgdW5kZXIgdGhlIG5hbWUgXFxcIlNuYWtlIFJpdmVyIExhbmQgQ28uXFxcIiBBbWlkIGNvbnRyb3ZlcnN5IHRoZSBcXFwibmV3XFxcIiBHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHdhcyBlc3RhYmxpc2hlZCBTZXB0LiAxNCwgMTk1MCwgYnkgUHJlc2lkZW50IEhhcnJ5IFRydW1hbi5cXG5cXG5HcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIGFuZCBpdHMgd29ybGQtY2xhc3Mgc2NlbmVyeSBhdHRyYWN0cyBuZWFybHkgNCBtaWxsaW9uIHZpc2l0b3JzIHBlciB5ZWFyLiBXaXRoIEplbm55IExha2UgYW5kIEphY2tzb24gTGFrZSBhdCA2LDMyMCBmZWV0IGFuZCB0aGUgc3VtbWl0IG9mIHRoZSBHcmFuZCBUZXRvbiBhdCAxMyw3NzAgZmVldCwgdGhlIHBhcmsncyBlbGV2YXRpb24gcmFuZ2VzIGNyZWF0ZSBvbmUgb2YgdGhlIG5hdGlvbidzIG1vc3QgYXdlLWluc3BpcmluZyBsYW5kc2NhcGVzLiBJbiBhZGRpdGlvbiB0byBnYXppbmcgYXQgdGhlIGluY3JlZGlibGUgdmlld3MsIHRoZXJlIGlzIG11Y2ggdG8gZG8gaW4gdGhpcyBwYXJrIGZyb20gaGlraW5nIGFuZCByb2NrIGNsaW1iaW5nIHRvIGJvYXRpbmcgYW5kIGZpc2hpbmcuIEFuZCB3aGVuIHlvdSBuZWVkIGEgYnJlYWsgZnJvbSBvdXRkb29yIGFkdmVudHVyZSwgdGhlcmUgYXJlIGZldyBiZXR0ZXIgcGxhY2VzIHRvIHNpbXBseSByZWxheCBhbmQgd2F0Y2ggdGhlIHBhcmsncyBpbmNyZWRpYmxlIHdpbGRsaWZlLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby91c2VycyUyRmFzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDIlMkZndGV0b24tc2Nod2FiYWNoZXJzLWxhbmRpbmdfZG9sbGFyXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPWQzYWJmYmQwLWI3MjUtNGIwYy05N2U1LWY2MTZiZGI3MDMwNVwiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDE2OSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IDM3LjMyMTM3NDg3Mjc5MTA4LFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IDEyNy4xMjIxMDA2NjYxNjUzNyxcclxuICAgICAgICAgICAgbmFtZSA6IFwiR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDQwLFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDcsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE2NDc3NjIsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJhc3FVMjFRemx0WU9nblQ1TURjZ1dvdFJKd0gyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDMsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRXhwbG9yZSBTb3V0aCBEYWtvdGHigJlzIEJsYWNrIEhpbGxzIHJlZ2lvbiwgYSBuYXR1cmFsIHdvbmRlciBpbiBpdHMgb3duIHJpZ2h0LiBMb2NhdGVkIGFib3V0IHNpeCBob3VycyBmcm9tIFllbGxvd3N0b25lLCB0aGUgQmxhY2sgSGlsbHMgYXJlIGhvbWUgdG8gc2V2ZW4gbmF0aW9uYWwgc2l0ZXMg4oCUIEJhZGxhbmRzIE5hdGlvbmFsIFBhcmssIEpld2VsIENhdmUgTmF0aW9uYWwgTW9udW1lbnQsIHRoZSBMZXdpcyAmIENsYXJrIE5hdGlvbmFsIEhpc3RvcmljIFRyYWlsLCBNaW51dGVtYW4gTWlzc2lsZSBOYXRpb25hbCBIaXN0b3JpYyBTaXRlLCBNaXNzb3VyaSBOYXRpb25hbCBSZWNyZWF0aW9uYWwgUml2ZXIsIE1vdW50IFJ1c2htb3JlIE5hdGlvbmFsIE1lbW9yaWFsLCBhbmQgV2luZCBDYXZlIE5hdGlvbmFsIFBhcmsuXFxuXFxuSW4gdGhpcyBuYXR1cmFsIHBsYXlncm91bmQsIHlvdSBjYW4gZW5qb3kgYW4gYWJ1bmRhbmNlIG9mIHJlY3JlYXRpb25hbCBvcHBvcnR1bml0aWVzLCBnb3JnZW91cyBzY2VuaWMgZHJpdmVzIOKAlCB3aGljaCBpbmNsdWRlIHRoZSBiZWF1dGlmdWwgU3BlYXJmaXNoIENhbnlvbiDigJQgYW5kIHdpbGRsaWZlLXdhdGNoaW5nLiBUaGlzIHJlZ2lvbiBpcyBhbHNvIHBhY2tlZCB3aXRoIGN1bHR1cmFsIGFuZCBoaXN0b3JpY2FsIHNpdGVzLlxcblxcbldoaWxlIHlvdSB3b27igJl0IHNlZSBzYWJlci10b290aGVkIGNhdHMgb3Igcmhpbm9jZXJvc2VzIHJvYW1pbmcgdGhlIEJhZGxhbmRzIGxpa2UgdGhleSBvbmNlIGRpZCwgeW91IG1heSBzZWUgdGhlaXIgcmVtYWlucyBpbiB0aGlzIHN0dW5uaW5nIG5hdGlvbmFsIHBhcmsgd2l0aCBzb21lIG9mIHRoZSB3b3JsZOKAmXMgcmljaGVzdCBmb3NzaWwgZGVwb3NpdHMuXFxuXFxuTG9jYXRlZCBpbiBJbWxheSBUb3duc2hpcCBpbiBTb3V0aCBEYWtvdGEsIEJhZGxhbmRzIE5hdGlvbmFsIFBhcmsgaGFzIGEgRm9zc2lsIFByZXBhcmF0aW9uIExhYiB3aGVyZSB5b3UgY2FuIHdhdGNoIHBhbGVvbnRvbG9naXN0cyBhdCB3b3JrLCBsaXRlcmFsbHkgdW5jb3ZlcmluZyB0aGUgYW5jaWVudCBoaXN0b3J5IG9mIHRoZSBhcmVhLiBBdCB0aGUgQmVuIFJlaWZlbCBWaXNpdG9yIENlbnRlciwga2lkcyBjYW4gdXNlIGEgdG91Y2hzY3JlZW4gdG8gYXNzZW1ibGUgYSB2aXJ0dWFsIHNrZWxldG9uIGFuZCB0b3VjaCBmb3NzaWxpemVkIGFuaW1hbCByZXBsaWNhcy4gWW91IGFsc28gY2FuIHdhdGNoIHRoZSBmaWxtIExhbmQgb2YgU3RvbmUgYW5kIExpZ2h0IGluIHRoZSBjZW50ZXLigJlzIDk1LXNlYXQgYWlyLWNvbmRpdGlvbmVkIHRoZWF0ZXIuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMiUyRmJhZGxhbmRzX3dpa2lwZF82ODB4MzkyLmpwZz9hbHQ9bWVkaWEmdG9rZW49NWQ2NzJjMjUtN2JkMS00MjIxLWE5ZGQtNzE0ZWM4OTA5OTE0XCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogMjI3LFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogMzcuMzIwMTAxNDQ5Mjg3ODEsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogMTI3LjEyMjUyOTE0OTA1NTQ4LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJCYWRsYW5kcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNDEsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiAxMSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTY3MTk0NyxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcImF5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgICAgfV1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZFBvc3QoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRfaW5kZXg7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZm9yKHZhciBwb3N0X2lkIGluIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldKXtcclxuICAgICAgICAgICAgICAgIGlmKHBvc3RfaWQgPT09IHRoaXMuc2VsZWN0ZWRQb3N0SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmaXJlYmFzZSBjbG91ZGUgc3RvcmFnZSB0ZXN0IC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIG5lZWQgdG8ga25vdyBob3cgdG8gZ2V0IGh0dHAgaW1nIHNyY1xyXG4gICAgLy8gdXBsb2FkIHBpY3R1cmUgZmlyc3QgYW5kIG1ha2UgcG9zdF9kYXRhXHJcbiAgICBhZGRfcG9zdChwb3N0X2RhdGEpe1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC5hZGQocG9zdF9kYXRhKS50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGF1dG8tZ2VuZXJhdGVkIHBvc3QgSUQ6ICR7ZG9jdW1lbnRSZWYuaWR9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVfaW1hZ2Vfc3JjKCl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICB9XHJcbiAgICB1cGRhdGVfcG9zdChwb3N0X2lkLCBwb3N0X2RhdGEpe1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdF9pZClcclxuICAgICAgICAudXBkYXRlKHBvc3RfZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicG9zdCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaF9wb3N0KFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIGVubmVhZ3JhbV9udW06bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbl9sYXRpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luX2xvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VfbWV0ZXJcclxuICAgICl7XHJcbiAgICAgICAgY29uc3QgT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIgPSAxMTEwMDA7XHJcblxyXG4gICAgICAgIHZhciBtYXhfbGF0aXR1ZGVfZGVncmVlID0gb3JpZ2luX2xhdGl0dWRlICsgZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIHZhciBtaW5fbGF0aXR1ZGVfZGVncmVlID0gb3JpZ2luX2xhdGl0dWRlIC0gZGlzdGFuY2VfbWV0ZXIvKDIqT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIpO1xyXG4gICAgICAgIGlmKG1heF9sYXRpdHVkZV9kZWdyZWUgPj0gOTApe1xyXG4gICAgICAgICAgICBtYXhfbGF0aXR1ZGVfZGVncmVlID0gOTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbl9sYXRpdHVkZV9kZWdyZWUgPD0gLTkwKXtcclxuICAgICAgICAgICAgbWluX2xhdGl0dWRlX2RlZ3JlZSA9IC05MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1heF9sb25naXR1ZGVfZGVncmVlID0gb3JpZ2luX2xvbmdpdHVkZSArIGRpc3RhbmNlX21ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbl9sYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIHZhciBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG9yaWdpbl9sb25naXR1ZGUgLSBkaXN0YW5jZV9tZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5fbGF0aXR1ZGUgKiAoMTgwIC8gTWF0aC5QSSkpKTtcclxuICAgICAgICBpZihtYXhfbG9uZ2l0dWRlX2RlZ3JlZSAtIG1pbl9sb25naXR1ZGVfZGVncmVlID49IDM2MCl7XHJcbiAgICAgICAgICAgIG1heF9sb25naXR1ZGVfZGVncmVlID0gMTgwO1xyXG4gICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IC0xODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKG1heF9sb25naXR1ZGVfZGVncmVlID49IDE4MCl7XHJcbiAgICAgICAgICAgICAgICBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSA9IG1heF9sb25naXR1ZGVfZGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pbl9sb25naXR1ZGVfZGVncmVlIDw9IC0xODApe1xyXG4gICAgICAgICAgICAgICAgbWluX2xvbmdpdHVkZV9kZWdyZWUgPSBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSAtIDM2MDtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1pbl9sb25naXR1ZGVfZGVncmVlID4gbWF4X2xvbmdpdHVkZV9kZWdyZWUpe1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IG1pbl9sb25naXR1ZGVfZGVncmVlO1xyXG4gICAgICAgICAgICBtaW5fbG9uZ2l0dWRlX2RlZ3JlZSA9IG1heF9sb25naXR1ZGVfZGVncmVlO1xyXG4gICAgICAgICAgICBtYXhfbG9uZ2l0dWRlX2RlZ3JlZSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWluX2xhdFwiLG1pbl9sYXRpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xhdFwiLG9yaWdpbl9sYXRpdHVkZSk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1heF9sYXRcIixtYXhfbGF0aXR1ZGVfZGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1pbl9sb25cIixtaW5fbG9uZ2l0dWRlX2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvcmlfbG9uXCIsb3JpZ2luX2xvbmdpdHVkZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtYXhfbG9uXCIsbWF4X2xvbmdpdHVkZV9kZWdyZWUpO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcIm51bWJlclwiLCBcIj09XCIsIGVubmVhZ3JhbV9udW0pXHJcbiAgICAgICAgLndoZXJlKFwidHlwZVwiLCBcIj09XCIsIHR5cGUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPD1cIiwgbWF4X2xvbmdpdHVkZV9kZWdyZWUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPj1cIiwgbWluX2xvbmdpdHVkZV9kZWdyZWUpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jLmRhdGEoKS5sYXRpdHVkZSA8PSBtYXhfbGF0aXR1ZGVfZGVncmVlICYmIGRvYy5kYXRhKCkubGF0aXR1ZGUgPj0gbWluX2xhdGl0dWRlX2RlZ3JlZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHNlYXJjaGVkIGRvYyA6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRbZG9jLmlkXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoX3F1ZXJpZXMoXHJcbiAgICAgICAgdHlwZTpzdHJpbmcsXHJcbiAgICAgICAgZW5uZWFncmFtX251bXM6bnVtYmVyW10sXHJcbiAgICAgICAgb3JpZ2luX2xhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5fbG9uZ2l0dWRlOm51bWJlcixcclxuICAgICAgICBkaXN0YW5jZV9tZXRlcjpudW1iZXIsXHJcbiAgICApe1xyXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxlbm5lYWdyYW1fbnVtcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hfcG9zdCh0eXBlLGVubmVhZ3JhbV9udW1zW2ldLG9yaWdpbl9sYXRpdHVkZSxvcmlnaW5fbG9uZ2l0dWRlLGRpc3RhbmNlX21ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhZGRfY29tbWVudChwb3N0X2lkLCBjb21tZW50X2RhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdF9pZClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50X2RhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYXV0by1nZW5lcmF0ZWQgY29tbWVudCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZV9jb21tZW50KHBvc3RfaWQsIGNvbW1lbnRfaWQsIGNvbW1lbnRfZGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpLmRvYyhwb3N0X2lkKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIikuZG9jKGNvbW1lbnRfaWQpXHJcbiAgICAgICAgLnVwZGF0ZShjb21tZW50X2RhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbW1lbnQgdXBkYXRlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIG5ldyB1c2VyXHJcbiAgICBzZXRfZGF0YSgpe1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgICAgICAuZG9jKHRoaXMuYXV0aHVzZXIudWlkKVxyXG4gICAgICAgIC5zZXQoe1xyXG4gICAgICAgICAgICBhdXRob3I6IHRoaXMuYXV0aHVzZXIudWlkLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlNhbiBGcmFuY2lzY29cIixcclxuICAgICAgICAgICAgc3RhdGU6IFwiQ0FcIixcclxuICAgICAgICAgICAgY291bnRyeTogXCJVU0FcIixcclxuICAgICAgICAgICAgY2FwaXRhbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZV9kYXRhKCl7XHJcbiAgICAgICAgY29uc3QgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgICAgIC5kb2MoXCJTRlwiKVxyXG4gICAgICAgIC51cGRhdGUoe1xyXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiA4NjAwMDEsXHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVzdGFtcDogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuRmllbGRWYWx1ZSgpLnNlcnZlclRpbWVzdGFtcCgpLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuR2VvUG9pbnQoNC4zNCwgNS42NylcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRiBwb3B1bGF0aW9uIHVwZGF0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2RvY3VtZW50c19mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgICAgICBjb25zdCBjaXRpZXNDb2xsZWN0aW9uID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKTtcclxuXHJcbiAgICAgICAgY2l0aWVzQ29sbGVjdGlvbi5nZXQoKS50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kYXRlX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcblxyXG4gICAgICAgIHNhbkZyYW5jaXNjb0RvY3VtZW50LmdldCgpLnRoZW4oZG9jID0+IHtcclxuICAgICAgICAgIGlmIChkb2MuZXhpc3RzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEb2N1bWVudCBkYXRhOiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBzdWNoIGRvY3VtZW50IVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aGVyZV9xdWVyeSgpeyAgICAgICAgXHJcbiAgICAgICAgLy8gXCJHaW1tZSBhbGwgY2l0aWVzIGluIENhbGlmb3JuaWEgd2l0aCBhIHBvcHVsYXRpb24gYmVsb3cgNTUwMDAwXCJcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAgICAgLndoZXJlKFwic3RhdGVcIiwgXCI9PVwiLCBcIkNBXCIpLndoZXJlKFwicG9wdWxhdGlvblwiLCBcIjxcIiwgMjUwMDAwMClcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWxhdGl2ZWx5IHNtYWxsIENhbGlmb3JuaWFuIGNpdHk6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRlbGV0ZV9kb2N1bWVudF9mcm9tX2NvbGxlY3Rpb24oKXtcclxuICAgICAgICBjb25zdCBzYW5GcmFuY2lzY29Eb2N1bWVudCA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJjaXRpZXNcIikuZG9jKFwiU0ZcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZGVsZXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHdhcyBlcmFzZWQgZnJvbSB0aGUgZmFjZSBvZiB0aGUgZWFydGghXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBkZWxldGVfZGF0YV9mcm9tX2RvY3VtZW50KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJMQVwiKVxyXG4gICAgLy8gICAgICAgICAudXBkYXRlKHtcclxuICAgIC8vICAgICAgICAgICBjYXBpdGFsOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuZGVsZXRlKCksXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGFycmF5VW5pb24oKXtcclxuICAgICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuZG9jKFwibG9wa0RMRzZUN2pwVHVZNW9PNnhcIilcclxuICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgYmVoYXZpb3I6IGZpcmViYXNlV2ViLmZpcmVzdG9yZS5GaWVsZFZhbHVlKCkuYXJyYXlVbmlvbihbe1wicmVkXCI6IFwiYmx1ZVwifV0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFRoaXNVc2VyRGF0YSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXV0aHVzZXIudWlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgICAgICAgICAgLndoZXJlKFwiYXV0aG9yXCIsIFwiPT1cIiwgdGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBpY3R1cmUgdXBsb2FkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLyAxLiB3aGVuIHVzZXIgc2VsZWN0IHBpY3R1cmUsIHRoZSBwaWN0dXJlIHVwbG9hZGVkIGludG8gc3RvcmFnZS5cclxuICAgIHBpY2tJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxyXG5cdFx0fSk7XHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZVR5cGUsZmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICAvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIgfHwgZmlsZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvcHJvZmlsZS9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlyZWJhc2Uuc3RvcmFnZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgLy8gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2UgKGZvbGRlcnMgd2lsbCBiZSBjcmVhdGVkKVxyXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArIGZpbGVDbGFzcyArIGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAvLyBvcHRpb24gMTogYSBmaWxlLXN5c3RlbSBtb2R1bGUgRmlsZSBvYmplY3RcclxuICAgICAgICAgICAgbG9jYWxGaWxlOiBmcy5GaWxlLmZyb21QYXRoKGZpbGVQYXRoKSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxyXG4gICAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBmaWxlUGF0aCxcclxuICAgICAgICAgICAgLy8gZ2V0IG5vdGlmaWVkIG9mIGZpbGUgdXBsb2FkIHByb2dyZXNzXHJcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEZpbGVVUkwoZmlsZVR5cGUsIHRoaXMuYXV0aHVzZXIudWlkLCB1cGxvYWRlZEZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZCBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIGdldCB0aGUgcGljdHVyZSBVUkwgZm9yIHVwbG9hZGluZyB0aGUgYmxvZy5cclxuICAgIGdldEZpbGVVUkwoaW1hZ2VUeXBlLCB1aWQsIGZpbGVOYW1lKXtcclxuICAgICAgICB2YXIgZmlsZVVSTDtcclxuICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvYmxvZy9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIiB8fCBpbWFnZVR5cGUgPT09XCJiYWNrZ3JvdW5kXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlYmFzZS5zdG9yYWdlLmdldERvd25sb2FkVXJsKHtcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwsIGNhbiBhbHNvIGJlIHBhc3NlZCBkdXJpbmcgaW5pdCgpIGFzICdzdG9yYWdlQnVja2V0JyBwYXJhbSBzbyB3ZSBjYW4gY2FjaGUgaXRcclxuICAgICAgICAgICAgLy8gYnVja2V0OiAnZ3M6Ly9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20nLFxyXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXHJcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXNlcnMvJyArIHVpZCArIGZpbGVVUkwsXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgdXJsID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoYXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbShyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHZhciByb29tID0gcm9vbV9pZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyb29tLCByZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21faWQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbShyb29tX2lkOnN0cmluZywgbWVzc2FnZXM6YW55KXtcclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddID0gbWVzc2FnZXM7XHJcbiAgICAgICAgaWYocm9vbV9pZCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgfVxyXG4gICAgc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAobWVzc2FnZUFycmF5KXtcclxuICAgICAgICBpZihtZXNzYWdlQXJyYXk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYTtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2EgPSBhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYil7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2IgPSBiW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VfYVsndGltZXN0YW1wJ11bJ3RpbWUnXSAtIG1lc3NhZ2VfYlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tX2lkK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbV9pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBjcmVhdGUgcm9vbSB3aXRoIG5ldyBmcmllbmQuXHJcbiAgICAvLyBVc2VyIGhhcyBhIHJvb20gYnV0IGZyaWVuZCBkb2Vzbid0IGhhdmUgcm9vbSB5ZXQuXHJcbiAgICBnZW5lcmF0ZVJvb20odXNlcjphbnkpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICB2YXIgb3Blbl9yb29tID0ge3Jvb21fdXNlcnM6XCJcIn07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsncm9vbV91c2VycyddW3VpZF0gPSB1c2VyW3VpZF07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWyd0aXRsZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydpY29uc3JjJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgXCJcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jlc3VsdC5rZXksIG9wZW5fcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCB7aW5Sb29tOnRydWUsIGpvaW46bmV3IERhdGUoKX0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFVzZXJJRE9uUm9vbSh1aWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBtZXNzYWdlcyA6XHJcbiAgICBwdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZV9wYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VfcGFja1sndXNlciddID0gdWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbV9pZCsnL21lc3NhZ2VzJywgbWVzc2FnZV9wYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJsb2cgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGdlbmVyYXRlUG9zdCh1c2VyOmFueSwgcG9zdF9pZDpzdHJpbmcsIHBvc3Q6YW55KXtcclxuICAgICAgICB2YXIgb3Blbl9wb3N0ID0ge307XHJcbiAgICAgICAgaWYocG9zdD09bnVsbCl7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ25hbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsndHlwZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydkZXNjcmlwdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydpbWFnZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydsb2NhdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydsaWtlcyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydjb21tZW50cyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgaWYocG9zdF9pZD09bnVsbCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvYmxvZ3MvJyt1aWQrJy9wb3N0cycsIFwiXCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Jlc3VsdC5rZXksIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUG9zdElET25Vc2VyKHVzZXIsIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3RbcG9zdF9pZF07XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Bvc3RfaWQsIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1c2hQb3N0SURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfYmxvZ3MvJytyb29tX2lkLCB0cnVlKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hVc2VySURPblJvb20odWlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUF1dGggU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIG1ha2UgYXJyYXkgdHlwZSBkYXRhYmFzZSBhbmQgcHVzaCBkYXRhIGluIGFycmF5IHR5cGUgZGF0YWJhc2VcclxuICAgIHB1c2hJbkFycmF5RGF0YWJhc2UoZGF0YWJhc2VPZkFycmF5UGF0aDpzdHJpbmcsIHB1c2hEYXRhOmFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VPZkFycmF5UGF0aCwgcHVzaERhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2UgZGF0YSBzdHJ1Y3R1cmUgb2YgdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgbWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCBzdHJ1Y3R1cmU6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgc3RydWN0dXJlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgYXR0cmlidXRlIGluIHZhbHVlIHR5cGUgZGF0YWJhc2UgYW5kIHVwZGF0ZSBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIHdyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgdXBkYXRlRGF0YTogYW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgdXBkYXRlRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWQgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICByZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gY29tcGxleCBxdWVyeVxyXG4gICAgcXVlcnlPbkRhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUXVlcnlFdmVudCxcclxuICAgICAgICAgICAgICAgIC8vICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgb25seSBjb21wYW5pZXMgJ3NpbmNlJyBhIGNlcnRhaW4geWVhciAoVGVsZXJpaydzIHZhbHVlIGlzIDIwMDAsIHdoaWNoIGlzIGltYWdpbmFyeSBidHcpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgICAgICAgICAgICAgICAgICAvL3JhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAvLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uIG9yICdjaGFpbicgcmFuZ2VzIGxpa2UgdGhpczpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDE5OTlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRU5EX0FULFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3QgMiBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvLyBxdWVyeSByZXN1bHRcclxuICAgIG9uUXVlcnlFdmVudChyZXN1bHQpIHtcclxuICAgICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcclxuICAgICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxyXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcXVlcnlUZXN0KCl7XHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVbJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXSkpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWRVc2VyTmFtZSgpe1xyXG4gICAgLy8gICAgIHZhciB1c2VySWQgPSBmaXJlYmFzZVdlYi5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgLy8gICAgIHJldHVybiBmaXJlYmFzZVdlYi5kYXRhYmFzZSgpLnJlZignL3VzZXJzLycgKyB1c2VySWQpLm9uY2UoJ3ZhbHVlJykudGhlbihmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdXNlcm5hbWUgPSAoc25hcHNob3QudmFsKCkgJiYgc25hcHNob3QudmFsKCkudXNlcm5hbWUpIHx8ICdBbm9ueW1vdXMnO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluaXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIGdldCBjdXJyZW5kVXNlclxyXG4gICAgbG9naW4odXNlcikge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxyXG4gICAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEN1cnJlbnRVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKHVzZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0QXV0aFVzZXIodXNlcjpmaXJlYmFzZS5Vc2VyKXtcclxuICAgICAgICB0aGlzLmF1dGh1c2VyID0gdXNlcjtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbXMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gcmVzdWx0LmtleTtcclxuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB7fTtcclxuICAgICAgICB1c2VyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRoaXNVc2VyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZF9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICBjb25zb2xlLmxvZyhmcmllbmRfaWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRfaWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRfaWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RnJpZW5kcyhmcmllbmRfaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZnJpZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJpZW5kWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ10gPSB0aGlzLmdldEZyaWVuZHMoKVsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaEZyaWVuZE9uUm9vbSh0aGlzLnRoaXNVc2VyLFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoTWVzc2FnZU9uUm9vbShcIi1MUExWTlZGMnlNMU16eUctRDcxXCIsIHRoaXMudGhpc1VzZXIsIFwiaGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVQb3N0KHRoaXMudGhpc1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21faWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbV9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21faWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZFJvb20ocm9vbSl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gcm9vbSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNba2V5XSA9IHJvb21ba2V5XTtcclxuICAgICAgICAgICAgdGhpcy5zeW5jUm9vbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuICAgICAgICB0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuICAgICAgICAvLyB0aGlzLmFkZF9jb21tZW50KCdqM1hlVklyb0FKd0xxU0Q1cmU2Qycse2hlbGxvOidoZWxsbyd9KTtcclxuICAgICAgICAvLyBmb3IodmFyIGk9MDtpPHRoaXMudGVzdF9kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFkZF9wb3N0KHRoaXMudGVzdF9kYXRhW2ldKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hfcG9zdChcImNoYXRcIiwzLDM3LjMyMzk3MiwgMTI3LjEyNTEwOSAsMTAwMDAwKTtcclxuICAgICAgICAvLyB0aGlzLnNlYXJjaF9xdWVyaWVzKFwiY2hhdFwiLFsxLDIsMyw0LDUsNiw3LDgsOV0sMzcuMzIzOTcyLCAxMjcuMTI1MTA5ICwxMDAwMDApO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RmlsZVVSTCgnYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMicsJ2d0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZycpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBqc29uKXtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZF9qc29uID0ge307XHJcbiAgICAgICAgICAgICAgICBjaGlsZF9qc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkX2pzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEdlbmVyYXRlZFJvb21JRCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZyaWVuZHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mcmllbmRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCkge1xyXG4gICAgICAgIGlmKHRoaXMucm9vbXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb21zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpe1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==