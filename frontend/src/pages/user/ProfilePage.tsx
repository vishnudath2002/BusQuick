import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { performLogout } from "../../redux/actions/authActions";
import ProfileForm from "../../components/auth/ProfileForm";
//import { userDetails } from "../../api/authApi"; // Import the userDetails function
import toast from "react-hot-toast";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const defaultProfileData = {
    photo: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    password: "********",
  };


  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileData, setProfileData] = useState(defaultProfileData);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user details and update the profileData state
    const fetchProfile = async () => {
      // try {
        // const data = await userDetails();
        // Replace with actual user ID
        setProfileData({
          photo: defaultProfileData.photo,
           name: defaultProfileData.name,
           email: defaultProfileData.email,
           phone: defaultProfileData.phone,
          password: "********", // Do not expose raw password
        });
      // } catch (error) {
      //   console.error("Error fetching user details:", error);
      // }
    };

    fetchProfile();
  },[]);

  const handleLogout = () => {
    dispatch(performLogout());
    toast.success("You have successfully logged out.");
    navigate("/login");
  };

  const handleEditField = (field: string) => {
    setEditingField(field);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleSaveField = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  const handleResetProfile = () => {
    setProfileData(defaultProfileData);
  };

  return (
    <ProfileForm
      profileData={profileData}
      editingField={editingField}
      onEditField={handleEditField}
      onCancelEdit={handleCancelEdit}
      onSaveField={handleSaveField}
      onLogout={handleLogout}
      onResetProfile={handleResetProfile}
    />
  );
};

export default ProfilePage;
