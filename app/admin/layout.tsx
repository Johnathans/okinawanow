'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBuilding, 
  faUsers, 
  faClipboardList,
  faCog,
  faSignOutAlt,
  faBars,
  faTimes,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import '@/styles/admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`admin-sidebar bg-dark text-white ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="d-flex justify-content-between align-items-center p-3">
          {sidebarOpen && <h5 className="mb-0">Admin Panel</h5>}
          <button 
            className="btn btn-link text-white" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ padding: '0' }}
          >
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
        </div>
        
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/admin" className="nav-link text-white">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              {sidebarOpen && 'Dashboard'}
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/properties" className="nav-link text-white">
              <FontAwesomeIcon icon={faBuilding} className="me-2" />
              {sidebarOpen && 'Properties'}
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/users" className="nav-link text-white">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              {sidebarOpen && 'Users'}
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/agencies" className="nav-link text-white">
              <FontAwesomeIcon icon={faUserTie} className="me-2" />
              {sidebarOpen && 'Agencies'}
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/settings" className="nav-link text-white">
              <FontAwesomeIcon icon={faCog} className="me-2" />
              {sidebarOpen && 'Settings'}
            </Link>
          </li>
          <li className="nav-item mt-5">
            <button 
              className="nav-link text-white btn btn-link" 
              onClick={handleLogout}
              style={{ textAlign: 'left', padding: '0.5rem 1rem' }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              {sidebarOpen && 'Logout'}
            </button>
          </li>
        </ul>
      </div>
      
      {/* Main content */}
      <div className={`admin-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {children}
      </div>
    </div>
  );
}
