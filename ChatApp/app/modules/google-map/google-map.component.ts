import {Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { FirebaseService } from "~/services/firebase.service";
import { UploadpostService } from "~/pages/home/uploadpost/uploadpost-service";
import { SearchService } from "~/pages/home/searchoption/search-service";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
registerElement('MapView', () => MapView);

@Component({
    selector: 'GoogleMap',
    template: `
    <GridLayout>
    <MapView #mapView [mapType]="mapType" [latitude]="latitude" [longitude]="longitude"
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
export class GoogleMapComponent implements OnInit {
    @Input() mapType:string;
    @ViewChild("mapView",{static: false}) mapView: MapView;
    @Output() markerDrag: EventEmitter<any> = new EventEmitter<any>();
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
    

    distancesResult;
    filteredByDistance = [];
    filteredByEnneagram = [];

    lastCamera: String;
    markers = [];


    constructor(
        private firebaseService: FirebaseService,
        private uploadpostService: UploadpostService,
        private searchService: SearchService,
    ) {
        // this.getDistance();
        // setInterval(this.updateThisUserLocation.bind(this),5000);
        this.distanceTest();
    }
	ngOnInit(): void {
    }

    distanceTest(){
        var origin = new geolocation.Location();
        origin.latitude = 37.323972;
        origin.longitude = 127.125109;
        var destination = new geolocation.Location();
        destination.latitude = 36.323700;
        destination.longitude = 127.125109;
        console.log(geolocation.distance(origin, destination));
    }

    updateThisUserLocation(){
        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
        .then(res => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
        });
    }

    // addAllMarkers(){
    //     this.markers = [];
    //     for(var i=0;i<this.friendListService.friends.length;i++){
    //         this.markers.push(this.friendListService.friends[i].marker);
    //     }
    // }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');
        this.mapView = event.object;

        if(this.mapType==="blog"){
            console.log("blogMap");
            this.updateThisUserLocation();
            this.uploadpostService.postLocation = new Marker();
            this.uploadpostService.postLocation.position = Position.positionFromLatLng(this.latitude,this.longitude);
            this.uploadpostService.postLocation.title = "Me";
            this.uploadpostService.postLocation.snippet = "";
            this.uploadpostService.postLocation.userData = null;
            this.mapView.addMarker(this.uploadpostService.postLocation);
        }

        if(this.mapType==="search"){
            console.log("searchMap");
            this.updateThisUserLocation();
            this.searchService.postLocation = new Marker();
            this.searchService.postLocation.position = Position.positionFromLatLng(this.latitude,this.longitude);
            this.searchService.postLocation.title = "Me";
            this.searchService.postLocation.snippet = "";
            this.searchService.postLocation.userData = null;
            this.mapView.addMarker(this.searchService.postLocation);
        }

        if(this.mapType==="result"){
            
        }

        console.log("Adding all markers...");
        console.log("Get distance from origin to destinations ...");
        // this.getDistance(this.friendListService.thisUser.index.marker, this.markers);
    }

    onCoordinateTapped(args) {
        if(this.mapType==="blog"){
            this.uploadpostService.postLocation.position = args.position;
        }
        if(this.mapType==="search"){
            this.searchService.postLocation.position = args.position;
        }
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        this.markerDrag.emit(args);
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