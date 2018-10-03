import { Room } from './room.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Friend } from './friend.model';

export const USER = {
    index: {
        email: "2018ndss@gmail.com",
        name: "ndss",
        profilePicsrc: "",
        backgroundPicsrc: "",
        gender: "male",
        enneagramNumber: 0,
    },
    home: {
        enneagram: {
            behavior: "",
            emotion: "",
            thought: "",   
        }
    }
}

export const FriendList: Friend[] = [
    {email: "Bulbasaur@gmail.com", name: "Bulbasaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Ivysaur@gmail.com", name: "Ivysaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Venusaur@gmail.com", name: "Venusaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Charmander@gmail.com", name: "Charmander", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Charmeleon@gmail.com", name: "Charmeleon", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Charizard@gmail.com", name: "Charizard", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Squirtle@gmail.com", name: "Squirtle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Wartortle@gmail.com", name: "Wartortle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Blastoise@gmail.com", name: "Blastoise", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Caterpie@gmail.com", name: "Caterpie", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Metapod@gmail.com", name: "Metapod", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Butterfree@gmail.com", name: "Butterfree", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Weedle@gmail.com", name: "Weedle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Kakuna@gmail.com", name: "Kakuna", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
    {email: "Beedrill@gmail.com", name: "Beedrill", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png", backgroundPicsrc:"", gender:"male", enneagramNumber:0},
]

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