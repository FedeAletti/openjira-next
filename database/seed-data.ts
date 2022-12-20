interface SeedData {
	entries: SeedEntry[]
}

interface SeedEntry {
	description: string
	status: string
	createdAt: number
}

export const seedData = {
	entries: [
		{
			description: "Pendiente: sadasdasdas",
			status: "pending",
			createdAt: Date.now(),
		},
		{
			description: "En-Progreso: sadasdasdas",
			status: "in-progress",
			createdAt: Date.now() - 1000000,
		},
		{
			description: "Terminado: sadasdasdas",
			status: "finished",
			createdAt: Date.now() - 100000,
		},
	],
}
