import { ReactNode, createContext, useState } from "react";

type AddRemoverProps = {
  AddRemover : boolean,
  setAddRemover : (newValor:boolean) => void,
  jogoRemovido:boolean,
  setjogoRemovido : (newValor:boolean) => void,
};

type AddRemoverProviderProps = {
  children: ReactNode;
};

export const AddRemoverContext = createContext<AddRemoverProps>(
  {} as AddRemoverProps
);

export const AddRemoverProviderProps = ({ children }: AddRemoverProviderProps) => {
 const[AddRemover,setAddRemover] = useState(false);
 const [jogoRemovido,setjogoRemovido]  = useState(false) 

  return (
    <AddRemoverContext.Provider value={{ AddRemover,setAddRemover,jogoRemovido,setjogoRemovido}}>
      {children}
    </AddRemoverContext.Provider>
  );
};

