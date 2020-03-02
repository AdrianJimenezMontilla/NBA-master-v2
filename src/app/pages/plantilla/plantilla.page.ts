import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/model/jugador';
import { NbaService } from 'src/app/services/nba.service';
import { ModalController } from '@ionic/angular';
import { SecondPage } from '../../modals/second/second.page';



@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  jugadorfb: Jugador = {nombre: '', edad: '', altura: '', peso: ''};
  jugadores: Jugador[] = [];
  jugador: Jugador;
  isClicked: boolean = false;
  index: number;
  id: string;

  constructor(private nbaService: NbaService, private modalController: ModalController) { }

  ngOnInit() {

    this.jugadores = this.nbaService.getJugadores();
    
    
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }


  muestraDetalles(id: string) {
    
        this.index = this.jugadores.findIndex(j => j.nombre == id);
   
        this.jugador = this.nbaService.getJugador(id);
        console.log(this.jugador);
        this.isClicked = !this.isClicked;
      }

  
   addJugador() {
        this.nbaService.addJugador(this.jugador)
        .catch(error => console.error(error));
        
          
        
        
        
      }

  

}
