// import our components
import { Table } from "./Table.js";
import { Barchart } from "./Barchart.js";
import { Count } from "./Count.js";

let table, barchart, count;

// global state
let state = {
  data: [],
  domain: [],
  selectedState: null,
  selectedMetric: null,
};

d3.csv("epi2.csv", d3.autoType).then(data => {
  console.log("data", data);
  state.data = data;
  state.domain = [
    0, 
    d3.max(data
      .map(d => [d["Air Quality"], d["Air Pollution"], d["Emissions"], d["Water and Sanitation"], d["Heavy Metals"]])
      .flat()
    )]
  init();
});

function init() {
  table = new Table(state, setGlobalState);
  barchart = new Barchart(state, setGlobalState);
  count = new Count(state, setGlobalState);
  draw();
}

function draw() {
  table.draw(state);
  barchart.draw(state, setGlobalState);
  count.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
