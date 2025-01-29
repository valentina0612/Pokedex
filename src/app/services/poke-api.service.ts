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
    let url = `${URL_POKEAPI}/pokemon?limit=20&offset=0`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results;
      })
    );
  }

  getPokemonByUrl(url: string) {
    return this.http.get(url);
  }
  
  getPokemonById(id: number) {
    return this.http.get(`${URL_POKEAPI}/pokemon/${id}`);
  }

}
