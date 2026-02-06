import { useEffect, useState } from 'react';
import { GammaScene } from './components/GammaScene';
import { CursorTrail } from './components/CursorTrail';
import { EnergyParticles } from './components/EnergyParticles';
import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PowerSection } from './components/PowerSection';
import { StatsSection } from './components/StatsSection';
import { TechSection } from './components/TechSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark theme and hide default cursor on desktop
    document.documentElement.classList.add('dark');
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      document.body.style.cursor = 'none';
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background Scene */}
      <GammaScene />
      
      {/* Floating Particles */}
      <EnergyParticles />
      
      {/* Custom Cursor Trail */}
      <CursorTrail />
      
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <PowerSection />
        <StatsSection />
        <TechSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>
      
      {/* Scroll Progress */}
      <ScrollProgress />
    </div>
  );
}