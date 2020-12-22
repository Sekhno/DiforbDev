/**
 * @ngdoc class
 * @name diforbApp.class:Sound
 * @description
 * # Sound
 * class of the diforbApp
 */
import { Convolver } from './convolver';

export class Sound {

    context: AudioContext;
    buffer: AudioBuffer;
    gainNode: GainNode;
    source: AudioBufferSourceNode;
    volume = 0.5;
    convolver: Convolver;
    convolverNode: ConvolverNode;

    constructor(
        context: AudioContext,
        buffer: AudioBuffer,
        volume: number,
        convolver: Convolver
    ) {
        this.context = context;
        this.buffer = buffer;
        this.volume = volume;
        this.convolver = convolver;
    }
  
    init() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        
        // this.setConvolver()

        this.gainNode.connect(this.context.destination);
        this.gainNode.gain.value = this.volume;
    }
  
    play() {
        this.init();
        this.source.start(this.context.currentTime);
    }  
  
    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
    }

    updateVolume(value: number) {
        this.volume = value;
    }

    setConvolver() {
        this.convolverNode = this.context.createConvolver();
        this.convolver.stadium.then(buffer => {
            this.convolverNode.buffer = buffer;
        });
        
        this.source.connect(this.convolverNode);
        this.convolverNode.connect(this.context.destination);
    }
  
}