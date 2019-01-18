import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { SearchService } from './search-service';
import { RadioOption } from "~/modules/buttons/radio-option";
import { GoogleMapComponent } from "~/modules/google-map/google-map.component";
import { FirebaseService } from "~/services/firebase.service";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";

@Component({
  moduleId: module.id,
  selector: 'SearchOption',
  templateUrl: './searchoption.component.html',
  styleUrls: ['./searchoption.component.scss']
})
export class SearchOptionComponent implements OnInit {
  locationCollapsed:string = "[close]";
  locationHeight:number = 300; 
  matchingLevelOptionButtons?: Array<RadioOption>;
  matchingLevel:string;
  public distanceValue:string;
  @ViewChild("googleMapComponent") googleMapComponent: GoogleMapComponent;
  @ViewChild("actionButton") _buttonRef: ActionButtonComponent;
  constructor(
    private searchService: SearchService,
    private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService,
  ) { }

  getMatchingLevelOptionButton(i:number){
    return this.matchingLevelOptionButtons[i];
  }

  ngOnInit() {
    this.matchingLevelOptionButtons = [
			new RadioOption("MatchingLevel", "high"),
			new RadioOption("MatchingLevel", "midium"),
			new RadioOption("MatchingLevel", "low")
		];
  }

  onLacationToggleTap(){
    if(this.locationCollapsed == "[close]"){
      this.locationCollapsed = "[open]";
      this.locationHeight = 0;
    }else{
      this.locationCollapsed = "[close]";
      this.locationHeight = 300;
    }    
  }

  onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

  changeCheckedRadio(radioOption: RadioOption): void {
		radioOption.selected = !radioOption.selected;

		if (!radioOption.selected) {
			return;
		}


		switch (radioOption.group) {
			case "MatchingLevel":
        this.matchingLevel = radioOption.text;
				this.matchingLevelOptionButtons.forEach(option => {
					if (option.text !== radioOption.text) {
						option.selected = false;
					}
				});
				break;
      default:
        break;
		}
  }
  enneagramFilter(userEnneagram:number, filterLevel:string): Array<number>{
    var enneagramNums:Array<number> = [];
    if(filterLevel==="high" || filterLevel==="midium" || filterLevel==="low"){
      switch(userEnneagram){
        case 1: enneagramNums.push(4,7); break;
        case 2: enneagramNums.push(4,8); break;
        case 3: enneagramNums.push(6,9); break;
        case 4: enneagramNums.push(1,2); break;
        case 5: enneagramNums.push(7,8); break;
        case 6: enneagramNums.push(3,9); break;
        case 7: enneagramNums.push(1,5); break;
        case 8: enneagramNums.push(2,5); break;
        case 9: enneagramNums.push(3,6); break;
      }
    }
    if(filterLevel==="midium" || filterLevel==="low"){
      switch(userEnneagram){
        case 1: enneagramNums.push(3,8); break;
        case 2: enneagramNums.push(5,9); break;
        case 3: enneagramNums.push(1,5); break;
        case 4: enneagramNums.push(6,7); break;
        case 5: enneagramNums.push(2,3); break;
        case 6: enneagramNums.push(5,7); break;
        case 7: enneagramNums.push(4,9); break;
        case 8: enneagramNums.push(1,6); break;
        case 9: enneagramNums.push(2,7); break;
      }
    }
    if(filterLevel==="low"){
      switch(userEnneagram){
        case 1: enneagramNums.push(2,9); break;
        case 2: enneagramNums.push(1,3); break;
        case 3: enneagramNums.push(2,4); break;
        case 4: enneagramNums.push(3,5); break;
        case 5: enneagramNums.push(4,6); break;
        case 6: enneagramNums.push(5,7); break;
        case 7: enneagramNums.push(6,8); break;
        case 8: enneagramNums.push(7,9); break;
        case 9: enneagramNums.push(8,1); break;
      }
    }
    return enneagramNums;
  }

  onGoTap(){
    if(this.matchingLevel==null){
      alert("Please Select Filter Level For Friend Searching.");
    }
    else if(isNaN(parseInt(this.distanceValue))){
      alert("Please Input Integer number in distance for location radious.");
    }
    else{
      var userEnneagramNum;
      for(var userID in this.firebaseService.thisUser){
        userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
      }
      // console.log(this.firebaseService.thisUser);
      // console.log(userEnneagramNum);
      var type = this.searchService.postType;
      var otheruserEnneagramNums = this.enneagramFilter(userEnneagramNum, this.matchingLevel);
      // console.log(otheruserEnneagramNums);
      var originLatitude = this.searchService.postLocation.position.latitude;
      var originLongitude = this.searchService.postLocation.position.longitude;
      var distance = parseInt(this.distanceValue);
      this.firebaseService.searchQueries(type, otheruserEnneagramNums, originLatitude, originLongitude, distance);
      this.routerExtensions.navigate(['/searchresult'], { animated: false });
      
    }
  }
}
