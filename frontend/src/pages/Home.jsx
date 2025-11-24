import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import NewArrivals from '../components/NewArrivals';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Hero />
        <NewArrivals />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
