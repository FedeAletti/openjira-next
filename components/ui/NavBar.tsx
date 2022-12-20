import { useContext } from "react"
import AppBar from "@mui/material/AppBar"
import { Toolbar, Typography, IconButton } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { UiContext } from "../../context/ui"
import NextLink from "next/link"
import Link from "@mui/material/Link"

export const NavBar = () => {
	const { openSideMenu } = useContext(UiContext)

	return (
		<AppBar position="sticky" color="primary">
			<Toolbar>
				<IconButton size="large" edge="start" onClick={openSideMenu}>
					<MenuOutlinedIcon />
				</IconButton>

				<NextLink href={"/"} passHref legacyBehavior>
					<Link underline="none" color={"white"}>
						<Typography variant="h6">TaskFlow</Typography>
					</Link>
				</NextLink>
			</Toolbar>
		</AppBar>
	)
}
