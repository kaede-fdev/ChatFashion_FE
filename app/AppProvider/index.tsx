import { setIsDarkMode } from '@/redux/slices/apps';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function AppProvider({children}: {children:React.ReactNode}) {
    const dispatch = useDispatch();
    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem('theme')!)
        if(window.matchMedia('(prefers-color-scheme: dark)').matches && theme == null) {
            document.documentElement.classList.add('dark');
            dispatch(setIsDarkMode(true));
        } else if(theme === 'light') {
            document.documentElement.classList.remove('dark');
            dispatch(setIsDarkMode(false));
        }
    }, [dispatch])
    return (
        <>{children}</>
    )
}

export default AppProvider
