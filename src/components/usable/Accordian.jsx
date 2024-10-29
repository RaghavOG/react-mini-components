import { useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure you have installed shadcn components

const Accordion = () => {
  const accordionList = [
    {
      id: 1,
      title: 'Section 1',
      content: 'This is the content of section 1.',
    },
    {
      id: 2,
      title: 'Section 2',
      content: 'This is the content of section 2.',
    },
    {
      id: 3,
      title: 'Section 3',
      content: 'This is the content of section 3.',
    },
  ];

  const [selected, setSelected] = useState(null);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelect = (id) => {
    setSelected(selected === id ? null : id);
  };

  const hadleMultiSelect = () => {
    setEnableMultiSelect(!enableMultiSelect);
    setMultiple([]);
  }

  const handleMultipleSelect = (id) => {
    if (multiple.includes(id)) {
      setMultiple(multiple.filter((item) => item !== id));
    } else {
      setMultiple([...multiple, id]);
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 opacity-20 blur-3xl"></div>
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg relative z-10 bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">Modern Accordion</h2>
        
        <Button
          variant={enableMultiSelect ? "destructive" : "default"}
          onClick={hadleMultiSelect}
          className="mb-4 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:to-purple-500"
        >
          {enableMultiSelect ? "Disable MultiSelection" : "Enable MultiSelection"}
        </Button>
        
        {accordionList && accordionList.length > 0 ? (
          accordionList.map((item) => (
            <div className="border-b border-gray-700 last:border-b-0 p-4" key={item.id}>
              <Button
                variant="outline"
                onClick={enableMultiSelect ? 
                  () => handleMultipleSelect(item.id): 
                  () => handleSingleSelect(item.id)}
                className="w-full text-left py-3 flex justify-between items-center  hover:bg-purple-300 rounded-lg"
              >
                <span className="text-lg font-semibold">{item.title}</span>
                <span className={`transition-transform ${selected === item.id ? 'rotate-45' : ''}`}>
                  {/* SVG icon instead of + */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </Button>
              {enableMultiSelect ? (
                multiple.includes(item.id) && (
                  <div className="py-2 pl-4 text-gray-400 transition-all duration-300">
                    <p>{item.content}</p>
                  </div>
                )
              ) : (
                selected === item.id && (
                  <div className="py-2 pl-4 text-gray-400 transition-all duration-300">
                    <p>{item.content}</p>
                  </div>
                )
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No data found</p>
        )}
      </div>
    </div>
  );
};

export default Accordion;
