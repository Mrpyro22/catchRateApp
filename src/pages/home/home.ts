import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //scss change vars
  theme: any;
  backgroundClass: any = 'scroll-content-ultraball';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private storage: Storage,
  private iab: InAppBrowser) {
  }

  ionViewDidEnter(){
    this.storage.get("theme").then((val) => {
      this.theme = val;
      console.log(this.theme);
      if(this.theme == 1){
        this.backgroundClass = 'scroll-content-pokeball';
      }
      else if(this.theme == 2){
        this.backgroundClass = 'scroll-content-greatball';
      }
      else if(this.theme == 3){
        this.backgroundClass = 'scroll-content-ultraball';
      }
      else if(this.theme == 4){
        this.backgroundClass = 'scroll-content-masterball';
      }
      else{
        this.backgroundClass = 'scroll-content-pokeball';
      }
    });
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

  //generates a modal for the my catches (history) screen
  displayHistory(){
    //create the modal and present it
    const historyModal = this.modalCtrl.create('HistoryModalPage');
    historyModal.present();
  }

  openStatCalc(){
    const browser = this.iab.create('http://www.psypokes.com/dex/stats.php');
    browser.show()
  }

  openAlgorithms(){
    const browser = this.iab.create('https://www.dragonflycave.com/mechanics/gen-iii-iv-capturing');
    browser.show()
  }

}
