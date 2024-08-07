import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { id } = JSON.parse(req.body);
		const client = await clientPromise;
		const DB = client.db("next-web-builder");
		const collection = DB.collection("pages");
		const objectId = ObjectId.createFromHexString(id);
		await collection.deleteOne({ _id: objectId });

		res.status(200).json({
			message: "Data deleted successfully!",
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Something went wrong!" });
	}
}
