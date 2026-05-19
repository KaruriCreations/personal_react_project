import { useEffect, useState, useCallback } from "react";
export default function useFetch(url) {
    //using useState to manage the data, loading, and error states
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // refetch function that can be called manually after CRUD operations
    const refetch = useCallback(() => {
        setLoading(true);
        setError(null);
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
    }, [url]);

    //using useEffect to fetch data from the backend every time url changes
    useEffect(() => {
        refetch();
    }, [refetch])

    return { data, setData, loading, error, refetch };
}