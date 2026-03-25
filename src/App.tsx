import { useState, useEffect, useRef, ReactNode, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Trophy, 
  Briefcase, 
  User, 
  ChevronRight,
  Moon,
  Sun,
  Send,
  Sparkles,
  Router,
  RouterIcon,
  LucideRouter,
  Edit2Icon,
  CameraIcon,
  Edit,
  Edit3,
  Edit3Icon,
  icons,
  IdCardIcon,
  IdCardLanyard,
  NetworkIcon,
  Youtube
} from 'lucide-react';
import { Certificate } from 'crypto';
import { NetworkResources } from 'inspector/promises';

// --- Components ---

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Experience', 'Certifications', 'Contact'];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);

        // Small delay to ensure menu state update doesn't interrupt scroll on some mobile browsers
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 10);

    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'} ${!isDark && scrolled ? 'border-black/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>umarsyf<span className="text-brand-primary">.</span></a>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item)}
              className="hover:text-brand-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:scale-110 transition-transform"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:block px-5 py-2 rounded-full bg-brand-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Hire Me
          </a>
          <button 
            className="md:hidden p-2 glass rounded-lg relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 block w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 block w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-1'}`} />
              <span className={`absolute left-0 block w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-lg font-medium hover:text-brand-primary transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full py-3 rounded-xl bg-brand-primary text-black font-bold text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-brand-primary font-mono text-sm uppercase tracking-widest mb-2 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-bold tracking-tight"
    >
      {children}
    </motion.h2>
  </div>
);

const SkillCard = ({ name, icon: Icon, level, isDark }: { name: string; icon: any; level: number; isDark: boolean }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-3xl flex flex-col gap-4"
  >
    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
      <Icon size={24} />
    </div>
    <div>
      <h3 className={`font-display font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{name}</h3>
      <div className={`w-full h-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'} rounded-full overflow-hidden`}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-brand-primary"
        />
      </div>
    </div>
  </motion.div>
);

