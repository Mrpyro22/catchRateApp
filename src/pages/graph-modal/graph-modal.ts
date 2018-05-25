import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-graph-modal',
  templateUrl: 'graph-modal.html',
})
export class GraphModalPage {

  @ViewChild('dataChart') canvas;
  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
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

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    this.viewCtrl.dismiss();
  }

  onChange(){
    
  }

}
