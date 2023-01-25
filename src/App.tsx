import React, { useEffect, useState } from "react";
import "./App.css";

import InputFile from "./components/atoms/InputField/InputFile";
import DenseTable from "./components/atoms/Table/Table";
import { PersonDataRecord, Result } from "./interfaces/common";
import { findLongestWorkingPairs } from "./utils/calculations";
import { parseFileData } from "./utils/format";

function App() {
  const [parsedFileData, setParsedFileData] = useState<PersonDataRecord[]>([]);
  const [pairs, setPairs] = useState<Result[] | undefined>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target!.result as string;
      const lines = csvData.split("\n");

      setParsedFileData(parseFileData(lines.slice(1, lines.length)));
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const pairData = findLongestWorkingPairs(parsedFileData);
    setPairs(pairData);
  }, [parsedFileData]);

  const columnNamesConfig = [
    { columnName: "Employee 1 ID" },
    { columnName: "Employee 2 ID" },
    { columnName: "Project ID" },
    { columnName: "Days worked" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>Employee Application</p>
        <InputFile onChange={handleFileSelect} />
        {pairs!.length > 0 ? (
          <DenseTable columnConfig={columnNamesConfig} data={pairs} />
        ) : null}
      </header>
    </div>
  );
}

export default App;
