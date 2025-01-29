// FinanceRecord.js (or .jsx)
const FinanceRecord = ({ records }) => {
    return (
      <div>
        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <ul>
            {records.map((record) => (
              <li key={record._id}>
                <div>{record.description}</div>
                <div>{record.amount}</div>
                <div>{record.category}</div>
                <div>{record.type}</div>
                <div>{record.date}</div>
                <div>{record.paymentMethod}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default FinanceRecord;
  