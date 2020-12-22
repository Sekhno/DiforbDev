import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription, Observable, ReplaySubject } from 'rxjs'
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { take, map, takeUntil } from 'rxjs/operators';
import { LibrariesStorage, LibraryInterface } from 'src/app/storage/storage';
import { Store } from '@ngrx/store';
import * as PlayerActions from 'src/app/store/actions/player.actions';
import { State } from 'src/app/store/reducers/player.reducers';

@Component({
  selector: 'sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss']
})
export class SoundPlayerComponent implements OnInit, OnDestroy {

  title: string = 'Interface';
  playing = false;
  intervalId: Subscription;
  progress = 214;
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @ViewChild('progressBar', {static: true}) progressBarRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private render: Renderer2,
    private store: Store<{player: State}>,
    private cd: ChangeDetectorRef
  ) {
    // this.player$ = store.select('player')
    store.select('player')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => {
        if (state.hasOwnProperty('isPlaying')) {
          this.playing = state.isPlaying;
          this.cd.markForCheck();
        }
      })
  }

  ngOnInit(): void {
    this.route.url.pipe(
      take(1), map((event: UrlSegment[]) => event[1].path)
    ).subscribe((id: string) => {
      this.title = (LibrariesStorage[id] as LibraryInterface).name;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  changedTimeshift = (volume: number): void => {
    console.log(volume);
  }

  changedVolume = (volume: number, side: string): void => {
    const splited = side.split("-");
    const value = 0.01 * volume;
    this.store.dispatch(PlayerActions.changedVolume({ side: splited[0], value: value }))
  }

  changedPitch = (event, side: string): void => {}

  changedModeReverb = (event, side: string): void =>  {}

  changedReverb = (event, side: string): void => {
    
  }

  play = (): void => {
    this.playing = !this.playing;

    if (this.playing) {
      this.store.dispatch(PlayerActions.play());;
      // this.intervalId = interval(1000).subscribe(_ => {
      //   this.progress -= 10;
      //   this.render.setAttribute(this.progressBarRef.nativeElement, 'stroke-dashoffset', this.progress+"");
      //   if (this.progress < 0) {
      //     this.play();
      //   }
      // })
    } else {
      this.store.dispatch(PlayerActions.stop());
      // this.intervalId.unsubscribe();
      // this.progress = 214;
      // this.render.setAttribute(this.progressBarRef.nativeElement, 'stroke-dashoffset', this.progress+"");
    }
  }

  

}
