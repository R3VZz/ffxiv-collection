import { useEffect, useState } from 'react';

const Minions = () => {
    const [minionData, setMinionData] = useState([]);
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/minions?limit=1000"
            );

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            console.log(data)
            setMinionData(data.results);
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
            <div className='minions-container'>
                {minionData.length > 0 ? (minionData.map((minion) => (
                    <div key={minion.id}>
                        <h2>Name: {minion.name}</h2>
                        <h3>Description</h3>
                        <p>Description: {minion.description}</p>
                        <h3>Enhanced Description: </h3>
                        <p>{minion.enhanced_description}</p>
                        <h3>Patch Released: </h3>
                        <p>{minion.patch}</p>
                    </div>
                ))
                ) : (<p>No data available</p>)
                }
            </div>
        </div>

    );
}

export default Minions;
