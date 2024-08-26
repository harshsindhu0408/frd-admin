import React from "react";

const FilterButton = ({ onClick = function () {} }) => {
  return (
    <button onClick={onClick} className="mx-2">
      <img
        width={25}
        height={25}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2ZQQrCMBBFf13kTur5avVa7V7c6QGM1xgRphCKllZMnUn/g7+ZbuaTIZ1PAFIGAcAJwAOAqCKARr+54ZgYGOoAR0RtepvUdsnJuEFUU+tmEatGKgCXkbn/pCFpXRZQN2xgA+Ds0Ehb7Git1kjUhl9Xbs9ea3c4ohmZ2xqOCGqmP5n+JGpvKwohhMyCAc0aDGjFL5/Vl8HqVxozIksEq38baWGEYnKNlGIkMqAZgwGNEJIPhiBrRP0L85XKCuJhwQsAbpmzQw5174xcHRppix2tVRmJDEHGCHylIpjME+Gkg13evhogAAAAAElFTkSuQmCC"
      />
    </button>
  );
};

export default FilterButton;
