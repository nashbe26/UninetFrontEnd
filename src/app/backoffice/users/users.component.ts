import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BackofficeService } from 'src/services/backoffice/backoffice.service';
import { EmailService } from 'src/services/email/email.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  usersSlice:any;
  newUser:any =[]
  @ViewChild(MatPaginator) paginator! : MatPaginator
  constructor(private backoffice:BackofficeService,private emailSend:EmailService) { }

  ngOnInit(): void {
    this.backoffice.findAll().subscribe((data:any)=>{

      this.users = data
      this.users.map((x:any)=>{
        
        if(x.accountStatus == 'teacher'){
          this.newUser.push(x)

        }

      })
      if( this.newUser.legnth <5)
      this.usersSlice = this.newUser.slice(0,5)
      this.usersSlice = this.newUser
      console.log(this.usersSlice );
      
    })
  }
  check(id:any){
    console.log(id);    
    this.backoffice.approuveUser(id).subscribe((data:any)=>{
      this.backoffice.findAll().subscribe((data:any)=>{
        this.users = data
        this.usersSlice = data.slice(0,5)
        
      })
      this.emailSend.sendEmail(data).subscribe((dats:any)=>{        
      })
      window.location.reload();

    })
  }
  onPagechange(event:PageEvent){
    console.log(event);
    
    const statIndex = event.pageIndex * event.pageSize
    let endIndex = statIndex + event.pageSize
    if(endIndex>this.users.length)
    endIndex = this.users.length
    this.usersSlice = this.users.slice(statIndex,endIndex)
  }
}
