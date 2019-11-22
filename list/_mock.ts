/*
 * @Descripttion:
 * @Author: xiaozm
 * @Date: 2019-11-20 18:00:23
 * @LastEditors: xiaozm
 * @LastEditTime: 2019-11-22 09:54:32
 */
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListResp, TableListParams } from './data.d';

function success(data: any): TableListResp {
  return {
    msg: 'success',
    data,
    msgCode: '40000',
  };
}
// mock tableListDataSource
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    id: i,
    nickName: '曲丽丽',
    mobilePhone: Math.ceil(Math.random() * 10000000),
    type: Math.floor(Math.random() * 10) % 4,
    starLevel: Math.floor(Math.random() * 10) % 4,
    sparNum: Math.floor(Math.random() * 10) % 4,
    millNum: Math.floor(Math.random() * 10) % 4,
    createDate: `2017-07-${Math.floor(i / 2) + 1}`,
    updateDate: `2017-07-${Math.floor(i / 2) + 1}`,
    status: Math.floor(Math.random() * 10) % 4,
  });
}

function getList(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  const dataSource = tableListDataSource;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    list: dataSource,
    total: 100,
    pageSize,
    pageNum: parseInt(`${params.pageNum}`, 10) || 1,
  };

  return res.json(success(result));
}
function getDetail(req: Request, res: Response) {
  return res.json(success(tableListDataSource[Math.floor(Math.random() * 6)]));
}

export default {
  'GET /api/player/list': getList,
  'GET /api/player/detail': getDetail,
};
