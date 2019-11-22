/*
 * @Descripttion:
 * @Author: xiaozm
 * @Date: 2019-11-20 18:00:23
 * @LastEditors: xiaozm
 * @LastEditTime: 2019-11-22 16:36:55
 */
import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryList(params: TableListParams) {
  return request('/manager/user/vipstartlevel/list', {
    params,
  });
}

export async function getDetail(params: { id: string }) {
  return request('/manager/user/vipstartlevel/detail', { params });
}

export async function updateQuery(params: TableListItem) {
  return request('/manager/user/vipstartlevel/update', { data: params, method: 'POST' });
}

export async function createQuery(params: TableListItem) {
  return request('/manager/user/vipstartlevel/create', { data: params, method: 'POST' });
}
export async function deleteQuery(params: { id: string }) {
  return request('/manager/user/vipstartlevel/del', { data: params, method: 'POST' });
}
