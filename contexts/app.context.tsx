import { usePersistedState } from '@/hooks/usePersistedState';
import { createContext, ReactNode, useContext } from 'react';

interface AppContextProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    hasBreakLine?: "0" | "1";
    toggleHasBreakLine: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [persistedFontSize, setPersistedFontSize] = usePersistedState("fontSize", "18");
    const [hasBreakLine, setHasBreakLine] = usePersistedState("hasBreakLine", "0");

    function handleSetFontSize(size: number) {
        setPersistedFontSize(String(size));
    }

    function handleSetHasBreakLine() {
        setHasBreakLine(hasBreakLine === "1" ? "0" : "1");
    }

    return (
        <AppContext.Provider value={{
            fontSize: Number(persistedFontSize),
            setFontSize: handleSetFontSize,
            hasBreakLine: hasBreakLine as "0" | "1",
            toggleHasBreakLine: handleSetHasBreakLine
        }}>
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