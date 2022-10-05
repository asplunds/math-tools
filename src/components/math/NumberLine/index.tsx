import { TextField } from "@mui/material";
import { Slider } from "@mui/material";
import React, { useMemo, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import clamp from "../../../utils/clamp";
import parseNumber from "../../../utils/parseNumber";
import Spacing from "../../general/Spacing";
import classes from "./NumberLine.module.scss";

type Props = {};

export default function NumberLine({}: Props) {
  return (
    <div>
      <h1>TALLINJER</h1>
      <Spacing space="24px" />
      <Standard />
    </div>
  );
}

function Standard() {
  const maxValue = 1e4;
  const [min, setMin] = useLocalStorage<string | number>(
    0,
    "numberLine:standard:minValue"
  );
  const [max, setMax] = useLocalStorage<string | number>(
    100,
    "numberLine:standard:maxValue"
  );
  const [resolution, setResolution] = useLocalStorage<string | number>(
    5,
    "numberLine:standard:resolution"
  );
  const [slider, setSlider] = useState(
    clamp(
      parseNumber(min),
      (parseNumber(max) - parseNumber(min)) / 2,
      parseNumber(max)
    )
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSlider(newValue as number);
  };

  const marks = useMemo(
    () =>
      [
        ...Array(
          Math.ceil(
            parseNumber(
              Math.abs(parseNumber(min) - parseNumber(max)) /
                parseNumber(resolution)
            )
          ) + 1 || 1
        ),
      ].map((_, i) => {
        const v = parseNumber(min) + i * parseNumber(resolution);
        return {
          value: v,
          label: v + "",
        };
      }),
    [min, max, resolution]
  );

  return (
    <div>
      <div className={classes.flex}>
        <TextField
          type="number"
          label="Startvärde"
          value={min}
          onChange={(e) => setMin(e.currentTarget.value)}
        />
        <Slider
          aria-label="Tallinje"
          value={clamp(parseNumber(min), slider, parseNumber(max))}
          getAriaValueText={(v) => v + ""}
          onChange={handleChange}
          valueLabelDisplay="on"
          step={clamp(
            1,
            parseNumber(resolution),
            Math.min(maxValue, parseNumber(max) || maxValue)
          )}
          marks={marks}
          min={parseNumber(min)}
          max={parseNumber(max)}
        />
        <TextField
          type="number"
          label="Slutvärde"
          value={max}
          onChange={(e) => setMax(e.currentTarget.value)}
        />
      </div>
      <Spacing space="24px" />
      <TextField
        type="number"
        label="Upplösning (steg)"
        value={resolution}
        onChange={(e) => setResolution(e.currentTarget.value)}
      />
    </div>
  );
}
