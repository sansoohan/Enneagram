import { Marker, Position } from 'nativescript-google-maps-sdk';
export class User {
    public index: {
        email: string,
        name: string,
        profilePicsrc: string,
        backgroundPicsrc: string,
        gender: string,
        enneagramNumber: number,
        enneagramState: string,
        marker: Marker,
        position: Position
    }
    public home: {
        enneagram: {
            behavior: string,
            emotion: string,
            thought: string,
        }
    }
}