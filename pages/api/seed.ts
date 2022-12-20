import type { NextApiRequest, NextApiResponse } from "next"
import { db, seedData } from "../../database"
import { Entry } from "../../models"

type Data = {
	ok: boolean
	message: string
	method: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === "production") {
		return res.status(403).json({
			ok: false,
			message: "No puedes acceder a esta ruta en produccion",
			method: req.method || "no hay metodo",
		})
	}

	await db.connectToDatabase()

	// work with the database here
	await Entry.deleteMany()
	await Entry.insertMany(seedData.entries)

	await db.disconnectFromDatabase()

	res.status(200).json({
		ok: true,
		message: "Proceso realizado correctamente",
		method: req.method || "no hay metodo",
	})
}
