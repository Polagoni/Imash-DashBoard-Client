"use client"
import { useState } from "react"
import PolicyProgressChart from "./policyChart"
import FallBackUi from "./fallBackUi"

type Props = {
  policySearchHandle: any
  searchPolicyNum: string
  memberName: string
  policyData: any[]
  urgentItems: any[]
  proposalItems: any[]
  renewalStats: any
  cancelledItems: any[]
  openTable: (title: string, data: any[]) => void
  tableTitle: string
  filteredData: any[] | null
  resetFilter: () => void
  displayData: any[]
  getBucketStatus: (policy: any) => string
  policyTransectio: string[]
  policyStatusList: string[]
  policyOutcome: string[]
  handelPoliciesUpadates: (e: any, policy: any, field: string) => void
  polacyChartStatus: (status: string, number: string) => void
  policyChart: any
}

const PolicyDashboardView = ({
  policySearchHandle,
  searchPolicyNum,
  memberName,
  policyData,
  urgentItems,
  proposalItems,
  renewalStats,
  cancelledItems,
  openTable,
  tableTitle,
  filteredData,
  resetFilter,
  displayData,
  getBucketStatus,
  policyTransectio,
  policyStatusList,
  policyOutcome,
  handelPoliciesUpadates,
  polacyChartStatus,
  policyChart
}: Props) => {

  // ✅ COLUMN WIDTH STATE
  const [colWidths, setColWidths] = useState<number[]>([])

  // ✅ RESIZE FUNCTION
  const handleResize = (e: React.MouseEvent, colIndex: number) => {
    e.preventDefault()

    const startX = e.clientX
    const startWidth = colWidths[colIndex] || 150

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)

      setColWidths((prev) => {
        const updated = [...prev]
        updated[colIndex] = newWidth > 80 ? newWidth : 80
        return updated
      })
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return (
    <>

      <div className="bg-blue-200 rounded-xl p-3  shadow mt-3 mr-2 min-w-[1000px]">
        <div className="flex justify-between items-center px-5 py-5">
          <h2 className="text-xl font-bold">Policies Dashboard</h2>



          <div className="flex items-center gap-3">
            <label className="font-semibold text-sm">
              Policy Number
            </label>


            <input
              type="text"
              className="border border-blue-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Policy Number"
              value={searchPolicyNum}
              onChange={policySearchHandle}
            />
          </div>
        </div>
        {/* SUMMARY CARDS */}
        <div className="flex flex-wrap gap-4 bg-white border rounded-lg p-4">

          <div className="flex flex-col border shadow-md rounded-md min-w-[200px]">
            <p className="bg-gray-200 text-center p-1 font-semibold">
              {memberName}
            </p>
            <p className="text-center text-[25px] font-bold p-1">
              {policyData.length}
            </p>
          </div>

          <div onClick={() => openTable("Urgent Policies", urgentItems)}
            className="cursor-pointer flex flex-col border border-red-400 shadow-md rounded-md min-w-[160px]">
            <p className="bg-red-400 text-white text-center py-2 font-semibold rounded-t-md">
              Urgent (15 Days)
            </p>
            <p className="text-center text-red-400 font-bold text-[20px]">
              {urgentItems.length}
            </p>
          </div>

          <div onClick={() => openTable("Proposal Policies", proposalItems)}
            className="cursor-pointer flex flex-col border border-orange-300 shadow-md rounded-md min-w-[160px]">
            <p className="bg-orange-300 text-white text-center py-2 font-semibold rounded-t-md">
              Proposal Stage
            </p>
            <p className="text-center text-orange-400 font-bold text-[20px]">
              {proposalItems.length}
            </p>
          </div>

          <div onClick={() => openTable("Renewal Completed", renewalStats.completedItems)}
            className="cursor-pointer flex flex-col border border-green-300 shadow-md rounded-md min-w-[160px]">
            <p className="bg-green-400 text-white text-center py-2 font-semibold rounded-t-md">
              Renewal Completed
            </p>
            <p className="text-center text-green-400 font-bold text-[20px]">
              {renewalStats.completedCount}
            </p>
          </div>

          <div onClick={() => openTable("Renewal Pending", renewalStats.pendingItems)}
            className="cursor-pointer flex flex-col border border-gray-300 shadow-md rounded-md min-w-[160px]">
            <p className="bg-gray-400 text-white text-center py-2 font-semibold rounded-t-md">
              Renewal Pending
            </p>
            <p className="text-center text-gray-400 font-bold text-[20px]">
              {renewalStats.pendingCount}
            </p>
          </div>

          <div onClick={() => openTable("Cancelled Policies", cancelledItems)}
            className="cursor-pointer flex flex-col border border-blue-300 shadow-md rounded-md min-w-[160px]">
            <p className="bg-blue-400 text-white text-center py-2 font-semibold rounded-t-md">
              Cancelled
            </p>
            <p className="text-center text-blue-400 font-bold text-[20px]">
              {cancelledItems.length}
            </p>
          </div>

        </div>

        {/* TABLE */}
        <div className="p-3 bg-white mt-2 rounded-md w-full overflow-x-auto overflow-y-auto max-h-[500px] rounded-lg border">

          <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-[20px] text-orange-400">
              {tableTitle || "Policies List"}
            </h1>

            {filteredData && (
              <button
                onClick={resetFilter}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                All policies
              </button>
            )}
          </div>

          <div className="w-full overflow-x-auto rounded-lg border">
            <table className="min-w-full border-collapse text-sm table-fixed">

              <thead className="bg-red-100 text-gray-700">
                <tr>
                  {[
                    "No",
                    "Policy Number",
                    "Coverage",
                    "Effective Date",
                    "Expiry Date",
                    "Bucket",
                    "Transaction",
                    "Policy Status",
                    "Policy Out"
                  ].map((title, index) => (
                    <th
                      key={index}
                      style={{ width: colWidths[index] || 150 }}
                      className="relative border px-3 py-2 text-left"
                    >
                      {title}
                      <div
                        onMouseDown={(e) => handleResize(e, index)}
                        className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-blue-500"
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {displayData.length > 0 ? (<>
                  {displayData.map((policy, index) => (
                    <tr key={policy.id} className="hover:bg-gray-100 even:bg-gray-50">
                      <td style={{ width: colWidths[0] || 150 }} className="border px-3 py-2">{index + 1}</td>
                      <td style={{ width: colWidths[1] || 150 }} className="border px-3 py-2">{policy.policyNumber}</td>
                      <td style={{ width: colWidths[2] || 150 }} className="border px-3 py-2">{policy.coverageType}</td>
                      <td style={{ width: colWidths[3] || 150 }} className="border px-3 py-2">{policy.effectiveDate || "-"}</td>
                      <td style={{ width: colWidths[4] || 150 }} className="border px-3 py-2">{policy.expiryDate || "-"}</td>
                      <td style={{ width: colWidths[5] || 150 }} className="border px-3 py-2">{getBucketStatus(policy)}</td>

                      <td style={{ width: colWidths[6] || 150 }} className="border px-3 py-2">
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={policy.transactionType || ""}
                          onChange={(e) =>
                            handelPoliciesUpadates(e, policy, "transactionType")
                          }
                        >
                          <option value="">Select</option>
                          {policyTransectio.map((item, i) => (
                            <option key={i}>{item}</option>
                          ))}
                        </select>
                      </td>

                      <td style={{ width: colWidths[7] || 150 }} className="flex justify-centr items-center gap-2 border px-3 py-2 space-y-1">
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={policy.policyStatus || ""}
                          onChange={(e) =>
                            handelPoliciesUpadates(e, policy, "policyStatus")
                          }
                        >
                          <option value="">Select</option>
                          {policyStatusList.map((item, i) => (
                            <option key={i}>{item}</option>
                          ))}
                        </select>

                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                          onClick={() =>
                            polacyChartStatus(
                              policy.policyStatus,
                              policy.policyNumber
                            )
                          }
                        >
                          Chart
                        </button>
                      </td>

                      <td style={{ width: colWidths[8] || 150 }} className="border px-3 py-2">
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={policy.policyOutcome || ""}
                          onChange={(e) =>
                            handelPoliciesUpadates(e, policy, "policyOutcome")
                          }
                        >
                          <option value="">Select</option>
                          {policyOutcome.map((item, i) => (
                            <option key={i}>{item}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </>) :
                  <tr>
                    <td colSpan={9} className="h-[300px]">
                      <div className="flex justify-center items-center h-full">
                        <FallBackUi title="Data Not Available " />
                      </div>
                    </td>
                  </tr>
                }

              </tbody>
            </table>
          </div>
          {policyChart.policyNumber && (<div className="bg-white mt-5 rounded-md py-5">
            <div className="flex justify-center ">
              <PolicyProgressChart currentStatus={policyChart} />
            </div>
          </div>)

          }
        </div>
      </div>
    </>
  )
}

export default PolicyDashboardView