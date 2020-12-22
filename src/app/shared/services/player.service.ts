/**
 * @ngdoc service
 * @name diforbApp.service:Player
 * @description
 * # Player
 * service of the diforbApp
 */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from 'src/app/store/reducers/player.reducers';
import { Library } from './models/library';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private context: AudioContext = new AudioContext();
  private library: Library;

  constructor(
    private store: Store<{player: State}>,
    private http: HttpClient
  ) {
    this.library = new Library(this.context, http, store);
    store.select('player')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => this.handlerState(state));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private handlerState(state: State): void {
    if (state.selectedLeftSound) {
      this.library.select('left', state.selectedLeftSound);
    }

    if (state.selectedRightSound) {
      this.library.select('right', state.selectedRightSound);
    }

    if (state.hasOwnProperty('isPlaying')) {
      if (state.isPlaying) {
        this.library.play();
      } else {
        this.library.stop();
      }
    }

    if (state.side) {
      this.library.volume = { side: state.side, value: state.volume };
    }
  }
}
