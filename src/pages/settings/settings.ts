import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  theme: any = 1;
  imgSrc: any = 'assets/imgs/pokeball.png';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onChange(){
    if(this.theme == 1)
      this.imgSrc = 'assets/imgs/pokeball.png';
    else if(this.theme == 2)
      this.imgSrc = 'assets/imgs/greatball.png';
    else if(this.theme == 3)
      this.imgSrc = 'assets/imgs/ultraball.png';
    else if(this.theme == 4)
      this.imgSrc = 'assets/imgs/masterball.png';
  }

}
