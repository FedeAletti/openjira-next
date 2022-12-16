import { FC, useReducer } from "react"
import { Entry } from "../../interfaces"
import { EntriesContext, entriesReducer } from "./"
import { v4 as uuidv4 } from "uuid"

export interface EntriesState {
	entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: "Pendiente: sadasdasdas",
			status: "pending",
			createdAt: Date.now(),
		},
		{
			_id: uuidv4(),
			description: "En-Progreso: sadasdasdas",
			status: "in-progress",
			createdAt: Date.now() - 1000000,
		},
		{
			_id: uuidv4(),
			description: "Terminado: sadasdasdas",
			status: "finished",
			createdAt: Date.now() - 100000,
		},
	],
}

interface Props {
	children: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createdAt: Date.now(),
			status: "pending",
		}

		dispatch({
			type: "[Entry] Add Entry",
			payload: newEntry,
		})
	}

	const updateEntry = (entry: Entry) => {
		dispatch({
			type: "[Entry] Entry-Updated",
			payload: entry,
		})
	}

	return (
		<EntriesContext.Provider
			value={{
				...state,

				//Methods
				addNewEntry,
				updateEntry,
			}}>
			{children}
		</EntriesContext.Provider>
	)
}
