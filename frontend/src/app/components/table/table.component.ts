import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  faTrash = faTrash;
  teacherData: any;

  constructor(private service : AppServiceService) { }

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  getDataFromAPI(){
    this.service.getData().subscribe((response)=>{
      this.teacherData = response;
      console.log(response)
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

}
