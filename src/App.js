import "./App.css";
import Bar from "./components/bar/Bar";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { useState, useEffect } from "react";
import InsertionSort from "./algorithms/InsertionSort/InsertionSort";
import MergeSort from "./algorithms/MergeSort/MergeSort";
import QuickSort from "./algorithms/QuickSort/QuickSort";

const App = () => {
	
	const [array, setArray] = useState([]);
	const [arraySteps, setArraySteps] = useState([]);
	const [colorSteps, setColorSteps] = useState([]);
	const [arraySize, setArraySize] = useState(50);
	const [currentStep, setCurrentStep] = useState(0);
	const [delay, setDelay] = useState(50);
	const [algorithm, setAlgorithm] = useState("Merge Sort");
	const [timeouts, setTimeouts] = useState([]);
	const [startGeneratingSteps, setStartGeneratingSteps] = useState(false);

	
	const generateRandomArray = () => {
		let randomArray = [];
		for (let i = 0; i < arraySize; i++) {
			randomArray.push(Math.floor(Math.random() * 100) + 10);
		}
		return randomArray;
	};

	
	
	const clearKey = () => {
		let blankKey = new Array(arraySize).fill(0);
		setColorSteps([blankKey]);
	};

	
	
	const generateSteps = () => {
		console.log(`generating steps`);
		let arr = [...array];
		let steps = [array.slice()];
		let clrSteps = [...colorSteps];
		sort(arr, steps, clrSteps);
		setArraySteps(steps);
		setColorSteps(clrSteps);
		setStartGeneratingSteps(false); 
	};

	
	const sort = (array, arraySteps, colorSteps) => {
		
		
		
		switch (algorithm) {
			case "Merge Sort":
				MergeSort(array, arraySteps, colorSteps);
				break;
			case "Quick Sort":
				QuickSort(array, arraySteps, colorSteps);
				break;
			case "Insertion Sort":
				InsertionSort(array, arraySteps, colorSteps);
				break;
			default:
				console.error("Invalid algorithm selected!");
		}
	};
	
	
	const getDelay = (arraySize) => {
		return Math.floor(1000 / arraySize);
	};

	
	const initialize = () => {
		const newArray = generateRandomArray();
		setArray(newArray);
		setArraySteps([newArray]);
		setCurrentStep(0);
		setDelay(getDelay(arraySize));
		clearKey();
		clearTimeouts();
		setStartGeneratingSteps(true); 
	};

	const initialize_with_current_array = () => {
		const arrayCopy = array.slice();
		setArraySteps([arrayCopy]);
		setCurrentStep(0);
		setDelay(getDelay(arraySize));
		clearKey();
		clearTimeouts();
		setStartGeneratingSteps(true); 

		
		
		
		
		
		
		
	};

	
	const handleArraySizeAndSpeedChange = (newArraySize) => {
		const newDelay = getDelay(newArraySize);
		setArraySize(newArraySize);
		setDelay(newDelay);
	};

	
	const clearTimeouts = () => {
		timeouts.forEach((timeout) => clearTimeout(timeout));
		setTimeouts([]);
		console.log(`Timeouts cleared...`);
	};

	
	const startSorting = () => {
		let timeoutsArray = [];
		let currStep = currentStep;
		
		if (currentStep == arraySteps.length - 1) {
			return false;
		}
		for (let i = 0; i < arraySteps.length; i++) {
			let timeout = setTimeout(() => {
				setArray([...arraySteps[i]]);
				setCurrentStep(currStep++);
			}, delay * (i + 1));
			timeoutsArray.push(timeout);
		}
		console.log(`setting tiemeoutout`);
		setTimeouts(timeoutsArray);
	};

	
	
	const getBarWidth = () => {
		return Math.floor(500 / arraySize);
	};

	
	const bars = array.map((number, index) => {
		return (
			<Bar
				key={index}
				index={index}
				length={number}
				width={getBarWidth()}
				color={colorSteps[currentStep][index]}
			/>
		);
	});

	const pause = () => {
		const pausedStep = currentStep;
		clearTimeouts();
		setCurrentStep(pausedStep);
		setArray(arraySteps[pausedStep]);
	};

	
	useEffect(() => {
		initialize();
	}, [arraySize]);

	
	useEffect(() => {
		if (startGeneratingSteps) {
			generateSteps();
		}
	}, [startGeneratingSteps]);

	
	useEffect(() => {
		initialize_with_current_array();
	}, [algorithm]);

	return (
		<div className="App">
			<Navbar
				startSorting={startSorting}
				currentStep={currentStep}
				generateNewArray={initialize}
				handleArraySizeAndSpeedChange={handleArraySizeAndSpeedChange}
				arraySize={arraySize}
				algorithm={algorithm}
				setAlgorithm={setAlgorithm}
				setStartGeneratingSteps={setStartGeneratingSteps}
			/>
			<div className="array-display">{bars}</div>
			<Footer />
		</div>
	);
};

export default App;
