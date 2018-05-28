import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-history-modal',
  templateUrl: 'history-modal.html',
})
export class HistoryModalPage {

  //initialise the array
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, private storage: Storage) {
    //get the list of items from storage
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

  //create a modal screen where the user can add a pokemon to their list of catches
  addItem(){
    let addModal = this.modalCtrl.create('AddCatchPage');
    //get the data returned by the modal and push it into an array that is stored via the storage module
    addModal.onDidDismiss(data => {
      if(data.pokemonName){
        this.items.push(data);
        this.storage.set('items', this.items);
        console.log(this.items);
      }
    });
    addModal.present();
  }

  //delete the item at a given index as selected by the user
  deleteItem(index){
    this.items.splice(index, 1);
    this.storage.set('items', this.items);
    console.log(this.items);
  }

  //view the item at a given index, showing all data relevent in a new modal view
  viewItem(index){
    let viewModal = this.modalCtrl.create('ViewModalPage', { data: this.items[index] });
    viewModal.present();
  }

}
