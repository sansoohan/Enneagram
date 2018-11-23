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
        this.markerDrag = new core_1.EventEmitter();
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
        this.markerDrag.emit(args);
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MapExampleComponent.prototype, "markerDrag", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9HO0FBQ3BHLDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsdUVBQXFFO0FBQ3JFLHdEQUFzRDtBQUN0RCxvRUFBa0U7QUFDbEUsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQWlCMUM7SUF3QkksNkJBQ1ksZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsYUFBNEI7UUFGNUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBeEI5QixlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBTyxDQUFDO1FBQzNELGFBQVEsR0FBSSxTQUFTLENBQUM7UUFDdEIsY0FBUyxHQUFHLFVBQVUsQ0FBQztRQUN2QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFlBQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSTNCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFHekIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQVFULHNCQUFzQjtRQUN0Qiw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hC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QUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO2dCQUNyRixDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxzQkFBc0IsS0FBRyxLQUFLLElBQUksQ0FBQyxvQkFBb0IsS0FBRyxNQUFNLElBQUksb0JBQW9CLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwRyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQzVFLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7Z0JBQ3JGLENBQUM7Z0JBQ0QsRUFBRSxDQUFBLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ25CLDREQUE0RDtnQkFDaEUsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDdEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxzQkFBc0IsS0FBRyxNQUFNLElBQUksc0JBQXNCLEtBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBRyxNQUFNLElBQUksb0JBQW9CLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNqSSxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQzVFLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFD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LENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUEzUFE7UUFBUixZQUFLLEVBQUU7O3dEQUFnQjtJQUNGO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLHNDQUFPO3dEQUFDO0lBQzdCO1FBQVQsYUFBTSxFQUFFO2tDQUFhLG1CQUFZOzJEQUFnQztJQUh6RCxtQkFBbUI7UUFmL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxreEJBV1Q7U0FDSixDQUFDO3lDQTBCK0Isa0NBQWU7WUFDbkIsMEJBQVc7WUFDVCw4QkFBYTtPQTNCL0IsbUJBQW1CLENBNlAvQjtJQUFELDBCQUFDO0NBQUEsQUE3UEQsSUE2UEM7QUE3UFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuLi8uLi9ibG9nL2Jsb2ctc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ01hcEV4YW1wbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxHcmlkTGF5b3V0PlxyXG4gICAgPE1hcFZpZXcgI21hcFZpZXcgW21hcFR5cGVdPVwibWFwVHlwZVwiIFtsYXRpdHVkZV09XCJsYXRpdHVkZVwiIFtsb25naXR1ZGVdPVwibG9uZ2l0dWRlXCJcclxuICAgICAgICAgICAgIFt6b29tXT1cInpvb21cIiBbbWluWm9vbV09XCJtaW5ab29tXCIgW21heFpvb21dPVwibWF4Wm9vbVwiIFtiZWFyaW5nXT1cImJlYXJpbmdcIlxyXG4gICAgICAgICAgICAgW3RpbHRdPVwidGlsdFwiIGktcGFkZGluZz1cIjUwLDUwLDUwLDUwXCIgW3BhZGRpbmddPVwicGFkZGluZ1wiIChtYXBSZWFkeSk9XCJvbk1hcFJlYWR5KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlclNlbGVjdCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAobWFya2VyQmVnaW5EcmFnZ2luZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlckVuZERyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJEcmFnKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VySW5mb1dpbmRvd1RhcHBlZCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAoY29vcmRpbmF0ZVRhcHBlZCk9XCJvbkNvb3JkaW5hdGVUYXBwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhQ2hhbmdlZCk9XCJvbkNhbWVyYUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhTW92ZSk9XCJvbkNhbWVyYU1vdmUoJGV2ZW50KVwiPjwvTWFwVmlldz5cclxuICAgIDwvR3JpZExheW91dD5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcEV4YW1wbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgbWFwVHlwZTpzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKFwibWFwVmlld1wiKSBtYXBWaWV3OiBNYXBWaWV3O1xyXG4gICAgQE91dHB1dCgpIG1hcmtlckRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBwdWJsaWMgbGF0aXR1ZGUgPSAgMzcuMzIzOTcyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICBwdWJsaWMgc3BlZWQgPSAwO1xyXG4gICAgcHVibGljIGFkZHIgPSBcIlwiO1xyXG4gICAgem9vbSA9IDE1O1xyXG4gICAgbWluWm9vbSA9IDA7XHJcbiAgICBtYXhab29tID0gMjI7XHJcbiAgICBiZWFyaW5nID0gMDtcclxuICAgIHRpbHQgPSAwO1xyXG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbiAgICBcclxuXHJcbiAgICBkaXN0YW5jZXNSZXN1bHQ7XHJcbiAgICBmaWx0ZXJlZEJ5RGlzdGFuY2UgPSBbXTtcclxuICAgIGZpbHRlcmVkQnlFbm5lYWdyYW0gPSBbXTtcclxuXHJcbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XHJcbiAgICBtYXJrZXJzID0gW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBibG9nU2VydmljZTogQmxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbi5iaW5kKHRoaXMpLDUwMDApO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VUZXN0KCk7XHJcbiAgICB9XHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzdGFuY2VUZXN0KCl7XHJcbiAgICAgICAgdmFyIG9yaWdpbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIG9yaWdpbi5sYXRpdHVkZSA9IDM3LjMyMzk3MjtcclxuICAgICAgICBvcmlnaW4ubG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBuZXcgZ2VvbG9jYXRpb24uTG9jYXRpb24oKTtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sYXRpdHVkZSA9IDM2LjMyMzcwMDtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdlb2xvY2F0aW9uLmRpc3RhbmNlKG9yaWdpbiwgZGVzdGluYXRpb24pKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaGlzVXNlckxvY2F0aW9uKCl7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCBtYXhpbXVtQWdlOiA1MDAwLCB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRBbGxNYXJrZXJzKCl7XHJcbiAgICAvLyAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAvLyAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXREaXN0YW5jZShvcmlnaW5zOiBNYXJrZXIsIGRlc3RpbmF0aW9uczogQXJyYXk8TWFya2VyPil7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9ucy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlVVJMID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlzdGFuY2VtYXRyaXgvanNvbj91bml0cz1tZXRyaWMmbW9kZT10cmFuc2l0Jm9yaWdpbnM9XCIrb3JpZ2lucy5wb3NpdGlvbi5sYXRpdHVkZStcIixcIitvcmlnaW5zLnBvc2l0aW9uLmxvbmdpdHVkZStcIiZkZXN0aW5hdGlvbnM9XCI7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkZXN0aW5hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sYXRpdHVkZStcIiUyQ1wiO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBkZXN0aW5hdGlvbnNbaV0ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBpZihpIT1kZXN0aW5hdGlvbnMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gXCIlN0NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCI7XHJcbiAgICAgICAgZmV0Y2goZGlzdGFuY2VVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VzUmVzdWx0ID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlcmluZyBhIG1hcmtlciB3aXRoIGRpc3RhbmNlIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEaXN0YW5jZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZW5uZWFncmFtIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlVc2VyRW5uZWFncmFtKFwibG93XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdGaWx0ZXJlZE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeURpc3RhbmNlKHNlYXJjaFJhZGlvdXM6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmRpc3RhbmNlc1Jlc3VsdD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaXN0YW5jZXNSZXN1bHQucm93c1swXS5lbGVtZW50cztcclxuICAgICAgICB0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnRzW2ldLmRpc3RhbmNlLnZhbHVlPD1zZWFyY2hSYWRpb3VzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5VXNlckVubmVhZ3JhbShmaWx0ZXJMZXZlbDogc3RyaW5nLCB1c2VyczogYW55KTogQXJyYXk8Ym9vbGVhbj57XHJcbiAgICAgICAgdmFyIGVubmVhZ3JhbUZpbHRlcjogQXJyYXk8Ym9vbGVhbj4gPSBuZXcgQXJyYXk8Ym9vbGVhbj4oKTtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIuZW5uZWFncmFtLnN0YXRlO1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXJzKXtcclxuICAgICAgICAgICAgdmFyIHRoaXNmcmllbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbU51bSA9IHVzZXJzW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbVN0YXRlID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzZnJpZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwiaGlnaFwiIHx8IGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtLnB1c2godHJ1ZSk7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIiAmJiAoZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCBmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXNmcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlci5jb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbm5lYWdyYW1GaWx0ZXIucHVzaCh0aGlzZnJpZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVubmVhZ3JhbUZpbHRlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhd0ZpbHRlcmVkTWFya2VyKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2VbaV0gJiYgdGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtW2ldKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vTWFwIGV2ZW50c1xyXG4gICAgb25NYXBSZWFkeShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9nTWFwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi50aXRsZSA9IFwiTWVcIjtcclxuICAgICAgICAgICAgdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hNYXBcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uID0gbmV3IE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnRpdGxlID0gXCJNZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnNuaXBwZXQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwicmVzdWx0XCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlcik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGFsbCBtYXJrZXJzLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQWxsTWFya2VycygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBkaXN0YW5jZSBmcm9tIG9yaWdpbiB0byBkZXN0aW5hdGlvbnMgLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RGlzdGFuY2UodGhpcy5mcmllbmRMaXN0U2VydmljZS50aGlzVXNlci5pbmRleC5tYXJrZXIsIHRoaXMubWFya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gYXJncy5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJzZWFyY2hcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBhcmdzLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xyXG4gICAgICAgIHRoaXMubWFya2VyRHJhZy5lbWl0KGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxyXG4gICAgICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcclxuICAgICAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcclxuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFNb3ZlKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBtb3Zpbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpKTtcclxuICAgIH1cclxufVxyXG4iXX0=