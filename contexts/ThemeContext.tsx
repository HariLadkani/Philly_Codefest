// components/ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>Switch Theme</button>
    );
};

export default ThemeSwitcher;
