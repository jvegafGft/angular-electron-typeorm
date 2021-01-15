import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService} from '../data-access/database.service';
import {User} from '../data-access/entities/user.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(private router: Router, private databaseService: DatabaseService) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.databaseService
      .connection
      .then(() => User.find())
      .then(users => {
        this.users = users;
        console.log('Users: '+users);
      })
  }

  addUser() {
    const user = new User();

    user.FirstName = 'EDWIN';
    user.LastName = 'Bustamante';
    user.Age = 25;

    this.databaseService
      .connection
      .then(() => user.save())
      .then(() => {
        this.getUsers();
      })
      .then(() => {

      })
  }
}
