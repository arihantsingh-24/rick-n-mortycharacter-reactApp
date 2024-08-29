import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Card from "./Card/Card";
import Search from "./Search";
import Pagination from "./Pagination";
import Filter from "./Filter/Filter";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import Navbar from "./Navbar";
import CardDetails from "./Card/CardDetails";

const Home = () => {
  const [character, updateCharacter] = useState({ info: {}, results: [] });
  const { info, results } = character;
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateCharacter(data);
    })();
  }, [pageNumber, search, status, gender, species]);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
      <div className="container">
        <div className="row">
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" result={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/location" element={<Location />} />
          <Route path="/:id" element={<CardDetails />} />
          <Route path="/episodes/:id" element={<CardDetails />} />
          <Route path="/location/:id" element={<CardDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
