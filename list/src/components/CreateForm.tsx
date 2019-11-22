import { Form, Input, InputNumber, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  return (
    <Modal
      destroyOnClose
      title="新建"
      width="50%"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formLayout} label="星级名称">
        {form.getFieldDecorator('starName', {
          rules: [{ required: true, message: '请输入星级名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="级别">
        {form.getFieldDecorator('starLevel', {
          rules: [{ required: true, message: '请输入级别！', type: 'number' }],
        })(<InputNumber min={0} max={10} placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="大于等于贡献值">
        {form.getFieldDecorator('contributeNum', {
          rules: [{ required: true, message: '请输入大于等于贡献值！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="奖励矿机">
        {form.getFieldDecorator('millId', {
          rules: [{ required: true, message: '请输入奖励矿机！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formLayout} label="分红比例">
        {form.getFieldDecorator('devidendProportion', {
          initialValue: 1,
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

export default Form.create<CreateFormProps>()(CreateForm);
