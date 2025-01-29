import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_POKEAPI } from '../config/url.services';
import { map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  constructor(private http: HttpClient) { }

  getPokemon() {
    let url = `${URL_POKEAPI}/pokemon`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getMorePokemon(url: string) {
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getPokemonByUrl(url: string) {
    return this.http.get(url);
  }
  
  getPokemonByIdOrName(idOrName: number | string) {
    return this.http.get(`${URL_POKEAPI}/pokemon/${idOrName}`);
  }

  loadAllPokemon() {
    return this.http.get(`${URL_POKEAPI}/pokemon?limit=1118`);
  }

  filterPokemonByName(name: string) {
    let allPokemon = this.loadAllPokemon();
    return allPokemon.pipe(
      map((response: any) => {
        return response.results.filter((pokemon: { name: string; }) => {
          return pokemon.name.includes(name);
        });
      })
    );
  }
}
