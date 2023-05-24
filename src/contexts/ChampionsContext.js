import React, { createContext, useState } from 'react';

const ChampionsContext = createContext();
const ChampionsProvider = ({ children }) => {
  const [champions, setChampions] = useState([]);

  const addChampion= (champion) => {
    setChampions([...champions, champion]);
  };

  const editChampion= (updatedChampion) => {
    const newChampion = champions.map((champion) => (
      champion.id === updatedChampion.id ? updatedChampion : champion
    ));
    setChampion(newChampion);
  };

  const deleteChampion= (championId) => {
    const newChampion = champions.filter((champion) => champion.id !== championId);
    setBench(newChampion);
  };

  return (
    <ChampionsContext.Provider value={{ champions, setChampions, addChampion, editChampion, deleteChampion }}>
      {children}
    </ChampionsContext.Provider>
  );
};

export { ChampionsContext, ChampionsProvider };