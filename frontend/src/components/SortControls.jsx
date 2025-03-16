export default function SortControls({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}) {
  return (
    <div className="d-flex gap-3 mb-4">
      <select
        className="form-select w-auto"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="playtime">Sort by Playtime</option>
        <option value="name">Sort by Name</option>
      </select>

      <button
        className="btn btn-primary"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}
