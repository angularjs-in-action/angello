// I recommend using a Firebase URI as it is free and easy to set up 
angular.module('Angello.Common')
    .constant('ENDPOINT_URI', {BACKEND: "firebase", URI: "https://angello.firebaseio.com/"});
    // .constant('ENDPOINT_URI', {BACKEND: "node", URI: "http://localhost:3000/"});