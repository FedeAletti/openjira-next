import { useContext } from "react"
import AppBar from "@mui/material/AppBar"
import { Toolbar, Typography, IconButton } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { UiContext } from "../../context/ui"

export const NavBar = () => {
	const { openSideMenu } = useContext(UiContext)

	return (
		<AppBar position="sticky" color="primary">
			<Toolbar>
				<IconButton size="large" edge="start" onClick={openSideMenu}>
					<MenuOutlinedIcon />
				</IconButton>

				<Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
					TaskFlow
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
