import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaBars,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function YogishasNestLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  const applyTheme = (mode) => {
    const isDark = mode === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  };

  // Render immediately; allow images to load progressively for better FCP.

  useEffect(() => {
    // Initialize theme from localStorage or system preference once
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      applyTheme(initial);
      localStorage.setItem('theme', initial);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    // Smooth transition
    document.documentElement.classList.add('theme-transition');
    applyTheme(next);
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

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
      setScrolled(window.scrollY > 10);
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

  

  return (
    <div className="font-sans text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 transition-colors duration-300 relative">

      {/* Navbar */}
<nav
  className={`fixed w-full z-20 border-b transition-colors duration-300 ${
    scrolled
      ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow border-white/40 dark:border-white/10'
      : 'backdrop-blur bg-white/40 dark:bg-gray-900/40 border-white/30 dark:border-white/10'
  }`}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="flex items-center space-x-2 cursor-pointer hover:opacity-90">
              <img src="/logo.png" alt="Logo" className="h-10 object-contain transition-transform hover:rotate-6" />
              <div className="hidden sm:block">
                <span className="block text-lg font-semibold text-green-700 dark:text-green-400">Yogisha’s Nest</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Sanctuary for growth, focus and balance</span>
              </div>
            </a>
            <div className="hidden md:flex items-center space-x-6">
              {["home", "about", "gallery", "amenities", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-2 py-1 font-medium transition duration-300 ease-in-out hover:text-green-700 dark:hover:text-green-400 ${
                    activeSection === id ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-200"
                  }`}
                  aria-current={activeSection === id ? 'page' : undefined}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  {activeSection === id && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-600 dark:bg-green-500"></span>}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full border border-transparent hover:border-green-500 text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <FaSun className="text-xl" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
              </button>
            </div>
            <button className="md:hidden text-green-700 dark:text-green-400" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars className="text-2xl" />
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-2 flex flex-col gap-2 rounded shadow-lg p-4 backdrop-blur bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-white/10">
              <div className="flex justify-end pb-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full border border-transparent hover:border-green-500 text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <FaSun className="text-xl" />
                  ) : (
                    <FaMoon className="text-xl" />
                  )}
                </button>
              </div>
              {["home", "about", "gallery", "amenities", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left text-lg font-medium ${activeSection === id ? "text-green-600" : "text-gray-700 dark:text-gray-200"} hover:text-green-700 dark:hover:text-green-400`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
<section id="home" className="py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
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

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
A dedicated space and atmosphere of focus and balance, nestled at the Valleys of La Trinidad, designed to be a sanctuary of one's growth, creativity and productivity.      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
        <a
          href="#contact"
          className="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-md shadow transition"
        >
          Visit Us
        </a>
        <a
          href="#amenities"
          className="border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white font-semibold px-6 py-2 rounded-md transition"
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
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </motion.div>
  </div>
</section>





  {/* About Section */}
      <section id="about" className="py-20 px-6 bg-green-50 dark:bg-gray-900 text-center transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >


          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            About <span className="text-green-600">Yogisha’s Nest</span>
          </h2>
          <div className="mx-auto w-16 h-1 bg-green-500 rounded-full mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Yogisha’s Nest offers a dedicated co-working space where motivation thrives and learning becomes a shared, uplifting experience. In a commitment to offer a conducive space, Yogisha’s Nest is designed to support focus and balance, empowering oneself to ignite creativity, elevate productivity, and cultivate personal growth.
          </p>
        </motion.div>
      </section>
      {/* Gallery Section */}
<section id="gallery" className="py-20 px-6 bg-white dark:bg-gray-900 text-center transition-colors">

<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
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
  <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-in-out bg-white dark:bg-gray-800">
    <img
      src={`/gallery${i}.jpg`}
      alt={`Gallery ${i}`}
      className="w-full max-h-[90vh] object-contain transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      decoding="async"
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
 
<section id="amenities" className="py-20 px-6 bg-white dark:bg-gray-900 text-center transition-colors">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      Yogisha’s Nest
      <span className="text-green-600"> Offerings 💝</span>
    </h2>
    <div className="mx-auto w-16 h-1 bg-green-500 rounded-full"></div>
  </motion.div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      [
        "📍 Prime Location – Heart of La Trinidad, Benguet",
        "Conveniently situated in the vibrant center of La Trinidad, Yogisha’s Nest offers unparalleled accessibility for students and professionals."
      ],
      [
        "🪑 Ergonomic Study Furniture – Designed for Comfort and Focus",
        "Our thoughtfully curated study tables and chairs are tailored to support individuals aiming to enhance their receptivity and concentration. Specifically, our seating arrangements facilitate the Ardha Siddhasana posture—a seated position known for promoting mental clarity and physical alignment."
      ],
      [
        "🧭 Wall-Facing Orientation – Enhancing Concentration",
        "Each workstation is strategically positioned to face the wall, minimizing distractions and promoting a deep focus. This arrangement supports a conducive study or work environment, allowing individuals to immerse themselves fully in their tasks without external interruptions."
      ],
      [
        "🌐 Fast and Stable High-Speed WiFi",
        "Stay connected with seamless, ultra-fast internet, enabling uninterrupted work and learning."
      ],
      [
        "🔌 Charging Outlets Everywhere",
        "Never run out of power with conveniently placed charging outlets throughout the space, ensuring your devices stay fully charged."
      ],
      [
        "🧹 Clean, Well-Ventilated Environment",
        "Breathe easy in a bright, airy space with optimal airflow on the top floor, ensuring a fresh and comfortable atmosphere for productivity and ease."
      ],
      [
        "🎨 Distraction-Free Minimalist Design",
        "Thoughtfully designed, clutter-free space promotes clarity and focus, helping you to stay immersed in your work with zero distractions."
      ],
      [
        "🕯 Ambient Oil Lamps & Incense",
        "Subtle lighting yet impactful energy from oil lamps and the calming fragrance and purification of incense create an environment that fosters concentration, ease, and creativity."
      ],
      [
        "🌿 Air-Purifying Plants",
        "Our space is enriched with air-purifying plants, promoting both a healthier environment and a serene, grounded atmosphere for focused work."
      ],
      [
        "🧘 Rejuvenating Alfresco Space",
        "Step outside into our refreshing alfresco area, a peaceful retreat where you can recharge, stretch your legs, or simply enjoy the outdoors."
      ],
      [
        "🍵 Nourishing Tea & Honey",
        "Savor a warm cup of tea, infused with calming herbs, and sweetened with natural honey—perfect for a mid-work boost or moment of pause."
      ],
      [
        "💧 Energized Water in Copper Vessels",
        "Stay hydrated with refreshing, naturally energized water served in copper vessels, supporting your well-being throughout your workday."
      ]
    ].map(([title, desc], i) => (
      <motion.div
        key={i}
        className="bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-left"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{desc}</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50 dark:bg-gray-900 text-center transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
           Gather, Grow and <span className="text-green-600">Blossom!</span>
          </h2>
          <div className="mx-auto w-16 h-1 bg-green-500 rounded-full mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            2nd Floor, IB, 41b Laoyan I St, Baguio, 2601 Benguet, Philippines
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
          <a href="https://maps.app.goo.gl/W8n5B2dE2sJNQcLW9" title="Google Maps" className="hover:text-green-800" target="_blank" rel="noopener noreferrer" aria-label="Open Google Maps location">
            <FaMapMarkerAlt />
          </a>
          <a href="tel:+639619047116" title="Call" className="hover:text-green-800" aria-label="Call Yogisha’s Nest">
            <FaPhoneAlt />
          </a>
          <a href="https://www.instagram.com/yogishasnest/" title="Instagram" className="hover:text-green-800" target="_blank" rel="me noopener noreferrer" aria-label="Open Instagram profile">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/people/Yogishas-Nest/61574977436271/#" title="Facebook" className="hover:text-green-800" target="_blank" rel="me noopener noreferrer" aria-label="Open Facebook page">
            <FaFacebook />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
   <footer className="bg-gray-800 dark:bg-black text-gray-200 dark:text-gray-300 py-6 text-center text-sm border-t border-white/30 dark:border-white/10 shadow-inner transition-colors">
  &copy; {new Date().getFullYear()} <span className="font-semibold">Yogisha’s Nest</span> · All rights reserved. <br />
  Built with ❤️ by{" "}
  <a
    href="https://github.com/BhuvneshSain"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 transition-colors"
  >
    Bhuvnesh Sain
  </a>
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
