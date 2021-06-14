import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BackofficeService } from 'src/services/backoffice/backoffice.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours:any;
  coursSlice:any;
  constructor(private backoffice:BackofficeService) { }

  ngOnInit(): void {
    this.backoffice.getAllCours().subscribe((data:any)=>{
      console.log(data);
      this.cours = data
      this.coursSlice = data.slice(0,5)
    })
  }
  check(id:any){
    console.log(id);    
    this.backoffice.approuveCours(id).subscribe((data:any)=>{
      this.backoffice.getAllCours().subscribe((data:any)=>{
        console.log(data);
        this.cours = data
 
      })    })
  }
  onPagechange(event:PageEvent){
    console.log(event);
    
    const statIndex = event.pageIndex * event.pageSize
    let endIndex = statIndex + event.pageSize
    if(endIndex>this.cours.length)
    endIndex = this.cours.length
    this.coursSlice = this.cours.slice(statIndex,endIndex)
  }

}
