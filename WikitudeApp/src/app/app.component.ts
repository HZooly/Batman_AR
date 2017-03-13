/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "FZUWIqh0SS/xSJVT3svQmPqFRzKBNsts2lJMEriSOXrI/BPvy1pWqO7IUJV6vUg7inw3fC49cx73nO0tm89qNb4XpbF/qv2x64E6QMsqq2n3nHSprqEXYI3BP2tIVtNGBlrkEO91F4aIH/Tfcv+86wVEWU+rXfa27w06Tlym/6FTYWx0ZWRfX9dgXPtR6EEVmmXVSiso1CytJ0XRQyfX5wo9MMLodCDlgLeWrflGIVp2ekEu0aHbpc96kIcTlpRxtndt/FsvQ3yNQegbKqFe+uvxI6sqot3mK4ttYYiBCSz93q4Q4ITutfMtWQFmXnszB3ZSFPnyr1qbLnnMDbdPDM2J+ZhsqwhxzoDlmn7tTvEsL6n9BfzZ9uqFe6alwla/fTDy3eYjInwvay7s09jJjYYSuuyej4T98Em7bcOMXtbh2GBIe9sqSINSblaNDK/RBgabgmDpfL1WVgRriQEoEnn1ZvtwoucBU1i+xs4yZpwIvp9dNeLMHJHVg5PeauuD0/h8LMve2eZaCBTq78RHLUI3IaE/jyx5vXyFOGQIyAGeTQwD2s/NqdoXIZayo0Yq5ZIUBd2FClm3vCjQo2pgdlEPpX0HXLtbz9wSCm0nraJHcx2nieMQSyQGgLZlK6UL52yh147AXNtfAL1Q1uh4mmAbmxHiCsy9fImaPR/ZyCU=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
