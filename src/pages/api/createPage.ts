import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let data = JSON.parse(req.body);
		const client = await clientPromise;
		const DB = client.db("next-web-builder");
		const collection = DB.collection("pages");

		const slug = data.name.toLowerCase().split(" ").join("-");
		data.slug = slug;
		data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

		await collection.insertOne(data);

		res.status(201).json({
			message: "Data saved successfully!",
			data: data,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Something went wrong!" });
	}
}
