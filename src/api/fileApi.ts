import {request, requestParams, requestSWR} from "../util/request.ts";
import {RequestFileEntity} from "../entity/RequestFileEntity.ts";

export const selectFileList = (params: RequestFileEntity) => {
    return requestSWR({
        url: '/api/file/get',
        method: 'GET',
        data: params
    } as requestParams);
}
