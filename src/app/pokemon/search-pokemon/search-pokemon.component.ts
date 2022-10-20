import { Component, OnInit } from '@angular/core'
import { Pokemon } from '../pokemon'
import { Router } from '@angular/router'
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs'
import { PokemonService } from '../pokemon.service'

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // {..."a"..."ab"..."abz"..."ab"..."abc"......} flux de recherche dans le temps. Search term ici permet de construire le flux de donnée
  searchTerms = new Subject<string>()
  // affiche les résultats de la recherche {...pokemonList(a)... pokemonList(ab) ... }
  pokemons$: Observable<Pokemon[]>

  constructor(private router: Router, private PokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.PokemonService.searchPokemonList(term)) // switchMap pour avoir résultat d'un observable et pas un flux
    )
  }

  search(term: string) {
    this.searchTerms.next(term) //next peut ressemblé à push pour un flux de donnée
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link)
  }
}
