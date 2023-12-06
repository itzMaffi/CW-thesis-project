import { useContext } from 'react';
import { AuthContext } from '../../App';
import logoutIcon from '../../assets/fi-rs-sign-out.svg';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton()
{
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsAuthenticated(false)
  };

  return (
    <button
      data-testid="logoutButton"
      className="text-white pt-2 pl-4 pr-4 pb-2 h-fit rounded-[0.5rem] bg-cp-blue hover:bg-cp-middle-blue active:scale-90 shadow-md active:shadow-inner"
      onClick={handleLogout}
    >
      <img src={logoutIcon} width={16} height={16} />
    </button>
  );
}
