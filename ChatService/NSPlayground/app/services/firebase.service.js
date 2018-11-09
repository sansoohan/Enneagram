"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var firebaseWeb = require("nativescript-plugin-firebase/app");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var application_1 = require("tns-core-modules/application");
var imagePicker = require("nativescript-imagepicker");
var fs = require("tns-core-modules/file-system");
var mergeJSON = require("merge-json");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.thisUser = {};
        this.friends = {};
        this.rooms = {};
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
                location: "",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 2,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Marvel at more than 2,000 natural rock arches at this park just outside of Moab. Some of the formations can be spotted from the road, but the best require a scenic hike. Don’t miss the famous Delicate Arch (3 miles round-trip) or the 7-mile (round-trip) Devils Garden Loop.\n\nThe Park Avenue Trail is the most popular hike in the park because of its ease and scenery at just 2 miles round trip. Or try the more challenging hike to Delicate Arches at 3.2 miles round trip.\n\nWhether you are camping or staying in a hotel, don’t forget to spend some time looking up at the sky after night falls. You’ll find some of the darkest skies in and around Utah’s national parks.",
                image: "~/home/ideamatching/images/arches-delicate-arch-sky_adobe_680.jpg",
                isOpen: true,
                likes: 245,
                location: "Utah",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 8,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Nicknamed the \"Crown of the Continent,\" Glacier National Park sits in the northwest corner of Montana. Glacier National Park is just a scenic day’s drive north from Yellowstone.\n\nHit the trail to explore places like Fishercap Lake (pictured), which is a great place to spot a moose. From Many Glacier Campground, go to the Swiftcurrent Motor Inn parking lot. The trailhead is on the west end. You'll find the lake less than a mile down the trail. Continue 1.5 miles to Redrock Lake and take a spur to Redrock Falls.\n\nA National Historic Landmark, Going-to-the-Sun Road is one of the most scenic roads in North America, not to mention one of the most complex to build. The final section, over Logan Pass, was completed in 1932 after 11 years of work. Considered an engineering feat, the construction of the road forever changed the way visitors would experience Glacier National Park. Future visitors would be able to drive over sections of the park that previously had taken days of horseback riding to see.\n\nIn their ability to wow visitors, Yellowstone and Glacier share a common bond. But as with any great destination, there are some adventures that are found nowhere else. Glacier preserves over 1,000,000 acres of forests, alpine meadows and lakes. Its diverse habitats are home to over 70 species of mammals and over 260 species of birds. The spectacular glaciated landscape is a hiker’s paradise, containing 700 miles of maintained trails that lead deep into one of the largest intact ecosystems in the lower 48 states.",
                image: "~/home/ideamatching/images/glacier-avalache-lake-kids_adobe_680.jpg",
                isOpen: true,
                likes: 152,
                location: "Montana",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 6,
                state: "",
                thought: "",
                closeTime: "",
                description: "Just 15 miles south of Moab, hike your way through 337, 598 acres of dramatic red-rock landscape in Canyonlands NP, and do it all without having to compete for room on the trail - Canyonlands is both Utah’s largest and least visited park.\n\nThe river-carved park boasts 360-degree views of rust-colored arches, buttes, and cliffs - but because of the high-desert rock environment, its climate is subject to extreme temperature fluctuations. Skip packing the parka, and go in the spring or fall for the most moderate, and most forgiving, weather.\n\nSo expansive it’s divided into four districts, Canyonlands delivers a quintessential desert experience: deep canyons, prehistoric rock art, rivers, and sweeping overlooks.\n\nAmong the exceptional, striated rock formations, there are landmarks you shouldn’t miss, like the unusual 1500-foot Upheaval Dome - thought to be a meteorite crater - or the Druid Arch, often referred to as Utah’s own Stonehenge. Keep watch for the wildlife, too. Bighorn sheep take residence in the canyons and buttes, along with mule deer, kangaroo rats, and coyote. Look up for red- tailed hawks, and at night, for one of the darkest skies in the Lower 48. On a moonless night, get more than your fill of stars - or get out the binoculars to try for the rings of Saturn.",
                image: "~/home/ideamatching/images/canyonlands-mesa-arch-sunrise_dollar_680.jpg",
                isOpen: true,
                likes: 385,
                location: "Utah",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 5,
                state: "bad",
                thought: "",
                closeTime: "",
                description: "Divided by a 277-mile long canyon, and the mile-deep Colorado River, the two halves of Grand Canyon National Park, the North and South Rim, offer two parks in one, with diverse landscape and ecology on either.\n\nGrand Canyon National Park, and the greater Grand Canyon region, is a hiker's dream. Most of Grand Canyon National Park is undeveloped backcountry. There are literally hundreds of miles to hike, backpack and explore. Despite the Grand Canyon's popularity and numbers of visitors each year, visitors only need to hike a small distance to enjoy some solitude.\n\nExplore the depths of the Grand Canyon National Park on popular trails like the Bright Angel and South Kaibab trail on a mule. A Grand Canyon mule ride is an adventure and easy on your legs.\n\nOne of the most exciting ways to experience the Grand Canyon is to float through it by way of raft on the Colorado River. Most people book their trip with a commercial outfitter and you can even combine the rafting trip with a helicopter ride. Experienced whitewater rafter? Enter the lottery to do your own trip.",
                image: "~/home/ideamatching/images/gc-yavapai-point-sunset_dp_680.jpg",
                isOpen: true,
                likes: 514,
                location: "Arizona",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 1,
                state: "",
                thought: "",
                closeTime: "",
                description: "Maximize your experience at Bryce Canyon National Park by driving to Sunrise, Sunset, Inspiration and Bryce viewpoints. These are all spectacular overlooks of the park’s red hoodoos shooting up against evergreen forests in the background. Depending on the time of day, and the angle and light of the sun, the hoodoos and mysterious rock formations often take on unusual patterns and shapes, and some think, imaginary faces.\n\nFor more inspiration, lace up your hiking boots or other sturdy shoes and explore a trail. There is something for everyone at Bryce Canyon. Our favorite easy hikes include Bristlecone Loop Trail and Queens Garden Trail. Hat Shop is our favorite moderate hike. For more physically fit hikers looking for a strenuous adventure, do the 5.5-mile vertically challenging Peek-A-Boo Loop or the 7.9 Fairyland Loop rated “difficult” by the park service. ",
                image: "~/home/ideamatching/images/bryce-amphitheater-inspiration-point_dp_680.jpg",
                isOpen: true,
                likes: 245,
                location: "Utah",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 9,
                state: "",
                thought: "",
                closeTime: "",
                description: "Grand Teton National Park preserves a spectacular landscape rich with majestic mountains, pristine lakes, and extraordinary wildlife. The abrupt vertical rise of the jagged Teton Mountains contrasts with the horizontal sage-covered valley and glacial lakes at its base.\n\nIt took more than 30 years for Grand Teton National Park to transform from an idea to one of the country's most stunning parks. When Congress created the park in 1929, it only included the Teton Range and six glacial lakes. John D. Rockefeller, Jr., played a key role in acquiring an additional 35,000 acres for the park under the name \"Snake River Land Co.\" Amid controversy the \"new\" Grand Teton National Park was established Sept. 14, 1950, by President Harry Truman.\n\nGrand Teton National Park and its world-class scenery attracts nearly 4 million visitors per year. With Jenny Lake and Jackson Lake at 6,320 feet and the summit of the Grand Teton at 13,770 feet, the park's elevation ranges create one of the nation's most awe-inspiring landscapes. In addition to gazing at the incredible views, there is much to do in this park from hiking and rock climbing to boating and fishing. And when you need a break from outdoor adventure, there are few better places to simply relax and watch the park's incredible wildlife.",
                image: "~/home/ideamatching/images/gteton-schwabachers-landing_dollar_680.jpg",
                isOpen: true,
                likes: 169,
                location: "Wyoming",
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
                type: ""
            },
            {
                behavior: "",
                emotion: "",
                number: 3,
                state: "good",
                thought: "",
                closeTime: "",
                description: "Explore South Dakota’s Black Hills region, a natural wonder in its own right. Located about six hours from Yellowstone, the Black Hills are home to seven national sites — Badlands National Park, Jewel Cave National Monument, the Lewis & Clark National Historic Trail, Minuteman Missile National Historic Site, Missouri National Recreational River, Mount Rushmore National Memorial, and Wind Cave National Park.\n\nIn this natural playground, you can enjoy an abundance of recreational opportunities, gorgeous scenic drives — which include the beautiful Spearfish Canyon — and wildlife-watching. This region is also packed with cultural and historical sites.\n\nWhile you won’t see saber-toothed cats or rhinoceroses roaming the Badlands like they once did, you may see their remains in this stunning national park with some of the world’s richest fossil deposits.\n\nLocated in Imlay Township in South Dakota, Badlands National Park has a Fossil Preparation Lab where you can watch paleontologists at work, literally uncovering the ancient history of the area. At the Ben Reifel Visitor Center, kids can use a touchscreen to assemble a virtual skeleton and touch fossilized animal replicas. You also can watch the film Land of Stone and Light in the center’s 95-seat air-conditioned theater.",
                image: "~/home/ideamatching/images/badlands_wikipd_680x392.jpg",
                isOpen: true,
                likes: 227,
                location: "South Dakota",
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
                type: ""
            }];
    }
    //------------------------ firebase cloude storage test ------------------
    FirebaseService.prototype.add_post = function (data) {
        firebaseWeb.firestore().collection("posts")
            .add(data).then(function (documentRef) {
            console.log("San Francisco added with auto-generated ID: " + documentRef.id);
        });
    };
    FirebaseService.prototype.add_comment = function (post_id, data) {
        var posts = firebaseWeb.firestore().collection("posts").doc(post_id);
        posts
            .update({
            comments: firebase.firestore.FieldValue.arrayUnion(data),
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
    //----------------------------Profile Section------------------------------------------
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
    FirebaseService.prototype.uploadFile = function (filePath, remotePath) {
        firebase.getCurrentUser().then(function (user) {
            // now upload the file with either of the options below:
            firebase.storage.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: '/users/' + user.uid + remotePath,
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
            }, function (error) {
                console.log("File upload error: " + error);
            });
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
        this.add_comment('lopkDLG6T7jpTuY5oO6x', 'hello');
        // for(var i=0;i<this.test_data.length;i++){
        //     this.add_post(this.test_data[i]);
        // }        
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsOERBQWlFO0FBRWpFLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFDL0QsMERBQTREO0FBRTVELDREQUE0RDtBQUc1RCxzREFBd0Q7QUFJeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBR3ZDO0lBb0JJLHlCQUNZLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBbkJ2QyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBbUJmLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztnQkFDZCxRQUFRLEVBQUcsRUFBRTtnQkFDYixPQUFPLEVBQUcsRUFBRTtnQkFDWixNQUFNLEVBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUcsTUFBTTtnQkFDZCxPQUFPLEVBQUcsRUFBRTtnQkFDWixTQUFTLEVBQUcsRUFBRTtnQkFDZCxXQUFXLEVBQUcsRUFBRTtnQkFDaEIsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsTUFBTSxFQUFHLElBQUk7Z0JBQ2IsS0FBSyxFQUFHLEVBQUU7Z0JBQ1YsUUFBUSxFQUFHLEVBQUU7Z0JBQ2IsSUFBSSxFQUFHLEVBQUU7Z0JBQ1QsUUFBUSxFQUFHO29CQUNULElBQUksRUFBRyxFQUFFO29CQUNULEdBQUcsRUFBRyxDQUFDO29CQUNQLEtBQUssRUFBRyxFQUFFO29CQUNWLE9BQU8sRUFBRyxFQUFFO29CQUNaLEtBQUssRUFBRyxDQUFDO29CQUNULE9BQU8sRUFBRyxFQUFFO29CQUNaLElBQUksRUFBRyxhQUFhO29CQUNwQixjQUFjLEVBQUcs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Q0FBQSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFrQixHQUF6QixVQUEwQixlQUFzQjtRQUM1QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBQ00sNENBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNNLG9DQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sa0NBQVEsR0FBZjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDSSxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBMzVCUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBc0JxQix5QkFBZ0I7T0FyQnJDLGVBQWUsQ0E0NUIzQjtJQUFELHNCQUFDO0NBQUEsQUE1NUJELElBNDVCQztBQTU1QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0XCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxuXHJcbmltcG9ydCB7IEFQUExJQ0FUSU9OX01PRFVMRV9QUk9WSURFUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvYXBwbGljYXRpb25fbW9kdWxlXCI7XHJcbmltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xyXG52YXIgbWVyZ2VKU09OID0gcmVxdWlyZShcIm1lcmdlLWpzb25cIikgO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICAgIGF1dGh1c2VyOiBmaXJlYmFzZS5Vc2VyO1xyXG4gICAgcHVibGljIHRoaXNVc2VyOiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgZnJpZW5kcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSByb29tcyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRSb29tSUQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZnJpZW5kQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgcm9vbUFycmF5OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21JRDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkUm9vbVRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSb29tVXNlcnM6IGFueTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFJvb21NZXNzYWdlQXJyYXk6IEFycmF5PGFueT47XHJcblxyXG5cdHB1YmxpYyBjdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHRwdWJsaWMgY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgdGVzdF9kYXRhOiBBcnJheTxhbnk+O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgKXtcclxuICAgICAgICB0aGlzLnRlc3RfZGF0YSA9IFt7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiBcIlwiLFxyXG4gICAgICAgICAgICBsb2NhdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjUsXHJcbiAgICAgICAgICAgICAgZGF5IDogNCxcclxuICAgICAgICAgICAgICBob3VycyA6IDIwLFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA1MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDQ0LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwNDY4MjQ0NDAwLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiNUZncmV3SmEyTWg5QzU5OGs3MEhRNDBiMXF1MVwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDIsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJnb29kXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTWFydmVsIGF0IG1vcmUgdGhhbiAyLDAwMCBuYXR1cmFsIHJvY2sgYXJjaGVzIGF0IHRoaXMgcGFyayBqdXN0IG91dHNpZGUgb2YgTW9hYi4gU29tZSBvZiB0aGUgZm9ybWF0aW9ucyBjYW4gYmUgc3BvdHRlZCBmcm9tIHRoZSByb2FkLCBidXQgdGhlIGJlc3QgcmVxdWlyZSBhIHNjZW5pYyBoaWtlLiBEb27igJl0IG1pc3MgdGhlIGZhbW91cyBEZWxpY2F0ZSBBcmNoICgzIG1pbGVzIHJvdW5kLXRyaXApIG9yIHRoZSA3LW1pbGUgKHJvdW5kLXRyaXApIERldmlscyBHYXJkZW4gTG9vcC5cXG5cXG5UaGUgUGFyayBBdmVudWUgVHJhaWwgaXMgdGhlIG1vc3QgcG9wdWxhciBoaWtlIGluIHRoZSBwYXJrIGJlY2F1c2Ugb2YgaXRzIGVhc2UgYW5kIHNjZW5lcnkgYXQganVzdCAyIG1pbGVzIHJvdW5kIHRyaXAuIE9yIHRyeSB0aGUgbW9yZSBjaGFsbGVuZ2luZyBoaWtlIHRvIERlbGljYXRlIEFyY2hlcyBhdCAzLjIgbWlsZXMgcm91bmQgdHJpcC5cXG5cXG5XaGV0aGVyIHlvdSBhcmUgY2FtcGluZyBvciBzdGF5aW5nIGluIGEgaG90ZWwsIGRvbuKAmXQgZm9yZ2V0IHRvIHNwZW5kIHNvbWUgdGltZSBsb29raW5nIHVwIGF0IHRoZSBza3kgYWZ0ZXIgbmlnaHQgZmFsbHMuIFlvdeKAmWxsIGZpbmQgc29tZSBvZiB0aGUgZGFya2VzdCBza2llcyBpbiBhbmQgYXJvdW5kIFV0YWjigJlzIG5hdGlvbmFsIHBhcmtzLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwifi9ob21lL2lkZWFtYXRjaGluZy9pbWFnZXMvYXJjaGVzLWRlbGljYXRlLWFyY2gtc2t5X2Fkb2JlXzY4MC5qcGdcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAyNDUsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uIDogXCJVdGFoXCIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkFyY2hlcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogMzQsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiA0OSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTI4OTkxOCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkg2VTRaUnZMVzZTTDhSbUlYMThUWW1nMWhoVjJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcIlwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA4LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiZ29vZFwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk5pY2tuYW1lZCB0aGUgXFxcIkNyb3duIG9mIHRoZSBDb250aW5lbnQsXFxcIiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgc2l0cyBpbiB0aGUgbm9ydGh3ZXN0IGNvcm5lciBvZiBNb250YW5hLiBHbGFjaWVyIE5hdGlvbmFsIFBhcmsgaXMganVzdCBhIHNjZW5pYyBkYXnigJlzIGRyaXZlIG5vcnRoIGZyb20gWWVsbG93c3RvbmUuXFxuXFxuSGl0IHRoZSB0cmFpbCB0byBleHBsb3JlIHBsYWNlcyBsaWtlIEZpc2hlcmNhcCBMYWtlIChwaWN0dXJlZCksIHdoaWNoIGlzIGEgZ3JlYXQgcGxhY2UgdG8gc3BvdCBhIG1vb3NlLiBGcm9tIE1hbnkgR2xhY2llciBDYW1wZ3JvdW5kLCBnbyB0byB0aGUgU3dpZnRjdXJyZW50IE1vdG9yIElubiBwYXJraW5nIGxvdC4gVGhlIHRyYWlsaGVhZCBpcyBvbiB0aGUgd2VzdCBlbmQuIFlvdSdsbCBmaW5kIHRoZSBsYWtlIGxlc3MgdGhhbiBhIG1pbGUgZG93biB0aGUgdHJhaWwuIENvbnRpbnVlIDEuNSBtaWxlcyB0byBSZWRyb2NrIExha2UgYW5kIHRha2UgYSBzcHVyIHRvIFJlZHJvY2sgRmFsbHMuXFxuXFxuQSBOYXRpb25hbCBIaXN0b3JpYyBMYW5kbWFyaywgR29pbmctdG8tdGhlLVN1biBSb2FkIGlzIG9uZSBvZiB0aGUgbW9zdCBzY2VuaWMgcm9hZHMgaW4gTm9ydGggQW1lcmljYSwgbm90IHRvIG1lbnRpb24gb25lIG9mIHRoZSBtb3N0IGNvbXBsZXggdG8gYnVpbGQuIFRoZSBmaW5hbCBzZWN0aW9uLCBvdmVyIExvZ2FuIFBhc3MsIHdhcyBjb21wbGV0ZWQgaW4gMTkzMiBhZnRlciAxMSB5ZWFycyBvZiB3b3JrLiBDb25zaWRlcmVkIGFuIGVuZ2luZWVyaW5nIGZlYXQsIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIHJvYWQgZm9yZXZlciBjaGFuZ2VkIHRoZSB3YXkgdmlzaXRvcnMgd291bGQgZXhwZXJpZW5jZSBHbGFjaWVyIE5hdGlvbmFsIFBhcmsuIEZ1dHVyZSB2aXNpdG9ycyB3b3VsZCBiZSBhYmxlIHRvIGRyaXZlIG92ZXIgc2VjdGlvbnMgb2YgdGhlIHBhcmsgdGhhdCBwcmV2aW91c2x5IGhhZCB0YWtlbiBkYXlzIG9mIGhvcnNlYmFjayByaWRpbmcgdG8gc2VlLlxcblxcbkluIHRoZWlyIGFiaWxpdHkgdG8gd293IHZpc2l0b3JzLCBZZWxsb3dzdG9uZSBhbmQgR2xhY2llciBzaGFyZSBhIGNvbW1vbiBib25kLiBCdXQgYXMgd2l0aCBhbnkgZ3JlYXQgZGVzdGluYXRpb24sIHRoZXJlIGFyZSBzb21lIGFkdmVudHVyZXMgdGhhdCBhcmUgZm91bmQgbm93aGVyZSBlbHNlLiBHbGFjaWVyIHByZXNlcnZlcyBvdmVyIDEsMDAwLDAwMCBhY3JlcyBvZiBmb3Jlc3RzLCBhbHBpbmUgbWVhZG93cyBhbmQgbGFrZXMuIEl0cyBkaXZlcnNlIGhhYml0YXRzIGFyZSBob21lIHRvIG92ZXIgNzAgc3BlY2llcyBvZiBtYW1tYWxzIGFuZCBvdmVyIDI2MCBzcGVjaWVzIG9mIGJpcmRzLiBUaGUgc3BlY3RhY3VsYXIgZ2xhY2lhdGVkIGxhbmRzY2FwZSBpcyBhIGhpa2Vy4oCZcyBwYXJhZGlzZSwgY29udGFpbmluZyA3MDAgbWlsZXMgb2YgbWFpbnRhaW5lZCB0cmFpbHMgdGhhdCBsZWFkIGRlZXAgaW50byBvbmUgb2YgdGhlIGxhcmdlc3QgaW50YWN0IGVjb3N5c3RlbXMgaW4gdGhlIGxvd2VyIDQ4IHN0YXRlcy5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcIn4vaG9tZS9pZGVhbWF0Y2hpbmcvaW1hZ2VzL2dsYWNpZXItYXZhbGFjaGUtbGFrZS1raWRzX2Fkb2JlXzY4MC5qcGdcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAxNTIsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uIDogXCJNb250YW5hXCIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkdsYWNpZXIgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogMyxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTU0Mzc5NCxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcIkhjQmpSTHN6Vm5TNXRQc2NEV2cwWkRPb3h4UDJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcIlwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBiZWhhdmlvciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGVtb3Rpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICBudW1iZXIgOiA2LFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRob3VnaHQgOiBcIlwiLFxyXG4gICAgICAgICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiSnVzdCAxNSBtaWxlcyBzb3V0aCBvZiBNb2FiLCBoaWtlIHlvdXIgd2F5IHRocm91Z2ggMzM3LCA1OTggYWNyZXMgb2YgZHJhbWF0aWMgcmVkLXJvY2sgbGFuZHNjYXBlIGluIENhbnlvbmxhbmRzIE5QLCBhbmQgZG8gaXQgYWxsIHdpdGhvdXQgaGF2aW5nIHRvIGNvbXBldGUgZm9yIHJvb20gb24gdGhlIHRyYWlsIC0gQ2FueW9ubGFuZHMgaXMgYm90aCBVdGFo4oCZcyBsYXJnZXN0IGFuZCBsZWFzdCB2aXNpdGVkIHBhcmsuXFxuXFxuVGhlIHJpdmVyLWNhcnZlZCBwYXJrIGJvYXN0cyAzNjAtZGVncmVlIHZpZXdzIG9mIHJ1c3QtY29sb3JlZCBhcmNoZXMsIGJ1dHRlcywgYW5kIGNsaWZmcyAtIGJ1dCBiZWNhdXNlIG9mIHRoZSBoaWdoLWRlc2VydCByb2NrIGVudmlyb25tZW50LCBpdHMgY2xpbWF0ZSBpcyBzdWJqZWN0IHRvIGV4dHJlbWUgdGVtcGVyYXR1cmUgZmx1Y3R1YXRpb25zLiBTa2lwIHBhY2tpbmcgdGhlIHBhcmthLCBhbmQgZ28gaW4gdGhlIHNwcmluZyBvciBmYWxsIGZvciB0aGUgbW9zdCBtb2RlcmF0ZSwgYW5kIG1vc3QgZm9yZ2l2aW5nLCB3ZWF0aGVyLlxcblxcblNvIGV4cGFuc2l2ZSBpdOKAmXMgZGl2aWRlZCBpbnRvIGZvdXIgZGlzdHJpY3RzLCBDYW55b25sYW5kcyBkZWxpdmVycyBhIHF1aW50ZXNzZW50aWFsIGRlc2VydCBleHBlcmllbmNlOiBkZWVwIGNhbnlvbnMsIHByZWhpc3RvcmljIHJvY2sgYXJ0LCByaXZlcnMsIGFuZCBzd2VlcGluZyBvdmVybG9va3MuXFxuXFxuQW1vbmcgdGhlIGV4Y2VwdGlvbmFsLCBzdHJpYXRlZCByb2NrIGZvcm1hdGlvbnMsIHRoZXJlIGFyZSBsYW5kbWFya3MgeW91IHNob3VsZG7igJl0IG1pc3MsIGxpa2UgdGhlIHVudXN1YWwgMTUwMC1mb290IFVwaGVhdmFsIERvbWUgLSB0aG91Z2h0IHRvIGJlIGEgbWV0ZW9yaXRlIGNyYXRlciAtIG9yIHRoZSBEcnVpZCBBcmNoLCBvZnRlbiByZWZlcnJlZCB0byBhcyBVdGFo4oCZcyBvd24gU3RvbmVoZW5nZS4gS2VlcCB3YXRjaCBmb3IgdGhlIHdpbGRsaWZlLCB0b28uIEJpZ2hvcm4gc2hlZXAgdGFrZSByZXNpZGVuY2UgaW4gdGhlIGNhbnlvbnMgYW5kIGJ1dHRlcywgYWxvbmcgd2l0aCBtdWxlIGRlZXIsIGthbmdhcm9vIHJhdHMsIGFuZCBjb3lvdGUuIExvb2sgdXAgZm9yIHJlZC0gdGFpbGVkIGhhd2tzLCBhbmQgYXQgbmlnaHQsIGZvciBvbmUgb2YgdGhlIGRhcmtlc3Qgc2tpZXMgaW4gdGhlIExvd2VyIDQ4LiBPbiBhIG1vb25sZXNzIG5pZ2h0LCBnZXQgbW9yZSB0aGFuIHlvdXIgZmlsbCBvZiBzdGFycyAtIG9yIGdldCBvdXQgdGhlIGJpbm9jdWxhcnMgdG8gdHJ5IGZvciB0aGUgcmluZ3Mgb2YgU2F0dXJuLlwiLFxyXG4gICAgICAgICAgICBpbWFnZSA6IFwifi9ob21lL2lkZWFtYXRjaGluZy9pbWFnZXMvY2FueW9ubGFuZHMtbWVzYS1hcmNoLXN1bnJpc2VfZG9sbGFyXzY4MC5qcGdcIixcclxuICAgICAgICAgICAgaXNPcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGlrZXMgOiAzODUsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uIDogXCJVdGFoXCIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIkNhbnlvbmxhbmRzIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiAzOSxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDI3LFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNTY3ODg5LFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiSTMzQ0FLc3U1dVVrcTRYcXQyeFVWSmdjR0hNMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDUsXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJiYWRcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEaXZpZGVkIGJ5IGEgMjc3LW1pbGUgbG9uZyBjYW55b24sIGFuZCB0aGUgbWlsZS1kZWVwIENvbG9yYWRvIFJpdmVyLCB0aGUgdHdvIGhhbHZlcyBvZiBHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFyaywgdGhlIE5vcnRoIGFuZCBTb3V0aCBSaW0sIG9mZmVyIHR3byBwYXJrcyBpbiBvbmUsIHdpdGggZGl2ZXJzZSBsYW5kc2NhcGUgYW5kIGVjb2xvZ3kgb24gZWl0aGVyLlxcblxcbkdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrLCBhbmQgdGhlIGdyZWF0ZXIgR3JhbmQgQ2FueW9uIHJlZ2lvbiwgaXMgYSBoaWtlcidzIGRyZWFtLiBNb3N0IG9mIEdyYW5kIENhbnlvbiBOYXRpb25hbCBQYXJrIGlzIHVuZGV2ZWxvcGVkIGJhY2tjb3VudHJ5LiBUaGVyZSBhcmUgbGl0ZXJhbGx5IGh1bmRyZWRzIG9mIG1pbGVzIHRvIGhpa2UsIGJhY2twYWNrIGFuZCBleHBsb3JlLiBEZXNwaXRlIHRoZSBHcmFuZCBDYW55b24ncyBwb3B1bGFyaXR5IGFuZCBudW1iZXJzIG9mIHZpc2l0b3JzIGVhY2ggeWVhciwgdmlzaXRvcnMgb25seSBuZWVkIHRvIGhpa2UgYSBzbWFsbCBkaXN0YW5jZSB0byBlbmpveSBzb21lIHNvbGl0dWRlLlxcblxcbkV4cGxvcmUgdGhlIGRlcHRocyBvZiB0aGUgR3JhbmQgQ2FueW9uIE5hdGlvbmFsIFBhcmsgb24gcG9wdWxhciB0cmFpbHMgbGlrZSB0aGUgQnJpZ2h0IEFuZ2VsIGFuZCBTb3V0aCBLYWliYWIgdHJhaWwgb24gYSBtdWxlLiBBIEdyYW5kIENhbnlvbiBtdWxlIHJpZGUgaXMgYW4gYWR2ZW50dXJlIGFuZCBlYXN5IG9uIHlvdXIgbGVncy5cXG5cXG5PbmUgb2YgdGhlIG1vc3QgZXhjaXRpbmcgd2F5cyB0byBleHBlcmllbmNlIHRoZSBHcmFuZCBDYW55b24gaXMgdG8gZmxvYXQgdGhyb3VnaCBpdCBieSB3YXkgb2YgcmFmdCBvbiB0aGUgQ29sb3JhZG8gUml2ZXIuIE1vc3QgcGVvcGxlIGJvb2sgdGhlaXIgdHJpcCB3aXRoIGEgY29tbWVyY2lhbCBvdXRmaXR0ZXIgYW5kIHlvdSBjYW4gZXZlbiBjb21iaW5lIHRoZSByYWZ0aW5nIHRyaXAgd2l0aCBhIGhlbGljb3B0ZXIgcmlkZS4gRXhwZXJpZW5jZWQgd2hpdGV3YXRlciByYWZ0ZXI/IEVudGVyIHRoZSBsb3R0ZXJ5IHRvIGRvIHlvdXIgb3duIHRyaXAuXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJ+L2hvbWUvaWRlYW1hdGNoaW5nL2ltYWdlcy9nYy15YXZhcGFpLXBvaW50LXN1bnNldF9kcF82ODAuanBnXCIsXHJcbiAgICAgICAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpa2VzIDogNTE0LFxyXG4gICAgICAgICAgICBsb2NhdGlvbiA6IFwiQXJpem9uYVwiLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJHcmFuZCBDYW55b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDM5LFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDksXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE1ODk2NzQsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJOZllFMmRGMndsZlNCV3dXdkVrMEtzaVRzMXQxXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMSxcclxuICAgICAgICAgICAgc3RhdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICB0aG91Z2h0IDogXCJcIixcclxuICAgICAgICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk1heGltaXplIHlvdXIgZXhwZXJpZW5jZSBhdCBCcnljZSBDYW55b24gTmF0aW9uYWwgUGFyayBieSBkcml2aW5nIHRvIFN1bnJpc2UsIFN1bnNldCwgSW5zcGlyYXRpb24gYW5kIEJyeWNlIHZpZXdwb2ludHMuIFRoZXNlIGFyZSBhbGwgc3BlY3RhY3VsYXIgb3Zlcmxvb2tzIG9mIHRoZSBwYXJr4oCZcyByZWQgaG9vZG9vcyBzaG9vdGluZyB1cCBhZ2FpbnN0IGV2ZXJncmVlbiBmb3Jlc3RzIGluIHRoZSBiYWNrZ3JvdW5kLiBEZXBlbmRpbmcgb24gdGhlIHRpbWUgb2YgZGF5LCBhbmQgdGhlIGFuZ2xlIGFuZCBsaWdodCBvZiB0aGUgc3VuLCB0aGUgaG9vZG9vcyBhbmQgbXlzdGVyaW91cyByb2NrIGZvcm1hdGlvbnMgb2Z0ZW4gdGFrZSBvbiB1bnVzdWFsIHBhdHRlcm5zIGFuZCBzaGFwZXMsIGFuZCBzb21lIHRoaW5rLCBpbWFnaW5hcnkgZmFjZXMuXFxuXFxuRm9yIG1vcmUgaW5zcGlyYXRpb24sIGxhY2UgdXAgeW91ciBoaWtpbmcgYm9vdHMgb3Igb3RoZXIgc3R1cmR5IHNob2VzIGFuZCBleHBsb3JlIGEgdHJhaWwuIFRoZXJlIGlzIHNvbWV0aGluZyBmb3IgZXZlcnlvbmUgYXQgQnJ5Y2UgQ2FueW9uLiBPdXIgZmF2b3JpdGUgZWFzeSBoaWtlcyBpbmNsdWRlIEJyaXN0bGVjb25lIExvb3AgVHJhaWwgYW5kIFF1ZWVucyBHYXJkZW4gVHJhaWwuIEhhdCBTaG9wIGlzIG91ciBmYXZvcml0ZSBtb2RlcmF0ZSBoaWtlLiBGb3IgbW9yZSBwaHlzaWNhbGx5IGZpdCBoaWtlcnMgbG9va2luZyBmb3IgYSBzdHJlbnVvdXMgYWR2ZW50dXJlLCBkbyB0aGUgNS41LW1pbGUgdmVydGljYWxseSBjaGFsbGVuZ2luZyBQZWVrLUEtQm9vIExvb3Agb3IgdGhlIDcuOSBGYWlyeWxhbmQgTG9vcCByYXRlZCDigJxkaWZmaWN1bHTigJ0gYnkgdGhlIHBhcmsgc2VydmljZS4gXCIsXHJcbiAgICAgICAgICAgIGltYWdlIDogXCJ+L2hvbWUvaWRlYW1hdGNoaW5nL2ltYWdlcy9icnljZS1hbXBoaXRoZWF0ZXItaW5zcGlyYXRpb24tcG9pbnRfZHBfNjgwLmpwZ1wiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDI0NSxcclxuICAgICAgICAgICAgbG9jYXRpb24gOiBcIlV0YWhcIixcclxuICAgICAgICAgICAgbmFtZSA6IFwiQnJ5Y2UgQ2FueW9uIE5hdGlvbmFsIFBhcmtcIixcclxuICAgICAgICAgICAgb3BlblRpbWUgOiB7XHJcbiAgICAgICAgICAgICAgZGF0ZSA6IDI0LFxyXG4gICAgICAgICAgICAgIGRheSA6IDMsXHJcbiAgICAgICAgICAgICAgaG91cnMgOiA5LFxyXG4gICAgICAgICAgICAgIG1pbnV0ZXMgOiA0MCxcclxuICAgICAgICAgICAgICBtb250aCA6IDksXHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA6IDIxLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiAxNTQwMzQxNjIxMzgxLFxyXG4gICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0IDogLTU0MCxcclxuICAgICAgICAgICAgICB5ZWFyIDogMTE4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzIDoge1wiUnoyMHlDN0xFU09DRFVvYTRzcDY5djVjb3BUMlwiIDogXCJvd25lclwifSxcclxuICAgICAgICAgICAgdHlwZSA6IFwiXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yIDogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgIG51bWJlciA6IDksXHJcbiAgICAgICAgICAgIHN0YXRlIDogXCJcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHByZXNlcnZlcyBhIHNwZWN0YWN1bGFyIGxhbmRzY2FwZSByaWNoIHdpdGggbWFqZXN0aWMgbW91bnRhaW5zLCBwcmlzdGluZSBsYWtlcywgYW5kIGV4dHJhb3JkaW5hcnkgd2lsZGxpZmUuIFRoZSBhYnJ1cHQgdmVydGljYWwgcmlzZSBvZiB0aGUgamFnZ2VkIFRldG9uIE1vdW50YWlucyBjb250cmFzdHMgd2l0aCB0aGUgaG9yaXpvbnRhbCBzYWdlLWNvdmVyZWQgdmFsbGV5IGFuZCBnbGFjaWFsIGxha2VzIGF0IGl0cyBiYXNlLlxcblxcbkl0IHRvb2sgbW9yZSB0aGFuIDMwIHllYXJzIGZvciBHcmFuZCBUZXRvbiBOYXRpb25hbCBQYXJrIHRvIHRyYW5zZm9ybSBmcm9tIGFuIGlkZWEgdG8gb25lIG9mIHRoZSBjb3VudHJ5J3MgbW9zdCBzdHVubmluZyBwYXJrcy4gV2hlbiBDb25ncmVzcyBjcmVhdGVkIHRoZSBwYXJrIGluIDE5MjksIGl0IG9ubHkgaW5jbHVkZWQgdGhlIFRldG9uIFJhbmdlIGFuZCBzaXggZ2xhY2lhbCBsYWtlcy4gSm9obiBELiBSb2NrZWZlbGxlciwgSnIuLCBwbGF5ZWQgYSBrZXkgcm9sZSBpbiBhY3F1aXJpbmcgYW4gYWRkaXRpb25hbCAzNSwwMDAgYWNyZXMgZm9yIHRoZSBwYXJrIHVuZGVyIHRoZSBuYW1lIFxcXCJTbmFrZSBSaXZlciBMYW5kIENvLlxcXCIgQW1pZCBjb250cm92ZXJzeSB0aGUgXFxcIm5ld1xcXCIgR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayB3YXMgZXN0YWJsaXNoZWQgU2VwdC4gMTQsIDE5NTAsIGJ5IFByZXNpZGVudCBIYXJyeSBUcnVtYW4uXFxuXFxuR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFyayBhbmQgaXRzIHdvcmxkLWNsYXNzIHNjZW5lcnkgYXR0cmFjdHMgbmVhcmx5IDQgbWlsbGlvbiB2aXNpdG9ycyBwZXIgeWVhci4gV2l0aCBKZW5ueSBMYWtlIGFuZCBKYWNrc29uIExha2UgYXQgNiwzMjAgZmVldCBhbmQgdGhlIHN1bW1pdCBvZiB0aGUgR3JhbmQgVGV0b24gYXQgMTMsNzcwIGZlZXQsIHRoZSBwYXJrJ3MgZWxldmF0aW9uIHJhbmdlcyBjcmVhdGUgb25lIG9mIHRoZSBuYXRpb24ncyBtb3N0IGF3ZS1pbnNwaXJpbmcgbGFuZHNjYXBlcy4gSW4gYWRkaXRpb24gdG8gZ2F6aW5nIGF0IHRoZSBpbmNyZWRpYmxlIHZpZXdzLCB0aGVyZSBpcyBtdWNoIHRvIGRvIGluIHRoaXMgcGFyayBmcm9tIGhpa2luZyBhbmQgcm9jayBjbGltYmluZyB0byBib2F0aW5nIGFuZCBmaXNoaW5nLiBBbmQgd2hlbiB5b3UgbmVlZCBhIGJyZWFrIGZyb20gb3V0ZG9vciBhZHZlbnR1cmUsIHRoZXJlIGFyZSBmZXcgYmV0dGVyIHBsYWNlcyB0byBzaW1wbHkgcmVsYXggYW5kIHdhdGNoIHRoZSBwYXJrJ3MgaW5jcmVkaWJsZSB3aWxkbGlmZS5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcIn4vaG9tZS9pZGVhbWF0Y2hpbmcvaW1hZ2VzL2d0ZXRvbi1zY2h3YWJhY2hlcnMtbGFuZGluZ19kb2xsYXJfNjgwLmpwZ1wiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDE2OSxcclxuICAgICAgICAgICAgbG9jYXRpb24gOiBcIld5b21pbmdcIixcclxuICAgICAgICAgICAgbmFtZSA6IFwiR3JhbmQgVGV0b24gTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgICAgICBvcGVuVGltZSA6IHtcclxuICAgICAgICAgICAgICBkYXRlIDogMjQsXHJcbiAgICAgICAgICAgICAgZGF5IDogMyxcclxuICAgICAgICAgICAgICBob3VycyA6IDksXHJcbiAgICAgICAgICAgICAgbWludXRlcyA6IDQwLFxyXG4gICAgICAgICAgICAgIG1vbnRoIDogOSxcclxuICAgICAgICAgICAgICBzZWNvbmRzIDogNDcsXHJcbiAgICAgICAgICAgICAgdGltZSA6IDE1NDAzNDE2NDc3NjIsXHJcbiAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgOiAtNTQwLFxyXG4gICAgICAgICAgICAgIHllYXIgOiAxMThcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXMgOiB7XCJhc3FVMjFRemx0WU9nblQ1TURjZ1dvdFJKd0gyXCIgOiBcIm93bmVyXCJ9LFxyXG4gICAgICAgICAgICB0eXBlIDogXCJcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYmVoYXZpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgICBlbW90aW9uIDogXCJcIixcclxuICAgICAgICAgICAgbnVtYmVyIDogMyxcclxuICAgICAgICAgICAgc3RhdGUgOiBcImdvb2RcIixcclxuICAgICAgICAgICAgdGhvdWdodCA6IFwiXCIsXHJcbiAgICAgICAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJFeHBsb3JlIFNvdXRoIERha290YeKAmXMgQmxhY2sgSGlsbHMgcmVnaW9uLCBhIG5hdHVyYWwgd29uZGVyIGluIGl0cyBvd24gcmlnaHQuIExvY2F0ZWQgYWJvdXQgc2l4IGhvdXJzIGZyb20gWWVsbG93c3RvbmUsIHRoZSBCbGFjayBIaWxscyBhcmUgaG9tZSB0byBzZXZlbiBuYXRpb25hbCBzaXRlcyDigJQgQmFkbGFuZHMgTmF0aW9uYWwgUGFyaywgSmV3ZWwgQ2F2ZSBOYXRpb25hbCBNb251bWVudCwgdGhlIExld2lzICYgQ2xhcmsgTmF0aW9uYWwgSGlzdG9yaWMgVHJhaWwsIE1pbnV0ZW1hbiBNaXNzaWxlIE5hdGlvbmFsIEhpc3RvcmljIFNpdGUsIE1pc3NvdXJpIE5hdGlvbmFsIFJlY3JlYXRpb25hbCBSaXZlciwgTW91bnQgUnVzaG1vcmUgTmF0aW9uYWwgTWVtb3JpYWwsIGFuZCBXaW5kIENhdmUgTmF0aW9uYWwgUGFyay5cXG5cXG5JbiB0aGlzIG5hdHVyYWwgcGxheWdyb3VuZCwgeW91IGNhbiBlbmpveSBhbiBhYnVuZGFuY2Ugb2YgcmVjcmVhdGlvbmFsIG9wcG9ydHVuaXRpZXMsIGdvcmdlb3VzIHNjZW5pYyBkcml2ZXMg4oCUIHdoaWNoIGluY2x1ZGUgdGhlIGJlYXV0aWZ1bCBTcGVhcmZpc2ggQ2FueW9uIOKAlCBhbmQgd2lsZGxpZmUtd2F0Y2hpbmcuIFRoaXMgcmVnaW9uIGlzIGFsc28gcGFja2VkIHdpdGggY3VsdHVyYWwgYW5kIGhpc3RvcmljYWwgc2l0ZXMuXFxuXFxuV2hpbGUgeW91IHdvbuKAmXQgc2VlIHNhYmVyLXRvb3RoZWQgY2F0cyBvciByaGlub2Nlcm9zZXMgcm9hbWluZyB0aGUgQmFkbGFuZHMgbGlrZSB0aGV5IG9uY2UgZGlkLCB5b3UgbWF5IHNlZSB0aGVpciByZW1haW5zIGluIHRoaXMgc3R1bm5pbmcgbmF0aW9uYWwgcGFyayB3aXRoIHNvbWUgb2YgdGhlIHdvcmxk4oCZcyByaWNoZXN0IGZvc3NpbCBkZXBvc2l0cy5cXG5cXG5Mb2NhdGVkIGluIEltbGF5IFRvd25zaGlwIGluIFNvdXRoIERha290YSwgQmFkbGFuZHMgTmF0aW9uYWwgUGFyayBoYXMgYSBGb3NzaWwgUHJlcGFyYXRpb24gTGFiIHdoZXJlIHlvdSBjYW4gd2F0Y2ggcGFsZW9udG9sb2dpc3RzIGF0IHdvcmssIGxpdGVyYWxseSB1bmNvdmVyaW5nIHRoZSBhbmNpZW50IGhpc3Rvcnkgb2YgdGhlIGFyZWEuIEF0IHRoZSBCZW4gUmVpZmVsIFZpc2l0b3IgQ2VudGVyLCBraWRzIGNhbiB1c2UgYSB0b3VjaHNjcmVlbiB0byBhc3NlbWJsZSBhIHZpcnR1YWwgc2tlbGV0b24gYW5kIHRvdWNoIGZvc3NpbGl6ZWQgYW5pbWFsIHJlcGxpY2FzLiBZb3UgYWxzbyBjYW4gd2F0Y2ggdGhlIGZpbG0gTGFuZCBvZiBTdG9uZSBhbmQgTGlnaHQgaW4gdGhlIGNlbnRlcuKAmXMgOTUtc2VhdCBhaXItY29uZGl0aW9uZWQgdGhlYXRlci5cIixcclxuICAgICAgICAgICAgaW1hZ2UgOiBcIn4vaG9tZS9pZGVhbWF0Y2hpbmcvaW1hZ2VzL2JhZGxhbmRzX3dpa2lwZF82ODB4MzkyLmpwZ1wiLFxyXG4gICAgICAgICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICBsaWtlcyA6IDIyNyxcclxuICAgICAgICAgICAgbG9jYXRpb24gOiBcIlNvdXRoIERha290YVwiLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJCYWRsYW5kcyBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgICAgIG9wZW5UaW1lIDoge1xyXG4gICAgICAgICAgICAgIGRhdGUgOiAyNCxcclxuICAgICAgICAgICAgICBkYXkgOiAzLFxyXG4gICAgICAgICAgICAgIGhvdXJzIDogOSxcclxuICAgICAgICAgICAgICBtaW51dGVzIDogNDEsXHJcbiAgICAgICAgICAgICAgbW9udGggOiA5LFxyXG4gICAgICAgICAgICAgIHNlY29uZHMgOiAxMSxcclxuICAgICAgICAgICAgICB0aW1lIDogMTU0MDM0MTY3MTk0NyxcclxuICAgICAgICAgICAgICB0aW1lem9uZU9mZnNldCA6IC01NDAsXHJcbiAgICAgICAgICAgICAgeWVhciA6IDExOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlcyA6IHtcImF5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTJcIiA6IFwib3duZXJcIn0sXHJcbiAgICAgICAgICAgIHR5cGUgOiBcIlwiXHJcbiAgICAgICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGZpcmViYXNlIGNsb3VkZSBzdG9yYWdlIHRlc3QgLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBhZGRfcG9zdChkYXRhKXtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwicG9zdHNcIilcclxuICAgICAgICAuYWRkKGRhdGEpLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFNhbiBGcmFuY2lzY28gYWRkZWQgd2l0aCBhdXRvLWdlbmVyYXRlZCBJRDogJHtkb2N1bWVudFJlZi5pZH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZF9jb21tZW50KHBvc3RfaWQsIGRhdGEpe1xyXG4gICAgICAgIHZhciBwb3N0cyA9IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJwb3N0c1wiKS5kb2MocG9zdF9pZCk7XHJcbiAgICAgICAgcG9zdHNcclxuICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgY29tbWVudHMgOiBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5hcnJheVVuaW9uKGRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gbmV3IHVzZXJcclxuICAgIHNldF9kYXRhKCl7XHJcbiAgICAgICAgZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgICAgIC5kb2ModGhpcy5hdXRodXNlci51aWQpXHJcbiAgICAgICAgLnNldCh7XHJcbiAgICAgICAgICAgIGF1dGhvcjogdGhpcy5hdXRodXNlci51aWQsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2FuIEZyYW5jaXNjb1wiLFxyXG4gICAgICAgICAgICBzdGF0ZTogXCJDQVwiLFxyXG4gICAgICAgICAgICBjb3VudHJ5OiBcIlVTQVwiLFxyXG4gICAgICAgICAgICBjYXBpdGFsOiBmYWxzZSxcclxuICAgICAgICAgICAgcG9wdWxhdGlvbjogODYwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlX2RhdGEoKXtcclxuICAgICAgICBjb25zdCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgIC5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpXHJcbiAgICAgICAgLmRvYyhcIlNGXCIpXHJcbiAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDg2MDAwMSxcclxuICAgICAgICAgICAgdXBkYXRlVGltZXN0YW1wOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5GaWVsZFZhbHVlKCkuc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5HZW9Qb2ludCg0LjM0LCA1LjY3KVxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNGIHBvcHVsYXRpb24gdXBkYXRlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZG9jdW1lbnRzX2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IGNpdGllc0NvbGxlY3Rpb24gPSBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpO1xyXG5cclxuICAgICAgICBjaXRpZXNDb2xsZWN0aW9uLmdldCgpLnRoZW4ocXVlcnlTbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2RhdGVfZnJvbV9kb2N1bWVudCgpe1xyXG4gICAgICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuXHJcbiAgICAgICAgc2FuRnJhbmNpc2NvRG9jdW1lbnQuZ2V0KCkudGhlbihkb2MgPT4ge1xyXG4gICAgICAgICAgaWYgKGRvYy5leGlzdHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYERvY3VtZW50IGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHN1Y2ggZG9jdW1lbnQhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdoZXJlX3F1ZXJ5KCl7ICAgICAgICBcclxuICAgICAgICAvLyBcIkdpbW1lIGFsbCBjaXRpZXMgaW4gQ2FsaWZvcm5pYSB3aXRoIGEgcG9wdWxhdGlvbiBiZWxvdyA1NTAwMDBcIlxyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJjaXRpZXNcIilcclxuICAgICAgICAud2hlcmUoXCJzdGF0ZVwiLCBcIj09XCIsIFwiQ0FcIikud2hlcmUoXCJwb3B1bGF0aW9uXCIsIFwiPFwiLCAyNTAwMDAwKVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKHF1ZXJ5U25hcHNob3QgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbGF0aXZlbHkgc21hbGwgQ2FsaWZvcm5pYW4gY2l0eTogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlX2RvY3VtZW50X2Zyb21fY29sbGVjdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IHNhbkZyYW5jaXNjb0RvY3VtZW50ID0gZmlyZWJhc2VXZWIuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcImNpdGllc1wiKS5kb2MoXCJTRlwiKTtcclxuICAgICAgICBcclxuICAgICAgICBzYW5GcmFuY2lzY29Eb2N1bWVudC5kZWxldGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0Ygd2FzIGVyYXNlZCBmcm9tIHRoZSBmYWNlIG9mIHRoZSBlYXJ0aCFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGRlbGV0ZV9kYXRhX2Zyb21fZG9jdW1lbnQoKXtcclxuICAgIC8vICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiY2l0aWVzXCIpLmRvYyhcIkxBXCIpXHJcbiAgICAvLyAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgLy8gICAgICAgICAgIGNhcGl0YWw6IGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpLkZpZWxkVmFsdWUoKS5kZWxldGUoKSxcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgYXJyYXlVbmlvbigpe1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG4gICAgICAgIGZpcmViYXNlV2ViLmZpcmVzdG9yZSgpXHJcbiAgICAgICAgLmNvbGxlY3Rpb24oXCJwb3N0c1wiKVxyXG4gICAgICAgIC5kb2MoXCJsb3BrRExHNlQ3anBUdVk1b082eFwiKVxyXG4gICAgICAgIC51cGRhdGUoe1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmlyZWJhc2VXZWIuZmlyZXN0b3JlLkZpZWxkVmFsdWUoKS5hcnJheVVuaW9uKFt7XCJyZWRcIjogXCJibHVlXCJ9XSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VGhpc1VzZXJEYXRhKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdXRodXNlci51aWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBmaXJlYmFzZVdlYi5maXJlc3RvcmUoKVxyXG4gICAgICAgICAgICAuY29sbGVjdGlvbihcImNpdGllc1wiKVxyXG4gICAgICAgICAgICAud2hlcmUoXCJhdXRob3JcIiwgXCI9PVwiLCB0aGlzLmF1dGh1c2VyLnVpZClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qcm9maWxlIFNlY3Rpb24tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBwaWNrSW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XHJcblx0XHRcdG1vZGU6IFwic2luZ2xlXCJcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnRleHRcclxuXHRcdC5hdXRob3JpemUoKVxyXG5cdFx0LnRoZW4oKCkgPT4gY29udGV4dC5wcmVzZW50KCkpXHJcblx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0KHNlbGVjdGVkQXNzZXQ6IEltYWdlQXNzZXQpID0+IHtcclxuXHRcdFx0XHR0aGlzLmdldEltYWdlRmlsZVBhdGgoc2VsZWN0ZWRBc3NldCwgaW1hZ2VUeXBlKS50aGVuKChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudEJsb2dJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0pXHJcblx0XHQpLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKSk7XHJcblx0fVxyXG5cclxuXHRnZXRJbWFnZUZpbGVQYXRoKGltYWdlQXNzZXQsIGltYWdlVHlwZTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdC8vIGlmIChpb3MpIHsgLy8gY3JlYXRlIGZpbGUgZnJvbSBpbWFnZSBhc3NldCBhbmQgcmV0dXJuIGl0cyBwYXRoXHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZvbGRlclBhdGggPSBrbm93bkZvbGRlcnMudGVtcCgpLmdldEZvbGRlcihcIm5zaW1hZ2VwaWNrZXJcIikucGF0aDtcclxuXHRcdFx0Ly8gXHRjb25zdCB0ZW1wRmlsZVBhdGggPSBwYXRoLmpvaW4odGVtcEZvbGRlclBhdGgsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG5cdFx0XHQvLyBcdGNvbnN0IG9wdGlvbnMgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnMubmV3KCk7XHJcblxyXG5cdFx0XHQvLyBcdG9wdGlvbnMuc3luY2hyb25vdXMgPSB0cnVlO1xyXG5cdFx0XHQvLyBcdG9wdGlvbnMudmVyc2lvbiA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc1ZlcnNpb24uQ3VycmVudDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLmRlbGl2ZXJ5TW9kZSA9IFBISW1hZ2VSZXF1ZXN0T3B0aW9uc0RlbGl2ZXJ5TW9kZS5IaWdoUXVhbGl0eUZvcm1hdDtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLm5ldHdvcmtBY2Nlc3NBbGxvd2VkID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBcdFBISW1hZ2VNYW5hZ2VyLmRlZmF1bHRNYW5hZ2VyKCkucmVxdWVzdEltYWdlRGF0YUZvckFzc2V0T3B0aW9uc1Jlc3VsdEhhbmRsZXIoaW1hZ2VBc3NldC5pb3MsIG9wdGlvbnMsIChuc0RhdGE6IE5TRGF0YSwgZGF0YVVUSTogc3RyaW5nLCBvcmllbnRhdGlvbjogVUlJbWFnZU9yaWVudGF0aW9uLCBpbmZvOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KSA9PiB7XHJcblx0XHRcdC8vIFx0XHRpZiAoaW5mby52YWx1ZUZvcktleShQSEltYWdlUmVzdWx0SXNJbkNsb3VkS2V5KSkge1xyXG5cdFx0XHQvLyBcdFx0XHQvLyBJbWFnZSBpcyBpbiBpQ2xvdWRcclxuXHRcdFx0Ly8gXHRcdFx0aWYgKG5zRGF0YSkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdC8vIEltYWdlIGlzIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBOT1QgZG93bmxvYWRlZFxyXG5cdFx0XHQvLyBcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHR9XHJcblxyXG5cdFx0XHQvLyBcdFx0bnNEYXRhLndyaXRlVG9GaWxlQXRvbWljYWxseSh0ZW1wRmlsZVBhdGgsIHRydWUpO1xyXG5cdFx0XHQvLyBcdFx0dGhpcy5jdXJyZW50SW1hZ2VGaWxlUGF0aCA9IHRlbXBGaWxlUGF0aDtcclxuXHRcdFx0Ly8gXHRcdHJlc29sdmUodGVtcEZpbGVQYXRoKTtcclxuXHRcdFx0Ly8gXHR9KTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQpIHsgLy8gcmV0dXJuIGltYWdlQXNzZXQuYW5kcm9pZCwgc2luY2UgaXQncyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VUeXBlID09PSBcImJsb2dcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvZ0ltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aCA9IGltYWdlQXNzZXQuYW5kcm9pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXNvbHZlKGltYWdlQXNzZXQuYW5kcm9pZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gcmVzb2x2ZShudWxsKTtcclxuXHRcdH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGxvYWRGaWxlKGZpbGVQYXRoOnN0cmluZywgcmVtb3RlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgLy8gbm93IHVwbG9hZCB0aGUgZmlsZSB3aXRoIGVpdGhlciBvZiB0aGUgb3B0aW9ucyBiZWxvdzpcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc3RvcmFnZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAnL3VzZXJzLycgKyB1c2VyLnVpZCArIHJlbW90ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMTogYSBmaWxlLXN5c3RlbSBtb2R1bGUgRmlsZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChmaWxlUGF0aCksXHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXHJcbiAgICAgICAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBmaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAodXBsb2FkZWRGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSB1cGxvYWQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNoYXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIElmIHNvbWVvbmUgcHVzaCBtZXNzYWdlKGluY2x1ZGUgeW91KSwgZnVuY3Rpb24ocmVzdWx0KSB3aWxsIGJlIGFjdGl2YXRlZC5cclxuICAgIC8vIEl0IGNoYW5nZSB0aGUgbWVzc2FnZXMgYXJyYXkuXHJcbiAgICBzeW5jUm9vbShyb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHZhciByb29tID0gcm9vbV9pZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbShyb29tLCByZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0sIFwiL3Jvb21zL1wiK3Jvb21faWQrXCIvbWVzc2FnZXNcIikudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24obGlzdGVuZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHBhdGggPSBsaXN0ZW5lcldyYXBwZXIucGF0aDtcclxuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJXcmFwcGVyLmxpc3RlbmVyczsgLy8gYW4gQXJyYXkgb2YgbGlzdGVuZXJzIGFkZGVkXHJcbiAgICAgICAgICAgICAgLy8geW91IGNhbiBzdG9yZSB0aGUgd3JhcHBlciBzb21ld2hlcmUgdG8gbGF0ZXIgY2FsbCAncmVtb3ZlRXZlbnRMaXN0ZW5lcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUm9vbShyb29tX2lkOnN0cmluZywgbWVzc2FnZXM6YW55KXtcclxuICAgICAgICB0aGlzLnJvb21zW3Jvb21faWRdWydtZXNzYWdlcyddID0gbWVzc2FnZXM7XHJcbiAgICAgICAgaWYocm9vbV9pZCA9PSB0aGlzLnNlbGVjdGVkUm9vbUlEKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgfVxyXG4gICAgc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAobWVzc2FnZUFycmF5KXtcclxuICAgICAgICBpZihtZXNzYWdlQXJyYXk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYTtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfYjtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2EgPSBhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gYil7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlX2IgPSBiW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VfYVsndGltZXN0YW1wJ11bJ3RpbWUnXSAtIG1lc3NhZ2VfYlsndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIG1lc3NhZ2UgOlxyXG4gICAgLy8gVGhpcyB3aWxsIGJhIGFjdGl2YXRlZCB3aGVuIHVzZXIgc2VuZCBhIG1lc3NhZ2UgdG8gZnJpZW5kIGFmdGVyIGludml0ZSBmcmllbmQuXHJcbiAgICBwdXNoRnJpZW5kT25Sb29tKHVzZXI6YW55LCByb29tX2lkOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvcm9vbXMvJytyb29tX2lkK1wiL3Jvb21fdXNlcnMvXCIrdWlkLCB1c2VyW3VpZF0pLnRoZW4ocmVzdWx0MiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcm9vbV9pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIHdpbGwgYmEgYWN0aXZhdGVkIHdoZW4gdXNlciBjcmVhdGUgcm9vbSB3aXRoIG5ldyBmcmllbmQuXHJcbiAgICAvLyBVc2VyIGhhcyBhIHJvb20gYnV0IGZyaWVuZCBkb2Vzbid0IGhhdmUgcm9vbSB5ZXQuXHJcbiAgICBnZW5lcmF0ZVJvb20odXNlcjphbnkpe1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXIpe1xyXG4gICAgICAgICAgICB2YXIgb3Blbl9yb29tID0ge3Jvb21fdXNlcnM6XCJcIn07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsncm9vbV91c2VycyddW3VpZF0gPSB1c2VyW3VpZF07XHJcbiAgICAgICAgICAgIG9wZW5fcm9vbVsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ29wZW5UaW1lJ10gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBvcGVuX3Jvb21bJ2Nsb3NlVGltZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWyd0aXRsZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9yb29tWydpY29uc3JjJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvcm9vbXMvJywgXCJcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy9yb29tcy8nK3Jlc3VsdC5rZXksIG9wZW5fcm9vbSkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hSb29tSURPblVzZXIodXNlciwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VuZXJhdGVkUm9vbUlEKHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQua2V5KTsvLyBSb29tIElEXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2hSb29tSURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfcm9vbXMvJytyb29tX2lkLCB7aW5Sb29tOnRydWUsIGpvaW46bmV3IERhdGUoKX0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaFVzZXJJRE9uUm9vbSh1aWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBtZXNzYWdlcyA6XHJcbiAgICBwdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkOnN0cmluZywgdXNlcjphbnksIG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgbWVzc2FnZV9wYWNrID0ge307XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcil7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VfcGFja1sndXNlciddID0gdWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlX3BhY2tbJ21lc3NhZ2UnXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgbWVzc2FnZV9wYWNrWyd0aW1lc3RhbXAnXSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZmlyZWJhc2UucHVzaCgnL3Jvb21zLycrcm9vbV9pZCsnL21lc3NhZ2VzJywgbWVzc2FnZV9wYWNrKS50aGVuKHJlc3VsdCA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpOy8vIE1lc3NhZ2VfcGFjayBJRFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJsb2cgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGdlbmVyYXRlUG9zdCh1c2VyOmFueSwgcG9zdF9pZDpzdHJpbmcsIHBvc3Q6YW55KXtcclxuICAgICAgICB2YXIgb3Blbl9wb3N0ID0ge307XHJcbiAgICAgICAgaWYocG9zdD09bnVsbCl7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsnaXNPcGVuJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcGVuX3Bvc3RbJ25hbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdFsndHlwZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydkZXNjcmlwdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydpbWFnZSddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydsb2NhdGlvbiddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydsaWtlcyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0Wydjb21tZW50cyddID0gXCJcIjtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydvcGVuVGltZSddID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgb3Blbl9wb3N0WydjbG9zZVRpbWUnXSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgaWYocG9zdF9pZD09bnVsbCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvYmxvZ3MvJyt1aWQrJy9wb3N0cycsIFwiXCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Jlc3VsdC5rZXksIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoUG9zdElET25Vc2VyKHVzZXIsIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7Ly8gUm9vbSBJRFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG9wZW5fcG9zdCA9IHBvc3RbcG9zdF9pZF07XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL2Jsb2dzLycrdWlkK1wiL3Bvc3RzL1wiK3Bvc3RfaWQsIG9wZW5fcG9zdCkudGhlbihyZXN1bHQyID0+IHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1c2hQb3N0SURPblVzZXIodXNlcjphbnksIHJvb21faWQ6c3RyaW5nKXtcclxuICAgICAgICBmb3IodmFyIHVpZCBpbiB1c2VyKXtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoJy91c2Vycy8nK3VpZCsnL3VzZXJfYmxvZ3MvJytyb29tX2lkLCB0cnVlKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnB1c2hVc2VySURPblJvb20odWlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUF1dGggU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIG1ha2UgYXJyYXkgdHlwZSBkYXRhYmFzZSBhbmQgcHVzaCBkYXRhIGluIGFycmF5IHR5cGUgZGF0YWJhc2VcclxuICAgIHB1c2hJbkFycmF5RGF0YWJhc2UoZGF0YWJhc2VPZkFycmF5UGF0aDpzdHJpbmcsIHB1c2hEYXRhOmFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvdXNlcnMvJyArIHVzZXIudWlkICsgZGF0YWJhc2VPZkFycmF5UGF0aCwgcHVzaERhdGEpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2UgZGF0YSBzdHJ1Y3R1cmUgb2YgdmFsdWUgdHlwZSBkYXRhYmFzZVxyXG4gICAgbWFrZVN0cnVjdHVyZU9mVmFsdWVEYXRhYmFzZShkYXRhYmFzZVBhdGg6c3RyaW5nLCBzdHJ1Y3R1cmU6IGFueSl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgc3RydWN0dXJlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgYXR0cmlidXRlIGluIHZhbHVlIHR5cGUgZGF0YWJhc2UgYW5kIHVwZGF0ZSBkYXRhIGluIHZhbHVlIHR5cGUgZGF0YWJhc2VcclxuICAgIHdyaXRlVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZywgdXBkYXRlRGF0YTogYW55KXtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCwgdXBkYXRlRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWQgZGF0YSBpbiB2YWx1ZSB0eXBlIGRhdGFiYXNlXHJcbiAgICByZWFkVmFsdWVPZlZhbHVlRGF0YWJhc2UoZGF0YWJhc2VQYXRoOnN0cmluZyl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArIGRhdGFiYXNlUGF0aCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gY29tcGxleCBxdWVyeVxyXG4gICAgcXVlcnlPbkRhdGFiYXNlKGRhdGFiYXNlUGF0aDpzdHJpbmcpe1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUXVlcnlFdmVudCxcclxuICAgICAgICAgICAgICAgIC8vICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAgJy91c2Vycy8nICsgdXNlci51aWQgKyBkYXRhYmFzZVBhdGgsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdCcgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgb25seSBjb21wYW5pZXMgJ3NpbmNlJyBhIGNlcnRhaW4geWVhciAoVGVsZXJpaydzIHZhbHVlIGlzIDIwMDAsIHdoaWNoIGlzIGltYWdpbmFyeSBidHcpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGVpdGhlciBhICdyYW5nZSdcclxuICAgICAgICAgICAgICAgICAgICAvL3JhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAvLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uIG9yICdjaGFpbicgcmFuZ2VzIGxpa2UgdGhpczpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsdWU6IDE5OTlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRU5EX0FULFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHZhbHVlOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3QgMiBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKG5vdGUgdGhhdCB0aGVyZSdzIG9ubHkgMSBpbiB0aGlzIGNhc2UgYW55d2F5KVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvLyBxdWVyeSByZXN1bHRcclxuICAgIG9uUXVlcnlFdmVudChyZXN1bHQpIHtcclxuICAgICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcclxuICAgICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxyXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcXVlcnlUZXN0KCl7XHJcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3VzZXJzJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVbJ2F5UXQ1VmZ3d09oelo3VUV0UE1Yckh0aW1jZTInXSkpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpKTs7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHJlYWRVc2VyTmFtZSgpe1xyXG4gICAgLy8gICAgIHZhciB1c2VySWQgPSBmaXJlYmFzZVdlYi5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgLy8gICAgIHJldHVybiBmaXJlYmFzZVdlYi5kYXRhYmFzZSgpLnJlZignL3VzZXJzLycgKyB1c2VySWQpLm9uY2UoJ3ZhbHVlJykudGhlbihmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgdXNlcm5hbWUgPSAoc25hcHNob3QudmFsKCkgJiYgc25hcHNob3QudmFsKCkudXNlcm5hbWUpIHx8ICdBbm9ueW1vdXMnO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsLCBwYXNzd2QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3ZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUluaXQgU2VjdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIGdldCBjdXJyZW5kVXNlclxyXG4gICAgbG9naW4odXNlcikge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxyXG4gICAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9ICk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEN1cnJlbnRVc2VyKCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEF1dGhVc2VyKHVzZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0QXV0aFVzZXIodXNlcjpmaXJlYmFzZS5Vc2VyKXtcclxuICAgICAgICB0aGlzLmF1dGh1c2VyID0gdXNlcjtcclxuICAgICAgICAvLyBzZXQgdGhpc1VzZXJcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhpc1VzZXIocmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgLy8gc2V0IGZyaWVuZHNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB1c2VyLnVpZCArICcvZnJpZW5kcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RnJpZW5kcyhyZXN1bHRfa2V5cyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJnZXRGcmllbmRzQW5kVGhpc1VzZXJGcm9tRGF0YWJhc2UgRXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAvLyBzZXQgcm9vbXNcclxuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycgKyB0aGlzLmF1dGh1c2VyLnVpZCArICcvdXNlcl9yb29tcycpLnRoZW4ocmVzdWx0ID0+e1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2tleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIHJlc3VsdC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRfa2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vbXMocmVzdWx0X2tleXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiZ2V0RnJpZW5kc0FuZFRoaXNVc2VyRnJvbURhdGFiYXNlIEVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaGlzVXNlcihyZXN1bHQ6YW55KXtcclxuICAgICAgICB2YXIga2V5ID0gcmVzdWx0LmtleTtcclxuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB7fTtcclxuICAgICAgICB1c2VyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRoaXNVc2VyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50aGlzVXNlcik7XHJcbiAgICB9XHJcbiAgICBzZXRGcmllbmRzKGZyaWVuZF9pZHM6c3RyaW5nW10peyBcclxuICAgICAgICBjb25zb2xlLmxvZyhmcmllbmRfaWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwOyAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxmcmllbmRfaWRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7fSxcclxuICAgICAgICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndWlkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmcmllbmRfaWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudD09ZnJpZW5kX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RnJpZW5kcyhmcmllbmRfaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZnJpZW5kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJpZW5kWydINlU0WlJ2TFc2U0w4Um1JWDE4VFltZzFoaFYyJ10gPSB0aGlzLmdldEZyaWVuZHMoKVsnSDZVNFpSdkxXNlNMOFJtSVgxOFRZbWcxaGhWMiddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHVzaEZyaWVuZE9uUm9vbSh0aGlzLnRoaXNVc2VyLFwiLUxQTFZOVkYyeU0xTXp5Ry1ENzFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoTWVzc2FnZU9uUm9vbShcIi1MUExWTlZGMnlNMU16eUctRDcxXCIsIHRoaXMudGhpc1VzZXIsIFwiaGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGcmllbmRBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVQb3N0KHRoaXMudGhpc1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEZyaWVuZChmcmllbmQpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGZyaWVuZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kc1trZXldID0gZnJpZW5kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0VXNlcnNBcnJheSh0aGlzLmdldEZyaWVuZHMoKSkpO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpZW5kQXJyYXkoKTogdm9pZHtcclxuXHRcdHRoaXMuZnJpZW5kQXJyYXkgPSB0aGlzLmpzb25Ub0FycmF5KHRoaXMuZ2V0RnJpZW5kcygpKTtcclxuXHR9XHJcbiAgICBzZXRSb29tcyhyb29tX2lkczpzdHJpbmdbXSl7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21faWRzKTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cm9vbV9pZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KXt9LFxyXG4gICAgICAgICAgICAgICAgJy9yb29tcycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1aWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvb21faWRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeUxpbWl0VHlwZS5MQVNULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9vbShyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50PT1yb29tX2lkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vbUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZFJvb20ocm9vbSl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gcm9vbSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9vbXNba2V5XSA9IHJvb21ba2V5XTtcclxuICAgICAgICAgICAgdGhpcy5zeW5jUm9vbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRSb29tQXJyYXkoKXtcclxuICAgICAgICB0aGlzLnJvb21BcnJheSA9IHRoaXMuanNvblRvQXJyYXkodGhpcy5nZXRSb29tcygpKTtcclxuICAgICAgICB0aGlzLmFkZF9jb21tZW50KCdsb3BrRExHNlQ3anBUdVk1b082eCcsJ2hlbGxvJyk7XHJcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnRlc3RfZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5hZGRfcG9zdCh0aGlzLnRlc3RfZGF0YVtpXSk7XHJcbiAgICAgICAgLy8gfSAgICAgICAgXHJcblx0fVxyXG5cclxuICAgIHB1YmxpYyBqc29uVG9BcnJheShqc29uKXtcclxuICAgICAgICBpZihqc29uIT1udWxsKXtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkX2pzb24gPSB7fTtcclxuICAgICAgICAgICAgICAgIGNoaWxkX2pzb25ba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRfanNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRHZW5lcmF0ZWRSb29tSUQoZ2VuZXJhdGVkUm9vbUlEOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRSb29tSUQgPSBnZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0R2VuZXJhdGVkUm9vbUlEKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRSb29tSUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpIHtcclxuICAgICAgICBpZih0aGlzLmZyaWVuZHMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyaWVuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um9vbXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yb29tcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICB9XHJcbn1cclxuIl19