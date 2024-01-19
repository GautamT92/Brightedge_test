import React, { useRef } from "react";
import { Button, TextField } from "@mui/material";
import _ from "lodash";
export default function Filters({ url, setUrl, tableData, fetchData }) {
  const textFieldRef = useRef();
  return (
    <>
      <TextField
        inputRef={textFieldRef}
        id="outlined-basic"
        label="URLs"
        variant="outlined"
        placeholder="enter urls"
      />
      <Button
        variant="contained"
        onClick={() => {
          setUrl((prev) => _.uniq([...prev, textFieldRef.current.value]));
          textFieldRef.current.value = null;
        }}
        style={{ margin: `0px 0 0 11px`, height: 55, fontSize: 40 }}
      >
        +
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          fetchData(textFieldRef.current.value);
        }}
        style={{ margin: `0 0 0 5px`, height: 55 }}
      >
        FETCH CONFIG DATA
      </Button>
    </>
  );
}
