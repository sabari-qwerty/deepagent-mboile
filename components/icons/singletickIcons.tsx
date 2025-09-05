import { FC } from "react";
import Svg, { Path } from "react-native-svg";

export interface colorProp {
  color: string;
}

export const SingleTickIcon: FC<colorProp> = ({ color }) => {
  return (
    <Svg width="6" height="6" viewBox="0 0 6 6" fill="none">
      <Path
        d="M1.85612 4.45795L0.605005 2.92714C0.465594 2.75656 0.243968 2.75656 0.104558 2.92714C-0.0348525 3.09771 -0.0348525 3.36889 0.104558 3.53946L1.60232 5.37207C1.74173 5.54264 1.96693 5.54264 2.10634 5.37207L5.89544 0.740258C6.03485 0.569682 6.03485 0.298509 5.89544 0.127932C5.75603 -0.0426441 5.53441 -0.0426441 5.395 0.127932L1.85612 4.45795Z"
        fill={color}
      />
    </Svg>
  );
};
