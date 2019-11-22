import { Form, InputNumber, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';

const FormItem = Form.Item;

interface UpdateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleUpdate: (fieldsValue: TableListItem) => void;
  handleUpdateModalVisible: (flag?: boolean, item?: TableListItem) => void;
  values: TableListItem;
}
const UpdateForm: React.FC<UpdateFormProps> = props => {
  const { modalVisible, form, values, handleUpdate, handleUpdateModalVisible } = props;

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate({ ...fieldsValue, id: values.id });
    });
  };

  return (
    <Modal
      destroyOnClose
      title="编辑"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem {...formLayout} label="星级名称">
        {form.getFieldDecorator('starName', {
          initialValue: values.starName,
          rules: [{ required: true, message: '请输入星级名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="级别">
        {form.getFieldDecorator('starLevel', {
          initialValue: values.starLevel,
          rules: [{ required: true, message: '请输入级别！', type: 'number' }],
        })(<InputNumber min={0} max={10} placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="大于等于贡献值">
        {form.getFieldDecorator('contributeNum', {
          initialValue: values.contributeNum,
          rules: [{ required: true, message: '请输入大于等于贡献值！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="奖励矿机">
        {form.getFieldDecorator('millId', {
          initialValue: values.millId,
          rules: [{ required: true, message: '请输入奖励矿机！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="分红比例">
        {form.getFieldDecorator('devidendProportion', {
          initialValue: values.devidendProportion,
          rules: [{ required: true }],
        })(
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value!.replace('%', '')}
            placeholder="请输入"
          />,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
