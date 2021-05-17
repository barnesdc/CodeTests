import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SpacexService } from '../../services/spacex.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[]=['flightNumber', 'launchYear', 'rocketName', 'details', 'presskit'];
  spacexData: any;
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private SpacexService: SpacexService) {}


  ngOnInit(): void {
    this.getSpacexData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSpacexData(){
    this.spacexData = this.SpacexService.getSpacexData()
    this.spacexData.subscribe((res: any) => this.dataSource.data = res)
  }

  viewPres(preskitUrl: string) {
    let route = preskitUrl;
    window.location.href = route
  }
}
