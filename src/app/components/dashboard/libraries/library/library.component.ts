import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrariesStorage, LibraryInterface } from 'src/app/storage/storage';
import { AudioService } from 'src/app/shared/services/audio.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  id: string;
  library: LibraryInterface;

  constructor(
    private route: ActivatedRoute,
    public audio: AudioService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: { id: string }) => {
      this.id = params.id;
      this.library = LibrariesStorage[params.id];
    })
  }

}
