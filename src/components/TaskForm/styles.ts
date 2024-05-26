import { Box, Button, TextField } from "@mui/material";
import styled from "styled-components";

export const ButtonAdd = styled(Button)`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

export const Content = styled(Box)`
  display: flex;
  gap: 16px;
  max-width: 100%;
  margin-bottom: 2rem;
`;

export const TextFieldTitle = styled(TextField)`
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

export const TextFieldDescription = styled(TextField)`
  width: 100% !important;
  margin: 0 auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
