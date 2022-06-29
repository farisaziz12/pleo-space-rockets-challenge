import React from "react";
import { Tooltip } from "@chakra-ui/core";

const TooltipWrapper =
  (Component) =>
  ({ children, tooltip = {}, ...rest }) =>
    (
      <Tooltip {...tooltip}>
        <span>
          <Component {...rest}>{children}</Component>
        </span>
      </Tooltip>
    );

export default TooltipWrapper;