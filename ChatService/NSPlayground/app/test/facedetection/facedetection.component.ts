import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { MLKitRecognizeTextResult, MLKitRecognizeTextResultBlock } from "nativescript-plugin-firebase/mlkit/textrecognition";
import { MLKitDetectFacesOnDeviceResult, MLKitDetectFacesResultFace } from "nativescript-plugin-firebase/mlkit/facedetection";
import { MLKitScanBarcodesOnDeviceResult } from "nativescript-plugin-firebase/mlkit/barcodescanning";
import { MLKitImageLabelingOnDeviceResult } from "nativescript-plugin-firebase/mlkit/imagelabeling";

@Component({
  moduleId: module.id,
  selector: 'Facedetection',
  templateUrl: './facedetection.component.html',
  styleUrls: ['./facedetection.component.scss']
})
export class FacedetectionComponent implements OnInit {
  
  constructor() {
    // registerElement("MLKitTextRecognition", () => require("nativescript-plugin-firebase/mlkit/textrecognition").MLKitTextRecognition);
    // registerElement("MLKitFaceDetection", () => require("nativescript-plugin-firebase/mlkit/facedetection").MLKitFaceDetection);
    // registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);
    registerElement("MLKitImageLabeling", () => require("nativescript-plugin-firebase/mlkit/imagelabeling").MLKitImageLabeling);
  }
  
  ngOnInit() { }

  labels: Array<{
    text: string;
    confidence: number;
  }>;
  onImageLabelingResult(scanResult: any): void {
    const value: MLKitImageLabelingOnDeviceResult = scanResult.value;
    this.labels = value.labels;
    this.labels.forEach(label => {
      console.log(label);
    });
  }
}
