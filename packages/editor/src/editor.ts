import * as d3 from "d3";
import { NumberNode, queryFixture } from "./fixtures/query";
import { EDITOR_WIDTH, EDITOR_HEIGHT } from "./constants";

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

  const queries = d3
    .select("svg")
    .selectAll("rect")
    .data<NumberNode>(queryFixture)
    .enter()
    .append("rect")
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    .attr("class", "node")
    .attr("stroke", "white");

  const simulation = d3
    .forceSimulation<NumberNode>(queryFixture)
    .force(
      "link",
      d3.forceLink().id((d) => (d as NumberNode).id)
    )
    .force(
      "collide",
      d3
        .forceCollide()
        .radius((d) => (d as NumberNode).width / 2)
        .strength(0.02)
        .iterations(16)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force(
      "x",
      d3
        .forceX()
        .strength(0.02)
        .x(EDITOR_WIDTH / 2)
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.02)
        .y(EDITOR_HEIGHT / 2)
    );

  const ticked = () => {
    queries.attr("x", (d) => d.x).attr("y", (d) => d.y);
  };

  simulation.on("tick", ticked);
};
