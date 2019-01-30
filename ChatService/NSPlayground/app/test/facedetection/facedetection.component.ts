import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";

import firebase = require("nativescript-plugin-firebase");
import { MLKitRecognizeTextResult, MLKitRecognizeTextResultBlock } from "nativescript-plugin-firebase/mlkit/textrecognition";
import { MLKitDetectFacesOnDeviceResult, MLKitDetectFacesResultFace } from "nativescript-plugin-firebase/mlkit/facedetection";
import { BarcodeFormat, MLKitScanBarcodesOnDeviceResult } from "nativescript-plugin-firebase/mlkit/barcodescanning";
import { MLKitImageLabelingOnDeviceResult } from "nativescript-plugin-firebase/mlkit/imagelabeling";
import { MLKitImageLabelingCloudResult } from "nativescript-plugin-firebase/mlkit/imagelabeling";
import { MLKitLandmarkRecognitionCloudResult } from "nativescript-plugin-firebase/mlkit/landmarkrecognition";
import { MLKitCustomModelResult } from "nativescript-plugin-firebase/mlkit/custommodel";
import { ImageSource, fromFile } from "tns-core-modules/image-source";
import { Folder, path, knownFolders } from "tns-core-modules/file-system";

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




    //------------------------ firebase ml kit test ------------------
    textRecognition(){
        const folder: Folder = <Folder> knownFolders.currentApp();
        const folderPath: string = path.join(folder.path, "./images/Wege_der_parlamentarischen_Demokratie.jpg");
        const imageSource: ImageSource = <ImageSource> fromFile(folderPath);

        console.log(imageSource);
        firebase.mlkit.textrecognition.recognizeTextOnDevice({
            image: imageSource // a NativeScript Image or ImageSource, see the demo for examples
        }).then((result: MLKitRecognizeTextResult) => { // just look at this type to see what else is returned
            console.log(result.text ? result.text : "");
        }).catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }

    faceDetection(){
        const folder: Folder = <Folder> knownFolders.currentApp();
        const folderPath: string = path.join(folder.path, "./images/sansoo.jpg");
        const imageSource: ImageSource = <ImageSource> fromFile(folderPath);
        firebase.mlkit.facedetection.detectFacesOnDevice({
            image: imageSource, // a NativeScript Image or ImageSource, see the demo for examples
            detectionMode: "accurate", // default "fast"
            enableFaceTracking: true, // default false
            minimumFaceSize: 0.25 // default 0.1 (which means the face must be at least 10% of the image)
        })
        .then((result: MLKitDetectFacesOnDeviceResult) => console.log(JSON.stringify(result.faces)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }
    barcodeScanning(){
        const folder: Folder = <Folder> knownFolders.currentApp();
        const folderPath: string = path.join(folder.path, "./images/qrcode.png");
        const imageSource: ImageSource = <ImageSource> fromFile(folderPath);
        firebase.mlkit.barcodescanning.scanBarcodesOnDevice({
            image: imageSource,
            formats: [BarcodeFormat.QR_CODE, BarcodeFormat.CODABAR] // limit recognition to certain formats (faster), or leave out entirely for all formats (default)
        })
        .then((result: MLKitScanBarcodesOnDeviceResult) => console.log(JSON.stringify(result.barcodes)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));

        const folderPath2: string = path.join(folder.path, "./images/EAN-Obst.jpg");
        const imageSource2: ImageSource = <ImageSource> fromFile(folderPath2);
        firebase.mlkit.barcodescanning.scanBarcodesOnDevice({
            image: imageSource2,
            formats: [BarcodeFormat.EAN_13] // limit recognition to certain formats (faster), or leave out entirely for all formats (default)
        })
        .then((result: MLKitScanBarcodesOnDeviceResult) => console.log(JSON.stringify(result.barcodes)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }
    imageLabeling(){
        const folder: Folder = <Folder> knownFolders.currentApp();
        const folderPath: string = path.join(folder.path, "./images/1024px-Valais_Cup_2013_-_OM-FC_Porto_13-07-2013_-_Brice_Samba_en_extension.jpg");
        const imageSource: ImageSource = <ImageSource> fromFile(folderPath);

        firebase.mlkit.imagelabeling.labelImageOnDevice({
            image: imageSource,
            confidenceThreshold: 0.6 // this will only return labels with at least 0.6 (60%) confidence. Default 0.5.
        })
        .then((result: MLKitImageLabelingOnDeviceResult) => console.log(JSON.stringify(result.labels)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));

        firebase.mlkit.imagelabeling.labelImageCloud({
            image: imageSource,
            modelType: "stable", // either "latest" or "stable" (default "stable")
            maxResults: 5 // default 10
        })
        .then((result: MLKitImageLabelingCloudResult) => console.log(JSON.stringify(result.labels)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }
    landmarkRecognition(){
        const folder: Folder = <Folder> knownFolders.currentApp();
        const folderPath: string = path.join(folder.path, "./images/680px-Bruegge_View_from_Rozenhoedkaai.jpg");
        const imageSource: ImageSource = <ImageSource> fromFile(folderPath);
        firebase.mlkit.landmarkrecognition.recognizeLandmarksCloud({
            image: imageSource,
            modelType: "latest", // either "latest" or "stable" (default "stable")
            maxResults: 8 // default 10
        })
        .then((result: MLKitLandmarkRecognitionCloudResult) => console.log(JSON.stringify(result.landmarks)))
        .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }
    customModel(){
        firebase.mlkit.custommodel.useCustomModel({
                image: imageSource, // a NativeScript Image or ImageSource, see the demo for examples
                maxResults: 10, // default 5 (limit numbers to this amount of results)
                localModelFile: "~/custommodel/inception/inception_v3_quant.tflite", // see the demo, where the model lives in app/custommodel/etc..
                labelsFile: "~/custommodel/inception/inception_labels.txt",
                modelInput: [{ // Array<TNSCustomModelInput>
                    shape: [1, 299, 299, 3], // see the tips above
                    type: "QUANT" // for now, must be "QUANT" (and you should use a 'quantized' model (not 'float'))
                }]
            })
            .then((result: MLKitCustomModelResult) => console.log(JSON.stringify(result.result)))
            .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
    }
}
