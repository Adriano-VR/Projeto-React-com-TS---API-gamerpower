import { ReactNode, createContext, useState } from "react";

type CategoryContextProps = {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedSort: string;
    setSelectedSort: (sort: string) => void;
};

type CategoryProviderProps = {
  children: ReactNode;
};

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export const CategoryContextProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory,selectedSort,setSelectedSort }}>
      {children}
    </CategoryContext.Provider>
  );
};