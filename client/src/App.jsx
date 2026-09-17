import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CalculatorSection from './components/CalculatorSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import WhatsAppFloating from './components/WhatsAppFloating';
import Footer from './components/Footer';

export default function App() {
  const [calculatorCountry, setCalculatorCountry] = useState('SG');
  const [calculatorWeight, setCalculatorWeight] = useState('');
  const [calculatorService, setCalculatorService] = useState('air_lcl');
  const [calculatorDirection, setCalculatorDirection] = useState('import');

  // Triggered from Hero Quick Calculator
  const handleHeroQuickCalculate = (country, weight, service, direction) => {
    if (country) setCalculatorCountry(country);
    if (weight !== undefined) setCalculatorWeight(weight);
    if (service) setCalculatorService(service);
    if (direction) setCalculatorDirection(direction);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-brand-red selection:text-white">
      {/* Navigation Bar */}
      <Navbar onNavigateToCalculator={scrollToCalculator} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero with Quick Rate Calculator Widget */}
        <Hero onQuickCalculate={handleHeroQuickCalculate} />

        {/* 2. Primary Shipping Rate & Customs Clearance Calculator */}
        <CalculatorSection 
          initialCountry={calculatorCountry}
          initialWeight={calculatorWeight}
          initialService={calculatorService}
          initialDirection={calculatorDirection}
        />

        {/* 3. Logistics Services */}
        <ServicesSection />

        {/* 4. Company Profile & Global Network */}
        <AboutSection />

        {/* 5. Testimonials & Shipping Line Partners */}
        <TestimonialsSection />

        {/* 6. Contact Us & Office Info */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* 24/7 Floating WhatsApp Widget */}
      <WhatsAppFloating />
    </div>
  );
}
