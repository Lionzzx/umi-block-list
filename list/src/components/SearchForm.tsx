import { Form, Input, Row, Col, Select, Button, Icon } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import styles from '../style.less';

const FormItem = Form.Item;
const { Option } = Select;

export interface searchItem {
  key: string;
  label: string;
  type: 'input' | 'select' | 'date';
}

interface fieldsValue {
  [key: string]: string;
}

interface searchFormProps extends FormComponentProps {
  searchConfig: searchItem[];
  onReset: () => void;
  onSearch: (fieldsValue: fieldsValue) => void;
}

const SearchForm: React.FC<searchFormProps> = props => {
  const { searchConfig = [], form, onReset, onSearch } = props;
  const [expandForm, toggleExpandForm] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (onSearch) {
        onSearch(fieldsValue);
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {searchConfig.slice(0, !expandForm ? 2 : searchConfig.length).map((item: searchItem) => (
          <Col key={item.key} md={8} sm={24}>
            <FormItem label={item.label}>
              {form.getFieldDecorator(item.key)(<Input placeholder={`请输入${item.label}`} />)}
            </FormItem>
          </Col>
        ))}
        <Col md={8} sm={24}>
          <span className={styles.submitButtons}>
            <Button onClick={handleSearch} type="primary" htmlType="submit">
              查询
            </Button>
            <Button onClick={handleReset} style={{ marginLeft: 8 }}>
              重置
            </Button>
            {searchConfig.length > 2 &&
              (!expandForm ? (
                <a style={{ marginLeft: 8 }} onClick={() => toggleExpandForm(true)}>
                  展开 <Icon type="down" />
                </a>
              ) : (
                <a style={{ marginLeft: 8 }} onClick={() => toggleExpandForm(false)}>
                  收起 <Icon type="up" />
                </a>
              ))}
          </span>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<searchFormProps>()(SearchForm);
