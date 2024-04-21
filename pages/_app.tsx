// pages/_app.tsx
import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/themes.css';  // Make sure to include your theme CSS

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
