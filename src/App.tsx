import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import MoviesHome from "./components/movies/MoviesHome";
import Footer from "./components/Footer";
import BottomNavBar from "./components/BottomNavBar";
import NotFound from "./components/NotFound";
import Home from "./components/home/Home";
import HomePage from "./components/home/Home2";

function App() {
  return (
    <Router>
      <Header />
      <BottomNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesHome />} />
        {/* <Route path="/tv" element={<HomePage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
