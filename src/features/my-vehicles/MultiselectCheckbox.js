import React from 'react'

const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = React.useState(options);

  const toggle = index => {
    const newData = [...data];
    newData.splice(index, 1, {
      name: data[index].name,
      checked: !data[index].checked
    });
    setData(newData);
    onChange(newData.filter(x => x.checked));
  };

  return (
    <>
      {data.map((item, index) => (
        <label key={item.name}>
          <input
            readOnly
            type="checkbox"
            checked={item.checked || false}
            onClick={() => toggle(index)}
          />
          {item.name}
        </label>
      ))}
    </>
  );
};

export default MultiselectCheckbox;