import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interface/response.interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  response: Response;

  constructor(private userSerice: UserService) {

  }
  ngOnInit(): void {
    this.userSerice.getUsers(15).subscribe(
      results => {
        console.log(results)
        this.response = results;
      }
    )
  }

}
