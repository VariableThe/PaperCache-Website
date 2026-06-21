import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import Install from './components/Install';
import Screenshots from './components/Screenshots';
import Philosophy from './components/Philosophy';
import FAQ from './components/FAQ';
import Kofi from './components/Kofi';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-layout">
      <Nav />
      <main className="main-content">
        <Hero />
        <Philosophy />
        <Features />
        <Screenshots />
        <Install />
        <FAQ />
        <Kofi />
      </main>
      <Footer />
    </div>
  );
}

export default App;
