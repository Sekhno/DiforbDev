import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { rotatePusherAnimation } from 'src/app/shared/animations/animations';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/player.reducers';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  animations: [rotatePusherAnimation]
})
export class InterfaceComponent implements OnInit, OnDestroy {

  menuOpened = false;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(
    private store: Store<{player: State}>
  ) {
    store.select('player')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        console.log(state)
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('Menu toogle: Interface!');
      this.menuOpened = !this.menuOpened
    }
  }

}
