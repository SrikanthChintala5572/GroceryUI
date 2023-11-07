import React, { useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import LineChart from './Chart';
import Spinner from './Spinner';
import './App.css';

const Main = () => {
  const [grocery, setGroceryValues] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedGroceryName, setSelectedGroceryName] = React.useState('');
  const [date, setDate] = React.useState([]);
  const [price, setPrice] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = grocery.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getGrocery = () => {
    axios
      .get('/itemNames')
      .then((res) => {
        setGroceryValues(res.data);
      })
      .catch((err) => {
        return null;
      });
  };
  React.useEffect(() => {
    getGrocery();
  }, []);
  const handleSelect = (option) => {
    setSearchQuery('');
    setSelectedGroceryName(option);
    setLoading(true);
    const params = {
      itemName: option
    };
    axios
      .get('/item/name', { params })
      .then((res) => {
        let dateArray = [];
        let priceArray = []
        dateArray = res.data.map((element) => {
          return element.date
        });
        priceArray = res.data.map((element) => {
          return element.price
        });
        setDate(dateArray);
        setPrice(priceArray);
        
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        return null;
      });
  };
  
  return (
    <div>
      <div className='main'>
        <Dropdown onSelect={handleSelect}>
          <span>
            <h4>Please select a value from below dropdown to view the trend:</h4></span>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedGroceryName ? selectedGroceryName : 'Select an Option'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <input
              type="text"
              placeholder="Search..."
              className="form-control mb-2"
              onChange={e => setSearchQuery(e.target.value)}
            />
            {filteredItems.map(option => (
              <Dropdown.Item key={option.id} eventKey={option} active={option === selectedGroceryName}>
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div>
          <h4>Price vs Year Chart for: <span style={{ color: "blue" }}>{selectedGroceryName}</span></h4>
          {loading &&    <Spinner />}
          <div className='chart'>
            <LineChart price={price} date={date}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;