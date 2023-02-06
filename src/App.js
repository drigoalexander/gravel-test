import "./index.css";
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

const PokemonDetail = ({ match, location }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${match.params.pokemonId}`)
      .then((res) => {
        setPokemon(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>{pokemon.name}</h1>
    </div>
  );
};

const App = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokemon(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      <ul className="flex items-center justify-center w-full flex-col gap-10 py-10">
        {pokemon.map((item, index) => (
          <Link
            to={`/pokemon/${item.name}`}
            className="text-center block text-blue-500"
          >
            <li
              key={item.name}
              className="flex flex-col gap-4 cursor-pointer border-[1px] rounded-xl p-6 shadow-sm hover:scale-105 duration-300 ease-in-out"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={item.name}
              />
              <p>{item.id}</p>

              {item.name}
            </li>{" "}
          </Link>
        ))}
      </ul>
    </BrowserRouter>
  );
};

export default App;
