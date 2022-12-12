import { EntriesState } from "./EntriesProvider"

type EntriesActionType = { type: "Entries -  ActionName" }

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		// case "Entries -  ActionName":
		// 	break

		default:
			return state
	}
}
