
export const Input = () => {
return(
  <div className="relative p-5">
<label htmlFor="Search" className="sr-only">
  Search
</label>
<input
  // onChange={handleSearchInput}
  type="text"
  id="Search"
  placeholder="Search for..."
  className="h-full w-full rounded-md py-2.5 pe-10 bg-transparent text-zinc-100 shadow-sm sm:text-sm outline-none"
/>

</div>
)

}

