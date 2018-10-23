import { Component, OnInit,NgZone } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ImageSource } from "image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import { Subscription } from "rxjs";
import * as imagePicker from "nativescript-imagepicker";
import * as dialogs from "ui/dialogs";
import { android, ios } from "tns-core-modules/application";
import { knownFolders, path } from "file-system";


@Component({
  moduleId: module.id,
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	isOnline: boolean;
  	statusChangeSubscr: Subscription;
  
	private isUpdating: boolean = false;
	private isAddingNew: boolean = false;
	private currentProfileImageSource: ImageSource;
	private currentProfileImageFilePath: string;
	private currentBackgroundImageSource: ImageSource;
	private currentBackgroundImageFilePath: string;

	private removedImageUrl: string;
	constructor(private routerExtensions: RouterExtensions,
	private _ngZone: NgZone
	) { 
		this.isOnline = true;
	}
	ngOnInit() { }

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}
  
  	onAddImageTap(imageType:string): void {
		if (this.isOnline) {
			this.pickImage(imageType);
		} else {
			dialogs.alert("Cannot upload images in offline mode");
		}
	}

	counter(i: number) {
		return new Array(i);
	}

	pickImage(imageType:string): void {
		const context = imagePicker.create({
			mode: "single"
		});

		context
			.authorize()
			.then(() => context.present())
			.then((selection) => selection.forEach(
				(selectedAsset: ImageAsset) => {
					this.getImageFilePath(selectedAsset, imageType).then((savedFile: string) => {
						if(imageType === "profile"){
							this.currentProfileImageFilePath = savedFile;
						}
						else if(imageType === "background"){
							this.currentBackgroundImageFilePath = savedFile;
						}
					});

					(new ImageSource()).fromAsset(selectedAsset).then((imageSource) => {
						if(imageType === "profile"){
							this.currentProfileImageSource = imageSource;
						}
						else if(imageType === "background"){
							this.currentBackgroundImageSource = imageSource;
						}
					});
				})
			).catch((errorMessage: any) => console.log(errorMessage));
	}

	getImageFilePath(imageAsset, imageType:string): Promise<string> {
		return new Promise((resolve) => {
			// if (ios) { // create file from image asset and return its path
			// 	const tempFolderPath = knownFolders.temp().getFolder("nsimagepicker").path;
			// 	const tempFilePath = path.join(tempFolderPath, `${Date.now()}.jpg`);
			// 	const options = PHImageRequestOptions.new();

			// 	options.synchronous = true;
			// 	options.version = PHImageRequestOptionsVersion.Current;
			// 	options.deliveryMode = PHImageRequestOptionsDeliveryMode.HighQualityFormat;
			// 	options.networkAccessAllowed = false;

			// 	PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(imageAsset.ios, options, (nsData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
			// 		if (info.valueForKey(PHImageResultIsInCloudKey)) {
			// 			// Image is in iCloud
			// 			if (nsData) {
			// 				// Image is downloaded
			// 			} else {
			// 				// Image is NOT downloaded
			// 			}
			// 		}

			// 		nsData.writeToFileAtomically(tempFilePath, true);
			// 		this.currentImageFilePath = tempFilePath;
			// 		resolve(tempFilePath);
			// 	});
			// }

			if (android) { // return imageAsset.android, since it's the path of the file
				if(imageType === "profile"){
					this.currentProfileImageFilePath = imageAsset.android;
				}
				else if(imageType === "background"){
					this.currentBackgroundImageFilePath = imageAsset.android;
				}
				resolve(imageAsset.android);
			}
			// resolve(null);
		});
	}
}
