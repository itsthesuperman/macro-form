import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  newUser: User;
  createdUser: User;

  loaded = false;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.newUser.email = '';
    this.newUser.name = '';
    this.loaded = true;
  }

  save() {
    this.service.addUser(this.newUser).subscribe({
      next: data => this.createdUser = data
    });
  }

}
