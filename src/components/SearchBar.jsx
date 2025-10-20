import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
    const [typed,Settyped] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate('/loading', {state: {fishName: typed}});
        console.log("Searching for:", typed);
    }
    return (
        <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-xl">
            <input
                type="text"
                placeholder="Search..."
                className="flex-grow bg-transparent outline-none text-gray-500 px-4 rounded-full"
                value={typed}
                onChange={(e) => Settyped(e.target.value)}
            />
            <button
                className="bg-black text-white rounded-full px-8 py-2 font-medium shadow hover:bg-gray-900 transition"
                onClick={handleSearch}
            >
                Search
            </button>
    </div>
)}
