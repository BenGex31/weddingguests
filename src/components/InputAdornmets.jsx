import React from "react";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function InputAdornments({
  id,
  type,
  value,
  onChange,
  onClick,
  onMouseDown,
  visibility,
}) {
  return (
    <div>
      <FormControl variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
        <OutlinedInput
          fullWidth
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={onClick} // handleClickShowPassword
                onMouseDown={onMouseDown} // handleMouseDownPassword
                edge='end'
              >
                {visibility ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  );
}
