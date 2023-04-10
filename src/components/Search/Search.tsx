import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useIsMounted } from 'src/hooks';

interface IProps {
    placeholder?: string;
    debounceTime?: number;
    onChange: (value: string) => void;
}

const Search: React.FC<IProps> = ({ placeholder = '', debounceTime = 350, onChange }) => {
    const [value, setValue] = useState('');

    const isMounted = useIsMounted();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (isMounted()) {
            const timeout = setTimeout(() => {
                onChange(value);
            }, debounceTime);

            return () => clearTimeout(timeout);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return <Input placeholder={placeholder} onChange={handleChange} />;
};

export default Search;
