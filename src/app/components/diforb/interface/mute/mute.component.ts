import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-mute',
	templateUrl: './mute.component.html',
	styleUrls: ['./mute.component.scss']
})
export class MuteComponent implements OnInit {

	selected = true;

	@HostListener('click', [])
	toggle() {
		this.selected = !this.selected
	}

	constructor() { }

	ngOnInit(): void {
	}

}
