import React, { useRef, useState } from 'react';
import { Input } from 'antd';

interface IProps {
    placeholder?: string;
    debounceTime?: number;
    onChange: (value: string) => void;
}

const Search: React.FC<IProps> = ({ placeholder = '', debounceTime = 350, onChange }) => {
    const [value, setValue] = useState('');

    const timeout = useRef<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            onChange(e.target.value);
        }, debounceTime);
    };

    return <Input placeholder={placeholder} value={value} onChange={handleChange} />;
};

export default Search;
