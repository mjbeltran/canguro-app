import { Router } from '@angular/router';
import { DataService } from './../core/service/data.service';
import { AuthService } from './../core/service/auth.service';
import { IUser, INanny } from './../shared/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: IUser;
  history: INanny[] = null;
  check: INanny[];
  greeting: string;
  currentHour: number;

  displayedColumns: string[] = ['firstName', 'timestamp', 'rate'];
  dataSource : MatTableDataSource<INanny>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private authService: AuthService, private dataService: DataService,
    private router:Router, private http: HttpClient) {
    this.history = [];
  }

  isLoggedIn() {
    return this.authService.isLogin();
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.authService.getUserData()
        .subscribe(res => {
          this.userData = res;
        });
        

      this.dataService.getCheckOut().subscribe(res => {
        this.check = res;
        if (this.check != null) {
          for (let k in this.check) {
            for (let i in this.check[k]['history']) {
              this.history.push(this.check[k]['history'][i]);
            }
          }
          this.dataSource = new MatTableDataSource<INanny>(this.history);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else {
          this.history = [];
          this.dataSource = new MatTableDataSource<INanny>(this.history);
        }
      });
    }

    this.currentHour = new Date().getHours();
    if (this.currentHour < 12) {
      this.greeting = "Good Morning";
    }
    else if (this.currentHour > 12 && this.currentHour < 18) {
      this.greeting = "Good Afternoon";
    }
    else {
      this.greeting = "Good Evening";
    }
  }

  purchaseNotEmpty() {
    return this.history.length > 0;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}