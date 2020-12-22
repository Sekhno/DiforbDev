/**
 * @ngdoc component
 * @name diforbApp.component:SliderComponent
 * @description
 * # SliderComponent
 * component of the diforbApp
 */
import { 
	Component, OnInit, AfterViewInit, Input, Output,  
	HostListener, ElementRef, EventEmitter, ChangeDetectorRef, Renderer2 
} from '@angular/core';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {

	@Input('mode') mode: ModeSlider = null;

	@Output('change') changedVolume: EventEmitter<number> = new EventEmitter();
	@Output('change') changedTimeshift: EventEmitter<number> = new EventEmitter();
	@Output('select') selectedReverb: EventEmitter<string> = new EventEmitter();
	@Output('change') changedReverb: EventEmitter<number> = new EventEmitter();

	isGrab = false;
	reverb: SlideReverb;

	private volume = 50;
	private min = 0;
	private max = 100;
	private svgElem: Element;
	private gradWidth: number = null;
	private gradHeight: number = null;
	private gradStep: number = null;
	private handlerElem: Element = null;
	private handlerPosition: {x: number, y: number} = null;
	private startAngle: number;
	private finishAngle = 1.25 * Math.PI;
	private stepAngle: number;
	// private angle = this.startAngle;
	private radius = 240;

	private clipPathStartPosition: number;
	private clipPathElem: Element = null;
	private savedCoords =  { x: 0, y: 0 };


	@HostListener('window:mouseup', ['$event'])
	offGrabHandler(event: MouseEvent) {
		this.isGrab = false;
	}

	constructor(
		private elem: ElementRef,
		private cd: ChangeDetectorRef, 
		private render2: Renderer2
	) {
		
	}

	ngOnInit(): void {
		if (this.mode == Slider.Timeshift) {
			
		} else if (this.mode == Slider.LeftVolume || this.mode == Slider.RightVolume) {
			this.clipPathStartPosition = 195;
			this.stepAngle = (0.3 * Math.PI) / 100;
			this.startAngle = Math.PI;
		} else if (this.mode == Slider.LeftReverb || this.mode == Slider.RightReverb) {
			this.clipPathStartPosition = 100;
			// this.stepAngle = (0.1 * Math.PI) / 100;
			// this.startAngle = 1.5 * Math.PI;
			this.reverb = {
				left: [
					{
						x: 40, y: 8, selected: false, title: 'Room'
					},
					{
						x: 59, y: 27, selected: false, title: 'Hall'
					},
					{
						x: 80, y: 45, selected: false, title: 'Stadium'
					}
				],
				right: [
					{
						x: 137, y: 10, selected: false, title: 'Room'
					},
					{
						x: 117, y: 28, selected: false, title: 'Hall'
					},
					{
						x: 95, y: 47, selected: false, title: 'Stadium'
					}
				]
			};
		}
	}

	ngAfterViewInit(): void {
		const rootElem = (this.elem.nativeElement as Element);
		const children = rootElem.children;

		if (children.length && !this.svgElem) {
			this.svgElem = children[0];

			const sliderGrad = this.svgElem.querySelector('.slider-grad');

			if (sliderGrad) {
				this.gradWidth = sliderGrad.getBoundingClientRect().width;
				this.gradHeight = sliderGrad.getBoundingClientRect().height;
				this.gradStep = this.gradHeight / 100;
			}
			
			let handler = this.svgElem.querySelector('.handler');
			
			if (handler && !this.handlerElem) {
				this.handlerElem = handler;
			}
			this.clipPathElem = rootElem.querySelector('.clip-path-rect');

			if (this.mode == Slider.Timeshift) {
				
			} else if (this.mode == Slider.LeftVolume || this.mode == Slider.RightVolume) {
				this.movedVolume(null);
			} else {	
				this.movedReverb(null);
			}

			setTimeout(this.cd.markForCheck);
		}
	}

	onGrabHandler (event: MouseEvent): void  {
		this.isGrab = true;
		this.saveCoords(event);
	}

	onMove (event: MouseEvent): void {
		if (this.isGrab) {
			if (this.mode == Slider.Timeshift) {
				this.movedTimeshift(event);
			} else if (this.mode == Slider.LeftVolume || this.mode == Slider.RightVolume) {
				this.movedVolume(event);
			} else if (this.mode == Slider.LeftReverb || this.mode == Slider.RightReverb) {
				this.movedReverb(event);
			}
		}
	}

	private saveCoords(event: MouseEvent): void {
		this.savedCoords.x = event.screenX;
		this.savedCoords.y = event.screenY;
	}

	private movedVolume(event: MouseEvent|null): void {
		this.volume = event ? ((this.savedCoords.y - event.screenY) > 0 ? this.volume + 1 : this.volume - 1) : this.volume;

		let centerX: number, centerY: number,
			radius = this.radius,
			angle = 0,
			numObjects = 360,
			slice = Math.PI * 2 / numObjects,
			x: number, y: number;

		if (this.volume > 99) this.volume = 100;
		else if (this.volume < 1) this.volume = 0;

		switch (this.mode) {
			case Slider.LeftVolume: {
				centerX = 250,
				centerY = 174;
				angle = 0.5 * (this.volume - 12) * slice;
				break;
			}
			case Slider.RightVolume: {
				centerX = -165,
				centerY = 174;
				angle = -0.5 * (this.volume + 348) * slice;
				break;
			}
		}
		
		x = centerX - Math.cos(angle) * radius;
		y = centerY - Math.sin(angle) * radius;

		const prop = 'transform';
		const value = `translate(${x}, ${y})`;
		
		this.handlerElem && this.render2.setAttribute(this.handlerElem, prop, value);
		this.clipPathElem && this.render2.setAttribute(this.clipPathElem, 'y', y+"");
		this.changedVolume.emit(this.volume);	
	}

	private movedTimeshift(event: MouseEvent): void {
		let volume = Math.floor(this.gradWidth - event.offsetX),
			centerX = 125,
			centerY = 266,
			radius = this.radius,
			angle = 0,
			numObjects = 1450,
			slice = Math.PI * 2 / numObjects,
			x: number, y: number;
		
		if (volume > 70) volume = 70;
		if (volume < -70) volume = -70;

		angle = volume * slice;
		x = centerX - Math.sin(angle) * radius;
		y = centerY - Math.cos(angle) * radius;

		const prop = 'transform';
		const value = `translate(${x}, ${y})`;
		
		this.handlerElem && this.render2.setAttribute(this.handlerElem, prop, value);	
		this.changedTimeshift.emit(volume);
	}

	private movedReverb(event: MouseEvent|null): void {
		this.volume = event ? ((this.savedCoords.y - event.screenY) > 0 ? this.volume + 1 : this.volume - 1) : this.volume;
		
		// let volume = event ? Math.floor(this.gradHeight - event.offsetY): this.volume,
		let centerX: number, centerY: number,
			radius = this.radius,
			angle = 0,
			numObjects = 360,
			slice = Math.PI * 2 / numObjects,
			x: number, y: number;
			
		if (this.volume > 99) this.volume = 100;
		else if (this.volume < 1) this.volume = 0;

		switch (this.mode) {
			case Slider.LeftReverb: {
				centerX = 240,
				centerY = -100;
				angle = 0.5 * (this.volume - 120) * slice;
				break;
			}
			case Slider.RightReverb: {
				centerX = -165,
				centerY = 174;
				angle = -0.5 * (this.volume + 348) * slice;
				break;
			}
		}
		
		x = centerX - Math.cos(angle) * radius;
		y = centerY - Math.sin(angle) * radius;

		const prop = 'transform';
		const value = `translate(${x}, ${y})`;
		
		this.handlerElem && this.render2.setAttribute(this.handlerElem, prop, value);
		this.clipPathElem && this.render2.setAttribute(this.clipPathElem, 'y', y+"");
		this.changedReverb.emit(this.volume);	
	}

	onClickReverb = (side: 'left' | 'right', index: number): void => {
		if (this.reverb[side][index].selected) {
			this.reverb[side][index].selected = false
		} else {
			this.reverb[side].forEach(v => v.selected = false);
			this.reverb[side][index].selected = !this.reverb[side][index].selected;
		}
		this.selectedReverb.emit(this.reverb[side][index].selected ? this.reverb[side][index].title : '')
	}
}

type ModeSlider = Slider.Timeshift | Slider.LeftVolume | Slider.RightVolume | Slider.LeftReverb | Slider.RightReverb;

enum Slider {
	Timeshift = 'top',
	LeftVolume = 'left-top',
	RightVolume = 'right-top',
	LeftReverb = 'left-bottom',
	RightReverb = 'right-bottom'
}

interface SlideRanger {
	handle: Element,
	value: number
}

interface SlideReverb {
	left: 	{ x: number, y: number, selected: boolean, title: string }[],
	right: 	{ x: number, y: number, selected: boolean, title: string }[]
}