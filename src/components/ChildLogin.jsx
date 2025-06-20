import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function ChildLogin() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const handleLogout = () => {
    removeCookie("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = [
    "Console",
    "Coin",
    "Support",
    "Invite friends",
    "Tour Kite",
    "Keyboard shortcuts",
    "User manual",
  ];

  return (
    <div className="flex justify-end px-4 mt-6">
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl w-65 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 text-[40px] text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition" 
            >
              {item}
            </li>
          ))}
          <li
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg cursor-pointer transition font-medium"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChildLogin;
