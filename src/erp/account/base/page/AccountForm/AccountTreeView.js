//********************************** 2020-08-26 정대현 추가 **********************************
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../reducer/BaseReducer";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    flexGrow: 2,
    maxWidth: 250,
  },
});

let treeData = {
  accountLevel: "",
  accountName: "",
  accountCode: "",
  accountCharacter: "",
  accountInnerCode: "",
  parentAccountInnerCode: "",
  accountDivision: "",
  groupCode: "",
  editable: "",
  leaf: "",
};

const AccountTreeview = ({ setAccountInfo, setAccountName }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.SEARCH_ACCOUNT_REQUEST });
  }, []);

  const data = useSelector(({ AccReducer }) => AccReducer.BaseReducer.accountList, []);
  const classes = useStyles();

  data.filter((element, index) => {
    let innerData = {
      ...treeData,
    };

    if (
      element.accountName === "특수계정과목" ||
      element.accountName === "사용자설정계정과목" ||
      element.leaf === "1"
    ) {
      return false;
    }
    if (element.accountLevel === "0") {
      treeData.accountLevel = element.accountLevel;
      treeData.accountName = element.accountName;
      treeData.accountCode = element.accountCode;
      treeData.accountCharacter = element.accountCharacter;
      treeData.accountInnerCode = element.accountInnerCode;
      treeData.parentAccountInnerCode = element.parentAccountInnerCode;
      treeData.accountDivision = element.accountDivision;
      treeData.groupCode = element.groupCode;
      treeData.editable = element.editable;
      treeData.leaf = element.leaf;
      treeData.children = [];
    } else {
      innerData.accountLevel = element.accountLevel;
      innerData.accountName = element.accountName;
      innerData.accountCode = element.accountCode;
      innerData.accountCharacter = element.accountCharacter;
      innerData.accountInnerCode = element.accountInnerCode;
      innerData.parentAccountInnerCode = element.parentAccountInnerCode;
      innerData.accountDivision = element.accountDivision;
      innerData.groupCode = element.groupCode;
      innerData.editable = element.editable;
      innerData.leaf = element.leaf;
    }

    if (element.leaf !== "1") {
      innerData.children = [];
    }

    if (element.accountLevel === "1") {
      treeData.children.push(innerData);
    } else if (element.accountLevel === "2" || element.accountLevel === "3") {
      treeData.children.map(e => {
        if (e.accountInnerCode === element.parentAccountInnerCode) {
          e.children.push(innerData);
        } else {
          e.children.map(ele => {
            if (ele.accountInnerCode === element.parentAccountInnerCode) {
              ele.children.push(innerData);
            }
          });
        }
      });
    }
  });

  const renderTree = node => (
    <TreeItem
      key={node.accountInnerCode}
      nodeId={node.accountInnerCode}
      label={node.accountName}
    >
      {Array.isArray(node.children)
        ? node.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );

  let accArr = [];

  const onSelect = (event, value) => {
    let arr = value.split("-");
    let firstV = arr[0];
    let secondV = arr[1];
    let cal = secondV - firstV;
    let aName = "";
    if (cal < 100) {
      data.filter((element, index) => {
        if (
          element.accountInnerCode === value &&
          (element.accountLevel === "3" || element.accountLevel === "2")
        ) {
          aName = element.accountName;
        }
        if (
          element.leaf !== "1" ||
          element.accountName === "사용자설정계정과목"
        ) {
          return false;
        }
        if (element.parentAccountInnerCode === value) {
          let accountInfo = {};
          accountInfo.accountInnerCode = element.accountInnerCode;
          accountInfo.parentAccountInnerCode = element.parentAccountInnerCode;
          accountInfo.accountCode = element.accountCode;
          accountInfo.accountName = element.accountName;
          accountInfo.accountCharacter = element.accountCharacter;
          accountInfo.accountDivision = element.accountDivision;
          accountInfo.groupCode = element.groupCode;
          accountInfo.editable = element.editable;
          accArr.push(accountInfo);
        }
      });
    }
    setAccountName(aName);
    setAccountInfo(accArr);
  };

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={onSelect}
      >
        {renderTree(treeData)}
      </TreeView>
    </>
  );
};

export default AccountTreeview;
