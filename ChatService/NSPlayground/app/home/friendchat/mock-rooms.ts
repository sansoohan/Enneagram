import * as http from "http";
import { Image, imageSourceProperty } from 'tns-core-modules/ui/image/image';
import { Room } from './room.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Friend } from './friend.model';
import { Marker, Position } from 'nativescript-google-maps-sdk';
import BitmapFactory = require("nativescript-bitmap-factory");
import KnownColors = require("color/known-colors");

export const USER = {
    index: {
        email: "2018ndss@gmail.com",
        name: "ndss",
        profilePicsrc: "",
        backgroundPicsrc: "",
        gender: "male",
        enneagramNumber: 9,
        enneagramState: "good",
        position: Position.positionFromLatLng(37.323972, 127.125109),
        marker: new Marker(),
    },
    home: {
        enneagram: {
            behavior: "",
            emotion: "",
            thought: "",
        }
    }
}

USER.index.marker.title = USER.index.name;
USER.index.marker.snippet = "Enneagram type : "+USER.index.enneagramNumber;
USER.index.marker.position = USER.index.position;

export const FriendList = [
    {email: "Bulbasaur@gmail.com", name: "Bulbasaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", backgroundPicsrc:"", gender:"male", enneagramNumber:3, enneagramState:"bad", position:Position.positionFromLatLng(37.325412, 127.124763), marker: new Marker()},
    {email: "Ivysaur@gmail.com", name: "Ivysaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", backgroundPicsrc:"", gender:"male", enneagramNumber:4, enneagramState:"good", position:Position.positionFromLatLng(37.322753, 127.127618), marker: new Marker()},
    {email: "Venusaur@gmail.com", name: "Venusaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", backgroundPicsrc:"", gender:"male", enneagramNumber:1, enneagramState:"", position:Position.positionFromLatLng(37.322624, 127.127784), marker: new Marker()},
    {email: "Charmander@gmail.com", name: "Charmander", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", backgroundPicsrc:"", gender:"male", enneagramNumber:2, enneagramState:"good", position:Position.positionFromLatLng(37.320423, 127.128385), marker: new Marker()},
    {email: "Charmeleon@gmail.com", name: "Charmeleon", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", backgroundPicsrc:"", gender:"male", enneagramNumber:5, enneagramState:"bad", position:Position.positionFromLatLng(37.321225, 127.127344), marker: new Marker()},
    {email: "Charizard@gmail.com", name: "Charizard", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", backgroundPicsrc:"", gender:"male", enneagramNumber:6, enneagramState:"", position:Position.positionFromLatLng(37.321797, 127.129157), marker: new Marker()},
    {email: "Squirtle@gmail.com", name: "Squirtle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", backgroundPicsrc:"", gender:"male", enneagramNumber:8, enneagramState:"good", position:Position.positionFromLatLng(37.320364, 127.126958), marker: new Marker()},
    {email: "Wartortle@gmail.com", name: "Wartortle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", backgroundPicsrc:"", gender:"male", enneagramNumber:7, enneagramState:"bad", position:Position.positionFromLatLng(37.320526, 127.125864), marker: new Marker()},
    {email: "Blastoise@gmail.com", name: "Blastoise", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", backgroundPicsrc:"", gender:"male", enneagramNumber:9, enneagramState:"", position:Position.positionFromLatLng(37.321072, 127.126089), marker: new Marker()},
    {email: "Caterpie@gmail.com", name: "Caterpie", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", backgroundPicsrc:"", gender:"male", enneagramNumber:3, enneagramState:"good", position:Position.positionFromLatLng(37.321848, 127.123407), marker: new Marker()},
    {email: "Metapod@gmail.com", name: "Metapod", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png", backgroundPicsrc:"", gender:"male", enneagramNumber:6, enneagramState:"bad", position:Position.positionFromLatLng(37.322846, 127.129050), marker: new Marker()},
    {email: "Butterfree@gmail.com", name: "Butterfree", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png", backgroundPicsrc:"", gender:"male", enneagramNumber:2, enneagramState:"", position:Position.positionFromLatLng(37.323219, 127.126165), marker: new Marker()},
    {email: "Weedle@gmail.com", name: "Weedle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", backgroundPicsrc:"", gender:"male", enneagramNumber:7, enneagramState:"good", position:Position.positionFromLatLng(37.320172, 127.128630), marker: new Marker()},
    {email: "Kakuna@gmail.com", name: "Kakuna", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png", backgroundPicsrc:"", gender:"male", enneagramNumber:1, enneagramState:"bad", position:Position.positionFromLatLng(37.316588, 127.126710), marker: new Marker()},
    {email: "Beedrill@gmail.com", name: "Beedrill", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png", backgroundPicsrc:"", gender:"male", enneagramNumber:4, enneagramState:"", position:Position.positionFromLatLng(37.317074, 127.126797), marker: new Marker()},
]

for(var i=0;i<FriendList.length;i++){
    FriendList[i].marker.title = FriendList[i].name;
    FriendList[i].marker.snippet = "Enneagram type : "+FriendList[i].enneagramNumber;
    FriendList[i].marker.position = FriendList[i].position;
}

export const RoomList: Room[] = [
    {
        id:0,
        title: "My Family",
        messages: [
            { friend: USER.index, contents: "Hi. how are you?" },
            { friend: FriendList[1], contents: "Fine." },
            { friend: USER.index, contents: "How about your assignment?" },
            { friend: FriendList[1], contents: "It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [USER.index, FriendList[1],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        startDate: null,
        endDate: null
    },
    {
        id:1,
        title: "My Friends",
        messages: [
            { friend: USER.index, contents: "Hi. how are you?" },
            { friend: FriendList[2], contents: "Fine." },
            { friend: USER.index, contents: "How about your assignment?" },
            { friend: FriendList[2], contents: "It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [USER.index, FriendList[2],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        startDate: null,
        endDate: null
    },
    {
        id:2,
        title: "My Colleges",
        messages: [
            { friend: USER.index, contents: "Hi. how are you?" },
            { friend: FriendList[3], contents: "Fine." },
            { friend: USER.index, contents: "How about your assignment?" },
            { friend: FriendList[3], contents: "It's not good. It's really hard to finish. It's not good. It's really hard to finish. It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [USER.index, FriendList[3],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        startDate: null,
        endDate: null
    },
]