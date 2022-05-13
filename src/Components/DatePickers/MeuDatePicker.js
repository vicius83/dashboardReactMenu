import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import BrLocale from 'date-fns/locale/pt-BR'
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function MeuDatePicker(props) {
  //convert to different event parameter
  const { name, label, value, onChange, erro, help, variant, disabled } = props;

  const convertParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={BrLocale}>
      <DatePicker
        autoOk
        variant="inline"
        inputVariant={variant}
        size="small"
        format="dd/MM/yyyy"
        disableFuture
        value={value}
        name={name}
        label={label}
        required
        disabled={disabled}
        views={["year", "month", "date"]}
        openTo="year"
        onChange={(date) => onChange(convertParam(name, date))}
        error={erro}
        helperText={erro ? help : null}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}