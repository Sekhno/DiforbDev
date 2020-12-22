import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { of, from, Observable } from 'rxjs';
import { skip, filter, takeUntil, take, map } from 'rxjs/operators';
import { LibrariesStorage, LibraryInterface, LibraryDataInterface, SoundParamInterface } from 'src/app/storage/storage';
import { doubleSlideAnimation, flashAnimation } from 'src/app/shared/animations/animations';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/player.reducers';
import * as PlayerActions from 'src/app/store/actions/player.actions';

@Component({
  selector: 'sound-list',
  templateUrl: './sound-list.component.html',
  styleUrls: ['./sound-list.component.scss'],
  animations: [ doubleSlideAnimation, flashAnimation ]
})
export class SoundListComponent implements OnInit {

  @Input('side') side: string;

  id: string;
  
  data$: Observable<LibraryDataInterface[]>;
  selected = {
    category: null, sound: null
  };
  isPlaying = false;

  get params() {
    return {value: undefined, params: { offset: this.side == 'left' ? -100 : 100 }}
  }

  constructor(
    private route: ActivatedRoute,
    private render: Renderer2,
    private store: Store<{player: State}>
  ) { }

  ngOnInit(): void {
    this.route.url
      .pipe(take(1), map((event: UrlSegment[]) => event[1].path))
      .subscribe((id: string) => {
        this.id = id;
        this.data$ = of(JSON.parse(JSON.stringify(((LibrariesStorage[id] as LibraryInterface).data))));
      }
    );
  }

  selectSound(event: Event, params: SoundParamInterface): void {
    const rect: DOMRect = (event.target as HTMLElement).getBoundingClientRect();
    const selectedSound = `${this.id}|${params.category}|${params.sub}|${params.sound}`;

    this.selected.sound = selectedSound ;
    
    if (this.side == 'left') {
      this.store.dispatch(PlayerActions.selectedLeftSound({ leftSound: selectedSound }))
    } else {
      this.store.dispatch(PlayerActions.selectedRightSound({ rightSound: selectedSound }))
    }
  }

}