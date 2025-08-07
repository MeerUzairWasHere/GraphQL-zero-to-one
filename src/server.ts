import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./schema";
import { root } from "./resolvers";
import { Context } from "./types";

const app = express();
app.use(cors());

// Initial data
const context: Context = {
  todos: [
    { id: "1", title: "Learn GraphQL", completed: false },
    { id: "2", title: "Build a Todo App", completed: false },
  ],
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    context: context,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
