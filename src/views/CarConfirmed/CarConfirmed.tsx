import { useNavigate } from 'react-router-dom'
import './CarConfirmed.scss'

const CarConfirmed = () => {
  const navigate = useNavigate();

  setTimeout(function() {
    navigate("/home")
  }, 4000);

  return (
    <div className="message">
      <h2>Car Registered succesfully!</h2>
      </div>
  )
}

export default CarConfirmed