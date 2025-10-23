import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider
            theme={{
                primaryColor: "blue",
            }}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
)
