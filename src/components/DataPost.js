import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DataPost = ({ loading, item, error }) => {
    console.log(item,"item from DataPost Component")
  const [dataItem, setDataItem] = useState(item);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {
        
      }
    </>
  );
};

export default DataPost;
