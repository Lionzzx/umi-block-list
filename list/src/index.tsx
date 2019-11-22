import { Button, Popconfirm, Card, Form, Table, Divider } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { TableProps } from 'antd/es/table';
import { StateType } from './model';
import styles from './style.less';
import { TableListItem } from './data.d';
import SearchForm, { searchItem } from './components/SearchForm';
import DetailForm from './components/DetailForm';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'starLevelAndlist/fetch'
      | 'starLevelAndlist/saveDetail'
      | 'starLevelAndlist/getDetail'
      | 'starLevelAndlist/create'
      | 'starLevelAndlist/update'
      | 'starLevelAndlist/delete'
    >
  >;
  loading: boolean;
  starLevelAndlist: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  detailModalVisible: boolean;
  formValues: TableListItem;
  searchFormValues: { [key: string]: string };
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    starLevelAndlist,
    loading,
  }: {
    starLevelAndlist: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    starLevelAndlist,
    loading: loading.models.starLevelAndlist,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    detailModalVisible: false,
    modalVisible: false,
    updateModalVisible: false,
    formValues: {},
    searchFormValues: {},
  };

  searchConfig: searchItem[] = [
    {
      key: 'id',
      label: '玩家昵称',
      type: 'input',
    },
    {
      key: 'mobilePhone',
      label: '玩家手机号',
      type: 'input',
    },
  ];

  columns = [
    {
      title: '星级',
      dataIndex: 'starName',
    },
    {
      title: '最大贡献值',
      dataIndex: 'contributeNum',
    },
    {
      title: '分红比例',
      dataIndex: 'devidendProportion',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '获得奖励',
      dataIndex: 'millId',
    },
    {
      title: '操作',
      render: (text: any, record: TableListItem) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="您是否确定删除？"
            onConfirm={() => this.handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="">删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'starLevelAndlist/fetch',
    });
  }

  handleAdd = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'starLevelAndlist/create',
      payload: item,
    });
    this.handleModalVisible();
  };

  handleUpdate = (item: TableListItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'starLevelAndlist/update',
      payload: item,
    });
    this.handleUpdateModalVisible(false);
  };

  handleDelete = (id: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'starLevelAndlist/delete',
      payload: { id },
    });
  };

  handleDetail = (item: TableListItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'starLevelAndlist/getDetail',
      payload: item,
    });
    this.handleDetailModalVisible(true);
  };

  handleDetailModalVisible = (flag: boolean) => {
    this.setState({
      detailModalVisible: flag,
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, item?: TableListItem) => {
    const { dispatch } = this.props;
    if (item) {
      dispatch({
        type: 'starLevelAndlist/saveDetail',
        payload: item,
      });
    }
    this.setState({
      updateModalVisible: !!flag,
    });
  };

  /**
   * @name: 搜索重置
   * @param {表单{key：value}}
   * @return: void
   */
  handleSearch = (fieldsValue: TableListState['searchFormValues']) => {
    const { dispatch } = this.props;
    this.setState({
      searchFormValues: fieldsValue,
    });
    dispatch({
      type: 'starLevelAndlist/fetch',
      payload: { ...fieldsValue },
    });
  };

  /**
   * @name: 搜索重置
   * @param {}
   * @return: void
   */
  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      searchFormValues: {},
    });
    dispatch({
      type: 'starLevelAndlist/fetch',
      payload: {},
    });
  };

  /**
   * @name: 分页查询
   * @param {pagination:{current,pageSize...}}
   * @return: void
   */
  handleTableChange: TableProps<TableListItem>['onChange'] = pagination => {
    const { dispatch } = this.props;
    const { searchFormValues } = this.state;

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormValues,
    };
    dispatch({
      type: 'starLevelAndlist/fetch',
      payload: params,
    });
  };

  render() {
    const {
      starLevelAndlist: { data, detail },
      loading,
    } = this.props;

    const { modalVisible, detailModalVisible, updateModalVisible } = this.state;

    const paginationProps = false;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm
                onReset={this.handleSearchReset}
                onSearch={this.handleSearch}
                searchConfig={this.searchConfig}
              />
            </div>

            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table
              pagination={paginationProps}
              onChange={this.handleTableChange}
              rowKey="id"
              loading={loading}
              dataSource={data}
              columns={this.columns}
            />
          </div>
        </Card>
        {detail ? (
          <DetailForm
            detail={detail}
            modalVisible={detailModalVisible}
            handleModalVisible={this.handleDetailModalVisible}
          ></DetailForm>
        ) : null}
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {detail ? (
          <UpdateForm values={detail} {...updateMethods} modalVisible={updateModalVisible} />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
