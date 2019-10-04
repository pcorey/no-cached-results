import React from "react";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { client } from "./apolloClient";
import { useQuery } from "react-apollo";
import { useState } from "react";

const query = gql`
  query search($search: Int!) {
    search(search: $search) @client
  }
`;

const FromCache = ({ search }) => {
  let { data, loading, error } = useQuery(query, {
    variables: { search },
    fetchPolicy: "cache-only"
  });
  return (
    <>
      <p>
        <strong>cache-only:</strong>
      </p>
      <pre style={{ padding: "1em", backgroundColor: "#f8f8f8" }}>
        {JSON.stringify({ data, loading, error }, null, 2)}
      </pre>
    </>
  );
};

const NotFromCache = ({ search }) => {
  let { data, loading, error } = useQuery(query, {
    variables: { search }
  });
  return (
    <>
      <p style={{ marginTop: "4em" }}>
        <strong>not cache-only:</strong>
      </p>
      <pre style={{ padding: "1em", backgroundColor: "#f8f8f8" }}>
        {JSON.stringify({ data, loading, error }, null, 2)}
      </pre>
    </>
  );
};

const Main = () => {
  let [search, setSearch] = useState(0);
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <div style={{ flex: "1" }}>
        <h1>Cache-only results bug</h1>
        <ol>
          <li>
            There are two components on this page. Both run a query that returns
            one of two values, based on the argument provided. One component
            runs the query with a <code>fetchPolicy</code> of{" "}
            <code>"cache-only"</code>. The other doesn't specify a fetch policy.
          </li>
          <li>
            The first query returns the result <code>"hello"</code>. Notice that
            both the cache-only and the non-cached queries get the correct
            results.
          </li>
          <li>
            Click the "Second query" button. This query should return{" "}
            <code>"goodbye"</code>. Notice that the cache-only query (sometimes)
            gets the correct result, but the non-cached query seems to get stuck
            with <code>loading: true</code>.
          </li>
          <li>
            Click the "Third query" button. This query should also return{" "}
            <code>"goodbye"</code>. Notice the cache-only query gets{" "}
            <em>nothing at all</em>, and the non-cached query gets the correct
            result.
          </li>
          <li>
            Click back to the second query. Both components get the correct
            result.
          </li>
          <li>
            Click back to the third query. Both components get the correct
            result.
          </li>
        </ol>
      </div>
      <div style={{ flex: "1", margin: "2em" }}>
        <FromCache search={search} />
        <NotFromCache search={search} />
        <button onClick={() => setSearch(0)}>First query</button>
        <button onClick={() => setSearch(1)}>Second query</button>
        <button onClick={() => setSearch(2)}>Third query</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
