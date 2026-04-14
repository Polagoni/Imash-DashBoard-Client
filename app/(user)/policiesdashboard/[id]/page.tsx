"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import PolicyProgressChart from "../../../commonComponents/policyChart"
import DashBoardTable from "../../../commonComponents/dashboardTable"

type Policy = {
  policyStatus: string
  id: number
  policyNumber: string
  coverageType: string
  effectiveDate: string
  bucket: string
  transactionType: string
  nextAction: string
  expiryDate?: string
  policyOutcome?: string
}

const policyStatusList = [
  "Application",
  "Exposure Review/Values review",
  "Loss Runs/Loss Summary",
  "Submission",
  "Re-Marketing",
  "Quote/ Quote Comparison",
  "Proposal",
  "Customer Confirmation",
  "Binding",
  "Invoice",
  "Policy Issued",
  "Policy Check",
  "Certificates",
  "Endorsements",
  "Cancelled",
  "Reinstated",
  "Rewritten"
];
const policyTransectio = [
  "NEW_BUSINESS",
  "RENEWAL"
]
const policyOutcome = ["PENDING",
  "COMPLETED",
  "CANCELLED"]


const PolaciesDashBoard = () => {
  const params = useParams()
  const memberId = params?.id as string

  const [policyData, setPolicyData] = useState<Policy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [memberName, setMemberName] = useState("")

  const [filteredData, setFilteredData] = useState<Policy[] | null>(null)
  const [tableTitle, setTableTitle] = useState("")
  const [searchPolicyNum, setSearchPolicyNum] = useState("")
  const [policyChart, setPolicyChart] = useState({
    policyStatus: "",
    policyNumber: ""
  });


  useEffect(() => {
    if (!memberId) return

    const fetchPolicyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/policies/${memberId}`,
          { credentials: "include" }
        )

        if (!response.ok) throw new Error("Failed to fetch")

        const result = await response.json()
        setPolicyData(result.policies || [])
        setMemberName(result.memberName || "")
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchPolicyData()
  }, [memberId])

  const policySearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPolicyNum(e.target.value)
  }

  const today = new Date()

  /* =============================
     ✅ ADDED BUCKET LOGIC
     ============================= */

  const getBucketStatus = (policy: Policy) => {
    if (!policy.expiryDate) return "-"
    console.log("expiry Date", policy.policyOutcome)
    const expiry = new Date(policy.expiryDate)
    if (isNaN(expiry.getTime())) return "-"

    const diffDays = Math.ceil(
      (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    )

    if (policy.policyOutcome?.toLowerCase() === ("CANCELLED").toLowerCase()) {
      return "Cancelled"
    }

    if (diffDays >= 90 && diffDays <= 120) return "Planning"
    if (diffDays >= 60 && diffDays <= 89) return "Exposure Review"
    if (diffDays >= 30 && diffDays <= 59) return "Submission"
    if (diffDays >= 15 && diffDays <= 29) return "Proposal"
    if (diffDays >= 0 && diffDays <= 14) return "Binding"
    if (diffDays < 0) return "Expired"
    return "Active"
  }







  /* =============================
     🔹 YOUR ORIGINAL LOGIC
     ============================= */

  const urgentItems = policyData.filter((item) => {
    if (!item.expiryDate) return false
    const diffDays =
      (new Date(item.expiryDate).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    return diffDays >= 1 && diffDays <= 15
  })

  const proposalItems = policyData.filter((item) => {
    if (!item.expiryDate) return false
    const diffDays =
      (new Date(item.expiryDate).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    return diffDays >= 16 && diffDays <= 30
  })

  const renewalStats = policyData.reduce(
    (acc, item) => {
      if (!item.expiryDate) return acc

      const expiryDateVal = new Date(item.expiryDate)
      if (isNaN(expiryDateVal.getTime())) return acc

      const diffDays = Math.ceil(
        (expiryDateVal.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      )

      if (diffDays <= 90) {
        acc.pendingCount++
        acc.pendingItems.push(item)
      } else {
        acc.completedCount++
        acc.completedItems.push(item)
      }

      return acc
    },
    {
      pendingCount: 0,
      completedCount: 0,
      pendingItems: [] as Policy[],
      completedItems: [] as Policy[],
    }
  )

  const polacyBucket = policyData.filter((item) => {
    if (!item.expiryDate) return false
    const diffDate = (new Date(item.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diffDate >= 30 && diffDate <= 90
  })

  const cancelledItems = policyData.filter(
    (item) => item.policyOutcome?.toLowerCase() === "cancelled"
  )

  const openTable = (title: string, data: Policy[]) => {
    setTableTitle(title)
    setFilteredData(data)
  }



  const resetFilter = () => {
    setFilteredData(null)
    setTableTitle("")
  }

  const searchFilteredData = policyData.filter((item) =>
    item.policyNumber
      .toLowerCase()
      .includes(searchPolicyNum.toLowerCase())
  )

  const displayData =
    searchPolicyNum.trim() !== ""
      ? searchFilteredData
      : filteredData ?? policyData
  console.log("displayData", displayData)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>


  const handleUpdate = async (
    id: number,
    field: string,
    value: string
  ) => {

    setPolicyData((prev) =>
      prev.map((policy) =>
        policy.id === id
          ? { ...policy, [field]: value }
          : policy
      )
    )

    try {

      const response = await fetch(
        `http://localhost:5000/api/policy/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            [field]: value
          }),
        }
      )

      const data = await response.json()

      if (!data.success) {
        console.error("Update failed")
      }

    } catch (error) {

      console.error("Update error:", error)

    }

  }
  let handelPoliciesUpadates = (e: any, policy: any, field: string) =>
    handleUpdate(
      policy.id,
      field,
      e.target.value
    )


  const polacyChartStatus = (policyStatus: string, policyNumber: string) => {
    setPolicyChart((prev) => ({
      ...prev,
      policyStatus: policyStatus,
      policyNumber: policyNumber
    }));
  };

  return (
    <>
      <DashBoardTable
        policySearchHandle={policySearchHandle}
        searchPolicyNum={searchPolicyNum}
        memberName={memberName}
        policyData={policyData}
        urgentItems={urgentItems}
        proposalItems={proposalItems}
        renewalStats={renewalStats}
        cancelledItems={cancelledItems}
        openTable={openTable}
        tableTitle={tableTitle}
        filteredData={filteredData}
        resetFilter={resetFilter}
        displayData={displayData}
        getBucketStatus={getBucketStatus}
        policyTransectio={policyTransectio}
        policyStatusList={policyStatusList}
        policyOutcome={policyOutcome}
        handelPoliciesUpadates={handelPoliciesUpadates}
        polacyChartStatus={polacyChartStatus}
        policyChart={policyChart}
      />
    </>
  )
}

export default PolaciesDashBoard


