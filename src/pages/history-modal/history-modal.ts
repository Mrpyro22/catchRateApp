import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history-modal',
  templateUrl: 'history-modal.html',
})
export class HistoryModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  //called when the modal is loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryModalPage');
  }

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    this.viewCtrl.dismiss();
  }

}
