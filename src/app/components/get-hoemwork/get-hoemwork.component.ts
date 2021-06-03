import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeworkResponseService } from 'src/services/homework/homework-response.service';

@Component({
  selector: 'app-get-hoemwork',
  templateUrl: './get-hoemwork.component.html',
  styleUrls: ['./get-hoemwork.component.css']
})
export class GetHoemworkComponent implements OnInit {
  id:any;
  homeworks:any;
  constructor(private route :ActivatedRoute,private homeRes:HomeworkResponseService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.homeRes.gethomeworkById(this.id).subscribe((data:any)=>{
      console.log(data);
      
      this.homeworks = data
      
    })
  }

}
