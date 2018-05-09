import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  theme: any;
  imgSrc: any = 'assets/imgs/pokeball.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('theme').then((val) => {
      this.theme = val;
      console.log(this.theme);
      if(this.theme == 1){
        this.imgSrc = 'assets/imgs/pokeball.png';
      }
      else if(this.theme == 2){
        this.imgSrc = 'assets/imgs/greatball.png';
      }
      else if(this.theme == 3){
        this.imgSrc = 'assets/imgs/ultraball.png';
      }
      else if(this.theme == 4){
        this.imgSrc = 'assets/imgs/masterball.png';
      }
      else{
        this.imgSrc = 'assets/imgs/pokeball.png';
      }
    });
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  //function that is called when the theme setting is changed. this function will change the theme of the app
  //for now, the function just changes the theme on the setting page, this is reflected in the change of pokeball icon on the top of the page
  onChange(){
    //the theme is checked against the number that corresponds to each theme. if they match, change to that theme
    if(this.theme == 1){
      //imgSrc is set to a string giving the file path of the image to be used for that theme
      this.imgSrc = 'assets/imgs/pokeball.png';
      this.storage.set('theme', 1);
    }
    else if(this.theme == 2){
      this.imgSrc = 'assets/imgs/greatball.png';
      this.storage.set('theme', 2);
    }
    else if(this.theme == 3){
      this.imgSrc = 'assets/imgs/ultraball.png';
      this.storage.set('theme', 3);
    }
    else if(this.theme == 4){
      this.imgSrc = 'assets/imgs/masterball.png';
      this.storage.set('theme', 4);
    }
  }

}
