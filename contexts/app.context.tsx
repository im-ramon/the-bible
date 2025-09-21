import { usePersistedState } from '@/hooks/usePersistedState';
import { createContext, ReactNode, useContext } from 'react';

interface AppContextProps {
    fontSize: number;
    setFontSize: (size: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [persistedFontSize, setPersistedFontSize] = usePersistedState("fontSize", "18");
    
    function handleSetFontSize(size: number) {
        setPersistedFontSize(String(size));
    }

    return (
        <AppContext.Provider value={{ fontSize: Number(persistedFontSize), setFontSize: handleSetFontSize }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};