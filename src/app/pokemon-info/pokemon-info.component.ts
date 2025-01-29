import { Component, OnInit } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.css'
})
export class PokemonInfoComponent implements OnInit {
  pokemonId!: number;
  pokemon: {'name': string, 'id': number, 'image':string, 'type':any[], 'abilities':any[],'stats':any[] } = {'name':'', 'id':0, 'image':'', 'type':[], 'abilities':[], 'stats':[]};
  theme = {'color': '', 'background': '', 'card':''};

constructor(private pokemonService: PokeApiService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.pokemonId = this.route.snapshot.params['id'];
    this.loadPokemonInfo();
    
  }

  loadPokemonInfo(){
    this.pokemonService.getPokemonById(this.pokemonId).subscribe((data: any) => {
      let pokemonData = {
        name: data['name'].charAt(0).toUpperCase() + data['name'].slice(1),
        id: data['id'],
        image: data['sprites']['front_default'],
        type: data['types'].map((type: { [x: string]: { [x: string]: any; }; }) => type['type']['name'].charAt(0).toUpperCase() + type['type']['name'].slice(1)),
        abilities: data['abilities'].map((ability: { [x: string]: { [x: string]: any; }; }) => ability['ability']['name'] ),
        stats: data['stats'].map((stat: { [x: string]: { [x: string]: any; }; }) => {
          return {name: stat['stat']['name'].toUpperCase(), baseValue: stat['base_stat'], effort: stat['effort']};
        }),
      };
      this.pokemon = pokemonData;
      this.themes(this.pokemon.type[0]);
    });
  }

  themes(type: string){
    if(type === 'Water'){
      return this.theme = {'color': '#5798fa', 'background': '../../assets/media/waterBackground.jpg', 'card':'../../assets/media/waterCard.jpg'};
    }
    if(type === 'Fire'){
      return this.theme = {'color': '#FF3D00', 'background': 'assets/media/fireBackground.jpg', 'card':'assets/media/fireCard.jpg'};
    }
    if(type === 'Grass'){
      return this.theme = {'color': '#00C853', 'background': 'assets/media/grassBackground.jpg', 'card':'assets/media/grassCard.jpg'};
    }
    if(type === 'Bug'){
      return this.theme = {'color': '#689F38', 'background': 'assets/media/bugBackground.jpg', 'card':'assets/media/bugCard.jpg'};
    }
    else{
      return this.theme = {'color': '#6b5250', 'background': 'assets/media/normalBackground.jpg', 'card':'assets/media/normalCard.jpg'};
    }
  }

}
