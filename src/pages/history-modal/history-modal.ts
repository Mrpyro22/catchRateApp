import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-history-modal',
  templateUrl: 'history-modal.html',
})
export class HistoryModalPage {

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, private storage: Storage) {
    this.storage.get("items").then((val) => {
      this.items = val;
      console.log(this.items);
    });
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

  addItem(){
    let addModal = this.modalCtrl.create('AddCatchPage');
    addModal.onDidDismiss(data => {
      if(data.pokemonName){
        this.items.push(data);
        this.storage.set('items', this.items);
        console.log(this.items);
      }
    });
    addModal.present();
  }

  deleteItem(index){
    this.items.splice(index, 1);
    this.storage.set('items', this.items);
    console.log(this.items);
  }

}
