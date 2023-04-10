import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { Col, Row } from 'antd';

import {
    getPokemonDetails,
    getPokemonList,
    pokemonAtom,
    pokemonPreviewAtom,
} from './store/pokemon';

import PokemonDetailsModal from './components/Modal/PokemonDetailsModal/PokemonDetailsModal';
import PokemonListContainer from './containers/PokemonListContainer/PokemonListContainer';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const paginationRef = useRef({
        count: 0,
        offset: 0,
        currentPage: 1,
        pageSize: 10,
    });

    const [pokemonState, setPokemonState] = useAtom(pokemonAtom);
    const [pokemonPreviewState, setPokemonPreviewState] = useAtom(pokemonPreviewAtom);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePageChange = (page: number, pageSize: number) => {
        paginationRef.current = {
            ...paginationRef.current,
            pageSize: pageSize,
            offset: (page - 1) * pageSize,
            currentPage: page,
        };
        handleLoadMorePokemon();
    };

    const handleLoadMorePokemon = () => {
        const { pageSize, offset } = paginationRef.current;

        setLoading(true);

        getPokemonList({ limit: pageSize, offset: offset })
            .then(({ data }) => {
                paginationRef.current.count = data.count;
                setPokemonState(data.results);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePokemonPreview = (url: string) => {
        const parsedStr = url.split('/');
        const id = parsedStr[parsedStr.length - 2];

        getPokemonDetails(Number(id))
            .then(({ data }) => {
                setPokemonPreviewState({
                    weight: data.weight,
                    height: data.height,
                    sprites: {
                        back_default: data.sprites.back_default,
                        front_default: data.sprites.front_default,
                    },
                    abilities: data.abilities,
                });
            })
            .then(() => {
                handleOpenModal();
            });
    };

    useEffect(() => {
        handleLoadMorePokemon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                marginTop: '20px',
                paddingBottom: '20px',
            }}
        >
            <Row>
                <Col span={18} offset={3}>
                    <PokemonListContainer
                        pokemonList={pokemonState}
                        loading={loading}
                        currentPage={paginationRef.current.currentPage}
                        totalPageCount={paginationRef.current.count}
                        pageSize={paginationRef.current.pageSize}
                        onPreview={handlePokemonPreview}
                        onChange={handlePageChange}
                    />
                </Col>
            </Row>

            {pokemonPreviewState && (
                <PokemonDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    data={pokemonPreviewState}
                />
            )}
        </div>
    );
};

export default App;
