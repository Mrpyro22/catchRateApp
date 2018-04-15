import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  //generates a modal for generation IV. Information modal for all generations uses the same modal but different data is passed to the modal
  //this change in data changes the content on the modal page
  displayInfoIV(){
    //sets the generationNumber variable to that of the generations info being displayed in the modal
    var generationNumber = 'IV';
    //create the modal and pass in the generation number
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  //generates a modal for generation V
  displayInfoV(){
    //sets the generationNumber variable to that of the generations info being displayed in the modal
    var generationNumber = 'V';
    //create the modal and pass in the generation number
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  //generates a modal for generation VI
  displayInfoVI(){
    //sets the generationNumber variable to that of the generations info being displayed in the modal
    var generationNumber = 'VI';
    //create the modal and pass in the generation number
    const infoModal = this.modalCtrl.create('InformationModalPage', { data: generationNumber });
    infoModal.present();
  }

  //generates a modal for the graphs and data screen
  displayGraphs(){
    //create the modal and present it
    const graphModal = this.modalCtrl.create('GraphModalPage');
    graphModal.present();
  }

}
