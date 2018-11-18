"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var firebase_service_1 = require("../../../services/firebase.service");
var blog_service_1 = require("../../blog/blog-service");
var search_service_1 = require("../../searchoption/search-service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var MapExampleComponent = /** @class */ (function () {
    function MapExampleComponent(firebaseService, blogService, searchService) {
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
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
            blog_service_1.BlogService,
            search_service_1.SearchService])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThFO0FBQzlFLDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsdUVBQXFFO0FBQ3JFLHdEQUFzRDtBQUN0RCxvRUFBa0U7QUFDbEUsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQWlCMUM7SUF1QkksNkJBQ1ksZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsYUFBNEI7UUFGNUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkJqQyxhQUFRLEdBQUksU0FBUyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFDdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUkzQix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFRVCxzQkFBc0I7UUFDdEIsNERBQTREO1FBQzVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0osc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFDRSww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LENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUM1RSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO2dCQUNyRixDQUFDO2dCQUNELEVBQUUsQ0FBQSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO29CQUNuQiw0REFBNEQ7Z0JBQ2hFLENBQUM7WUFDTCxDQUFDO1lBRUQsRUFBRSxDQUFBLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQSxDQUFDLENBQUMsc0JBQXNCLEtBQUcsTUFBTSxJQUFJLHNCQUFzQixLQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEtBQUcsTUFBTSxJQUFJLG9CQUFvQixLQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDakksRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUM1RSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO2dCQUNyRixDQUFDO2dCQUNELEVBQUUsQ0FBQSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO29CQUNuQiw2REFBNkQ7Z0JBQ2pFLENBQUM7WUFDTCxDQUFDO1lBQ0QsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBR0QsZ0RBQWtCLEdBQWxCO1FBQ0ksR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDOUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQzFELG9FQUFvRTtZQUN4RSxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFHRCxZQUFZO0lBQ1osd0NBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUU1QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFHLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLHFDQUFNLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFHLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLHFDQUFNLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFHLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFFNUIsQ0FBQztRQUNELHdFQUF3RTtRQUV4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsd0JBQXdCO1FBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQztRQUM1RCxnRkFBZ0Y7SUFDcEYsQ0FBQztJQUVELGdEQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUcsTUFBTSxDQUFDLENBQUEsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzRCxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBRyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdELENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTO2NBQ3hDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztjQUN0QyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELDZDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBeFBRO1FBQVIsWUFBSyxFQUFFOzt3REFBZ0I7SUFDRjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBVSxzQ0FBTzt3REFBQztJQUY5QixtQkFBbUI7UUFmL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxreEJBV1Q7U0FDSixDQUFDO3lDQXlCK0Isa0NBQWU7WUFDbkIsMEJBQVc7WUFDVCw4QkFBYTtPQTFCL0IsbUJBQW1CLENBMFAvQjtJQUFELDBCQUFDO0NBQUEsQUExUEQsSUEwUEM7QUExUFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7cmVnaXN0ZXJFbGVtZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJsb2dTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2Jsb2cvYmxvZy1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VhcmNob3B0aW9uL3NlYXJjaC1zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidWkvZW51bXNcIjtcclxucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnTWFwRXhhbXBsZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPEdyaWRMYXlvdXQ+XHJcbiAgICA8TWFwVmlldyAjbWFwVmlldyBbbWFwVHlwZV09XCJtYXBUeXBlXCIgW2xhdGl0dWRlXT1cImxhdGl0dWRlXCIgW2xvbmdpdHVkZV09XCJsb25naXR1ZGVcIlxyXG4gICAgICAgICAgICAgW3pvb21dPVwiem9vbVwiIFttaW5ab29tXT1cIm1pblpvb21cIiBbbWF4Wm9vbV09XCJtYXhab29tXCIgW2JlYXJpbmddPVwiYmVhcmluZ1wiXHJcbiAgICAgICAgICAgICBbdGlsdF09XCJ0aWx0XCIgaS1wYWRkaW5nPVwiNTAsNTAsNTAsNTBcIiBbcGFkZGluZ109XCJwYWRkaW5nXCIgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyU2VsZWN0KT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJCZWdpbkRyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyRW5kRHJhZ2dpbmcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKG1hcmtlckRyYWcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJJbmZvV2luZG93VGFwcGVkKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChjb29yZGluYXRlVGFwcGVkKT1cIm9uQ29vcmRpbmF0ZVRhcHBlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFDaGFuZ2VkKT1cIm9uQ2FtZXJhQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFNb3ZlKT1cIm9uQ2FtZXJhTW92ZSgkZXZlbnQpXCI+PC9NYXBWaWV3PlxyXG4gICAgPC9HcmlkTGF5b3V0PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwRXhhbXBsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBtYXBUeXBlOnN0cmluZztcclxuICAgIEBWaWV3Q2hpbGQoXCJtYXBWaWV3XCIpIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgICBwdWJsaWMgbGF0aXR1ZGUgPSAgMzcuMzIzOTcyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICBwdWJsaWMgc3BlZWQgPSAwO1xyXG4gICAgcHVibGljIGFkZHIgPSBcIlwiO1xyXG4gICAgem9vbSA9IDE1O1xyXG4gICAgbWluWm9vbSA9IDA7XHJcbiAgICBtYXhab29tID0gMjI7XHJcbiAgICBiZWFyaW5nID0gMDtcclxuICAgIHRpbHQgPSAwO1xyXG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbiAgICBcclxuXHJcbiAgICBkaXN0YW5jZXNSZXN1bHQ7XHJcbiAgICBmaWx0ZXJlZEJ5RGlzdGFuY2UgPSBbXTtcclxuICAgIGZpbHRlcmVkQnlFbm5lYWdyYW0gPSBbXTtcclxuXHJcbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XHJcbiAgICBtYXJrZXJzID0gW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBibG9nU2VydmljZTogQmxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbi5iaW5kKHRoaXMpLDUwMDApO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VUZXN0KCk7XHJcbiAgICB9XHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0fVxyXG4gICAgZGlzdGFuY2VUZXN0KCl7XHJcbiAgICAgICAgdmFyIG9yaWdpbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIG9yaWdpbi5sYXRpdHVkZSA9IDM3LjMyMzk3MjtcclxuICAgICAgICBvcmlnaW4ubG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBuZXcgZ2VvbG9jYXRpb24uTG9jYXRpb24oKTtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sYXRpdHVkZSA9IDM2LjMyMzcwMDtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdlb2xvY2F0aW9uLmRpc3RhbmNlKG9yaWdpbiwgZGVzdGluYXRpb24pKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaGlzVXNlckxvY2F0aW9uKCl7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCBtYXhpbXVtQWdlOiA1MDAwLCB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRBbGxNYXJrZXJzKCl7XHJcbiAgICAvLyAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAvLyAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXREaXN0YW5jZShvcmlnaW5zOiBNYXJrZXIsIGRlc3RpbmF0aW9uczogQXJyYXk8TWFya2VyPil7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9ucy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlVVJMID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlzdGFuY2VtYXRyaXgvanNvbj91bml0cz1tZXRyaWMmbW9kZT10cmFuc2l0Jm9yaWdpbnM9XCIrb3JpZ2lucy5wb3NpdGlvbi5sYXRpdHVkZStcIixcIitvcmlnaW5zLnBvc2l0aW9uLmxvbmdpdHVkZStcIiZkZXN0aW5hdGlvbnM9XCI7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkZXN0aW5hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sYXRpdHVkZStcIiUyQ1wiO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBkZXN0aW5hdGlvbnNbaV0ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBpZihpIT1kZXN0aW5hdGlvbnMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gXCIlN0NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCI7XHJcbiAgICAgICAgZmV0Y2goZGlzdGFuY2VVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VzUmVzdWx0ID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlcmluZyBhIG1hcmtlciB3aXRoIGRpc3RhbmNlIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEaXN0YW5jZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZW5uZWFncmFtIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlVc2VyRW5uZWFncmFtKFwibG93XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdGaWx0ZXJlZE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeURpc3RhbmNlKHNlYXJjaFJhZGlvdXM6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmRpc3RhbmNlc1Jlc3VsdD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaXN0YW5jZXNSZXN1bHQucm93c1swXS5lbGVtZW50cztcclxuICAgICAgICB0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnRzW2ldLmRpc3RhbmNlLnZhbHVlPD1zZWFyY2hSYWRpb3VzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5VXNlckVubmVhZ3JhbShmaWx0ZXJMZXZlbDogc3RyaW5nLCB1c2VyczogYW55KTogQXJyYXk8Ym9vbGVhbj57XHJcbiAgICAgICAgdmFyIGVubmVhZ3JhbUZpbHRlcjogQXJyYXk8Ym9vbGVhbj4gPSBuZXcgQXJyYXk8Ym9vbGVhbj4oKTtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIuZW5uZWFncmFtLnN0YXRlO1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXJzKXtcclxuICAgICAgICAgICAgdmFyIHRoaXNmcmllbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbU51bSA9IHVzZXJzW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbVN0YXRlID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzZnJpZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwiaGlnaFwiIHx8IGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtLnB1c2godHJ1ZSk7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIiAmJiAoZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCBmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXNmcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlci5jb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbm5lYWdyYW1GaWx0ZXIucHVzaCh0aGlzZnJpZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVubmVhZ3JhbUZpbHRlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhd0ZpbHRlcmVkTWFya2VyKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2VbaV0gJiYgdGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtW2ldKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vTWFwIGV2ZW50c1xyXG4gICAgb25NYXBSZWFkeShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9nTWFwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi50aXRsZSA9IFwiTWVcIjtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hNYXBcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uID0gbmV3IE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnRpdGxlID0gXCJNZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnNuaXBwZXQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwicmVzdWx0XCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlcik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGFsbCBtYXJrZXJzLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQWxsTWFya2VycygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBkaXN0YW5jZSBmcm9tIG9yaWdpbiB0byBkZXN0aW5hdGlvbnMgLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RGlzdGFuY2UodGhpcy5mcmllbmRMaXN0U2VydmljZS50aGlzVXNlci5pbmRleC5tYXJrZXIsIHRoaXMubWFya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gYXJncy5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJzZWFyY2hcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBhcmdzLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxyXG4gICAgICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcclxuICAgICAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcclxuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFNb3ZlKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBtb3Zpbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpKTtcclxuICAgIH1cclxufVxyXG4iXX0=