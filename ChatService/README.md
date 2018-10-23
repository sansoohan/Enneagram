Chat Service for Gathering Data
==========================================================
We can give some recommendation to users with enneagram.<br>
User can make friends easy with this app.<br>
We can get some data from user. This data will be used for data analyzing.

For User win
------------
Good Service for young people.<br>

For Our win
------------
Good Serveying from user.<br>
You shouldn't let them know that they are getting surveyed.

Developement Steps.
--------------
<h1>1. Select The dev platform [done]</h1>
<h1>2. Make a login app with database [done]</h1>
<img src="result/home/login.png" height="300px">
<h1>3. Design simple function and make a simple UI [done]</h1>
<p>Home UI</p>
<p>
<img src="result/home/friendlist.jpg" height="300px">
<img src="result/home/friendchat.jpg" height="300px">
<img src="result/home/friendmatching.jpg" height="300px">
<img src="result/home/ideamatching.jpg" height="300px">
</p>

<h1>4. Design complex function and make a complex UI</h1>
<p>Unlock Friend ChatUI</p>
<p>
<img src="result/enneagramunlock/enneagramunlock01.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock02.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock03.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock04.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock05.jpg" height="300px">
<img src="result/enneagramunlock/enneagramunlock06.jpg" height="300px">
</p>

<p>Friend Filtering with GPS and Enneagram ChatUI</p>
<p>
<img src="result/gpstest/gpstest00.png" height="300px">
<img src="result/gpstest/gpstest01.png" height="300px">
<img src="result/gpstest/gpstest02.png" height="300px">
</p>

```

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
                    this.friendListService.friends[i].marker.color = "green";
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
```

```
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
                this.filterByUserEnneagram("low");
                console.log(this.filteredByEnneagram);

                console.log("Setting a marker...");
                this.drawFilteredMarker();
            });

```

<h1>5. Link and test simple-data function to database.</h1>
<h1>6. Link and test multi-interation function to database.</h1>
<h1>7. Design OOP model and database.</h1>
<p>Database Architect</p>
<img src="result/database/database03.png"><br>
<p>User Database</p>
<img src="result/database/database02.png"><br>
<p>User Storage</p>
<img src="result/database/database04.png"><br>
<p>Chat Database</p>
<img src="result/database/database01.png"><br>

<h1>8. Build an IOS/android App.</h1>
<h1>9. Alpha test and bug report.</h1>
<h1>10. Redesign with fancy UI.</h1>
<h1>11. Refactoring.</h1>
<h1>12. Beta test and bug report.</h1>

myApp(Back-End Development)
-----
This is fo testing database. I have tested firebase database with this.

NSPlayground(Front-End Development)
------------
This is for UI test in the application.<br>
If you want to make some UI for mobile application, it will be good choice using NSPlayground.

Contact
--------
name : SanSoo Han<br>
email : sansoo2002@naver.com<br>
phone : +82 10-8835-9229
