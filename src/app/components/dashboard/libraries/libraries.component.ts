import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrariesStorage, LibraryInterface } from 'src/app/storage/storage';
import { AudioService } from 'src/app/shared/services/audio.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { interval, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { collapseAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
  animations: [collapseAnimation]
})
export class LibrariesComponent implements OnInit, OnDestroy {

  libraries: LibraryInterface[] = [];
  playing: LibraryInterface[] = [];
  childOutlet: string = "";

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    public auth: AuthService,
    private audioService: AudioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.libraries = Object.values(LibrariesStorage) as LibraryInterface[];

    this.childOutlet = this._getSecondaryUrl();

    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.childOutlet = this._getSecondaryUrl();
        }
      });

    this.audioService.subject
      .pipe(takeUntil(this.destroyed$))
      .subscribe((library) => {
        library && this.onPlay(library);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onPlay (library: LibraryInterface): void {
    console.log(library);
    if (this.playing.includes(library)) {
      this._tooglePlay(library);
    } else {
      this.playing.push(library);
      this.audioService
        .getSource(library.sound)
        .subscribe((source: AudioBufferSourceNode) => {
          library.source = source;
          this._tooglePlay(library)
        })
    }
  }

  private _tooglePlay (library: LibraryInterface): void {
    library.play = !library.play;
    if (library.play) {
      this._onTimer(library);
      library.source.start();
      
    } else {
      this._offTimer(library);
      library.source.stop();
      this.playing.splice(this.playing.indexOf(library), 1);
    }
  }

  private _onTimer (library: LibraryInterface): void {
    if (!library.time) {
      library.time = {
        cur: 0,
        id: interval(1000).subscribe(() => {
          library.time.cur++;
          if (library.time.cur > library.source.buffer.duration) {
            library.time.cur = 0;
            this._offTimer(library);
            this._tooglePlay(library);
          }
        })
      }
    } 
  }

  private _offTimer(library: LibraryInterface): void {
    library.time.id.unsubscribe();
    library.time = null;
  }

  private _getSecondaryUrl(): string {
    return this.router.url.replace(/\/dashboard\/+|\/dashboard/, "");
  }

}
