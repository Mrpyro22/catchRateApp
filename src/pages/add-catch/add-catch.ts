import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-catch',
  templateUrl: 'add-catch.html',
})
export class AddCatchPage {

  pokemonName: any;
  level: any;
  currentHP: any;
  attempts: any;
  status: any;
  game: any;
  date: any;

  className: any = 'circle';
  imgSrc: any = 'assets/imgs/pokeball.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCatchPage');
  }

  ionViewDidEnter(){
    this.storage.get("theme").then((val) => {
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

  checkVariables(){
    if(this.pokemonName && this.level && this.currentHP && this.attempts && this.status && this.game && this.date){
      this.closeModal();
    }
    else{
      //if any fields are invalid, call the function to display an alert saying so
      this.invalidVar();
    }
  }

  //function creates an alert that warns of un-filled data fields
  invalidVar(){
    //create an alert
    let alert = this.alertCtrl.create({
        title: 'Invalid Calculation',
        subTitle: 'You may have missed an input field...',
        buttons: ['Dismiss']
      });
      //present the alert
      alert.present();
  }

  //function to close the modal
  closeModal() {
    //when called, the ViewController dismisses the modal
    let data = {pokemonName: this.pokemonName, level: this.level, currentHP: this.currentHP, attempts: this.attempts, stats: this.status, game: this.game, date: this.date}
    this.viewCtrl.dismiss(data);
  }

}
