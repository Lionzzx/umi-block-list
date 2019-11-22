/*
 * @Descripttion:
 * @Author: xiaozm
 * @Date: 2019-11-20 18:00:23
 * @LastEditors: xiaozm
 * @LastEditTime: 2019-11-22 17:37:31
 */
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getDetail, queryList, deleteQuery, createQuery, updateQuery } from './service';

import { TableListItem } from './data.d';

export interface StateType {
  data: TableListItem[];
  detail: TableListItem;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    getDetail: Effect;
    update: Effect;
    create: Effect;
    delete: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveDetail: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'starLevelAndlist',

  state: {
    data: [],
    detail: { id: 0 },
  },

  effects: {
    // 请求数据列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // 请求数据列表
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, { cityVipUserId: payload.cityVipUserId });
      yield put({
        type: 'saveDetail',
        payload: { ...payload, ...response.data },
      });
    },
    /**
     * @name: 创建
     * @param {}
     * @return:
     */
    *create({ payload }, { call, put }) {
      yield call(createQuery, payload);
      yield put({ type: 'fetch', payload: {} });
    },
    /**
     * @name: 更新
     * @param {}
     * @return:
     */
    *update({ payload }, { call, put }) {
      yield call(updateQuery, payload);

      yield put({ type: 'fetch', payload: {} });
    },
    /**
     * @name: 更新
     * @param {}
     * @return:
     */
    *delete({ payload }, { call, put }) {
      yield call(deleteQuery, payload);

      yield put({ type: 'fetch', payload: {} });
    },
  },

  reducers: {
    save(state: any, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    saveDetail(state: any, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};

export default Model;
