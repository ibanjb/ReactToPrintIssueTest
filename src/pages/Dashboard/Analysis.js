import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Modal, Card, Button, Row, Col, Icon, Menu, Dropdown } from 'antd';
import ReactToPrint from 'react-to-print';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import PrintForm from '@/components/PrintTest';
import CanvasTest from '@/components/CanvasTest';
import Easter from '@/components/Easter';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));
const OfflineData = React.lazy(() => import('./OfflineData'));
const mockCoordinates = [
  { id: 1, type: 'S', coords: [{ x: 323, y: 220 }] },
  { id: 2, type: 'P', coords: [{ x: 319, y: 134 }] },
  { id: 3, type: 'N', coords: [{ x: 116, y: 188 }] },
  { id: 4, type: 'Circle', coords: [{ x: 265, y: 145 }, { x: 325, y: 220 }] },
  { id: 5, type: 'Circle', coords: [{ x: 87, y: 168 }, { x: 112, y: 197 }] },
  {
    id: 6,
    type: 'Line',
    coords: [
      { x: 343, y: 149 },
      { x: 340, y: 162 },
      { x: 333, y: 177 },
      { x: 328, y: 188 },
      { x: 327, y: 189 },
      { x: 326, y: 192 },
    ],
  },
  {
    id: 7,
    type: 'Line',
    coords: [
      { x: 269, y: 126 },
      { x: 278, y: 126 },
      { x: 271, y: 126 },
      { x: 272, y: 126 },
      { x: 273, y: 126 },
      { x: 274, y: 126 },
      { x: 275, y: 126 },
      { x: 276, y: 126 },
      { x: 277, y: 126 },
      { x: 278, y: 126 },
      { x: 277, y: 126 },
      { x: 276, y: 126 },
    ],
  },
];

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    visibility: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  onClick = () => {
    this.setState({ visibility: true });
  };

  onCancel = () => {
    this.setState({ visibility: false });
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey, visibility } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    /* eslint-disable */
    // just for test purposes... so, disable!
    return (
      <GridContent>
        <div style={{ marginBottom: '48px' }}>
          <ReactToPrint
            trigger={() => (
              <Button type="primary" shape="round" icon="printer" size="large">
                Print test !!!
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Button
            onClick={this.onClick}
            style={{ marginLeft: '24px' }}
            type="primary"
            shape="round"
            icon="experiment"
            size="small"
          >
            Easter egg
          </Button>
          <Modal
            title="Use the cursors or press ESC to close"
            style={{ minWidth: '450px' }}
            centered
            destroyOnClose
            visible={visibility}
            onCancel={this.onCancel}
            footer={[]}
          >
            <Easter />
          </Modal>

          <div style={{ display: 'none' }}>
            <PrintForm ref={el => (this.componentRef = el)} />
          </div>
        </div>

        <Card style={{ marginBottom: '24px' }}>
          <h3>Canvas test</h3>
          <div style={{ margin: '24px' }}>
            <CanvasTest coordinates={mockCoordinates} disabled={false} />
          </div>
        </Card>

        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading}
                  visitData2={visitData2}
                  selectDate={this.selectDate}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
        </div>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          />
        </Suspense>
      </GridContent>
    );
    /* eslint-enable */
  }
}

export default Analysis;
