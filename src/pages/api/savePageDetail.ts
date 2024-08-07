import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let { data } = req.body;
		let pageId = req.query.id;
		const client = await clientPromise;
		const DB = client.db("next-web-builder");
		const collection = DB.collection("page_detail");

		const pageDetail = {
			data: data,
			pageId: pageId,
		};

		const exist = await collection.findOne({ pageId: pageId });
		if (exist) {
			await collection.updateOne(
				{ pageId: pageId },
				{ $set: pageDetail }
			);
		} else {
			await collection.insertOne(pageDetail);
		}

		res.status(201).json({
			message: "Data saved successfully!",
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Something went wrong!" });
	}
}
