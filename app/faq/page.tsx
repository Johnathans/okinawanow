'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Rental Process",
    question: "What documents do I need to rent a property in Okinawa?",
    answer: "As a military member, you typically need: Valid military ID, Orders to Okinawa, Letter of Assignment (LOA), and completed rental application. Some landlords may require additional documentation such as proof of income or references."
  },
  {
    category: "Rental Process",
    question: "How does the OHA (Overseas Housing Allowance) work?",
    answer: "OHA is a military allowance that helps cover your rent and utilities in Okinawa. The amount varies based on your rank and dependency status. You'll receive the exact amount of your rent up to your OHA cap, plus a utility allowance."
  },
  {
    category: "Property Search",
    question: "What areas are most popular with military families?",
    answer: "Popular areas include Chatan (near American Village), areas around Kadena Air Base, and neighborhoods near Camp Foster. These locations offer easy base access and plenty of English-friendly services."
  },
  {
    category: "Property Search",
    question: "Are pets allowed in rental properties?",
    answer: "Pet policies vary by property. Many listings on our site are marked as 'Pet Friendly'. Always confirm pet policies, deposits, and restrictions with the property manager before signing a lease."
  },
  {
    category: "Move-In Process",
    question: "What's included in a typical Japanese apartment?",
    answer: "Japanese apartments typically come unfurnished. Basic appliances like AC units and water heaters are usually included. Some properties may include a refrigerator and washing machine, but you'll need to confirm with each listing."
  },
  {
    category: "Move-In Process",
    question: "How much is the typical move-in cost?",
    answer: "Initial costs usually include first month's rent, security deposit (usually 1-2 months' rent), and possibly key money (gift money to landlord). Military tenants often get some fees waived - check individual listings for details."
  },
  {
    category: "Utilities & Services",
    question: "How do I set up utilities in Okinawa?",
    answer: "Most property managers or real estate agencies will help set up your utilities (electricity, gas, water). For internet and phone services, we recommend providers like AU, SoftBank, or Docomo who offer English support."
  },
  {
    category: "Utilities & Services",
    question: "Is internet service readily available?",
    answer: "Yes, high-speed internet is widely available in Okinawa. Many providers offer fiber-optic connections. Some properties may already have internet installed, requiring only service activation."
  },
  {
    category: "Living in Okinawa",
    question: "What's the average commute time to bases?",
    answer: "Commute times vary by location but typically range from 5-30 minutes. Properties listed on our site include approximate drive times to nearby bases to help with your decision."
  },
  {
    category: "Living in Okinawa",
    question: "Are there English-speaking maintenance services?",
    answer: "Many property managers provide English-speaking maintenance support. We also maintain a list of English-speaking repair services and contractors for our tenants."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <main className="bg-white min-vh-100">
      <div className="container py-5">
        <h1 className="text-center mb-2" style={{ 
          color: '#111',
          fontSize: '2.5rem',
          fontWeight: 700
        }}>
          Frequently Asked Questions
        </h1>
        <p className="text-center mb-5" style={{ color: '#666', fontSize: '1.1rem' }}>
          Everything you need to know about renting in Okinawa
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {categories.map((category) => (
              <div key={category} className="mb-5">
                <h2 className="mb-4" style={{ 
                  color: 'var(--primary-pink)',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}>
                  {category}
                </h2>
                
                <div className="accordion">
                  {faqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => {
                      const actualIndex = faqs.findIndex(f => f === faq);
                      const isOpen = openItems.includes(actualIndex);
                      
                      return (
                        <div 
                          key={index}
                          className="card mb-3"
                          style={{ 
                            border: '1px solid var(--medium-pink)',
                            borderRadius: '12px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            className="card-header border-0 bg-white py-3 px-4"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleItem(actualIndex)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <h3 className="mb-0" style={{ 
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                color: '#111'
                              }}>
                                {faq.question}
                              </h3>
                              <FontAwesomeIcon
                                icon={isOpen ? faChevronUp : faChevronDown}
                                style={{ 
                                  color: 'var(--primary-pink)',
                                  fontSize: '0.875rem'
                                }}
                              />
                            </div>
                          </div>
                          {isOpen && (
                            <div className="card-body px-4 py-3" style={{ 
                              backgroundColor: 'var(--light-pink)',
                              borderTop: '1px solid var(--medium-pink)'
                            }}>
                              <p className="mb-0" style={{ color: '#444' }}>
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-5 pt-4">
          <p className="mb-4" style={{ color: '#666' }}>
            Still have questions? We're here to help!
          </p>
          <a 
            href="/contact"
            className="btn px-4 py-2"
            style={{
              backgroundColor: 'var(--primary-pink)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '1.1rem'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
