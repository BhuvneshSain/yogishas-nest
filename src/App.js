// Full fixed code with all sections restored
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebook, FaWhatsapp, FaBars } from "react-icons/fa";

export default function YogishasNestLanding() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
const [selectedImg, setSelectedImg] = useState(null);



useEffect(() => {
  const images = document.images;
  const promises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => img.onload = img.onerror = resolve);
  });
  

  Promise.all(promises).then(() => setLoading(false));
}, []);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "gallery", "amenities", "contact"];
      let closestSection = "home";
      let minOffset = window.innerHeight;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offset = Math.abs(section.getBoundingClientRect().top);
          if (offset < minOffset) {
            minOffset = offset;
            closestSection = id;
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // adjust based on header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-700 bg-white relative">
       <nav className="fixed w-full backdrop-blur-md bg-white/70 shadow z-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-2 cursor-pointer hover:opacity-90">
        <img src="/logo.png" alt="Logo" className="h-10 object-contain transition-transform hover:rotate-6" />
        <div className="hidden sm:block">
          <span className="block text-lg font-semibold text-green-700">Yogisha’s Nest</span>
          <span className="text-sm text-gray-500">A Nest for Mind & Study</span>
        </div>
      </a>
      <div className="hidden md:flex items-center space-x-6">
        {["home", "about", "gallery", "amenities", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative px-2 py-1 font-medium transition duration-300 ease-in-out hover:text-green-700 ${
              activeSection === id ? 'text-green-600' : 'text-gray-700'
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
            {activeSection === id && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-600 animate-grow"></span>}
          </button>
        ))}
      </div>
      <button className="md:hidden text-green-700" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars className="text-2xl" />
      </button>
    </div>
    {menuOpen && (
      <div className="md:hidden mt-2 flex flex-col gap-2 bg-white rounded shadow-lg p-4">
        {["home", "about", "gallery", "amenities", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`text-left text-lg font-medium ${activeSection === id ? 'text-green-600' : 'text-gray-700'} hover:text-green-700`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>
    )}
  </div>
</nav>
          {/* Hero Section */}
<section
  id="home"
  className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
  style={{ backgroundImage: "url('/infra.jpg')" }}
>
  {/* Dark top gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>

  {/* Text content */}
  <div className="relative z-10 text-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
      Blossom into <span className="text-green-300">Stillness</span>
    </h1>
    <p className="mt-4 text-lg sm:text-xl max-w-xl mx-auto drop-shadow-sm">
      A peaceful space to read, work, and grow in the heart of Baguio.
    </p>
  </div>
</section>




<div className="relative w-full overflow-hidden leading-none rotate-180">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-current text-green-50">
    <path d="M0,0V46.29c47.35,22,104,31.86,158,28.52C302.6,64,425,1,600,1s297.4,63,442,73.81c54,3.33,110.65-6.5,158-28.52V0Z"></path>
  </svg>
</div>

      
   




            {/* About Section */}
<section id="about" className="py-20 px-6 bg-green-50 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      About <span className="text-green-600">Yogisha’s Nest</span>
    </h2>
    <div className="mx-auto w-16 h-1 bg-green-500 rounded-full mb-6"></div>
    <p className="text-lg text-gray-700 leading-relaxed">
      At Yogisha’s Nest, we believe in nurturing the mind through stillness, creativity, and focus. Nestled quietly on the 5th floor with a view of the hills, our library and co-working space offers an environment where students, freelancers, and dreamers alike can thrive.
    </p>
  </motion.div>
</section>

<div className="relative w-full overflow-hidden leading-none">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-current text-white">
    <path d="M0,0V46.29c47.35,22,104,31.86,158,28.52C302.6,64,425,1,600,1s297.4,63,442,73.81c54,3.33,110.65-6.5,158-28.52V0Z"></path>
  </svg>
</div>


      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white">
  <motion.h2
    className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    A Glimpse Inside
  </motion.h2>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="relative overflow-hidden rounded-xl shadow-lg group"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
      >
<img
  onClick={() => setSelectedImg(`/gallery${i + 1}.jpg`)}
  src={`/gallery${i + 1}.jpg`}
  alt={`Gallery ${i + 1}`}
  className="cursor-pointer w-full h-64 object-cover group-hover:opacity-75 transition-opacity"
  loading="lazy"
/>


        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg font-medium">
          View {i + 1}
        </div>
      </motion.div>
    ))}
  </div>
</section>



<div className="relative w-full overflow-hidden leading-none rotate-180">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-current text-green-50">
    <path d="M0,0V46.29c47.35,22,104,31.86,158,28.52C302.6,64,425,1,600,1s297.4,63,442,73.81c54,3.33,110.65-6.5,158-28.52V0Z"></path>
  </svg>
</div>

      {/* Amenities Section */}
 <section id="amenities" className="py-20 px-6 bg-white text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-10"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      What We <span className="text-green-600">Offer</span>
    </h2>
    <div className="mx-auto w-16 h-1 bg-green-500 rounded-full"></div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    {[
      "📚 Library Nook – For readers and exam warriors",
      "💻 Co-working Space – For freelancers and thinkers",
      "🌸 Peaceful Ambience – Nature-inspired, silent, and clean",
      "🌿 Indoor Plants & Balcony – Reconnect with nature while you work",
      "🚶 Walk-ins Welcome – Come in anytime during open hours",
      "⚡ Free WiFi & Charging Ports"
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-green-50 border border-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-left"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <p className="text-gray-700 font-medium text-lg">{item}</p>
      </motion.div>
    ))}
  </motion.div>
