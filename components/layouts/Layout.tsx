import { FC } from "react"
import Head from "next/head"
import { Box } from "@mui/material"
import { NavBar, SideBar } from "../ui"

interface Props {
	title?: string
	children: React.ReactNode
}

export const Layout: FC<Props> = ({ title = "TaskFlow", children }) => {
	return (
		<Box sx={{ flexFlow: 1 }}>
			<Head>
				<title>{title}</title>
			</Head>

			<NavBar />

			<SideBar />

			<Box sx={{ padding: "10px 20px", height: "calc(100vh - 250px" }}>
				{children}
			</Box>
		</Box>
	)
}
