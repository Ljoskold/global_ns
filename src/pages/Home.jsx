import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';	
import { DNA } from 'react-loader-spinner'
import InputMask from 'react-input-mask';
import '../index.css';

export default function Home() {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [requestStatus, setRequestStatus] = useState(false);
	const [loader,setLoader] = useState(false);
	const navigate = useNavigate();
	const [nameErr, setNameErr] = useState('');
	const [phoneErr, setPhoneErr] = useState('');


	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handlePhoneNumberChange(e) {
		setPhoneNumber(e.target.value.replace(/\D/g, ''));
	}

	function validateName(){
		if (name === ''){
			setNameErr('Please provide a name')
			return false;
		} else {
			setNameErr('')
			return true;
		}
	}

	function validatePhoneNumber(phone){
		if (phone.length !== 11){
			setPhoneErr('Phone number must be 11 digits')
			return false;
		} else {
			setPhoneErr('')
			return true;
		}
	}

	useEffect(() => {
		const formData = localStorage.getItem('formData');
		if (formData) {
			setRequestStatus(true);
		}
	}, []);
	
	function clearStorage(){
		localStorage.clear();
		window.location.reload();
	}

	async function handlePlaceOrder(e) {
		e.preventDefault();
		const url = 'https://order.drcash.sh/v1/order';

		if(!validateName() && !validatePhoneNumber(phoneNumber)){
			return;
		}

		const requestBody = {
			stream_code: 'vv4uf',
			client: {
				phone: phoneNumber,
				name: name,
			},
		};

		if (name && phoneNumber.length === 11) {
			setLoader(true);
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer RLPUUOQAMIKSAB2PSGUECA',
				},
				body: JSON.stringify(requestBody),
			});

			if (response.ok) {
				setName('')
				navigate('/thankyou');
			} else {
				console.log(response.statusText);
			}
			if (!requestStatus) {
				localStorage.setItem('formData', JSON.stringify({ name }));
				setRequestStatus(true);
			}
		}
	}

	return (
		<>
			<div className="form-wrapper">
				{loader ? (
                    <DNA
					visible={true}
					height="250"
					width="250"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
					/>
                ) :(
					<form>
					<input
						type="text"
						name="name"
						value={name}
						placeholder="Your name"
						onChange={handleNameChange}
						required="required"
					/>
					<span className='error'>{nameErr}</span>
					<InputMask
						mask="+7 (999) 999-99-99"
						placeholder="+7 (___) ___-__-__"
						maskChar="_"
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
					<span className='error'>{phoneErr}</span>
					<button
						type="submit"
						className="btn"
						onClick={handlePlaceOrder}
						disabled={requestStatus}
					>
						{requestStatus ? 'You have placed order already': 'Place order'}
					</button>
				</form>
				)}
			</div>
			{requestStatus && (<button className='clear-storage-button' onClick={clearStorage}>Clear local storage</button>)}
			
		</>
	);
}
