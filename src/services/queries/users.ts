import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userCacheKeys } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {};

export const createUser = async (attrs: CreateUserAttrs) => {
	const { username, password } = attrs;
	try {
		const userId = genId();
		await client.hSet(userCacheKeys(userId), {
			username,
			password
		});
	} catch (error) {
		console.error(error, 'something went wrong');
	}
};
