"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var firebase_service_1 = require("~/services/firebase.service");
var uploadpost_service_1 = require("~/pages/home/uploadpost/uploadpost-service");
var search_service_1 = require("~/pages/home/searchoption/search-service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent(firebaseService, uploadpostService, searchService) {
        this.firebaseService = firebaseService;
        this.uploadpostService = uploadpostService;
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
    GoogleMapComponent.prototype.ngOnInit = function () {
    };
    GoogleMapComponent.prototype.distanceTest = function () {
        var origin = new geolocation.Location();
        origin.latitude = 37.323972;
        origin.longitude = 127.125109;
        var destination = new geolocation.Location();
        destination.latitude = 36.323700;
        destination.longitude = 127.125109;
        console.log(geolocation.distance(origin, destination));
    };
    GoogleMapComponent.prototype.updateThisUserLocation = function () {
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
    GoogleMapComponent.prototype.getDistance = function (origins, destinations) {
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
    GoogleMapComponent.prototype.filterByDistance = function (searchRadious) {
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
    GoogleMapComponent.prototype.filterByUserEnneagram = function (filterLevel, users) {
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
    GoogleMapComponent.prototype.drawFilteredMarker = function () {
        for (var i = 0; i < this.filteredByDistance.length; i++) {
            if (this.filteredByDistance[i] && this.filteredByEnneagram[i]) {
                // this.mapView.addMarker(this.friendListService.friends[i].marker);
            }
        }
    };
    //Map events
    GoogleMapComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        this.mapView = event.object;
        if (this.mapType === "blog") {
            console.log("blogMap");
            this.updateThisUserLocation();
            this.uploadpostService.postLocation = new nativescript_google_maps_sdk_1.Marker();
            this.uploadpostService.postLocation.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(this.latitude, this.longitude);
            this.uploadpostService.postLocation.title = "Me";
            this.uploadpostService.postLocation.snippet = "";
            this.uploadpostService.postLocation.userData = null;
            this.mapView.addMarker(this.uploadpostService.postLocation);
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
    GoogleMapComponent.prototype.onCoordinateTapped = function (args) {
        if (this.mapType === "blog") {
            this.uploadpostService.postLocation.position = args.position;
        }
        if (this.mapType === "search") {
            this.searchService.postLocation.position = args.position;
        }
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    GoogleMapComponent.prototype.onMarkerEvent = function (args) {
        this.markerDrag.emit(args);
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    };
    GoogleMapComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    GoogleMapComponent.prototype.onCameraMove = function (args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GoogleMapComponent.prototype, "mapType", void 0);
    __decorate([
        core_1.ViewChild("mapView"),
        __metadata("design:type", nativescript_google_maps_sdk_1.MapView)
    ], GoogleMapComponent.prototype, "mapView", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GoogleMapComponent.prototype, "markerDrag", void 0);
    GoogleMapComponent = __decorate([
        core_1.Component({
            selector: 'GoogleMap',
            template: "\n    <GridLayout>\n    <MapView #mapView [mapType]=\"mapType\" [latitude]=\"latitude\" [longitude]=\"longitude\"\n             [zoom]=\"zoom\" [minZoom]=\"minZoom\" [maxZoom]=\"maxZoom\" [bearing]=\"bearing\"\n             [tilt]=\"tilt\" i-padding=\"50,50,50,50\" [padding]=\"padding\" (mapReady)=\"onMapReady($event)\"\n             (markerSelect)=\"onMarkerEvent($event)\" (markerBeginDragging)=\"onMarkerEvent($event)\"\n             (markerEndDragging)=\"onMarkerEvent($event)\" (markerDrag)=\"onMarkerEvent($event)\"\n             (markerInfoWindowTapped)=\"onMarkerEvent($event)\" (coordinateTapped)=\"onCoordinateTapped($event)\"\n             (cameraChanged)=\"onCameraChanged($event)\"\n             (cameraMove)=\"onCameraMove($event)\"></MapView>\n    </GridLayout>\n    "
        }),
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
            uploadpost_service_1.UploadpostService,
            search_service_1.SearchService])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnb29nbGUtbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRztBQUNwRywwRUFBc0U7QUFDdEUsNkVBQXlFO0FBQ3pFLGdFQUE4RDtBQUM5RCxpRkFBK0U7QUFDL0UsMkVBQXlFO0FBQ3pFLHNEQUF3RDtBQUN4RCxrQ0FBb0M7QUFDcEMsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFpQjFDO0lBd0JJLDRCQUNZLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxhQUE0QjtRQUY1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXhCOUIsZUFBVSxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUMzRCxhQUFRLEdBQUksU0FBUyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFDdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUkzQix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFRVCxzQkFBc0I7UUFDdEIsNERBQTREO1FBQzVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJ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Q0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHlDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUEzUFE7UUFBUixZQUFLLEVBQUU7O3VEQUFnQjtJQUNGO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLHNDQUFPO3VEQUFDO0lBQzdCO1FBQVQsYUFBTSxFQUFFO2tDQUFhLG1CQUFZOzBEQUFnQztJQUh6RCxrQkFBa0I7UUFmOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxreEJBV1Q7U0FDSixDQUFDO3lDQTBCK0Isa0NBQWU7WUFDYixzQ0FBaUI7WUFDckIsOEJBQWE7T0EzQi9CLGtCQUFrQixDQTZQOUI7SUFBRCx5QkFBQztDQUFBLEFBN1BELElBNlBDO0FBN1BZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVcGxvYWRwb3N0U2VydmljZSB9IGZyb20gXCJ+L3BhZ2VzL2hvbWUvdXBsb2FkcG9zdC91cGxvYWRwb3N0LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCJ+L3BhZ2VzL2hvbWUvc2VhcmNob3B0aW9uL3NlYXJjaC1zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHsgQWNjdXJhY3kgfSBmcm9tIFwidWkvZW51bXNcIjtcclxucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnR29vZ2xlTWFwJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8R3JpZExheW91dD5cclxuICAgIDxNYXBWaWV3ICNtYXBWaWV3IFttYXBUeXBlXT1cIm1hcFR5cGVcIiBbbGF0aXR1ZGVdPVwibGF0aXR1ZGVcIiBbbG9uZ2l0dWRlXT1cImxvbmdpdHVkZVwiXHJcbiAgICAgICAgICAgICBbem9vbV09XCJ6b29tXCIgW21pblpvb21dPVwibWluWm9vbVwiIFttYXhab29tXT1cIm1heFpvb21cIiBbYmVhcmluZ109XCJiZWFyaW5nXCJcclxuICAgICAgICAgICAgIFt0aWx0XT1cInRpbHRcIiBpLXBhZGRpbmc9XCI1MCw1MCw1MCw1MFwiIFtwYWRkaW5nXT1cInBhZGRpbmdcIiAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJTZWxlY3QpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKG1hcmtlckJlZ2luRHJhZ2dpbmcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJFbmREcmFnZ2luZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAobWFya2VyRHJhZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlckluZm9XaW5kb3dUYXBwZWQpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKGNvb3JkaW5hdGVUYXBwZWQpPVwib25Db29yZGluYXRlVGFwcGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAgKGNhbWVyYUNoYW5nZWQpPVwib25DYW1lcmFDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICAgICAgICAgKGNhbWVyYU1vdmUpPVwib25DYW1lcmFNb3ZlKCRldmVudClcIj48L01hcFZpZXc+XHJcbiAgICA8L0dyaWRMYXlvdXQ+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgbWFwVHlwZTpzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKFwibWFwVmlld1wiKSBtYXBWaWV3OiBNYXBWaWV3O1xyXG4gICAgQE91dHB1dCgpIG1hcmtlckRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBwdWJsaWMgbGF0aXR1ZGUgPSAgMzcuMzIzOTcyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICBwdWJsaWMgc3BlZWQgPSAwO1xyXG4gICAgcHVibGljIGFkZHIgPSBcIlwiO1xyXG4gICAgem9vbSA9IDE1O1xyXG4gICAgbWluWm9vbSA9IDA7XHJcbiAgICBtYXhab29tID0gMjI7XHJcbiAgICBiZWFyaW5nID0gMDtcclxuICAgIHRpbHQgPSAwO1xyXG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbiAgICBcclxuXHJcbiAgICBkaXN0YW5jZXNSZXN1bHQ7XHJcbiAgICBmaWx0ZXJlZEJ5RGlzdGFuY2UgPSBbXTtcclxuICAgIGZpbHRlcmVkQnlFbm5lYWdyYW0gPSBbXTtcclxuXHJcbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XHJcbiAgICBtYXJrZXJzID0gW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1cGxvYWRwb3N0U2VydmljZTogVXBsb2FkcG9zdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbi5iaW5kKHRoaXMpLDUwMDApO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VUZXN0KCk7XHJcbiAgICB9XHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzdGFuY2VUZXN0KCl7XHJcbiAgICAgICAgdmFyIG9yaWdpbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIG9yaWdpbi5sYXRpdHVkZSA9IDM3LjMyMzk3MjtcclxuICAgICAgICBvcmlnaW4ubG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBuZXcgZ2VvbG9jYXRpb24uTG9jYXRpb24oKTtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sYXRpdHVkZSA9IDM2LjMyMzcwMDtcclxuICAgICAgICBkZXN0aW5hdGlvbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdlb2xvY2F0aW9uLmRpc3RhbmNlKG9yaWdpbiwgZGVzdGluYXRpb24pKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaGlzVXNlckxvY2F0aW9uKCl7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCBtYXhpbXVtQWdlOiA1MDAwLCB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRBbGxNYXJrZXJzKCl7XHJcbiAgICAvLyAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAvLyAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXREaXN0YW5jZShvcmlnaW5zOiBNYXJrZXIsIGRlc3RpbmF0aW9uczogQXJyYXk8TWFya2VyPil7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9ucy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlVVJMID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlzdGFuY2VtYXRyaXgvanNvbj91bml0cz1tZXRyaWMmbW9kZT10cmFuc2l0Jm9yaWdpbnM9XCIrb3JpZ2lucy5wb3NpdGlvbi5sYXRpdHVkZStcIixcIitvcmlnaW5zLnBvc2l0aW9uLmxvbmdpdHVkZStcIiZkZXN0aW5hdGlvbnM9XCI7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkZXN0aW5hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sYXRpdHVkZStcIiUyQ1wiO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBkZXN0aW5hdGlvbnNbaV0ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBpZihpIT1kZXN0aW5hdGlvbnMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gXCIlN0NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCI7XHJcbiAgICAgICAgZmV0Y2goZGlzdGFuY2VVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VzUmVzdWx0ID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlcmluZyBhIG1hcmtlciB3aXRoIGRpc3RhbmNlIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEaXN0YW5jZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZW5uZWFncmFtIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlVc2VyRW5uZWFncmFtKFwibG93XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdGaWx0ZXJlZE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeURpc3RhbmNlKHNlYXJjaFJhZGlvdXM6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmRpc3RhbmNlc1Jlc3VsdD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaXN0YW5jZXNSZXN1bHQucm93c1swXS5lbGVtZW50cztcclxuICAgICAgICB0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnRzW2ldLmRpc3RhbmNlLnZhbHVlPD1zZWFyY2hSYWRpb3VzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5VXNlckVubmVhZ3JhbShmaWx0ZXJMZXZlbDogc3RyaW5nLCB1c2VyczogYW55KTogQXJyYXk8Ym9vbGVhbj57XHJcbiAgICAgICAgdmFyIGVubmVhZ3JhbUZpbHRlcjogQXJyYXk8Ym9vbGVhbj4gPSBuZXcgQXJyYXk8Ym9vbGVhbj4oKTtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIuZW5uZWFncmFtLnN0YXRlO1xyXG4gICAgICAgIGZvcih2YXIgdWlkIGluIHVzZXJzKXtcclxuICAgICAgICAgICAgdmFyIHRoaXNmcmllbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbU51bSA9IHVzZXJzW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgICAgICAgdmFyIGZyaWVuZEVubmVhZ3JhbVN0YXRlID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzZnJpZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwiaGlnaFwiIHx8IGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtLnB1c2godHJ1ZSk7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIiAmJiAoZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCBmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXNmcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlci5jb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbm5lYWdyYW1GaWx0ZXIucHVzaCh0aGlzZnJpZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVubmVhZ3JhbUZpbHRlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhd0ZpbHRlcmVkTWFya2VyKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2VbaV0gJiYgdGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtW2ldKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vTWFwIGV2ZW50c1xyXG4gICAgb25NYXBSZWFkeShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9nTWFwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbi50aXRsZSA9IFwiTWVcIjtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hNYXBcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uID0gbmV3IE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnRpdGxlID0gXCJNZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnNuaXBwZXQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwicmVzdWx0XCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlcik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGFsbCBtYXJrZXJzLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQWxsTWFya2VycygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBkaXN0YW5jZSBmcm9tIG9yaWdpbiB0byBkZXN0aW5hdGlvbnMgLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RGlzdGFuY2UodGhpcy5mcmllbmRMaXN0U2VydmljZS50aGlzVXNlci5pbmRleC5tYXJrZXIsIHRoaXMubWFya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cImJsb2dcIil7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gYXJncy5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tYXBUeXBlPT09XCJzZWFyY2hcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBhcmdzLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xyXG4gICAgICAgIHRoaXMubWFya2VyRHJhZy5lbWl0KGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxyXG4gICAgICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcclxuICAgICAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcclxuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFNb3ZlKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBtb3Zpbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpKTtcclxuICAgIH1cclxufVxyXG4iXX0=