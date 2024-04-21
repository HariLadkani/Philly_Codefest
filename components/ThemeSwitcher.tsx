// components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>Switch Theme</button>
    );
};

export default ThemeSwitcher;
