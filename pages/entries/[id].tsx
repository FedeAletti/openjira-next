import React, { ChangeEvent, FC, useMemo, useState, useContext } from "react"
import { GetServerSideProps } from "next"

import { Layout } from "../../components/layouts"
import {
	capitalize,
	Grid,
	Card,
	CardHeader,
	CardContent,
	TextField,
	Button,
	CardActions,
	FormControl,
	FormLabel,
	FormHelperText,
	RadioGroup,
	FormControlLabel,
	Radio,
	IconButton,
} from "@mui/material"
import SaveOutlined from "@mui/icons-material/SaveOutlined"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import { Entry, EntryStatus } from "../../interfaces"
import { isValidObjectId } from "mongoose"
import { dbEntries } from "../../database"
import { EntriesContext } from "../../context/entries"
import { getFormatDistanceToNow } from "../../utils/dateFunctions"
import { useRouter } from "next/router"

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

interface Props {
	entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
	const router = useRouter()
	const { updateEntry } = useContext(EntriesContext)

	const [inputValue, setInputValue] = useState(entry.description)
	const [status, setStatus] = useState(entry.status)
	const [touched, setTouched] = useState(false)

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	)

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus)
	}

	const onSave = () => {
		if (inputValue.trim().length === 0) return

		const updatedEntry = {
			...entry,
			description: inputValue,
			status,
		}

		updateEntry(updatedEntry, true)
		setTouched(false)
		router.push("/")
	}

	return (
		<Layout title={inputValue.substring(0, 20) + "..."}>
			<Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada: ${inputValue}`}
							subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`}
						/>

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								autoFocus
								multiline
								label="Nueva entrada"
								onBlur={() => setTouched(true)}
								helperText={isNotValid && "Ingrese un valor"}
								error={isNotValid}
								onChange={onInputValueChanged}
								value={inputValue}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row value={status} onChange={onStatusChanged}>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlined />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}>
								Guardar
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				sx={{
					position: "fixed",
					bottom: 30,
					right: 30,
					backgroundColor: "error.dark",
				}}>
				<DeleteOutlined />
			</IconButton>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string }

	const entry = await dbEntries.getEntryById(id)

	if (!entry) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	return {
		props: {
			entry,
		},
	}
}

export default EntryPage
