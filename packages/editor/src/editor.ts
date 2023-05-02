import * as d3 from "d3";

type Content = {
  name: string;
};

type Node = {
  id: string;
  x: number;
  y: number;
  r: number;
  content: Content;
};

// const link = d3
//   .select("svg")
//   .selectAll("path")
//   .data(links)
//   .enter()
//   .append("line")
//   .attr("stroke-width", 1)
//   .attr("stroke", "black");

export const render = () => {
  const rootNode: Node = {
    id: "root",
    x: 300,
    y: 300,
    r: 20,
    content: {
      name: "Root",
    },
  };

  const links = [];

  const root = d3
    .select("svg")
    .selectAll("circle.rootNode")
    .data<Node>([rootNode])
    .enter()
    .append("circle")
    .attr("class", "rootNode")
    .attr("r", (d) => d.r)
    .attr("fill", "pink")
    .attr("stroke-width", 1)
    .attr("stroke", "red");

  console.log("root", root);
};
