import { FC } from "react";
import { IInputFile } from "./InputFile.types";

const InputFile: FC<IInputFile> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
};

export default InputFile;
