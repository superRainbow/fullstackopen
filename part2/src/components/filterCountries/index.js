import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Header from '../header';

const Button = styled.button`
    margin-left: 20px;
`;

const Img = styled.img`
    display: ${(props) => props.isShow};
    width: 150px;
`;

const FilterCountries = () => {
  const [ Countries, setCountries ] = useState([]);
  const [ filterName, setFilterName ] = useState('');

  const getCountries = (name) => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        setCountries(response.data);
      });
  };

  const showMaxDataTip = () => {
    return <p>Too many matches,specify another filter</p>;
  };

  const showImg = (event) => {
    const id = event.target.dataset.id;
    const modifyCountries = Countries.map(Country => {
      if (Country.alpha3Code === id) {
        Country.isShowFlag = true;
      }
      return Country;
    });
    setCountries(modifyCountries);
  };

  const showList = () => {
    return <ul>{Countries.map(Country => <li key={Country.alpha3Code}>{Country.name} <Button data-id={Country.alpha3Code} onClick={showImg}>show</Button><Img isShow={Country.isShowFlag ? 'block' : 'none'} src={Country.flag} /></li>)}</ul>;
  };

  const showDetail = () => {
    return Countries.map(Country => {
      return <div key={Country.alpha3Code}>
        <h2>{Country.name}</h2>
        <p>capital {Country.capital}</p>
        <p>population {Country.population}</p>
        <h3>languages</h3>
        <ul>{Country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <Img isShow={'block'} src={Country.flag} />
        </div>
    });
  };

  const showData = () => {
    return Countries.length > 1 ? showList() : showDetail();
  };

  const handleFilterNameChange = (event) => {
    const name = event.target.value;
    name ? getCountries(name) : setCountries([]);
    setFilterName(name);
  };

  return (
    <div>
      <Header name='Find Countries' />
      <div>
        <p>filter Country Name：<input value={filterName} onChange={handleFilterNameChange} /></p>
      </div>
      <div>
        { Countries.length > 10 ? showMaxDataTip() : showData() }
      </div>
    </div>
  );
};

export default FilterCountries;
