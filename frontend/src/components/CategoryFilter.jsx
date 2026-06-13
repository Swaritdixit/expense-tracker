import "../styles/CategoryFilter.css"

function CategoryFilter({
    selectedCategory,
    setSelectedCategory
}){
    return(
        <select
        className="category-select"
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}>
            <option value="All">
                All
            </option>
            <option value="Food">
                Food
            </option>
            <option value="Travel">
                Travel
            </option>
            <option value="Shopping">
                Shopping
            </option>
        </select>
    );
}
export default CategoryFilter;