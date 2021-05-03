import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group/group.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  onlineUser:any;
  group:any;
  constructor(private groupServices:GroupService) { }

  ngOnInit(): void {
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    
    this.groupServices.getGroupById(this.onlineUser._id).subscribe((groups:any)=>{
      console.log(groups);
      
      this.group = groups
    })
  }

}
