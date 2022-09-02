import { client } from '$services/redis';
import { pageCacheKeys } from '../keys';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/singup'];
export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		return client.GET(pageCacheKeys(route));
	}
	return null;
};

export const setCachedPage = (route: string, page: string) => {
	return client.SET(pageCacheKeys(route), page, {
		EX: 2
	});
};
