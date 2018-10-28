"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friend_list_service_1 = require("../../friendchat/friend-list.service");
var firebase_service_1 = require("../../../services/firebase.service");
var blog_service_1 = require("../../blog/blog-service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var MapExampleComponent = /** @class */ (function () {
    function MapExampleComponent(friendListService, firebaseService, blogService) {
        this.friendListService = friendListService;
        this.firebaseService = firebaseService;
        this.blogService = blogService;
        this.latitude = 37.323972;
        this.longitude = 127.125109;
        this.speed = 0;
        this.addr = "";
        this.zoom = 15;
        this.minZoom = 0;
        this.maxZoom = 22;
        this.bearing = 0;
        this.tilt = 0;
        this.padding = [40, 40, 40, 40];
        this.filteredByDistance = [];
        this.filteredByEnneagram = [];
        this.markers = [];
        // this.getDistance();
        // setInterval(this.updateThisUserLocation.bind(this),5000);
        this.distanceTest();
    }
    MapExampleComponent.prototype.ngOnInit = function () {
    };
    MapExampleComponent.prototype.distanceTest = function () {
        var origin = new geolocation.Location();
        origin.latitude = 37.323972;
        origin.longitude = 127.125109;
        var destination = new geolocation.Location();
        destination.latitude = 36.323700;
        destination.longitude = 127.125109;
        console.log(geolocation.distance(origin, destination));
    };
    MapExampleComponent.prototype.updateThisUserLocation = function () {
        var _this = this;
        geolocation.getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(function (res) {
            _this.latitude = res.latitude;
            _this.longitude = res.longitude;
        });
    };
    // addAllMarkers(){
    //     this.markers = [];
    //     for(var i=0;i<this.friendListService.friends.length;i++){
    //         this.markers.push(this.friendListService.friends[i].marker);
    //     }
    // }
    MapExampleComponent.prototype.getDistance = function (origins, destinations) {
        var _this = this;
        this.distancesResult = null;
        if (destinations.length == 0) {
            return;
        }
        var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=transit&origins=" + origins.position.latitude + "," + origins.position.longitude + "&destinations=";
        for (var i = 0; i < destinations.length; i++) {
            distanceURL += destinations[i].position.latitude + "%2C";
            distanceURL += destinations[i].position.longitude;
            if (i != destinations.length - 1) {
                distanceURL += "%7C";
            }
        }
        distanceURL += "&key=AIzaSyDs-iKjb9fpImfEmGsEzF2ro60m0gNfxJY";
        fetch(distanceURL)
            .then(function (response) { return response.json(); }).then(function (r) {
            console.log(r);
            _this.distancesResult = r;
            console.log("Filtering a marker with distance ...");
            _this.filterByDistance(800);
            console.log(_this.filteredByDistance);
            console.log("Filtering a marker with enneagram ...");
            // this.filterByUserEnneagram("low");
            console.log(_this.filteredByEnneagram);
            console.log("Setting a marker...");
            _this.drawFilteredMarker();
        });
    };
    MapExampleComponent.prototype.filterByDistance = function (searchRadious) {
        if (this.distancesResult == null) {
            return;
        }
        var elements = this.distancesResult.rows[0].elements;
        this.filteredByDistance = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].distance.value <= searchRadious) {
                this.filteredByDistance.push(true);
            }
            else {
                this.filteredByDistance.push(false);
            }
        }
    };
    MapExampleComponent.prototype.filterByUserEnneagram = function (filterLevel, users) {
        var enneagramFilter = new Array();
        var thisUserEnneagramNum = this.firebaseService.thisUser.enneagram.number;
        var thisUserEnneagramState = this.firebaseService.thisUser.enneagram.state;
        for (var uid in users) {
            var thisfriend = false;
            var friendEnneagramNum = users[uid]['enneagram']['number'];
            var friendEnneagramState = users[uid]['enneagram']['state'];
            if (filterLevel === "none") {
                thisfriend = true;
            }
            if (filterLevel === "high" || filterLevel === "low") {
                if ((thisUserEnneagramState === "good" || thisUserEnneagramState === "") && friendEnneagramState === "bad") {
                    if (thisUserEnneagramNum == 9 && friendEnneagramNum == 3) {
                        this.filteredByEnneagram.push(true);
                    }
                    else if (thisUserEnneagramNum == 3 && friendEnneagramNum == 6) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 6 && friendEnneagramNum == 9) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 1 && friendEnneagramNum == 7) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 7 && friendEnneagramNum == 5) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 5 && friendEnneagramNum == 8) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 8 && friendEnneagramNum == 2) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 2 && friendEnneagramNum == 4) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 4 && friendEnneagramNum == 1) {
                        thisfriend = true;
                    }
                }
                else if (thisUserEnneagramState === "bad" && (friendEnneagramState === "good" || friendEnneagramState === "")) {
                    if (thisUserEnneagramNum == 9 && friendEnneagramNum == 6) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 3 && friendEnneagramNum == 9) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 6 && friendEnneagramNum == 3) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 1 && friendEnneagramNum == 4) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 7 && friendEnneagramNum == 1) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 5 && friendEnneagramNum == 7) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 8 && friendEnneagramNum == 5) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 2 && friendEnneagramNum == 8) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 4 && friendEnneagramNum == 2) {
                        thisfriend = true;
                    }
                }
                if (thisfriend == true) {
                    // this.friendListService.friends[i].marker.color = "green";
                }
            }
            if (filterLevel === "low") {
                if ((thisUserEnneagramState === "good" || thisUserEnneagramState === "") && (friendEnneagramState === "good" || friendEnneagramState === "")) {
                    if (thisUserEnneagramNum == 9 && friendEnneagramNum == 8) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 9 && friendEnneagramNum == 1) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 3 && friendEnneagramNum == 2) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 3 && friendEnneagramNum == 4) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 6 && friendEnneagramNum == 5) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 6 && friendEnneagramNum == 7) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 1 && friendEnneagramNum == 2) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 1 && friendEnneagramNum == 3) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 7 && friendEnneagramNum == 6) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 7 && friendEnneagramNum == 8) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 5 && friendEnneagramNum == 4) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 5 && friendEnneagramNum == 6) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 8 && friendEnneagramNum == 7) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 8 && friendEnneagramNum == 9) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 2 && friendEnneagramNum == 1) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 2 && friendEnneagramNum == 3) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 4 && friendEnneagramNum == 3) {
                        thisfriend = true;
                    }
                    else if (thisUserEnneagramNum == 4 && friendEnneagramNum == 5) {
                        thisfriend = true;
                    }
                }
                if (thisfriend == true) {
                    // this.friendListService.friends[i].marker.color = "yellow";
                }
            }
            enneagramFilter.push(thisfriend);
        }
        return enneagramFilter;
    };
    MapExampleComponent.prototype.drawFilteredMarker = function () {
        for (var i = 0; i < this.filteredByDistance.length; i++) {
            if (this.filteredByDistance[i] && this.filteredByEnneagram[i]) {
                // this.mapView.addMarker(this.friendListService.friends[i].marker);
            }
        }
    };
    //Map events
    MapExampleComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        this.mapView = event.object;
        if (this.mapType === "blog") {
            console.log("blogMap");
            this.updateThisUserLocation();
            this.blogService.postLocation = new nativescript_google_maps_sdk_1.Marker();
            this.blogService.postLocation.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(this.latitude, this.longitude);
            this.blogService.postLocation.title = "Me";
            this.blogService.postLocation.snippet = "";
            this.blogService.postLocation.userData = null;
            this.mapView.addMarker(this.blogService.postLocation);
        }
        // this.mapView.addMarker(this.friendListService.thisUser.index.marker);
        console.log("Adding all markers...");
        // this.addAllMarkers();
        console.log("Get distance from origin to destinations ...");
        // this.getDistance(this.friendListService.thisUser.index.marker, this.markers);
    };
    MapExampleComponent.prototype.onCoordinateTapped = function (args) {
        if (this.mapType === "blog") {
            this.blogService.postLocation.position = args.position;
        }
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    MapExampleComponent.prototype.onMarkerEvent = function (args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    };
    MapExampleComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    MapExampleComponent.prototype.onCameraMove = function (args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MapExampleComponent.prototype, "mapType", void 0);
    __decorate([
        core_1.ViewChild("mapView"),
        __metadata("design:type", nativescript_google_maps_sdk_1.MapView)
    ], MapExampleComponent.prototype, "mapView", void 0);
    MapExampleComponent = __decorate([
        core_1.Component({
            selector: 'MapExample',
            template: "\n    <GridLayout>\n    <MapView #mapView [mapType]=\"mapType\" [latitude]=\"latitude\" [longitude]=\"longitude\"\n             [zoom]=\"zoom\" [minZoom]=\"minZoom\" [maxZoom]=\"maxZoom\" [bearing]=\"bearing\"\n             [tilt]=\"tilt\" i-padding=\"50,50,50,50\" [padding]=\"padding\" (mapReady)=\"onMapReady($event)\"\n             (markerSelect)=\"onMarkerEvent($event)\" (markerBeginDragging)=\"onMarkerEvent($event)\"\n             (markerEndDragging)=\"onMarkerEvent($event)\" (markerDrag)=\"onMarkerEvent($event)\"\n             (markerInfoWindowTapped)=\"onMarkerEvent($event)\" (coordinateTapped)=\"onCoordinateTapped($event)\"\n             (cameraChanged)=\"onCameraChanged($event)\"\n             (cameraMove)=\"onCameraMove($event)\"></MapView>\n    </GridLayout>\n    "
        }),
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService,
            firebase_service_1.FirebaseService,
            blog_service_1.BlogService])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThFO0FBQzlFLDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLHVFQUFxRTtBQUNyRSx3REFBc0Q7QUFDdEQsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQWlCMUM7SUF1QkksNkJBQW9CLGlCQUFvQyxFQUM1QyxlQUFnQyxFQUNoQyxXQUF3QjtRQUZoQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXRCN0IsYUFBUSxHQUFJLFNBQVMsQ0FBQztRQUN0QixjQUFTLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFJM0IsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUd6QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBT1Qsc0JBQXNCO1FBQ3RCLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNKLHNDQUFRLEdBQVI7SUFDQSxDQUFD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QUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztnQkFDckYsQ0FBQztnQkFDRCxFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDbkIsNERBQTREO2dCQUNoRSxDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixFQUFFLENBQUEsQ0FBQyxDQUFDLHNCQUFzQixLQUFHLE1BQU0sSUFBSSxzQkFBc0IsS0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFHLE1BQU0sSUFBSSxvQkFBb0IsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ2pJLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztnQkFDckYsQ0FBQztnQkFDRCxF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eEcsQ0FBQztJQUVELDZDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBck9RO1FBQVIsWUFBSyxFQUFFOzt3REFBZ0I7SUFDRjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBVSxzQ0FBTzt3REFBQztJQUY5QixtQkFBbUI7UUFmL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxreEJBV1Q7U0FDSixDQUFDO3lDQXdCeUMsdUNBQWlCO1lBQzNCLGtDQUFlO1lBQ25CLDBCQUFXO09BekIzQixtQkFBbUIsQ0F1Ty9CO0lBQUQsMEJBQUM7Q0FBQSxBQXZPRCxJQXVPQztBQXZPWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHsgRnJpZW5kTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuLi8uLi9ibG9nL2Jsb2ctc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ01hcEV4YW1wbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxHcmlkTGF5b3V0PlxyXG4gICAgPE1hcFZpZXcgI21hcFZpZXcgW21hcFR5cGVdPVwibWFwVHlwZVwiIFtsYXRpdHVkZV09XCJsYXRpdHVkZVwiIFtsb25naXR1ZGVdPVwibG9uZ2l0dWRlXCJcclxuICAgICAgICAgICAgIFt6b29tXT1cInpvb21cIiBbbWluWm9vbV09XCJtaW5ab29tXCIgW21heFpvb21dPVwibWF4Wm9vbVwiIFtiZWFyaW5nXT1cImJlYXJpbmdcIlxyXG4gICAgICAgICAgICAgW3RpbHRdPVwidGlsdFwiIGktcGFkZGluZz1cIjUwLDUwLDUwLDUwXCIgW3BhZGRpbmddPVwicGFkZGluZ1wiIChtYXBSZWFkeSk9XCJvbk1hcFJlYWR5KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlclNlbGVjdCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAobWFya2VyQmVnaW5EcmFnZ2luZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlckVuZERyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJEcmFnKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VySW5mb1dpbmRvd1RhcHBlZCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAoY29vcmRpbmF0ZVRhcHBlZCk9XCJvbkNvb3JkaW5hdGVUYXBwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhQ2hhbmdlZCk9XCJvbkNhbWVyYUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhTW92ZSk9XCJvbkNhbWVyYU1vdmUoJGV2ZW50KVwiPjwvTWFwVmlldz5cclxuICAgIDwvR3JpZExheW91dD5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcEV4YW1wbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgbWFwVHlwZTpzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKFwibWFwVmlld1wiKSBtYXBWaWV3OiBNYXBWaWV3O1xyXG4gICAgcHVibGljIGxhdGl0dWRlID0gIDM3LjMyMzk3MjtcclxuICAgIHB1YmxpYyBsb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgcHVibGljIHNwZWVkID0gMDtcclxuICAgIHB1YmxpYyBhZGRyID0gXCJcIjtcclxuICAgIHpvb20gPSAxNTtcclxuICAgIG1pblpvb20gPSAwO1xyXG4gICAgbWF4Wm9vbSA9IDIyO1xyXG4gICAgYmVhcmluZyA9IDA7XHJcbiAgICB0aWx0ID0gMDtcclxuICAgIHBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xyXG4gICAgXHJcblxyXG4gICAgZGlzdGFuY2VzUmVzdWx0O1xyXG4gICAgZmlsdGVyZWRCeURpc3RhbmNlID0gW107XHJcbiAgICBmaWx0ZXJlZEJ5RW5uZWFncmFtID0gW107XHJcblxyXG4gICAgbGFzdENhbWVyYTogU3RyaW5nO1xyXG4gICAgbWFya2VycyA9IFtdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZExpc3RTZXJ2aWNlOiBGcmllbmRMaXN0U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYmxvZ1NlcnZpY2U6IEJsb2dTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbi5iaW5kKHRoaXMpLDUwMDApO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VUZXN0KCk7XHJcbiAgICB9XHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0fVxyXG4gICAgZGlzdGFuY2VUZXN0KCl7XHJcbiAgICAgICAgdmFyIG9yaWdpbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIG9yaWdpbi5sYXRpdHVkZSA9IDM3LjMyMzk3MjtcclxuICAgICAgICBvcmlnaW4ubG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBuZXcgZ2VvbG9jYXRpb24uTG9jYXRpb24oKTtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sYXRpdHVkZSA9IDM2LjMyMzcwMDtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdlb2xvY2F0aW9uLmRpc3RhbmNlKG9yaWdpbiwgZGVzdGluYXRpb24pKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaGlzVXNlckxvY2F0aW9uKCl7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCBtYXhpbXVtQWdlOiA1MDAwLCB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRBbGxNYXJrZXJzKCl7XHJcbiAgICAvLyAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAvLyAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXREaXN0YW5jZShvcmlnaW5zOiBNYXJrZXIsIGRlc3RpbmF0aW9uczogQXJyYXk8TWFya2VyPil7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9ucy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlVVJMID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlzdGFuY2VtYXRyaXgvanNvbj91bml0cz1tZXRyaWMmbW9kZT10cmFuc2l0Jm9yaWdpbnM9XCIrb3JpZ2lucy5wb3NpdGlvbi5sYXRpdHVkZStcIixcIitvcmlnaW5zLnBvc2l0aW9uLmxvbmdpdHVkZStcIiZkZXN0aW5hdGlvbnM9XCI7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkZXN0aW5hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sYXRpdHVkZStcIiUyQ1wiO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBkZXN0aW5hdGlvbnNbaV0ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBpZihpIT1kZXN0aW5hdGlvbnMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gXCIlN0NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCI7XHJcbiAgICAgICAgZmV0Y2goZGlzdGFuY2VVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VzUmVzdWx0ID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlcmluZyBhIG1hcmtlciB3aXRoIGRpc3RhbmNlIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEaXN0YW5jZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZW5uZWFncmFtIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlVc2VyRW5uZWFncmFtKFwibG93XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdGaWx0ZXJlZE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeURpc3RhbmNlKHNlYXJjaFJhZGlvdXM6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmRpc3RhbmNlc1Jlc3VsdD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaXN0YW5jZXNSZXN1bHQucm93c1swXS5lbGVtZW50cztcclxuICAgICAgICB0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnRzW2ldLmRpc3RhbmNlLnZhbHVlPD1zZWFyY2hSYWRpb3VzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5VXNlckVubmVhZ3JhbShmaWx0ZXJMZXZlbDogc3RyaW5nLCB1c2VyczogYW55KTogQXJyYXk8Ym9vbGVhbj57XHJcbiAgICAgICAgdmFyIGVubmVhZ3JhbUZpbHRlcjogQXJyYXk8Ym9vbGVhbj4gPSBuZXcgQXJyYXk8Ym9vbGVhbj4oKTtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIuZW5uZWFncmFtLnN0YXRlO1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXJzKXtcclxuICAgICAgICAgICAgdmFyIHRoaXNmcmllbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbU51bSA9IHVzZXJzW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbVN0YXRlID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzZnJpZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwiaGlnaFwiIHx8IGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtLnB1c2godHJ1ZSk7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIiAmJiAoZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCBmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXNmcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlci5jb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbm5lYWdyYW1GaWx0ZXIucHVzaCh0aGlzZnJpZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVubmVhZ3JhbUZpbHRlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhd0ZpbHRlcmVkTWFya2VyKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2VbaV0gJiYgdGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtW2ldKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vTWFwIGV2ZW50c1xyXG4gICAgb25NYXBSZWFkeShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9nTWFwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi50aXRsZSA9IFwiTWVcIjtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS50aGlzVXNlci5pbmRleC5tYXJrZXIpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBhbGwgbWFya2Vycy4uLlwiKTtcclxuICAgICAgICAvLyB0aGlzLmFkZEFsbE1hcmtlcnMoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZXQgZGlzdGFuY2UgZnJvbSBvcmlnaW4gdG8gZGVzdGluYXRpb25zIC4uLlwiKTtcclxuICAgICAgICAvLyB0aGlzLmdldERpc3RhbmNlKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXgubWFya2VyLCB0aGlzLm1hcmtlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29vcmRpbmF0ZVRhcHBlZChhcmdzKSB7XHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbiA9IGFyZ3MucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXIgRXZlbnQ6ICdcIiArIGFyZ3MuZXZlbnROYW1lXHJcbiAgICAgICAgICAgICsgXCInIHRyaWdnZXJlZCBvbjogXCIgKyBhcmdzLm1hcmtlci50aXRsZVxyXG4gICAgICAgICAgICArIFwiLCBMYXQ6IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbWVyYU1vdmUoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIG1vdmluZzogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==