/**
 * @ngdoc class
 * @name diforbApp.class:Convolver
 * @description
 * # Convolver
 * class of the diforbApp
 */
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

export class Convolver {
    context: AudioContext;
    http: HttpClient;

    private buffers = { stadium: null, hall: null, room: null };

    constructor(
        context: AudioContext,
        http: HttpClient
    ) {
        this.http = http;
        this.context = context;

        this.loadAll();
    }

    private loadBuffer(id: string) {
        return this.http
            .get(this.getUrl(id), {responseType: 'blob'})
            .pipe(
                map((file: Blob) => file.arrayBuffer()
                    .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer)
            )))
    };

    private loadAll() {
        const arr = [
            { name: 'stadium', src: 'irHall.ogg' },
            { name: 'hall', src: 'noise.ogg' },
            { name: 'room', src:  'glass-hit.ogg' }
        ];

        arr.forEach(rever => {
            this.loadBuffer(rever.src)
                .pipe(take(1))
                .subscribe(buffer => {
                    this.buffers[rever.name] = buffer;
                })
        });
    }

    private getUrl(source: string) {
        return `assets/sounds/Reverbs/${source}`;
    }

    get stadium(): Promise<AudioBuffer> {
        return this.buffers.stadium;
    }

    get hall(): Promise<AudioBuffer> {
        return this.buffers.hall;
    }

    get room(): Promise<AudioBuffer> {
        return this.buffers.room;
    }

}

