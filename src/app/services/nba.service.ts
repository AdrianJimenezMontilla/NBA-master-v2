import { Jugador } from '../model/jugador';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  userId: string;
  jugadores: Jugador[];

  constructor(private db: AngularFirestore,
    private authService: AuthService, private alertController: AlertController) {

    this.authService.getCurrentUser().subscribe(
      data => this.userId = data.uid
    );

    this.jugadores = [
      {
        "nombre": "LeBrom James",
        "edad": "34",
        "altura": "2,03",
        "peso": "113kg",
        "posicion": "Base",
        "equipo": "Los Angeles Lakers",
        "foto": "LeBrom James.png"
      },
      {
        "nombre": "Quinn Cook",
        "edad": "26",
        "altura": "1,88",
        "peso": "82kg",
        "posicion": "Base",
        "equipo": "Los Angeles Lakers",
        "foto": "Quinn Cook.png"
      },
      {
        "nombre": "Rajon Rondo",
        "edad": "33",
        "altura": "1,85",
        "peso": "82kg",
        "posicion": "Base",
        "equipo": "Los Angeles Lakers",
        "foto": "Rajon Rondo.png"
      },
      {
        "nombre": "Alex Caruso",
        "edad": "25",
        "altura": "1,96",
        "peso": "84kg",
        "posicion": "Escolta",
        "equipo": "Los Angeles Lakers",
        "foto": "Alex Caruso.png"
      },
      {
        "nombre": "Danny Green",
        "edad": "32",
        "altura": "1,98",
        "peso": "98kg",
        "posicion": "Alero",
        "equipo": "Los Angeles Lakers",
        "foto": "Danny Green.png"
      },
      {
        "nombre": "Kyle Kuzma",
        "edad": "24",
        "altura": "2,06",
        "peso": "100kg",
        "posicion": "Ala-Pivot",
        "equipo": "Los Angeles Lakers",
        "foto": "Kyle Kuzma.png"
      },
      {
        "nombre": "Kyle Kuzma",
        "edad": "24",
        "altura": "2,06",
        "peso": "100kg",
        "posicion": "Ala-Pivot",
        "equipo": "Chicago Bulls",
        "foto": "Danny Green.png"
      }
      

      
    ]
  }

  public addJugador(jugador: Jugador): Promise<DocumentReference> {
    return this.db.collection<Jugador>('users/' + this.userId + '/jugadores').add(jugador);
  }

  public getJugadoresfb(): Observable<Jugador[]> {
    console.log('users/' + this.userId + '/jugadores');
    return this.db.collection('users/' + this.userId + '/jugadores').snapshotChanges()
      .pipe(
        map(
          snaps => snaps.map(
            snap => <Jugador>{
              jugadorId: snap.payload.doc.id,
              ...snap.payload.doc.data() as Jugador
            }
          )
        )
      );
  }

  public deleteJugadorById(id: string): Promise<void> {
    return this.db.collection('users/' + this.userId + '/jugadores').doc(id).delete();
  }

  public getJugadorById(id: string): Observable<Jugador> {
    return this.db.collection('users/' + this.userId + '/jugadores').doc<Jugador>(id).valueChanges();
  }

  getJugadores(): Jugador[] {
    return this.jugadores;
  }

  getJugador(nombre: string) {
    return this.jugadores.filter(j => j.nombre == nombre)[0];
  }

  async presentAlertConfirm(id: string, nombre: string) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar jugador',
      message: `¿Estás seguro que quieres borrar el jugador <strong> ${nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteJugadorById(id);
          }
        }
      ]
    });

    await alert.present();
  }
}

