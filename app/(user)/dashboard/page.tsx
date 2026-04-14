"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Clients from "../../commonComponents/clients"
const Dashboard = () => {
  const [clientData, setClientData] = useState([]);
  const [showSlide, setShowSlide] = useState(false)

  useEffect(() => {
    const clientFetch = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clients", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("hello", data)
          setClientData(data.clients);
        }

      } catch (error) {
        console.log("Error fetching clients:", error);
      }
    };

    clientFetch();
  }, []);

  const router = useRouter()
  
  const closeSlide = () => {
    setShowSlide((prev) => !prev)
  }

  const handelCustmers = (id:any)=>{
    router.push(`customers/${id}`)
  }

  return (

       <>
      <div className="flex flex-col gap-5 pt-4 rounded-[20px] bg-white-800 shadow p-4">
        <div className="flex justify-between items-center px-6 py-3 bg-blue-300 rounded-[20px] " >
          <h2 className=" text-[20px] font-bold">Clients Data</h2>
          <div>
            <button className="bg-orange-200 py-1 px-3 rounded-[10px]" onClick={closeSlide}>

              Add Client
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto border">
          <table className="w-[1000px] pt-6 border border-gray-300 overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Numbers</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">City</th>
                <th className="border p-2">State</th>
                <th className="border p-2">
                  Members
                </th>
              </tr>
            </thead>

            <tbody className="" >
              {clientData?.map((client: any,index) => (
                <tr key={client.id}>
                  <td className="border p-2"><div className="flex justify-center items-center">
                    {client.id}
                  </div></td>
                  <td className="border p-2">{client.name}</td>
                  <td className="border p-2">{client.city}</td>
                  <td className="border p-2">{client.state}</td>
                  <td className="border p-2 ">
                    <div className="flex justify-center items-center ">
                      <button className="bg-gray-300 px-7 py-1 border rounded-[10px]" onClick={()=>handelCustmers(client.id)}>
                        Custmers
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div

        >
          {/* <Clients showSlide={showSlide} closeSlide={closeSlide} /> */}
        </div>
      </div>
     </>

  );
};

export default Dashboard;
