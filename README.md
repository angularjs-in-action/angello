# Angello

Welcome to Angello, the AngularJS storyboard! Based off the [Trello App](https://trello.com), this repo holds the code for the app built in the [AngularJS in Action](http://www.manning.com/bford/) book. Read on to get started!

## Prerequisites
You'll need [`git`](http://git-scm.com/), a web browser, and a local web server.

## Running Angello

#### Install it
Run the following command to check out a local copy of the code.

`git clone git@github.com:angularjs-in-action/angello.git`

#### Set up the backend
There are two options for the backend of the app: NodeJS and Firebase.

##### Using Firebase

1. If you do not have one already, set up an account with [firebase.com](https://www.firebase.com/)
![Firebase Home Page](https://cloud.githubusercontent.com/assets/590361/4364837/749ca694-42a4-11e4-9fa3-d19f25cb1bab.png)<br>
2. Create an app (name it whatever you want)
![Create Firebase App](https://cloud.githubusercontent.com/assets/590361/4364985/dbc240b6-42a6-11e4-81f2-d9a254f25ffd.png)<br>
3. Click on your new app's URL <br>
![Firebase App](https://cloud.githubusercontent.com/assets/590361/4365468/c162bca8-42ad-11e4-91b5-7eb81669748a.png)<br>
4. Click on the `Login & Auth` section of the resulting page on the left hand side, and check the checkbox that says `Enable Email & Password Authentication`
![Enable Auth](https://cloud.githubusercontent.com/assets/590361/4365643/0027bb0c-42b1-11e4-9b21-45249fcb6eb7.png)<br>
5. Copy the URL from the address bar of the page you are on
6. Open the file `/client/src/angello/app/services/EndpointConfigService.js` and update the `URI` property of the `firebase` object to your copied URL.
![Edit File](https://cloud.githubusercontent.com/assets/590361/4365499/45762980-42ae-11e4-99f7-58feeb27b934.png)<br>

You're done! Skip to the *Start it* section

##### Using NodeJS
1. Go to the [Angello Express API](https://github.com/angularjs-in-action/angello-express-api) and follow the directions to get the API running.
2. Once the API is running, open `/client/src/angello/app/services/EndpointConfigService.js` in a text editor, uncomment `// .constant('CURRENT_BACKEND', 'node')` and comment out `.constant('CURRENT_BACKEND', 'firebase')`.
![Set the backend](https://cloud.githubusercontent.com/assets/590361/4444425/ce28c818-47f0-11e4-9457-d95a20e9450d.png)

You're done! Go ahead and move on to the *Start it* section.
 

#### Start it
If you have a local web server that you use, simply serve the client directory of the project. If you do not, you will need to install [Node.js and NPM](https://nodejs.org/download/).

Once you have installed Node.js and NPM, run the following commands in your terminal. Make sure you are in the `angello` directory.

```
npm install -g serve
serve client/
```

These commands install the serve package on your system globally and then serve the client directory of the angello application for your viewing pleasure.

#### Use it!
At this point, you should see the login portion of the site.
![Angello Login Screen](https://cloud.githubusercontent.com/assets/590361/4364466/36bf22d8-42a0-11e4-91e5-ab5bc28a20b0.png)
We've made it to the fun part! Go ahead and play around with the app and see what it does. Read on for a tour of the app.

**Registering a client**
![Registering Client](https://cloud.githubusercontent.com/assets/590361/4366861/92813990-42c7-11e4-92dd-ce584f140c33.png)

**Adding a user to the storyboard**
![Adding User](https://cloud.githubusercontent.com/assets/590361/4366972/3d07b13a-42ca-11e4-8864-4fd67e7f8970.png)
![User Added](https://cloud.githubusercontent.com/assets/590361/4366999/dde83304-42ca-11e4-8100-20260f70613f.png)

**Adding a story**
![Adding a story](https://cloud.githubusercontent.com/assets/590361/4367011/29a0ed5e-42cb-11e4-99ad-be5e285e642c.png)
![Story added](https://cloud.githubusercontent.com/assets/590361/4367015/520e2b26-42cb-11e4-9231-fcb66a21d236.png)

**View stories for a specific user**
![User Stories](https://cloud.githubusercontent.com/assets/590361/4367026/86e69388-42cb-11e4-94d5-e5df77ea8699.png)

**View stories by status**
![Stories by status](https://cloud.githubusercontent.com/assets/590361/4367048/ed59af9c-42cb-11e4-9769-b5ee61aee5e9.png)

**View stories by type**
![Stories by type](https://cloud.githubusercontent.com/assets/590361/4367086/a17ce8c2-42cc-11e4-99f0-432835c3c8f9.png)
## License
MIT
