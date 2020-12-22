import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FAQLIST } from 'src/app/storage/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit {

  items = FAQLIST;

  constructor() { }

  ngOnInit(): void {
  }

}
