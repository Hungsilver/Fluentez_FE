import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-choice-exercise',
  templateUrl: './multiple-choice-exercise.component.html',
  styleUrls: ['./multiple-choice-exercise.component.scss'],
})
export class MultipleChoiceExerciseComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit() {}
  onExerciseSubmit($event: any) {}
}
