import { ItemEventData } from "ui/list-view"
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
@Component({
	selector: "Friendmatching",
	moduleId: module.id,
	templateUrl: "./friendmatching.component.html",
	styleUrls: ['./friendmatching.component.css']
})
export class FriendmatchingComponent implements OnInit {
    public drawer: boolean;
    @ViewChild("childButton1") childButton1: ChildButton1Component;
    @ViewChild("childButton2") childButton2: ChildButton2Component;
    @ViewChild("childButton3") childButton3: ChildButton3Component;
    countries: { name: string, imageSrc: string }[] = [
        { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
        { name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png" },
        { name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png" },
        { name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png" },
        { name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png" },
        { name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png" },
        { name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png" },
        { name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png" },
        { name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png" },
        { name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png" },
        { name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png" },
        { name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png" },
        { name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png" },
        { name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png" },
        { name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png" },
    ];

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }

    
    constructor() {
        this.drawer = false;
    }

	ngOnInit(): void {
	}

    public onTap(args) {
        if (this.drawer) {
            this.drawer = false;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
        else {
            this.drawer = true;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
    }
}