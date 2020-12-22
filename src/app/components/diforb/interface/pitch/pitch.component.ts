import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pitch',
	templateUrl: './pitch.component.html',
	styleUrls: ['./pitch.component.scss']
})
export class PitchComponent implements OnInit, AfterContentInit {

	public size: number = null;

	@ViewChild('inputRef', {static: true}) input: ElementRef;

	@Input('mode') mode: Mode;

	@Output('change') pitchEmit: EventEmitter<number> = new EventEmitter();

	constructor(private elementRef: ElementRef) { }

	ngOnInit(): void {
	}

	ngAfterContentInit(): void {
		// this.initKnob();
	}

}

type Mode = "left" | "right";
