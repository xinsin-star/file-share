import {Tooltip} from "antd";
import React from "react";

const XTooltip = ({ children, title }) => {
    return <Tooltip placement="top" color="#ffd6e7" title={title}>{children}</Tooltip>
}

export default XTooltip
