import styled from "styled-components";
import {
  List,
  ListItemText,
  Pagination,
  TableContainer,
  TextField,
  ToggleButtonGroup,
} from "@mui/material";

export const StyledList = styled(List)`
  max-width: 400px;
  margin: 0 auto;
`;

export const TableContainerList = styled(TableContainer)`
  width: 100%;
  max-width: 800px;
  margin-top: 3rem;
`;

export const PaginationList = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const TextFieldSearch = styled(TextField)`
  width: 4vw;
  margin-top: 2rem;
`;

export const StyledListItemText = styled(ListItemText)<{ completed: boolean }>`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

export const ToggleButtonGroupFilter = styled(ToggleButtonGroup)`
  height: 3rem;
  margin-left: 1rem;
`;
