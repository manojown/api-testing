import React, { useState, useEffect } from "react";
import { selectUser, signupUser, checkLogin, clearState } from "../features/userSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Register() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [name, setName] = useState("");

	const { isFetching, isSuccess, isError, errorMessage, isLoggedIn } = useSelector(selectUser);

	const history = useHistory();
	const dispatch = useDispatch();
	const notifySuccess = (msg) => toast.success(msg);
	const notifyFailed = (msg) => toast.error(msg);

	const signUp = (e) => {
		e.preventDefault();
		dispatch(signupUser({ email, password, name }));
	};

	useEffect(() => {
		dispatch(checkLogin());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			dispatch(clearState());
			notifyFailed(errorMessage ? errorMessage : "Failed to login.");
		}

		if (isSuccess) {
			notifySuccess("SignUp successfully.");
			dispatch(clearState());
			history.push("/");
		}
		if (isLoggedIn) {
			notifySuccess("You are already loggedIn.");
			dispatch(clearState());
			history.push("/");
		}
	}, [dispatch, history, errorMessage, isError, isSuccess, isLoggedIn, isFetching]);

	return (
		<div className='w-full max-w-xs '>
			<header className='bg-white border-b-2 h-10 flex justify-center items-center'>
				<h1> Sign Up Here 🚪 </h1>
			</header>
			<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' for='Name'>
						Name
					</label>
					<input
						value={name}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='name'
						type='text'
						placeholder='Name'
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' for='Email'>
						Email
					</label>
					<input
						value={email}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='text'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2' for='password'>
						Password
					</label>
					<input
						value={password}
						className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
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
						type='button'
						onClick={signUp}>
						Sign up
					</button>
					<Link
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
						to='/login'>
						Login
					</Link>
				</div>
			</form>
			<p className='text-center text-gray-500 text-xs'>
				&copy;2020 Manoj Choudhary. All rights reserved.
			</p>
		</div>
	);
}

export default Register;
