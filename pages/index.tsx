import { Typography } from "@mui/material"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { Layout } from "../components/layouts"

const HomePage: NextPage = () => {
	return (
		<Layout>
			<Typography variant="h1">Hola mundo</Typography>
		</Layout>
	)
}

export default HomePage
