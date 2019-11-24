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
        console.log("Adding all markers...");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnb29nbGUtbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRztBQUNwRywwRUFBc0U7QUFDdEUsNkVBQXlFO0FBQ3pFLGdFQUE4RDtBQUM5RCxpRkFBK0U7QUFDL0UsMkVBQXlFO0FBQ3pFLHNEQUF3RDtBQUN4RCxrQ0FBb0M7QUFDcEMsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFpQjFDO0lBd0JJLDRCQUNZLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxhQUE0QjtRQUY1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXhCOUIsZUFBVSxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUMzRCxhQUFRLEdBQUksU0FBUyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFDdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUkzQix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFRVCxzQkFBc0I7UUFDdEIsNERBQTREO1FBQzVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJ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QVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCw0Q0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLElBQUk7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQXhIUTtRQUFSLFlBQUssRUFBRTs7dURBQWdCO0lBQ0Y7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsc0NBQU87dURBQUM7SUFDN0I7UUFBVCxhQUFNLEVBQUU7a0NBQWEsbUJBQVk7MERBQWdDO0lBSHpELGtCQUFrQjtRQWY5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLGt4QkFXVDtTQUNKLENBQUM7eUNBMEIrQixrQ0FBZTtZQUNiLHNDQUFpQjtZQUNyQiw4QkFBYTtPQTNCL0Isa0JBQWtCLENBMEg5QjtJQUFELHlCQUFDO0NBQUEsQUExSEQsSUEwSEM7QUExSFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVwbG9hZHBvc3RTZXJ2aWNlIH0gZnJvbSBcIn4vcGFnZXMvaG9tZS91cGxvYWRwb3N0L3VwbG9hZHBvc3Qtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIn4vcGFnZXMvaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgZ2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xyXG5yZWdpc3RlckVsZW1lbnQoJ01hcFZpZXcnLCAoKSA9PiBNYXBWaWV3KTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdHb29nbGVNYXAnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxHcmlkTGF5b3V0PlxyXG4gICAgPE1hcFZpZXcgI21hcFZpZXcgW21hcFR5cGVdPVwibWFwVHlwZVwiIFtsYXRpdHVkZV09XCJsYXRpdHVkZVwiIFtsb25naXR1ZGVdPVwibG9uZ2l0dWRlXCJcclxuICAgICAgICAgICAgIFt6b29tXT1cInpvb21cIiBbbWluWm9vbV09XCJtaW5ab29tXCIgW21heFpvb21dPVwibWF4Wm9vbVwiIFtiZWFyaW5nXT1cImJlYXJpbmdcIlxyXG4gICAgICAgICAgICAgW3RpbHRdPVwidGlsdFwiIGktcGFkZGluZz1cIjUwLDUwLDUwLDUwXCIgW3BhZGRpbmddPVwicGFkZGluZ1wiIChtYXBSZWFkeSk9XCJvbk1hcFJlYWR5KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlclNlbGVjdCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAobWFya2VyQmVnaW5EcmFnZ2luZyk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgKG1hcmtlckVuZERyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJEcmFnKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VySW5mb1dpbmRvd1RhcHBlZCk9XCJvbk1hcmtlckV2ZW50KCRldmVudClcIiAoY29vcmRpbmF0ZVRhcHBlZCk9XCJvbkNvb3JkaW5hdGVUYXBwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhQ2hhbmdlZCk9XCJvbkNhbWVyYUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAoY2FtZXJhTW92ZSk9XCJvbkNhbWVyYU1vdmUoJGV2ZW50KVwiPjwvTWFwVmlldz5cclxuICAgIDwvR3JpZExheW91dD5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBtYXBUeXBlOnN0cmluZztcclxuICAgIEBWaWV3Q2hpbGQoXCJtYXBWaWV3XCIpIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgICBAT3V0cHV0KCkgbWFya2VyRHJhZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIHB1YmxpYyBsYXRpdHVkZSA9ICAzNy4zMjM5NzI7XHJcbiAgICBwdWJsaWMgbG9uZ2l0dWRlID0gMTI3LjEyNTEwOTtcclxuICAgIHB1YmxpYyBzcGVlZCA9IDA7XHJcbiAgICBwdWJsaWMgYWRkciA9IFwiXCI7XHJcbiAgICB6b29tID0gMTU7XHJcbiAgICBtaW5ab29tID0gMDtcclxuICAgIG1heFpvb20gPSAyMjtcclxuICAgIGJlYXJpbmcgPSAwO1xyXG4gICAgdGlsdCA9IDA7XHJcbiAgICBwYWRkaW5nID0gWzQwLCA0MCwgNDAsIDQwXTtcclxuICAgIFxyXG5cclxuICAgIGRpc3RhbmNlc1Jlc3VsdDtcclxuICAgIGZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgZmlsdGVyZWRCeUVubmVhZ3JhbSA9IFtdO1xyXG5cclxuICAgIGxhc3RDYW1lcmE6IFN0cmluZztcclxuICAgIG1hcmtlcnMgPSBbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVwbG9hZHBvc3RTZXJ2aWNlOiBVcGxvYWRwb3N0U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXHJcbiAgICApIHtcclxuICAgICAgICAvLyB0aGlzLmdldERpc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVUaGlzVXNlckxvY2F0aW9uLmJpbmQodGhpcyksNTAwMCk7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZVRlc3QoKTtcclxuICAgIH1cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBkaXN0YW5jZVRlc3QoKXtcclxuICAgICAgICB2YXIgb3JpZ2luID0gbmV3IGdlb2xvY2F0aW9uLkxvY2F0aW9uKCk7XHJcbiAgICAgICAgb3JpZ2luLmxhdGl0dWRlID0gMzcuMzIzOTcyO1xyXG4gICAgICAgIG9yaWdpbi5sb25naXR1ZGUgPSAxMjcuMTI1MTA5O1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IG5ldyBnZW9sb2NhdGlvbi5Mb2NhdGlvbigpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uLmxhdGl0dWRlID0gMzYuMzIzNzAwO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uLmxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2VvbG9jYXRpb24uZGlzdGFuY2Uob3JpZ2luLCBkZXN0aW5hdGlvbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKXtcclxuICAgICAgICBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsIG1heGltdW1BZ2U6IDUwMDAsIHRpbWVvdXQ6IDIwMDAwIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcclxuICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZEFsbE1hcmtlcnMoKXtcclxuICAgIC8vICAgICB0aGlzLm1hcmtlcnMgPSBbXTtcclxuICAgIC8vICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kcy5sZW5ndGg7aSsrKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2godGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vTWFwIGV2ZW50c1xyXG4gICAgb25NYXBSZWFkeShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9nTWFwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24gPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbi50aXRsZSA9IFwiTWVcIjtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24uc25pcHBldCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hNYXBcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uID0gbmV3IE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnRpdGxlID0gXCJNZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnNuaXBwZXQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLnNlYXJjaFNlcnZpY2UucG9zdExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwicmVzdWx0XCIpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGFsbCBtYXJrZXJzLi4uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGRpc3RhbmNlIGZyb20gb3JpZ2luIHRvIGRlc3RpbmF0aW9ucyAuLi5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSh0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlciwgdGhpcy5tYXJrZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xyXG4gICAgICAgIGlmKHRoaXMubWFwVHlwZT09PVwiYmxvZ1wiKXtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24gPSBhcmdzLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1hcFR5cGU9PT1cInNlYXJjaFwiKXtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbiA9IGFyZ3MucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5tYXJrZXJEcmFnLmVtaXQoYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXIgRXZlbnQ6ICdcIiArIGFyZ3MuZXZlbnROYW1lXHJcbiAgICAgICAgICAgICsgXCInIHRyaWdnZXJlZCBvbjogXCIgKyBhcmdzLm1hcmtlci50aXRsZVxyXG4gICAgICAgICAgICArIFwiLCBMYXQ6IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbWVyYU1vdmUoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIG1vdmluZzogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkpO1xyXG4gICAgfVxyXG59Il19