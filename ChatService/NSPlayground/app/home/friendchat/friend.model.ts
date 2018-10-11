import { Marker, Position } from 'nativescript-google-maps-sdk';
export class Friend{
    public email: string;
    public name: string;
    public profilePicsrc: string;
    public backgroundPicsrc: string;
    public gender: string;
    public enneagramNumber: number;
    public enneagramState: string;
    public position: Position;
    public marker: Marker;
}