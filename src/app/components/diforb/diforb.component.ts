import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-diforb',
  templateUrl: './diforb.component.html',
  styleUrls: ['./diforb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlayerService]
  
})
export class DiforbComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private player: PlayerService
  ) { }

  ngOnInit(): void {
    this.auth.OffPreloader(0);
  }

}
