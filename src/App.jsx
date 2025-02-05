import "./App.scss";
import MapComponent from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import queries from "./components/Navigation/queries";
import { useState, createContext, useEffect } from "react";
import fetchTurnoverData from "./functions/fetchTurnoverData";
import ColorBox from "./components/ColorBox/ColorBox";

export const QueriesContext = createContext();

function App() {
  const initialIndicator = "ბრუნვა";
  const initialIndicatorYear = 2022;

  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [regData, setRegData] = useState(null);
  const [munData, setMunData] = useState(null);
  const [indicator, setIndicator] = useState(initialIndicator);
  const [indicatorYear, setIndicatorYear] = useState(initialIndicatorYear);

  const handleSelectQuery = (el) => {
    setSelectedQuery(el);
  };

  const handleSelectLink = (el) => {
    setSelectedLink(el);
  };

  const closeSidebar = () => {
    setSelectedLink(null);
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchTurnoverData("Reg", 2022); // Call the utility function
      if (fetchedData) {
        setRegData(fetchedData); // Set the fetched data to state
      }
    };

    const getMunData = async () => {
      const fetchedData = await fetchTurnoverData("Mun", 2022); // Call the utility function
      if (fetchedData) {
        setMunData(fetchedData);
      }
    };

    getMunData();
    getData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <QueriesContext.Provider
      value={{
        selectedQuery,
        selectedLink,
        indicator,
        indicatorYear,
        closeSidebar,
        regData,
        munData,
        setRegData,
        setMunData,
        setIndicator,
        setIndicatorYear,
        handleSelectLink,
        handleSelectQuery,
      }}>
      <div className="app-container">
        <Navigation />
        <div className="map-container">
          <MapComponent />
        </div>
        <ColorBox />
      </div>
    </QueriesContext.Provider>
  );
}

export default App;
