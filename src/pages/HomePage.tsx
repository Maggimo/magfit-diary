import { useState } from "react";
import { ExerciseList, Header, WeekSlider } from "../widgets";
import { CustomDrawer } from "../widgets/drawer";

export const HomePage = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  return (
    <div>
      <Header />
      <WeekSlider />
      <CustomDrawer
        open={drawerVisibility}
        setDrawerVisibility={setDrawerVisibility}
      />
      <ExerciseList setDrawerVisibility={setDrawerVisibility} />
    </div>
  );
};
