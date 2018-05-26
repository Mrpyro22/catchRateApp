import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';


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

  theme: any;

  image: any;
  imageStatus: any = 'Add an image';
  options: any = {
    quality: 100
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private imagePicker: ImagePicker, private base64: Base64) {
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

  cancelCheck(){
    this.pokemonName = '';
    this.closeModal();
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
    if(this.image){
      let data = {pokemonName: this.pokemonName, level: this.level, currentHP: this.currentHP, attempts: this.attempts,
        status: this.status, game: this.game, date: this.date, image: this.image}
      this.viewCtrl.dismiss(data);
    } else {
      let data = {pokemonName: this.pokemonName, level: this.level, currentHP: this.currentHP, attempts: this.attempts,
        status: this.status, game: this.game, date: this.date}
      this.viewCtrl.dismiss(data);
    }
  }

  // select(){
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   console.log('yeet');
  //
  //   this.imagePicker.getPictures(this.options).then((results) => {
  //
  //     loading.present();
  //     for (var i = 0; i < results.length; i++) {
  //           this.base64.encodeFile(results[i]).then((base64File: string) => {
  //             let base64Image = base64File;
  //             this.image = base64Image;
  //             this.imageStatus = 'Image Accepted'
  //           }, (err) => {
  //             console.log(err);
  //           });
  //     }
  //     loading.dismiss();
  //
  //
  //   }, (err) => { });
  // }

  imageSelected(files) {
    if(files.length > 0) {
      alert("Image Selected:" + files[0].name);
    }

    let fileReader = new FileReader();

    fileReader.onload = e => {
      let imageFile = fileReader.result;
      this.image = imageFile;
    }
    fileReader.readAsDataURL(files[0]);
  }

}
