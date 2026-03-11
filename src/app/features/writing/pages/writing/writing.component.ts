import { Component, OnInit } from '@angular/core';
import { StorageService } from '@core';
import { WritingService } from '@features/writing/services/writing.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {
  writings: any;
  lstUnit: any;
  lessonId: any;
  lesson: any;
  expandedUnits: boolean[] = [];

  constructor(
    private readonly writingService: WritingService,
    private readonly storeService: StorageService
  ) { }

  ngOnInit() {
    this.writingService.GetWritings().subscribe((res) => {
      if (res && res.isSuccess && res.data) {
        this.writings = res.data;
        this.lstUnit = res.data.unitDtos;
        // Initialize expanded units - expand first unit by default
        this.expandedUnits = new Array(this.lstUnit?.length || 0).fill(false);
        if (this.lstUnit?.length > 0) {
          this.expandedUnits[0] = true;
        }
        //show bài học đầu tiên mặc định
        if (this.lstUnit?.[0]?.lessons?.[0]) {
          this.onLessonClick(this.lstUnit[0].lessons[0]);
        }
      }
    });
  }

  toggleUnit(index: number) {
    this.expandedUnits[index] = !this.expandedUnits[index];
  }

  onLessonClick(lesson: any) {
    this.writingService.GetLesson(lesson.id).subscribe((res) => {
      if (res && res.isSuccess && res.data) {
        this.lessonId = res.data.id;
        this.lesson = res.data;
      }
    });
  }

  getTotalLessons(): number {
    if (!this.lstUnit || !Array.isArray(this.lstUnit)) return 0;
    return this.lstUnit.reduce((total, unit) => total + (unit.lessons?.length || 0), 0);
  }
}

