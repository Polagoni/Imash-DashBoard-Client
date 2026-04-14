 const PolicyStageChart =({ currentStatus })=> {

  const currentIndex = policyStatusList.indexOf(currentStatus);

  const data = {
    labels: policyStatusList,
    datasets: [
      {
        data: policyStatusList.map(() => 1),
        backgroundColor: policyStatusList.map((_, index) =>
          index <= currentIndex ? "green" : "red"
        ),
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "450px" }}>
      <h3>Policy Stage Progress</h3>
      <Pie data={data} />
    </div>
  );
}
export default PolicyStageChart