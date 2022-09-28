import { Component, OnInit } from '@angular/core'
import { POKEMONS } from './mock-pokemon-list'
import { Pokemon } from './pokemon'

@Component({
  selector: 'app-root',
  template: ` <h1>{{ title }}</h1> `,
})
export class AppComponent implements OnInit {
  title = 'Liste de Pokémons'
  pokemonList: Pokemon[] = POKEMONS

  ngOnInit() {
    this.selectPokemon(this.pokemonList[0])
  }

  selectPokemon(pokemon: Pokemon) {
    console.table(this.pokemonList)
    console.log(`vous avez cliqué sur le pokemon ${pokemon.name}`)
  }
}
