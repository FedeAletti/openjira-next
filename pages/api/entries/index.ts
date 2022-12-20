import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry, IEntry } from "../../../models"

type Data = { message: string } | IEntry[] | IEntry

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getEntries(res)

		case "POST":
			return createEntry(req, res)

		default:
			return res.status(404).json({
				message: "No existe",
			})
	}

	res.status(20).json({
		message: "Todo correcto",
	})
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await db.connectToDatabase()

	const entries = await Entry.find().sort({ createdAt: "asc" })
	await db.disconnectFromDatabase()

	res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { description = "" } = req.body

	const newEntry = new Entry({
		description,
		createdAt: new Date(),
	})

	try {
		await db.connectToDatabase()
		await newEntry.save()
		await db.disconnectFromDatabase()
		res.status(201).json(newEntry)
	} catch (error) {
		await db.disconnectFromDatabase()
		res.status(500).json({
			message: "Error al crear la entrada",
		})
	}
}
