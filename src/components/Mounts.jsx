import { useEffect, useState } from 'react';

const Mounts = () => {
    const [mountData, setMountData] = useState([]);
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/mounts?limit=1000"
            );

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            console.log(data)
            setMountData(data.results);
        } catch (err) {
            console.log(err.message);
            setErr(err.message);
        }
    }

    useEffect(() => {
        fetchHandler()
    }, [])

    return (
        <div>
            <h1>Final Fantasy 14 - Mounts</h1>
            <div className='mounts-container'>
                {mountData.length > 0 ? (mountData.map((mount) => (
                    <div key={mount.id}>
                        <h2>Name: {mount.name}</h2>
                        <h3>Description</h3>
                        <p>Description: {mount.description}</p>
                        <h3>Enhanced Description: </h3>
                        <p>{mount.enhanced_description}</p>
                        <h3>Patch Released: </h3>
                        <p>{mount.patch}</p>
                    </div>
                ))
                ) : (<p>No data available</p>)
                }
            </div>
        </div>

    );
}

export default Mounts;
