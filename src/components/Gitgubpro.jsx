import {useState} from 'react'
import './index.css';

const Gitgubpro = () => {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [userData, setUserData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false); // New state for handling errors
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchUserData();
      fetchRepos();
      setSubmitted(true);
    };
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.status === 404) {
          setUserNotFound(true);
          setUserData({});
        } else {
          const data = await response.json();
          setUserData(data);
          setUserNotFound(false);
        }
      } catch (error) {
        setUserNotFound(true);
        console.error("Error fetching user data:", error);
      }
    };
  
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
  
    return (
      <div className="main-div">
        <div className="container">
          <form className="first-div" onSubmit={handleSubmit}>
            <h1>GitHub Profile Explorer</h1>
            <input
              type="text"
              placeholder="Github username"
              value={username}
              onChange={handleUsernameChange}
            />
            <br />
            <button type="submit">Pull User Data</button>
          </form>
          {submitted && userNotFound && <p className="error">User not found!</p>}
          {submitted && !userNotFound && (
            <>
              <div className="apiFetched">
                <h2>
                  {userData.name} (@<span>{userData.login}</span>)
                </h2>
                <div className="section">
                  <div className="img-1">
                    <img
                      src={userData.avatar_url}
                      alt="Profile"
                      className="img"
                    />
                  </div>
                  <div className="follow">
                    <p>Followers: {userData.followers}</p>
                  </div>
                  <div className="flg">
                    <p>Following: {userData.following}</p>
                  </div>
                  <div className="repos">
                    <p>Repos: {userData.public_repos}</p>
                  </div>
                </div>
              </div>
              <h3>Repos List</h3>
              <ul className="ul">
                {Array.isArray(repos) &&
                  repos.map((repo) => (
                    <li key={repo.id}>
                      <a href={repo.html_url} target="_blank" rel="noreferrer">
                        {repo.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
}

export default Gitgubpro
