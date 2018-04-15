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

  //function that is called when the theme setting is changed. this function will change the theme of the app
  //for now, the function just changes the theme on the setting page, this is reflected in the change of pokeball icon on the top of the page
  onChange(){
    //the theme is checked against the number that corresponds to each theme. if they match, change to that theme
    if(this.theme == 1)
      //imgSrc is set to a string giving the file path of the image to be used for that theme
      this.imgSrc = 'assets/imgs/pokeball.png';
    else if(this.theme == 2)
      this.imgSrc = 'assets/imgs/greatball.png';
    else if(this.theme == 3)
      this.imgSrc = 'assets/imgs/ultraball.png';
    else if(this.theme == 4)
      this.imgSrc = 'assets/imgs/masterball.png';
  }

}
