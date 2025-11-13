import React, { forwardRef } from "react";
import {
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface FormInputProps {
    id: string;
    label: string;
    name: string;
    value: string | null;
    type?: string;
    onChange: any;
    showPassword?: boolean;
    onClickShowPassword?: () => void;
    onMouseDownPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUpPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            name,
            value,
            onChange,
            type = "text",
            showPassword,
            onClickShowPassword,
            onMouseDownPassword,
            onMouseUpPassword,
        },
        ref,
    ) => {
        return (
            <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "20px" }}
            >
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                </label>
                {type === "password" ? (
                    <OutlinedInput
                        id={id}
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        type={showPassword ? "text" : "password"}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={onClickShowPassword}
                                    onMouseDown={onMouseDownPassword}
                                    onMouseUp={onMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "&:hover": {
                                borderColor: "#9ca3af",
                            },
                            "&.Mui-focused": {
                                borderColor: "#2563eb",
                                borderWidth: "2px",
                                boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                            },
                        }}
                    />
                ) : (
                    <OutlinedInput
                        id={id}
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        type={type}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        inputRef={ref}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "&:hover": {
                                borderColor: "#9ca3af",
                            },
                            "&.Mui-focused": {
                                borderColor: "#2563eb",
                                borderWidth: "2px",
                                boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                            },
                        }}
                    />
                )}
            </FormControl>
        );
    },
);

export default FormInput;
