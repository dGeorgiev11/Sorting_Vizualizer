import { React ,useEffect,useState} from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import { makeStyles } from "@material-ui/styles";

import "./Navbar.css";

const Navbar = (props) => {
	
	const sortArrayHandler = () => {
		props.startSorting();
	};

	
	const generateNewArrayHandler = () => {
		props.generateNewArray();
	};

	
	const handleArraySizeAndSpeedChange = (event, newValue) => {
		props.handleArraySizeAndSpeedChange(newValue);
	};
	const bg={
		heading:"Визуализатор на алгоритми за сортиране",
		arrayinfo:"Размер и скорост на сортиране",
		newarr:"Създай нов масив",
		ins:"Вмъкване",
		merge: "Обединяване",
		quick:"Бързо Сортиране",
		sort:"Сортиране"
	}
	const en={
		heading:"Sorting Algorithm Visualizer",
		arrayinfo:"Array size & sorting speed",
		newarr:"Generate New Array",
		ins:"Insertion Sort",
		merge: "Merge Sort",
		quick:"Quick Sort",
		sort:"Sort"
	}
	
	const handleSortingAlgorithmChange = (event, newValue) => {
		console.log(`sorting algorithm changed to: ${newValue}`);
		props.setAlgorithm(newValue);
	};
	const handleLangChange= (event,newValue)=>{
		setLang(newValue);
	}

	const [lang,setLang] = useState(localStorage.getItem('lang'));
	useEffect(()=>{
		localStorage.setItem('lang',lang);
	}
	,[lang])
		
	const useStyles = makeStyles({
		button: {
			backgroundColor: "green",
			color: "#green",
			"&:hover": {
				color: "red",
			},
			"&:click": {
				color: "blue",
			},
		},
	});
	const classes = useStyles();

	return (
		<div id="nav-bar">
			<div id="title">
				<h1>{lang==="en"?en.heading:bg.heading}</h1>
			</div>
			<div id="toolbar">
				<ToggleButtonGroup
					value={lang}
					exclusive
					onChange={handleLangChange}
					aria-label="language selector"
				>
					<ToggleButton value="en" aria-label="en">
						English
					</ToggleButton>
					<ToggleButton value="bg" aria-label="bg">
						Български
					</ToggleButton>
				</ToggleButtonGroup>
				<div className="separator>"/>
				<div>
					<Typography gutterBottom>{lang==="en"?en.arrayinfo:bg.arrayinfo}</Typography>
					<Slider
						value={props.arraySize}
						min={5}
						step={5}
						max={100}
						onChange={handleArraySizeAndSpeedChange}
						valueLabelDisplay="auto"
						aria-labelledby="array size and sorting speed slider"
						id="non-linear-slider"
					/>
				</div>
				{/* <Divider orientation="vertical" variant="fullWidth" light="True" /> */}
				<div className="separator" />

				<Button variant="text" color="info" onClick={generateNewArrayHandler}>
					{lang==="en"?en.newarr:bg.newarr}
				</Button>

				<div className="separator" />
				<ToggleButtonGroup
					value={props.algorithm}
					exclusive
					onChange={handleSortingAlgorithmChange}
					aria-label="sorting algorithm"
				>
					<ToggleButton value="Insertion Sort" aria-label="Insertion Sort">
						{lang==="en"?en.ins:bg.ins}
					</ToggleButton>
					<ToggleButton value="Merge Sort" aria-label="Merge Sort">
						{lang==="en"?en.merge:bg.merge}
					</ToggleButton>
					<ToggleButton value="Quick Sort" aria-label="Quick Sort">
						{lang==="en"?en.quick:bg.quick}
					</ToggleButton>
				</ToggleButtonGroup>
				<div className="separator" />

				<Button variant="text" color="secondary" onClick={sortArrayHandler}>
					{lang==="en"?en.sort:bg.sort}	
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
