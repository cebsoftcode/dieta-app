import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as dataRaw from './assets/json/alimentosCompletos.json'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'AppDieta';
  carbos: number = 0;
  totalCarbos: number = 0;
  difCarbos: number = 0;
  prote: number = 0;
  totalProte: number = 0;
  difProte: number = 0;
  grasas: number = 0;
  totalGrasas: number = 0;
  difGrasas: number = 0;
  listaComidas: comida[] = [];
  listaFiltro: comida[] = [];
  comidaHoy: comida[] = [];
  isDescendenteCarb: boolean | null = null;
  isDescendenteProt: boolean | null = null;
  isDescendenteGras: boolean | null = null;

  ngOnInit(): void {
    console.log("DataRaw:" + JSON.stringify(dataRaw, null, 2))
    const data: any = (dataRaw as any).default
    console.log("Data: " + JSON.stringify(data.data, null, 2))
    this.listaComidas = Array.isArray(data.data) ? data.data : [];

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
          lista = this.listaFiltro.sort((a, b) => a.carbos - b.carbos)
          this.listaFiltro = this.listaFiltro.sort((a, b) => a.carbos - b.carbos)
          this.isDescendenteCarb = false
          console.log(event.target)
        } else {
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.carbos - a.carbos)
          this.isDescendenteCarb = true
        }; break
      case "prote":
        if (this.isDescendenteProt) {
          lista = this.listaFiltro.sort((a, b) => a.prote - b.prote)
          this.listaFiltro = this.listaFiltro.sort((a, b) => a.prote - b.prote)
          this.isDescendenteProt = false
          console.log(event.target)
        } else {
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.prote - a.prote)
          this.isDescendenteProt = true
        }; break
      case "grasa":
        if (this.isDescendenteGras) {
          lista = this.listaFiltro.sort((a, b) => a.grasas - b.grasas)
          this.listaFiltro = this.listaFiltro.sort((a, b) => a.grasas - b.grasas)
          this.isDescendenteGras = false
          console.log(event.target)
        } else {
          this.listaFiltro = this.listaFiltro.sort((a, b) => b.grasas - a.grasas)
          this.isDescendenteGras = true
        }; break
    }
  }

  actualizarReq(event: Event, macro: String) {
    const elemento = event.target as HTMLInputElement
    switch (macro) {
      case "carbos": this.carbos = Number(elemento.value); break;
      case "prote": this.prote = Number(elemento.value); break;
      case "grasas": this.grasas = Number(elemento.value); break;
    }
    this.comprobarDiferencia()
    console.log("Carbos: " + this.carbos + " // Protes: " + this.prote + " // Grasas: " + this.grasas)
  }

  comprobarDiferencia() {
    this.difCarbos = this.carbos - this.totalCarbos
    this.difProte = this.prote - this.totalProte
    this.difGrasas = this.grasas - this.totalGrasas
  }

  //getTotalBackGroundColor(macro: String) {
    // switch (macro) {
    //   case "carbos":
    //     switch (Math.sign(this.totalCarbos)) {
    //       case 1: return { 'background-color': 'rgba(255, 119, 119, 0.452)'}
    //       case 0: return { 'background-color': 'rgba(124, 255, 119, 0.479)'}
    //       case -1: return { 'background-color': 'rgba(255, 246, 119, 0.438)'}
    //       default: return
    //     }
    //   case "prote": switch (Math.sign(this.totalCarbos)) {
    //     case 1: return { 'background-color': 'rgba(255, 119, 119, 0.452)'}
    //     case 0: return { 'background-color': 'rgba(124, 255, 119, 0.479)'}
    //     case -1: return { 'background-color': 'rgba(255, 246, 119, 0.438)'}
    //     default: return
    //   }
    //   case "grasas": switch (Math.sign(this.totalCarbos)) {
    //     case 1: return { 'background-color': 'rgba(255, 119, 119, 0.452)'}
    //     case 0: return { 'background-color': 'rgba(124, 255, 119, 0.479)'}
    //     case -1: return { 'background-color': 'rgba(255, 246, 119, 0.438)'}
    //     default: return 
    //   }
    //   default: return
    // }
  //}

  clickFilaAlimento(event: Event, alimento: comida) {
    console.log("Alimento: " + alimento.nombre)
    this.totalCarbos += alimento.carbos
    this.totalProte += alimento.prote
    this.totalGrasas += alimento.grasas
    this.comidaHoy.push(alimento)
    this.comprobarDiferencia()
  }

  eliminarDeLista(i: number) {
    const alimento = this.comidaHoy[i]
    this.totalCarbos -= alimento.carbos
    this.totalProte -= alimento.prote
    this.totalGrasas -= alimento.grasas
    this.comidaHoy.splice(i, 1)
    this.comprobarDiferencia()
  }

  // blurFruta(event: Event) {
  //   console.log("SDFSF")
  // }

  actualizarListaFiltro(listaComida: comida[]) {
    this.listaComidas = listaComida
  }

}
