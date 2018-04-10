import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-generation-iv',
  templateUrl: 'generation-iv.html',
  providers: [
        ScreenOrientation
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private alertCtrl: AlertController) {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerationIvPage');
  }

  shakes(b){
  	var numberOfShakes = 0
  	for(var i = 0; i < 4; i++){
      var randomInt = Math.floor(Math.random() * (65535 - 0 + 1)) + 0;
  		if(randomInt < b){
        numberOfShakes++;
      }
    }
  	return numberOfShakes;
  }

  generateB(a){
    return 1048560/((16711680/a)**0.5)**0.5;
  }

  calcCatchRate(maxHP, currentHP, catchRate, pokeball, status){

    var b = this.generateB(((3.0*maxHP-2.0*currentHP)*catchRate*pokeball)/(3.0*maxHP)*status);
    var tests = 10000;

    var results = [];
    var lenResults = 0;
    var sumResults = 0;

    for(var i = 0; i < tests; i++) {
    	var test = this.shakes(b);
    	var numberOfTries = 1;
    	while(test < 4){
    		numberOfTries++;
    		test = this.shakes(b);
      }
    	results.push(numberOfTries);
      lenResults++;
    }

    for(i = 0; i < lenResults; i++){
      sumResults += results[i];
    }

    this.avgAttempts = sumResults/lenResults;
    this.percentChance = 1/this.avgAttempts*100;
    this.percentChance = this.percentChance.toFixed(2);

    this.displayResults();
  }

  checkVariables(){
    if(this.maxHP && this.currentHP && this.catchRate && this.pokeball && this.status){
      let getClass = document.getElementsByClassName('circle')[0];
      getClass.classList.remove("circle");
      getClass.classList.add("rotate");
      this.calcCatchRate(this.maxHP, this.currentHP, this.catchRate, this.pokeball, this.status);
    }
    else{
      this.invalidVar();
    }
  }

  invalidVar(){
    let alert = this.alertCtrl.create({
        title: 'Invalid Calculation',
        subTitle: 'You may have missed an input field...',
        buttons: ['Dismiss']
      });
      alert.present();
  }

  displayResults(){
    let alert = this.alertCtrl.create({
      title: 'Results',
      message: 'Chance to catch: '+this.percentChance+'%'+'<br>'+'Average attempts to catch: '+this.avgAttempts,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.stopAnimation();
          }
        },
      ]
    });
    alert.present();
  }

  stopAnimation(){
    let getClass = document.getElementsByClassName('rotate')[0];
    getClass.classList.remove("rotate");
    getClass.classList.add("circle");
  }

}
