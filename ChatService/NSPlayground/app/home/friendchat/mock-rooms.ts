import { Room } from './room.model';
import { Chat } from './chat.model';
import { User } from './user.model';

export const USERS: User[] = [
    {name: "Bulbasaur", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
    {name: "Ivysaur", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"},
    {name: "Venusaur", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"},
    {name: "Charmander", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},
    {name: "Charmeleon", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"},
    {name: "Charizard", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"},
    {name: "Squirtle", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"},
    {name: "Wartortle", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"},
    {name: "Blastoise", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"},
    {name: "Caterpie", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"},
    {name: "Metapod", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"},
    {name: "Butterfree", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"},
    {name: "Weedle", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png"},
    {name: "Kakuna", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png"},
    {name: "Beedrill", picsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"},
]

export const ROOMS: Room[] = [
    {
        id: 0,
        title: "My Family",
        messages: [
            { user: USERS[0], contents: "Hi. how are you?" },
            { user: USERS[1], contents: "Fine." },
            { user: USERS[0], contents: "How about your assignment?" },
            { user: USERS[1], contents: "It's not good. It's really hard to finish." },
        ],
        topMessage: "It's not good. It's really hard to finish.",
        topUserSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        users: [USERS[0], USERS[1]]
    },
    {
        id: 1,
        title: "My Friends",
        messages: [
            { user: USERS[0], contents: "Hi. how are you?" },
            { user: USERS[2], contents: "Fine." },
            { user: USERS[0], contents: "How about your assignment?" },
            { user: USERS[2], contents: "It's not good. It's really hard to finish." },
        ],
        topMessage: "It's not good. It's really hard to finish.",
        topUserSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        users: [USERS[0], USERS[2]]
    },
    {
        id: 2,
        title: "My Colleges",
        messages: [
            { user: USERS[0], contents: "Hi. how are you?" },
            { user: USERS[3], contents: "Fine." },
            { user: USERS[0], contents: "How about your assignment?" },
            { user: USERS[3], contents: "It's not good. It's really hard to finish. It's not good. It's really hard to finish. It's not good. It's really hard to finish." },
        ],
        topMessage: "It's not good. It's really hard to finish. It's not good. It's really hard to finish. It's not good. It's really hard to finish.",
        topUserSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        users: [USERS[0], USERS[3]]
    },
]