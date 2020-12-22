import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import  { slideLeft } from 'src/app/shared/animations/animations'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [slideLeft]
})
export class MenuComponent implements OnInit {

  opened = false;

  constructor(
    public authService: AuthService 
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('Menu toogle!');
      this.opened = !this.opened
    }
  }

}
