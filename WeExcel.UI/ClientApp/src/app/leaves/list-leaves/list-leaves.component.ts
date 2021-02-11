import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.scss']
})
export class ListLeavesComponent implements OnInit {
  leavesList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.bindData();
  }

  bindData() {
    this.http.get('https://localhost:44318/api/Leave').subscribe({
      next: resp => {
        this.leavesList = resp as any[];
      },
      error: err => {
        console.log(err);
      }
    });;
  }

}
