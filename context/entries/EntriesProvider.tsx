import { FC, useReducer, useEffect } from "react"
import { Entry } from "../../interfaces"
import { EntriesContext, entriesReducer } from "./"
import { entriesApi } from "../../api"

import { useSnackbar } from "notistack"

export interface EntriesState {
	entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
}

interface Props {
	children: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>("/entries", { description })

		dispatch({
			type: "[Entry] Add Entry",
			payload: data,
		})
	}

	const updateEntry = async (
		{ _id, description, status }: Entry,
		showSnackbar = false
	) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status,
			})
			dispatch({
				type: "[Entry] Entry-Updated",
				payload: data,
			})

			if (showSnackbar) {
				enqueueSnackbar("Entry updated successfully", {
					variant: "success",
					autoHideDuration: 2000,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				})
			}
		} catch (error) {}
	}

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>("/entries")
		dispatch({
			type: "[Entry] Refresh-Data",
			payload: data,
		})
	}

	useEffect(() => {
		refreshEntries()
	}, [])

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
