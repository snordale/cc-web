import React, { InputHTMLAttributes } from "react";

import { TextField as MuiTextField } from "@mui/material";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string | undefined;
	value: any;
	error: boolean | undefined;
	helperText: string | undefined;
	size: "small" | "medium" | undefined;
	readOnly: boolean | undefined;
	onChance: () => void | undefined;
};

export const TextField: React.FC<any> = (props) => {
	return (
		<MuiTextField
			//name={name && "usernameOrEmail"}
			//label={label && "Username or email"}
			//value={value}
			//onChange={onChange}
			//error={error}
			//helperText={helperText}
			//size={size}
			//type={type}
			//InputProps={{
			//	readOnly,
			//}}
			{...props}
		/>
	);
};
