import {Component, ElementRef, ViewChild} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { FriendListService } from '../../friendchat/friend-list.service';
import { FirebaseService } from "../../../services/firebase.service";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
registerElement('MapView', () => MapView);

@Component({
    selector: 'MapExample',
    template: `
    <GridLayout>
    <MapView #mapView [latitude]="latitude" [longitude]="longitude"
             [zoom]="zoom" [minZoom]="minZoom" [maxZoom]="maxZoom" [bearing]="bearing"
             [tilt]="tilt" i-padding="50,50,50,50" [padding]="padding" (mapReady)="onMapReady($event)"
             (markerSelect)="onMarkerEvent($event)" (markerBeginDragging)="onMarkerEvent($event)"
             (markerEndDragging)="onMarkerEvent($event)" (markerDrag)="onMarkerEvent($event)"
             (markerInfoWindowTapped)="onMarkerEvent($event)" (coordinateTapped)="onCoordinateTapped($event)"
             (cameraChanged)="onCameraChanged($event)"
             (cameraMove)="onCameraMove($event)"></MapView>
    </GridLayout>
    `
})
export class MapExampleComponent {
    public latitude =  37.323972;
    public longitude = 127.125109;
    public speed = 0;
    public addr = "";
    zoom = 15;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    distancesResult;
    filteredByDistance = [];
    filteredByEnneagram = [];

    lastCamera: String;
    markers = [];

    constructor(private friendListService: FriendListService,
        private firebaseService: FirebaseService) {
        // this.getDistance();
        setInterval(this.updateThisUserLocation.bind(this),5000);
    }

    updateThisUserLocation(){
        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
        .then(res => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
            this.speed = res.speed;
            // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
            fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + res.latitude + "," + res.longitude + "&key=AIzaSyDs-iKjb9fpImfEmGsEzF2ro60m0gNfxJY")
            .then((response) => response.json()).then((r) => {
                // console.log(r);
                if (r.results[0]) {
                    this.addr = r.results[0].formatted_address;
                }
            });
        });
    }

    // addAllMarkers(){
    //     this.markers = [];
    //     for(var i=0;i<this.friendListService.friends.length;i++){
    //         this.markers.push(this.friendListService.friends[i].marker);
    //     }
    // }

    getDistance(origins: Marker, destinations: Array<Marker>){
        this.distancesResult = null;
        if(destinations.length == 0){
            return;
        }
        var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=transit&origins="+origins.position.latitude+","+origins.position.longitude+"&destinations=";
        for(var i=0;i<destinations.length;i++){
            distanceURL += destinations[i].position.latitude+"%2C";
            distanceURL += destinations[i].position.longitude;
            if(i!=destinations.length-1){
                distanceURL += "%7C";
            }
        }
        distanceURL += "&key=AIzaSyDs-iKjb9fpImfEmGsEzF2ro60m0gNfxJY";
        fetch(distanceURL)
            .then((response) => response.json()).then((r) => {
                console.log(r);
                this.distancesResult = r;

                console.log("Filtering a marker with distance ...");
                this.filterByDistance(800);
                console.log(this.filteredByDistance);

                console.log("Filtering a marker with enneagram ...");
                // this.filterByUserEnneagram("low");
                console.log(this.filteredByEnneagram);

                console.log("Setting a marker...");
                this.drawFilteredMarker();
            });
    }

    filterByDistance(searchRadious:number){
        if(this.distancesResult==null){
            return;
        }
        var elements = this.distancesResult.rows[0].elements;
        this.filteredByDistance = [];
        for(var i=0;i<elements.length;i++){
            if(elements[i].distance.value<=searchRadious){
                this.filteredByDistance.push(true);
            }
            else{
                this.filteredByDistance.push(false);
            }
        }
    }

    filterByUserEnneagram(filterLevel: string, users: any): Array<boolean>{
        var enneagramFilter: Array<boolean> = new Array<boolean>();
        var thisUserEnneagramNum = this.firebaseService.thisUser.enneagram.number;
        var thisUserEnneagramState = this.firebaseService.thisUser.enneagram.state;
        for(var uid in users){
            var thisfriend = false;
            var friendEnneagramNum = users[uid]['enneagram']['number'];
            var friendEnneagramState = users[uid]['enneagram']['state'];
            if(filterLevel === "none"){
                thisfriend = true;
            }

            if(filterLevel === "high" || filterLevel === "low"){
                if((thisUserEnneagramState==="good" || thisUserEnneagramState==="") && friendEnneagramState==="bad"){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 3){this.filteredByEnneagram.push(true);}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 1){thisfriend = true;}
                }
                else if(thisUserEnneagramState==="bad" && (friendEnneagramState==="good" || friendEnneagramState==="")){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 2){thisfriend = true;}    
                }
                if(thisfriend == true){
                    // this.friendListService.friends[i].marker.color = "green";
                }  
            }

            if(filterLevel === "low"){
                if((thisUserEnneagramState==="good" || thisUserEnneagramState==="") && (friendEnneagramState==="good" || friendEnneagramState==="")){
                    if(thisUserEnneagramNum == 9 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 9 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 3 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 5){thisfriend = true;}
                    else if(thisUserEnneagramNum == 6 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 2){thisfriend = true;}
                    else if(thisUserEnneagramNum == 1 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 7 && friendEnneagramNum == 8){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 4){thisfriend = true;}
                    else if(thisUserEnneagramNum == 5 && friendEnneagramNum == 6){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 7){thisfriend = true;}
                    else if(thisUserEnneagramNum == 8 && friendEnneagramNum == 9){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 1){thisfriend = true;}
                    else if(thisUserEnneagramNum == 2 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 3){thisfriend = true;}
                    else if(thisUserEnneagramNum == 4 && friendEnneagramNum == 5){thisfriend = true;}
                }
                if(thisfriend == true){
                    // this.friendListService.friends[i].marker.color = "yellow";
                }           
            }
            enneagramFilter.push(thisfriend);
        }
        return enneagramFilter;
    }


    drawFilteredMarker(){
        for(var i=0;i<this.filteredByDistance.length;i++){
            if(this.filteredByDistance[i] && this.filteredByEnneagram[i]){
                // this.mapView.addMarker(this.friendListService.friends[i].marker);
            }
        }
    }


    //Map events
    onMapReady(event) {
        console.log('Map Ready');
        this.mapView = event.object;
        // this.mapView.addMarker(this.friendListService.thisUser.index.marker);

        console.log("Adding all markers...");
        // this.addAllMarkers();

        console.log("Get distance from origin to destinations ...");
        // this.getDistance(this.friendListService.thisUser.index.marker, this.markers);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    }
}
