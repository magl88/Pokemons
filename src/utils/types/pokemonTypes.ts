export interface PokemonTypes {
	count: number;
	next: string | null;
	previous: string | null;
	results: TypesResult[];
}

export interface TypesResult {
	name: string;
	url: string;
}

export interface PokemonType {
	damage_relations: DamageRelations;
	game_indices: Index[];
	generation: Generation2;
	id: number;
	move_damage_class: MoveDamageClass;
	moves: Mfe[];
	name: string;
	names: Name[];
	past_damage_relations: any[];
	pokemon: TypePokemon[];
}

interface DamageRelations {
	double_damage_from: DoubleDamageFrom[];
	double_damage_to: DoubleDamageTo[];
	half_damage_from: HalfDamageFrom[];
	half_damage_to: HalfDamageTo[];
	no_damage_from: NoDamageFrom[];
	no_damage_to: any[];
}

interface DoubleDamageFrom {
	name: string;
	url: string;
}

interface DoubleDamageTo {
	name: string;
	url: string;
}

interface HalfDamageFrom {
	name: string;
	url: string;
}

interface HalfDamageTo {
	name: string;
	url: string;
}

interface NoDamageFrom {
	name: string;
	url: string;
}

interface Index {
	game_index: number;
	generation: Generation;
}

interface Generation {
	name: string;
	url: string;
}

interface Generation2 {
	name: string;
	url: string;
}

interface MoveDamageClass {
	name: string;
	url: string;
}

interface Mfe {
	name: string;
	url: string;
}

interface Name {
	language: Language;
	name: string;
}

interface Language {
	name: string;
	url: string;
}

export interface TypePokemon {
	pokemon: TypePokemon2;
	slot: number;
}

export interface TypePokemon2 {
	name: string;
	url: string;
}
