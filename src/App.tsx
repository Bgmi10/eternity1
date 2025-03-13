import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import MoviesHome from "./components/movies/MoviesHome";
import Footer from "./components/Footer";
import BottomNavBar from "./components/BottomNavBar";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <BottomNavBar />
      <Routes>
        <Route path="/" element={<MoviesHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
