import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InformationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information-modal',
  templateUrl: 'information-modal.html',
})
export class InformationModalPage {

  title: any;
  info: any;
  generationNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.generationNumber = this.navParams.get('data');

    if(this.generationNumber == "IV"){
      this.title = "Gen IV Information";
      this.info = "How to use the Generation IV Calculator:";

    } else if (this.generationNumber == "V"){
      this.title = "Gen V Information";
      this.info = "How to use the Generation V Calculator:";

    } else if (this.generationNumber == "VI"){
      this.title = "Gen VI Information";
      this.info = "How to use the Generation VI Calculator:";

    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
