import React, { useState } from 'react';
import { Camera, User, Mail, Phone, Lock, LogOut } from 'lucide-react';

interface ProfileFormProps {
  profileData: {
    photo: string;
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  editingField: string | null; // Add this
  onEditField: (field: string) => void;
  onCancelEdit: () => void;
  onSaveField: (field: string, value: string) => void;
  onLogout: () => void;
  onResetProfile: () => void; // Add this
}


const defaultProfileData = {
  photo: "/api/placeholder/150/150",
  name: "sdsd",
  email: "john@example.com",
  phone: "+1 234 567 890",
  password: "••••••••"
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData = defaultProfileData,
  onSaveField = () => {},
  onLogout = () => {},
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field: string) => {
    setEditingField(field);
    setEditValue(profileData[field as keyof typeof profileData] || "");
  };

  const handleSave = () => {
    if (editingField) {
      onSaveField(editingField, editValue);
      setEditingField(null);
    }
  };

  const getIcon = (field: string) => {
    switch (field) {
      case 'name': return <User className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'phone': return <Phone className="h-5 w-5" />;
      case 'password': return <Lock className="h-5 w-5" />;
      default: return null;
    }
  };

  const getValue = (field: string) => {
    const value = profileData[field as keyof typeof profileData];
    if (field === 'password') return '••••••••';
    return value || defaultProfileData[field as keyof typeof defaultProfileData];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-[#007074] from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <button 
            className="w-full flex items-center px-4 py-2 text-left text-white hover:bg-blue-500 rounded-lg transition-colors"
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </button>
          <button 
            className="w-full flex items-center px-4 py-2 text-left text-white hover:bg-blue-500 rounded-lg transition-colors"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
          
          {/* Profile Photo Card */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex items-center space-x-6 p-6">
              <div className="relative">
                <img
                  src={profileData.photo || defaultProfileData.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button 
                  className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                  onClick={() => handleEdit('photo')}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{getValue('name')}</h3>
                <p className="text-gray-500">{getValue('email')}</p>
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid gap-6">
            {['name', 'email', 'phone', 'password'].map((field) => (
              <div key={field} className="bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    {getIcon(field)}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 capitalize">
                        {field}
                      </h3>
                      <p className="text-base font-semibold">
                        {getValue(field)}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => handleEdit(field)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit {editingField}</h2>
              <input
                type={editingField === 'password' ? 'password' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={`Enter your ${editingField}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;