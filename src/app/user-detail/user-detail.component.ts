import { Component } from '@angular/core';
import { doc, getDoc } from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId:any = "";

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
   this.route.paramMap.subscribe(paramMap => {
    this.userId = paramMap.get('id');
    console.log('dsad', this.userId)
   })
    
  }

  
  

}
