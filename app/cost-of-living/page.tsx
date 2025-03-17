import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faCar,
  faShoppingCart,
  faGlobe,
  faWallet,
  faPercent,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import CostComparisonChart from '@/components/CostComparisonChart';

export default function CostOfLivingPage() {
  const expenseCategories = [
    {
      id: 'housing',
      title: 'Housing Costs',
      icon: faHome,
      description: 'Housing costs vary significantly between on-base and off-base options.',
      items: [
        {
          title: 'Off-Base Apartment (2BR)',
          range: '¥100,000 - ¥150,000/month',
          notes: 'Covered by OHA for military'
        },
        {
          title: 'Utilities (Off-Base)',
          range: '¥15,000 - ¥25,000/month',
          notes: 'Electricity, water, gas'
        },
        {
          title: 'Initial Move-In Costs',
          range: '¥300,000 - ¥500,000',
          notes: 'Deposit, key money, agent fee'
        },
        {
          title: 'On-Base Housing',
          range: 'BAH rates apply',
          notes: 'Utilities included'
        }
      ]
    },
    {
      id: 'food',
      title: 'Food & Dining',
      icon: faUtensils,
      description: 'Food costs can be managed by balancing commissary and local shopping.',
      items: [
        {
          title: 'Groceries (Family of 4)',
          range: '¥60,000 - ¥80,000/month',
          notes: 'Local markets'
        },
        {
          title: 'Commissary Shopping',
          range: '30-40% less than local',
          notes: 'US prices + small surcharge'
        },
        {
          title: 'Restaurant Meal',
          range: '¥800 - ¥2,000/person',
          notes: 'Local restaurants'
        },
        {
          title: 'Fast Food Meal',
          range: '¥600 - ¥1,000',
          notes: 'Both Japanese and American chains'
        }
      ]
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: faCar,
      description: 'Various transportation options are available, each with different costs.',
      items: [
        {
          title: 'Used Car',
          range: '¥300,000 - ¥800,000',
          notes: 'One-time purchase'
        },
        {
          title: 'Car Insurance',
          range: '¥40,000 - ¥80,000/year',
          notes: 'Japanese insurance required'
        },
        {
          title: 'Gas',
          range: '¥160 - ¥180/liter',
          notes: 'On-base cheaper'
        },
        {
          title: 'Bus/Train',
          range: '¥250 - ¥500/trip',
          notes: 'Public transportation'
        }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping & Entertainment',
      icon: faShoppingCart,
      description: 'Mix of on-base and off-base shopping options available.',
      items: [
        {
          title: 'Movie Ticket',
          range: '¥1,800 - ¥2,000',
          notes: 'Japanese theaters'
        },
        {
          title: 'Gym Membership',
          range: '¥7,000 - ¥10,000/month',
          notes: 'Off-base (free on-base)'
        },
        {
          title: 'Clothing',
          range: 'Similar to US prices',
          notes: 'Exchange or local stores'
        },
        {
          title: 'Internet',
          range: '¥4,000 - ¥6,000/month',
          notes: 'High-speed fiber'
        }
      ]
    }
  ];

  const allowances = [
    {
      title: 'COLA (Cost of Living Allowance)',
      description: 'Varies based on rank, location, and dependents. Helps offset higher costs in Okinawa.',
      icon: faPercent
    },
    {
      title: 'OHA (Overseas Housing Allowance)',
      description: 'Covers rent and most utilities for off-base housing. Amount based on rank and location.',
      icon: faHome
    },
    {
      title: 'Move-In Housing Allowance (MIHA)',
      description: 'One-time payment to help cover housing setup costs in Okinawa.',
      icon: faMoneyBill
    }
  ];

  const tips = [
    {
      title: 'Exchange Rate Impact',
      description: 'Monitor USD to JPY rates as they affect your purchasing power.',
      icon: faGlobe
    },
    {
      title: 'Budget Management',
      description: 'Balance shopping between on-base and local venues for best value.',
      icon: faWallet
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        <h1 className="h2 mb-4">Cost of Living in Okinawa</h1>
        <p className="lead mb-5">
          Understanding the cost of living in Okinawa helps you better prepare for your PCS. 
          Here's a comprehensive breakdown of expenses and military allowances you can expect.
        </p>

        {/* Cost Comparison Chart */}
        <div className="mb-5">
          <CostComparisonChart />
        </div>

        {/* Expense Categories */}
        <h2 className="h4 mb-4">Detailed Cost Breakdown</h2>
        <div className="row g-4 mb-5">
          {expenseCategories.map((category) => (
            <div key={category.id} className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="me-3 p-3 rounded-circle"
                      style={{ 
                        backgroundColor: 'var(--light-pink)',
                        color: 'var(--primary-pink)',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FontAwesomeIcon icon={category.icon} size="lg" />
                    </div>
                    <div>
                      <h2 className="h5 mb-1">{category.title}</h2>
                      <p className="mb-0 text-muted small">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <tbody>
                        {category.items.map((item, index) => (
                          <tr key={index} className={index === category.items.length - 1 ? 'border-bottom-0' : ''}>
                            <td style={{ width: '40%', paddingLeft: 0 }}>
                              <span className="fw-medium">{item.title}</span>
                            </td>
                            <td className="text-end" style={{ width: '30%' }}>
                              <span className="text-dark">{item.range}</span>
                            </td>
                            <td className="text-muted small" style={{ paddingRight: 0 }}>
                              {item.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Military Allowances */}
        <h2 className="h4 mb-4">Military Allowances</h2>
        <div className="row g-4 mb-5">
          {allowances.map((allowance, index) => (
            <div key={index} className="col-md-4">
              <div 
                className="p-4 h-100 rounded"
                style={{ backgroundColor: 'var(--light-pink)' }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="me-3 rounded-circle"
                    style={{ 
                      backgroundColor: 'white',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={allowance.icon}
                      style={{ color: 'var(--primary-pink)' }}
                    />
                  </div>
                  <h3 className="h6 mb-0">{allowance.title}</h3>
                </div>
                <p className="mb-0 small">{allowance.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Money Tips */}
        <h2 className="h4 mb-4">Money-Saving Tips</h2>
        <div className="row g-4 mb-5">
          {tips.map((tip, index) => (
            <div key={index} className="col-md-6">
              <div className="d-flex p-4 h-100 border rounded bg-white">
                <div
                  className="me-3 rounded-circle flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--light-pink)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={tip.icon}
                    style={{ color: 'var(--primary-pink)' }}
                  />
                </div>
                <div>
                  <h3 className="h6 mb-2">{tip.title}</h3>
                  <p className="mb-0 small">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculator Callout */}
        <div className="mt-5 p-4 rounded" style={{ backgroundColor: 'var(--light-pink)' }}>
          <h3 className="h5 mb-3">Calculate Your Allowances</h3>
          <p className="mb-3">
            Use the official DoD calculators to estimate your COLA and OHA rates for Okinawa.
          </p>
          <div className="d-flex gap-3">
            <a 
              href="https://www.defensetravel.dod.mil/site/colaCalc.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: 'var(--primary-pink)',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '50px'
              }}
            >
              COLA Calculator
            </a>
            <a 
              href="https://www.defensetravel.dod.mil/site/ohaCalc.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: 'white',
                color: 'var(--primary-pink)',
                padding: '8px 24px',
                borderRadius: '50px'
              }}
            >
              OHA Calculator
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
