import { Navbar  } from "../../components/owner/Navbar";
import { Dashboard } from "../../components/owner/Dashboard";
const OwnHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default OwnHomePage;
