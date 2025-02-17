import Header from "./components/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/landingpage/Landing"
import Footer from "./components/Footer"
import EternityReady from "./components/EternityReady"
function App() {

  return (
    <>
     <div>
       <Header /> 
       <Router>
         <Routes>
            <Route path="/" element={<LandingPage /> } />
         </Routes>
       </Router>
       <EternityReady />
       <Footer />
     </div>
    </>
  )
}

export default App
