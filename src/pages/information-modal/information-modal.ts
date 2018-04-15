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

  //called when the modal is loaded
  ionViewDidLoad() {
    //gets the generation number from the function that created the modal by retrieving the 'data' object
    this.generationNumber = this.navParams.get('data');

    //check to see which generation is being called. the title of the modal and the text within it changes based on which generation number was selected
    //generation 4
    if(this.generationNumber == "IV"){
      this.title = "Gen IV Information";
      this.info = "How to use the Generation IV Calculator:";

    //generation 5
    } else if (this.generationNumber == "V"){
      this.title = "Gen V Information";
      this.info = "How to use the Generation V Calculator:";

      //generation 6
    } else if (this.generationNumber == "VI"){
      this.title = "Gen VI Information";
      this.info = "How to use the Generation VI Calculator:";

    }
  }

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    this.viewCtrl.dismiss();
  }

}
