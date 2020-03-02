import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Jugador } from 'src/app/model/jugador';
import { NbaService } from 'src/app/services/nba.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  

  constructor(private modalController: ModalController,
    private nbaService: NbaService,
    private route: ActivatedRoute) { }

  ngOnInit() {

  }



  async closeModal() {
    await this.modalController.dismiss();

  }

}
