import styled from "styled-components";
import { List, Pagination, TableContainer } from "@mui/material";

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
