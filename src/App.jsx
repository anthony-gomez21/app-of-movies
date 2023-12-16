import './App.css';
import Aside from './sections/aside/Aside';
import Billboards from './sections/billboards/Billboards';
import FetchGenres from './hooks/UseFetchGenres';
import FetchDiscover from './hooks/UseFetchDiscover';
import Navbar from './sections/navbar/Navbar';
import Footer from './sections/footer/Footer';
import { useAppContext } from './AppContext';

function App() {
  const { movieOrTv, searchData, page } = useAppContext();

  const { genres, loading } = FetchGenres({ movieOrTv });
  const { dataDiscover, totalPagesDiscover } = FetchDiscover({
    searchData,
    movieOrTv,
    page,
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <Aside genres={genres} loading={loading} />
        <Billboards
          key={page}
          dataDiscover={dataDiscover}
          movieOrTv={movieOrTv}
          totalPagesDiscover={totalPagesDiscover}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
