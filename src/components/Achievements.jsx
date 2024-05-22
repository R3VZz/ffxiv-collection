import { useEffect, useState } from 'react';

const Achievements = () => {
    const [achievementData, setAchievementData] = useState([]);
    const [searchAchievementData, setSearchAchievementData] = useState("");
    const [filteredAchievementData, setFilteredAchievementData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [err, setErr] = useState(null);



    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/achievements?limit=100"
            );

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            setAchievementData(data.results);
        } catch (err) {
            console.log(err.message);
            setErr(err.message);
        }
    }

    useEffect(() => {
        fetchHandler()
    }, [])

    useEffect(() => {
        let filteredData = achievementData.filter((achievement) =>
        achievement.name.toLowerCase().includes(searchAchievementData.toLowerCase())
    );

    if (sortOrder === 'asc') {
        filteredData.sort((a,b) => a.name.localeCompare(b.name));
    } else {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredAchievementData(filteredData)
    }, [searchAchievementData, sortOrder, achievementData])

    const handleSearch = (e) => {
        setSearchAchievementData(e.target.value)
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value)
    }

    return (
        <div>
            <h1>Achievements</h1>
            <div>
                <input 
                    type='text'
                    placeholder='Search by name'
                    value={searchAchievementData}
                    onChange={handleSearch}    
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
            <div className='minions-container'>
                {filteredAchievementData.length > 0 ? (filteredAchievementData.map((achievment) => (
                    <div className='achievement-info' key={achievment.id}>
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
