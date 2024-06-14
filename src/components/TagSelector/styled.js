import styled from "styled-components";
import { TextField } from "@mui/material";

export const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const TagItem = styled.div`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  display: flex;
  align-items: center;
`;

export const RemoveButton = styled.button`
  margin-left: 5px;
  cursor: pointer;
`;

export const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding-right: 8px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiInputAdornment-root {
    margin-right: 8px;
  }
`;
