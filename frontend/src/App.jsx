import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import UserTable from "./components/userTable";
import SearchInput from "./components/searchInput";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users`)
      .then((response) => {
        const fetchedUsers = response.data.data;
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/api/teams`)
          .then((teamResponse) => {
            const fetchedTeams = teamResponse.data.data;
            const usersWithTeamNames = mapTeamNamesToUsers(
              fetchedUsers,
              fetchedTeams
            );
            setUsers(usersWithTeamNames);
            setFilteredUsers(usersWithTeamNames);
          })
          .catch((error) => console.error("Error fetching teams:", error));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = users.filter((user) => {
      return (
        (lowerCaseTerm === "active" && user.isActive) ||
        (lowerCaseTerm === "inactive" && !user.isActive) ||
        lowerCaseTerm === user.gender ||
        user.name.toLowerCase().includes(lowerCaseTerm) ||
        user.email.toLowerCase().includes(lowerCaseTerm) ||
        user.role.toLowerCase().includes(lowerCaseTerm) ||
        user.teamName.name.toLowerCase().includes(lowerCaseTerm)
      );
    });
    setFilteredUsers(filtered);
  };

  const mapTeamNamesToUsers = (users, teams) => {
    return users.map((user) => {
      const teamName = teams.find((team) => team.id === user.team);
      return { ...user, teamName };
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <SearchInput onSearch={handleSearch} />
      </div>
      <UserTable userData={filteredUsers} />
    </>
  );
}

export default App;
