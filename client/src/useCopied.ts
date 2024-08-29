import { useContext, createContext } from 'react';

export const CopiedContext = createContext<{
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}>({
  id: '',
  setId: () => {},
});

export const CopiedProvider = CopiedContext.Provider;

export function useCopied() {
  return useContext(CopiedContext);
}
