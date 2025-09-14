// hooks/usePersistedState.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function usePersistedState(key: string, initialValue: string) {
  const [state, setState] = useState<string>(initialValue);

  // Carregar valor do AsyncStorage ao montar
  useEffect(() => {
    (async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setState(storedValue);
        }
      } catch (error) {
        console.error("Erro ao carregar do AsyncStorage:", error);
      }
    })();
  }, [key]);

  // Função para atualizar estado + AsyncStorage
  const setPersistedState = useCallback(
    async (value: string) => {
      try {
        setState(value);
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error("Erro ao salvar no AsyncStorage:", error);
      }
    },
    [key]
  );

  return [state, setPersistedState] as const;
}
