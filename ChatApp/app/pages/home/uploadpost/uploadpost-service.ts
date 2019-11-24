import { Injectable } from "@angular/core";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
@Injectable()
export class UploadpostService {
    public postType:string;
    public postLocation: Marker = new Marker();

    constructor() {

    }
}