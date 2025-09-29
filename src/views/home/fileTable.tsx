import {message, Table} from "antd";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {columns, DataType} from "./tableType.ts";
import {TableRowSelection} from "antd/es/table/interface";
import {selectFileList} from "../../api/fileApi.ts";
import {RequestFileEntityImpl} from "../../entity/RequestFileEntity.ts";
import {requestParams, requestSWR} from "../../util/request.ts";
import {ArgsProps} from "antd/es/message";
import {MessageType} from "antd/es/message/interface";

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

// 展开配置项
const expandableProps = {
    expandRowByClick: true
}

const FileTable = () => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [isMore, setIsMore] = useState<boolean>(false)
    const requestFileEntityRef = useRef<RequestFileEntityImpl>(new RequestFileEntityImpl())
    const [messageApi, contextHolder] = message.useMessage();
    const messageInfo = useRef<MessageType | undefined>(undefined);

    // SWR 获取数据
    const { data, isLoading, mutate } = selectFileList(requestFileEntityRef.current)

    // 数据变化时更新
    useEffect(() => {
        setLoading(isLoading)
        if (data?.data?.data && !isMore) {
            setDataSource(prev => [...prev, ...data.data.data])
            setTotal(data.data.total)
            if (Math.ceil(data.data.total / requestFileEntityRef.current.num) < requestFileEntityRef.current.page + 1) {
                setIsMore(true)
            }
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
