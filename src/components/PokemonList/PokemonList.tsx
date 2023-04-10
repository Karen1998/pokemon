import React from 'react';
import { Button, List } from 'antd';

interface IProps {
    data: any[];
    loading: boolean;
    onPreview: (url: string) => void;
}

const PokemonList: React.FC<IProps> = ({ data = [], loading, onPreview }) => {
    return (
        <List
            header={<h2>Pokemon name</h2>}
            bordered
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <Button key={item.name} type="primary" onClick={() => onPreview(item.url)}>
                            View details
                        </Button>,
                    ]}
                >
                    <List.Item.Meta description={item.name} />
                </List.Item>
            )}
        />
    );
};

export default PokemonList;
