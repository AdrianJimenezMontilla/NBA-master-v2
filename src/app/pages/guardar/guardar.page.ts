import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/model/jugador';
import { NbaService } from 'src/app/services/nba.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.page.html',
  styleUrls: ['./guardar.page.scss'],
})
export class GuardarPage implements OnInit {

  jugadoresfb: Observable<Jugador[]>;
  jugadores: Jugador[] = [];
  jugador: Jugador;
  isClicked: boolean = false;
  index: number;

  title: string = '';

  constructor(private nbaService: NbaService,
    private route: ActivatedRoute, private router: Router, 
    private alertController: AlertController, private authService: AuthService) {

      this.authService.getCurrentUser().subscribe(
        () => this.jugadoresfb = this.nbaService.getJugadoresfb()
      );

     }

    

  ngOnInit() {

    this.jugadores = this.nbaService.getJugadores();

  }


}
