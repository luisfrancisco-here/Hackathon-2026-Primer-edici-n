/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Convocatoria', href: '#convocatoria' },
    { name: 'Cronograma', href: '#cronograma' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DATAPULSE</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://forms.office.com/r/GEYc8n3Fw5" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Inscripción
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="block text-base font-medium text-gray-400 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://forms.office.com/r/GEYc8n3Fw5" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg text-base font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inscripción
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 31, hours: 13, minutes: 1, seconds: 54 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
      {units.map((unit) => (
        <div key={unit.label} className="bg-surface border border-white/5 p-4 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

const TimelineItem = ({ phase, date, title, description, align }: { phase: number, date: string, title: string, description: string, align: 'left' | 'right' }) => {
  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 last:mb-0`}>
      {/* Dot */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/30 bg-dark text-primary font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(19,127,236,0.5)]"
      >
        {phase}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: align === 'left' ? -30 : 30, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
        className="w-[calc(100%-4rem)] md:w-[45%] p-8 rounded-2xl bg-surface/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all shadow-xl hover:shadow-primary/5"
      >
        <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">{date}</div>
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-[0.15]" />
        
        {/* Scanning Line Effect */}
        <motion.div 
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary/20 to-transparent z-0"
        />

        {/* Dynamic Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        
        <motion.div 
          animate={{ 
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px]"
        />

        <motion.div 
          animate={{ 
            x: [0, 150, -100, 0],
            y: [0, 150, 150, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"
        />

        <motion.div 
          animate={{ 
            x: [0, -150, 100, 0],
            y: [0, -100, 50, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px]"
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5
              }}
              animate={{ 
                y: [null, "-10%"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            />
          ))}
        </div>

        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Navbar />

      {/* --- Hero Section --- */}
      <header id="inicio" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-8 tracking-widest uppercase"
          >
            2026 · Primer Edición
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight"
          >
            DataPulse <span className="gradient-text">Hackathon</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Convierte datos en decisiones. Construye el futuro del análisis y la inteligencia aplicada en la primera edición del desafío de datos más innovador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="https://forms.office.com/r/GEYc8n3Fw5" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-dark hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl shadow-primary/20 group"
            >
              Inscripción Hackathon 2026 · Primera Edición
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </header>

      {/* --- Convocatoria Section --- */}
      <section id="convocatoria" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">La Convocatoria</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Resuelve retos complejos utilizando Inteligencia Artificial y fuentes de datos consistentes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Analítica Self-Service', 
                desc: 'Genera impacto en tu unidad de negocio para explorar y visualizar datos sin intervención técnica, reduciendo cuellos de botella.',
                icon: BarChart3,
                color: 'primary'
              },
              { 
                title: 'IA Tools', 
                desc: 'Redefine tus procesos con AI Tools de lenguaje natural que permitan explotar información directamente y generar valor al instante.',
                icon: MessageSquare,
                color: 'accent'
              },
              { 
                title: 'Gobierno del Dato', 
                desc: 'Impacto inmediato al asegurar la calidad, privacidad y trazabilidad de la información consultando fuentes de datos aprobadas.',
                icon: ShieldCheck,
                color: 'primary'
              }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-all ${pillar.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary' : 'bg-accent/10 text-accent group-hover:bg-accent'} group-hover:text-white`}>
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{pillar.title}</h3>
                <p className="text-gray-500 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Cronograma Section --- */}
      <section id="cronograma" className="py-32 bg-surface/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-20 text-center">Fases del Evento</h2>
          
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
            <TimelineItem 
              phase={1} 
              date="MAR 16 - MAR 20" 
              title="Inscripciones y registro" 
              description="Forma tu equipo, registralo y prepara tus tableros a migrar."
              align="right"
            />
            <TimelineItem 
              phase={2} 
              date="MAR 31" 
              title="Kickoff & Data Access" 
              description="Sesión inaugural, aquí se conocerán los detalles del evento."
              align="left"
            />
            <TimelineItem 
              phase={3} 
              date="ABR 13 - ABR 14" 
              title="Días de Hacking" 
              description="2 días enfocados en un solo objetivo: Consistencia en la información."
              align="right"
            />
            <TimelineItem 
              phase={4} 
              date="ABR 15" 
              title="Demo Day" 
              description="Presentación de tableros ante el jurado calificador."
              align="left"
            />
            <TimelineItem 
              phase={5} 
              date="ABR 16" 
              title="Premiación y cierre" 
              description="Anuncio de ganadores y cierre oficial."
              align="right"
            />
          </div>
        </div>
      </section>

      {/* --- Rules Section --- */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface/40 rounded-[32px] p-8 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Zap className="w-64 h-64 text-primary" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-4xl font-bold mb-10">Reglas y Criterios</h2>
                <div className="space-y-6">
                  {[
                    { label: 'Liderazgo', val: 'Arma tu equipo como lo tu requieras pero siempre con un experto en la información de tu negocio.' },
                    { label: 'Enfoque', val: 'Los tableros serán certificados durante el evento.' },
                    { label: 'Consitencia', val: 'Tendrás acceso al repositorio ofical de información' }
                  ].map((rule) => (
                    <div key={rule.label} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-lg"><span className="font-bold text-white">{rule.label}:</span> {rule.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Impacto', desc: '¿Qué valor genera al negocio u organización?' },
                  { title: 'Innovación', desc: '¿Qué tan escalable es la solución propuesta para otros departamentos?' },
                  { title: 'Adopción', desc: '¿Qué tan natural es la adopción y uso de los nuevos recursos?' },
                  { title: 'Presentación', desc: 'Calidad del pitch y demo funcional ocupando los repositorios oficiales.' }
                ].map((item) => (
                  <div key={item.title} className="p-6 bg-dark/50 border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
                    <h5 className="text-primary font-bold mb-2 tracking-wide uppercase text-sm">{item.title}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Registration CTA --- */}
      <section id="inscripcion" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-surface/60 backdrop-blur-xl p-12 md:p-20 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">¿Listo para el desafío?</h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
              Únete a la primera edición del DataPulse Hackathon y demuestra tu talento transformando datos en soluciones reales.
            </p>
            
            <a 
              href="https://forms.office.com/r/GEYc8n3Fw5" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-5 px-12 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 text-xl relative z-10"
            >
              Inscribirme ahora
              <ChevronRight className="w-6 h-6" />
            </a>
            
            <p className="mt-8 text-sm text-gray-500 font-medium relative z-10">
              Cupos limitados para la edición 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 border-t border-white/10 bg-dark/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">DATAPULSE</span>
            </div>
            
            <div className="text-gray-500 text-sm font-medium">
              © 2026 DataPulse Hackathon. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
