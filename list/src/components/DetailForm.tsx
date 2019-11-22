import { Form, Input, Modal, Badge, Card, Descriptions, Divider, Table } from 'antd';

import React from 'react';
import { TableListItem } from './data.d';

interface DetailFormProps {
  modalVisible: boolean;
  detail: TableListItem;
  handleModalVisible: (flag: boolean) => void;
}
const DetailForm: React.FC<DetailFormProps> = props => {
  const { modalVisible, detail, handleModalVisible }: DetailFormProps = props;
  return (
    <Modal
      destroyOnClose
      title="查看详情"
      width="60%"
      footer={null}
      visible={modalVisible}
      onCancel={() => handleModalVisible(false)}
    >
      <Card bordered={false}>
        <Descriptions title="城市信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="城市所属">{detail.provinceName}</Descriptions.Item>
          <Descriptions.Item label="城市名">{detail.cityName}</Descriptions.Item>
          <Descriptions.Item label="城市人数">{detail.cityPersonNum}</Descriptions.Item>
          <Descriptions.Item label="城市坐标">
            cityX:{detail.cityX} cityY:{detail.cityY}
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="玩家信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="玩家手机号">{detail.mobilePhone}</Descriptions.Item>
          <Descriptions.Item label="玩家昵称">{detail.nickName}</Descriptions.Item>
          <Descriptions.Item label="玩家名字">{detail.userName}</Descriptions.Item>
          <Descriptions.Item label="晶石数量">{detail.sparAmount}</Descriptions.Item>
          <Descriptions.Item label="邀请码">{detail.randomCode}</Descriptions.Item>
          <Descriptions.Item label="过期时间">{detail.expirationTime}</Descriptions.Item>
          <Descriptions.Item label="贡献值">{detail.contributeAmount}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default DetailForm;
