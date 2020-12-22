/**
 * @ngdoc class
 * @name diforbApp.class:Buffer
 * @description
 * # Buffer
 * class of the diforbApp
 */
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export class Buffer {
    context: AudioContext;
    http: HttpClient;

    constructor(context: AudioContext, http: HttpClient) {  
        this.context = context;
        this.http = http;
    }
  
    loadSound(id: string) {
        return this.http
            .get(this.getUrl(id), {responseType: 'blob'})
            .pipe(
                map((file: Blob) => file.arrayBuffer()
                    .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer)
            )))
    };

    private getUrl(sound: string): string {
        const splited = sound.split("|");
        const url = `assets/sounds/Libraries/${splited[0]}/${splited[1]}/${splited[2]}/${splited[3]}.wav`;

        return url;
    }
  
}