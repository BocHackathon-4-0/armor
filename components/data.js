const data = {
    user: {
      name: "John Doe",
      accountNumber: "1234-5678-9012",
      balance: 15000.50
    },
    transactions: [
      { id: 1, type: 'debit', amount: 100.50, description: "Restaurant Payment", date: "2023-09-30" },
      { id: 2, type: 'credit', amount: 500.00, description: "Salary Deposit", date: "2023-09-28" }
    ],
    services: [
      { id: 1, name: "VC Capital Insurance", description: "Protect your VC investments with our premium insurance." },
      { id: 2, name: "Startup Insurance", description: "Insurance solutions for startup ventures to minimize risks." }
    ]
  };
  
  export default data;
  