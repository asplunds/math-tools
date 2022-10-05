import { Button, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import Spacing from "../../general/Spacing";
import classes from "./Patterns.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import parseNumber from "../../../utils/parseNumber";

type Props = {};

export default function Patterns(_props: Props) {
  const [num1, setNum1] = useState<string | number>("");
  const [num2, setNum2] = useState<string | number>("");
  const [num3, setNum3] = useState<string | number>("");

  const parsedNum1 = useMemo(() => parseNumber(num1), [num1]);
  const parsedNum2 = useMemo(() => parseNumber(num2), [num2]);
  const parsedNum3 = useMemo(() => parseNumber(num3), [num3]);

  const diff: number | null = useMemo(() => {
    const diff1 = parsedNum2 - parsedNum1;
    const diff2 = parsedNum3 - parsedNum2;
    if (diff1 !== diff2) {
      return null;
    } else {
      return diff1;
    }
  }, [num1, num2, num3]);

  const [patternShown, setPatternShown] = useState(false);

  const pattern: number[] | null = useMemo(() => {
    if (diff === null) {
      return null;
    }
    return [...Array(7)].map((_, i) => i - 2).map((i) => i * diff + parsedNum1);
  }, [diff, parsedNum1]);

  return (
    <div>
      <h1>MÖNSTER</h1>
      <Spacing space="24px" />
      <p>Utforska hur man kan hitta mönster i en talserie!</p>
      <Spacing space="12px" />
      <p>
        Notera att det finns olika typer av talföljder såsom linjära (konstant
        skillnad) och geometriska (överkurs) talföljder. Med det här verktyget
        kan du utforska linjära talföljder!
      </p>
      <Spacing space="24px" />

      <div className={classes.inputs}>
        <TextField
          value={num1}
          onChange={(e) => setNum1(e.currentTarget.value)}
          type="number"
          label="Tal #1"
        />
        <TextField
          value={num2}
          onChange={(e) => setNum2(e.currentTarget.value)}
          type="number"
          label="Tal #2"
        />
        <TextField
          value={num3}
          onChange={(e) => setNum3(e.currentTarget.value)}
          type="number"
          label="Tal #3"
        />
      </div>
      <Spacing space="24px" />
      <div className={classes.buttons}>
        <Button
          onClick={() => setPatternShown(true)}
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Hitta mönster
        </Button>
        <Button
          onClick={() => {
            setNum1("");
            setNum2("");
            setNum3("");
            setPatternShown(false);
          }}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Återställ
        </Button>
      </div>
      <Spacing space="24px" />
      {patternShown && (
        <>
          <h2>Resultat</h2>
          <Spacing space="24px" />
          <div className={classes.result}>
            {pattern ? (
              <>
                <div className={classes.output}>
                  {pattern.map((number, i, arr) => (
                    <div className={classes.item} key={number + "" + i}>
                      <TextField
                        className={i >= 2 && i <= 4 ? classes.highlighted : ""}
                        value={number}
                        inputProps={{ readOnly: true }}
                      />
                      {i !== arr.length - 1 && (
                        <>
                          <Arrow />
                          <span className={classes.legend}>{diff}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <Spacing space="150px" />
                <p>Skillnaden mellan talen är {diff}!</p>
              </>
            ) : (
              <p>
                Ojdå, jag kunde inte hitta något mönster...! Prova igen med
                andra siffror
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="none"
        stroke="#ccc"
        strokeWidth={4}
        d=" M 203 4 A 100 100 0 0 1 3 4"
      />
    </svg>
  );
}
