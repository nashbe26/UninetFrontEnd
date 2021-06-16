import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeworkResponseService } from 'src/services/homework/homework-response.service';
import { HomeworkService } from 'src/services/homework/homework.service';

@Component({
  selector: 'app-get-hoemwork',
  templateUrl: './get-hoemwork.component.html',
  styleUrls: ['./get-hoemwork.component.css']
})
export class GetHoemworkComponent implements OnInit {
  id:any;
  homeworks:any;
  constructor(private route :ActivatedRoute,private homeRes:HomeworkService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.homeRes.getHomeworkByUserId(this.id).subscribe((data:any)=>{
      console.log(data);
      this.homeworks = data
      
    })
  }
  deletePost(id:any){
    this.homeRes.deleteHomework(id).subscribe((data:any)=>{
      console.log(data);
      
    })
  }
}
