import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { max } from 'rxjs';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  constructor(private service: AuthService, private dialog: MatDialog) { 
    this.Loaduser();
  }

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  Loaduser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['d','username', 'name', 'email','gender', 'role', 'status','file', 'view','action'];
  UpdateUser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '400ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.Loaduser();
    });

  }
  viewuser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '400ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.Loaduser();
    });

  }
  opendialog() {

    this.Loaduser();
  }

}
