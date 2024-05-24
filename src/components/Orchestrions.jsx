import { useEffect, useState } from "react";

const Orchestrions = ({ title }) => {
    const [orchestrionData, setOrchestrionData] = useState([]);
    const [searchOrchestrionData, setSearchOrchestrionData] = useState("");
    const [filteredOrchestrionData, setFilteredOrchestrionData] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [err, setErr] = useState(null);

    const fetchHandler = async () => {
        try {
            let response = await fetch(
                "https://ffxivcollect.com/api/orchestrions"
            );

            if (!response) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            setOrchestrionData(data.results);
        } catch (err) {
            console.log(err.message);
            setErr(err.message)
        }
    }

    useEffect(() => {
        fetchHandler();
    }, []);

    useEffect(() => {
        let filteredData = orchestrionData.filter((orchestrion) =>
            orchestrion.name.toLowerCase().includes(searchOrchestrionData.toLowerCase())
        );

        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredOrchestrionData(filteredData);

    }, [searchOrchestrionData, sortOrder, orchestrionData])

    const handleSearch = (e) => {
        setSearchOrchestrionData(e.target.value);
    }

    const handleSort = (e) => {
        setSortOrder(e.target.value);
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by name e.g. Exponential Entropy"
                    value={searchOrchestrionData}
                    onChange={handleSearch}
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="info-container">
                {filteredOrchestrionData.length > 0 ? (
                    filteredOrchestrionData.map((orchestrion) => (
                        <div className="info" key={orchestrion.id}>
                            <div className="name">
                                <h3>Name:</h3>
                                <p>{orchestrion.name}</p>
                            </div>
                            <div className="description">
                                <h3>Description</h3>
                                <p>{orchestrion.description}</p>
                            </div>
                            <div className="owned">
                                <h3>Players Owned:</h3>
                                <p>{orchestrion.owned}</p>
                            </div>
                            <div className='patch'>
                                <img 
                                    className="icon"
                                    src={orchestrion.icon}
                                    alt="Orchestrion icon" 
                                />
                                <h3>Patch Released: </h3>
                                <p>{orchestrion.patch}</p>
                            </div>
                        </div>
                    ))
                ) : (<h2>Loading...</h2>)}
            </div>
        </div>
    )
}

export default Orchestrions;
