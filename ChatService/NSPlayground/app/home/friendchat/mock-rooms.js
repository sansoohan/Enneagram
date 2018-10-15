"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
exports.USER = {
    index: {
        email: "2018ndss@gmail.com",
        name: "ndss",
        profilePicsrc: "",
        backgroundPicsrc: "",
        gender: "male",
        enneagramNumber: 9,
        enneagramState: "good",
        position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.323972, 127.125109),
        marker: new nativescript_google_maps_sdk_1.Marker(),
    },
    home: {
        enneagram: {
            behavior: "",
            emotion: "",
            thought: "",
        }
    }
};
exports.USER.index.marker.title = exports.USER.index.name;
exports.USER.index.marker.snippet = "Enneagram type : " + exports.USER.index.enneagramNumber;
exports.USER.index.marker.position = exports.USER.index.position;
exports.FriendList = [
    { email: "Bulbasaur@gmail.com", name: "Bulbasaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 3, enneagramState: "bad", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.325412, 127.124763), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Ivysaur@gmail.com", name: "Ivysaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 4, enneagramState: "good", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.322753, 127.127618), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Venusaur@gmail.com", name: "Venusaur", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 1, enneagramState: "", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.322624, 127.127784), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Charmander@gmail.com", name: "Charmander", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 2, enneagramState: "good", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.320423, 127.128385), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Charmeleon@gmail.com", name: "Charmeleon", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 5, enneagramState: "bad", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.321225, 127.127344), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Charizard@gmail.com", name: "Charizard", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 6, enneagramState: "", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.321797, 127.129157), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Squirtle@gmail.com", name: "Squirtle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 8, enneagramState: "good", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.320364, 127.126958), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Wartortle@gmail.com", name: "Wartortle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 7, enneagramState: "bad", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.320526, 127.125864), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Blastoise@gmail.com", name: "Blastoise", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 9, enneagramState: "", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.321072, 127.126089), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Caterpie@gmail.com", name: "Caterpie", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 3, enneagramState: "good", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.321848, 127.123407), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Metapod@gmail.com", name: "Metapod", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 6, enneagramState: "bad", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.322846, 127.129050), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Butterfree@gmail.com", name: "Butterfree", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 2, enneagramState: "", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.323219, 127.126165), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Weedle@gmail.com", name: "Weedle", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 7, enneagramState: "good", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.320172, 127.128630), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Kakuna@gmail.com", name: "Kakuna", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 1, enneagramState: "bad", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.316588, 127.126710), marker: new nativescript_google_maps_sdk_1.Marker() },
    { email: "Beedrill@gmail.com", name: "Beedrill", profilePicsrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png", backgroundPicsrc: "", gender: "male", enneagramNumber: 4, enneagramState: "", position: nativescript_google_maps_sdk_1.Position.positionFromLatLng(37.317074, 127.126797), marker: new nativescript_google_maps_sdk_1.Marker() },
];
for (var i = 0; i < exports.FriendList.length; i++) {
    exports.FriendList[i].marker.title = exports.FriendList[i].name;
    exports.FriendList[i].marker.snippet = "Enneagram type : " + exports.FriendList[i].enneagramNumber;
    exports.FriendList[i].marker.position = exports.FriendList[i].position;
}
exports.RoomList = [
    {
        id: 0,
        title: "My Family",
        messages: [
            { friend: exports.USER.index, contents: "Hi. how are you?" },
            { friend: exports.FriendList[1], contents: "Fine." },
            { friend: exports.USER.index, contents: "How about your assignment?" },
            { friend: exports.FriendList[1], contents: "It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [exports.USER.index, exports.FriendList[1],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        startDate: null,
        endDate: null
    },
    {
        id: 1,
        title: "My Friends",
        messages: [
            { friend: exports.USER.index, contents: "Hi. how are you?" },
            { friend: exports.FriendList[2], contents: "Fine." },
            { friend: exports.USER.index, contents: "How about your assignment?" },
            { friend: exports.FriendList[2], contents: "It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [exports.USER.index, exports.FriendList[2],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        startDate: null,
        endDate: null
    },
    {
        id: 2,
        title: "My Colleges",
        messages: [
            { friend: exports.USER.index, contents: "Hi. how are you?" },
            { friend: exports.FriendList[3], contents: "Fine." },
            { friend: exports.USER.index, contents: "How about your assignment?" },
            { friend: exports.FriendList[3], contents: "It's not good. It's really hard to finish. It's not good. It's really hard to finish. It's not good. It's really hard to finish." },
        ],
        bottomMessage: "",
        friends: [exports.USER.index, exports.FriendList[3],],
        icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        startDate: null,
        endDate: null
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1yb29tcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vY2stcm9vbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSw2RUFBZ0U7QUFJbkQsUUFBQSxJQUFJLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixJQUFJLEVBQUUsTUFBTTtRQUNaLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGdCQUFnQixFQUFFLEVBQUU7UUFDcEIsTUFBTSxFQUFFLE1BQU07UUFDZCxlQUFlLEVBQUUsQ0FBQztRQUNsQixjQUFjLEVBQUUsTUFBTTtRQUN0QixRQUFRLEVBQUUsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1FBQzVELE1BQU0sRUFBRSxJQUFJLHFDQUFNLEVBQUU7S0FDdkI7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUU7WUFDUCxRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7U0FDZDtLQUNKO0NBQ0osQ0FBQTtBQUVELFlBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUMxQyxZQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEdBQUMsWUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDM0UsWUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFlBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBRXBDLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLEVBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGdGQUFnRixFQUFFLGdCQUFnQixFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLGVBQWUsRUFBQyxDQUFD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QUk7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNoQjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcbmltcG9ydCB7IEltYWdlLCBpbWFnZVNvdXJjZVByb3BlcnR5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS9pbWFnZSc7XHJcbmltcG9ydCB7IFJvb20gfSBmcm9tICcuL3Jvb20ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9tZXNzYWdlLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5tb2RlbCc7XHJcbmltcG9ydCB7IEZyaWVuZCB9IGZyb20gJy4vZnJpZW5kLm1vZGVsJztcclxuaW1wb3J0IHsgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xyXG5pbXBvcnQgQml0bWFwRmFjdG9yeSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYml0bWFwLWZhY3RvcnlcIik7XHJcbmltcG9ydCBLbm93bkNvbG9ycyA9IHJlcXVpcmUoXCJjb2xvci9rbm93bi1jb2xvcnNcIik7XHJcblxyXG5leHBvcnQgY29uc3QgVVNFUiA9IHtcclxuICAgIGluZGV4OiB7XHJcbiAgICAgICAgZW1haWw6IFwiMjAxOG5kc3NAZ21haWwuY29tXCIsXHJcbiAgICAgICAgbmFtZTogXCJuZHNzXCIsXHJcbiAgICAgICAgcHJvZmlsZVBpY3NyYzogXCJcIixcclxuICAgICAgICBiYWNrZ3JvdW5kUGljc3JjOiBcIlwiLFxyXG4gICAgICAgIGdlbmRlcjogXCJtYWxlXCIsXHJcbiAgICAgICAgZW5uZWFncmFtTnVtYmVyOiA5LFxyXG4gICAgICAgIGVubmVhZ3JhbVN0YXRlOiBcImdvb2RcIixcclxuICAgICAgICBwb3NpdGlvbjogUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDM3LjMyMzk3MiwgMTI3LjEyNTEwOSksXHJcbiAgICAgICAgbWFya2VyOiBuZXcgTWFya2VyKCksXHJcbiAgICB9LFxyXG4gICAgaG9tZToge1xyXG4gICAgICAgIGVubmVhZ3JhbToge1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogXCJcIixcclxuICAgICAgICAgICAgZW1vdGlvbjogXCJcIixcclxuICAgICAgICAgICAgdGhvdWdodDogXCJcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblVTRVIuaW5kZXgubWFya2VyLnRpdGxlID0gVVNFUi5pbmRleC5uYW1lO1xyXG5VU0VSLmluZGV4Lm1hcmtlci5zbmlwcGV0ID0gXCJFbm5lYWdyYW0gdHlwZSA6IFwiK1VTRVIuaW5kZXguZW5uZWFncmFtTnVtYmVyO1xyXG5VU0VSLmluZGV4Lm1hcmtlci5wb3NpdGlvbiA9IFVTRVIuaW5kZXgucG9zaXRpb247XHJcblxyXG5leHBvcnQgY29uc3QgRnJpZW5kTGlzdCA9IFtcclxuICAgIHtlbWFpbDogXCJCdWxiYXNhdXJAZ21haWwuY29tXCIsIG5hbWU6IFwiQnVsYmFzYXVyXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzEucG5nXCIsIGJhY2tncm91bmRQaWNzcmM6XCJcIiwgZ2VuZGVyOlwibWFsZVwiLCBlbm5lYWdyYW1OdW1iZXI6MywgZW5uZWFncmFtU3RhdGU6XCJiYWRcIiwgcG9zaXRpb246UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDM3LjMyNTQxMiwgMTI3LjEyNDc2MyksIG1hcmtlcjogbmV3IE1hcmtlcigpfSxcclxuICAgIHtlbWFpbDogXCJJdnlzYXVyQGdtYWlsLmNvbVwiLCBuYW1lOiBcIkl2eXNhdXJcIiwgcHJvZmlsZVBpY3NyYzogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vMi5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjo0LCBlbm5lYWdyYW1TdGF0ZTpcImdvb2RcIiwgcG9zaXRpb246UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDM3LjMyMjc1MywgMTI3LjEyNzYxOCksIG1hcmtlcjogbmV3IE1hcmtlcigpfSxcclxuICAgIHtlbWFpbDogXCJWZW51c2F1ckBnbWFpbC5jb21cIiwgbmFtZTogXCJWZW51c2F1clwiLCBwcm9maWxlUGljc3JjOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi8zLnBuZ1wiLCBiYWNrZ3JvdW5kUGljc3JjOlwiXCIsIGdlbmRlcjpcIm1hbGVcIiwgZW5uZWFncmFtTnVtYmVyOjEsIGVubmVhZ3JhbVN0YXRlOlwiXCIsIHBvc2l0aW9uOlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygzNy4zMjI2MjQsIDEyNy4xMjc3ODQpLCBtYXJrZXI6IG5ldyBNYXJrZXIoKX0sXHJcbiAgICB7ZW1haWw6IFwiQ2hhcm1hbmRlckBnbWFpbC5jb21cIiwgbmFtZTogXCJDaGFybWFuZGVyXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzQucG5nXCIsIGJhY2tncm91bmRQaWNzcmM6XCJcIiwgZ2VuZGVyOlwibWFsZVwiLCBlbm5lYWdyYW1OdW1iZXI6MiwgZW5uZWFncmFtU3RhdGU6XCJnb29kXCIsIHBvc2l0aW9uOlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygzNy4zMjA0MjMsIDEyNy4xMjgzODUpLCBtYXJrZXI6IG5ldyBNYXJrZXIoKX0sXHJcbiAgICB7ZW1haWw6IFwiQ2hhcm1lbGVvbkBnbWFpbC5jb21cIiwgbmFtZTogXCJDaGFybWVsZW9uXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzUucG5nXCIsIGJhY2tncm91bmRQaWNzcmM6XCJcIiwgZ2VuZGVyOlwibWFsZVwiLCBlbm5lYWdyYW1OdW1iZXI6NSwgZW5uZWFncmFtU3RhdGU6XCJiYWRcIiwgcG9zaXRpb246UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDM3LjMyMTIyNSwgMTI3LjEyNzM0NCksIG1hcmtlcjogbmV3IE1hcmtlcigpfSxcclxuICAgIHtlbWFpbDogXCJDaGFyaXphcmRAZ21haWwuY29tXCIsIG5hbWU6IFwiQ2hhcml6YXJkXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzYucG5nXCIsIGJhY2tncm91bmRQaWNzcmM6XCJcIiwgZ2VuZGVyOlwibWFsZVwiLCBlbm5lYWdyYW1OdW1iZXI6NiwgZW5uZWFncmFtU3RhdGU6XCJcIiwgcG9zaXRpb246UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDM3LjMyMTc5NywgMTI3LjEyOTE1NyksIG1hcmtlcjogbmV3IE1hcmtlcigpfSxcclxuICAgIHtlbWFpbDogXCJTcXVpcnRsZUBnbWFpbC5jb21cIiwgbmFtZTogXCJTcXVpcnRsZVwiLCBwcm9maWxlUGljc3JjOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi83LnBuZ1wiLCBiYWNrZ3JvdW5kUGljc3JjOlwiXCIsIGdlbmRlcjpcIm1hbGVcIiwgZW5uZWFncmFtTnVtYmVyOjgsIGVubmVhZ3JhbVN0YXRlOlwiZ29vZFwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIwMzY0LCAxMjcuMTI2OTU4KSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIldhcnRvcnRsZUBnbWFpbC5jb21cIiwgbmFtZTogXCJXYXJ0b3J0bGVcIiwgcHJvZmlsZVBpY3NyYzogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vOC5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjo3LCBlbm5lYWdyYW1TdGF0ZTpcImJhZFwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIwNTI2LCAxMjcuMTI1ODY0KSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIkJsYXN0b2lzZUBnbWFpbC5jb21cIiwgbmFtZTogXCJCbGFzdG9pc2VcIiwgcHJvZmlsZVBpY3NyYzogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vOS5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjo5LCBlbm5lYWdyYW1TdGF0ZTpcIlwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIxMDcyLCAxMjcuMTI2MDg5KSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIkNhdGVycGllQGdtYWlsLmNvbVwiLCBuYW1lOiBcIkNhdGVycGllXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzEwLnBuZ1wiLCBiYWNrZ3JvdW5kUGljc3JjOlwiXCIsIGdlbmRlcjpcIm1hbGVcIiwgZW5uZWFncmFtTnVtYmVyOjMsIGVubmVhZ3JhbVN0YXRlOlwiZ29vZFwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIxODQ4LCAxMjcuMTIzNDA3KSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIk1ldGFwb2RAZ21haWwuY29tXCIsIG5hbWU6IFwiTWV0YXBvZFwiLCBwcm9maWxlUGljc3JjOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi8xMS5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjo2LCBlbm5lYWdyYW1TdGF0ZTpcImJhZFwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIyODQ2LCAxMjcuMTI5MDUwKSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIkJ1dHRlcmZyZWVAZ21haWwuY29tXCIsIG5hbWU6IFwiQnV0dGVyZnJlZVwiLCBwcm9maWxlUGljc3JjOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi8xMi5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjoyLCBlbm5lYWdyYW1TdGF0ZTpcIlwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzIzMjE5LCAxMjcuMTI2MTY1KSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIldlZWRsZUBnbWFpbC5jb21cIiwgbmFtZTogXCJXZWVkbGVcIiwgcHJvZmlsZVBpY3NyYzogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vMTMucG5nXCIsIGJhY2tncm91bmRQaWNzcmM6XCJcIiwgZ2VuZGVyOlwibWFsZVwiLCBlbm5lYWdyYW1OdW1iZXI6NywgZW5uZWFncmFtU3RhdGU6XCJnb29kXCIsIHBvc2l0aW9uOlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygzNy4zMjAxNzIsIDEyNy4xMjg2MzApLCBtYXJrZXI6IG5ldyBNYXJrZXIoKX0sXHJcbiAgICB7ZW1haWw6IFwiS2FrdW5hQGdtYWlsLmNvbVwiLCBuYW1lOiBcIktha3VuYVwiLCBwcm9maWxlUGljc3JjOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi8xNC5wbmdcIiwgYmFja2dyb3VuZFBpY3NyYzpcIlwiLCBnZW5kZXI6XCJtYWxlXCIsIGVubmVhZ3JhbU51bWJlcjoxLCBlbm5lYWdyYW1TdGF0ZTpcImJhZFwiLCBwb3NpdGlvbjpQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoMzcuMzE2NTg4LCAxMjcuMTI2NzEwKSwgbWFya2VyOiBuZXcgTWFya2VyKCl9LFxyXG4gICAge2VtYWlsOiBcIkJlZWRyaWxsQGdtYWlsLmNvbVwiLCBuYW1lOiBcIkJlZWRyaWxsXCIsIHByb2ZpbGVQaWNzcmM6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzE1LnBuZ1wiLCBiYWNrZ3JvdW5kUGljc3JjOlwiXCIsIGdlbmRlcjpcIm1hbGVcIiwgZW5uZWFncmFtTnVtYmVyOjQsIGVubmVhZ3JhbVN0YXRlOlwiXCIsIHBvc2l0aW9uOlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygzNy4zMTcwNzQsIDEyNy4xMjY3OTcpLCBtYXJrZXI6IG5ldyBNYXJrZXIoKX0sXHJcbl1cclxuXHJcbmZvcih2YXIgaT0wO2k8RnJpZW5kTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgIEZyaWVuZExpc3RbaV0ubWFya2VyLnRpdGxlID0gRnJpZW5kTGlzdFtpXS5uYW1lO1xyXG4gICAgRnJpZW5kTGlzdFtpXS5tYXJrZXIuc25pcHBldCA9IFwiRW5uZWFncmFtIHR5cGUgOiBcIitGcmllbmRMaXN0W2ldLmVubmVhZ3JhbU51bWJlcjtcclxuICAgIEZyaWVuZExpc3RbaV0ubWFya2VyLnBvc2l0aW9uID0gRnJpZW5kTGlzdFtpXS5wb3NpdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJvb21MaXN0OiBSb29tW10gPSBbXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6MCxcclxuICAgICAgICB0aXRsZTogXCJNeSBGYW1pbHlcIixcclxuICAgICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgICAgICB7IGZyaWVuZDogVVNFUi5pbmRleCwgY29udGVudHM6IFwiSGkuIGhvdyBhcmUgeW91P1wiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBGcmllbmRMaXN0WzFdLCBjb250ZW50czogXCJGaW5lLlwiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBVU0VSLmluZGV4LCBjb250ZW50czogXCJIb3cgYWJvdXQgeW91ciBhc3NpZ25tZW50P1wiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBGcmllbmRMaXN0WzFdLCBjb250ZW50czogXCJJdCdzIG5vdCBnb29kLiBJdCdzIHJlYWxseSBoYXJkIHRvIGZpbmlzaC5cIiB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYm90dG9tTWVzc2FnZTogXCJcIixcclxuICAgICAgICBmcmllbmRzOiBbVVNFUi5pbmRleCwgRnJpZW5kTGlzdFsxXSxdLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uLzEucG5nXCIsXHJcbiAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgIGVuZERhdGU6IG51bGxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6MSxcclxuICAgICAgICB0aXRsZTogXCJNeSBGcmllbmRzXCIsXHJcbiAgICAgICAgbWVzc2FnZXM6IFtcclxuICAgICAgICAgICAgeyBmcmllbmQ6IFVTRVIuaW5kZXgsIGNvbnRlbnRzOiBcIkhpLiBob3cgYXJlIHlvdT9cIiB9LFxyXG4gICAgICAgICAgICB7IGZyaWVuZDogRnJpZW5kTGlzdFsyXSwgY29udGVudHM6IFwiRmluZS5cIiB9LFxyXG4gICAgICAgICAgICB7IGZyaWVuZDogVVNFUi5pbmRleCwgY29udGVudHM6IFwiSG93IGFib3V0IHlvdXIgYXNzaWdubWVudD9cIiB9LFxyXG4gICAgICAgICAgICB7IGZyaWVuZDogRnJpZW5kTGlzdFsyXSwgY29udGVudHM6IFwiSXQncyBub3QgZ29vZC4gSXQncyByZWFsbHkgaGFyZCB0byBmaW5pc2guXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGJvdHRvbU1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgZnJpZW5kczogW1VTRVIuaW5kZXgsIEZyaWVuZExpc3RbMl0sXSxcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi8yLnBuZ1wiLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcclxuICAgICAgICBlbmREYXRlOiBudWxsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOjIsXHJcbiAgICAgICAgdGl0bGU6IFwiTXkgQ29sbGVnZXNcIixcclxuICAgICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgICAgICB7IGZyaWVuZDogVVNFUi5pbmRleCwgY29udGVudHM6IFwiSGkuIGhvdyBhcmUgeW91P1wiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBGcmllbmRMaXN0WzNdLCBjb250ZW50czogXCJGaW5lLlwiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBVU0VSLmluZGV4LCBjb250ZW50czogXCJIb3cgYWJvdXQgeW91ciBhc3NpZ25tZW50P1wiIH0sXHJcbiAgICAgICAgICAgIHsgZnJpZW5kOiBGcmllbmRMaXN0WzNdLCBjb250ZW50czogXCJJdCdzIG5vdCBnb29kLiBJdCdzIHJlYWxseSBoYXJkIHRvIGZpbmlzaC4gSXQncyBub3QgZ29vZC4gSXQncyByZWFsbHkgaGFyZCB0byBmaW5pc2guIEl0J3Mgbm90IGdvb2QuIEl0J3MgcmVhbGx5IGhhcmQgdG8gZmluaXNoLlwiIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBib3R0b21NZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgIGZyaWVuZHM6IFtVU0VSLmluZGV4LCBGcmllbmRMaXN0WzNdLF0sXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vMy5wbmdcIixcclxuICAgICAgICBzdGFydERhdGU6IG51bGwsXHJcbiAgICAgICAgZW5kRGF0ZTogbnVsbFxyXG4gICAgfSxcclxuXSJdfQ==