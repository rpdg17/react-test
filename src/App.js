import React, { useEffect, useState } from 'react';
import './App.css';

import RestaurantCard from './components/RestaurantCard';

function App() {
  const [restaurantLists, setRestaurantLists] = useState([]);

  useEffect(() => {
    fetch("/api/restaurants")
      .then(res => res.json())
      .then(data => groupRestaurantsByState(data))
      .catch(error => console.error("Error: ", error));
  }, []);

  const groupRestaurantsByState = data => {
    const grouped = data.reduce((acc, restaurant) => {
      acc[restaurant.state] = acc[restaurant.state] || [];
      acc[restaurant.state].push(restaurant.restaurant_name);
      return acc;
    }, {});

    const formattedGroups = Object.keys(grouped).map(state => ({
      state,
      names: grouped[state],
    }));

    setRestaurantLists(formattedGroups);
  };

  return (
    <main className='max-w-[1200px] m-auto py-10'>
      <h1 className="font-[600] text-[30px] mb-10 text-center">List of Restaurants Categorized by States</h1>
      <section className="flex flex-wrap gap-y-10">
        {restaurantLists.map((item, index) => (
          <RestaurantCard data={item} key={index}/>
        ))}
      </section>
    </main>
  );
}

export default App;
