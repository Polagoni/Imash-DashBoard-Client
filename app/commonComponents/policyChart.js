import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PolicyProgressChart = ({ currentStatus }) => {
  const chartRef = useRef();

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

  useEffect(() => {
    if (!currentStatus) return;

    const currentIndex =
      policyStatusList.indexOf(currentStatus.policyStatus) >= 0
        ? policyStatusList.indexOf(currentStatus.policyStatus) + 1
        : 0;

    const totalStages = policyStatusList.length;

    const percentage = Math.round((currentIndex / totalStages) * 100);

    const data = [
      { label: "Completed", value: currentIndex },
      { label: "Remaining", value: totalStages - currentIndex }
    ];

    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(["Completed", "Remaining"])
      .range(["#1E88E5", "#d66969"]);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

    // CENTER TEXT GROUP
    const centerText = svg
      .append("text")
      .attr("text-anchor", "middle");

    // Percentage
    centerText
      .append("tspan")
      .attr("x", 0)
      .attr("dy", "-10")
      .style("font-size", "28px")
      .style("font-weight", "bold")
      .text(`${percentage}%`);

    // Policy Status
    centerText
      .append("tspan")
      .attr("x", 0)
      .attr("dy", "20")
      .style("font-size", "13px")
      .style("font-weight", "bold")
      .text(currentStatus.policyStatus);

    // Policy Number
    centerText
      .append("tspan")
      .attr("x", 0)
      .attr("dy", "18")
      .style("font-size", "12px")
      .style("fill", "#766262")
      .text(currentStatus.policyNumber);

  }, [currentStatus]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h3 className="bg-orange-200 p-2 font-bold text-[20px] rounded-md">
        Policy Progress
      </h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default PolicyProgressChart;