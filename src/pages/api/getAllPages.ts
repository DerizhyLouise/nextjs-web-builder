import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const client = await clientPromise;
		const db = client.db("next-web-builder");
		const collection = db.collection("pages");
		const allData = await collection.find({}).toArray();

		res.status(200).json(allData);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Something went wrong!" });
	}
}
