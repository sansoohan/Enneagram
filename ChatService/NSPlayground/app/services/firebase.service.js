"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var firebaseWeb = require("nativescript-plugin-firebase/app");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var barcodescanning_1 = require("nativescript-plugin-firebase/mlkit/barcodescanning");
var application_1 = require("tns-core-modules/application");
var image_source_1 = require("tns-core-modules/image-source");
var file_system_1 = require("tns-core-modules/file-system");
var ApplicationSettings = require("application-settings");
var imagePicker = require("nativescript-imagepicker");
var fs = require("tns-core-modules/file-system");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(routerExtensions) {
        // this.testData = [{
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
        // this.textRecognition();
        // this.faceDetection();
        // this.barcodeScanning();
        // this.imageLabeling();
        // this.landmarkRecognition();
    }
    //------------------------ google analytics ------------------
    FirebaseService.prototype.analyticsCount = function (activityName) {
        firebase.analytics.logEvent({
            key: activityName
        }).then(function () {
            // console.log("Firebase Analytics event logged");
        });
    };
    //------------------------ firebase ml kit test ------------------
    FirebaseService.prototype.textRecognition = function () {
        var folder = file_system_1.knownFolders.currentApp();
        var folderPath = file_system_1.path.join(folder.path, "images/Wege_der_parlamentarischen_Demokratie.jpg");
        var imageSource = image_source_1.fromFile(folderPath);
        console.log(imageSource);
        firebase.mlkit.textrecognition.recognizeTextOnDevice({
            image: imageSource // a NativeScript Image or ImageSource, see the demo for examples
        }).then(function (result) {
            console.log(result.text ? result.text : "");
        }).catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
    };
    FirebaseService.prototype.faceDetection = function () {
        var folder = file_system_1.knownFolders.currentApp();
        var folderPath = file_system_1.path.join(folder.path, "images/sansoo.jpg");
        var imageSource = image_source_1.fromFile(folderPath);
        firebase.mlkit.facedetection.detectFacesOnDevice({
            image: imageSource,
            detectionMode: "accurate",
            enableFaceTracking: true,
            minimumFaceSize: 0.25 // default 0.1 (which means the face must be at least 10% of the image)
        })
            .then(function (result) { return console.log(JSON.stringify(result.faces)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
    };
    FirebaseService.prototype.barcodeScanning = function () {
        var folder = file_system_1.knownFolders.currentApp();
        var folderPath = file_system_1.path.join(folder.path, "images/qrcode.png");
        var imageSource = image_source_1.fromFile(folderPath);
        firebase.mlkit.barcodescanning.scanBarcodesOnDevice({
            image: imageSource,
            formats: [barcodescanning_1.BarcodeFormat.QR_CODE, barcodescanning_1.BarcodeFormat.CODABAR] // limit recognition to certain formats (faster), or leave out entirely for all formats (default)
        })
            .then(function (result) { return console.log(JSON.stringify(result.barcodes)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
        var folderPath2 = file_system_1.path.join(folder.path, "images/EAN-Obst.jpg");
        var imageSource2 = image_source_1.fromFile(folderPath2);
        firebase.mlkit.barcodescanning.scanBarcodesOnDevice({
            image: imageSource2,
            formats: [barcodescanning_1.BarcodeFormat.EAN_13] // limit recognition to certain formats (faster), or leave out entirely for all formats (default)
        })
            .then(function (result) { return console.log(JSON.stringify(result.barcodes)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
    };
    FirebaseService.prototype.imageLabeling = function () {
        var folder = file_system_1.knownFolders.currentApp();
        var folderPath = file_system_1.path.join(folder.path, "images/1024px-Valais_Cup_2013_-_OM-FC_Porto_13-07-2013_-_Brice_Samba_en_extension.jpg");
        var imageSource = image_source_1.fromFile(folderPath);
        firebase.mlkit.imagelabeling.labelImageOnDevice({
            image: imageSource,
            confidenceThreshold: 0.6 // this will only return labels with at least 0.6 (60%) confidence. Default 0.5.
        })
            .then(function (result) { return console.log(JSON.stringify(result.labels)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
        firebase.mlkit.imagelabeling.labelImageCloud({
            image: imageSource,
            modelType: "stable",
            maxResults: 5 // default 10
        })
            .then(function (result) { return console.log(JSON.stringify(result.labels)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
    };
    FirebaseService.prototype.landmarkRecognition = function () {
        var folder = file_system_1.knownFolders.currentApp();
        var folderPath = file_system_1.path.join(folder.path, "images/680px-Bruegge_View_from_Rozenhoedkaai.jpg");
        var imageSource = image_source_1.fromFile(folderPath);
        firebase.mlkit.landmarkrecognition.recognizeLandmarksCloud({
            image: imageSource,
            modelType: "latest",
            maxResults: 8 // default 10
        })
            .then(function (result) { return console.log(JSON.stringify(result.landmarks)); })
            .catch(function (errorMessage) { return console.log("ML Kit error: " + errorMessage); });
    };
    //------------------------ firebase cloude storage test ------------------
    // need to know how to get http img src
    // upload picture first and make postData
    // update_image_src(){
    //     firebaseWeb.firestore()
    //     .collection("posts")
    // }
    // update_post(postID, postData){
    //     firebaseWeb.firestore()
    //     .collection("posts").doc(postID)
    //     .update(postData).then(() => {
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
    FirebaseService.prototype.searchPost = function (type, otheruserEnneagramNum, originLatitude, originLongitude, distanceMeter) {
        var _this = this;
        var ONE_DEGREE_EARTH_PER_METER = 111000;
        var maxLatitudeDegree = originLatitude + distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER);
        var minLatitudeDegree = originLatitude - distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER);
        if (maxLatitudeDegree >= 90) {
            maxLatitudeDegree = 90;
        }
        if (minLatitudeDegree <= -90) {
            minLatitudeDegree = -90;
        }
        var maxLongitudeDegree = originLongitude + distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(originLatitude * (180 / Math.PI)));
        var minLongitudeDegree = originLongitude - distanceMeter / (2 * ONE_DEGREE_EARTH_PER_METER * Math.sin(originLatitude * (180 / Math.PI)));
        if (maxLongitudeDegree - minLongitudeDegree >= 360) {
            maxLongitudeDegree = 180;
            minLongitudeDegree = -180;
        }
        else {
            if (maxLongitudeDegree >= 180) {
                maxLongitudeDegree = maxLongitudeDegree - 360;
            }
            if (minLongitudeDegree <= -180) {
                minLongitudeDegree = minLongitudeDegree - 360;
            }
        }
        if (minLongitudeDegree > maxLongitudeDegree) {
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
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().latitude <= maxLatitudeDegree && doc.data().latitude >= minLatitudeDegree) {
                    // console.log(`searched doc : ${doc.id} => ${JSON.stringify(doc.data())}`);
                    var searchResult = {};
                    searchResult[doc.id] = JSON.parse(JSON.stringify(doc.data()));
                    _this.postSearchResultArray.push(searchResult);
                }
            });
        });
    };
    FirebaseService.prototype.searchQueries = function (type, otheruserEnneagramNums, originLatitude, originLongitude, distanceMeter) {
        this.postSearchResultArray = [];
        for (var i = 0; i < otheruserEnneagramNums.length; i++) {
            // console.log("type"+otheruserEnneagramNums[i]);
            this.searchPost(type, otheruserEnneagramNums[i], originLatitude, originLongitude, distanceMeter);
        }
    };
    FirebaseService.prototype.get_user_posts = function (userID) {
        var _this = this;
        this.postSearchResultArray = [];
        firebaseWeb.firestore()
            .collection("posts")
            .where("roles." + userID, "==", "owner")
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
    FirebaseService.prototype.addPost = function (postData) {
        firebaseWeb.firestore()
            .collection("posts")
            .add(postData).then(function (documentRef) {
            // console.log(`auto-generated post ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.addComment = function (postID, commentData) {
        var posts = firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments")
            .add(commentData).then(function (documentRef) {
            // console.log(`auto-generated comment ID: ${documentRef.id}`);
        });
    };
    FirebaseService.prototype.updateComment = function (postID, commentID, commentData) {
        firebaseWeb.firestore()
            .collection("posts").doc(postID)
            .collection("comments").doc(commentID)
            .update(commentData).then(function () {
            // console.log("comment updated");
        });
    };
    FirebaseService.prototype.getSelectedPost = function () {
        for (var i = 0; i < this.postSearchResultArray.length; i++) {
            for (var postID in this.postSearchResultArray[i]) {
                if (this.selectedPostID === postID) {
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
            // console.log("File uploaded: " + JSON.stringify(uploadedFile));
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
            _this.updateRoom(result.key);
        }, "/users/" + this.authuser.uid + "/user_rooms").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoom = function (updatedRoomID) {
        var _this = this;
        firebase.getValue('/rooms/' + updatedRoomID).then(function (result) {
            // console.log(JSON.stringify(result));
            _this.rooms[result['key']] = JSON.parse(JSON.stringify(result['value']));
            _this.setRoomArray();
            // console.log(this.rooms[result['key']]);
        }).catch(function (error) { return console.log("Error: " + error); });
    };
    // If someone push message(include you), function(result) will be activated.
    // It change the messages array.
    FirebaseService.prototype.syncRoomMessages = function (roomID) {
        var _this = this;
        firebase.addChildEventListener(function (result) {
            // console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
            // console.log("Value: " + JSON.stringify(result.value));
            _this.updateRoomMessages(roomID, result.key, result.value);
        }, "/rooms/" + roomID + "/messages").then(function (listenerWrapper) {
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners; // an Array of listeners added
            // you can store the wrapper somewhere to later call 'removeEventListeners'
        });
    };
    FirebaseService.prototype.updateRoomMessages = function (roomID, messageID, message) {
        if (!this.rooms[roomID]['messages']) {
            this.rooms[roomID]['messages'] = {};
        }
        this.rooms[roomID]['messages'][messageID] = JSON.parse(JSON.stringify(message));
        var messageToAdd = {};
        messageToAdd[messageID] = this.rooms[roomID]['messages'][messageID];
        if (roomID == this.selectedRoomID) {
            this.selectedRoomMessageArray.push(messageToAdd);
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
            var messageA;
            var messageB;
            for (var key in a) {
                messageA = a[key];
            }
            for (var key in b) {
                Date;
                messageB = b[key];
            }
            var time_b = messageB['timestamp']['time'];
            var time_a = messageA['timestamp']['time'];
            return time_a - time_b;
        });
    };
    // If there is no message :
    // This will ba activated when user send a message to friend after invite friend.
    FirebaseService.prototype.pushFriendOnRoom = function (user, roomID) {
        for (var uid in user) {
            firebase.setValue('/rooms/' + roomID + "/room_users/" + uid, user[uid]).then(function (result2) {
                // this.pushRoomIDOnUser(user, roomID);
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
        var friendID;
        for (var id in friend) {
            friendID = id;
        }
        var userID;
        for (var id in user) {
            userID = id;
        }
        // check room exist before generate.
        firebase.query(function (result) {
            // if friend chat room is not exist, create new room.
            if (result.value == null) {
                // console.log("no room with friendID: " + friendID);
                var openRoom = { roomUsers: {} };
                openRoom['isOpen'] = true;
                openRoom['openTime'] = new Date();
                openRoom['closeTime'] = "";
                for (var uid in user) {
                    firebase.push('/rooms/', openRoom).then(function (result2) {
                        _this.pushRoomIDOnUser(user, friend, result2.key);
                        _this.pushRoomIDOnUser(friend, user, result2.key);
                        _this.setGeneratedRoomID(result2.key);
                        // console.log("created key: " + result2.key);// Room ID
                    });
                }
            }
            else {
                // console.log(result);
                for (var roomID in result['value']) {
                    _this.selectedRoomMessageArray = _this.jsonToArray(_this.rooms[roomID]['messages']);
                }
                // console.log("exist room: " + JSON.parse(JSON.stringify(result['value'])));// Room ID
            }
        }, '/users/' + userID + '/user_rooms', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.VALUE,
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: friendID
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
    FirebaseService.prototype.pushRoomIDOnUser = function (user, friend, roomID) {
        var _this = this;
        var userRoom = {};
        userRoom['inRoom'] = true;
        userRoom['joinTime'] = Date.now();
        userRoom['leaveTime'] = "";
        for (var friendID in friend) {
            for (var uid in user) {
                userRoom['roomIcon'] = friend[friendID]["profile"]["profilePicsrc"];
                userRoom['title'] = friend[friendID]["profile"]["name"];
                userRoom['messageIcon'] = user[uid]["profile"]["profilePicsrc"];
                userRoom['userName'] = user[uid]["profile"]["name"];
                // set room access athentication on user database
                firebase.setValue('/users/' + uid + '/user_rooms/' + roomID, friendID).then(function (result) {
                    // user can write on chat room
                    firebase.setValue('/rooms/' + roomID + 'U/' + uid, userRoom).then(function (result2) {
                        // console.log(result);
                        _this.syncRoomMessages(roomID);
                        // this.syncRoom(roomID);
                    });
                });
            }
        }
    };
    // If there are some messages :
    FirebaseService.prototype.pushMessageOnRoom = function (roomID, user, message) {
        var messagePack = {};
        for (var uid in user) {
            messagePack['user'] = uid;
        }
        messagePack['message'] = message;
        messagePack['timestamp'] = new Date();
        firebase.push('/rooms/' + roomID + '/messages', messagePack).then(function (result) {
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
            // console.log(JSON.stringify(result));
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
                    // console.log("first ok");
                    // console.log(JSON.stringify(result));
                    ApplicationSettings.setBoolean("authenticated", true);
                    _this.routerExtensions.navigate(["/home"], { clearHistory: true });
                });
            }
            else {
                // console.log("user ok");
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
            var resultKeys = [];
            for (var k in result.value) {
                resultKeys.push(k);
            }
            _this.setFriends(resultKeys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
        // set rooms
        firebase.getValue('/users/' + this.authuser.uid + '/user_rooms').then(function (result) {
            var resultKeys = [];
            for (var k in result.value) {
                resultKeys.push(k);
            }
            _this.setRooms(resultKeys);
        }).catch(function (error) { return console.log("getFriendsAndThisUserFromDatabase Error: " + error); });
    };
    FirebaseService.prototype.setThisUser = function (result) {
        var key = JSON.parse(JSON.stringify(result.key));
        var value = JSON.parse(JSON.stringify(result.value));
        var user = {};
        user[key] = value;
        this.thisUser = user;
        this.analyzeUserLogin(this.authuser.uid);
        // console.log(this.thisUser);
    };
    FirebaseService.prototype.analyzeUserLogin = function (id) {
        firebase.analytics.setAnalyticsCollectionEnabled(true);
        firebase.analytics.setUserId({
            userId: id
        }).then(function () {
            // console.log("Analytics userId set");
        });
    };
    FirebaseService.prototype.setFriends = function (friendIDs) {
        var _this = this;
        // console.log(friendIDs);
        var count = 0;
        for (var i = 0; i < friendIDs.length; i++) {
            firebase.query(function (result) { }, '/users', {
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
            })
                .then(function (result) {
                _this.addFriend(result.value);
                count++;
                if (count == friendIDs.length) {
                    // this.setFriends(friendIDs);
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
    FirebaseService.prototype.setRooms = function (roomIDs) {
        var _this = this;
        // console.log(roomIDs);
        var count = 0;
        for (var i = 0; i < roomIDs.length; i++) {
            firebase.query(function (result) { }, '/rooms', {
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
            })
                .then(function (result) {
                // console.log(result);
                _this.addRoom(result.value);
                count++;
                if (count == roomIDs.length) {
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
        // for(var i=0;i<this.testData.length;i++){
        //     this.add_post(this.testData[i]);
        // }
        // this.searchPost("chat",3,37.323972, 127.125109 ,100000);
        // this.searchQueries("chat",[1,2,3,4,5,6,7,8,9],37.323972, 127.125109 ,100000);
        // this.getFileURL('asqU21QzltYOgnT5MDcgWotRJwH2','gteton-schwabachers-landing_dollar_680.jpg');
        // this.get_user_posts("I33CAKsu5uUkq4Xqt2xUVJgcGHM2");
    };
    FirebaseService.prototype.jsonToArray = function (json) {
        var array = [];
        if (json != null) {
            for (var key in json) {
                var childJson = {};
                childJson[key] = json[key];
                array.push(childJson);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUEyQztBQUMzQyxzREFBK0Q7QUFHL0Qsc0ZBQW9IO0FBS3BILDREQUE0RDtBQUU1RCw4REFBc0U7QUFDdEUsNERBQTBFO0FBRzFFLDBEQUE0RDtBQUM1RCxzREFBd0Q7QUFDeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFHakQ7SUFrQ0kseUJBQ1ksZ0JBQWtDO1FBRTFDLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsb0NBQW9DO1FBQ3BDLHFDQUFxQztRQUNyQyxpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLDhCQUE4QjtRQUM5QiwrQkFBK0I7UUFDL0IsbUJBQW1CO1FBQ25CLFNBQVM7UUFDVCwwREFBMEQ7UUFDMUQsb0JBQW9CO1FBQ3BCLE9BQU87UUFDUCxNQUFNO1FBQ04scUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIsc3JCQUFzckI7UUFDdHJCLDhOQUE4TjtRQUM5TixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLG9DQUFvQztRQUNwQyxxQ0FBcUM7UUFDckMscUNBQXFDO1FBQ3JDLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsaUJBQWlCO1FB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Q0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFwMkNRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FvQ3FCLHlCQUFnQjtPQW5DckMsZUFBZSxDQXEyQzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXIyQ0QsSUFxMkNDO0FBcjJDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTUxLaXRSZWNvZ25pemVUZXh0UmVzdWx0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWxraXQvdGV4dHJlY29nbml0aW9uXCI7XHJcbmltcG9ydCB7IE1MS2l0RGV0ZWN0RmFjZXNPbkRldmljZVJlc3VsdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2ZhY2VkZXRlY3Rpb25cIjtcclxuaW1wb3J0IHsgQmFyY29kZUZvcm1hdCwgTUxLaXRTY2FuQmFyY29kZXNPbkRldmljZVJlc3VsdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2JhcmNvZGVzY2FubmluZ1wiO1xyXG5pbXBvcnQgeyBNTEtpdEltYWdlTGFiZWxpbmdPbkRldmljZVJlc3VsdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2ltYWdlbGFiZWxpbmdcIjtcclxuaW1wb3J0IHsgTUxLaXRJbWFnZUxhYmVsaW5nQ2xvdWRSZXN1bHQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9tbGtpdC9pbWFnZWxhYmVsaW5nXCI7XHJcbmltcG9ydCB7IE1MS2l0TGFuZG1hcmtSZWNvZ25pdGlvbkNsb3VkUmVzdWx0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWxraXQvbGFuZG1hcmtyZWNvZ25pdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbmltcG9ydCB7IEltYWdlU291cmNlLCBmcm9tRmlsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBGb2xkZXIsIHBhdGgsIGtub3duRm9sZGVycyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcblxyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgYXV0aHVzZXI6IGZpcmViYXNlLlVzZXI7ICAgIFxyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB0aGlzVXNlclByb2ZpbGVQaWNzcmMgPSBcIlwiO1xyXG4gICAgcHVibGljIHRoaXNVc2VyQmFja2dyb3VuZFBpY3NyYyA9XCJcIjtcclxuICAgIHB1YmxpYyB0aGlzVXNlck5hbWUgPSBcIlwiOyAgICBcclxuICAgIHB1YmxpYyB0aGlzVVNlckVtYWlsID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHVibGljIHJvb21zID0ge307XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHB1YmxpYyBtZXNzYWdlVXBkYXRlZFRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwdWJsaWMgY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTDogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdERhdGE6IEFycmF5PGFueT47XHJcblxyXG4gICAgcHVibGljIHBvc3RTZWFyY2hSZXN1bHRBcnJheTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUG9zdElEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICApe1xyXG4gICAgICAgIC8vIHRoaXMudGVzdERhdGEgPSBbe1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBpbWFnZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogXCJcIixcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyNTI0MDYwNDgwMDk0NixcclxuICAgICAgICAvLyAgICAgbG9uZ2l0dWRlOiAxMjcuMTIwOTg1ODczMDQzNTQsXHJcbiAgICAgICAgLy8gICAgIG5hbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjUsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogNCxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDIwLFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiA1MCxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDQ0LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwNDY4MjQ0NDAwLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiNUZncmV3SmEyTWg5QzU5OGs3MEhRNDBiMXF1MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiAyLFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIk1hcnZlbCBhdCBtb3JlIHRoYW4gMiwwMDAgbmF0dXJhbCByb2NrIGFyY2hlcyBhdCB0aGlzIHBhcmsganVzdCBvdXRzaWRlIG9mIE1vYWIuIFNvbWUgb2YgdGhlIGZvcm1hdGlvbnMgY2FuIGJlIHNwb3R0ZWQgZnJvbSB0aGUgcm9hZCwgYnV0IHRoZSBiZXN0IHJlcXVpcmUgYSBzY2VuaWMgaGlrZS4gRG9u4oCZdCBtaXNzIHRoZSBmYW1vdXMgRGVsaWNhdGUgQXJjaCAoMyBtaWxlcyByb3VuZC10cmlwKSBvciB0aGUgNy1taWxlIChyb3VuZC10cmlwKSBEZXZpbHMgR2FyZGVuIExvb3AuXFxuXFxuVGhlIFBhcmsgQXZlbnVlIFRyYWlsIGlzIHRoZSBtb3N0IHBvcHVsYXIgaGlrZSBpbiB0aGUgcGFyayBiZWNhdXNlIG9mIGl0cyBlYXNlIGFuZCBzY2VuZXJ5IGF0IGp1c3QgMiBtaWxlcyByb3VuZCB0cmlwLiBPciB0cnkgdGhlIG1vcmUgY2hhbGxlbmdpbmcgaGlrZSB0byBEZWxpY2F0ZSBBcmNoZXMgYXQgMy4yIG1pbGVzIHJvdW5kIHRyaXAuXFxuXFxuV2hldGhlciB5b3UgYXJlIGNhbXBpbmcgb3Igc3RheWluZyBpbiBhIGhvdGVsLCBkb27igJl0IGZvcmdldCB0byBzcGVuZCBzb21lIHRpbWUgbG9va2luZyB1cCBhdCB0aGUgc2t5IGFmdGVyIG5pZ2h0IGZhbGxzLiBZb3XigJlsbCBmaW5kIHNvbWUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gYW5kIGFyb3VuZCBVdGFo4oCZcyBuYXRpb25hbCBwYXJrcy5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJTJGYXJjaGVzLWRlbGljYXRlLWFyY2gtc2t5X2Fkb2JlXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTZjYjQ4YWI1LTk2ZjUtNDNiMi05ZWExLTY3NDljZGJlZDM4ZlwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMzA4MDQ2OTI1MjI1NCxcclxuICAgICAgICAvLyAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTU3OTgyODAyMzgsXHJcbiAgICAgICAgLy8gICAgIG5hbWUgOiBcIkFyY2hlcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgLy8gICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgIC8vICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAvLyAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgIC8vICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAvLyAgICAgICBtaW51dGVzIDogMzQsXHJcbiAgICAgICAgLy8gICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgIC8vICAgICAgIHNlY29uZHMgOiA0OSxcclxuICAgICAgICAvLyAgICAgICB0aW1lIDogMTU0MDM0MTI4OTkxOCxcclxuICAgICAgICAvLyAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgLy8gICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICByb2xlcyA6IHtcIkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgLy8gICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgIC8vICAgfSxcclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAvLyAgICAgbnVtYmVyIDogOCxcclxuICAgICAgICAvLyAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAvLyAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uIDogXCJOaWNrbmFtZWQgdGhlIFxcXCJDcm93biBvZiB0aGUgQ29udGluZW50LFxcXCIgR2xhY2llciBOYXRpb25hbCBQYXJrIHNpdHMgaW4gdGhlIG5vcnRod2VzdCBjb3JuZXIgb2YgTW9udGFuYS4gR2xhY2llciBOYXRpb25hbCBQYXJrIGlzIGp1c3QgYSBzY2VuaWMgZGF54oCZcyBkcml2ZSBub3J0aCBmcm9tIFllbGxvd3N0b25lLlxcblxcbkhpdCB0aGUgdHJhaWwgdG8gZXhwbG9yZSBwbGFjZXMgbGlrZSBGaXNoZXJjYXAgTGFrZSAocGljdHVyZWQpLCB3aGljaCBpcyBhIGdyZWF0IHBsYWNlIHRvIHNwb3QgYSBtb29zZS4gRnJvbSBNYW55IEdsYWNpZXIgQ2FtcGdyb3VuZCwgZ28gdG8gdGhlIFN3aWZ0Y3VycmVudCBNb3RvciBJbm4gcGFya2luZyBsb3QuIFRoZSB0cmFpbGhlYWQgaXMgb24gdGhlIHdlc3QgZW5kLiBZb3UnbGwgZmluZCB0aGUgbGFrZSBsZXNzIHRoYW4gYSBtaWxlIGRvd24gdGhlIHRyYWlsLiBDb250aW51ZSAxLjUgbWlsZXMgdG8gUmVkcm9jayBMYWtlIGFuZCB0YWtlIGEgc3B1ciB0byBSZWRyb2NrIEZhbGxzLlxcblxcbkEgTmF0aW9uYWwgSGlzdG9yaWMgTGFuZG1hcmssIEdvaW5nLXRvLXRoZS1TdW4gUm9hZCBpcyBvbmUgb2YgdGhlIG1vc3Qgc2NlbmljIHJvYWRzIGluIE5vcnRoIEFtZXJpY2EsIG5vdCB0byBtZW50aW9uIG9uZSBvZiB0aGUgbW9zdCBjb21wbGV4IHRvIGJ1aWxkLiBUaGUgZmluYWwgc2VjdGlvbiwgb3ZlciBMb2dhbiBQYXNzLCB3YXMgY29tcGxldGVkIGluIDE5MzIgYWZ0ZXIgMTEgeWVhcnMgb2Ygd29yay4gQ29uc2lkZXJlZCBhbiBlbmdpbmVlcmluZyBmZWF0LCB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSByb2FkIGZvcmV2ZXIgY2hhbmdlZCB0aGUgd2F5IHZpc2l0b3JzIHdvdWxkIGV4cGVyaWVuY2UgR2xhY2llciBOYXRpb25hbCBQYXJrLiBGdXR1cmUgdmlzaXRvcnMgd291bGQgYmUgYWJsZSB0byBkcml2ZSBvdmVyIHNlY3Rpb25zIG9mIHRoZSBwYXJrIHRoYXQgcHJldmlvdXNseSBoYWQgdGFrZW4gZGF5cyBvZiBob3JzZWJhY2sgcmlkaW5nIHRvIHNlZS5cXG5cXG5JbiB0aGVpciBhYmlsaXR5IHRvIHdvdyB2aXNpdG9ycywgWWVsbG93c3RvbmUgYW5kIEdsYWNpZXIgc2hhcmUgYSBjb21tb24gYm9uZC4gQnV0IGFzIHdpdGggYW55IGdyZWF0IGRlc3RpbmF0aW9uLCB0aGVyZSBhcmUgc29tZSBhZHZlbnR1cmVzIHRoYXQgYXJlIGZvdW5kIG5vd2hlcmUgZWxzZS4gR2xhY2llciBwcmVzZXJ2ZXMgb3ZlciAxLDAwMCwwMDAgYWNyZXMgb2YgZm9yZXN0cywgYWxwaW5lIG1lYWRvd3MgYW5kIGxha2VzLiBJdHMgZGl2ZXJzZSBoYWJpdGF0cyBhcmUgaG9tZSB0byBvdmVyIDcwIHNwZWNpZXMgb2YgbWFtbWFscyBhbmQgb3ZlciAyNjAgc3BlY2llcyBvZiBiaXJkcy4gVGhlIHNwZWN0YWN1bGFyIGdsYWNpYXRlZCBsYW5kc2NhcGUgaXMgYSBoaWtlcuKAmXMgcGFyYWRpc2UsIGNvbnRhaW5pbmcgNzAwIG1pbGVzIG9mIG1haW50YWluZWQgdHJhaWxzIHRoYXQgbGVhZCBkZWVwIGludG8gb25lIG9mIHRoZSBsYXJnZXN0IGludGFjdCBlY29zeXN0ZW1zIGluIHRoZSBsb3dlciA0OCBzdGF0ZXMuXCIsXHJcbiAgICAgICAgLy8gICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGSGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJIY0JqUkxzelZuUzV0UHNjRFdnMFpET294eFAySGNCalJMc3pWblM1dFBzY0RXZzBaRE9veHhQMkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDIlMkZnbGFjaWVyLWF2YWxhY2hlLWxha2Uta2lkc19hZG9iZV82ODAuanBnP2FsdD1tZWRpYSZ0b2tlbj01MDg3MGM1ZS1iMWU2LTRkNTEtYmU5YS1kOWNkMmQ2MjcyNDJcIixcclxuICAgICAgICAvLyAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgbGlrZXMgOiAxNTIsXHJcbiAgICAgICAgLy8gICAgIGxhdGl0dWRlOiAzNy4zMjE2MDIzMDU2NjQyMyxcclxuICAgICAgICAvLyAgICAgbG9uZ2l0dWRlOiAxMjcuMTI4MDYwMTk5MzIwMzMsXHJcbiAgICAgICAgLy8gICAgIG5hbWUgOiBcIkdsYWNpZXIgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogMyxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogMyxcclxuICAgICAgICAvLyAgICAgICB0aW1lIDogMTU0MDM0MTU0Mzc5NCxcclxuICAgICAgICAvLyAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgLy8gICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICByb2xlcyA6IHtcIkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgLy8gICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgIC8vICAgfSxcclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAvLyAgICAgbnVtYmVyIDogNixcclxuICAgICAgICAvLyAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAvLyAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZGVzY3JpcHRpb24gOiBcIkp1c3QgMTUgbWlsZXMgc291dGggb2YgTW9hYiwgaGlrZSB5b3VyIHdheSB0aHJvdWdoIDMzNywgNTk4IGFjcmVzIG9mIGRyYW1hdGljIHJlZC1yb2NrIGxhbmRzY2FwZSBpbiBDYW55b25sYW5kcyBOUCwgYW5kIGRvIGl0IGFsbCB3aXRob3V0IGhhdmluZyB0byBjb21wZXRlIGZvciByb29tIG9uIHRoZSB0cmFpbCAtIENhbnlvbmxhbmRzIGlzIGJvdGggVXRhaOKAmXMgbGFyZ2VzdCBhbmQgbGVhc3QgdmlzaXRlZCBwYXJrLlxcblxcblRoZSByaXZlci1jYXJ2ZWQgcGFyayBib2FzdHMgMzYwLWRlZ3JlZSB2aWV3cyBvZiBydXN0LWNvbG9yZWQgYXJjaGVzLCBidXR0ZXMsIGFuZCBjbGlmZnMgLSBidXQgYmVjYXVzZSBvZiB0aGUgaGlnaC1kZXNlcnQgcm9jayBlbnZpcm9ubWVudCwgaXRzIGNsaW1hdGUgaXMgc3ViamVjdCB0byBleHRyZW1lIHRlbXBlcmF0dXJlIGZsdWN0dWF0aW9ucy4gU2tpcCBwYWNraW5nIHRoZSBwYXJrYSwgYW5kIGdvIGluIHRoZSBzcHJpbmcgb3IgZmFsbCBmb3IgdGhlIG1vc3QgbW9kZXJhdGUsIGFuZCBtb3N0IGZvcmdpdmluZywgd2VhdGhlci5cXG5cXG5TbyBleHBhbnNpdmUgaXTigJlzIGRpdmlkZWQgaW50byBmb3VyIGRpc3RyaWN0cywgQ2FueW9ubGFuZHMgZGVsaXZlcnMgYSBxdWludGVzc2VudGlhbCBkZXNlcnQgZXhwZXJpZW5jZTogZGVlcCBjYW55b25zLCBwcmVoaXN0b3JpYyByb2NrIGFydCwgcml2ZXJzLCBhbmQgc3dlZXBpbmcgb3Zlcmxvb2tzLlxcblxcbkFtb25nIHRoZSBleGNlcHRpb25hbCwgc3RyaWF0ZWQgcm9jayBmb3JtYXRpb25zLCB0aGVyZSBhcmUgbGFuZG1hcmtzIHlvdSBzaG91bGRu4oCZdCBtaXNzLCBsaWtlIHRoZSB1bnVzdWFsIDE1MDAtZm9vdCBVcGhlYXZhbCBEb21lIC0gdGhvdWdodCB0byBiZSBhIG1ldGVvcml0ZSBjcmF0ZXIgLSBvciB0aGUgRHJ1aWQgQXJjaCwgb2Z0ZW4gcmVmZXJyZWQgdG8gYXMgVXRhaOKAmXMgb3duIFN0b25laGVuZ2UuIEtlZXAgd2F0Y2ggZm9yIHRoZSB3aWxkbGlmZSwgdG9vLiBCaWdob3JuIHNoZWVwIHRha2UgcmVzaWRlbmNlIGluIHRoZSBjYW55b25zIGFuZCBidXR0ZXMsIGFsb25nIHdpdGggbXVsZSBkZWVyLCBrYW5nYXJvbyByYXRzLCBhbmQgY295b3RlLiBMb29rIHVwIGZvciByZWQtIHRhaWxlZCBoYXdrcywgYW5kIGF0IG5pZ2h0LCBmb3Igb25lIG9mIHRoZSBkYXJrZXN0IHNraWVzIGluIHRoZSBMb3dlciA0OC4gT24gYSBtb29ubGVzcyBuaWdodCwgZ2V0IG1vcmUgdGhhbiB5b3VyIGZpbGwgb2Ygc3RhcnMgLSBvciBnZXQgb3V0IHRoZSBiaW5vY3VsYXJzIHRvIHRyeSBmb3IgdGhlIHJpbmdzIG9mIFNhdHVybi5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yJTJGY2FueW9ubGFuZHMtbWVzYS1hcmNoLXN1bnJpc2VfZG9sbGFyXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTkxNzVmNjlkLWE1YjItNDgyOC04Yjk4LWQwNWQxZDFlMGY2MVwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDM4NSxcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiQ2FueW9ubGFuZHMgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIC8vICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAvLyAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgLy8gICAgICAgZGF5IDogMyxcclxuICAgICAgICAvLyAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgLy8gICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgIC8vICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAvLyAgICAgICBzZWNvbmRzIDogMjcsXHJcbiAgICAgICAgLy8gICAgICAgdGltZSA6IDE1NDAzNDE1Njc4ODksXHJcbiAgICAgICAgLy8gICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgIC8vICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgcm9sZXMgOiB7XCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgIC8vICAgICB0eXBlIDogXCJjaGF0XCJcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gICB7XHJcbiAgICAgICAgLy8gICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAvLyAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIG51bWJlciA6IDUsXHJcbiAgICAgICAgLy8gICAgIHN0YXRlIDogXCJiYWRcIixcclxuICAgICAgICAvLyAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uIDogXCJEaXZpZGVkIGJ5IGEgMjc3LW1pbGUgbG9uZyBjYW55b24sIGFuZCB0aGUgbWlsZS1kZWVwIENvbG9yYWRvIFJpdmVyLCB0aGUgdHdvIGhhbHZlcyBvZiBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyaywgdGhlIE5vcnRoIGFuZCBTb3V0aCBSaW0sIG9mZmVyIHR3byBwYXJrcyBpbiBvbmUsIHdpdGggZGl2ZXJzZSBsYW5kc2NhcGUgYW5kIGVjb2xvZ3kgb24gZWl0aGVyLlxcblxcbkdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCBhbmQgdGhlIGdyZWF0ZXIgR3JhbmQgQ2FueW9uIHJlZ2lvbiwgaXMgYSBoaWtlcidzIGRyZWFtLiBNb3N0IG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrIGlzIHVuZGV2ZWxvcGVkIGJhY2tjb3VudHJ5LiBUaGVyZSBhcmUgbGl0ZXJhbGx5IGh1bmRyZWRzIG9mIG1pbGVzIHRvIGhpa2UsIGJhY2twYWNrIGFuZCBleHBsb3JlLiBEZXNwaXRlIHRoZSBHcmFuZCBDYW55b24ncyBwb3B1bGFyaXR5IGFuZCBudW1iZXJzIG9mIHZpc2l0b3JzIGVhY2ggeWVhciwgdmlzaXRvcnMgb25seSBuZWVkIHRvIGhpa2UgYSBzbWFsbCBkaXN0YW5jZSB0byBlbmpveSBzb21lIHNvbGl0dWRlLlxcblxcbkV4cGxvcmUgdGhlIGRlcHRocyBvZiB0aGUgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgb24gcG9wdWxhciB0cmFpbHMgbGlrZSB0aGUgQnJpZ2h0IEFuZ2VsIGFuZCBTb3V0aCBLYWliYWIgdHJhaWwgb24gYSBtdWxlLiBBIEdyYW5kIENhbnlvbiBtdWxlIHJpZGUgaXMgYW4gYWR2ZW50dXJlIGFuZCBlYXN5IG9uIHlvdXIgbGVncy5cXG5cXG5PbmUgb2YgdGhlIG1vc3QgZXhjaXRpbmcgd2F5cyB0byBleHBlcmllbmNlIHRoZSBHcmFuZCBDYW55b24gaXMgdG8gZmxvYXQgdGhyb3VnaCBpdCBieSB3YXkgb2YgcmFmdCBvbiB0aGUgQ29sb3JhZG8gUml2ZXIuIE1vc3QgcGVvcGxlIGJvb2sgdGhlaXIgdHJpcCB3aXRoIGEgY29tbWVyY2lhbCBvdXRmaXR0ZXIgYW5kIHlvdSBjYW4gZXZlbiBjb21iaW5lIHRoZSByYWZ0aW5nIHRyaXAgd2l0aCBhIGhlbGljb3B0ZXIgcmlkZS4gRXhwZXJpZW5jZWQgd2hpdGV3YXRlciByYWZ0ZXI/IEVudGVyIHRoZSBsb3R0ZXJ5IHRvIGRvIHlvdXIgb3duIHRyaXAuXCIsXHJcbiAgICAgICAgLy8gICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MSUyRmdjLXlhdmFwYWktcG9pbnQtc3Vuc2V0X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTUxODBlMmY0LTk5YTYtNGUxZS1iNzQ0LWZhZWJhZjkyMDRlOVwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDUxNCxcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMTI4Mzk1Mjc3NDY4LFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjYxNDUxMDIwODM2NyxcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAvLyAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgLy8gICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgIC8vICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgLy8gICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDQ5LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxNTg5Njc0LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiTmZZRTJkRjJ3bGZTQld3V3ZFazBLc2lUczF0MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiAxLFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBkZXNjcmlwdGlvbiA6IFwiTWF4aW1pemUgeW91ciBleHBlcmllbmNlIGF0IEJyeWNlIENhbnlvbiBOYXRpb25hbCBQYXJrIGJ5IGRyaXZpbmcgdG8gU3VucmlzZSwgU3Vuc2V0LCBJbnNwaXJhdGlvbiBhbmQgQnJ5Y2Ugdmlld3BvaW50cy4gVGhlc2UgYXJlIGFsbCBzcGVjdGFjdWxhciBvdmVybG9va3Mgb2YgdGhlIHBhcmvigJlzIHJlZCBob29kb29zIHNob290aW5nIHVwIGFnYWluc3QgZXZlcmdyZWVuIGZvcmVzdHMgaW4gdGhlIGJhY2tncm91bmQuIERlcGVuZGluZyBvbiB0aGUgdGltZSBvZiBkYXksIGFuZCB0aGUgYW5nbGUgYW5kIGxpZ2h0IG9mIHRoZSBzdW4sIHRoZSBob29kb29zIGFuZCBteXN0ZXJpb3VzIHJvY2sgZm9ybWF0aW9ucyBvZnRlbiB0YWtlIG9uIHVudXN1YWwgcGF0dGVybnMgYW5kIHNoYXBlcywgYW5kIHNvbWUgdGhpbmssIGltYWdpbmFyeSBmYWNlcy5cXG5cXG5Gb3IgbW9yZSBpbnNwaXJhdGlvbiwgbGFjZSB1cCB5b3VyIGhpa2luZyBib290cyBvciBvdGhlciBzdHVyZHkgc2hvZXMgYW5kIGV4cGxvcmUgYSB0cmFpbC4gVGhlcmUgaXMgc29tZXRoaW5nIGZvciBldmVyeW9uZSBhdCBCcnljZSBDYW55b24uIE91ciBmYXZvcml0ZSBlYXN5IGhpa2VzIGluY2x1ZGUgQnJpc3RsZWNvbmUgTG9vcCBUcmFpbCBhbmQgUXVlZW5zIEdhcmRlbiBUcmFpbC4gSGF0IFNob3AgaXMgb3VyIGZhdm9yaXRlIG1vZGVyYXRlIGhpa2UuIEZvciBtb3JlIHBoeXNpY2FsbHkgZml0IGhpa2VycyBsb29raW5nIGZvciBhIHN0cmVudW91cyBhZHZlbnR1cmUsIGRvIHRoZSA1LjUtbWlsZSB2ZXJ0aWNhbGx5IGNoYWxsZW5naW5nIFBlZWstQS1Cb28gTG9vcCBvciB0aGUgNy45IEZhaXJ5bGFuZCBMb29wIHJhdGVkIOKAnGRpZmZpY3VsdOKAnSBieSB0aGUgcGFyayBzZXJ2aWNlLiBcIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZSejIweUM3TEVTT0NEVW9hNHNwNjl2NWNvcFQyJTJGYnJ5Y2UtYW1waGl0aGVhdGVyLWluc3BpcmF0aW9uLXBvaW50X2RwXzY4MC5qcGc/YWx0PW1lZGlhJnRva2VuPTA2ZDE1NGI3LTgwZDgtNDZjOS05ZmRmLWUzZTcwZWM0Mzk1MVwiLFxyXG4gICAgICAgIC8vICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAvLyAgICAgbGF0aXR1ZGU6IDM3LjMyMDg2MzIxMjk2NzMyLFxyXG4gICAgICAgIC8vICAgICBsb25naXR1ZGU6IDEyNy4xMjQzNTg3NTA4Nzk3NixcclxuICAgICAgICAvLyAgICAgbmFtZSA6IFwiQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAvLyAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgLy8gICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgIC8vICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgLy8gICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDIxLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxNjIxMzgxLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiUnoyMHlDN0xFU09DRFVvYTRzcDY5djVjb3BUMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9LFxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBudW1iZXIgOiA5LFxyXG4gICAgICAgIC8vICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBkZXNjcmlwdGlvbiA6IFwiR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBwcmVzZXJ2ZXMgYSBzcGVjdGFjdWxhciBsYW5kc2NhcGUgcmljaCB3aXRoIG1hamVzdGljIG1vdW50YWlucywgcHJpc3RpbmUgbGFrZXMsIGFuZCBleHRyYW9yZGluYXJ5IHdpbGRsaWZlLiBUaGUgYWJydXB0IHZlcnRpY2FsIHJpc2Ugb2YgdGhlIGphZ2dlZCBUZXRvbiBNb3VudGFpbnMgY29udHJhc3RzIHdpdGggdGhlIGhvcml6b250YWwgc2FnZS1jb3ZlcmVkIHZhbGxleSBhbmQgZ2xhY2lhbCBsYWtlcyBhdCBpdHMgYmFzZS5cXG5cXG5JdCB0b29rIG1vcmUgdGhhbiAzMCB5ZWFycyBmb3IgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB0byB0cmFuc2Zvcm0gZnJvbSBhbiBpZGVhIHRvIG9uZSBvZiB0aGUgY291bnRyeSdzIG1vc3Qgc3R1bm5pbmcgcGFya3MuIFdoZW4gQ29uZ3Jlc3MgY3JlYXRlZCB0aGUgcGFyayBpbiAxOTI5LCBpdCBvbmx5IGluY2x1ZGVkIHRoZSBUZXRvbiBSYW5nZSBhbmQgc2l4IGdsYWNpYWwgbGFrZXMuIEpvaG4gRC4gUm9ja2VmZWxsZXIsIEpyLiwgcGxheWVkIGEga2V5IHJvbGUgaW4gYWNxdWlyaW5nIGFuIGFkZGl0aW9uYWwgMzUsMDAwIGFjcmVzIGZvciB0aGUgcGFyayB1bmRlciB0aGUgbmFtZSBcXFwiU25ha2UgUml2ZXIgTGFuZCBDby5cXFwiIEFtaWQgY29udHJvdmVyc3kgdGhlIFxcXCJuZXdcXFwiIEdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgd2FzIGVzdGFibGlzaGVkIFNlcHQuIDE0LCAxOTUwLCBieSBQcmVzaWRlbnQgSGFycnkgVHJ1bWFuLlxcblxcbkdyYW5kIFRldG9uIE5hdGlvbmFsIFBhcmsgYW5kIGl0cyB3b3JsZC1jbGFzcyBzY2VuZXJ5IGF0dHJhY3RzIG5lYXJseSA0IG1pbGxpb24gdmlzaXRvcnMgcGVyIHllYXIuIFdpdGggSmVubnkgTGFrZSBhbmQgSmFja3NvbiBMYWtlIGF0IDYsMzIwIGZlZXQgYW5kIHRoZSBzdW1taXQgb2YgdGhlIEdyYW5kIFRldG9uIGF0IDEzLDc3MCBmZWV0LCB0aGUgcGFyaydzIGVsZXZhdGlvbiByYW5nZXMgY3JlYXRlIG9uZSBvZiB0aGUgbmF0aW9uJ3MgbW9zdCBhd2UtaW5zcGlyaW5nIGxhbmRzY2FwZXMuIEluIGFkZGl0aW9uIHRvIGdhemluZyBhdCB0aGUgaW5jcmVkaWJsZSB2aWV3cywgdGhlcmUgaXMgbXVjaCB0byBkbyBpbiB0aGlzIHBhcmsgZnJvbSBoaWtpbmcgYW5kIHJvY2sgY2xpbWJpbmcgdG8gYm9hdGluZyBhbmQgZmlzaGluZy4gQW5kIHdoZW4geW91IG5lZWQgYSBicmVhayBmcm9tIG91dGRvb3IgYWR2ZW50dXJlLCB0aGVyZSBhcmUgZmV3IGJldHRlciBwbGFjZXMgdG8gc2ltcGx5IHJlbGF4IGFuZCB3YXRjaCB0aGUgcGFyaydzIGluY3JlZGlibGUgd2lsZGxpZmUuXCIsXHJcbiAgICAgICAgLy8gICAgIGltYWdlIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMiUyRmd0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZz9hbHQ9bWVkaWEmdG9rZW49ZDNhYmZiZDAtYjcyNS00YjBjLTk3ZTUtZjYxNmJkYjcwMzA1XCIsXHJcbiAgICAgICAgLy8gICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGxpa2VzIDogMTY5LFxyXG4gICAgICAgIC8vICAgICBsYXRpdHVkZTogMzcuMzIxMzc0ODcyNzkxMDgsXHJcbiAgICAgICAgLy8gICAgIGxvbmdpdHVkZTogMTI3LjEyMjEwMDY2NjE2NTM3LFxyXG4gICAgICAgIC8vICAgICBuYW1lIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgLy8gICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgIC8vICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAvLyAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgIC8vICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAvLyAgICAgICBtaW51dGVzIDogNDAsXHJcbiAgICAgICAgLy8gICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgIC8vICAgICAgIHNlY29uZHMgOiA0NyxcclxuICAgICAgICAvLyAgICAgICB0aW1lIDogMTU0MDM0MTY0Nzc2MixcclxuICAgICAgICAvLyAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgLy8gICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICByb2xlcyA6IHtcImFzcVUyMVF6bHRZT2duVDVNRGNnV290Ukp3SDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgLy8gICAgIHR5cGUgOiBcImNoYXRcIlxyXG4gICAgICAgIC8vICAgfSxcclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAvLyAgICAgbnVtYmVyIDogMyxcclxuICAgICAgICAvLyAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAvLyAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uIDogXCJFeHBsb3JlIFNvdXRoIERha290YeKAmXMgQmxhY2sgSGlsbHMgcmVnaW9uLCBhIG5hdHVyYWwgd29uZGVyIGluIGl0cyBvd24gcmlnaHQuIExvY2F0ZWQgYWJvdXQgc2l4IGhvdXJzIGZyb20gWWVsbG93c3RvbmUsIHRoZSBCbGFjayBIaWxscyBhcmUgaG9tZSB0byBzZXZlbiBuYXRpb25hbCBzaXRlcyDigJQgQmFkbGFuZHMgTmF0aW9uYWwgUGFyaywgSmV3ZWwgQ2F2ZSBOYXRpb25hbCBNb251bWVudCwgdGhlIExld2lzICYgQ2xhcmsgTmF0aW9uYWwgSGlzdG9yaWMgVHJhaWwsIE1pbnV0ZW1hbiBNaXNzaWxlIE5hdGlvbmFsIEhpc3RvcmljIFNpdGUsIE1pc3NvdXJpIE5hdGlvbmFsIFJlY3JlYXRpb25hbCBSaXZlciwgTW91bnQgUnVzaG1vcmUgTmF0aW9uYWwgTWVtb3JpYWwsIGFuZCBXaW5kIENhdmUgTmF0aW9uYWwgUGFyay5cXG5cXG5JbiB0aGlzIG5hdHVyYWwgcGxheWdyb3VuZCwgeW91IGNhbiBlbmpveSBhbiBhYnVuZGFuY2Ugb2YgcmVjcmVhdGlvbmFsIG9wcG9ydHVuaXRpZXMsIGdvcmdlb3VzIHNjZW5pYyBkcml2ZXMg4oCUIHdoaWNoIGluY2x1ZGUgdGhlIGJlYXV0aWZ1bCBTcGVhcmZpc2ggQ2FueW9uIOKAlCBhbmQgd2lsZGxpZmUtd2F0Y2hpbmcuIFRoaXMgcmVnaW9uIGlzIGFsc28gcGFja2VkIHdpdGggY3VsdHVyYWwgYW5kIGhpc3RvcmljYWwgc2l0ZXMuXFxuXFxuV2hpbGUgeW91IHdvbuKAmXQgc2VlIHNhYmVyLXRvb3RoZWQgY2F0cyBvciByaGlub2Nlcm9zZXMgcm9hbWluZyB0aGUgQmFkbGFuZHMgbGlrZSB0aGV5IG9uY2UgZGlkLCB5b3UgbWF5IHNlZSB0aGVpciByZW1haW5zIGluIHRoaXMgc3R1bm5pbmcgbmF0aW9uYWwgcGFyayB3aXRoIHNvbWUgb2YgdGhlIHdvcmxk4oCZcyByaWNoZXN0IGZvc3NpbCBkZXBvc2l0cy5cXG5cXG5Mb2NhdGVkIGluIEltbGF5IFRvd25zaGlwIGluIFNvdXRoIERha290YSwgQmFkbGFuZHMgTmF0aW9uYWwgUGFyayBoYXMgYSBGb3NzaWwgUHJlcGFyYXRpb24gTGFiIHdoZXJlIHlvdSBjYW4gd2F0Y2ggcGFsZW9udG9sb2dpc3RzIGF0IHdvcmssIGxpdGVyYWxseSB1bmNvdmVyaW5nIHRoZSBhbmNpZW50IGhpc3Rvcnkgb2YgdGhlIGFyZWEuIEF0IHRoZSBCZW4gUmVpZmVsIFZpc2l0b3IgQ2VudGVyLCBraWRzIGNhbiB1c2UgYSB0b3VjaHNjcmVlbiB0byBhc3NlbWJsZSBhIHZpcnR1YWwgc2tlbGV0b24gYW5kIHRvdWNoIGZvc3NpbGl6ZWQgYW5pbWFsIHJlcGxpY2FzLiBZb3UgYWxzbyBjYW4gd2F0Y2ggdGhlIGZpbG0gTGFuZCBvZiBTdG9uZSBhbmQgTGlnaHQgaW4gdGhlIGNlbnRlcuKAmXMgOTUtc2VhdCBhaXItY29uZGl0aW9uZWQgdGhlYXRlci5cIixcclxuICAgICAgICAvLyAgICAgaW1hZ2UgOiBcImh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2hhdC1kZW1vLTVkM2E3LmFwcHNwb3QuY29tL28vdXNlcnMlMkZheVF0NVZmd3dPaHpaN1VFdFBNWHJIdGltY2UyJTJGYmFkbGFuZHNfd2lraXBkXzY4MHgzOTIuanBnP2FsdD1tZWRpYSZ0b2tlbj01ZDY3MmMyNS03YmQxLTQyMjEtYTlkZC03MTRlYzg5MDk5MTRcIixcclxuICAgICAgICAvLyAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgbGlrZXMgOiAyMjcsXHJcbiAgICAgICAgLy8gICAgIGxhdGl0dWRlOiAzNy4zMjAxMDE0NDkyODc4MSxcclxuICAgICAgICAvLyAgICAgbG9uZ2l0dWRlOiAxMjcuMTIyNTI5MTQ5MDU1NDgsXHJcbiAgICAgICAgLy8gICAgIG5hbWUgOiBcIkJhZGxhbmRzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAvLyAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgLy8gICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgIC8vICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgLy8gICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgIC8vICAgICAgIG1pbnV0ZXMgOiA0MSxcclxuICAgICAgICAvLyAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgLy8gICAgICAgc2Vjb25kcyA6IDExLFxyXG4gICAgICAgIC8vICAgICAgIHRpbWUgOiAxNTQwMzQxNjcxOTQ3LFxyXG4gICAgICAgIC8vICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAvLyAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHJvbGVzIDoge1wiYXlRdDVWZnd3T2h6WjdVRXRQTVhySHRpbWNlMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAvLyAgICAgdHlwZSA6IFwiY2hhdFwiXHJcbiAgICAgICAgLy8gICB9XVxyXG5cclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLnRleHRSZWNvZ25pdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuZmFjZURldGVjdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuYmFyY29kZVNjYW5uaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbWFnZUxhYmVsaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5sYW5kbWFya1JlY29nbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ29vZ2xlIGFuYWx5dGljcyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGFuYWx5dGljc0NvdW50KGFjdGl2aXR5TmFtZTogc3RyaW5nKTogdm9pZHtcclxuICAgICAgICBmaXJlYmFzZS5hbmFseXRpY3MubG9nRXZlbnQoe1xyXG4gICAgICAgICAgICBrZXk6IGFjdGl2aXR5TmFtZVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgQW5hbHl0aWNzIGV2ZW50IGxvZ2dlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmaXJlYmFzZSBtbCBraXQgdGVzdCAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRleHRSZWNvZ25pdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IGZvbGRlcjogRm9sZGVyID0gPEZvbGRlcj4ga25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXJQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiaW1hZ2VzL1dlZ2VfZGVyX3BhcmxhbWVudGFyaXNjaGVuX0RlbW9rcmF0aWUuanBnXCIpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlU291cmNlOiBJbWFnZVNvdXJjZSA9IDxJbWFnZVNvdXJjZT4gZnJvbUZpbGUoZm9sZGVyUGF0aCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGltYWdlU291cmNlKTtcclxuICAgICAgICBmaXJlYmFzZS5tbGtpdC50ZXh0cmVjb2duaXRpb24ucmVjb2duaXplVGV4dE9uRGV2aWNlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlU291cmNlIC8vIGEgTmF0aXZlU2NyaXB0IEltYWdlIG9yIEltYWdlU291cmNlLCBzZWUgdGhlIGRlbW8gZm9yIGV4YW1wbGVzXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBNTEtpdFJlY29nbml6ZVRleHRSZXN1bHQpID0+IHsgLy8ganVzdCBsb29rIGF0IHRoaXMgdHlwZSB0byBzZWUgd2hhdCBlbHNlIGlzIHJldHVybmVkXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC50ZXh0ID8gcmVzdWx0LnRleHQgOiBcIlwiKTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmFjZURldGVjdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IGZvbGRlcjogRm9sZGVyID0gPEZvbGRlcj4ga25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXJQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiaW1hZ2VzL3NhbnNvby5qcGdcIik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VTb3VyY2U6IEltYWdlU291cmNlID0gPEltYWdlU291cmNlPiBmcm9tRmlsZShmb2xkZXJQYXRoKTtcclxuICAgICAgICBmaXJlYmFzZS5tbGtpdC5mYWNlZGV0ZWN0aW9uLmRldGVjdEZhY2VzT25EZXZpY2Uoe1xyXG4gICAgICAgICAgICBpbWFnZTogaW1hZ2VTb3VyY2UsIC8vIGEgTmF0aXZlU2NyaXB0IEltYWdlIG9yIEltYWdlU291cmNlLCBzZWUgdGhlIGRlbW8gZm9yIGV4YW1wbGVzXHJcbiAgICAgICAgICAgIGRldGVjdGlvbk1vZGU6IFwiYWNjdXJhdGVcIiwgLy8gZGVmYXVsdCBcImZhc3RcIlxyXG4gICAgICAgICAgICBlbmFibGVGYWNlVHJhY2tpbmc6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgbWluaW11bUZhY2VTaXplOiAwLjI1IC8vIGRlZmF1bHQgMC4xICh3aGljaCBtZWFucyB0aGUgZmFjZSBtdXN0IGJlIGF0IGxlYXN0IDEwJSBvZiB0aGUgaW1hZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBNTEtpdERldGVjdEZhY2VzT25EZXZpY2VSZXN1bHQpID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5mYWNlcykpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICBiYXJjb2RlU2Nhbm5pbmcoKXtcclxuICAgICAgICBjb25zdCBmb2xkZXI6IEZvbGRlciA9IDxGb2xkZXI+IGtub3duRm9sZGVycy5jdXJyZW50QXBwKCk7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyUGF0aDogc3RyaW5nID0gcGF0aC5qb2luKGZvbGRlci5wYXRoLCBcImltYWdlcy9xcmNvZGUucG5nXCIpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlU291cmNlOiBJbWFnZVNvdXJjZSA9IDxJbWFnZVNvdXJjZT4gZnJvbUZpbGUoZm9sZGVyUGF0aCk7XHJcbiAgICAgICAgZmlyZWJhc2UubWxraXQuYmFyY29kZXNjYW5uaW5nLnNjYW5CYXJjb2Rlc09uRGV2aWNlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlU291cmNlLFxyXG4gICAgICAgICAgICBmb3JtYXRzOiBbQmFyY29kZUZvcm1hdC5RUl9DT0RFLCBCYXJjb2RlRm9ybWF0LkNPREFCQVJdIC8vIGxpbWl0IHJlY29nbml0aW9uIHRvIGNlcnRhaW4gZm9ybWF0cyAoZmFzdGVyKSwgb3IgbGVhdmUgb3V0IGVudGlyZWx5IGZvciBhbGwgZm9ybWF0cyAoZGVmYXVsdClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IE1MS2l0U2NhbkJhcmNvZGVzT25EZXZpY2VSZXN1bHQpID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5iYXJjb2RlcykpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvbGRlclBhdGgyOiBzdHJpbmcgPSBwYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiaW1hZ2VzL0VBTi1PYnN0LmpwZ1wiKTtcclxuICAgICAgICBjb25zdCBpbWFnZVNvdXJjZTI6IEltYWdlU291cmNlID0gPEltYWdlU291cmNlPiBmcm9tRmlsZShmb2xkZXJQYXRoMik7XHJcbiAgICAgICAgZmlyZWJhc2UubWxraXQuYmFyY29kZXNjYW5uaW5nLnNjYW5CYXJjb2Rlc09uRGV2aWNlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlU291cmNlMixcclxuICAgICAgICAgICAgZm9ybWF0czogW0JhcmNvZGVGb3JtYXQuRUFOXzEzXSAvLyBsaW1pdCByZWNvZ25pdGlvbiB0byBjZXJ0YWluIGZvcm1hdHMgKGZhc3RlciksIG9yIGxlYXZlIG91dCBlbnRpcmVseSBmb3IgYWxsIGZvcm1hdHMgKGRlZmF1bHQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBNTEtpdFNjYW5CYXJjb2Rlc09uRGV2aWNlUmVzdWx0KSA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQuYmFyY29kZXMpKSlcclxuICAgICAgICAuY2F0Y2goZXJyb3JNZXNzYWdlID0+IGNvbnNvbGUubG9nKFwiTUwgS2l0IGVycm9yOiBcIiArIGVycm9yTWVzc2FnZSkpO1xyXG4gICAgfVxyXG4gICAgaW1hZ2VMYWJlbGluZygpe1xyXG4gICAgICAgIGNvbnN0IGZvbGRlcjogRm9sZGVyID0gPEZvbGRlcj4ga25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXJQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiaW1hZ2VzLzEwMjRweC1WYWxhaXNfQ3VwXzIwMTNfLV9PTS1GQ19Qb3J0b18xMy0wNy0yMDEzXy1fQnJpY2VfU2FtYmFfZW5fZXh0ZW5zaW9uLmpwZ1wiKTtcclxuICAgICAgICBjb25zdCBpbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2UgPSA8SW1hZ2VTb3VyY2U+IGZyb21GaWxlKGZvbGRlclBhdGgpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5tbGtpdC5pbWFnZWxhYmVsaW5nLmxhYmVsSW1hZ2VPbkRldmljZSh7XHJcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZVNvdXJjZSxcclxuICAgICAgICAgICAgY29uZmlkZW5jZVRocmVzaG9sZDogMC42IC8vIHRoaXMgd2lsbCBvbmx5IHJldHVybiBsYWJlbHMgd2l0aCBhdCBsZWFzdCAwLjYgKDYwJSkgY29uZmlkZW5jZS4gRGVmYXVsdCAwLjUuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBNTEtpdEltYWdlTGFiZWxpbmdPbkRldmljZVJlc3VsdCkgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0LmxhYmVscykpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLm1sa2l0LmltYWdlbGFiZWxpbmcubGFiZWxJbWFnZUNsb3VkKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlU291cmNlLFxyXG4gICAgICAgICAgICBtb2RlbFR5cGU6IFwic3RhYmxlXCIsIC8vIGVpdGhlciBcImxhdGVzdFwiIG9yIFwic3RhYmxlXCIgKGRlZmF1bHQgXCJzdGFibGVcIilcclxuICAgICAgICAgICAgbWF4UmVzdWx0czogNSAvLyBkZWZhdWx0IDEwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBNTEtpdEltYWdlTGFiZWxpbmdDbG91ZFJlc3VsdCkgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0LmxhYmVscykpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICBsYW5kbWFya1JlY29nbml0aW9uKCl7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyOiBGb2xkZXIgPSA8Rm9sZGVyPiBrbm93bkZvbGRlcnMuY3VycmVudEFwcCgpO1xyXG4gICAgICAgIGNvbnN0IGZvbGRlclBhdGg6IHN0cmluZyA9IHBhdGguam9pbihmb2xkZXIucGF0aCwgXCJpbWFnZXMvNjgwcHgtQnJ1ZWdnZV9WaWV3X2Zyb21fUm96ZW5ob2Vka2FhaS5qcGdcIik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VTb3VyY2U6IEltYWdlU291cmNlID0gPEltYWdlU291cmNlPiBmcm9tRmlsZShmb2xkZXJQYXRoKTtcclxuICAgICAgICBmaXJlYmFzZS5tbGtpdC5sYW5kbWFya3JlY29nbml0aW9uLnJlY29nbml6ZUxhbmRtYXJrc0Nsb3VkKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlU291cmNlLFxyXG4gICAgICAgICAgICBtb2RlbFR5cGU6IFwibGF0ZXN0XCIsIC8vIGVpdGhlciBcImxhdGVzdFwiIG9yIFwic3RhYmxlXCIgKGRlZmF1bHQgXCJzdGFibGVcIilcclxuICAgICAgICAgICAgbWF4UmVzdWx0czogOCAvLyBkZWZhdWx0IDEwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBNTEtpdExhbmRtYXJrUmVjb2duaXRpb25DbG91ZFJlc3VsdCkgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0LmxhbmRtYXJrcykpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvck1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJNTCBLaXQgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlKSk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmaXJlYmFzZSBjbG91ZGUgc3RvcmFnZSB0ZXN0IC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIG5lZWQgdG8ga25vdyBob3cgdG8gZ2V0IGh0dHAgaW1nIHNyY1xyXG4gICAgLy8gdXBsb2FkIHBpY3R1cmUgZmlyc3QgYW5kIG1ha2UgcG9zdERhdGFcclxuXHJcbiAgICAvLyB1cGRhdGVfaW1hZ2Vfc3JjKCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgIC8vICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAvLyB9XHJcbiAgICAvLyB1cGRhdGVfcG9zdChwb3N0SUQsIHBvc3REYXRhKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgIC8vICAgICAudXBkYXRlKHBvc3REYXRhKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0IHVwZGF0ZWRcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVByb2ZpbGUgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHNldFRoaXNVc2VyUHJvZmlsZShkYXRhKXtcclxuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvcHJvZmlsZScsIGRhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQmxvZyBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZWFyY2hQb3N0KFxyXG4gICAgICAgIHR5cGU6c3RyaW5nLFxyXG4gICAgICAgIG90aGVydXNlckVubmVhZ3JhbU51bTpudW1iZXIsXHJcbiAgICAgICAgb3JpZ2luTGF0aXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIG9yaWdpbkxvbmdpdHVkZTpudW1iZXIsXHJcbiAgICAgICAgZGlzdGFuY2VNZXRlcjpudW1iZXJcclxuICAgICl7XHJcbiAgICAgICAgY29uc3QgT05FX0RFR1JFRV9FQVJUSF9QRVJfTUVURVIgPSAxMTEwMDA7XHJcblxyXG4gICAgICAgIHZhciBtYXhMYXRpdHVkZURlZ3JlZSA9IG9yaWdpbkxhdGl0dWRlICsgZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUik7XHJcbiAgICAgICAgdmFyIG1pbkxhdGl0dWRlRGVncmVlID0gb3JpZ2luTGF0aXR1ZGUgLSBkaXN0YW5jZU1ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKTtcclxuICAgICAgICBpZihtYXhMYXRpdHVkZURlZ3JlZSA+PSA5MCl7XHJcbiAgICAgICAgICAgIG1heExhdGl0dWRlRGVncmVlID0gOTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbkxhdGl0dWRlRGVncmVlIDw9IC05MCl7XHJcbiAgICAgICAgICAgIG1pbkxhdGl0dWRlRGVncmVlID0gLTkwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgbWF4TG9uZ2l0dWRlRGVncmVlID0gb3JpZ2luTG9uZ2l0dWRlICsgZGlzdGFuY2VNZXRlci8oMipPTkVfREVHUkVFX0VBUlRIX1BFUl9NRVRFUipNYXRoLnNpbihvcmlnaW5MYXRpdHVkZSAqICgxODAgLyBNYXRoLlBJKSkpO1xyXG4gICAgICAgIHZhciBtaW5Mb25naXR1ZGVEZWdyZWUgPSBvcmlnaW5Mb25naXR1ZGUgLSBkaXN0YW5jZU1ldGVyLygyKk9ORV9ERUdSRUVfRUFSVEhfUEVSX01FVEVSKk1hdGguc2luKG9yaWdpbkxhdGl0dWRlICogKDE4MCAvIE1hdGguUEkpKSk7XHJcbiAgICAgICAgaWYobWF4TG9uZ2l0dWRlRGVncmVlIC0gbWluTG9uZ2l0dWRlRGVncmVlID49IDM2MCl7XHJcbiAgICAgICAgICAgIG1heExvbmdpdHVkZURlZ3JlZSA9IDE4MDtcclxuICAgICAgICAgICAgbWluTG9uZ2l0dWRlRGVncmVlID0gLTE4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYobWF4TG9uZ2l0dWRlRGVncmVlID49IDE4MCl7XHJcbiAgICAgICAgICAgICAgICBtYXhMb25naXR1ZGVEZWdyZWUgPSBtYXhMb25naXR1ZGVEZWdyZWUgLSAzNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobWluTG9uZ2l0dWRlRGVncmVlIDw9IC0xODApe1xyXG4gICAgICAgICAgICAgICAgbWluTG9uZ2l0dWRlRGVncmVlID0gbWluTG9uZ2l0dWRlRGVncmVlIC0gMzYwO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWluTG9uZ2l0dWRlRGVncmVlID4gbWF4TG9uZ2l0dWRlRGVncmVlKXtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBtaW5Mb25naXR1ZGVEZWdyZWU7XHJcbiAgICAgICAgICAgIG1pbkxvbmdpdHVkZURlZ3JlZSA9IG1heExvbmdpdHVkZURlZ3JlZTtcclxuICAgICAgICAgICAgbWF4TG9uZ2l0dWRlRGVncmVlID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtaW5fbGF0XCIsbWluTGF0aXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xhdFwiLG9yaWdpbkxhdGl0dWRlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWF4X2xhdFwiLG1heExhdGl0dWRlRGVncmVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1pbl9sb25cIixtaW5Mb25naXR1ZGVEZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3JpX2xvblwiLG9yaWdpbkxvbmdpdHVkZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtYXhfbG9uXCIsbWF4TG9uZ2l0dWRlRGVncmVlKTtcclxuICAgICAgICBcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAud2hlcmUoXCJudW1iZXJcIiwgXCI9PVwiLCBvdGhlcnVzZXJFbm5lYWdyYW1OdW0pXHJcbiAgICAgICAgLndoZXJlKFwidHlwZVwiLCBcIj09XCIsIHR5cGUpXHJcbiAgICAgICAgLndoZXJlKFwibG9uZ2l0dWRlXCIsIFwiPD1cIiwgbWF4TG9uZ2l0dWRlRGVncmVlKVxyXG4gICAgICAgIC53aGVyZShcImxvbmdpdHVkZVwiLCBcIj49XCIsIG1pbkxvbmdpdHVkZURlZ3JlZSlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbihxdWVyeVNuYXBzaG90ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkb2MuZGF0YSgpLmxhdGl0dWRlIDw9IG1heExhdGl0dWRlRGVncmVlICYmIGRvYy5kYXRhKCkubGF0aXR1ZGUgPj0gbWluTGF0aXR1ZGVEZWdyZWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBzZWFyY2hlZCBkb2MgOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2RvYy5pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheS5wdXNoKHNlYXJjaFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VhcmNoUXVlcmllcyhcclxuICAgICAgICB0eXBlOnN0cmluZyxcclxuICAgICAgICBvdGhlcnVzZXJFbm5lYWdyYW1OdW1zOm51bWJlcltdLFxyXG4gICAgICAgIG9yaWdpbkxhdGl0dWRlOm51bWJlcixcclxuICAgICAgICBvcmlnaW5Mb25naXR1ZGU6bnVtYmVyLFxyXG4gICAgICAgIGRpc3RhbmNlTWV0ZXI6bnVtYmVyLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8b3RoZXJ1c2VyRW5uZWFncmFtTnVtcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0eXBlXCIrb3RoZXJ1c2VyRW5uZWFncmFtTnVtc1tpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUG9zdCh0eXBlLG90aGVydXNlckVubmVhZ3JhbU51bXNbaV0sb3JpZ2luTGF0aXR1ZGUsb3JpZ2luTG9uZ2l0dWRlLGRpc3RhbmNlTWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfdXNlcl9wb3N0cyh1c2VySUQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBvc3RTZWFyY2hSZXN1bHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC53aGVyZShcInJvbGVzLlwiK3VzZXJJRCwgXCI9PVwiLCBcIm93bmVyXCIpXHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0W2RvYy5pZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5LnB1c2goc2VhcmNoUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUG9zdChwb3N0RGF0YSl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKClcclxuICAgICAgICAuY29sbGVjdGlvbihcInBvc3RzXCIpXHJcbiAgICAgICAgLmFkZChwb3N0RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBwb3N0IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29tbWVudChwb3N0SUQsIGNvbW1lbnREYXRhKXtcclxuICAgICAgICB2YXIgcG9zdHMgPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwicG9zdHNcIikuZG9jKHBvc3RJRClcclxuICAgICAgICAuY29sbGVjdGlvbihcImNvbW1lbnRzXCIpXHJcbiAgICAgICAgLmFkZChjb21tZW50RGF0YSkudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhdXRvLWdlbmVyYXRlZCBjb21tZW50IElEOiAke2RvY3VtZW50UmVmLmlkfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ29tbWVudChwb3N0SUQsIGNvbW1lbnRJRCwgY29tbWVudERhdGEpe1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdElEKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY29tbWVudHNcIikuZG9jKGNvbW1lbnRJRClcclxuICAgICAgICAudXBkYXRlKGNvbW1lbnREYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjb21tZW50IHVwZGF0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0ZWRQb3N0KCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTAgO2k8dGhpcy5wb3N0U2VhcmNoUmVzdWx0QXJyYXkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgcG9zdElEIGluIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRQb3N0SUQgPT09IHBvc3RJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zdFNlYXJjaFJlc3VsdEFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB0ZXN0IHF1ZXJpZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gLy8gbmV3IHVzZXJcclxuICAgIC8vIHNldF9kYXRhKCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgIC5kb2ModGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAvLyAgICAgLnNldCh7XHJcbiAgICAvLyAgICAgICAgIGF1dGhvcjogdGhpcy5hdXRodXNlci51aWQsXHJcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiU2FuIEZyYW5jaXNjb1wiLFxyXG4gICAgLy8gICAgICAgICBzdGF0ZTogXCJDQVwiLFxyXG4gICAgLy8gICAgICAgICBjb3VudHJ5OiBcIlVTQVwiLFxyXG4gICAgLy8gICAgICAgICBjYXBpdGFsOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAwXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlX2RhdGEoKXtcclxuICAgIC8vICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAvLyAgICAgLmRvYyhcIlNGXCIpXHJcbiAgICAvLyAgICAgLnVwZGF0ZSh7XHJcbiAgICAvLyAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMSxcclxuICAgIC8vICAgICAgICAgdXBkYXRlVGltZXN0YW1wOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAvLyAgICAgICAgIGxvY2F0aW9uOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5HZW9Qb2ludCg0LjM0LCA1LjY3KVxyXG4gICAgLy8gICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHBvcHVsYXRpb24gdXBkYXRlZFwiKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBnZXRfZG9jdW1lbnRzX2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNpdGllc0NvbGxlY3Rpb24gPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpO1xyXG5cclxuICAgIC8vICAgICBjaXRpZXNDb2xsZWN0aW9uLmdldCgpLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAvLyAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYCR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgLy8gICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gZ2V0X2RhdGVfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgLy8gICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuXHJcbiAgICAvLyAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZ2V0KCkudGhlbihkb2MgPT4ge1xyXG4gICAgLy8gICAgICAgaWYgKGRvYy5leGlzdHMpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYERvY3VtZW50IGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAvLyAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHN1Y2ggZG9jdW1lbnQhXCIpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHdoZXJlX3F1ZXJ5KCl7ICAgICAgICBcclxuICAgIC8vICAgICAvLyBcIkdpbW1lIGFsbCBjaXRpZXMgaW4gQ2FsaWZvcm5pYSB3aXRoIGEgcG9wdWxhdGlvbiBiZWxvdyA1NTAwMDBcIlxyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgIC8vICAgICAud2hlcmUoXCJzdGF0ZVwiLCBcIj09XCIsIFwiQ0FcIikud2hlcmUoXCJwb3B1bGF0aW9uXCIsIFwiPFwiLCAyNTAwMDAwKVxyXG4gICAgLy8gICAgIC5nZXQoKVxyXG4gICAgLy8gICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgLy8gICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYFJlbGF0aXZlbHkgc21hbGwgQ2FsaWZvcm5pYW4gY2l0eTogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZGVsZXRlX2RvY3VtZW50X2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIGRlbGV0ZV9kYXRhX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIkxBXCIpXHJcbiAgICAvLyAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICAgIGNhcGl0YWw6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5kZWxldGUoKSxcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gYXJyYXlVbmlvbigpe1xyXG4gICAgLy8gICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgLy8gICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAvLyAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgLy8gICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgLy8gICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gZ2V0VGhpc1VzZXJEYXRhKCl7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFxyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgLy8gICAgICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgLy8gICAgICAgICAud2hlcmUoXCJhdXRob3JcIiwgXCI9PVwiLCB0aGlzLmF1dGh1c2VyLnVpZClcclxuICAgIC8vICAgICAgICAgLmdldCgpXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBpY3R1cmUgdXBsb2FkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLyAxLiB3aGVuIHVzZXIgc2VsZWN0IHBpY3R1cmUsIHRoZSBwaWN0dXJlIHVwbG9hZGVkIGludG8gc3RvcmFnZS5cclxuICAgIHBpY2tJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gaW1hZ2VQaWNrZXIuY3JlYXRlKHtcclxuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxyXG5cdFx0fSk7XHJcblx0XHRjb250ZXh0XHJcblx0XHQuYXV0aG9yaXplKClcclxuXHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4gc2VsZWN0aW9uLmZvckVhY2goXHJcblx0XHRcdChzZWxlY3RlZEFzc2V0OiBJbWFnZUFzc2V0KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJibG9nXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCbG9nSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2UgaWYoaW1hZ2VUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZVR5cGUsZmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdCkuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICAvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwbG9hZEZpbGUoZmlsZVR5cGU6c3RyaW5nLCBmaWxlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmaWxlQ2xhc3M7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoU3BsaXRlZCA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGhTcGxpdGVkW2ZpbGVQYXRoU3BsaXRlZC5sZW5ndGgtMV07XHJcbiAgICAgICAgaWYoZmlsZVR5cGUgPT09IFwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZUNsYXNzID0gXCIvYmxvZy9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmaWxlVHlwZSA9PT0gXCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlQ2xhc3MgPSBcIi9wcm9maWxlL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVUeXBlID09PSBcImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVDbGFzcyA9IFwiL2JhY2tncm91bmQvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQgKyBmaWxlQ2xhc3MgKyBmaWxlTmFtZSxcclxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcclxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlVVJMKGZpbGVUeXBlLCB0aGlzLmF1dGh1c2VyLnVpZCwgdXBsb2FkZWRGaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBnZXQgdGhlIHBpY3R1cmUgVVJMIGZvciB1cGxvYWRpbmcgdGhlIGJsb2cuXHJcbiAgICBnZXRGaWxlVVJMKGltYWdlVHlwZSwgdWlkLCBmaWxlTmFtZSl7XHJcbiAgICAgICAgdmFyIGZpbGVVUkw7XHJcbiAgICAgICAgaWYoaW1hZ2VUeXBlID09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgZmlsZVVSTCA9IFwiL2Jsb2cvXCIgKyBmaWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbWFnZVR5cGUgPT09XCJwcm9maWxlXCIpe1xyXG4gICAgICAgICAgICBmaWxlVVJMID0gXCIvcHJvZmlsZS9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cImJhY2tncm91bmRcIil7XHJcbiAgICAgICAgICAgIGZpbGVVUkwgPSBcIi9wcm9maWxlL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLnN0b3JhZ2UuZ2V0RG93bmxvYWRVcmwoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxyXG4gICAgICAgICAgICAvLyBidWNrZXQ6ICdnczovL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbScsXHJcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcclxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1c2Vycy8nICsgdWlkICsgZmlsZVVSTCxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB1cmwgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVR5cGUgPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGltYWdlVHlwZSA9PT1cInByb2ZpbGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTCA9IHVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW1hZ2VUeXBlID09PVwiYmFja2dyb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ2hhdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgc3luY1RoaXNVc2VyUm9vbUxpc3QoKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyZXN1bHQua2V5KTtcclxuICAgICAgICB9LCBcIi91c2Vycy9cIiArIHRoaXMuYXV0aHVzZXIudWlkICsgXCIvdXNlcl9yb29tc1wiKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihsaXN0ZW5lcldyYXBwZXIpIHtcclxuICAgICAgICAgICAgICB2YXIgcGF0aCA9IGxpc3RlbmVyV3JhcHBlci5wYXRoO1xyXG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcldyYXBwZXIubGlzdGVuZXJzOyAvLyBhbiBBcnJheSBvZiBsaXN0ZW5lcnMgYWRkZWRcclxuICAgICAgICAgICAgICAvLyB5b3UgY2FuIHN0b3JlIHRoZSB3cmFwcGVyIHNvbWV3aGVyZSB0byBsYXRlciBjYWxsICdyZW1vdmVFdmVudExpc3RlbmVycydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSb29tKHVwZGF0ZWRSb29tSUQ6IHN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy9yb29tcy8nICsgdXBkYXRlZFJvb21JRCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jlc3VsdFsna2V5J11dID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHRbJ3ZhbHVlJ10pKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb29tQXJyYXkoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbU1lc3NhZ2VzKHJvb21JRDogc3RyaW5nKXtcclxuICAgICAgICBmaXJlYmFzZS5hZGRDaGlsZEV2ZW50TGlzdGVuZXIocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21JRCwgcmVzdWx0LmtleSAscmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9LCBcIi9yb29tcy9cIityb29tSUQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbU1lc3NhZ2VzKHJvb21JRDpzdHJpbmcsIG1lc3NhZ2VJRDphbnksIG1lc3NhZ2U6YW55KXtcclxuICAgICAgICBpZighdGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXVttZXNzYWdlSURdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VUb0FkZCA9IHt9O1xyXG4gICAgICAgIG1lc3NhZ2VUb0FkZFttZXNzYWdlSURdID0gdGhpcy5yb29tc1tyb29tSURdWydtZXNzYWdlcyddW21lc3NhZ2VJRF1cclxuICAgICAgICBpZihyb29tSUQgPT0gdGhpcy5zZWxlY3RlZFJvb21JRCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5LnB1c2gobWVzc2FnZVRvQWRkKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWRUb2dnbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21zKTtcclxuICAgIH1cclxuICAgIHNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKG1lc3NhZ2VBcnJheSl7XHJcbiAgICAgICAgaWYobWVzc2FnZUFycmF5PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlQTtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VCO1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VBID0gYVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGIpe1xyXG4gICAgICAgICAgICAgICAgRGF0ZVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUIgPSBiW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRpbWVfYiA9IG1lc3NhZ2VCWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG4gICAgICAgICAgICB2YXIgdGltZV9hID0gbWVzc2FnZUFbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lX2EgLSB0aW1lX2I7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBtZXNzYWdlIDpcclxuICAgIC8vIFRoaXMgd2lsbCBiYSBhY3RpdmF0ZWQgd2hlbiB1c2VyIHNlbmQgYSBtZXNzYWdlIHRvIGZyaWVuZCBhZnRlciBpbnZpdGUgZnJpZW5kLlxyXG4gICAgcHVzaEZyaWVuZE9uUm9vbSh1c2VyOmFueSwgcm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tSUQrXCIvcm9vbV91c2Vycy9cIit1aWQsIHVzZXJbdWlkXSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFJvb21JRE9uVXNlcih1c2VyLCByb29tSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldFNlbGVjdGVkRnJpZW5kSUQoc2VsZWN0ZWRGcmllbmRJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZElEID0gc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGVkRnJpZW5kSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZyaWVuZElEO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDEuIGdlbmVyYXRlIHJvb20gaWRcclxuICAgIGdlbmVyYXRlUm9vbVdpdGhTZWxlY3RlZEZyaWVuZHModXNlcjphbnksIGZyaWVuZDphbnkpe1xyXG4gICAgICAgIHZhciBmcmllbmRJRDtcclxuICAgICAgICBmb3IodmFyIGlkIGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIGZyaWVuZElEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1c2VySUQ7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgdXNlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIHJvb20gZXhpc3QgYmVmb3JlIGdlbmVyYXRlLlxyXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgZnJpZW5kIGNoYXQgcm9vbSBpcyBub3QgZXhpc3QsIGNyZWF0ZSBuZXcgcm9vbS5cclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm5vIHJvb20gd2l0aCBmcmllbmRJRDogXCIgKyBmcmllbmRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZW5Sb29tID0ge3Jvb21Vc2Vyczp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJvb21bJ2lzT3BlbiddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUm9vbVsnb3BlblRpbWUnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblJvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycsIG9wZW5Sb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKHVzZXIsIGZyaWVuZCwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUm9vbUlET25Vc2VyKGZyaWVuZCwgdXNlciwgcmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHZW5lcmF0ZWRSb29tSUQocmVzdWx0Mi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQyLmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBmcmllbmQgY2hhdCByb29tIGlzIGV4aXN0LCBkb24ndCBtYWtlIG5ldyBvbmUuXHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciByb29tSUQgaW4gcmVzdWx0Wyd2YWx1ZSddKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMucm9vbXNbcm9vbUlEXVsnbWVzc2FnZXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXhpc3Qgcm9vbTogXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdFsndmFsdWUnXSkpKTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdXNlcnMvJyArIHVzZXJJRCArICcvdXNlcl9yb29tcycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuVkFMVUUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWU6ICd0ZXN0JyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kSURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICAvLyAyLiBzZXQgYXV0aGVudGljYXRpb24gZm9yIHJvb21zIG9uIHVzZXIgZGF0YWJhc2VcclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIGZyaWVuZDphbnksIHJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1c2VyUm9vbSA9IHt9O1xyXG4gICAgICAgIHVzZXJSb29tWydpblJvb20nXSA9IHRydWU7XHJcbiAgICAgICAgdXNlclJvb21bJ2pvaW5UaW1lJ10gPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHVzZXJSb29tWydsZWF2ZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgZm9yKHZhciBmcmllbmRJRCBpbiBmcmllbmQpe1xyXG4gICAgICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgICAgIHVzZXJSb29tWydyb29tSWNvbiddID0gZnJpZW5kW2ZyaWVuZElEXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3RpdGxlJ10gPSBmcmllbmRbZnJpZW5kSURdW1wicHJvZmlsZVwiXVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB1c2VyUm9vbVsnbWVzc2FnZUljb24nXSA9IHVzZXJbdWlkXVtcInByb2ZpbGVcIl1bXCJwcm9maWxlUGljc3JjXCJdO1xyXG4gICAgICAgICAgICAgICAgdXNlclJvb21bJ3VzZXJOYW1lJ10gPSB1c2VyW3VpZF1bXCJwcm9maWxlXCJdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCByb29tIGFjY2VzcyBhdGhlbnRpY2F0aW9uIG9uIHVzZXIgZGF0YWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyt1aWQrJy91c2VyX3Jvb21zLycrcm9vbUlELCBmcmllbmRJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgY2FuIHdyaXRlIG9uIGNoYXQgcm9vbVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tSUQrJ1UvJyt1aWQsIHVzZXJSb29tKS50aGVuKHJlc3VsdDIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMocm9vbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zeW5jUm9vbShyb29tSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIG1lc3NhZ2VzIDpcclxuICAgIHB1c2hNZXNzYWdlT25Sb29tKHJvb21JRDpzdHJpbmcsIHVzZXI6YW55LCBtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VQYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQYWNrWyd1c2VyJ10gPSB1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VQYWNrWydtZXNzYWdlJ10gPSBtZXNzYWdlO1xyXG4gICAgICAgIG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbUlEKycvbWVzc2FnZXMnLCBtZXNzYWdlUGFjaykudGhlbihyZXN1bHQgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBNZXNzYWdlX3BhY2sgSURcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmlyZWJhc2UgUmVhbHRpbWUgZGF0YWJhc2UgdGVzdCBTZWN0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIG1ha2UgYXJyYXkgdHlwZSBkYXRhYmFzZSBhbmQgcHVzaCBkYXRhIGluIGFycmF5IHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIHB1c2hJbkFycmF5RGF0YWJhc2UoZGF0YWJhc2VPZkFycmF5UGF0aDpzdHJpbmcsIHB1c2hEYXRhOmFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5wdXNoKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VPZkFycmF5UGF0aCwgcHVzaERhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8vIG1ha2UgZGF0YSBzdHJ1Y3R1cmUgb2YgdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgLy8gbWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCBzdHJ1Y3R1cmU6IGFueSl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgc3RydWN0dXJlKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvLyBhZGQgYXR0cmlidXRlIGluIHZhbHVlIHR5cGUgZGF0YWJhc2UgYW5kIHVwZGF0ZSBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIC8vIHdyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgdXBkYXRlRGF0YTogYW55KXtcclxuICAgIC8vICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAvLyAgICAgICAgIGZpcmViYXNlLnVwZGF0ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgdXBkYXRlRGF0YSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIC8vIHJlYWQgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICAvLyByZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgIC8vICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gLy8gY29tcGxleCBxdWVyeVxyXG4gICAgLy8gcXVlcnlPbkRhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgLy8gICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm9uUXVlcnlFdmVudCxcclxuICAgIC8vICAgICAgICAgICAgIC8vICcvdXNlcnMnLFxyXG4gICAgLy8gICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgIC8vICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgIC8vICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBidXQgb25seSBjb21wYW5pZXMgJ3NpbmNlJyBhIGNlcnRhaW4geWVhciAoVGVsZXJpaydzIHZhbHVlIGlzIDIwMDAsIHdoaWNoIGlzIGltYWdpbmFyeSBidHcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL3JhbmdlOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLy99LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIC4uIG9yICdjaGFpbicgcmFuZ2VzIGxpa2UgdGhpczpcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gcmFuZ2VzOiBbXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDE5OTlcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRU5EX0FULFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gXSxcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3QgMiBtYXRjaGVzXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICApXHJcbiAgICAvLyAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgIC8vICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgXHJcbiAgICAvLyAvLyBxdWVyeSByZXN1bHRcclxuICAgIC8vIG9uUXVlcnlFdmVudChyZXN1bHQpIHtcclxuICAgIC8vICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcclxuICAgIC8vICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxyXG4gICAgLy8gICAgIGlmICghcmVzdWx0LmVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH07XHJcblxyXG4gICAgLy8gcXVlcnlUZXN0KCl7XHJcbiAgICAvLyAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAvLyAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAnL3VzZXJzJyxcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgIC8vICAgICAgICAgICAgICAgICB2YWx1ZTogJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgKVxyXG4gICAgLy8gICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVbJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXSkpXHJcbiAgICAvLyAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIC8vIHJlYWRVc2VyTmFtZSgpe1xyXG4gICAgLy8gICAgIHZhciB1c2VySWQgPSBmaXJlYmFzZVdlYi5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgLy8gICAgIHJldHVybiBmaXJlYmFzZVdlYi5kYXRhYmFzZSgpLnJlZignL3VzZXJzLycgKyB1c2VySWQpLm9uY2UoJ3ZhbHVlJykudGhlbihmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdXNlcm5hbWUgPSAoc25hcHNob3QudmFsKCkgJiYgc25hcHNob3QudmFsKCkudXNlcm5hbWUpIHx8ICdBbm9ueW1vdXMnO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUF1dGggU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGdldCBjdXJyZW5kVXNlclxyXG4gICAgbG9naW5CeUVtYWlsKHVzZXIpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbkJ5RmFjZWJvb2soKXtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWxcclxuICAgICAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgLy8gZGVmYXVsdHMgdG8gWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXHJcbiAgICAgICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5CeUdvb2dsZSgpe1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRSxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgXHJcbiAgICAgICAgICAgIGdvb2dsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBob3N0ZWREb21haW46IFwiY2hhdC1kZW1vLTVkM2E3LmZpcmViYXNlYXBwLmNvbVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcigpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRodXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaXJzdFVzZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGlzdXNlciBpcyBmaXJzdCB1c2VyLCBtYWtlIGEgZmlyc3R1c2VyIGRhdGEgaW4gZmlyZWJhc2VcclxuICAgIGNoZWNrRmlyc3RVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdGhpcy5hdXRodXNlci51aWQpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IG5ld1VzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJlbm5lYWdyYW1cIiA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlaGF2aW9yXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1vdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhvdWdodFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZnJpZW5kc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFBpY3NyY1wiIDogXCJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NoYXQtZGVtby01ZDNhNy5hcHBzcG90LmNvbS9vL3VzZXJzJTJGWGtNNE1Od0szMGh0QlVndlc4dkpQRFJqNHFGMiUyRmltYWdlcyUyRmltZ19yYW5rX3MuanBnP2FsdD1tZWRpYSZ0b2tlbj1jZWI5OWI3OS04MzczLTRjNDctYjk3Yy03OWNkNzNiMTJmYzNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvdW50cnlcIiA6IFwiS29yZWFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiB0aGlzLmF1dGh1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJlc3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRyb2R1Y2luZ1wiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxhbmd1YWdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiIDogdGhpcy5hdXRodXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVQaWNzcmNcIiA6IFwiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jaGF0LWRlbW8tNWQzYTcuYXBwc3BvdC5jb20vby9maXJzdHVzZXIlMkZpbWFnZXMlMkZ1c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nP2FsdD1tZWRpYSZ0b2tlbj1iNzQ5ZDUzYy1hMWU1LTQ0NmYtOWFmYS1lOGY3ZWU1MjgzMzNcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidXNlcl9yb29tc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIHRoaXMuYXV0aHVzZXIudWlkLCBuZXdVc2VyRGF0YSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmlyc3Qgb2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0gKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVzZXIgb2tcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGhpcy5yb29tc1tyZXN1bHRbJ2tleSddXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0Wyd2YWx1ZSddKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXNbcmVzdWx0WydrZXknXV0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluaXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2V0QXV0aFVzZXIoKXtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEZyaWVuZHMocmVzdWx0S2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcmVzdWx0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvb21zKHJlc3VsdEtleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgICAgIHVzZXJba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGhpc1VzZXIgPSB1c2VyO1xyXG4gICAgICAgIHRoaXMuYW5hbHl6ZVVzZXJMb2dpbih0aGlzLmF1dGh1c2VyLnVpZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBhbmFseXplVXNlckxvZ2luKGlkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYW5hbHl0aWNzLnNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKHRydWUpO1xyXG4gICAgICAgIGZpcmViYXNlLmFuYWx5dGljcy5zZXRVc2VySWQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IGlkXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFuYWx5dGljcyB1c2VySWQgc2V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RnJpZW5kcyhmcmllbmRJRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRJRHMpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7ICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGZyaWVuZElEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnJpZW5kSURzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kSURzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRGcmllbmRzKGZyaWVuZElEcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGZyaWVuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyaWVuZFsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddID0gdGhpcy5nZXRGcmllbmRzKClbJ0g2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjInXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hGcmllbmRPblJvb20odGhpcy50aGlzVXNlcixcIi1MUExWTlZGMnlNMU16eUctRDcxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaE1lc3NhZ2VPblJvb20oXCItTFBMVk5WRjJ5TTFNenlHLUQ3MVwiLCB0aGlzLnRoaXNVc2VyLCBcImhpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdlbmVyYXRlUG9zdCh0aGlzLnRoaXNVc2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkRnJpZW5kKGZyaWVuZCl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZnJpZW5kKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRzW2tleV0gPSBmcmllbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRVc2Vyc0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKSk7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRBcnJheSgpOiB2b2lke1xyXG5cdFx0dGhpcy5mcmllbmRBcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRGcmllbmRzKCkpO1xyXG5cdH1cclxuICAgIHNldFJvb21zKHJvb21JRHM6c3RyaW5nW10peyBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyb29tSURzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbUlEcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpe30sXHJcbiAgICAgICAgICAgICAgICAnL3Jvb21zJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VpZCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9vbUlEc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlMaW1pdFR5cGUuTEFTVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMwMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvb20ocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09cm9vbUlEcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jVGhpc1VzZXJSb29tTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUm9vbShyb29tKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiByb29tKXtcclxuICAgICAgICAgICAgdGhpcy5yb29tc1trZXldID0gcm9vbVtrZXldO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNSb29tTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Um9vbUFycmF5KCl7XHJcbiAgICAgICAgdGhpcy5yb29tQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0Um9vbXMoKSk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRfY29tbWVudCgnajNYZVZJcm9BSndMcVNENXJlNkMnLHtoZWxsbzonaGVsbG8nfSk7XHJcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnRlc3REYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFkZF9wb3N0KHRoaXMudGVzdERhdGFbaV0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLnNlYXJjaFBvc3QoXCJjaGF0XCIsMywzNy4zMjM5NzIsIDEyNy4xMjUxMDkgLDEwMDAwMCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZWFyY2hRdWVyaWVzKFwiY2hhdFwiLFsxLDIsMyw0LDUsNiw3LDgsOV0sMzcuMzIzOTcyLCAxMjcuMTI1MTA5ICwxMDAwMDApO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RmlsZVVSTCgnYXNxVTIxUXpsdFlPZ25UNU1EY2dXb3RSSndIMicsJ2d0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZycpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0X3VzZXJfcG9zdHMoXCJJMzNDQUtzdTV1VWtxNFhxdDJ4VVZKZ2NHSE0yXCIpO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMganNvblRvQXJyYXkoanNvbil7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgaWYoanNvbiE9bnVsbCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkSnNvbiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hpbGRKc29uW2tleV0gPSBqc29uW2tleV07XHJcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkSnNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0R2VuZXJhdGVkUm9vbUlEKGdlbmVyYXRlZFJvb21JRDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkUm9vbUlEID0gZ2VuZXJhdGVkUm9vbUlEO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdXRodXNlciA9PSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==