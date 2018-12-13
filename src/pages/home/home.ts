import { ReceitaPage } from './../receita/receita';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { TemperoPage } from '../tempero/tempero';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:any[]
  itemsExi:any[] = []
  constructor(public navCtrl: NavController,public db: AngularFireDatabase,public loadingCtrl: LoadingController) {
    //const ref = this.storage.ref('img/');
    //this.meta = ref.getDownloadURL()

  } 
  ionViewDidLoad(){
   const loader = this.loadingCtrl.create({ 
         content: "Carregando...",
    duration: 1000
   })
   loader.present()
   this.db.database.ref('items').orderByChild("nome").on('value', items => {
    let item = [];
    items.forEach( it => {
      item.push(it);
      return false;
    });
    
    this.items = item
    this.itemsExi = item
    });
  }
  initializeItems() {
    this.itemsExi= this.items
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.itemsExi = this.itemsExi.filter((v) => {
      if(v.val().nome && q) {
        if (v.val().nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  
  }
  showinfo(receita){
    this.navCtrl.push(ReceitaPage, {key: receita})
  }
   
}
