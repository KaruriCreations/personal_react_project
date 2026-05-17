import { useEffect, useState } from "react";
export default function useFetch(url) {
    //using useState to manage the data, loading, and error states
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //using useEffect to fetch data from the backend every time url changes
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
    }, [url])

    return { data, loading, error };
}