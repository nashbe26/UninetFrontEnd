import { Component, OnInit } from '@angular/core';
import { PublicEntitiesService } from '../public-entities.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  showPopUp:any;
  constructor(private publicEntity:PublicEntitiesService) { }

  ngOnInit(): void {
    
    this.showPopUp = this.publicEntity.showPopUp

  }
  exitPopUp(){
    this.showPopUp = !this.publicEntity.showPopUp
  }
  

  
}
