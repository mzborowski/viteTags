import React from "react";
import TagSelector from "./components/TagSelector/TagSelector";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

const theme = createTheme();

//test

function App() {
	const availableTags = ["React", "Angular", "JavaScript", "CSS", "HTML"];

	const tagsWithCounts = availableTags.map((tag) => {
		const count = Math.floor(Math.random() * 40) + 1;
		return { tag, count };
	});

	return (
		<ThemeProvider theme={theme}>
			<TagSelector availableTags={tagsWithCounts} />
		</ThemeProvider>
	);
}

export default App;
