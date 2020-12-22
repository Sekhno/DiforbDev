/**
 * @ngdoc service
 * @name diforbApp.service:AudioService
 * @description
 * # AudioService
 * service of the diforbApp
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LibraryInterface } from 'src/app/storage/storage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare var audioContext: AudioContext;

const getUrl = function( sound: string ): string {
  return `./assets/sounds/Tizers/${sound}`
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  subject: BehaviorSubject<LibraryInterface> = new BehaviorSubject(null);

  private filesBuffer: { [id: string]: Promise<AudioBuffer> } = {};

  constructor(
    private http: HttpClient
  ) {}

  getSource(sound: string): Subject<any> {
    let source: AudioBufferSourceNode;
    let subject = new Subject();

    if (this.filesBuffer[sound]) {
      this.filesBuffer[sound]
        .then((audioBuffer) => {
          source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);

          subject.next(source);
          subject.complete();
        })
    } else {
      console.log("Get Source");
      this.http
        .get(getUrl(sound), {responseType: 'blob'})
        .toPromise()
        .then((file: Blob) => {
          console.log("Got file!")
          file.arrayBuffer()
            .then((arrayBuffer: ArrayBuffer) => {
              console.log("Got Array buffer", arrayBuffer, audioContext);
              if (audioContext.toString() == '[object webkitAudioContext]') {
                audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                  console.log("Got audio buffer", audioBuffer);
                    source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    console.log("Source", source);
  
                    subject.next(source);
                    subject.complete();
                })
              } else {
                this.filesBuffer[sound] = audioContext.decodeAudioData(arrayBuffer);
                this.filesBuffer[sound]
                  .then((audioBuffer) => {
                    console.log("Got audio buffer", audioBuffer);
                    source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    console.log("Source", source);
  
                    subject.next(source);
                    subject.complete();
                  })
              }
              
            })
        })
        .catch((err) => console.log("Error", err))
    }

    return subject;
  }

  onSubject(library: LibraryInterface) {
    this.subject.next(library);
  }
}
