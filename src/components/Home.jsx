const Home = ({title}) => {
    return (
        <div className="home-container">
            <div>
                <h1>{title}</h1>
                <p>Welcome, this is a project to practice using APIs</p>
                <img src={`${process.env.PUBLIC_URL}/images/ff14-heavensward-concept-art.jpg`} 
                    alt="concept art from heavensward expansion" 
                />
                <img src={`${process.env.PUBLIC_URL}/images/ff14-heavensward-concept-art2.jpg`}
                    alt="concept art from heavensward expansion" 
                />
                <img src={`${process.env.PUBLIC_URL}/images/ff14-shadowbringers-art.jpg`}
                    alt="art from shadowbringers expansion" 
                />
            </div>
        </div>
    );
}

export default Home;
