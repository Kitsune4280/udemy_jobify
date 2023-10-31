import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) throw new UnauthenticatedError('authentication invalid');

	try {
		const { userId, role } = verifyJWT(token);
		const testUser = userId === '65321aa6602ccf96a61df786';
		req.user = { userId, role, testUser };
		next();
	} catch (err) {
		if (!token) throw new UnauthenticatedError('authentication invalid');
	}
};

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			throw new UnauthorizedError('unauthorized to access this route');
		next();
	};
};

export const checkForTestUser = (req, res, next) => {
	if (req.user.testUser) throw new BadRequestError('Demo user. Read only.');
	next();
};
