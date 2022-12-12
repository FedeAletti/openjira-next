import { FC, useReducer } from "react"
import { UiContext, uiReducer } from "./"

export interface UIState {
	sideMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
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

	return (
		<UiContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>
			{children}
		</UiContext.Provider>
	)
}
