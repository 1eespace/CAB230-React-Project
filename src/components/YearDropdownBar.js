// import React, { useState } from "react";
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

// const YearDropdownBar = ({ setDropdownItem, selectedYear }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggle = () => setDropdownOpen(prevState => !prevState);

//   const handleSelect = (year) => {
//     setDropdownItem(year);

//   };

//   const years = [
//     "2023",
//     "2022",
//     "2021",
//     "2020",
//     "2019",
//     "2018",
//     "2017",
//     "2016",
//     "2015",
//     "2014",
//     "2013",
//     "2012",
//     "2011",
//     "2010",
//     "2009",
//     "2008",
//     "2007",
//     "2006",
//     "2005",
//     "2004",
//     "2003",
//     "2002",
//     "2001",
//     "2000",
//     "1999",
//     "1998",
//     "1997",
//     "1996",
//     "1995",
//     "1994",
//     "1993",
//     "1992",
//     "1991",
//     "1990",
   
//   ];

//   return (
//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>{selectedYear ? `Year: ${selectedYear}` : "Select Year"}</DropdownToggle>
//       <DropdownMenu>
//         {years.map(year => (
//           <DropdownItem key={year} onClick={() => handleSelect(year)}>
//             {year}
//           </DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default YearDropdownBar;

import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const YearDropdownBar = ({ setDropdownItem, selectedYear }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleSelect = (year) => {
    setDropdownItem(year);
    setDropdownOpen(false); // Close the dropdown after a selection is made
  };

  const categories = [
    {
      name: "Recent Years",
      options: ["2023", "2022", "2021", "2020", "2019", "2018"]
    },
    {
      name: "Previous Years",
      options: ["2017", "2016", "2015", "2014", "2013", "2012"]
    },
    {
      name: "Older Years",
      options: ["2011", "2010", "2009", "2008", "2007", "2006", "2005"]
    },
    {
      name: "Vintage Years",
      options: ["2004", "2003", "2002", "2001", "2000", "1999", "1998"]
    },
    {
      name: "Historic Years",
      options: ["1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"]
    },
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {selectedYear ? `Year: ${selectedYear}` : "Select Year"}
      </DropdownToggle>
      <DropdownMenu onBlur={toggle}>
        <DropdownItem header>Year Categories</DropdownItem>
        {categories.map((category) => (
          <DropdownItem
            key={category.name}
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.name}
          </DropdownItem>
        ))}
        {selectedCategory && (
          <>
            <DropdownItem divider />
            <DropdownItem header>{selectedCategory}</DropdownItem>
            {categories
              .find((category) => category.name === selectedCategory)
              .options.map((year) => (
                <DropdownItem key={year} onClick={() => handleSelect(year)}>
                  {year}
                </DropdownItem>
              ))}
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default YearDropdownBar;


