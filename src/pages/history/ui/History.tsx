import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  function createData(
    commands: string,
    optimizedCommands: number,
    date: number,
    coordinates: number,
  ) {
    return { commands, optimizedCommands, date, coordinates };
  }

  const rows = data.map((item: any) => {
    return createData(item.commands, item.optimizedCommands, item.date, item.coordinates);
  });

  return (
    <Container>
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align="right">Commands</TableCell>
                <TableCell align="right">Optimized Commands</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Coordinates</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={row.date} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="right">{row.commands}</TableCell>
                  <TableCell align="right">{row.optimizedCommands}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.coordinates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
