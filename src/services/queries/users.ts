import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userCacheKeys } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
	try {
		const user = await client.hGetAll(userCacheKeys(id));
		return deserialize(id, user);
	} catch (error) {
		console.error(error, 'something went wrong');
	}
};

export const createUser = async (attrs: CreateUserAttrs): Promise<string> => {
	const userId = genId();

	try {
		await client.hSet(userCacheKeys(userId), serialize(attrs));
		return userId;
	} catch (error) {
		console.error(error, 'something went wrong');
	}
};

const serialize = (user: CreateUserAttrs) => {
	const { username, password } = user;
	return { username, password };
};

const deserialize = (id: string, user: { [key: string]: string }) => {
	const { username, password } = user;

	return {
		id,
		username,
		password
	};
};
