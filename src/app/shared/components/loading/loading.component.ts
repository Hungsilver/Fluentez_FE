import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  styleUrls: ['./loading.component.scss'],
  imports: [SharedModule]
})
export class LoadingComponent implements OnInit {
  constructor(public loadingService: LoadingService) { }
  ngOnInit() {
  }

}
