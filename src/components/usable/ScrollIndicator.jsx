import { useEffect, useState } from "react";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ScrollIndicator = () => {
  const [data, setData] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Fetching data from the API
    axios.get("https://dummyjson.com/products?limit=100")
      .then(response => setData(response.data.products))
      .catch(error => console.error("Error fetching data:", error));

    // Scroll event listener
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Scroll Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
        style={{ width: `${scrollProgress}%`, zIndex: 100 }}
      ></div>

<DotLottieReact
      src="book.json"
      loop
      autoplay
    />

      {/* Content */}
      <div className="container mx-auto py-8 px-4 space-y-6 ">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Card key={index} className="shadow-lg rounded-lg border border-gray-700 bg-gray-800 transition-transform transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  {item.description || `Description for item ${index + 1}`}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-400">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default ScrollIndicator;
