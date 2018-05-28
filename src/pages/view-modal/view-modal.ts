import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-view-modal',
  templateUrl: 'view-modal.html',
})
export class ViewModalPage {

  //scss variables
  theme: any;
  backgroundClass: any = 'scroll-content-ultraball';
  //variables for the data being displayed
  info: any = {pokemonName: '', level: '', currentHP: '', attempts: '',
    status: '', game: '', date: '', image: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage) {
  }

  //get the data for the item being displayed
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewModalPage');
    this.info = this.navParams.get('data');
    console.log('yes');
  }

  //retrieve the theme and use it to style the page
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

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    this.viewCtrl.dismiss();
  }

}
