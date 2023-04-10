type TPokemonAbility = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

export type TPokemonAtom = {
    name: string;
    urL: string;
};

export type TPokemonDetailsAtom = {
    sprites: {
        back_default: string | null;
        front_default: string | null;
    };
    weight: number;
    height: number;
    abilities: TPokemonAbility[];
};