</section>
<div className="relative w-full overflow-hidden leading-none">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-current text-white">
    <path d="M0,0V46.29c47.35,22,104,31.86,158,28.52C302.6,64,425,1,600,1s297.4,63,442,73.81c54,3.33,110.65-6.5,158-28.52V0Z"></path>
  </svg>
</div>
      {/* Contact Section */}
<section id="contact" className="py-20 px-6 bg-green-50 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      Come Find Your <span className="text-green-600">Calm</span>
    </h2>
    <div className="mx-auto w-16 h-1 bg-green-500 rounded-full mb-6"></div>
    <p className="text-lg text-gray-700 mb-4">
      5th Floor, IB, 41b Laoyan I St, Baguio, 2601 Benguet, Philippines
    </p>
  </motion.div>

  <div className="w-full max-w-5xl mx-auto mb-8 rounded-xl overflow-hidden shadow-md">
    <iframe
      src="https://maps.google.com/maps?q=Yogisha's%20Nest%20Baguio&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map of Yogisha's Nest"
    ></iframe>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex justify-center gap-6 text-2xl text-green-600"
  >
    <a href="https://maps.app.goo.gl/W8n5B2dE2sJNQcLW9" title="Google Maps" className="hover:text-green-800">
      <FaMapMarkerAlt />
    </a>
    <a href="tel:+639619047116" title="Call" className="hover:text-green-800">
      <FaPhoneAlt />
    </a>
    <a href="https://www.instagram.com/yogishasnest/" title="Instagram" className="hover:text-green-800">
      <FaInstagram />
    </a>
    <a href="https://www.facebook.com/people/Yogishas-Nest/61574977436271/#" title="Facebook" className="hover:text-green-800">
      <FaFacebook />
    </a>
  </motion.div>
</section>

<footer className="bg-green-100 text-green-800 py-5 text-center text-base border-t border-green-300 shadow-sm">
  &copy; {new Date().getFullYear()} <span className="font-semibold">Yogisha’s Nest</span> · All rights reserved.
</footer>



      {/* Scroll to Top Button */}
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
         className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
         title="Back to Top">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M12 4.5v15" />
        </svg>
      </a>

      <a href="https://wa.me/639619047116" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <FaWhatsapp className="text-xl md:text-3xl" />
      </a>


    <AnimatePresence>
  {selectedImg && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={() => setSelectedImg(null)}
    >
      <motion.img
        src={selectedImg}
        alt="Zoomed View"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )}
</AnimatePresence>


    </div>



    
  );

  
}