const ExperienceItem = ({ role, company, period, description, isDark }: { role: string; company: string; period: string; description: string; isDark: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`relative pl-8 pb-12 border-l ${isDark ? 'border-white/10' : 'border-black/10'} last:pb-0`}
  >
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
    <span className="text-xl font-bold text-brand-primary mb-1 block">{period}</span>
    <h3 className={`text-2xl font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{role}</h3>
    <p className={`text-lg font-medium ${isDark ? 'text-white/60' : 'text-black/60'} mb-4`}>{company}</p>
    <p className={`${isDark ? 'text-white/40' : 'text-black/50'} leading-relaxed max-w-2xl`}>{description}</p>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? 'dark bg-[#1a1a1a] text-white' : 'bg-[#999999] text-black'} font-sans selection:bg-brand-primary selection:text-black min-h-screen transition-colors duration-500`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      <main ref={containerRef} className="relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-secondary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8 ${isDark ? 'text-white' : 'text-black'}`}
            >
              <Sparkles size={16} className="text-brand-primary" />
              <span>Available for new opportunities</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-[0.9] mb-8"
            >
              Olaa <br />
              <span className="text-gradient">I'm Umar</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-lg md:text-2xl ${isDark ? 'text-white/60' : 'text-black/70'} max-w-2xl mx-auto mb-12 leading-relaxed`}
            >
              Hi, I'm <span className={`${isDark ? 'text-white' : 'text-black'} font-semibold`}>Muhammad Syafi</span>. A passionate developer focused on building high-performance, visually stunning web applications that tell a story.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
            >
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full ${isDark ? 'bg-white text-black' : 'bg-black text-white'} font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-xl`}
              >
                Get in Touch
              </a>
              <a 
                href="#experience" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('experience');
                  if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full glass font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                View My Storyline <ChevronRight size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest opacity-40">Scroll to explore</span>
            <div className="w-px h-12 bg-linear-to-b from-brand-primary to-transparent" />
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 px-5 max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="Expertise">Technical Skills</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard name="Mikrotik" icon={Router} level={100} isDark={isDark} />
            <SkillCard name="Cisco" icon={RouterIcon} level={80} isDark={isDark} />
            <SkillCard name="Video Editing" icon={Edit3Icon} level={90} isDark={isDark} />
            <SkillCard name="Photography" icon={CameraIcon} level={100} isDark={isDark} />
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            {['MTCNA', 'MTCRE', 'MTCINE', 'CCNA', 'CCNP', 'CCIE', 'After Effect', 'Premiere Pro', 'Davinci Resolve', 'Lightroom'].map((skill) => (
              <motion.div 
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="glass py-2 md:py-3 px-4 md:px-6 rounded-2xl text-center text-xs md:text-sm font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Achievements Section */}
        <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            <div id="experience">
              <SectionHeading subtitle="Journey">Education</SectionHeading>
              <div className="mt-12">
                <ExperienceItem 
                  role="Network Engineer"
                  company="IDN Polytechnic"
                  period="2025 - Present"
                  description="2nd semester student who is enthusiastic about exploring technology and will become an important person in the technology sector."
                  isDark={isDark}
                />
                <ExperienceItem 
                  role="Senior High School"
                  company="MA Al-Irsyad Tengaran"
                  period="2022 - 2025"
                  description="Built and maintained over 20+ client websites using React and Node.js. Collaborated closely with designers to ensure pixel-perfect implementation."
                  isDark={isDark}
                />
                <ExperienceItem 
                  role="Junior High School"
                  company="MA Al-Irsyad Tengaran"
                  period="2019 - 2022"
                  description="Started my journey by building responsive landing pages and internal tools. Learned the importance of clean code and agile methodologies."
                  isDark={isDark}
                />
              </div>
            </div>
            
            <div id="achievements">
              <SectionHeading subtitle="Recognition">Certifications</SectionHeading>
              <div className="grid gap-6">
                {[
                  { title: "MTCNA", desc: "2025-2028", icon: NetworkIcon },
                  { title: "MTCRE", desc: "2025-2028", icon: NetworkIcon },
                  { title: "MTCINE", desc: "2025-2028", icon: NetworkIcon },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 md:p-8 rounded-3xl flex items-start gap-4 md:gap-6 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform shrink-0">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                      <p className={`${isDark ? 'text-white/40' : 'text-black/50'} text-sm md:text-base`}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10">
          <div className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 relative z-10">
              <div>
                <SectionHeading subtitle="Contact">Let's Create <br />Something Great</SectionHeading>
                <p className={`text-lg md:text-xl ${isDark ? 'text-white/60' : 'text-black/70'} mb-8 md:mb-12`}>
                  Have a project in mind? Or just want to say hi? Feel free to reach out. I'm always open to discussing new projects and creative ideas.
                </p>
                
                <div className="flex flex-col gap-6">
                  <a href="mailto:muhammadsyafi907@gmail.com" className="flex items-center gap-4 group">
                    
                
                  </a>
                  <div className="flex gap-4 mt-4">
                    {[
                      { Icon: Youtube, url: 'https://youtube.com/@umarsyf' },
                      { Icon: Linkedin, url: 'https://linkedin.com/in/umar-muhammad-syafi-044488371/' },
                      { Icon: Mail, url: 'mailto:muhammadsyafi907@gmail.com' }
                    ].map(({ Icon, url }, i) => (
                      <a 
                        key={i} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <form 
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const message = formData.get('message');
                  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=muhammadsyafi907@gmail.com&su=Contact from Portfolio&body=${body}`;
                  window.open(gmailUrl, '_blank');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'opacity-40' : 'opacity-60'} ml-2`}>Name</label>
                    <input name="name" type="text" required placeholder="Fulan/Fulanah" className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'opacity-40' : 'opacity-60'} ml-2`}>Email</label>
                    <input name="email" type="email" required placeholder="fulan@example.com" className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors`} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'opacity-40' : 'opacity-60'} ml-2`}>Message</label>
                  <textarea name="message" rows={5} required placeholder="Tell me about your project..." className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'} border rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors resize-none`} />
                </div>
                <button type="submit" className="w-full py-4 md:py-5 rounded-2xl bg-brand-primary text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10">
          <p className={`${isDark ? 'text-white/40' : 'text-black/50'} text-xs md:text-sm font-mono`}>
            &copy; {new Date().getFullYear()} umarsyf. UPGRADE YOUR VALUE.
          </p>
        </footer>

      </main>
    </div>
  );
}
