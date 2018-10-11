"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friend_list_service_1 = require("../../friendchat/friend-list.service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var MapExampleComponent = /** @class */ (function () {
    function MapExampleComponent(friendListService) {
        this.friendListService = friendListService;
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
        setInterval(this.updateThisUserLocation.bind(this), 5000);
    }
    MapExampleComponent.prototype.updateThisUserLocation = function () {
        var _this = this;
        geolocation.getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then(function (res) {
            _this.latitude = res.latitude;
            _this.longitude = res.longitude;
            _this.speed = res.speed;
            // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
            fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + res.latitude + "," + res.longitude + "&key=AIzaSyDs-iKjb9fpImfEmGsEzF2ro60m0gNfxJY")
                .then(function (response) { return response.json(); }).then(function (r) {
                // console.log(r);
                if (r.results[0]) {
                    _this.addr = r.results[0].formatted_address;
                }
            });
        });
    };
    MapExampleComponent.prototype.addAllMarkers = function () {
        this.markers = [];
        for (var i = 0; i < this.friendListService.friends.length; i++) {
            this.markers.push(this.friendListService.friends[i].marker);
        }
    };
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
            _this.filterByUserEnneagram("low");
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
    MapExampleComponent.prototype.filterByUserEnneagram = function (filterLevel) {
        var thisUserEnneagramNum = this.friendListService.thisUser.index.enneagramNumber;
        var thisUserEnneagramState = this.friendListService.thisUser.index.enneagramState;
        for (var i = 0; i < this.friendListService.friends.length; i++) {
            var thisfriend = false;
            var friendEnneagramNum = this.friendListService.friends[i].enneagramNumber;
            var friendEnneagramState = this.friendListService.friends[i].enneagramState;
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
                    this.friendListService.friends[i].marker.color = "green";
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
            this.filteredByEnneagram.push(thisfriend);
        }
    };
    MapExampleComponent.prototype.drawFilteredMarker = function () {
        for (var i = 0; i < this.filteredByDistance.length; i++) {
            if (this.filteredByDistance[i] && this.filteredByEnneagram[i]) {
                this.mapView.addMarker(this.friendListService.friends[i].marker);
            }
        }
    };
    //Map events
    MapExampleComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        this.mapView = event.object;
        this.mapView.addMarker(this.friendListService.thisUser.index.marker);
        console.log("Adding all markers...");
        this.addAllMarkers();
        console.log("Get distance from origin to destinations ...");
        this.getDistance(this.friendListService.thisUser.index.marker, this.markers);
    };
    MapExampleComponent.prototype.onCoordinateTapped = function (args) {
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
    MapExampleComponent = __decorate([
        core_1.Component({
            selector: 'MapExample',
            template: "\n    <GridLayout>\n    <MapView #mapView [latitude]=\"latitude\" [longitude]=\"longitude\"\n             [zoom]=\"zoom\" [minZoom]=\"minZoom\" [maxZoom]=\"maxZoom\" [bearing]=\"bearing\"\n             [tilt]=\"tilt\" i-padding=\"50,50,50,50\" [padding]=\"padding\" (mapReady)=\"onMapReady($event)\"\n             (markerSelect)=\"onMarkerEvent($event)\" (markerBeginDragging)=\"onMarkerEvent($event)\"\n             (markerEndDragging)=\"onMarkerEvent($event)\" (markerDrag)=\"onMarkerEvent($event)\"\n             (markerInfoWindowTapped)=\"onMarkerEvent($event)\" (coordinateTapped)=\"onCoordinateTapped($event)\"\n             (cameraChanged)=\"onCameraChanged($event)\"\n             (cameraMove)=\"onCameraMove($event)\"></MapView>\n    </GridLayout>\n    "
        }),
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStEO0FBQy9ELDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLHNEQUF3RDtBQUN4RCxrQ0FBb0M7QUFDcEMsa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFpQjFDO0lBb0JJLDZCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQW5CakQsYUFBUSxHQUFJLFNBQVMsQ0FBQztRQUN0QixjQUFTLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFJM0IsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUd6QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBR1Qsc0JBQXNCO1FBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxvREFBc0IsR0FBdEI7UUFBQSxpQkFlQztRQWRHLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLGVBQWUsRUFBRSxnQkFBUSxDQUFDLElBQUksRUFBRSxVQUFV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QyxJQUFJLENBQUMsQ0FBQztvQkFBQSxDQUFDO29CQUM5RixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJ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QkFBQSxDQUFDO29CQUM1RSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQUEsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFBQSxDQUFDO29CQUNqRixJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLGtCQUFrQixJQUFJLENB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RUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLElBQUk7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQTdNUSxtQkFBbUI7UUFmL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSw0dkJBV1Q7U0FDSixDQUFDO3lDQXFCeUMsdUNBQWlCO09BcEIvQyxtQkFBbUIsQ0E4TS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlNRCxJQThNQztBQTlNWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHsgRnJpZW5kTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ01hcEV4YW1wbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxHcmlkTGF5b3V0PlxyXG4gICAgPE1hcFZpZXcgI21hcFZpZXcgW2xhdGl0dWRlXT1cImxhdGl0dWRlXCIgW2xvbmdpdHVkZV09XCJsb25naXR1ZGVcIlxyXG4gICAgICAgICAgICAgW3pvb21dPVwiem9vbVwiIFttaW5ab29tXT1cIm1pblpvb21cIiBbbWF4Wm9vbV09XCJtYXhab29tXCIgW2JlYXJpbmddPVwiYmVhcmluZ1wiXHJcbiAgICAgICAgICAgICBbdGlsdF09XCJ0aWx0XCIgaS1wYWRkaW5nPVwiNTAsNTAsNTAsNTBcIiBbcGFkZGluZ109XCJwYWRkaW5nXCIgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyU2VsZWN0KT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJCZWdpbkRyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyRW5kRHJhZ2dpbmcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKG1hcmtlckRyYWcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJJbmZvV2luZG93VGFwcGVkKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChjb29yZGluYXRlVGFwcGVkKT1cIm9uQ29vcmRpbmF0ZVRhcHBlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFDaGFuZ2VkKT1cIm9uQ2FtZXJhQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFNb3ZlKT1cIm9uQ2FtZXJhTW92ZSgkZXZlbnQpXCI+PC9NYXBWaWV3PlxyXG4gICAgPC9HcmlkTGF5b3V0PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwRXhhbXBsZUNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgbGF0aXR1ZGUgPSAgMzcuMzIzOTcyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICBwdWJsaWMgc3BlZWQgPSAwO1xyXG4gICAgcHVibGljIGFkZHIgPSBcIlwiO1xyXG4gICAgem9vbSA9IDE1O1xyXG4gICAgbWluWm9vbSA9IDA7XHJcbiAgICBtYXhab29tID0gMjI7XHJcbiAgICBiZWFyaW5nID0gMDtcclxuICAgIHRpbHQgPSAwO1xyXG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbiAgICBtYXBWaWV3OiBNYXBWaWV3O1xyXG5cclxuICAgIGRpc3RhbmNlc1Jlc3VsdDtcclxuICAgIGZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgZmlsdGVyZWRCeUVubmVhZ3JhbSA9IFtdO1xyXG5cclxuICAgIGxhc3RDYW1lcmE6IFN0cmluZztcclxuICAgIG1hcmtlcnMgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZExpc3RTZXJ2aWNlIDpGcmllbmRMaXN0U2VydmljZSkge1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0RGlzdGFuY2UoKTtcclxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVRoaXNVc2VyTG9jYXRpb24uYmluZCh0aGlzKSw1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaGlzVXNlckxvY2F0aW9uKCl7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLCBtYXhpbXVtQWdlOiA1MDAwLCB0aW1lb3V0OiAyMDAwMCB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHJlcy5zcGVlZDtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhZGRyZXNzIChSRVFVSVJFUyBZT1VSIE9XTiBHT09HTEUgTUFQIEFQSSBLRVkhKVxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPVwiICsgcmVzLmxhdGl0dWRlICsgXCIsXCIgKyByZXMubG9uZ2l0dWRlICsgXCIma2V5PUFJemFTeURzLWlLamI5ZnBJbWZFbUdzRXpGMnJvNjBtMGdOZnhKWVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5yZXN1bHRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkciA9IHIucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRBbGxNYXJrZXJzKCl7XHJcbiAgICAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREaXN0YW5jZShvcmlnaW5zOiBNYXJrZXIsIGRlc3RpbmF0aW9uczogQXJyYXk8TWFya2VyPil7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9ucy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlVVJMID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlzdGFuY2VtYXRyaXgvanNvbj91bml0cz1tZXRyaWMmbW9kZT10cmFuc2l0Jm9yaWdpbnM9XCIrb3JpZ2lucy5wb3NpdGlvbi5sYXRpdHVkZStcIixcIitvcmlnaW5zLnBvc2l0aW9uLmxvbmdpdHVkZStcIiZkZXN0aW5hdGlvbnM9XCI7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkZXN0aW5hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sYXRpdHVkZStcIiUyQ1wiO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBkZXN0aW5hdGlvbnNbaV0ucG9zaXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICBpZihpIT1kZXN0aW5hdGlvbnMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gXCIlN0NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCI7XHJcbiAgICAgICAgZmV0Y2goZGlzdGFuY2VVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VzUmVzdWx0ID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlcmluZyBhIG1hcmtlciB3aXRoIGRpc3RhbmNlIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEaXN0YW5jZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZW5uZWFncmFtIC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlVc2VyRW5uZWFncmFtKFwibG93XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdGaWx0ZXJlZE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeURpc3RhbmNlKHNlYXJjaFJhZGlvdXM6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmRpc3RhbmNlc1Jlc3VsdD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaXN0YW5jZXNSZXN1bHQucm93c1swXS5lbGVtZW50cztcclxuICAgICAgICB0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnRzW2ldLmRpc3RhbmNlLnZhbHVlPD1zZWFyY2hSYWRpb3VzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5VXNlckVubmVhZ3JhbShmaWx0ZXJMZXZlbDogc3RyaW5nKXtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4LmVubmVhZ3JhbU51bWJlcjtcclxuICAgICAgICB2YXIgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZSA9IHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXguZW5uZWFncmFtU3RhdGU7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHZhciB0aGlzZnJpZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBmcmllbmRFbm5lYWdyYW1OdW0gPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0uZW5uZWFncmFtTnVtYmVyO1xyXG4gICAgICAgICAgICB2YXIgZnJpZW5kRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0uZW5uZWFncmFtU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzZnJpZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwiaGlnaFwiIHx8IGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpcy5maWx0ZXJlZEJ5RW5uZWFncmFtLnB1c2godHJ1ZSk7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJiYWRcIiAmJiAoZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCBmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpbHRlckxldmVsID09PSBcImxvd1wiKXtcclxuICAgICAgICAgICAgICAgIGlmKCh0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgdGhpc1VzZXJFbm5lYWdyYW1TdGF0ZT09PVwiXCIpICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXNmcmllbmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlci5jb2xvciA9IFwieWVsbG93XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW0ucHVzaCh0aGlzZnJpZW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRyYXdGaWx0ZXJlZE1hcmtlcigpe1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlW2ldICYmIHRoaXMuZmlsdGVyZWRCeUVubmVhZ3JhbVtpXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL01hcCBldmVudHNcclxuICAgIG9uTWFwUmVhZHkoZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XHJcbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xyXG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIodGhpcy5mcmllbmRMaXN0U2VydmljZS50aGlzVXNlci5pbmRleC5tYXJrZXIpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBhbGwgbWFya2Vycy4uLlwiKTtcclxuICAgICAgICB0aGlzLmFkZEFsbE1hcmtlcnMoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZXQgZGlzdGFuY2UgZnJvbSBvcmlnaW4gdG8gZGVzdGluYXRpb25zIC4uLlwiKTtcclxuICAgICAgICB0aGlzLmdldERpc3RhbmNlKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXgubWFya2VyLCB0aGlzLm1hcmtlcnMpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxyXG4gICAgICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcclxuICAgICAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcclxuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFNb3ZlKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBtb3Zpbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpKTtcclxuICAgIH1cclxufVxyXG4iXX0=