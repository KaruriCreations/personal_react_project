import useFetch from "../../hooks/useFetch";

export default function HomePage(){
    const {data, loading, error} = useFetch("http://localhost:5000/store_info");

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error: {(error as any).message || String(error)}</h1>;
    if(!data) return <h1>No data available</h1>;

    return (
        <div>
            <h1>{(data as any[])[0]?.name}</h1>
            <p>{(data as any[])[0]?.description}</p>
            <p>{(data as any[])[0]?.phone_number}</p>
        </div>
    );
}