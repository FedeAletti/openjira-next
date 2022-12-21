import { FC, useReducer } from "react"
import { UiContext } from "./"
import { uiReducer } from "./uiReducer"

export interface UIState {
	sideMenuOpen: boolean
	isAddingEntry: boolean
	isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
	isAddingEntry: false,
	isDragging: false,
}

interface Props {
	children: React.ReactNode
}

export const UiProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

	const openSideMenu = () => {
		dispatch({ type: "UI - Open Siderbar" })
	}

	const closeSideMenu = () => {
		dispatch({ type: "UI - Close Siderbar" })
	}

	const setIsAddingEntry = (isAdding: boolean) => {
		dispatch({ type: "UI - Set isAddingEntry", payload: isAdding })
	}

	const startDragging = () => {
		dispatch({ type: "UI - Start Dragging" })
	}

	const endDragging = () => {
		dispatch({ type: "UI - End Dragging" })
	}

	return (
		<UiContext.Provider
			value={{
				...state,

				// Methods
				openSideMenu,
				closeSideMenu,

				setIsAddingEntry,

				startDragging,
				endDragging,
			}}>
			{children}
		</UiContext.Provider>
	)
}
