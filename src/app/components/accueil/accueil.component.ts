import { Component, OnInit } from '@angular/core';
import { PublicEntitiesService } from '../public-entities.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  showPopUp:any;
  constructor(private publicEntity:PublicEntitiesService) { }

  ngOnInit(): void {
    this.showPopUp = this.publicEntity.showPopUp

  }
 
}
