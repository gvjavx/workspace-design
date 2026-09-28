import WorkspaceConfigurator from '@/components/configurator/WorkspaceConfigurator';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-orange-500 selection:text-white">
      {/* HEADER */}
      <header className="border-b border-stone-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white">
                <span className="font-black text-xl italic">M</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-stone-900">MONIS<span className="text-orange-500">.</span></span>
          </div>
          <nav className="hidden md:flex gap-8">
            {['Configurator', 'Benefits', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </nav>
          <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all active:scale-95">
            Book Setup
          </button>
        </div>
      </header>

      {/* MAIN SHOWCASE / HERO (Live Render as Centerpiece) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Live Interactive Studio
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 mb-4">
            Design Your Bali Office.
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto font-medium">
            Toggle components below and watch your real-time villa sanctuary adapt instantly.
          </p>
        </div>

        {/* FULL CONFIGURATOR INTERFACE */}
        <section id="configurator" className="max-w-5xl mx-auto mb-20">
          <WorkspaceConfigurator />
        </section>

        {/* HOW IT WORKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-stone-200">
          {[
            { title: "Customize", desc: "Choose your favorite ergonomic setup in our live studio.", icon: "01" },
            { title: "Fast Delivery", desc: "Assembled in your villa within 24h across Bali.", icon: "02" },
            { title: "Full Focus", desc: "Enjoy uninterrupted focus with full maintenance support.", icon: "03" },
          ].map((step) => (
            <div key={step.title} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative overflow-hidden">
              <span className="absolute -right-4 -top-4 text-7xl font-black text-stone-100">{step.icon}</span>
              <h3 className="text-lg font-bold mb-2 relative z-10">{step.title}</h3>
              <p className="text-stone-500 text-sm relative z-10">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white py-8 text-center text-stone-400 text-sm font-medium">
        © 2024 Monis Rent Bali.
      </footer>
    </div>
  );
}
