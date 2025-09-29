import React from "react";
import {TableColumnsType} from "antd";

// 定义表格的数据类型
export interface DataType {
    key: React.Key;
    name: string;
    size: number;
    time: number;
    ownerName: string;
    children?: DataType[];
}

// 初始化表格的列定义
export const columns: TableColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
        width: 100,
    },
    {
        title: '上传时间',
        dataIndex: 'time',
        width: 200,
        key: 'time',
    },
    {
        title: '上传者',
        dataIndex: 'ownerName',
        width: 100,
        key: 'ownerName',
    },
];

