import { useState } from 'react';
import { FaPlus, FaMinus, FaQuestion } from 'react-icons/fa';

const faqs = [
  {
    question: "Will this actually make my cat love me?",
    answer: "No. But they might ignore you slightly less. That is the best we can offer. If you want love, get a dog (but don't let the Overlord know)."
  },
  {
    question: "Is the catnip legal?",
    answer: "It is Grade-A organic nip sourced from the mountains of Nepal. We don't ask questions, we just ship it. If the feds ask, it's 'herbal tea'."
  },
  {
    question: "What is your return policy?",
    answer: "If your Overlord rejects the tribute, you have 30 days to return it. However, the box it came in is theirs forever. We do not accept returns on dignity."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to every territory currently occupied by feline rulers (which is essentially the entire planet). Zoomies Logistics handles the rest."
  }
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container mx-auto px-4 py-24 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="bg-purple-900/30 border border-purple-500/30 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)] mb-4 inline-block">
          Troubleshooting
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Servant <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Support</span>
        </h2>
        <p className="text-purple-300/60 max-w-lg mx-auto text-lg">
          Common questions from confused humans trying to appease their masters.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`rounded-[1.5rem] border transition-all duration-300 overflow-hidden group ${
              openIndex === index 
                ? 'bg-[#1a1025] border-amber-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                : 'bg-[#1a1025]/60 border-white/5 hover:border-purple-500/30 hover:bg-[#1a1025]'
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  openIndex === index ? 'bg-amber-500 text-purple-900' : 'bg-white/5 text-gray-500 group-hover:bg-purple-500/20 group-hover:text-purple-300'
                }`}>
                  <FaQuestion />
                </span>
                <span className={`font-bold text-lg md:text-xl transition-colors ${
                  openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {faq.question}
                </span>
              </div>
              
              <span className={`p-3 rounded-full transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-amber-500/10 text-amber-400 rotate-180' 
                  : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'
              }`}>
                {openIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
              </span>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-8 pt-0 pl-[5.5rem] text-purple-200/80 leading-relaxed text-lg border-t border-white/5 mt-2">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFAQ;