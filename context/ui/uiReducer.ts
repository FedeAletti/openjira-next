import { UIState } from "./UiProvider"

type UIActionType =
	| { type: "UI - Open Siderbar" }
	| { type: "UI - Close Siderbar" }
	| { type: "UI - Set isAddingEntry"; payload: boolean }
	| { type: "UI - Start Dragging" }
	| { type: "UI - End Dragging" }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case "UI - Open Siderbar":
			return { ...state, sideMenuOpen: true }

		case "UI - Close Siderbar":
			return { ...state, sideMenuOpen: false }

		case "UI - Set isAddingEntry":
			return {
				...state,
				isAddingEntry: action.payload,
			}

		case "UI - Start Dragging":
			return {
				...state,
				isDragging: true,
			}

		case "UI - End Dragging":
			return {
				...state,
				isDragging: false,
			}

		default:
			return state
	}
}
