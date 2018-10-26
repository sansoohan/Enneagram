"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var image_source_1 = require("image-source");
var imagePicker = require("nativescript-imagepicker");
var dialogs = require("ui/dialogs");
var application_1 = require("tns-core-modules/application");
var radio_option_1 = require("../enneagram/radio-option");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(routerExtensions, _ngZone) {
        this.routerExtensions = routerExtensions;
        this._ngZone = _ngZone;
        this.isUpdating = false;
        this.isAddingNew = false;
        this.gender = "";
        this.isOnline = true;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.genderOptionButtons = [
            new radio_option_1.RadioOption("Gender", "male"),
            new radio_option_1.RadioOption("Gender", "female"),
        ];
    };
    ProfileComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ProfileComponent.prototype.onAddImageTap = function (imageType) {
        if (this.isOnline) {
            this.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    ProfileComponent.prototype.counter = function (i) {
        return new Array(i);
    };
    ProfileComponent.prototype.pickImage = function (imageType) {
        var _this = this;
        var context = imagePicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () { return context.present(); })
            .then(function (selection) { return selection.forEach(function (selectedAsset) {
            _this.getImageFilePath(selectedAsset, imageType).then(function (savedFile) {
                if (imageType === "profile") {
                    _this.currentProfileImageFilePath = savedFile;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageFilePath = savedFile;
                }
            });
            (new image_source_1.ImageSource()).fromAsset(selectedAsset).then(function (imageSource) {
                if (imageType === "profile") {
                    _this.currentProfileImageSource = imageSource;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageSource = imageSource;
                }
            });
        }); }).catch(function (errorMessage) { return console.log(errorMessage); });
    };
    ProfileComponent.prototype.getImageFilePath = function (imageAsset, imageType) {
        var _this = this;
        return new Promise(function (resolve) {
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
            if (application_1.android) {
                if (imageType === "profile") {
                    _this.currentProfileImageFilePath = imageAsset.android;
                }
                else if (imageType === "background") {
                    _this.currentBackgroundImageFilePath = imageAsset.android;
                }
                resolve(imageAsset.android);
            }
            // resolve(null);
        });
    };
    ProfileComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        switch (radioOption.group) {
            case "Gender":
                this.gender = radioOption.text;
                this.genderOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            core_1.NgZone])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFFL0QsNkNBQTJDO0FBRzNDLHNEQUF3RDtBQUN4RCxvQ0FBc0M7QUFDdEMsNERBQTREO0FBRTVELDBEQUF3RDtBQVF4RDtJQWlCQywwQkFBb0IsZ0JBQWtDLEVBQzlDLE9BQWU7UUFESCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzlDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFiZixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBU3JDLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFLbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNELG1DQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDMUIsSUFBSSwwQkFBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDakMsSUFBSSwwQkFBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7U0FDbkMsQ0FBQztJQUNILENBQUM7SUFFRCxnQ0FBSyxHQUFMLFVBQU0sSUFBc0I7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFQyx3Q0FBYSxHQUFiLFVBQWMsU0FBZ0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztJQUNGLENBQUM7SUFFRCxrQ0FBTyxHQUFQLFVBQVEsQ0FBUztRQUNo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QUFDLENBQUM7SUFDSixDQUFDO0lBRUQsNkNBQWtCLEdBQWxCLFVBQW1CLFdBQXdCO1FBQzFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUdELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7UUFDUixDQUFDO0lBQ0YsQ0FBQztJQXZJVyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBa0JxQyx5QkFBZ0I7WUFDckMsYUFBTTtPQWxCWCxnQkFBZ0IsQ0F3STVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhJRCxJQXdJQztBQXhJWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCIuLi9lbm5lYWdyYW0vcmFkaW8tb3B0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnUHJvZmlsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Byb2ZpbGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblx0aXNPbmxpbmU6IGJvb2xlYW47XHJcbiAgXHRzdGF0dXNDaGFuZ2VTdWJzY3I6IFN1YnNjcmlwdGlvbjtcclxuICBcclxuXHRwcml2YXRlIGlzVXBkYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIGlzQWRkaW5nTmV3OiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBjdXJyZW50UHJvZmlsZUltYWdlU291cmNlOiBJbWFnZVNvdXJjZTtcclxuXHRwcml2YXRlIGN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlUGF0aDogc3RyaW5nO1xyXG5cdHByaXZhdGUgY3VycmVudEJhY2tncm91bmRJbWFnZVNvdXJjZTogSW1hZ2VTb3VyY2U7XHJcblx0cHJpdmF0ZSBjdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGg6IHN0cmluZztcclxuXHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlZEltYWdlVXJsOiBzdHJpbmc7XHJcblx0Z2VuZGVyT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRnZW5kZXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcdFx0XHJcblx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmVcclxuXHQpIHsgXHJcblx0XHR0aGlzLmlzT25saW5lID0gdHJ1ZTtcclxuXHR9XHJcblx0bmdPbkluaXQoKSB7IFxyXG5cdFx0dGhpcy5nZW5kZXJPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJtYWxlXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJmZW1hbGVcIiksXHJcblx0XHRdO1xyXG5cdH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcbiAgXHJcbiAgXHRvbkFkZEltYWdlVGFwKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmlzT25saW5lKSB7XHJcblx0XHRcdHRoaXMucGlja0ltYWdlKGltYWdlVHlwZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y291bnRlcihpOiBudW1iZXIpIHtcclxuXHRcdHJldHVybiBuZXcgQXJyYXkoaSk7XHJcblx0fVxyXG5cclxuXHRwaWNrSW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IGltYWdlUGlja2VyLmNyZWF0ZSh7XHJcblx0XHRcdG1vZGU6IFwic2luZ2xlXCJcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnRleHRcclxuXHRcdFx0LmF1dGhvcml6ZSgpXHJcblx0XHRcdC50aGVuKCgpID0+IGNvbnRleHQucHJlc2VudCgpKVxyXG5cdFx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiBzZWxlY3Rpb24uZm9yRWFjaChcclxuXHRcdFx0XHQoc2VsZWN0ZWRBc3NldDogSW1hZ2VBc3NldCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5nZXRJbWFnZUZpbGVQYXRoKHNlbGVjdGVkQXNzZXQsIGltYWdlVHlwZSkudGhlbigoc2F2ZWRGaWxlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVBhdGggPSBzYXZlZEZpbGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlUGF0aCA9IHNhdmVkRmlsZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0KG5ldyBJbWFnZVNvdXJjZSgpKS5mcm9tQXNzZXQoc2VsZWN0ZWRBc3NldCkudGhlbigoaW1hZ2VTb3VyY2UpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYoaW1hZ2VUeXBlID09PSBcInByb2ZpbGVcIil7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZmlsZUltYWdlU291cmNlID0gaW1hZ2VTb3VyY2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihpbWFnZVR5cGUgPT09IFwiYmFja2dyb3VuZFwiKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KS5jYXRjaCgoZXJyb3JNZXNzYWdlOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSkpO1xyXG5cdH1cclxuXHJcblx0Z2V0SW1hZ2VGaWxlUGF0aChpbWFnZUFzc2V0LCBpbWFnZVR5cGU6c3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHQvLyBpZiAoaW9zKSB7IC8vIGNyZWF0ZSBmaWxlIGZyb20gaW1hZ2UgYXNzZXQgYW5kIHJldHVybiBpdHMgcGF0aFxyXG5cdFx0XHQvLyBcdGNvbnN0IHRlbXBGb2xkZXJQYXRoID0ga25vd25Gb2xkZXJzLnRlbXAoKS5nZXRGb2xkZXIoXCJuc2ltYWdlcGlja2VyXCIpLnBhdGg7XHJcblx0XHRcdC8vIFx0Y29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKHRlbXBGb2xkZXJQYXRoLCBgJHtEYXRlLm5vdygpfS5qcGdgKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBvcHRpb25zID0gUEhJbWFnZVJlcXVlc3RPcHRpb25zLm5ldygpO1xyXG5cclxuXHRcdFx0Ly8gXHRvcHRpb25zLnN5bmNocm9ub3VzID0gdHJ1ZTtcclxuXHRcdFx0Ly8gXHRvcHRpb25zLnZlcnNpb24gPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNWZXJzaW9uLkN1cnJlbnQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5kZWxpdmVyeU1vZGUgPSBQSEltYWdlUmVxdWVzdE9wdGlvbnNEZWxpdmVyeU1vZGUuSGlnaFF1YWxpdHlGb3JtYXQ7XHJcblx0XHRcdC8vIFx0b3B0aW9ucy5uZXR3b3JrQWNjZXNzQWxsb3dlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gXHRQSEltYWdlTWFuYWdlci5kZWZhdWx0TWFuYWdlcigpLnJlcXVlc3RJbWFnZURhdGFGb3JBc3NldE9wdGlvbnNSZXN1bHRIYW5kbGVyKGltYWdlQXNzZXQuaW9zLCBvcHRpb25zLCAobnNEYXRhOiBOU0RhdGEsIGRhdGFVVEk6IHN0cmluZywgb3JpZW50YXRpb246IFVJSW1hZ2VPcmllbnRhdGlvbiwgaW5mbzogTlNEaWN0aW9uYXJ5PGFueSwgYW55PikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0aWYgKGluZm8udmFsdWVGb3JLZXkoUEhJbWFnZVJlc3VsdElzSW5DbG91ZEtleSkpIHtcclxuXHRcdFx0Ly8gXHRcdFx0Ly8gSW1hZ2UgaXMgaW4gaUNsb3VkXHJcblx0XHRcdC8vIFx0XHRcdGlmIChuc0RhdGEpIHtcclxuXHRcdFx0Ly8gXHRcdFx0XHQvLyBJbWFnZSBpcyBkb3dubG9hZGVkXHJcblx0XHRcdC8vIFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFx0XHRcdFx0Ly8gSW1hZ2UgaXMgTk9UIGRvd25sb2FkZWRcclxuXHRcdFx0Ly8gXHRcdFx0fVxyXG5cdFx0XHQvLyBcdFx0fVxyXG5cclxuXHRcdFx0Ly8gXHRcdG5zRGF0YS53cml0ZVRvRmlsZUF0b21pY2FsbHkodGVtcEZpbGVQYXRoLCB0cnVlKTtcclxuXHRcdFx0Ly8gXHRcdHRoaXMuY3VycmVudEltYWdlRmlsZVBhdGggPSB0ZW1wRmlsZVBhdGg7XHJcblx0XHRcdC8vIFx0XHRyZXNvbHZlKHRlbXBGaWxlUGF0aCk7XHJcblx0XHRcdC8vIFx0fSk7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdGlmIChhbmRyb2lkKSB7IC8vIHJldHVybiBpbWFnZUFzc2V0LmFuZHJvaWQsIHNpbmNlIGl0J3MgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuXHRcdFx0XHRpZihpbWFnZVR5cGUgPT09IFwicHJvZmlsZVwiKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVQYXRoID0gaW1hZ2VBc3NldC5hbmRyb2lkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGltYWdlVHlwZSA9PT0gXCJiYWNrZ3JvdW5kXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50QmFja2dyb3VuZEltYWdlRmlsZVBhdGggPSBpbWFnZUFzc2V0LmFuZHJvaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlc29sdmUoaW1hZ2VBc3NldC5hbmRyb2lkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyByZXNvbHZlKG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VDaGVja2VkUmFkaW8ocmFkaW9PcHRpb246IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcclxuXHJcblx0XHRpZiAoIXJhZGlvT3B0aW9uLnNlbGVjdGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0c3dpdGNoIChyYWRpb09wdGlvbi5ncm91cCkge1xyXG5cdFx0XHRjYXNlIFwiR2VuZGVyXCI6XHJcblx0XHRcdFx0dGhpcy5nZW5kZXIgPSByYWRpb09wdGlvbi50ZXh0O1xyXG5cdFx0XHRcdHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==