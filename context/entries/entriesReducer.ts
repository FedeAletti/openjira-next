import { Entry } from "./../../interfaces/entry"
import { EntriesState } from "./EntriesProvider"

type EntriesActionType =
	| { type: "[Entry] Add Entry"; payload: Entry }
	| { type: "[Entry] Entry-Updated"; payload: Entry }
	| { type: "[Entry] Refresh-Data"; payload: Entry[] }

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case "[Entry] Add Entry":
			return {
				...state,
				entries: [...state.entries, action.payload],
			}

		case "[Entry] Entry-Updated":
			return {
				...state,
				entries: state.entries.map((entry) =>
					entry._id === action.payload._id ? action.payload : entry
				),
			}

		case "[Entry] Refresh-Data":
			return {
				...state,
				entries: [...action.payload],
			}

		default:
			return state
	}
}
