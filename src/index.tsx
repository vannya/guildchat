import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import { Login } from './pages/Login';
import './styles.scss';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

export const AuthContext = createContext({ isAuth: false, userId: null });

// FIREBASE INITIALIZATION
firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
});
firebase.analytics();

export const App = (): JSX.Element => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>(null);
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<AuthContext.Provider value={{ isAuth, userId }}>
						<Login setAuth={setIsAuth} setUserId={setUserId} />
					</AuthContext.Provider>
				</Route>
				<Route path='/chat'>
					<AuthContext.Provider value={{ isAuth, userId }}>
						<ChatPage />
					</AuthContext.Provider>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
