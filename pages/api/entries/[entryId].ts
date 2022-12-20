import { IEntry } from "./../../../models/Entry"
import mongoose from "mongoose"
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry } from "../../../models"

type Data = { message: string } | IEntry

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { entryId } = req.query

	if (!mongoose.isValidObjectId(entryId)) {
		return res.status(400).json({
			message: "El id no es válido",
		})
	}

	switch (req.method) {
		case "GET":
			// Get entry
			return getEntry(req, res)

		case "PUT":
			// Update entry
			return updateEntry(req, res)

		case "DELETE":
			// Delete entry
			return deleteEntry(req, res)

		default:
			return res.status(400).json({
				message: "Método no existe",
			})
	}
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { entryId } = req.query
	await db.connectToDatabase()
	const entry = await Entry.findById(entryId)
	await db.disconnectFromDatabase()

	if (!entry) {
		return res.status(400).json({
			message: "No se ha encontrado la entrada",
		})
	}

	res.status(200).json(entry)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { entryId } = req.query
	await db.connectToDatabase()

	const entryToUpdate = await Entry.findById(entryId)

	if (!entryToUpdate) {
		await db.disconnectFromDatabase()
		return res.status(400).json({
			message: "No se ha encontrado la entrada",
		})
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			entryId,
			{
				description,
				status,
			},
			{ runValidators: true, new: true }
		)
		await db.disconnectFromDatabase()

		res.status(200).json(updatedEntry!)
	} catch (error) {
		await db.disconnectFromDatabase()
		res.status(400).json({
			message: "No se ha podido actualizar la entrada",
		})
	}
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { entryId } = req.query
	const deletedEntry = await Entry.findByIdAndDelete(entryId)
	if (!deletedEntry) {
		return res.status(400).json({
			message: "No se ha podido eliminar la entrada",
		})
	}
	res.status(200).json({
		message: "Entrada eliminada",
	})
}
