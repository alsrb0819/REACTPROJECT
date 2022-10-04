import React, { useState } from "react";
import NonCurrentAssetRegister from "./NonCurrentAssetRegister";
import NonCurrentAssetDetail from "./NonCurrentAssetDetail";
import { Typography } from "@material-ui/core";

//****************************2020-11-25 박미노****************************************** */

const NonCurrentAsset = () => {
  const [nonCurrentAsst, setNonCurrentAsst] = React.useState([]);
  const [visibleState, setVisibleState] = useState(true);
  console.log("nonCurrentAsst", nonCurrentAsst);
  return (
    <>
      <Typography variant="h3" gutterBottom>
        고정자산등록
      </Typography>
      <NonCurrentAssetRegister
        setNonCurrentAsst={setNonCurrentAsst}
        setVisibleState={setVisibleState}
      />
      <NonCurrentAssetDetail
        nonCurrentAsst={nonCurrentAsst}
        visibleState={visibleState}
        setVisibleState={setVisibleState}
      />
    </>
  );
};

export default NonCurrentAsset;
