import { useEffect, useState } from 'react';

const Achievements = () => {
    const [achievementData, setAchievementData] = useState([]);
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/achievements?limit=10"
            );

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            console.log(data)
            setAchievementData(data.results);
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
            <h1>Achievements</h1>
            <div className='minions-container'>
                {achievementData.length > 0 ? (achievementData.map((achievment) => (
                    <div key={achievment.id}>
                        <h2>Name: {achievment.name}</h2>
                        <h3>Description</h3>
                        <p>{achievment.description}</p>
                        <p>Players Acheived: {achievment.owned}</p>
                        <h3>Patch Released: </h3>
                        <p>{achievment.patch}</p>
                    </div>
                ))
                ) : (<p>No data available</p>)
                }
            </div>
        </div>
    );
}

export default Achievements;
