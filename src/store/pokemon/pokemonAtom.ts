import { atom } from 'jotai';
import { TPokemonAtom, TPokemonDetailsAtom } from 'src/@types';

export const pokemonAtom = atom<TPokemonAtom[]>([]);
export const pokemonPreviewAtom = atom<TPokemonDetailsAtom | null>(null);
