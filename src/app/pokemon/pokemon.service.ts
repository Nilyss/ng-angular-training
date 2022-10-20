import { Injectable } from '@angular/core'
import { Pokemon } from './pokemon'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, []))
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, undefined))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null | undefined> {
    // normalement pokemon mais in-memory retourne toujours null
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
    }
    return this.http.put(`api/pokemons`, pokemon, options).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null | undefined> {
    // normalement pokemon mais in-memory retourne toujours null
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    // normalement pokemon mais in-memory retourne toujours null
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
    }
    return this.http.post<Pokemon>(`api/pokemons/`, pokemon, options).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, null))
    )
  }

  private log(res: any) {
    console.table(res)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
    ]
  }
}
