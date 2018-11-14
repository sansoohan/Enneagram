"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friend_list_service_1 = require("../../friendchat/friend-list.service");
var firebase_service_1 = require("../../../services/firebase.service");
var blog_service_1 = require("../../blog/blog-service");
var search_service_1 = require("../../searchoption/search-service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var MapExampleComponent = /** @class */ (function () {
    function MapExampleComponent(friendListService, firebaseService, blogService, searchService) {
        this.friendListService = friendListService;
        this.firebaseService = firebaseService;
        this.blogService = blogService;
        this.searchService = searchService;
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
        if (this.mapType === "search") {
            console.log("searchMap");
            this.updateThisUserLocation();
            this.searchService.postLocation = new nativescript_google_maps_sdk_1.Marker();
            this.searchService.postLocation.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(this.latitude, this.longitude);
            this.searchService.postLocation.title = "Me";
            this.searchService.postLocation.snippet = "";
            this.searchService.postLocation.userData = null;
            this.mapView.addMarker(this.searchService.postLocation);
        }
        if (this.mapType === "result") {
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
        if (this.mapType === "search") {
            this.searchService.postLocation.position = args.position;
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
            blog_service_1.BlogService,
            search_service_1.SearchService])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThFO0FBQzlFLDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLHVFQUFxRTtBQUNyRSx3REFBc0Q7QUFDdEQsb0VBQWtFO0FBQ2xFLHNEQUF3RDtBQUN4RCxrQ0FBb0M7QUFDcEMsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFpQjFDO0lBdUJJLDZCQUFvQixpQkFBb0MsRUFDNUMsZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsYUFBNEI7UUFIcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUM1QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF2QmpDLGFBQVEsR0FBSSxTQUFTLENBQUM7UUFDdEIsY0FBUyxHQUFHLFVBQVUsQ0FBQztRQUN2QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFlBQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSTNCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFHekIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQVFULHNCQUFzQjtRQUN0Qiw0REFBNEQ7UUFDNUQsSUFBSSxDQUFD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QyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO2dCQUNyRixDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxzQkFBc0IsS0FBRyxLQUFLLElBQUksQ0FBQyxvQkFBb0IsS0FBRyxNQUFNLElBQUksb0JBQW9CLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwRyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQzVFLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7Z0JBQ3JGLENBQUM7Z0JBQ0QsRUFBRSxDQUFBLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ25CLDREQUE0RDtnQkFDaEUsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDdEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxzQkFBc0IsS0FBRyxNQUFNLElBQUksc0JBQXNCLEtBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBRyxNQUFNLElBQUksb0JBQW9CLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNqSSxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQzVFLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFB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QVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUF4UFE7UUFBUixZQUFLLEVBQUU7O3dEQUFnQjtJQUNGO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLHNDQUFPO3dEQUFDO0lBRjlCLG1CQUFtQjtRQWYvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLGt4QkFXVDtTQUNKLENBQUM7eUNBd0J5Qyx1Q0FBaUI7WUFDM0Isa0NBQWU7WUFDbkIsMEJBQVc7WUFDVCw4QkFBYTtPQTFCL0IsbUJBQW1CLENBMFAvQjtJQUFELDBCQUFDO0NBQUEsQUExUEQsSUEwUEM7QUExUFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7cmVnaXN0ZXJFbGVtZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XHJcbmltcG9ydCB7IEZyaWVuZExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZnJpZW5kY2hhdC9mcmllbmQtbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQmxvZ1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vYmxvZy9ibG9nLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgZ2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xyXG5yZWdpc3RlckVsZW1lbnQoJ01hcFZpZXcnLCAoKSA9PiBNYXBWaWV3KTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdNYXBFeGFtcGxlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8R3JpZExheW91dD5cclxuICAgIDxNYXBWaWV3ICNtYXBWaWV3IFttYXBUeXBlXT1cIm1hcFR5cGVcIiBbbGF0aXR1ZGVdPVwibGF0aXR1ZGVcIiBbbG9uZ2l0dWRlXT1cImxvbmdpdHVkZVwiXHJcbiAgICAgICAgICAgICBbem9vbV09XCJ6b29tXCIgW21pblpvb21dPVwibWluWm9vbVwiIFttYXhab29tXT1cIm1heFpvb21cIiBbYmVhcmluZ109XCJiZWFyaW5nXCJcclxuICAgICAgICAgICAgIFt0aWx0XT1cInRpbHRcIiBpLXBhZGRpbmc9XCI1MCw1MCw1MCw1MFwiIFtwYWRkaW5nXT1cInBhZGRpbmdcIiAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJTZWxlY3QpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKG1hcmtlckJlZ2luRHJhZ2dpbmcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJFbmREcmFnZ2luZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAobWFya2VyRHJhZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlckluZm9XaW5kb3dUYXBwZWQpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKGNvb3JkaW5hdGVUYXBwZWQpPVwib25Db29yZGluYXRlVGFwcGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAgKGNhbWVyYUNoYW5nZWQpPVwib25DYW1lcmFDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICAgICAgICAgKGNhbWVyYU1vdmUpPVwib25DYW1lcmFNb3ZlKCRldmVudClcIj48L01hcFZpZXc+XHJcbiAgICA8L0dyaWRMYXlvdXQ+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBFeGFtcGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIG1hcFR5cGU6c3RyaW5nO1xyXG4gICAgQFZpZXdDaGlsZChcIm1hcFZpZXdcIikgbWFwVmlldzogTWFwVmlldztcclxuICAgIHB1YmxpYyBsYXRpdHVkZSA9ICAzNy4zMjM5NzI7XHJcbiAgICBwdWJsaWMgbG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgIHB1YmxpYyBzcGVlZCA9IDA7XHJcbiAgICBwdWJsaWMgYWRkciA9IFwiXCI7XHJcbiAgICB6b29tID0gMTU7XHJcbiAgICBtaW5ab29tID0gMDtcclxuICAgIG1heFpvb20gPSAyMjtcclxuICAgIGJlYXJpbmcgPSAwO1xyXG4gICAgdGlsdCA9IDA7XHJcbiAgICBwYWRkaW5nID0gWzQwLCA0MCwgNDAsIDQwXTtcclxuICAgIFxyXG5cclxuICAgIGRpc3RhbmNlc1Jlc3VsdDtcclxuICAgIGZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgZmlsdGVyZWRCeUVubmVhZ3JhbSA9IFtdO1xyXG5cclxuICAgIGxhc3RDYW1lcmE6IFN0cmluZztcclxuICAgIG1hcmtlcnMgPSBbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRMaXN0U2VydmljZTogRnJpZW5kTGlzdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGJsb2dTZXJ2aWNlOiBCbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXHJcbiAgICApIHtcclxuICAgICAgICAvLyB0aGlzLmdldERpc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVUaGlzVXNlckxvY2F0aW9uLmJpbmQodGhpcyksNTAwMCk7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZVRlc3QoKTtcclxuICAgIH1cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcbiAgICBkaXN0YW5jZVRlc3QoKXtcclxuICAgICAgICB2YXIgb3JpZ2luID0gbmV3IGdlb2xvY2F0aW9uLkxvY2F0aW9uKCk7XHJcbiAgICAgICAgb3JpZ2luLmxhdGl0dWRlID0gMzcuMzIzOTcyO1xyXG4gICAgICAgIG9yaWdpbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uLmxhdGl0dWRlID0gMzYuMzIzNzAwO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uLmxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2VvbG9jYXRpb24uZGlzdGFuY2Uob3JpZ2luLCBkZXN0aW5hdGlvbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKXtcclxuICAgICAgICBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsIG1heGltdW1BZ2U6IDUwMDAsIHRpbWVvdXQ6IDIwMDAwIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcclxuICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZEFsbE1hcmtlcnMoKXtcclxuICAgIC8vICAgICB0aGlzLm1hcmtlcnMgPSBbXTtcclxuICAgIC8vICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kcy5sZW5ndGg7aSsrKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2godGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldERpc3RhbmNlKG9yaWdpbnM6IE1hcmtlciwgZGVzdGluYXRpb25zOiBBcnJheTxNYXJrZXI+KXtcclxuICAgICAgICB0aGlzLmRpc3RhbmNlc1Jlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYoZGVzdGluYXRpb25zLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGlzdGFuY2VVUkwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXN0YW5jZW1hdHJpeC9qc29uP3VuaXRzPW1ldHJpYyZtb2RlPXRyYW5zaXQmb3JpZ2lucz1cIitvcmlnaW5zLnBvc2l0aW9uLmxhdGl0dWRlK1wiLFwiK29yaWdpbnMucG9zaXRpb24ubG9uZ2l0dWRlK1wiJmRlc3RpbmF0aW9ucz1cIjtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGRlc3RpbmF0aW9ucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gZGVzdGluYXRpb25zW2ldLnBvc2l0aW9uLmxhdGl0dWRlK1wiJTJDXCI7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIGlmKGkhPWRlc3RpbmF0aW9ucy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiU3Q1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3RhbmNlVVJMICs9IFwiJmtleT1BSXphU3lEcy1pS2piOWZwSW1mRW1Hc0V6RjJybzYwbTBnTmZ4SllcIjtcclxuICAgICAgICBmZXRjaChkaXN0YW5jZVVSTClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSByO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZGlzdGFuY2UgLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCeURpc3RhbmNlKDgwMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXJpbmcgYSBtYXJrZXIgd2l0aCBlbm5lYWdyYW0gLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWx0ZXJCeVVzZXJFbm5lYWdyYW0oXCJsb3dcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ZpbHRlcmVkTWFya2VyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5RGlzdGFuY2Uoc2VhcmNoUmFkaW91czpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuZGlzdGFuY2VzUmVzdWx0PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmRpc3RhbmNlc1Jlc3VsdC5yb3dzWzBdLmVsZW1lbnRzO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxlbGVtZW50cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudHNbaV0uZGlzdGFuY2UudmFsdWU8PXNlYXJjaFJhZGlvdXMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyQnlVc2VyRW5uZWFncmFtKGZpbHRlckxldmVsOiBzdHJpbmcsIHVzZXJzOiBhbnkpOiBBcnJheTxib29sZWFuPntcclxuICAgICAgICB2YXIgZW5uZWFncmFtRmlsdGVyOiBBcnJheTxib29sZWFuPiA9IG5ldyBBcnJheTxib29sZWFuPigpO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXI7XHJcbiAgICAgICAgdmFyIHRoaXNVc2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0uc3RhdGU7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcnMpe1xyXG4gICAgICAgICAgICB2YXIgdGhpc2ZyaWVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZnJpZW5kRW5uZWFncmFtTnVtID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ251bWJlciddO1xyXG4gICAgICAgICAgICB2YXIgZnJpZW5kRW5uZWFncmFtU3RhdGUgPSB1c2Vyc1t1aWRdWydlbm5lYWdyYW0nXVsnc3RhdGUnXTtcclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXNmcmllbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihmaWx0ZXJMZXZlbCA9PT0gXCJoaWdoXCIgfHwgZmlsdGVyTGV2ZWwgPT09IFwibG93XCIpe1xyXG4gICAgICAgICAgICAgICAgaWYoKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCB0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJcIikgJiYgZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImJhZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW0ucHVzaCh0cnVlKTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImJhZFwiICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO30gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzZnJpZW5kID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIuY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwibG93XCIpe1xyXG4gICAgICAgICAgICAgICAgaWYoKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCB0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJcIikgJiYgKGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cIlwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJ5ZWxsb3dcIjtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVubmVhZ3JhbUZpbHRlci5wdXNoKHRoaXNmcmllbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5uZWFncmFtRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkcmF3RmlsdGVyZWRNYXJrZXIoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZVtpXSAmJiB0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW1baV0pe1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9NYXAgZXZlbnRzXHJcbiAgICBvbk1hcFJlYWR5KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xyXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJibG9nXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJsb2dNYXBcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbiA9IG5ldyBNYXJrZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSx0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnRpdGxlID0gXCJNZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi5zbmlwcGV0ID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24udXNlckRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwic2VhcmNoXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaE1hcFwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUaGlzVXNlckxvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSx0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24udGl0bGUgPSBcIk1lXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24udXNlckRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJyZXN1bHRcIil7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXgubWFya2VyKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgYWxsIG1hcmtlcnMuLi5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRBbGxNYXJrZXJzKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGRpc3RhbmNlIGZyb20gb3JpZ2luIHRvIGRlc3RpbmF0aW9ucyAuLi5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSh0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlciwgdGhpcy5tYXJrZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBhcmdzLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbiA9IGFyZ3MucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXIgRXZlbnQ6ICdcIiArIGFyZ3MuZXZlbnROYW1lXHJcbiAgICAgICAgICAgICsgXCInIHRyaWdnZXJlZCBvbjogXCIgKyBhcmdzLm1hcmtlci50aXRsZVxyXG4gICAgICAgICAgICArIFwiLCBMYXQ6IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbWVyYU1vdmUoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIG1vdmluZzogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==