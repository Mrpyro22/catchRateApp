import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  displayInfoIV(){
    var generationNumber = 'IV';
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  displayInfoV(){
    var generationNumber = 'V';
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  displayInfoVI(){
    var generationNumber = 'VI';
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  displayGraphs(){
    const graphModal = this.modalCtrl.create('GraphModalPage');
    graphModal.present();
  }

}
