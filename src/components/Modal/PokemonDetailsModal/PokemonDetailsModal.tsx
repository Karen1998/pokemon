import React from 'react';
import { Col, Descriptions, Row, Statistic, Typography } from 'antd';

import Modal from '../Modal';
import { TPokemonDetailsAtom } from 'src/@types';

interface IProps {
    isOpen: boolean;
    data: TPokemonDetailsAtom;
    onConfirm?: () => void;
    onClose?: () => void;
}

const PokemonDetailsModal: React.FC<IProps> = ({
    isOpen,
    onConfirm = () => {},
    onClose = () => {},
    data,
}) => {
    return (
        <Modal title="Pokemon Details" isOpen={isOpen} onConfirm={onConfirm} onClose={onClose}>
            <Row gutter={24}>
                <Col span={24}>
                    <Descriptions>
                        <Descriptions.Item label="Abilities">
                            {data.abilities.map(({ ability }, index) => {
                                if (index === data.abilities.length - 1) {
                                    return ability.name;
                                }

                                return `${ability.name}, `;
                            })}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>

                <Col span={12}>
                    <Statistic title="Weight" value={data.weight} suffix="/ 1,000" />
                </Col>

                <Col span={12}>
                    <Statistic title="Height" value={data.height} suffix="/ 100" />
                </Col>

                <Col span={12}>
                    <Typography.Text strong>Images</Typography.Text>

                    <Row>
                        <Col span={12}>
                            <img
                                src={data.sprites.back_default || ''}
                                alt="pokemon-back"
                                className="pokemon-details-image"
                            />
                        </Col>

                        <Col span={12}>
                            <img
                                src={data.sprites.front_default || ''}
                                alt="pokemon-front"
                                className="pokemon-details-image"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    );
};

export default PokemonDetailsModal;
