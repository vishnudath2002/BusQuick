import { LayoutDashboard, Users, Bus, User as ProfileIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { performAdminLogout } from '../../../redux/actions/adminActions';
import toast from 'react-hot-toast';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Bus, label: 'Bus Owners', id: 'bus-owners' },
];

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    
    dispatch(performAdminLogout());
    toast.success('You have successfully logged out.');
    navigate('/');
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Bus className="w-6 h-6 text-blue-600" />
          <span className="ml-2 text-xl font-semibold">Admin</span>
        </div>
        <div className="relative">
          <ProfileIcon
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigate('profile');
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <nav className="p-4">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center w-full p-3 rounded-lg mb-1 ${
              currentPage === id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="ml-3 font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
