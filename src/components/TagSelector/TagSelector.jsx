import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	Chip,
	Box,
	Typography,
	Checkbox,
	Button,
	FormControlLabel,
	InputAdornment,
	Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RectangleIcon from "@mui/icons-material/Rectangle";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { CustomTextField, SelectedTagsContainer } from "./styled";
import Colors from "../../colors/colors";

const TagSelector = ({ availableTags }) => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [checkedTags, setCheckedTags] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);

	const containerRef = useRef(null);

	const handleCheckboxChange = (tag) => {
		if (checkedTags.includes(tag)) {
			setCheckedTags(checkedTags.filter((t) => t !== tag));
		} else {
			setCheckedTags([...checkedTags, tag]);
		}
	};

	const handleSave = () => {
		const newTags = checkedTags.filter((tag) => !selectedTags.includes(tag));
		setSelectedTags([...selectedTags, ...newTags]);
		setCheckedTags([]);
		setSearchTerm("");
		setIsSearchActive(false);
	};

	const filteredTags = availableTags.filter(({ tag }) =>
		tag.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleClearSearch = () => {
		setSearchTerm("");
		setIsSearchActive(false);
	};

	const getCircles = () => {
		const totalCircles = 5;
		const filledCircles = Math.min(selectedTags.length, totalCircles);
		const circleColor = selectedTags.length >= 3 ? Colors.green : Colors.red;
		const initialColor = Colors.gray;

		return (
			<Box display="flex" gap={0.5}>
				{[...Array(totalCircles)].map((_, i) => (
					<RectangleIcon
						key={i}
						style={{
							color: i < filledCircles ? circleColor : initialColor,
							fontSize: "small",
						}}
					/>
				))}
			</Box>
		);
	};

	const handleClose = () => {
		setIsSearchActive(false);
	};

	const handleClickOutside = (event) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setIsSearchActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<Box
			width={300}
			padding={2}
			border={`1px solid ${Colors.lightGray}`}
			borderRadius={2}
			ref={containerRef}
		>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h6" component="div">
					Tagi
				</Typography>
				<CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
			</Box>
			<CustomTextField
				variant="outlined"
				placeholder="Wyszukaj grupę lub tag"
				value={searchTerm}
				onChange={handleInputChange}
				onFocus={() => setIsSearchActive(true)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
					endAdornment: searchTerm && (
						<InputAdornment position="end">
							<Button onClick={handleClearSearch}>X</Button>
						</InputAdornment>
					),
				}}
				fullWidth
				margin="normal"
			/>
			{isSearchActive ? (
				<Box>
					<Box>
						{filteredTags.map(({ tag, count }) => (
							<Box
								key={tag}
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								border={
									checkedTags.includes(tag)
										? `2px solid ${Colors.blueBorder}`
										: `2px solid transparent`
								}
								borderRadius={1}
								padding="2px"
								marginBottom={1}
								style={{ transition: "border 0.3s ease" }}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={checkedTags.includes(tag)}
											onChange={() => handleCheckboxChange(tag)}
										/>
									}
									label={tag}
									style={{ marginRight: "auto" }}
								/>
								<Typography
									variant="caption"
									color="textSecondary"
									style={{ marginLeft: "auto" }}
								>
									+{count}
								</Typography>
							</Box>
						))}
					</Box>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSave}
						fullWidth
					>
						Zapisz
					</Button>
				</Box>
			) : (
				<Box>
					<SelectedTagsContainer>
						{selectedTags.map((tag) => (
							<Chip
								key={tag}
								label={tag}
								onDelete={() =>
									setSelectedTags(selectedTags.filter((t) => t !== tag))
								}
								deleteIcon={<CloseIcon />}
								style={{
									background: Colors.white,
									border: `1px solid ${Colors.lightGray}`,
									margin: "2px",
								}}
							/>
						))}
					</SelectedTagsContainer>
					<Divider style={{ margin: "16px 0" }} />
					<Box
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
						gap={2}
					>
						<Typography color={Colors.lightGray}>
							<AutoAwesomeOutlinedIcon style={{ marginRight: 10 }} />
							CMS AI
						</Typography>
						<Typography>
							<AutoAwesomeOutlinedIcon
								style={{ marginRight: 10, color: Colors.violet }}
							/>
							Analizuj tekst
						</Typography>
						<Typography display="flex" alignItems="center">
							<SellOutlinedIcon
								style={{
									transform: "rotate(90deg)",
									marginRight: 8,
									color: Colors.violet,
								}}
							/>
							Najbardziej popularne tagi
						</Typography>
					</Box>
					<Divider style={{ margin: "16px 0" }} />
					<Box
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
						gap={1}
					>
						<Box
							display="flex"
							flexDirection="row-reverse"
							justifyContent="flex-end"
							gap={1}
						>
							<Box display="flex" alignItems="center">
								{getCircles()}
							</Box>
							<Typography
								color={selectedTags.length >= 3 ? Colors.green : Colors.red}
							>
								{selectedTags.length >= 3 ? "Dobrze" : "Słabo"}
							</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<InfoIcon style={{ color: Colors.gray, marginRight: 8 }} />
							<Typography
								variant="caption"
								color={Colors.gray}
								style={{ textAlign: "left" }}
							>
								{selectedTags.length >= 3
									? " Artykuł ma wystarczającą liczbę tagów."
									: "Zbyt mało tagów. Dodaj jeszcze 2 aby poprawić widoczność artykułu."}
							</Typography>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

TagSelector.propTypes = {
	availableTags: PropTypes.arrayOf(
		PropTypes.shape({
			tag: PropTypes.string.isRequired,
			count: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default TagSelector;
