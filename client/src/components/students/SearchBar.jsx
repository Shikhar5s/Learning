import { useState } from "react";
import { useNavigate } from "react-router-dom";



const SearchBar = ({data}) => {

const navigate=useNavigate();

const[input,setInput]=useState(data ? data:'');

const onSearchHandler=(e)=>{

e.preventDefault();
navigate('/course-list/'+ input)


}





  

  return (
    <section
      className="bg-gray-800 w-full max-w-4xl mx-auto rounded-md px-6 py-4 mt-10"
      aria-label="Search courses"
    >
      <form
        onSubmit={onSearchHandler}
        className="flex w-full"
        role="search"
        aria-label="Search courses"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search courses, topics, or skills..."
          className="flex-grow px-4 py-3 rounded-l-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base"
          aria-label="Search input"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 px-6 py-3 rounded-r-md font-semibold shadow-md shadow-yellow-400/50"
          aria-label="Search button"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchBar;