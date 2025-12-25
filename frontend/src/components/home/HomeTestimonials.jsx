const HomeTestimonials = () => {
  return (
    <section className="py-16 bg-slate-900 -mx-4 px-4 my-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
      
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Praise from the Overlords</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative">
            <div className="text-yellow-500 text-4xl absolute -top-4 left-6">"</div>
            <p className="text-gray-300 italic mb-6 mt-2">
              The box this arrived in was exquisite. I chewed on it for 3 hours. The actual product was acceptable too, I suppose.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl">😼</div>
              <div>
                <h4 className="text-white font-bold">Sir Meows-a-Lot</h4>
                <p className="text-slate-400 text-xs">Head of Security</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative">
            <div className="text-yellow-500 text-4xl absolute -top-4 left-6">"</div>
            <p className="text-gray-300 italic mb-6 mt-2">
              My human servant finally bought the correct brand of nip. I have decided to spare his life for another week.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl">😺</div>
              <div>
                <h4 className="text-white font-bold">Queen Mittens</h4>
                <p className="text-slate-400 text-xs">CEO of House</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative">
            <div className="text-yellow-500 text-4xl absolute -top-4 left-6">"</div>
            <p className="text-gray-300 italic mb-6 mt-2">
              Fast delivery. I was able to knock it off the table immediately. 5 Stars.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl">😾</div>
              <div>
                <h4 className="text-white font-bold">Chairman Meow</h4>
                <p className="text-slate-400 text-xs">Interior Decorator</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;