import { useEffect, useState } from 'react';

const Mounts = ({title}) => {
    const [mountData, setMountData] = useState([]);
    const [searchMountData, setSearchMountData] = useState("");
    const [filteredMountData, setFilteredMountData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/mounts"
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

    useEffect(() => {
        let filteredData = mountData.filter((mount) =>
        mount.name.toLowerCase().includes(searchMountData.toLowerCase())
    );

    if (sortOrder === 'asc') {
        filteredData.sort((a,b) => a.name.localeCompare(b.name));
    } else {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredMountData(filteredData)
    }, [searchMountData, sortOrder, mountData])

    const handleSearch = (e) => {
        setSearchMountData(e.target.value)
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
                    placeholder='Search by name e.g. chocobo'
                    value={searchMountData}
                    onChange={handleSearch}    
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
            <div className='info-container'>
                {filteredMountData.length > 0 ? (filteredMountData.map((mount) => (
                    <div className='info' key={mount.id}>
                        <div className='name'>
                            <h3>Name:</h3>
                            <p>{mount.name}</p>
                        </div>
                        <div className='description'>
                            <h3>Description</h3>
                            <p>{mount.description}</p>
                        </div>
                        <div className='description'>
                            <h3>Enhanced Description: </h3>
                            <p>{mount.enhanced_description}</p>
                        </div>
                        <div className='patch'>
                            <h3>Patch Released: </h3>
                            <p>{mount.patch}</p>
                        </div>
                    </div>
                ))
                ) : (<p>Loading...</p>)
                }
            </div>
        </div>
    );
}

export default Mounts;
