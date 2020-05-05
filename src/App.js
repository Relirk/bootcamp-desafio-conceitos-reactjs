import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories");
      const { data } = response;
      setRepositories(data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositório: ${Date.now()}`,
      url: "http://teste-criado",
      techs: ["teste"],
    });
    const { data } = response;

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
