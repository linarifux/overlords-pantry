const MarqueeBar = () => {
  const text = "BREAKING: LOCAL TABBY SUES OWNER FOR DINNER DELAY • RED DOT CAUGHT (FAKE NEWS) • DOGS ARE STILL A MYTH • STOCK UP ON NIP BEFORE THE APOCALYPSE •";

  return (
    <div className="bg-black border-b border-purple-800/50 text-amber-400 py-2 overflow-hidden relative z-50 flex">
      {/* Copy 1 */}
      <div className="animate-marquee whitespace-nowrap font-mono text-xs md:text-sm font-bold tracking-widest drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] px-4">
        {text}
      </div>
      
      {/* Copy 2 (Identical duplicate for seamless looping) */}
      <div className="animate-marquee whitespace-nowrap font-mono text-xs md:text-sm font-bold tracking-widest drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] px-4">
        {text}
      </div>
    </div>
  );
};

export default MarqueeBar;