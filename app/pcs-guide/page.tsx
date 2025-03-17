import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlane, 
  faHome, 
  faCar, 
  faPassport,
  faFileAlt,
  faPhone,
  faMoneyBill,
  faMapMarkedAlt,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

export default function PCSGuidePage() {
  const sections = [
    {
      id: 'before-you-move',
      title: 'Before You Move',
      icon: faFileAlt,
      items: [
        'Get your orders and review them carefully',
        'Schedule TMO briefing',
        'Start passport/visa process for dependents',
        'Update ID cards if needed',
        'Get international drivers license',
        'Schedule medical/dental checkups',
        'Gather important documents',
        'Research schools if applicable'
      ],
      links: [
        {
          title: 'Military OneSource PCS Planning',
          url: 'https://www.militaryonesource.mil/moving-pcs'
        },
        {
          title: 'SOFA Japan Documentation',
          url: 'https://www.japan.travel/en/plan/sofa-personnel/'
        },
        {
          title: 'DoDEA Pacific Schools',
          url: 'https://www.dodea.edu/pacific'
        }
      ]
    },
    {
      id: 'housing',
      title: 'Housing Options',
      icon: faHome,
      items: [
        'On-base housing through military housing office',
        'Off-base housing through military-approved realtors',
        'Temporary lodging (TLF/hotels)',
        'Housing allowance rates (OHA/BAH)',
        'Utility bill expectations',
        'Japanese rental terms and deposits'
      ],
      links: [
        {
          title: 'Kadena Housing Office',
          url: 'https://www.kadena.af.mil/Kadena_Housing_Office/'
        },
        {
          title: 'OHA Calculator',
          url: 'https://www.defensetravel.dod.mil/site/ohaCalc.cfm'
        },
        {
          title: 'Okinawa TLF Information',
          url: 'https://www.shoguninn.com/'
        }
      ]
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: faCar,
      items: [
        'Military shuttle services',
        'Japanese Drivers License process',
        'Car buying/shipping options',
        'Public transportation overview',
        'Bicycle registration requirements',
        'Base parking regulations'
      ],
      links: [
        {
          title: 'USFJ Driving in Japan Guide',
          url: 'https://www.usfj.mil/Driving-in-Japan/'
        },
        {
          title: 'Okinawa Bus Routes',
          url: 'https://www.visitokinawa.jp/transportation/bus'
        },
        {
          title: 'Military Auto Source',
          url: 'https://www.militaryautosource.com/locations/japan'
        }
      ]
    },
    {
      id: 'arrival',
      title: 'Arrival Process',
      icon: faPlane,
      items: [
        'Immigration procedures',
        'Base check-in process',
        'Temporary lodging arrangements',
        'Command sponsorship validation',
        'Base access passes for dependents',
        'Initial military briefings'
      ],
      links: [
        {
          title: 'Kadena AB Newcomers Guide',
          url: 'https://www.kadena.af.mil/About-Us/Newcomers/'
        },
        {
          title: 'MCCS Welcome Aboard',
          url: 'https://www.mccsokinawa.com/welcomeaboard/'
        },
        {
          title: 'Japan Immigration Procedures',
          url: 'https://www.mofa.go.jp/j_info/visit/visa/'
        }
      ]
    },
    {
      id: 'finances',
      title: 'Financial Preparation',
      icon: faMoneyBill,
      items: [
        'COLA rates and benefits',
        'Japanese banking setup',
        'Currency exchange tips',
        'Credit card international fees',
        'Move-in cost expectations',
        'Utility deposits and setup'
      ],
      links: [
        {
          title: 'COLA Calculator',
          url: 'https://www.defensetravel.dod.mil/site/colaCalc.cfm'
        },
        {
          title: 'Community Bank Pacific',
          url: 'https://www.dodcommunitybank.com/home/locations/pacific'
        },
        {
          title: 'Navy Federal Overseas',
          url: 'https://www.navyfederal.org/branches-atms/overseas.html'
        }
      ]
    },
    {
      id: 'area-orientation',
      title: 'Area Orientation',
      icon: faMapMarkedAlt,
      items: [
        'Base facilities and services',
        'Local medical facilities',
        'Shopping areas and markets',
        'Restaurant guide',
        'Emergency services',
        'Cultural attractions'
      ],
      links: [
        {
          title: 'MCCS Okinawa',
          url: 'https://www.mccsokinawa.com/'
        },
        {
          title: 'Visit Okinawa',
          url: 'https://www.visitokinawa.jp/'
        },
        {
          title: 'Okinawa Emergency Guide',
          url: 'https://www.pref.okinawa.jp/site/chijiko/kohokoryu/foreign/english/'
        }
      ]
    },
    {
      id: 'important-contacts',
      title: 'Important Contacts',
      icon: faPhone,
      items: [
        'Housing Office',
        'TMO Office',
        'Military Personnel',
        'Medical/Dental Clinics',
        'Base Operator',
        'Emergency Numbers'
      ],
      links: [
        {
          title: 'Kadena Directory',
          url: 'https://www.kadena.af.mil/About-Us/Contact/'
        },
        {
          title: 'USNH Okinawa',
          url: 'https://okinawa.tricare.mil/'
        },
        {
          title: 'Emergency Numbers',
          url: 'https://www.kadena.af.mil/About-Us/Emergency-Numbers/'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Required Documents',
      icon: faPassport,
      items: [
        'Military ID',
        'Orders (multiple copies)',
        'Passports/Visas',
        'Birth/Marriage Certificates',
        'Medical/Dental Records',
        'School Records',
        'Power of Attorney',
        'Pet Documentation'
      ],
      links: [
        {
          title: 'Travel.State.Gov',
          url: 'https://travel.state.gov/content/travel/en/passports/need-passport.html'
        },
        {
          title: 'USFJ Pet Policy',
          url: 'https://www.usfj.mil/Pet-Transportation/'
        },
        {
          title: 'Power of Attorney Info',
          url: 'https://www.militaryonesource.mil/financial-legal/legal/estate-planning/'
        }
      ]
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        <h1 className="h2 mb-4">PCS Guide to Okinawa</h1>
        <p className="lead mb-5">
          Welcome to your comprehensive guide for PCSing to Okinawa! This resource will help you prepare 
          for your move and settle into your new home in Japan.
        </p>

        <div className="row g-4">
          {sections.map((section) => (
            <div key={section.id} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="me-3 p-3 rounded-circle"
                      style={{ 
                        backgroundColor: 'var(--light-pink)',
                        color: 'var(--primary-pink)'
                      }}
                    >
                      <FontAwesomeIcon icon={section.icon} size="lg" />
                    </div>
                    <h2 className="h5 mb-0">{section.title}</h2>
                  </div>
                  <ul className="list-unstyled mb-4">
                    {section.items.map((item, index) => (
                      <li key={index} className="mb-2">
                        <div className="d-flex">
                          <span className="me-2">•</span>
                          {item}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-top pt-3">
                    <h3 className="h6 mb-2">Helpful Links</h3>
                    {section.links.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-block mb-2 text-decoration-none"
                        style={{ color: 'var(--primary-pink)' }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" size="sm" />
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded" style={{ backgroundColor: 'var(--light-pink)' }}>
          <h3 className="h5 mb-3">Need Help Finding Housing?</h3>
          <p className="mb-3">
            We specialize in military-friendly housing options across Okinawa. Browse our listings or 
            contact us for personalized assistance.
          </p>
          <Link 
            href="/listings" 
            className="btn"
            style={{
              backgroundColor: 'var(--primary-pink)',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '50px'
            }}
          >
            View Listings
          </Link>
        </div>
      </div>
    </main>
  );
}
