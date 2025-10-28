
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import 'bootstrap/dist/css/bootstrap.min.css';



function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
  
      </main>
      <Footer />
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
  path="/login"
  element={
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Login />
      </main>
    </div>
  }
/>

<Route
  path="/signup"
  element={
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CreateAccount />
      </main>
    </div>
  }
/>

      </Routes>
    </Router>
  );
}
