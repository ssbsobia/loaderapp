import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Dropdown from "./components/dropDowns1";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1> Weather DropDowns</h1>
        </header>
        <div className="App-body">
          <Dropdown />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
