import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectUser, clearState, loginUser, checkLogin } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	const { isError, errorMessage, isLoggedIn } = useSelector(selectUser);

	const dispatch = useDispatch();
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);
	const history = useHistory();

	useEffect(() => {
		dispatch(checkLogin());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			dispatch(clearState());
			notifyFailed(errorMessage ? errorMessage : "Failed to login.");
		}

		if (isLoggedIn) {
			notifySuccess("Login successfully.");
			dispatch(clearState());
			history.push("/");
		}
	}, [dispatch, history, isError, isLoggedIn, errorMessage]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			loginUser({
				email: email,
				password: password,
			})
		);
	};
	return (
		<div className='w-full max-w-xs '>
			<header className='bg-white border-b-2 h-10 flex justify-center items-center'>
				<h1> Login Here 🚪 </h1>
			</header>
			<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' for='username'>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='username'
						type='text'
						placeholder='Username'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2' for='password'>
						Password
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='******************'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* <p className='text-red-500 text-xs italic'>Please choose a password.</p> */}
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'>
						Login
					</button>

					<Link
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
						to='/signup'>
						Sign up
					</Link>
				</div>
			</form>
			<p className='text-center text-gray-500 text-xs'>
				&copy;2020 Manoj Choudhary. All rights reserved.
			</p>
		</div>
	);
}

export default Login;
