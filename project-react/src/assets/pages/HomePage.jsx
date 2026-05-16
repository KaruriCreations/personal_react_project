import useFetch from "../../hooks/useFetch";
import NavBar from "../components/NavBar";

export default function HomePage(){
    const {data, loading, error} = useFetch("http://localhost:5000/store_info");

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error: {error.message || String(error)}</h1>;
    if(!data) return <h1>No data available</h1>;

    return (
        <>
        <NavBar />
        <div>
            <h1>{data[0]?.name}</h1>
            <p>{data[0]?.description}</p>
            <p>{data[0]?.phone_number}</p>
        </div>
        </>
    );
}