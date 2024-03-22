import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [seletedBtn, setSeletedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch the data");
      }
    };
    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading the data...</div>;

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      filteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSeletedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSeletedBtn(type)
  };

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="logo.svg" alt="Logo Image" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={()=>filterFood('all')}>All</Button>
          <Button onClick={()=>filterFood('breakfast')}>Breakfast</Button>
          <Button onClick={()=>filterFood('lunch')}>Lunch</Button>
          <Button onClick={()=>filterFood('dinner')}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData}></SearchResult>
    </>
  );
};

export default App;

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 12px;
  justify-content: center;
  padding-bottom: 40px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }
`;
