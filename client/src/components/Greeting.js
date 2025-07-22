// src/components/Greeting.js
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning!";
      } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon!";
      } else if (currentHour >= 17 && currentHour < 21) {
        return "Good Evening!";
      } else {
        return "Good Night!";
      }
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <div className="greeting-container">

        <div className="greeting-box">
        {greeting}
        </div>
    </div>
    
  );
};

export default Greeting;
