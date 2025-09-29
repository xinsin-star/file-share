export interface RequestFileEntity {
    num: number,
    page: number,
    folder: number,
    keywords: string,
    sort: string,
    reverse: boolean,
}

export class RequestFileEntityImpl implements RequestFileEntity {
    folder: number = -1;
    keywords: string = '';
    num: number = 10;
    page: number = 1;
    reverse: boolean = false;
    sort: string = "ID";
}
