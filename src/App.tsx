import Header from "./components/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/landingpage/Landing"
import Footer from "./components/Footer"
import BottomNavBar from "./components/BottomNavBar"
import NotFound from "./components/NotFound"

function App() {

  return (
    <>
     <div>
       <Header />
       <BottomNavBar /> 
       <Router>
         <Routes>
            <Route path="/" element={<LandingPage /> } />
            <Route path="*" element={<NotFound /> } />
         </Routes>
       </Router>
       <Footer />
     </div>
    </>
  )
}

export default App
