import React, { useState, useEffect, useCallback } from "react";
import { Grid2, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { formatCommands, formatDate } from "@/shared/helpers";
import { GRID_SIZE } from "@/shared/constants";
import { useSnackbar } from "notistack";
import { Board, Settings } from "@/features/vizualizer";

interface Position {
  x: number;
  y: number;
}

interface DataEntry {
  coordinates: string;
  optimizedCommands: string;
  commands: string;
  date: string;
}

const Visualizer: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [samplePosition, setSamplePosition] = useState<{ x: number; y: number } | null>(null);
  const [commands, setCommands] = useState<string>("");
  const [targetCommands, setTargetCommands] = useState<string>("");
  const [isStart, setIsStart] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const [isBoth, setIsBoth] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const addData = useCallback(
    (newEntry: DataEntry) => {
      const updatedData: DataEntry[] = [...data, newEntry];
      setData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
    },
    [data],
  );

  useEffect(() => {
    if (commands && isStart) {
      const executeCommands = async () => {
        let currentPosition = position;
        let hasSample = false;

        for (const command of commands) {
          await new Promise(resolve => setTimeout(resolve, speed));
          currentPosition = moveManipulator(command, currentPosition);
          setPosition(currentPosition);

          if (
            samplePosition &&
            currentPosition.x === samplePosition.x &&
            currentPosition.y === samplePosition.y
          ) {
            hasSample = true;
          }
        }

        if (hasSample) {
          enqueueSnackbar("The sample was taken with a manipulator!", { variant: "success" });
          for (const command of targetCommands) {
            await new Promise(resolve => setTimeout(resolve, speed));
            currentPosition = moveManipulator(command, currentPosition);
            setPosition(currentPosition);
            setIsBoth(true);
          }
          setSamplePosition(null);
          enqueueSnackbar("The sample was placed in the right place with the manipulator!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("The sample was not taken with the manipulator!", { variant: "error" });
        }

        console.log(samplePosition, currentPosition);

        addData({
          optimizedCommands: `${formatCommands(commands)}T${formatCommands(targetCommands)}G`,
          date: formatDate(new Date(), "DD/MM/YYYY - HH:mm"),
          coordinates: `x:${samplePosition?.x}, y:${samplePosition?.y} - x:${currentPosition.x}, y:${currentPosition.y}`,
          commands: `${commands}T${targetCommands}G`,
        });

        setIsStart(false);
      };
      executeCommands();
    }
  }, [isStart]);

  const moveManipulator = useCallback((command: string, currentPosition: Position): Position => {
    const { x, y } = currentPosition;
    switch (command) {
      case "L":
        return { x: Math.max(x - 1, 0), y };
      case "R":
        return { x: Math.min(x + 1, GRID_SIZE - 1), y };
      case "U":
        return { x, y: Math.max(y - 1, 0) };
      case "D":
        return { x, y: Math.min(y + 1, GRID_SIZE - 1) };
      default:
        return currentPosition;
    }
  }, []);

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          <Typography variant="caption" fontSize={30}>
            Manipulator Visualizer
          </Typography>

          <Board position={position} samplePosition={samplePosition} isBoth={isBoth} />
        </Grid2>
        <Grid2 size={4}>
          <Typography variant="caption" fontSize={30}>
            Manipulator Settings
          </Typography>
          <Settings
            commands={commands}
            setCommands={setCommands}
            targetCommands={targetCommands}
            setTargetCommands={setTargetCommands}
            setSamplePosition={setSamplePosition}
            speed={speed}
            setSpeed={setSpeed}
            setIsStart={setIsStart}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Visualizer;
