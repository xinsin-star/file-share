import React from "react";
import {Button, TableColumnsType, Tooltip} from "antd";
import {calculateFileSize, sendNotifications} from "../../util/common.ts";
import {DeleteOutlined, DownloadOutlined, FolderViewOutlined} from "@ant-design/icons";
import XTooltip from "../../components/XTooltip.tsx";

// 定义表格的数据类型
export interface DataType {
    key: React.Key;
    name: string;
    size: number;
    time: number;
    ownerName: string;
    children?: DataType[];
}

const getExtIcon = (ext: string, type: string) => {
    if (type === "FILE") {
        switch (ext) {
            case 'apk':
                return <span className="iconfont">&#xe669;</span>
            case 'exe':
            case 'dll':
            case 'sys':
                return <span className="iconfont">&#xedd4;</span>
            case 'pdf':
                return <span className="iconfont">&#xe82b;</span>
            case 'zip':
            case '7z':
            case 'tar':
                return <span className="iconfont">&#xe859;</span>
            case 'rar':
                return <span className="iconfont">&#xe620;</span>
            default:
                return <span className="iconfont">&#xe689;</span>
        }
    } else {
        return <span className="iconfont">&#xe601;</span>
    }
}

// 初始化表格的列定义
export const columns: TableColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        ellipsis: {
            showTitle: false,
        },
        render: (name, record) => {
            let text = name
            if (record['type'] === 'FILE') {
                text += `.${record['ext']}`
            }
            return (
                <XTooltip title={text}>
                    <span style={{display:"flex", alignItems:"center"}}>
                        <span style={{paddingRight: 4}}>
                            {getExtIcon(record['ext'], record['type'])}
                        </span>
                        {text}
                    </span>
                </XTooltip>
            )
        }
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
        width: 100,
        render: (size) => {
            const formatSize = () => {
                const numSize = Number(size);
                if (isNaN(numSize)) return 'invalid';
                return numSize === -1 ? '∞' : calculateFileSize(numSize);
            };
            return <span>{formatSize()}</span>;
        }
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
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        width: 150,
        render: () => {
            return (
                <span>
                    <XTooltip title="删除"><Button color="pink" variant="text" icon={<DeleteOutlined />} /></XTooltip>
                    <XTooltip title="下载"><Button color="cyan" variant="text" icon={<DownloadOutlined />} onClick={() => sendNotifications("上传成功", "xxx文件上传成功")} /></XTooltip>
                    <XTooltip title="详情"><Button color="cyan" variant="text" icon={<FolderViewOutlined />} /></XTooltip>
                </span>
            )
        },
    }
];

