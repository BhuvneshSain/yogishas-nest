import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaBars,
} from "react-icons/fa";

export default function YogishasNestLanding() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const images = document.images;
    const promises = Array.from(images).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => (img.onload = img.onerror = resolve))
    );
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
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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

      {/* Navbar */}
<nav className="fixed w-full bg-white shadow z-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="flex items-center space-x-2 cursor-pointer hover:opacity-90">
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
                    activeSection === id ? "text-green-600" : "text-gray-700"
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
                  className={`text-left text-lg font-medium ${activeSection === id ? "text-green-600" : "text-gray-700"} hover:text-green-700`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
<section id="home" className="py-20 bg-white text-gray-800 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
    
    {/* Text Left */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="flex-1 text-center lg:text-left space-y-6"
    >
      <h1 className="text-3xl md:text-4xl font-bold">
        Blossom into A <span className="text-green-600">Full-Fledged Life!</span>
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
        A dedicated space and atmosphere of focus and balance, nestled at the Valleys of La Trinidad....
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
        <a
          href="#contact"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
        >
          Visit Us
        </a>
        <a
          href="#amenities"
          className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Explore Nest
        </a>
      </div>
    </motion.div>

    {/* Image Right */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="flex-1"
    >
      <img
        src="/infra.jpg"
        alt="Yogisha's Nest Infra"
        className="w-full max-w-lg mx-auto rounded-2xl shadow-xl object-cover"
      />
    </motion.div>
  </div>
</section>





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
<p className="text-lg text-gray-700 leading-relaxed">
  Yogisha’s Nest offers a dedicated co-working space where motivation thrives and learning becomes a shared, uplifting experience. In a commitment to offer a conducive space, Yogisha’s Nest is designed to support focus and balance, empowering oneself to ignite creativity, elevate productivity, and cultivate personal growth.
</p>

          </p>
        </motion.div>
      </section>
      {/* Gallery Section */}
<section id="gallery" className="py-20 px-6 bg-white text-center">

<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
  👀👀👀

</h2>


  <div className="max-w-6xl mx-auto">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      spaceBetween={40}
      slidesPerView={1}
      className="rounded-lg shadow-lg"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
  
        <SwiperSlide key={i}>
  <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-in-out">
    <img
      src={`/gallery${i}.jpg`}
      alt={`Gallery ${i}`}
      className="w-full max-h-[90vh] object-contain transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent text-white text-sm py-3 px-4 opacity-0 group-hover:opacity-100 transition">
      View {i}
    </div>
  </div>
</SwiperSlide>

      ))}
    </Swiper>
  </div>
</section>



      {/* Amenities Section */}
 
<section id="amenities" className="py-20 px-6 bg-white text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      Yogisha’s Nest
      <span className="text-green-600 ">  Offerings 🥰</span>
    </h2>
    <div className="mx-auto w-16 h-1 bg-green-500 rounded-full"></div>
  </motion.div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      ["📍 Prime Location – Heart of La Trinidad, Benguet", "Conveniently situated in the vibrant center of La Trinidad..."],
      ["🪑 Ergonomic Study Furniture – Designed for Comfort and Focus", "Curated seating supports Ardha Siddhasana posture..."],
      ["🧭 Wall-Facing Orientation – Enhancing Concentration", "Each workstation minimizes distractions by facing walls..."],
      ["🌐 Fast and Stable High-Speed WiFi", "Seamless internet connection for your productivity..."],
      ["🔌 Charging Outlets Everywhere", "Never run out of power with easily accessible outlets..."],
      ["🧹 Clean, Well-Ventilated Environment", "Fresh air and open top-floor layout ensures comfort..."],
      ["🎨 Distraction-Free Minimalist Design", "A clutter-free space that fuels deep focus..."],
      ["🕯 Ambient Oil Lamps & Incense", "Subtle lighting and aroma to calm and energize..."],
      ["🌿 Air-Purifying Plants", "Serene and healthier atmosphere with nature’s touch..."],
      ["🧘 Rejuvenating Alfresco Space", "Peaceful outdoor zone to reset and recharge..."],
      ["🍵 Nourishing Tea & Honey", "Enjoy warm, calming herbal tea with natural honey..."],
      ["💧 Energized Water in Copper Vessels", "Hydrate with naturally energized, fresh copper-stored water."]
    ].map(([title, desc], i) => (
      <motion.div
        key={i}
        className="bg-green-50 border border-green-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-left"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
           Gather, Grow and <span className="text-green-600">Blossom!</span>
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

      {/* Footer */}
      <footer className="bg-green-100 text-green-800 py-5 text-center text-base border-t border-green-300 shadow-sm">
        &copy; {new Date().getFullYear()} <span className="font-semibold">Yogisha’s Nest</span> · All rights reserved.
      </footer>

      {/* Floating Action Buttons */}
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50" title="Back to Top">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M12 4.5v15" />
        </svg>
      </a>
      <a href="https://wa.me/639619047116" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <FaWhatsapp className="text-xl md:text-3xl" />
      </a>
    </div>
  );
}
