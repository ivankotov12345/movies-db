import { createContext } from 'react'

type ContextType = {
    isBurgerOpen: boolean,
    setIsBurgerOpen: (isOpen: boolean) => void,
}

export const Context = createContext<ContextType>({
    isBurgerOpen: false,
    setIsBurgerOpen: () => {},
});