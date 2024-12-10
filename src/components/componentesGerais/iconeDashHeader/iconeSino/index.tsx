
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-solid-svg-icons" */
import React from "react";
import { PiBellDuotone } from 'react-icons/pi';

export const IconeSino = (props) => {
  return (
    <>
      {/* <FontAwesomeIcon icon={ faBellSlash } color="#A0AEC0" />  */}{/* Use um ícone do FontAwesome */}
      <PiBellDuotone color="#A0AEC0" size={'24px'} {...props}/>
    </>
  );
};
