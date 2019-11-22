/*
 * @Descripttion:
 * @Author: xiaozm
 * @Date: 2019-11-20 18:00:23
 * @LastEditors: xiaozm
 * @LastEditTime: 2019-11-22 17:28:16
 */
export interface TableListItem {
  id?: number;
  maxContributeNum?: number;
  millId?: number;
  starLevel?: number;
  starName?: string;
  createDate?: string;
  contributeNum?: number;
  devidendProportion?: number;
}
export interface TableListParams {
  pageSize: number;
  pageNum: number;
}
export interface TableListData extends TableListPagination {
  list: TableListItem[];
}

export interface TableListPagination {
  pageSize: number;
  pageNum: number;
  total: number;
}
export interface TableListResp {
  msg: string;
  msgCode: string;
  data: TableListData;
}
