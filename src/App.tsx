import React from "react";
import Container from "./components/Container";
import Form from "./components/Form";
import Table from "./components/Table";
import CustomContextProvider from "./provider";

function App() {
  return (
    <CustomContextProvider>
      <Container>
        <Form />
        <Table />
      </Container>
    </CustomContextProvider>
  );
}

export default App;
