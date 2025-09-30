import {message, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {columns, DataType} from "./tableType.tsx";
import {TableRowSelection} from "antd/es/table/interface";
import {selectFileList} from "../../api/fileApi.ts";
import {RequestFileEntityImpl} from "../../entity/RequestFileEntity.ts";
import {MessageType} from "antd/es/message/interface";
import {DownOutlined, RightOutlined, UpOutlined} from "@ant-design/icons";

// 选中时回调配置项
const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

const nextFolderChildren = (data: Array<any>) => {
    data.forEach((item) => {
        if (item.children) {
            nextFolderChildren(item.children);
        } else {
            if (item.type === 'FOLDER') {
                item.children = []
            }
        }
    })
}
const nextFolderChildrenData = (data: Array<any>, folderId: number, requestData: Array<any>) => {
    data.forEach((item) => {
        if (item.id === folderId) {
            item.children = requestData
        } else {
            if (item.children) {
                nextFolderChildrenData(item.children, folderId, requestData);
            }
        }
    })
}

export const FileTable = () => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [isMore, setIsMore] = useState<boolean>(false)
    const requestFileEntityRef = useRef<RequestFileEntityImpl>(new RequestFileEntityImpl())
    const [messageApi, contextHolder] = message.useMessage();
    const messageInfo = useRef<MessageType | undefined>(undefined);

    // 展开配置项
    const expandableProps = {
        expandRowByClick: true,
        onExpand: (expanded, record) => {
            // 这里设置行展开的查询动作
            if (expanded) {
                if (record.type === 'FOLDER') {
                    requestFileEntityRef.current.folder = record.id
                    requestFileEntityRef.current.page = 1
                    // 查询
                    mutate().then(res => {})
                }
            }
        },
        // expandIcon: (props) => {
        //     if (props.record.type === 'FOLDER') {
        //         if (props.expanded) {
        //             return <DownOutlined style={{cursor: 'pointer'}} />
        //         } else {
        //             return <RightOutlined style={{cursor: 'pointer'}} />
        //         }
        //     } else {
        //         return <></>
        //     }
        // }
    }

    // SWR 获取数据
    const { data, isLoading, mutate } = selectFileList(requestFileEntityRef.current)

    // 数据变化时更新
    useEffect(() => {
        setLoading(isLoading)
        if (requestFileEntityRef.current.folder === -1) {
            if (data?.data?.data && !isMore) {
                setDataSource(prev => {
                    let data1 = [...prev, ...data.data.data]
                    // 设置为文件夹可打开
                    nextFolderChildren(data1)
                    return data1
                })
                setTotal(data.data.total)
                if (Math.ceil(data.data.total / requestFileEntityRef.current.num) < requestFileEntityRef.current.page + 1) {
                    setIsMore(true)
                }
            }
        } else {
            setDataSource(prev => {
                let data1 = [...prev]
                nextFolderChildrenData(data1, requestFileEntityRef.current.folder, data.data.data)
                nextFolderChildren(data1)
                return data1
            })
        }
    }, [data])

    // 监听 Table 滚动事件
    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollHeight - scrollTop === clientHeight && !isMore && !isLoading) {
            // 分页递增
            requestFileEntityRef.current.page += 1
            mutate() // 触发 SWR 重新请求
        } else if (isMore) {
            if (!messageInfo.current) {
                messageInfo.current =  messageApi.info("已经到底啦, 不要再拉了!")
            }
        }
    };

    return (
      <>
          {contextHolder}
          <div>
              <Table<DataType>
                  columns={columns}
                  rowSelection={{ ...rowSelection }}
                  dataSource={dataSource}
                  size="small"
                  expandable={expandableProps}
                  loading={loading}
                  pagination={false}
                  scroll={{y: '50vh'}}
                  rowKey="id"
                  onScroll={handleScroll}
              />
          </div>
      </>
    )
}

export default FileTable;
