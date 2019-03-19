import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { Floor3Component } from './floor3.component';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { Data } from '../../../models/data.model';

@Component({
  templateUrl: 'room-dean.component.html'
})
export class RoomDeanComponent implements OnInit, OnDestroy {
    
  room: String;
  datastatus: any = {};
  interval : any ;
  // date = new Date();
  // jstoday = '';

  constructor(private _authService : AuthService, private _dataService: DataService, private _router: Router, private _activeRoute: ActivatedRoute) { 
  }

  ngOnInit(){
      this.fetchDataItem();
    //   interval length in miliseconds
      this.interval = setInterval(() => { 
        this.fetchDataItem(); 
    }, 10000);
  }

   ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  fetchDataItem(){
    // get data using parameters binding
    let content1 = document.getElementById("lampOne");
    let content2 = document.getElementById("lampTwo");
    let content3 = document.getElementById("ac");
    let content4 = document.getElementById("lampThree");

     this._activeRoute.params.subscribe(params => {
      this.room=params.room;
      this._dataService.getRoomById(this.room).subscribe(res => {
        this.datastatus = res;

        console.log('Data Fetching..');
        console.log(this.datastatus);

      // check the data and give a class active if the data is 1 to change the color
      if (this.datastatus[0].status == "1"){
          content1.setAttribute('class','active');
          console.log("lamp_1_On");
         }
         else{
          content1.setAttribute('class',"");
          console.log("lamp_1_Off")
         }   

          // check the data and give a class active if the data is 1 to change the color
      if (this.datastatus[1].status == "1"){
          content2.setAttribute('class','active');
          console.log("lamp_2_On");
         }
         else{
          content2.setAttribute('class',"");
          console.log("lamp_2_Off")
         }  

          // check the data and give a class active if the data is 1 to change the color
      if (this.datastatus[2].status == "1"){
          content3.setAttribute('class','active');
          console.log("Ac_On");
         }
         else{
           content3.setAttribute('class',"");
            console.log("Ac_Off")
         }  

          // check the data and give a class active if the data is 1 to change the color
      if (this.datastatus[3].status == "1"){
          content4.setAttribute('class','active');
          console.log("Ac_On");
         }
         else{
           content4.setAttribute('class',"");
            console.log("Ac_Off")
         }  

         
         // endof IF
      });
    });  
  } 
  
  activateItem(array, attr){
    if(this._authService.loggedIn()){
        // document.getElementById("ac").setAttribute("fill", "yellow");
        var content=document.getElementById(attr);
      
        if (content.getAttribute('class')==('active')) {
          let id = this.datastatus[`${array}`]._id;
          let node_id = this.datastatus[`${array}`].node_id;
          let pin_id = this.datastatus[`${array}`].pin_id;
          let statusId = this.datastatus[`${array}`].status = "0";
          // let sekarang = this.jstoday = formatDate(this.date, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
          // let time = sekarang;
          console.log(statusId);
        
          this._dataService.updateData(id, statusId).subscribe((res) =>{
            res = console.log(res);
          })

          content.setAttribute('class',"");
          console.log("item_Off")
        }else{
          // let active = content.setAttribute("fill", "yellow");
              let id = this.datastatus[`${array}`]._id;
              let node_id = this.datastatus[`${array}`].node_id;
              let pin_id = this.datastatus[`${array}`].pin_id;
              let statusId = this.datastatus[`${array}`].status = "1";
              // let sekarang = this.jstoday = formatDate(this.date, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
              // let time = sekarang;
              console.log(statusId);
              
              this._dataService.updateData(id, statusId).subscribe((res) =>{
                res = console.log(res);
              })
              content.setAttribute('class','active');
              console.log("item_On");            
          }
    }
  }
}

