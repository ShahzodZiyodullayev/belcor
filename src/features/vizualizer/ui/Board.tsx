import { Grid2 } from "@mui/material";
import { GRID_SIZE } from "@/shared/constants";
import Box from "@mui/material/Box";
import { FC } from "react";

const GRID_CELL_STYLE = {
  minWidth: 20,
  minHeight: 40,
  maxHeight: 60,
};

interface Position {
  x: number;
  y: number;
}

interface BoardProps {
  position: Position;
  samplePosition: Position | null;
  isBoth: boolean;
}

const Board: FC<BoardProps> = ({ position, samplePosition, isBoth }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2
        container
        sx={{
          maxWidth: 400,
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}>
        {Array.from({ length: GRID_SIZE ** 2 }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);

          const isManipulator = position.x === x && position.y === y;
          const isSample = samplePosition?.x === x && samplePosition?.y === y;

          return (
            <Grid2
              size={12 / GRID_SIZE}
              key={idx}
              sx={{
                ...GRID_CELL_STYLE,
                backgroundColor:
                  isManipulator && isSample
                    ? "purple"
                    : isManipulator && isBoth
                      ? "purple"
                      : isManipulator
                        ? "red"
                        : isSample && isBoth
                          ? "white"
                          : isSample
                            ? "blue"
                            : "white",
              }}
              minHeight={60}
            />
          );
        })}
      </Grid2>
    </Box>
  );
};

export default Board;
