import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	// adding hSet
	await client.hSet('car', {
		color: 'green',
		year: 1940 // owner : null => do not add null or underfined. It throw an error
		// as redis try to call toString() when it try to store data
	});

	// fetching hGet
	const car = await client.hGetAll('car');

	// hGetAll provide empty object even it does not contain key
	// so what we can do is like below

	if (Object.keys(car).length === 0) return null;

	console.log(car);
};
run();
