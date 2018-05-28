import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  theme: any;
  imgSrc: any = 'assets/imgs/pokeball.png';
  accuracy: any = 10000;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController, private socialSharing: SocialSharing) {
    this.storage.get("accuracy").then((val) => {
      this.accuracy = val;
      console.log(this.accuracy);
    });
  }

  ionViewDidEnter(){
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

  shareFacebook(){
    this.socialSharing.shareViaFacebook('Check out this awesome app! Calculate the catch rates in Pokemon games!', 'assets/imgs/icon.png', 'www.pokecatch.com').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareTwitter(){
    this.socialSharing.shareViaFacebook('Check out this awesome app! Calculate the catch rates in Pokemon games!', 'assets/imgs/icon.png', 'www.pokecatch.com').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  changeAccuracy(){
    this.storage.set('accuracy', this.accuracy);
  }

  about(){
    //create an alert
    let alert = this.alertCtrl.create({
        title: 'About Us',
        subTitle: 'We are fans of the Pokemon games who are intereseted by the mathematics behind them. We created this App so others could benefit from the knowledge of these systems and hopefully find them as fascinating as we do! Thank you for downloading the app!',
        buttons: ['Dismiss']
      });
      //present the alert
      alert.present();
  }

  howTo(){
    //create an alert
    let alert = this.alertCtrl.create({
        title: 'Usage',
        subTitle: 'Accuracy determines the amount of tests run when calculating catch rate. Higher numbers give better results but will increase the time taken to calculate.',
        buttons: ['Dismiss']
      });
      //present the alert
      alert.present();
  }

}
