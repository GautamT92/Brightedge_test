import { Chip } from "@mui/material";
import React from "react";

export default function UrlChips({ url, handleDelete }) {
  return (
    <div style={{ margin: `10px 0 0 0` }}>
      {url.map((url, idx) => {
        if (url.length > 1) {
          return (
            <Chip
              style={{ margin: `5px 0 0 5px` }}
              key={`${idx}_${url}`}
              label={url}
              onDelete={() => handleDelete(url)}
            />
          );
        }
      })}
    </div>
  );
}
