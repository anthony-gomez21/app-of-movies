import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [movieOrTv, setMovieOrTv] = useState('movie');
  const [showPopulares, setShowPopulares] = useState(true);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState([]);

  //   NAVBAR SEARCH

  const [search, setSearch] = useState('');
  const [submitSearch, setSubmitSearch] = useState('');

  //   OBTENER EL NUEVO VALOR DE PAGE

  const changePage = (value) => {
    setPage(value);
  };

  //   OBTENER EL NUEVO VALOR DE SEARCHDATA Y PODER FILTRAR ,
  //   TAMBIEN PARA MOSTRAR O NO LA SECCION DE POPULARES

  const handleSearchData = (data) => {
    setSearchData(data);
    setShowPopulares(false);
    changePage(1);
  };

  //   MOVIE OR TV - CAMBIAR EL TPO Y CANTIDAD DE PAGINAS-

  const typeChange = (data) => {
    setMovieOrTv(data);
    changePage(1);
    setSearch('');
  };

  //   FOR OPEN AND CLOSE ASIDE

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const contextValues = {
    searchData,
    setSearchData,
    movieOrTv,
    setMovieOrTv,
    showPopulares,
    setShowPopulares,
    page,
    setPage,
    searchName,
    setSearchName,
    search,
    setSearch,
    submitSearch,
    setSubmitSearch,
    changePage,
    handleSearchData,
    typeChange,
    toggleMenu,
    isMenuOpen,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
