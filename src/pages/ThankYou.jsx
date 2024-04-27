import { useNavigate } from 'react-router-dom';
	
export default function ThankYou() {
    const navigate = useNavigate();
	return (
		<div className="thankyou-wrapper">
			<h1>Thank you </h1>
            <button type="button" className="go-back-button" onClick={()=>navigate('/home')}>Go back</button>
		</div>
	);
}