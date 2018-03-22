import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //inputs
  maxHP: any;
  currentHP: any;
  catchRate: any;
  pokeball: any;
  status: any;

  //other vars
  avgAttempts: any;
  percentChance: any;

  //lockout

  constructor(public navCtrl: NavController) {

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
    var tests = 1000;

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
    // this.percentChance = Math.round((1/this.avgAttempts)*100);
    this.percentChance = 1/this.avgAttempts*100;
    this.percentChance = this.percentChance.toFixed(2);
  }

  checkVariables(){
    if(this.maxHP && this.currentHP && this.catchRate && this.pokeball && this.status){
      this.calcCatchRate(this.maxHP, this.currentHP, this.catchRate, this.pokeball, this.status);
    }
    else{
      this.invalidVar();
    }
  }

  invalidVar(){

  }

}
