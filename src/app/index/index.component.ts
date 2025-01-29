import { Component, OnInit } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  pokemon: {'name': string, 'id': number, 'image':string, 'type':any[] }[] = [];
  next: string = '';
  previous: string = '';
  constructor(private pokemonService: PokeApiService, public router:Router) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemon().subscribe((data: any) => {
      this.next = data.next;
      for (let pokemon of data.results) {
        this.loadPokemonDetails(pokemon.url);
      }});
  }

  loadMorePokemon(url: string) {
    this.pokemon = [];
    this.pokemonService.getMorePokemon(url).subscribe((data: any) => {
      this.next = data.next;
      this.previous = data.previous;
      if (data.previous == null) {
        this.previous = '';
      }

      if (data.next == null) {
        this.next = '';
      }

      for (let pokemon of data.results) {
        this.loadPokemonDetails(pokemon.url);
      }
    });
  }

  loadPokemonDetails(url: string) {
    this.pokemonService.getPokemonByUrl(url).subscribe((data: any) => {
      let pokemonData = {
        name: data['name'].charAt(0).toUpperCase() + data['name'].slice(1),
        id: data['id'],
        image: data['sprites']['front_default'],
        type: data['types'].map((type: { [x: string]: { [x: string]: any; }; }) => type['type']['name']),
      };
      this.pokemon.push(pokemonData);
      return pokemonData;
    });
  }
  
  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  onSearchInput(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === '') {
      this.pokemon = [];
      return this.loadPokemon();
    }
    if (this.pokemonService) {
      this.pokemonService.filterPokemonByName(searchValue).subscribe((data: any) => {
        this.pokemon = [];
        for (let pokemon of data) {
          this.loadPokemonDetails(pokemon.url);
        }
      });
      this.previous = '';
      this.next = '';
    }
    return this.pokemon;
  }

}
