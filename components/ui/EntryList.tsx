import { DragEvent, FC, useContext, useMemo } from "react"
import { EntriesContext } from "../../context/entries"
import { UiContext } from "../../context/ui"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../interfaces"
import { List, Paper } from "@mui/material"
import styles from "./EntryList.module.css"

interface Props {
	status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext)
	const { isDragging, endDragging } = useContext(UiContext)

	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries, status]
	)

	const allowDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const entryId = e.dataTransfer.getData("text")

		const entry = entries.find((entry) => entry._id === entryId)!
		entry.status = status
		updateEntry(entry)
		endDragging()
	}

	return (
		// TODO: aqui haremos el drop
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ""}>
			<Paper
				sx={{
					height: "calc(100vh - 180px)",
					overflowY: "scroll",
					backgroundColor: "transparent",
					padding: "3px 5px",
				}}>
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.5" }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	)
}
