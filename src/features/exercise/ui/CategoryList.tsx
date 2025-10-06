// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { Collapse, List, ListItemButton } from "@mui/material";
// import { useState } from "react";
//
// export const CategoryList = () => {
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isNameEditing, setIsNameEditing] = useState(false);
//   const handleNameClick = () => {
//     setIsNameEditing(!isNameEditing);
//   };
//   const handleCategoryClick = () => {
//     setIsCategoryOpen(!isCategoryOpen);
//   };
//
//   return (
//     <List
//       sx={{
//         fontFamily: "'Roboto Condensed', sans-serif",
//         marginLeft: 0,
//       }}
//     >
//       <ListItemButton sx={{ padding: 0 }} onClick={handleNameClick}>
//         Упражнение
//         {isNameEditing ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={isNameEditing} timeout="auto" unmountOnExit>
//         <ListItemButton
//           sx={{ fontSize: "1.3rem" }}
//           onClick={handleCategoryClick}
//         >
//           Упражнение
//           {isCategoryOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={isCategoryOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ fontSize: "1.2rem" }}>
//               Упражнение
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </Collapse>
//     </List>
//   );
// };
