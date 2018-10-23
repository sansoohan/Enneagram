"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friend_list_service_1 = require("../../friendchat/friend-list.service");
var firebase_service_1 = require("../../../services/firebase.service");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var MapExampleComponent = /** @class */ (function () {
    function MapExampleComponent(friendListService, firebaseService) {
        this.friendListService = friendListService;
        this.firebaseService = firebaseService;
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
        // this.mapView.addMarker(this.friendListService.thisUser.index.marker);
        console.log("Adding all markers...");
        // this.addAllMarkers();
        console.log("Get distance from origin to destinations ...");
        // this.getDistance(this.friendListService.thisUser.index.marker, this.markers);
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
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService,
            firebase_service_1.FirebaseService])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStEO0FBQy9ELDBFQUFzRTtBQUN0RSw2RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLHVFQUFxRTtBQUNyRSxzREFBd0Q7QUFDeEQsa0NBQW9DO0FBQ3BDLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBaUIxQztJQW9CSSw2QkFBb0IsaUJBQW9DLEVBQzVDLGVBQWdDO1FBRHhCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBcEJyQyxhQUFRLEdBQUksU0FBUyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFDdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUkzQix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJVCxzQkFBc0I7UUFDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELG9EQUFzQixHQUF0QjtRQUFBLGlCQWVDO1FBZEcsV0FBVyxDQUFD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LElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7Z0JBQ3JGLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLHNCQUFzQixLQUFHLEtBQUssSUFBSSxDQUFDLG9CQUFvQixLQUFHLE1BQU0sSUFBSSxvQkFBb0IsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3BHLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztnQkFDckYsQ0FBQztnQkFDRCxFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDbkIsNERBQTREO2dCQUNoRSxDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixFQUFFLENBQUEsQ0FBQyxDQUFDLHNCQUFzQixLQUFHLE1BQU0sSUFBSSxzQkFBc0IsS0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFHLE1BQU0sSUFBSSxvQkFBb0IsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ2pJLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUFBLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQUEsQ0FBQztnQkFDckYsQ0FBQztnQkFDRCxFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDbkIsNkRBQTZEO2dCQUNqRSxDQUFDO1lBQ0wsQ0FBQztZQUNELGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUdELGdEQUFrQixHQUFsQjtRQUNJLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUMxRCxvRUFBb0U7WUFDeEUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBR0QsWUFBWTtJQUNaLHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsd0VBQXdFO1FBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyx3QkFBd0I7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBQzVELGdGQUFnRjtJQUNwRixDQUFDO0lBRUQsZ0RBQWtCLEdBQWxCLFVBQW1CLElBQUk7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVELDJDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUztjQUN4QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Y0FDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCw2Q0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLElBQUk7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQWhOUSxtQkFBbUI7UUFmL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSw0dkJBV1Q7U0FDSixDQUFDO3lDQXFCeUMsdUNBQWlCO1lBQzNCLGtDQUFlO09BckJuQyxtQkFBbUIsQ0FpTi9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpORCxJQWlOQztBQWpOWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHsgRnJpZW5kTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ01hcEV4YW1wbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxHcmlkTGF5b3V0PlxyXG4gICAgPE1hcFZpZXcgI21hcFZpZXcgW2xhdGl0dWRlXT1cImxhdGl0dWRlXCIgW2xvbmdpdHVkZV09XCJsb25naXR1ZGVcIlxyXG4gICAgICAgICAgICAgW3pvb21dPVwiem9vbVwiIFttaW5ab29tXT1cIm1pblpvb21cIiBbbWF4Wm9vbV09XCJtYXhab29tXCIgW2JlYXJpbmddPVwiYmVhcmluZ1wiXHJcbiAgICAgICAgICAgICBbdGlsdF09XCJ0aWx0XCIgaS1wYWRkaW5nPVwiNTAsNTAsNTAsNTBcIiBbcGFkZGluZ109XCJwYWRkaW5nXCIgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyU2VsZWN0KT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChtYXJrZXJCZWdpbkRyYWdnaW5nKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAobWFya2VyRW5kRHJhZ2dpbmcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCIgKG1hcmtlckRyYWcpPVwib25NYXJrZXJFdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChtYXJrZXJJbmZvV2luZG93VGFwcGVkKT1cIm9uTWFya2VyRXZlbnQoJGV2ZW50KVwiIChjb29yZGluYXRlVGFwcGVkKT1cIm9uQ29vcmRpbmF0ZVRhcHBlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFDaGFuZ2VkKT1cIm9uQ2FtZXJhQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjYW1lcmFNb3ZlKT1cIm9uQ2FtZXJhTW92ZSgkZXZlbnQpXCI+PC9NYXBWaWV3PlxyXG4gICAgPC9HcmlkTGF5b3V0PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwRXhhbXBsZUNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgbGF0aXR1ZGUgPSAgMzcuMzIzOTcyO1xyXG4gICAgcHVibGljIGxvbmdpdHVkZSA9IDEyNy4xMjUxMDk7XHJcbiAgICBwdWJsaWMgc3BlZWQgPSAwO1xyXG4gICAgcHVibGljIGFkZHIgPSBcIlwiO1xyXG4gICAgem9vbSA9IDE1O1xyXG4gICAgbWluWm9vbSA9IDA7XHJcbiAgICBtYXhab29tID0gMjI7XHJcbiAgICBiZWFyaW5nID0gMDtcclxuICAgIHRpbHQgPSAwO1xyXG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbiAgICBtYXBWaWV3OiBNYXBWaWV3O1xyXG5cclxuICAgIGRpc3RhbmNlc1Jlc3VsdDtcclxuICAgIGZpbHRlcmVkQnlEaXN0YW5jZSA9IFtdO1xyXG4gICAgZmlsdGVyZWRCeUVubmVhZ3JhbSA9IFtdO1xyXG5cclxuICAgIGxhc3RDYW1lcmE6IFN0cmluZztcclxuICAgIG1hcmtlcnMgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZExpc3RTZXJ2aWNlOiBGcmllbmRMaXN0U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgIHNldEludGVydmFsKHRoaXMudXBkYXRlVGhpc1VzZXJMb2NhdGlvbi5iaW5kKHRoaXMpLDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRoaXNVc2VyTG9jYXRpb24oKXtcclxuICAgICAgICBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oeyBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsIG1heGltdW1BZ2U6IDUwMDAsIHRpbWVvdXQ6IDIwMDAwIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcclxuICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gcmVzLnNwZWVkO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFkZHJlc3MgKFJFUVVJUkVTIFlPVVIgT1dOIEdPT0dMRSBNQVAgQVBJIEtFWSEpXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9XCIgKyByZXMubGF0aXR1ZGUgKyBcIixcIiArIHJlcy5sb25naXR1ZGUgKyBcIiZrZXk9QUl6YVN5RHMtaUtqYjlmcEltZkVtR3NFekYycm82MG0wZ05meEpZXCIpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyKTtcclxuICAgICAgICAgICAgICAgIGlmIChyLnJlc3VsdHNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHIgPSByLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZEFsbE1hcmtlcnMoKXtcclxuICAgIC8vICAgICB0aGlzLm1hcmtlcnMgPSBbXTtcclxuICAgIC8vICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kcy5sZW5ndGg7aSsrKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2godGhpcy5mcmllbmRMaXN0U2VydmljZS5mcmllbmRzW2ldLm1hcmtlcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldERpc3RhbmNlKG9yaWdpbnM6IE1hcmtlciwgZGVzdGluYXRpb25zOiBBcnJheTxNYXJrZXI+KXtcclxuICAgICAgICB0aGlzLmRpc3RhbmNlc1Jlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYoZGVzdGluYXRpb25zLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGlzdGFuY2VVUkwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXN0YW5jZW1hdHJpeC9qc29uP3VuaXRzPW1ldHJpYyZtb2RlPXRyYW5zaXQmb3JpZ2lucz1cIitvcmlnaW5zLnBvc2l0aW9uLmxhdGl0dWRlK1wiLFwiK29yaWdpbnMucG9zaXRpb24ubG9uZ2l0dWRlK1wiJmRlc3RpbmF0aW9ucz1cIjtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGRlc3RpbmF0aW9ucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgZGlzdGFuY2VVUkwgKz0gZGVzdGluYXRpb25zW2ldLnBvc2l0aW9uLmxhdGl0dWRlK1wiJTJDXCI7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVVJMICs9IGRlc3RpbmF0aW9uc1tpXS5wb3NpdGlvbi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIGlmKGkhPWRlc3RpbmF0aW9ucy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVVSTCArPSBcIiU3Q1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3RhbmNlVVJMICs9IFwiJmtleT1BSXphU3lEcy1pS2piOWZwSW1mRW1Hc0V6RjJybzYwbTBnTmZ4SllcIjtcclxuICAgICAgICBmZXRjaChkaXN0YW5jZVVSTClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZXNSZXN1bHQgPSByO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyaW5nIGEgbWFya2VyIHdpdGggZGlzdGFuY2UgLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCeURpc3RhbmNlKDgwMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXJpbmcgYSBtYXJrZXIgd2l0aCBlbm5lYWdyYW0gLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWx0ZXJCeVVzZXJFbm5lYWdyYW0oXCJsb3dcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ZpbHRlcmVkTWFya2VyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5RGlzdGFuY2Uoc2VhcmNoUmFkaW91czpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuZGlzdGFuY2VzUmVzdWx0PT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmRpc3RhbmNlc1Jlc3VsdC5yb3dzWzBdLmVsZW1lbnRzO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxlbGVtZW50cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudHNbaV0uZGlzdGFuY2UudmFsdWU8PXNlYXJjaFJhZGlvdXMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEJ5RGlzdGFuY2UucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyQnlVc2VyRW5uZWFncmFtKGZpbHRlckxldmVsOiBzdHJpbmcsIHVzZXJzOiBhbnkpOiBBcnJheTxib29sZWFuPntcclxuICAgICAgICB2YXIgZW5uZWFncmFtRmlsdGVyOiBBcnJheTxib29sZWFuPiA9IG5ldyBBcnJheTxib29sZWFuPigpO1xyXG4gICAgICAgIHZhciB0aGlzVXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXI7XHJcbiAgICAgICAgdmFyIHRoaXNVc2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlci5lbm5lYWdyYW0uc3RhdGU7XHJcbiAgICAgICAgZm9yKHZhciB1aWQgaW4gdXNlcnMpe1xyXG4gICAgICAgICAgICB2YXIgdGhpc2ZyaWVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZnJpZW5kRW5uZWFncmFtTnVtID0gdXNlcnNbdWlkXVsnZW5uZWFncmFtJ11bJ251bWJlciddO1xyXG4gICAgICAgICAgICB2YXIgZnJpZW5kRW5uZWFncmFtU3RhdGUgPSB1c2Vyc1t1aWRdWydlbm5lYWdyYW0nXVsnc3RhdGUnXTtcclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXNmcmllbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihmaWx0ZXJMZXZlbCA9PT0gXCJoaWdoXCIgfHwgZmlsdGVyTGV2ZWwgPT09IFwibG93XCIpe1xyXG4gICAgICAgICAgICAgICAgaWYoKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCB0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJcIikgJiYgZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cImJhZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA5ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAzKXt0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW0ucHVzaCh0cnVlKTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAzICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA2KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA2ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA5KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAxICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA3KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA3ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA1KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA1ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA4KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA4ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAyKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSAyICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSA0KXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzVXNlckVubmVhZ3JhbU51bSA9PSA0ICYmIGZyaWVuZEVubmVhZ3JhbU51bSA9PSAxKXt0aGlzZnJpZW5kID0gdHJ1ZTt9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImJhZFwiICYmIChmcmllbmRFbm5lYWdyYW1TdGF0ZT09PVwiZ29vZFwiIHx8IGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDkgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDYpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDMgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDkpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDYgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDMpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDEgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDQpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDcgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDEpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDUgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDcpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDggJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDUpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDIgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDgpe3RoaXNmcmllbmQgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNVc2VyRW5uZWFncmFtTnVtID09IDQgJiYgZnJpZW5kRW5uZWFncmFtTnVtID09IDIpe3RoaXNmcmllbmQgPSB0cnVlO30gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzZnJpZW5kID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZnJpZW5kc1tpXS5tYXJrZXIuY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmlsdGVyTGV2ZWwgPT09IFwibG93XCIpe1xyXG4gICAgICAgICAgICAgICAgaWYoKHRoaXNVc2VyRW5uZWFncmFtU3RhdGU9PT1cImdvb2RcIiB8fCB0aGlzVXNlckVubmVhZ3JhbVN0YXRlPT09XCJcIikgJiYgKGZyaWVuZEVubmVhZ3JhbVN0YXRlPT09XCJnb29kXCIgfHwgZnJpZW5kRW5uZWFncmFtU3RhdGU9PT1cIlwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNyAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNCl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNSAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNil7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gOCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gOSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gMiAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gMyl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpc1VzZXJFbm5lYWdyYW1OdW0gPT0gNCAmJiBmcmllbmRFbm5lYWdyYW1OdW0gPT0gNSl7dGhpc2ZyaWVuZCA9IHRydWU7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpc2ZyaWVuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyLmNvbG9yID0gXCJ5ZWxsb3dcIjtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVubmVhZ3JhbUZpbHRlci5wdXNoKHRoaXNmcmllbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5uZWFncmFtRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkcmF3RmlsdGVyZWRNYXJrZXIoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZmlsdGVyZWRCeURpc3RhbmNlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpbHRlcmVkQnlEaXN0YW5jZVtpXSAmJiB0aGlzLmZpbHRlcmVkQnlFbm5lYWdyYW1baV0pe1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcih0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmZyaWVuZHNbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9NYXAgZXZlbnRzXHJcbiAgICBvbk1hcFJlYWR5KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xyXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcclxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXgubWFya2VyKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgYWxsIG1hcmtlcnMuLi5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRBbGxNYXJrZXJzKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGRpc3RhbmNlIGZyb20gb3JpZ2luIHRvIGRlc3RpbmF0aW9ucyAuLi5cIik7XHJcbiAgICAgICAgLy8gdGhpcy5nZXREaXN0YW5jZSh0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4Lm1hcmtlciwgdGhpcy5tYXJrZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXIgRXZlbnQ6ICdcIiArIGFyZ3MuZXZlbnROYW1lXHJcbiAgICAgICAgICAgICsgXCInIHRyaWdnZXJlZCBvbjogXCIgKyBhcmdzLm1hcmtlci50aXRsZVxyXG4gICAgICAgICAgICArIFwiLCBMYXQ6IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbWVyYU1vdmUoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIG1vdmluZzogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==