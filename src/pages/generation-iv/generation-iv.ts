import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-generation-iv',
  templateUrl: 'generation-iv.html',
  providers: [

    ]
})
export class GenerationIvPage {

  //inputs
  maxHP: any;
  currentHP: any;
  catchRate: any;
  pokeball: any;
  status: any;

  //other vars
  avgAttempts: any;
  percentChance: any;

  //scss change vars
  theme: any;
  className: any = 'circle';
  backgroundClass: any = 'scroll-content-ultraball';
  imgSrc: any = 'assets/imgs/pokeball.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private storage: Storage) {

    this.storage.get("theme").then((val) => {
      this.theme = val;
      console.log(this.theme);
      if(this.theme == 1){
        this.imgSrc = 'assets/imgs/pokeball.png';
        this.backgroundClass = 'scroll-content-pokeball';
      }
      else if(this.theme == 2){
        this.imgSrc = 'assets/imgs/greatball.png';
        this.backgroundClass = 'scroll-content-greatball';
      }
      else if(this.theme == 3){
        this.imgSrc = 'assets/imgs/ultraball.png';
        this.backgroundClass = 'scroll-content-ultraball';
      }
      else if(this.theme == 4){
        this.imgSrc = 'assets/imgs/masterball.png';
        this.backgroundClass = 'scroll-content-masterball';
      }
      else{
        this.imgSrc = 'assets/imgs/pokeball.png';
        this.backgroundClass = 'scroll-content-pokeball';
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerationIvPage');
  }

  ionViewWillEnter(){
    console.log("runs");
    this.storage.get("theme").then((val) => {
      this.theme = val;
      console.log(this.theme);
      if(this.theme == 1){
        this.imgSrc = 'assets/imgs/pokeball.png';
        this.backgroundClass = 'scroll-content-pokeball';
      }
      else if(this.theme == 2){
        this.imgSrc = 'assets/imgs/greatball.png';
        this.backgroundClass = 'scroll-content-greatball';
      }
      else if(this.theme == 3){
        this.imgSrc = 'assets/imgs/ultraball.png';
        this.backgroundClass = 'scroll-content-ultraball';
      }
      else if(this.theme == 4){
        this.imgSrc = 'assets/imgs/masterball.png';
        this.backgroundClass = 'scroll-content-masterball';
      }
      else{
        this.imgSrc = 'assets/imgs/pokeball.png';
        this.backgroundClass = 'scroll-content-pokeball';
      }
    });
  }

  //shakes function
  //returns number of shakes on an attempted catch. 4 shakes is a catch, any less is a failed attempt.
  shakes(b){
    //initialise numberOfShakes to 0
  	var numberOfShakes = 0;
    // make four attemps, one for each shake
  	for(var i = 0; i < 4; i++){
      //generate a random number given by the algorithm used in the pokemon games
      var randomInt = Math.floor(Math.random() * (65535 - 0 + 1)) + 0;
      //compate the number to b to determine if the attempt was a success
  		if(randomInt < b){
        //if the attempt is successful, increment numberOfShakes
        numberOfShakes++;
      }
    }
    //return the number of shakes
  	return numberOfShakes;
  }

  //generates the b value used to determine success of shakes
  generateB(a){
    //generate b using the algorithm used in the pokemon games
    return 1048560/((16711680/a)**0.5)**0.5;
  }

  //function to determine the average attempts to catch and percentage change to catch a pokemon based on parameters
  calcCatchRate(maxHP, currentHP, catchRate, pokeball, status){
    //generate b by calling the generate b function, provided the conditions to catch the pokemon
    var b = this.generateB(((3.0*maxHP-2.0*currentHP)*catchRate*pokeball)/(3.0*maxHP)*status);
    //tests variable gives the number of times the catch will be calculated. this many tests will be done and the average will be used to give results
    var tests = 10000;
    //results list stores all the tests to be averaged later
    var results = [];

    //variables used for averaging
    //lenResults keeps track of the length of the results
    var lenResults = 0;
    //sum Results stores the sum of all the results
    var sumResults = 0;

    //loop that attempts to catch (test) times
    for(var i = 0; i < tests; i++) {
      // a test is conducted, if 4 shakes are achieved, the capture is a success, otherwise a loop will carry out tests until a success is obtained
    	var test = this.shakes(b);
      // numberOfTries tracks how many capture attempts have been made. initialised to 1 as a single test has already been done
    	var numberOfTries = 1;
      // while test is less than 4, and therefore not a success, keep attempting to catch until the attempt is successful
    	while(test < 4){
        //for each new test, increment numberOfTries and then call the test function, shakes()
    		numberOfTries++;
    		test = this.shakes(b);
      }
      //push the results into the results list
    	results.push(numberOfTries);
      //increment the length of the results
      lenResults++;
    }

    //sum all the tests in the results list
    for(i = 0; i < lenResults; i++){
      sumResults += results[i];
    }

    //calculate the average attempts and percentage change, and round the percentage change to 2 decimal places.
    this.avgAttempts = sumResults/lenResults;
    this.percentChance = 1/this.avgAttempts*100;
    this.percentChance = this.percentChance.toFixed(2);

    //call the function to display the results
    this.displayResults();
  }

  //check that all the data fields have been filled in so that no errors occur when calculating
  checkVariables(){
    if(this.maxHP && this.currentHP && this.catchRate && this.pokeball && this.status){
      //if all the varaiables are valid, call the function to start the animation of the calculate button and the function to calculate the catch rate
      this.startAnimation();
      this.calcCatchRate(this.maxHP, this.currentHP, this.catchRate, this.pokeball, this.status);
    }
    else{
      //if any fields are invalid, call the function to display an alert saying so
      this.invalidVar();
    }
  }

  //function creates an alert that warns of un-filled data fields
  invalidVar(){
    //create an alert
    let alert = this.alertCtrl.create({
        title: 'Invalid Calculation',
        subTitle: 'You may have missed an input field...',
        buttons: ['Dismiss']
      });
      //present the alert
      alert.present();
  }

  //function that displays the results of the calculations and stops the animation when dismissed
  displayResults(){
    //create an alert
    let alert = this.alertCtrl.create({
      title: 'Results',
      message: 'Chance to catch: '+this.percentChance+'%'+'<br>'+'Average attempts to catch: '+this.avgAttempts,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            //when dismiss is clicked, call a function to stop the animation of the calculate button
            this.stopAnimation();
          }
        },
      ]
    });
    //present the alert
    alert.present();
  }

  //function to stop the animation by changing the class of the button back to one without animations
  stopAnimation(){
    this.className = 'circle';
  }

  //function to start the animation by changing the class of the button to one with css animations
  startAnimation(){
    this.className = 'rotate';
  }

}
