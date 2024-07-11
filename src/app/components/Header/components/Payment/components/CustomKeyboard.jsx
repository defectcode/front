import React from 'react';

const CustomKeyboard = ({ onKeyPress }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', '←'
  ];

  return (
    <div className="custom-keyboard">
      {keys.map((key) => (
        <button
          key={key}
          className="custom-keyboard-key"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </button>
      ))}
      <style jsx>{`
        .custom-keyboard {
          display: flex;
          flex-wrap: wrap;
          max-width: 300px;
          margin: 0 auto;
          padding: 10px;
          background: #333;
          border-radius: 10px;
        }
        .custom-keyboard-key {
          flex: 1 1 30%;
          margin: 5px;
          padding: 15px;
          background: #444;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1.2em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CustomKeyboard;
