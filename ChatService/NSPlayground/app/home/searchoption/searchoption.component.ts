import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { SearchService } from './search-service';
import { RadioOption } from "./radio-option";
import { MapExampleComponent } from "../friendmatching/map-example/map-example.component";
import { FirebaseService } from "../../services/firebase.service";

import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";
@Component({
  moduleId: module.id,
  selector: 'SearchOption',
  templateUrl: './searchoption.component.html',
  styleUrls: ['./searchoption.component.scss']
})
export class SearchOptionComponent implements OnInit {
  location_collapsed:string = "[close]";
  location_height:number = 300; 
  matchingLevelOptionButtons?: Array<RadioOption>;
  matchingLevel:string;
  public distanceValue:string;
  @ViewChild("mapExampleComponent") mapExampleComponent: MapExampleComponent;
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
    if(this.location_collapsed == "[close]"){
      this.location_collapsed = "[open]";
      this.location_height = 0;
    }else{
      this.location_collapsed = "[close]";
      this.location_height = 300;
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
  enneagram_filter(user_enneagram:number, filter_level:string): Array<number>{
    var enneagram_nums:Array<number> = [];
    if(filter_level==="high" || filter_level==="midium" || filter_level==="low"){
      switch(user_enneagram){
        case 1: enneagram_nums.push(4,7); break;
        case 2: enneagram_nums.push(4,8); break;
        case 3: enneagram_nums.push(6,9); break;
        case 4: enneagram_nums.push(1,2); break;
        case 5: enneagram_nums.push(7,8); break;
        case 6: enneagram_nums.push(3,9); break;
        case 7: enneagram_nums.push(1,5); break;
        case 8: enneagram_nums.push(2,5); break;
        case 9: enneagram_nums.push(3,6); break;
      }
    }
    if(filter_level==="midium" || filter_level==="low"){
      switch(user_enneagram){
        case 1: enneagram_nums.push(3,8); break;
        case 2: enneagram_nums.push(5,9); break;
        case 3: enneagram_nums.push(1,5); break;
        case 4: enneagram_nums.push(6,7); break;
        case 5: enneagram_nums.push(2,3); break;
        case 6: enneagram_nums.push(5,7); break;
        case 7: enneagram_nums.push(4,9); break;
        case 8: enneagram_nums.push(1,6); break;
        case 9: enneagram_nums.push(2,7); break;
      }
    }
    if(filter_level==="low"){
      switch(user_enneagram){
        case 1: enneagram_nums.push(2,9); break;
        case 2: enneagram_nums.push(1,3); break;
        case 3: enneagram_nums.push(2,4); break;
        case 4: enneagram_nums.push(3,5); break;
        case 5: enneagram_nums.push(4,6); break;
        case 6: enneagram_nums.push(5,7); break;
        case 7: enneagram_nums.push(6,8); break;
        case 8: enneagram_nums.push(7,9); break;
        case 9: enneagram_nums.push(8,1); break;
      }
    }
    return enneagram_nums;
  }

  onGoTap(){
    if(this.matchingLevel==null){
      alert("Please Select Filter Level For Friend Searching.");
    }
    else if(isNaN(parseInt(this.distanceValue))){
      alert("Please Input Integer number in distance for location radious.");
    }
    else{
      var user_enneagram_num;
      for(var user_id in this.firebaseService.thisUser){
        user_enneagram_num = this.firebaseService.thisUser[user_id]['enneagram']['number'];
      }
      console.log(this.firebaseService.thisUser);
      console.log(user_enneagram_num);
      var type = this.searchService.postType;
      var enneagram_nums = this.enneagram_filter(user_enneagram_num, this.matchingLevel);
      console.log(enneagram_nums);
      var origin_latitude = this.searchService.postLocation.position.latitude;
      var origin_longitude = this.searchService.postLocation.position.longitude;
      var distance = parseInt(this.distanceValue);
      this.firebaseService.search_queries(type, enneagram_nums, origin_latitude, origin_longitude, distance);

      this.routerExtensions.navigate(['/searchresult'], { animated: false });
      this._buttonRef.makeArrow();
    }
  }
}
