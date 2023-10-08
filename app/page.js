import LiveChat from "@/components/LiveChat";
import data from "@/components/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* User Details */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <p><strong>Name:</strong> {data.user.name}</p>
        <p><strong>Account Number:</strong> {data.user.accountNumber}</p>
        <p><strong>Balance:</strong> ${data.user.balance.toFixed(2)}</p>
      </section>

      {/* Transactions */}
      <section className="mb-10 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>{txn.type}</td>
                <td>${txn.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Bank Services */}
      <section className="mb-10 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Our Services</h2>
        {data.services.map(service => (
          <div key={service.id} className="border p-4 mb-4">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
      <LiveChat />
    </main>
  )
}
