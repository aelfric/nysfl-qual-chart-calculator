import "./App.css";
import React from "react";

const halfQualsChart = [
  { start: 3, end: 5, description: "1 half qual", calc: () => 1 },
  { start: 6, end: 10, description: "2 half quals", calc: () => 2 },
  { start: 11, end: 15, description: "3 half quals", calc: () => 3 },
  { start: 16, end: 20, description: "4 half quals", calc: () => 4 },
  { start: 21, end: 25, description: "5 half quals", calc: () => 5 },
  { start: 26, end: 30, description: "6 half quals", calc: () => 6 },
  {
    start: 31,
    description: "one half qual for every 10 speakers",
    calc: (i) => 6 + Math.ceil((i - 30) / 10),
  },
];

const fullQualsChart = [
  { start: 1, end: 3, description: "1 full qual", calc: () => 1 },
  { start: 4, end: 6, description: "2 full quals", calc: () => 2 },
  { start: 7, end: 10, description: "3 full quals", calc: () => 3 },
  { start: 11, end: 14, description: "4 full quals", calc: () => 4 },
  { start: 15, end: 20, description: "5 full quals", calc: () => 5 },
  { start: 21, end: 25, description: "6 full quals", calc: () => 6 },
  { start: 26, end: 30, description: "6 full quals", calc: () => 7 },
  {
    start: 31,
    description: "one full qual for every 10 speakers",
    calc: (i) => 6 + Math.ceil((i - 30) / 10),
  },
];

function Chart({ data, label, heading }) {
  const [number, setNumber] = React.useState(0);

  const quals = data
    .filter((item) => number >= item.start && (number <= item.end || !item.end))
    .map((item) => item.calc(number))[0];

  const rows = data.map((item) => (
    <tr
      key={item.start}
      className={
        number >= item.start && (number <= item.end || !item.end)
          ? "selected"
          : ""
      }
    >
      <td>{item.start}</td>
      <td>{item.end || "∞"}</td>
      <td>{item.description}</td>
    </tr>
  ));

  return (
    <>
    <h2>{heading}</h2>
      <input
        type="number"
        value={number}
        onChange={(evt) => setNumber(evt.target.value)}
      ></input>{" "}
      <span>{label}: {quals}</span>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Speakers</th>
            <th>Number of Quals.</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

function App() {
  return <div className="App">
    <Chart 
    heading={"At a regular tournament"}
    data={halfQualsChart} 
    label={"Half Quals"} />
    <hr />
    <Chart 
    heading={"At the NYSFL-sponsored Regional Qualifier"}
    data={fullQualsChart} 
    label={"Full Quals"}/>
  </div>;
}

export default App;
