export async function fetchIdeas({
  pageNumber,
  pageSize,
  sort,
}: {
  pageNumber: number;
  pageSize: number;
  sort: string;
}) {
  const res = await fetch(
    `/api/ideas?page=${pageNumber}&size=${pageSize}&sort=${sort}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ideas");
  }

  const json = await res.json();
  return json.data;
}
