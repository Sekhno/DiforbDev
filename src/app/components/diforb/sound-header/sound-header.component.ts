import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/player.reducers';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sound-header',
  templateUrl: './sound-header.component.html',
  styleUrls: ['./sound-header.component.scss']
})
export class SoundHeaderComponent implements OnInit, OnDestroy {

  actived = {
    left: { icon: null, sound: null },
    right: { icon: null, sound: null }
  };

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);



  constructor(
    private store: Store<{player: State}>
  ) {
    store.select('player')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => {
        if (state.selectedLeftSound) {
          this.actived.left = {
            icon: '',
            sound: ''
          }
          console.log(state.selectedLeftSound);
        }
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getIcon(params: string): string {
    const paramsArr = params.split('|');

    return paramsArr[0].toLowerCase() + '-' + paramsArr[2].toLowerCase();
  }

}
