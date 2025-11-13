import { Select, MenuItem } from "@mui/material";

const FormSelect = ({
    label,
    value,
    handleOnChange,
    title,
    menuItems,
}: any) => {
    return (
        <>
            <label
                htmlFor={label}
                className="block text-sm font-medium text-gray-700 mb-1.5"
            >
                {title}
            </label>
            <Select
                labelId={label}
                id={label}
                name={label}
                value={value}
                onChange={handleOnChange}
                displayEmpty
                fullWidth
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
            >
                {menuItems.map((item: any, index: any) => (
                    <MenuItem value={item.value} key={index}>
                        {item.title}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default FormSelect;
