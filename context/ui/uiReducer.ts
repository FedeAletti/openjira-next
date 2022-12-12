import { UIState } from "./UiProvider"

type UIActionType =
	| { type: "UI - Open Siderbar" }
	| { type: "UI - Close Siderbar" }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case "UI - Open Siderbar":
			return { ...state, sideMenuOpen: true }

		case "UI - Close Siderbar":
			return { ...state, sideMenuOpen: false }

		default:
			return state
	}
}
