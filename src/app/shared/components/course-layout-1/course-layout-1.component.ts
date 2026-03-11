import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-layout-1',
  templateUrl: './course-layout-1.component.html',
  styleUrls: ['./course-layout-1.component.scss']
})
export class CourseLayout1Component implements OnInit {

  @Input() data : string =""
  constructor() { }

  ngOnInit() {
  }

}
