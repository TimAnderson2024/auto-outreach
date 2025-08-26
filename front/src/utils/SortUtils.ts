export type SortOption = { label: string; value: string}
export type SortChange = { field: string; dir: string}

export const sortDirs: SortOption[] = [
  { label: "Asc", value: "asc" },
  { label: "Desc", value: "desc" },
];