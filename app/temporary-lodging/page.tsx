import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { hotels } from '@/data/lodgingOptions';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  amenities: string[];
  images: string[];
}

export default function TemporaryLodgingPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Temporary Lodging in Okinawa</h1>
      <p className="lead mb-5">
        Find comfortable temporary lodging options near military bases in Okinawa.
      </p>

      <div className="row g-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div
                className="card-img-top"
                style={{
                  height: '200px',
                  backgroundImage: `url(${hotel.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="card-body">
                <h5 className="card-title mb-1">{hotel.name}</h5>
                <div className="d-flex align-items-center mb-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-primary me-1"
                  />
                  <small className="text-muted">{hotel.location}</small>
                </div>
                <p className="card-text small">{hotel.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-primary">
                      ¥{hotel.price.toLocaleString()}
                    </strong>
                    <small className="text-muted">/night</small>
                  </div>
                  <div>
                    {[...Array(hotel.rating)].map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
