import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as dataRaw from './assets/json/alimentos.json'
import { CommonModule } from '@angular/common';

export interface comida {
  nombre: string;
  foto: string;
  cantidad: string;
  carbos: number;
  prote: number;
  grasas: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'AppDieta';
  totalCarbos: number = 0;
  totalProte: number = 0;
  totalGrasas: number = 0;
  listaComidas: comida[] = [];
  listaFiltro: comida[] = [];
  comidaHoy: comida[] = [];
  isDescendenteCarb: boolean | null = null;
  isDescendenteProt: boolean | null = null;
  isDescendenteGras: boolean | null = null;

  ngOnInit(): void {
    console.log("DataRaw: " + dataRaw)
    const data: any = (dataRaw as any).default
    console.log(data)
    this.listaComidas = Array.isArray(data) ? data : [];

    this.listaFiltro = this.listaComidas
  }

  inputFruta(event: KeyboardEvent) {
    console.log("Tecla pulsada: " + event.key)
    const inputText = event.target as HTMLInputElement
    if (inputText.value == "") {
      console.log("VACIO")
      this.listaFiltro = this.listaComidas
    } else {
      this.listaFiltro = this.listaComidas.filter(comida => comida.nombre.toLowerCase().includes(inputText.value.toLowerCase()));
    }
  }

  // soloNum(event: KeyboardEvent) {
  //   const allowedKeys = [
  //     'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', '.', ','
  //   ];
  //   if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
  //     event.preventDefault()
  //   } else {
  //     if (event.key == ",") {
  //       event.preventDefault()
  //       const elemento = event.target as HTMLInputElement
  //       elemento.value = elemento.value + "."
  //     }
  //   }
  // }

  filtrarMacros(key: String, event: Event) {
    let lista;
    switch (key) {
      case "carbos":
        if (this.isDescendenteCarb) {
          console.log("AAAAAAAAA")
        lista = this.listaFiltro.sort((a, b) => a.carbos - b.carbos)
        this.listaFiltro = this.listaFiltro.sort((a, b) => a.carbos - b.carbos)
        this.isDescendenteCarb = false
        console.log(event.target)
        } else{
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.carbos - a.carbos)
          this.isDescendenteCarb = true
        }; break
      case "prote":
        if (this.isDescendenteProt) {
          console.log("AAAAAAAAA")
        lista = this.listaFiltro.sort((a, b) => a.prote - b.prote)
        this.listaFiltro = this.listaFiltro.sort((a, b) => a.prote - b.prote)
        this.isDescendenteProt = false
        console.log(event.target)
        } else{
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.prote - a.prote)
          this.isDescendenteProt = true
        }; break
      case "grasa":
        if (this.isDescendenteGras) {
          console.log("AAAAAAAAA")
        lista = this.listaFiltro.sort((a, b) => a.grasas - b.grasas)
        this.listaFiltro = this.listaFiltro.sort((a, b) => a.grasas - b.grasas)
        this.isDescendenteGras = false
        console.log(event.target)
        } else{
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.grasas - a.grasas)
          this.isDescendenteGras = true
        }; break
    }
  }

  actualizarReq(event: Event, macro: String){
    console.log("Actualiza estilo")
  }

  clickFilaAlimento(event: Event, alimento: comida){
    console.log("Alimento: " + alimento.nombre)
  }

  // blurFruta(event: Event) {
  //   console.log("SDFSF")
  // }

  actualizarListaFiltro(listaComida: comida[]) {
    this.listaComidas = listaComida
  }

}
