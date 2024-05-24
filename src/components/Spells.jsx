import { useEffect, useState } from 'react';

const Spells = ({ title }) => {
    const [spellData, setSpellData] = useState([]);
    const [searchSpellData, setSearchSpellData] = useState("");
    const [filteredSpellData, setFilteredSpellData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/spells"
            );

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            console.log(data)
            setSpellData(data.results);
        } catch (err) {
            console.log(err.message);
            setErr(err.message);
        }
    }

    useEffect(() => {
        fetchHandler()
    }, [])

    useEffect(() => {
        let filteredData = spellData.filter((spell) =>
            spell.name.toLowerCase().includes(searchSpellData.toLowerCase())
        );

        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredSpellData(filteredData)
    }, [searchSpellData, sortOrder, spellData])

    const handleSearch = (e) => {
        setSearchSpellData(e.target.value)
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
                    placeholder='Search by name e.g. flying sardine'
                    value={searchSpellData}
                    onChange={handleSearch}
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
            <div className='info-container'>
                {filteredSpellData.length > 0 ? (filteredSpellData.map((spell) => (
                    <div className='info' key={spell.id}>
                        <div className='name'>
                            <h3>Name</h3>
                            <p>{spell.name}</p>
                        </div>
                        <div className='description'>
                            <h3>Description</h3>
                            <p>{spell.description}</p>
                        </div>
                        <div className='patch'>
                            <img
                                className="icon"
                                src={spell.icon}
                                alt="Spell icon"
                            />
                            <h3>Patch Released: </h3>
                            <p>{spell.patch}</p>
                        </div>
                    </div>
                ))
                ) : (<h2>Loading...</h2>)
                }
            </div>
        </div>
    );
}

export default Spells;
