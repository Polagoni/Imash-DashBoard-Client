"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Urgetpolicies from "../urgetPolacies"

const ClientsCustomers = () => {
  const params = useParams();
  const clientId = params.id;
  const router = useRouter();

  const [customers, setCustomers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [searchCustomers, setSearchCustomers] = useState("");

  const [showUrgentPolacies, setShowUrgentPolacies] = useState(false)
  const [urgentPoliciesCount, setUrgentCount] = useState(0)



  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/members/client/${clientId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json();
        setCustomers(data.members);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (clientId) {
      fetchCustomers();
    }
  }, [clientId]);
  const handelurgentPolicies = () => {
    setShowUrgentPolacies((prev) => !prev)
  }
  const countOfurgent = (count: any) => {
    setUrgentCount(count)
  }
  const handlePolicies = (id: string) => {
    router.push(`/policiesdashboard/${id}`);
  };

  const handleSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCustomers(e.target.value);
  };
  const searchFilters = customers.filter((item: any) =>
    item.name.toLowerCase().includes(searchCustomers.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 pt-4 rounded-[20px] bg-white shadow p-4">

      <div className="flex justify-between items-center px-6 py-3 bg-blue-300 rounded-[20px]">
        <h2 className="text-[20px] font-bold">Customer Data</h2>
        <div className="flex gap-6">

          <div className="relative inline-block">
            <button
              onClick={handelurgentPolicies}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Urgent Policies
            </button>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1  rounded-full">
              {urgentPoliciesCount}
            </span>
          </div>
          <input
            type="text"
            placeholder="Search customer..."
            value={searchCustomers}
            onChange={handleSearchCustomer}
            className="px-3 py-1 border rounded-md"
          />
        </div>

      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="max-h-[400px] overflow-y-auto border">
        <table className="w-[1000px] border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Numbers</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Renewal Date</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Dashboard</th>
            </tr>
          </thead>

          <tbody>
            {searchFilters.map((customer: any, index: number) => (
              <tr key={customer.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{customer.name}</td>
                <td className="border p-2">{customer.renewalDate}</td>
                <td className="border p-2">{customer.phone}</td>
                <td className="border p-2">{customer.status}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-gray-300 px-7 py-1 border rounded-[10px]"
                    onClick={() => handlePolicies(customer.id)}
                  >
                    Dashboard
                  </button>
                </td>
              </tr>
            ))}

            {searchFilters.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>


      <Urgetpolicies clientId={clientId} countOfurgent={countOfurgent} showUrgentPolacies={showUrgentPolacies} />



    </div>
  );
};

export default ClientsCustomers;