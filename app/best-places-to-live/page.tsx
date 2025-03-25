import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCar,
  faSchool,
  faShoppingCart,
  faUtensils,
  faHospital,
  faWater,
  faTree
} from "@fortawesome/free-solid-svg-icons";

export default function BestPlacesPage() {
  const areas = [
    {
      id: 'american-village',
      name: 'American Village Area',
      location: 'Chatan',
      description: 'Popular among military families for its familiar atmosphere and convenience.',
      pros: [
        'Walking distance to shopping and entertainment',
        'Close to multiple bases',
        'Great restaurant selection',
        'Modern apartments'
      ],
      cons: [
        'Higher rent prices',
        'Can be crowded on weekends',
        'Tourist traffic'
      ],
      amenities: [
        { name: 'Shopping', icon: faShoppingCart, details: 'Multiple malls and outlets' },
        { name: 'Dining', icon: faUtensils, details: 'International cuisine options' },
        { name: 'Transportation', icon: faCar, details: '10-15 min to Kadena/Foster' }
      ],
      idealFor: ['Young professionals', 'Families who want convenience', 'First-time PCS']
    },
    {
      id: 'sunabe',
      name: 'Sunabe Seawall',
      location: 'Chatan',
      description: 'Beachfront living with a mix of local and military community.',
      pros: [
        'Ocean views',
        'Great for running/walking',
        'Strong community feel',
        'Popular diving spot'
      ],
      cons: [
        'Premium pricing for oceanfront',
        'Parking can be limited',
        'Salt air maintenance'
      ],
      amenities: [
        { name: 'Beach', icon: faWater, details: 'Direct ocean access' },
        { name: 'Dining', icon: faUtensils, details: 'Local cafes and restaurants' },
        { name: 'Transportation', icon: faCar, details: '15 min to Kadena' }
      ],
      idealFor: ['Beach lovers', 'Active lifestyle', 'Long-term residents']
    },
    {
      id: 'kitanakagusuku',
      name: 'Kitanakagusuku',
      location: 'Central Okinawa',
      description: 'Quiet residential area with beautiful views and newer developments.',
      pros: [
        'Newer apartments',
        'Quieter neighborhood',
        'Good value for money',
        'Mountain views'
      ],
      cons: [
        'Further from bases',
        'Fewer walking-distance amenities',
        'Hills can be challenging'
      ],
      amenities: [
        { name: 'Parks', icon: faTree, details: 'Several parks and walking trails' },
        { name: 'Schools', icon: faSchool, details: 'Good school access' },
        { name: 'Shopping', icon: faShoppingCart, details: 'San-A and local markets' }
      ],
      idealFor: ['Families', 'Those seeking quiet', 'Nature lovers']
    },
    {
      id: 'ginowan',
      name: 'Ginowan City',
      location: 'Central Okinawa',
      description: 'Urban convenience with a local feel, close to multiple bases.',
      pros: [
        'Central location',
        'Good local schools',
        'Mix of old and new buildings',
        'Active local community'
      ],
      cons: [
        'Urban density',
        'Traffic during rush hour',
        'Varied building quality'
      ],
      amenities: [
        { name: 'Healthcare', icon: faHospital, details: 'Multiple clinics and hospitals' },
        { name: 'Education', icon: faSchool, details: 'Universities and schools' },
        { name: 'Shopping', icon: faShoppingCart, details: 'Convention center area' }
      ],
      idealFor: ['Base workers', 'Students', 'Long-term residents']
    },
    {
      id: 'yomitan',
      name: 'Yomitan Village',
      location: 'Central Okinawa',
      description: 'Traditional Okinawan village with modern amenities and beautiful beaches.',
      pros: [
        'Traditional atmosphere',
        'Beautiful beaches',
        'Pottery village',
        'Spacious properties'
      ],
      cons: [
        'Longer commute to bases',
        'More Japanese-style homes',
        'Fewer modern apartments'
      ],
      amenities: [
        { name: 'Culture', icon: faBuilding, details: 'Historic sites and pottery' },
        { name: 'Nature', icon: faTree, details: 'Parks and beaches' },
        { name: 'Shopping', icon: faShoppingCart, details: 'Local markets' }
      ],
      idealFor: ['Culture enthusiasts', 'Nature lovers', 'Those seeking authenticity']
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        <h1 className="h2 mb-4">Best Places to Live in Okinawa</h1>
        <p className="lead mb-5">
          Discover the most popular residential areas for military families in Okinawa. 
          Each neighborhood offers unique advantages and a different lifestyle experience.
        </p>

        {/* Area Cards */}
        <div className="row g-4">
          {areas.map((area) => (
            <div key={area.id} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h2 className="h4 mb-1">{area.name}</h2>
                      <p className="text-muted mb-0">{area.location}</p>
                    </div>
                    <div 
                      className="rounded-circle p-3"
                      style={{ 
                        backgroundColor: 'var(--light-pink)',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={faBuilding} 
                        style={{ color: 'var(--primary-pink)' }}
                      />
                    </div>
                  </div>

                  <p className="mb-4">{area.description}</p>

                  {/* Pros and Cons */}
                  <div className="row g-4 mb-4">
                    <div className="col-sm-6">
                      <h3 className="h6 mb-3">Pros</h3>
                      <ul className="list-unstyled mb-0">
                        {area.pros.map((pro, index) => (
                          <li key={index} className="mb-2 small">
                            <span className="text-success me-2">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h3 className="h6 mb-3">Cons</h3>
                      <ul className="list-unstyled mb-0">
                        {area.cons.map((con, index) => (
                          <li key={index} className="mb-2 small">
                            <span className="text-danger me-2">×</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Amenities */}
                  <h3 className="h6 mb-3">Amenities</h3>
                  <div className="row g-3 mb-4">
                    {area.amenities.map((amenity, index) => (
                      <div key={index} className="col-sm-4">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon 
                            icon={amenity.icon} 
                            className="me-2"
                            style={{ color: 'var(--primary-pink)' }}
                          />
                          <div>
                            <div className="small fw-medium">{amenity.name}</div>
                            <div className="small text-muted">{amenity.details}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ideal For */}
                  <h3 className="h6 mb-3">Ideal For</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {area.idealFor.map((ideal, index) => (
                      <span 
                        key={index}
                        className="small rounded-pill px-3 py-1"
                        style={{ 
                          backgroundColor: 'var(--light-pink)',
                          color: 'var(--primary-pink)'
                        }}
                      >
                        {ideal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-5 p-4 rounded" style={{ backgroundColor: 'var(--light-pink)' }}>
          <h3 className="h5 mb-3">Tips for Choosing Your Location</h3>
          <div className="row g-4">
            <div className="col-md-6">
              <h4 className="h6 mb-2">Consider Your Commute</h4>
              <p className="small mb-0">
                Think about your daily route to work. Traffic can be heavy during rush hours, 
                especially around bases. Consider choosing a location that offers a reasonable commute time.
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="h6 mb-2">Visit Before Deciding</h4>
              <p className="small mb-0">
                If possible, visit the area at different times of day. Check the neighborhood during 
                both weekdays and weekends to get a better feel for the community and noise levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
