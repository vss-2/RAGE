import React from 'react';
import { ThemeProvider } from '@mui/material';
import PageRoutes from './pages/PageRoutes';

function App(){
    return (
        <ThemeProvider>
            <div className='App'>
                <PageRoutes />
            </div>
        </ThemeProvider>
    )
}

export default App;
