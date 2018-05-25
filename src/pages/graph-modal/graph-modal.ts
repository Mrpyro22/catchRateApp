import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-graph-modal',
  templateUrl: 'graph-modal.html',
})
export class GraphModalPage {

  @ViewChild('dataChart') canvas;
  chart: any;

  statistic: any;

  //scss change vars
  theme: any;
  className: any = 'circle';
  backgroundClass: any = 'scroll-content-ultraball';
  imgSrc: any = 'assets/imgs/pokeball.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage, private alertCtrl: AlertController) {
  }

  //called when the modal is loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphModalPage');

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: [1, 2, 3, 4, 5]
    })

    this.chart.update();
  }

  ionViewDidEnter(){
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

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    this.viewCtrl.dismiss();
  }

  updateChart(chartData, dataLabels, graphType, graphTitle){
    this.chart = new Chart(this.canvas.nativeElement, {
      type: graphType,
      data: {
        labels: dataLabels,
        datasets:[{
          labels: 'Max HP',
          data: chartData
        }]
      },
      options: {
        title: {
            display: true,
            text: graphTitle
        },
        legend: {
          display: false
        }
      }
    })

    this.chart.update();
    this.stopAnimation();
  }

  makeGraph(){
    this.startAnimation();
    if(this.statistic){
      if(this.statistic == 1){
        var chartData = [];
        var maxHP = 126;
        var dataLabels = [];
        for(var i = 0; i < 13; i++){
          var tempStat = this.calcCatchRate(maxHP, 1, 3, 1, 1);
          chartData.push(tempStat);
          dataLabels.push(maxHP);
          maxHP -= 10;
        }
        console.log(chartData);
        this.updateChart(chartData, dataLabels, 'line', 'Max HP vs. Chance to Catch');

      } else if (this.statistic == 2){
        var chartData = [];
        var currentHP = 126;
        var dataLabels = [];
        for(var i = 0; i < 13; i++){
          var tempStat = this.calcCatchRate(126, currentHP, 3, 1, 1);
          chartData.push(tempStat);
          dataLabels.push(currentHP);
          currentHP -= 10;
        }
        console.log(chartData);
        this.updateChart(chartData, dataLabels, 'line', 'Current HP vs. Chance to Catch');

      } else if (this.statistic == 3){
        var chartData = [];
        var pokeBall = [1, 1.5, 2, 3, 3.5, 4];
        for(var i = 0; i < 6; i++){
          var tempStat = this.calcCatchRate(126, 1, 3, pokeBall[i], 1);
          chartData.push(tempStat);
        }
        console.log(chartData);
        this.updateChart(chartData, pokeBall, 'bar', 'Pokeball vs. Chance to Catch');

      } else if (this.statistic == 4){
        var chartData = [];
        var status = [1, 1.5, 2];
        for(var i = 0; i < 3; i++){
          var tempStat = this.calcCatchRate(126, 1, 3, status[i], 1);
          chartData.push(tempStat);
        }
        console.log(chartData);
        this.updateChart(chartData, status, 'bar', 'Status vs. Chance to Catch');

      } else if (this.statistic == 5){
        var chartData = [];
        var catchRate = [3, 25, 30, 45, 60, 75, 90, 120, 150, 180, 200, 225, 255];
        for(var i = 0; i < 13; i++){
          var tempStat = this.calcCatchRate(126, 1, catchRate[i], 1, 1);
          chartData.push(tempStat);
        }
        console.log(chartData);
        this.updateChart(chartData, catchRate, 'line', 'Catch Rate vs. Chance to Catch');

      }
    } else {
      let alert = this.alertCtrl.create({
          title: 'No Statistic Selected',
          subTitle: 'Please select a statistic!',
          buttons: ['Dismiss']
        });
        //present the alert
        alert.present();
    }
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
    var avgAttempts = sumResults/lenResults;
    var percentChance = 1/avgAttempts*100;
    var percentageChance = percentChance.toFixed(2);
    return percentageChance
  }

  //function to stop the animation by changing the class of the button back to one without animations
  stopAnimation(){
    this.className = 'circle';
    console.log('stop animation');
  }

  //function to start the animation by changing the class of the button to one with css animations
  startAnimation(){
    this.className = 'rotate';
    console.log('start animation');
  }

}
