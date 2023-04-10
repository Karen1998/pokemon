import React, { useEffect, useState } from 'react';
import { Pagination, Row, Col, Space } from 'antd';

import PokemonList from 'src/components/PokemonList/PokemonList';
import Search from 'src/components/Search/Search';
import { TPokemonAtom } from 'src/@types';

interface IProps {
    pokemonList: TPokemonAtom[];
    loading: boolean;
    currentPage: number;
    totalPageCount: number;
    pageSize: number;
    onPreview: (url: string) => void;
    onChange: (page: number, pageSize: number) => void;
}

const PokemonListContainer: React.FC<IProps> = ({
    pokemonList,
    loading,
    currentPage,
    totalPageCount,
    pageSize,
    onPreview,
    onChange,
}) => {
    const [pokemonListLocal, setPokemonListLocal] = useState(pokemonList);

    const pokemonListRef = React.useRef(pokemonList);

    const handleSearch = (term: string) => {
        if (term === '') {
            setPokemonListLocal(pokemonList);
            return;
        }

        setPokemonListLocal(
            pokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(term.toLowerCase()),
            ),
        );
    };

    useEffect(() => {
        if (pokemonListRef.current !== pokemonList) {
            pokemonListRef.current = pokemonList;
            setPokemonListLocal(pokemonList);
        }
    }, [pokemonList]);

    return (
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                    <Search onChange={handleSearch} placeholder="Find your pokemon" />
                </Space>
            </Col>

            <Col span={24}>
                <PokemonList data={pokemonListLocal} loading={loading} onPreview={onPreview} />
            </Col>

            {!loading && (
                <Space align="center">
                    <Pagination
                        showSizeChanger
                        defaultCurrent={currentPage}
                        current={currentPage}
                        total={totalPageCount}
                        onChange={onChange}
                        pageSizeOptions={['10', '20', '30']}
                        pageSize={pageSize}
                    />
                </Space>
            )}
        </Row>
    );
};

export default PokemonListContainer;
