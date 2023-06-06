import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import UsersList from './UsersList';

let userList = []; 


const AddUser = () => {
	
	const [userData, setUserData] = useState({name: '', age: Number});

	const handleData = (e) => {
		e.preventDefault(); 

		if(userData.name === "") {
			alert("Please enter a username")
		} 
		if (!userData.age || userData.age <= 0) {
			alert("Please enter a valid age")
			return; 
		};

		const duplicateUsername = userList.filter((user) => user.name === userData.name);
			if (duplicateUsername.length > 0) {
  		alert('Username already exists, please try another one.');
  			return; 
		}; 

		userList.push(userData); 

		setUserData({name: '', age: ''})
	};

	const userNameHandler = (e) => {
		setUserData({...userData, name: e.target.value})
	};

	const ageHandler = (e) => {
		setUserData({...userData, age: parseInt(e.target.value)})
		// Stop the value going below 0 and make sure the user only uses numbers 
		let newAge = e.target.value;
		if(!isNaN(newAge)) {
			setUserData({...userData, age: Math.max(newAge, 0)})
		}
	}; 

	return (
		<div>
			<Card className={classes.card}>
				<form onSubmit={handleData} className={classes.form}>
					<div className={classes.container}>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" value={userData.name} onChange={userNameHandler} />
					<label htmlFor="age">Age (Years)</label>
					<input id="age" type="number" value={userData.age} onChange={ageHandler} />
					<Button type="submit" className={classes.submit}>
						Add User
					</Button>
					</div>
				</form>
				</Card>
				{/* stop render of empty component */}
		   {userList.length !== 0 ?  <UsersList users={userList} /> : null}
		</div>
	);
};

export default AddUser;
