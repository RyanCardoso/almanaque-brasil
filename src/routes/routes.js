// Libs
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


// Onboarding
// import Login from '../screens/onboarding/Login/LoginScreen';

// import Login from '../pages/login';
import Trails from '../pages/trails';
import Activities from '../pages/activities';
import ActivitiesList from '../pages/activities/activitiesList';
import OriginOfTheExpression from '../pages/activities/originOfTheExpression';


// import PrivateRoute from './PrivateRoute';
import {
	getTrailsThunk,
} from '../dataflow/thunks/trails-thunk';

const mapDispatchToProps = dispatch => ({
	getTrailsThunk: () => {
		dispatch(getTrailsThunk());
	},
});

const Routes = (props) => {
	useEffect(() => {
		props.getTrailsThunk();
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				{/* <Route exact path='/' component={Login} /> */}
				<Route exact path='/' component={Trails} />
				<Route exact path='/trails' component={Trails} />
				<Route exact path='/activities/:trailId' component={Activities} />
				<Route exact path='/activitiesList' component={ActivitiesList} />
				<Route exact path='/origin-of-the-expression' component={OriginOfTheExpression} />
				{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
			</Switch>
		</BrowserRouter>
	)
};

export default connect(
	null,
	mapDispatchToProps
)(Routes);
