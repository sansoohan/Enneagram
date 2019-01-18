"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var FacedetectionComponent = /** @class */ (function () {
    function FacedetectionComponent() {
        // registerElement("MLKitTextRecognition", () => require("nativescript-plugin-firebase/mlkit/textrecognition").MLKitTextRecognition);
        // registerElement("MLKitFaceDetection", () => require("nativescript-plugin-firebase/mlkit/facedetection").MLKitFaceDetection);
        // registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);
        element_registry_1.registerElement("MLKitImageLabeling", function () { return require("nativescript-plugin-firebase/mlkit/imagelabeling").MLKitImageLabeling; });
    }
    FacedetectionComponent.prototype.ngOnInit = function () { };
    FacedetectionComponent.prototype.onImageLabelingResult = function (scanResult) {
        var value = scanResult.value;
        this.labels = value.labels;
        this.labels.forEach(function (label) {
            console.log(label);
        });
    };
    FacedetectionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Facedetection',
            templateUrl: './facedetection.component.html',
            styleUrls: ['./facedetection.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FacedetectionComponent);
    return FacedetectionComponent;
}());
exports.FacedetectionComponent = FacedetectionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWRldGVjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWNlZGV0ZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwRUFBd0U7QUFZeEU7SUFFRTtRQUNFLHFJQUFxSTtRQUNySSwrSEFBK0g7UUFDL0gsbUlBQW1JO1FBQ25JLGtDQUFlLENBQUMsb0JBQW9CLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDLGtCQUFrQixFQUE5RSxDQUE4RSxDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUVELHlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBTWQsc0RBQXFCLEdBQXJCLFVBQXNCLFVBQWU7UUFDbkMsSUFBTSxLQUFLLEdBQXFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXJCVSxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQzlDLENBQUM7O09BQ1csc0JBQXNCLENBc0JsQztJQUFELDZCQUFDO0NBQUEsQUF0QkQsSUFzQkM7QUF0Qlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNTEtpdFJlY29nbml6ZVRleHRSZXN1bHQsIE1MS2l0UmVjb2duaXplVGV4dFJlc3VsdEJsb2NrIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWxraXQvdGV4dHJlY29nbml0aW9uXCI7XG5pbXBvcnQgeyBNTEtpdERldGVjdEZhY2VzT25EZXZpY2VSZXN1bHQsIE1MS2l0RGV0ZWN0RmFjZXNSZXN1bHRGYWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWxraXQvZmFjZWRldGVjdGlvblwiO1xuaW1wb3J0IHsgTUxLaXRTY2FuQmFyY29kZXNPbkRldmljZVJlc3VsdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2JhcmNvZGVzY2FubmluZ1wiO1xuaW1wb3J0IHsgTUxLaXRJbWFnZUxhYmVsaW5nT25EZXZpY2VSZXN1bHQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9tbGtpdC9pbWFnZWxhYmVsaW5nXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0ZhY2VkZXRlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmFjZWRldGVjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZhY2VkZXRlY3Rpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGYWNlZGV0ZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHJlZ2lzdGVyRWxlbWVudChcIk1MS2l0VGV4dFJlY29nbml0aW9uXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L3RleHRyZWNvZ25pdGlvblwiKS5NTEtpdFRleHRSZWNvZ25pdGlvbik7XG4gICAgLy8gcmVnaXN0ZXJFbGVtZW50KFwiTUxLaXRGYWNlRGV0ZWN0aW9uXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2ZhY2VkZXRlY3Rpb25cIikuTUxLaXRGYWNlRGV0ZWN0aW9uKTtcbiAgICAvLyByZWdpc3RlckVsZW1lbnQoXCJNTEtpdEJhcmNvZGVTY2FubmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21sa2l0L2JhcmNvZGVzY2FubmluZ1wiKS5NTEtpdEJhcmNvZGVTY2FubmVyKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJNTEtpdEltYWdlTGFiZWxpbmdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWxraXQvaW1hZ2VsYWJlbGluZ1wiKS5NTEtpdEltYWdlTGFiZWxpbmcpO1xuICB9XG4gIFxuICBuZ09uSW5pdCgpIHsgfVxuXG4gIGxhYmVsczogQXJyYXk8e1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBjb25maWRlbmNlOiBudW1iZXI7XG4gIH0+O1xuICBvbkltYWdlTGFiZWxpbmdSZXN1bHQoc2NhblJlc3VsdDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWU6IE1MS2l0SW1hZ2VMYWJlbGluZ09uRGV2aWNlUmVzdWx0ID0gc2NhblJlc3VsdC52YWx1ZTtcbiAgICB0aGlzLmxhYmVscyA9IHZhbHVlLmxhYmVscztcbiAgICB0aGlzLmxhYmVscy5mb3JFYWNoKGxhYmVsID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGxhYmVsKTtcbiAgICB9KTtcbiAgfVxufVxuIl19