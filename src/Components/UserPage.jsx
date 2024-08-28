import React, { useState, useEffect } from 'react';

// EmployeeTable Component
const EmployeeTable = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterGender, setFilterGender] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://mock-server-app-4.onrender.com/employees')
            .then((response) => response.json())
            .then((data) => setEmployeeData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const useSearch = (data, query) => {
        return data.filter(
            (employee) =>
                employee.first_name.toLowerCase().includes(query.toLowerCase()) ||
                employee.last_name.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Sorting function
    const handleSort = () => {
        const sortedData = [...employeeData].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.salary - b.salary;
            } else {
                return b.salary - a.salary;
            }
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setEmployeeData(sortedData);
    };

    // Filter function
    const handleFilter = (gender) => {
        setFilterGender(gender);
    };

    // Handle employee delete
    const handleDelete = (id) => {
        const updatedData = employeeData.filter((employee) => employee.id !== id);
        setEmployeeData(updatedData);
    };

    // Apply filter, search, and sort
    let filteredData = employeeData;
    if (filterGender) {
        filteredData = filteredData.filter((employee) => employee.gender === filterGender);
    }
    filteredData = useSearch(filteredData, searchQuery);

    return (
        <div>
            <h1 style={{color:"#ec1818"}}>Employee Table</h1>

            {/* Filter Section */}
            <div>
                <label>Filter by Gender: </label>
                <select onChange={(e) => handleFilter(e.target.value)} value={filterGender}>
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            {/* Search Section */}
            <div>
                <label>Search by Name: </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Table Section */}
            <table border="2" style={{ margin:'auto',width:"75%"}}>
                <thead style={{color:"#1f9e16"}}> 
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>
                            Gender
                        </th>
                        <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                            Salary {sortOrder === 'asc' ? '▲' : '▼'}
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td> {employee.first_name}
                            </td>
                            <td> {employee.last_name}
                            </td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
