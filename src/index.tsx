// import react
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyApp(): JSX.Element {
    return (
        <>
        Beoble test 
        </>
    )
}

const container = document.getElementById('app-root')!;
const root = createRoot(container);

root.render(<MyApp />)
