// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAu9EISZI3ZI3FXqc3CW0gmoHou19rd8FQ',
    authDomain: 'chat-demo-5d3a7-5fded.firebaseapp.com',
    databaseURL: 'https://chat-demo-5d3a7-5fded.firebaseio.com',
    projectId: 'chat-demo-5d3a7-5fded',
    storageBucket: 'chat-demo-5d3a7.appspot.com',
    messagingSenderId: '47826805548'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
