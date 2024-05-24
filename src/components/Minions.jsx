import { useEffect, useState } from 'react';

const Minions = ({title}) => {
    const [minionData, setMinionData] = useState([]);
    const [searchMinionData, setSearchMinionData] = useState("");
    const [filteredMinionData, setFilteredMinionData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/minions"
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

    useEffect(() => {
        let filteredData = minionData.filter((minion) =>
        minion.name.toLowerCase().includes(searchMinionData.toLowerCase())
    );

    if (sortOrder === 'asc') {
        filteredData.sort((a,b) => a.name.localeCompare(b.name));
    } else {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredMinionData(filteredData)
    }, [searchMinionData, sortOrder, minionData])

    const handleSearch = (e) => {
        setSearchMinionData(e.target.value)
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value)
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <input 
                    type='text'
                    placeholder='Search by name e.g. alexander'
                    value={searchMinionData}
                    onChange={handleSearch}    
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
            <div className='info-container'>
                {filteredMinionData.length > 0 ? (filteredMinionData.map((minion) => (
                    <div className='info' key={minion.id}>
                        <div>
                            <div className='name'>
                                <h3>Name</h3>
                                <p>{minion.name}</p>
                            </div>
                            <div className='description'>
                                <h3>Description</h3>
                                <p>{minion.description}</p>
                            </div>
                        </div>

                        <div className='description'>
                            <h3>Enhanced Description: </h3>
                            <p>{minion.enhanced_description}</p>
                        </div>
                        <div className='patch'>
                            <h3>Patch Released: </h3>
                            <p>{minion.patch}</p>
                        </div>
                    </div>
                ))
                ) : (<p>Loading...</p>)
                }
            </div>
        </div>
    );
}

export default Minions;
