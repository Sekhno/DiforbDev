/**
 * @ngdoc class
 * @name diforbApp.class:Library
 * @description
 * # Library
 * class of the diforbApp
 */
import { Buffer } from './buffer';
import { HttpClient } from '@angular/common/http';
import { Sound } from './sound';
import { map, take, timeout, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as PlayerActions from 'src/app/store/actions/player.actions'
import { of } from 'rxjs';
import { Convolver } from './convolver';

export class Library {
    store: Store;
    context: AudioContext;
    buffer: Buffer;
    convolver: Convolver;

    left  = { buffer: <Sound>null, volume: <number>0.5 };
    right = { buffer: <Sound>null, volume: <number>0.5 };

    maxDuration = 0;

    constructor(
        context: AudioContext, 
        http: HttpClient, 
        store: Store) 
    {
        this.store = store;
        this.context = context;
        this.buffer = new Buffer(context, http);
        this.convolver = new Convolver(context, http);
    }

    play(): void {
        this.left.buffer && this.left.buffer.play();
        this.right.buffer && this.right.buffer.play();
        
        of(1)
            .pipe(take(1), delay(this.maxDuration * 1000))
            .subscribe(_ => {
                this.store.dispatch(PlayerActions.stop());
            });
    }

    stop(): void {
        this.left.buffer && this.left.buffer.stop();
        this.right.buffer && this.right.buffer.stop();
    }

    select(side: "left"|"right", id: string): void {
        this.store.dispatch(PlayerActions.stop())
        this.buffer.loadSound(id)
            .pipe(take(1))
            .subscribe(e => e.then(audio => {
                this.maxDuration = (this.maxDuration < audio.duration) ? audio.duration : this.maxDuration;
                this[side].buffer = new Sound(this.context, audio, this[side].volume, this.convolver);
                this.store.dispatch(PlayerActions.play());
                console.log(this.maxDuration);
            }));
    }

    set volume (options: { side: string, value: number }) {
        if (this[options.side]) {
            const side = (this[options.side] as { buffer: Sound, volume: number });
            side.volume = options.value;
            side.buffer && side.buffer.updateVolume(options.value);
        }
    }
}