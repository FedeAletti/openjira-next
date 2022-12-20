import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import React, { DragEvent, FC, useContext } from "react"
import { UiContext } from "../../context/ui"
import { Entry } from "../../interfaces"
import { getFormatDistanceToNow } from "../../utils/dateFunctions"

interface Props {
	entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UiContext)

	const router = useRouter()

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData("text", entry._id)

		startDragging()
	}

	const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
		// e.dataTransfer.clearData()

		endDragging()
	}

	const onClick = () => {
		router.push(`/entries/${entry._id}`)
	}

	return (
		<Card
			sx={{ marginBottom: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={onClick}>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: "pre-line" }}>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
					<Typography variant="body2">{`${getFormatDistanceToNow(
						entry.createdAt
					)}`}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
