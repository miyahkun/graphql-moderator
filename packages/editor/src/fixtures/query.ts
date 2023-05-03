export type GraphQLNodeType = "Type" | "Interface" | "Enums";
export type GraphQLPrimitiveType = "string" | "number" | "boolean";
export type GraphQLType = GraphQLPrimitiveType | GraphQLNodeType;

export type GraphQLNodeField = {
  type: GraphQLType;
  name: string;
};

export type QueryDatum = {
  type: GraphQLNodeType;
  header: {
    title: string;
  };
  fields: GraphQLNodeField[];
};

export type NumberNode = Required<
  Pick<d3.SimulationNodeDatum, "x" | "y" | "vx" | "vy">
> & {
  id: string;
  width: number;
  height: number;
  parserField: QueryDatum[];
};

export const queryFixture: NumberNode[] = [
  {
    id: "1",
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    width: 100,
    height: 100,
    parserField: [
      {
        type: "Type",
        header: {
          title: "User",
        },
        fields: [
          {
            name: "firstName",
            type: "string",
          },
          {
            name: "lastName",
            type: "string",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    x: 300,
    y: 100,
    vx: 0,
    vy: 0,
    width: 100,
    height: 100,
    parserField: [
      {
        type: "Type",
        header: {
          title: "Product",
        },
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "color",
            type: "string",
          },
        ],
      },
    ],
  },
];
