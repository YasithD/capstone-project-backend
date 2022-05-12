import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher(){
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras )
  }

  getTeacherData(){
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response)=>{
      this.teacherData = response;
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  getStudentData(){
    this.selected = 'Students';
    this.service.getStudentData().subscribe((response)=>{
      this.teacherData = response;
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteTeacher(itemid){
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response)=>{
      this.getTeacherData()
    })
  }
}
