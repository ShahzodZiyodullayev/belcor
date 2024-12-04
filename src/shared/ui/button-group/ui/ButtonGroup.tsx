import { createElement, Dispatch, SetStateAction } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CustomButtonGroupProps {
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setCommands: Dispatch<SetStateAction<string>>;
  getValues: (key: string) => string;
  setValue: (key: string, value: string) => void;
  commandType: string;
}

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  setIsFocused,
  setCommands,
  getValues,
  setValue,
  commandType,
}) => {
  const handleCommandInsertion =
    (
      isFocusedSetter: Dispatch<SetStateAction<boolean>>,
      commandKey: string,
      command: string,
      setStateFunction: Dispatch<SetStateAction<string>>,
    ) =>
    () => {
      isFocusedSetter(true);
      const prevVal = getValues(commandKey);
      setValue(commandKey, `${prevVal}${command}`);
      setStateFunction(`${prevVal}${command}`);
    };

  return (
    <ButtonGroup variant="contained" fullWidth aria-label="Basic button group">
      {[
        { valueKey: "L", icon: ArrowLeftIcon },
        { valueKey: "R", icon: ArrowRightIcon },
        { valueKey: "U", icon: ArrowDropUpIcon },
        { valueKey: "D", icon: ArrowDropDownIcon },
      ].map(({ valueKey, icon }) => (
        <Button
          key={valueKey}
          onClick={handleCommandInsertion(setIsFocused, commandType, valueKey, setCommands)}
          startIcon={createElement(icon)}>
          {valueKey}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default CustomButtonGroup;
