import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: "Will this actually make my cat love me?",
    answer: "No. But they might ignore you slightly less. That is the best we can offer."
  },
  {
    question: "Is the catnip legal?",
    answer: "It is Grade-A organic nip sourced from the mountains of Nepal. We don't ask questions, we just ship it."
  },
  {
    question: "What is your return policy?",
    answer: "If your Overlord rejects the tribute, you have 30 days to return it. However, the box it came in is theirs forever."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to every territory currently occupied by feline rulers (which is everywhere)."
  }
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Servant Support</h2>
          <p className="text-gray-500">Common questions from confused humans.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'border-purple-500 shadow-md' : 'border-gray-200'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-purple-700' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full ${openIndex === index ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;