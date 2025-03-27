import React, { useState } from 'react';

const Winners = () => {
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: 99230041 + i,
        round1: Math.floor(Math.random() * 101),
        round2: Math.floor(Math.random() * 101),
      });
    }
    return data;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const data = generateData();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="winners-table-container">
      <h1 className='page2-title'>ALGORITHMIST 2025 RESULTS</h1>
      <h2 className="table-title">Hackathon Winners</h2>
      <table className="winners-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Winner ID</th>
            <th>Round 1 Score</th>
            <th>Round 2 Score</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{item.id}</td>
              <td>{item.round1}</td>
              <td>{item.round2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePaginationClick(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePaginationClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Winners
