import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {


  faTrash = faTrash;
  faPlus = faPlus;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = response;
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }
}
