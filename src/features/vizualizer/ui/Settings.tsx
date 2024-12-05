import {
  Button,
  List,
  ListItemText,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatCommands } from "@/shared/helpers";
import CustomButtonGroup from "@/shared/ui/button-group/ui/ButtonGroup.tsx";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

interface Position {
  x: number;
  y: number;
}

interface SettingsProps {
  commands: string;
  setCommands: Dispatch<SetStateAction<string>>;
  targetCommands: string;
  setTargetCommands: Dispatch<SetStateAction<string>>;
  setSamplePosition: Dispatch<SetStateAction<Position | null>>;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  setIsStart: Dispatch<SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({
  commands,
  setCommands,
  targetCommands,
  setTargetCommands,
  setSamplePosition,
  speed,
  setSpeed,
  setIsStart,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = (e: any) => e.stopPropagation();

  return (
    <Stack
      component="form"
      direction="column"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}>
      <Typography variant="body2" textAlign="left">
        {formatCommands(commands) || "There is no command"}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        my={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Tooltip
          title={
            <List>
              <ListItemText>RRDDD</ListItemText>
            </List>
          }>
          <InfoIcon />
        </Tooltip>
        <TextField
          fullWidth
          size="small"
          type="search"
          label="Commands to Reach Sample"
          variant="outlined"
          focused={isFocused}
          id="outlined-basic"
          error={!!errors.commands}
          placeholder="Commands (L, R, U, D)"
          {...register("commands", {
            required: "Commands are required",
            pattern: {
              value: /^[LRUD]*$/i,
              message: "Only L, R, U, D letters are allowed",
            },
          })}
          onChange={e => {
            const newValue = e.target.value.toUpperCase();
            setValue("commands", newValue);
            setCommands(newValue);
            trigger("commands");
          }}
          helperText={errors.commands?.message as string}
        />
      </Stack>
      <CustomButtonGroup
        setIsFocused={setIsFocused}
        setCommands={setCommands}
        getValues={getValues}
        setValue={setValue}
        commandType="commands"
      />
      <Typography variant="body2" textAlign="left" my={1}>
        {formatCommands(targetCommands) || "There is no command"}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        my={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Tooltip
          title={
            <List>
              <ListItemText>RRRUU</ListItemText>
            </List>
          }>
          <InfoIcon />
        </Tooltip>
        <TextField
          fullWidth
          size="small"
          type="search"
          label="Commands to Move Sample"
          variant="outlined"
          id="target-commands"
          focused={isFocused2}
          error={!!errors.targetCommands}
          placeholder="Target Commands (L, R, U, D)"
          {...register("targetCommands", {
            required: "Target commands are required",
            pattern: {
              value: /^[LRUD]*$/i,
              message: "Only L, R, U, D letters are allowed",
            },
          })}
          onChange={e => {
            const newValue = e.target.value.toUpperCase();
            setValue("targetCommands", newValue);
            setTargetCommands(newValue);
            trigger("targetCommands");
          }}
          helperText={errors.targetCommands?.message as string}
        />
      </Stack>
      <CustomButtonGroup
        setIsFocused={setIsFocused2}
        setCommands={setTargetCommands}
        getValues={getValues}
        setValue={setValue}
        commandType="targetCommands"
      />
      <Stack
        direction="row"
        spacing={1}
        my={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Tooltip
          title={
            <List>
              <ListItemText>2,3</ListItemText>
            </List>
          }>
          <InfoIcon />
        </Tooltip>
        <TextField
          fullWidth
          size="small"
          type="text"
          label="Sample Position (x,y)"
          variant="outlined"
          id="sample-position"
          error={!!errors.samplePosition}
          placeholder="Example: 2,3"
          {...register("samplePosition", {
            required: "Sample position is required",
            pattern: {
              value: /^\d+,\d+$/,
              message: "Please enter valid coordinates in x, y format",
            },
          })}
          onChange={e => {
            const newValue = e.target.value;
            const [x, y] = newValue.split(",").map(Number);
            if (!isNaN(x) && !isNaN(y)) {
              setSamplePosition({ x, y });
            }
            trigger("samplePosition");
          }}
          helperText={errors.samplePosition?.message as string}
        />
      </Stack>
      <Slider
        marks
        min={100}
        step={100}
        max={1000}
        value={speed}
        valueLabelDisplay="auto"
        aria-label="Speed"
        onChange={(_e: Event, value) => setSpeed(value as number)}
      />
      <Typography variant="body2" textAlign="center" my={1}>
        {speed} ms
      </Typography>
      <Button
        type="submit"
        fullWidth
        size="medium"
        variant="contained"
        onClick={() => setIsStart(prev => !prev)}>
        Start
      </Button>
    </Stack>
  );
};

export default Settings;
