import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  th {
    min-width: 100px;
    border: 1px solid #ddd;
    padding: 8px;
    :last-child {
      border: 0px;
    }
  }
`;

const UserTable = ({ userData }) => {
  return (
    <StyledTable>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={{ width: 150 }}>Name</th>
          <th style={{ width: 250 }}>Email</th>
          <th>Gender</th>
          <th style={{ width: 250 }}>Phone</th>
          <th style={{ width: 250 }}>Team</th>
          <th>Role</th>
          <th>Location</th>
          <th>Status</th>
          <th>Picture</th>
        </tr>
      </thead>

      {userData.length > 0 ? (
        userData.map((user, index) => {
          return (
            <tbody key={index}>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ width: 150 }}>{user.name}</td>
                <td style={{ width: 250 }}>{user.email}</td>
                <td>{user.gender}</td>
                <td style={{ width: 250 }}>{user.phone}</td>
                <td title={user.teamName.description} style={{ width: 250 }}>
                  {user.teamName.name}
                </td>
                <td>{user.role}</td>
                <td>{user.location}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <img
                    src={user.picture}
                    alt="user-picture"
                    style={{ width: "32px", height: "32px", borderRadius: 100 }}
                  />
                </td>
              </tr>
            </tbody>
          );
        })
      ) : (
        <tbody>
          <tr>
            <td colSpan="9" style={{ textAlign: "center" }}>
              No users found
            </td>
          </tr>
        </tbody>
      )}
    </StyledTable>
  );
};

export default UserTable;
