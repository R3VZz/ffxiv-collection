import { useEffect, useState } from 'react';

const Achievements = ({ title }) => {
    const [achievementData, setAchievementData] = useState([]);
    const [searchAchievementData, setSearchAchievementData] = useState("");
    const [filteredAchievementData, setFilteredAchievementData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [err, setErr] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 20;



    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/achievements"
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
        fetchHandler();
    }, []);

    useEffect(() => {
        let filteredData = achievementData.filter((achievement) =>
            achievement.name.toLowerCase().includes(searchAchievementData.toLowerCase())
        );

        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredAchievementData(filteredData)
    }, [searchAchievementData, sortOrder, achievementData])

    const handleSearch = (e) => {
        setSearchAchievementData(e.target.value)
        setCurrentPage(1)
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <input
                    type='text'
                    placeholder='Search by name e.g. fast and flurry-ous'
                    value={searchAchievementData}
                    onChange={handleSearch}
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
            <div className='info-container'>
                {filteredAchievementData.length > 0 ? (filteredAchievementData.map((achievment) => (
                    <div className='info' key={achievment.id}>
                        <div className='name'>
                            <h3>Name:</h3>
                            <p>{achievment.name}</p>
                        </div>
                        <div className='description'>
                            <h3>Description</h3>
                            <p>{achievment.description}</p>
                        </div>
                        <div>
                            <h3>Players completed: </h3>
                            <p>{achievment.owned}</p>
                        </div>
                        <div className='patch'>
                            <h3>Patch Released: </h3>
                            <p>{achievment.patch}</p>
                        </div>
                    </div>
                ))
                ) : (<p>Loading...</p>)
                }
            </div>
        </div>
    );
}

export default Achievements;
