"use client"
import { useEffect, useState } from "react"

const Urgetpolicies = ({ clientId, countOfurgent, showUrgentPolacies }) => {

    const [allClientsData, setAllClientsData] = useState([])
    console.log("allClientsData",allClientsData)
    useEffect(() => {

        const allCustmersDataPolacies = async () => {
            try {

                const response = await fetch(
                    `http://localhost:5000/members/client/all/${clientId}`,
                    { credentials: "include" }
                )

                const data = await response.json()

                const filteredData = (data.data || []).filter(Boolean)

                setAllClientsData(filteredData)

            } catch (error) {
                console.error(error)
            }
        }

        if (clientId) {
            allCustmersDataPolacies()
        }

    }, [clientId])

    useEffect(() => {
        countOfurgent(allClientsData.length)
    }, [allClientsData])

    if (!showUrgentPolacies) return null
    return (
        <>
            {allClientsData.map((items, index) => (
                <div key={index}>
                    {items.memberName} - {items.expiryDate} - {items.policyNumber}
                </div>
            ))}
        </>
    )
}

export default Urgetpolicies