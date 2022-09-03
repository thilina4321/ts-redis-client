import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	// adding hSet
	await client.hSet('car', {
		color: 'green',
		year: 1940
	});

	// fetching hGet
	const car = await client.hGetAll('car');

	console.log(car);
};
run();
