import React, { PureComponent } from 'react';
import { Radio, Checkbox } from 'antd';
import { formatMessage } from 'umi/locale';
// import styles from './Patient.less';

const RadioGroup = Radio.Group;

const hadBreast = formatMessage({ id: 'patient.print.hadBreast' });
const hadOvarian = formatMessage({ id: 'patient.print.hadOvarian' });
const relevantHist = formatMessage({ id: 'patient.print.relevantHist' });
const relevantOther = formatMessage({ id: 'patient.print.relevantOther' });
const findBirad = formatMessage({ id: 'patient.print.findBirad' });
const unilateralMast = formatMessage({ id: 'patient.print.unilateralMast' });
const asymmetry = formatMessage({ id: 'patient.print.asymmetry' });
const newSkinchanges = formatMessage({ id: 'patient.print.newSkinchanges' });
const node = formatMessage({ id: 'patient.print.nodeAbbr' });
const hardening = formatMessage({ id: 'patient.print.hardeningAbbr' });
const line = formatMessage({ id: 'patient.print.line' });
const circle = formatMessage({ id: 'patient.print.circle' });

const insuranceCompanyId = 'abc123';
const insuranceCompany = 'abc123';
const insuranceNumber = 'abc123';
const specialGroup = 'abc123';
const specialGroupId = 'abc123';
const givenName = 'abc123';
const lastName = 'abc123';
const birthdate = 'abc123';
const address1 = 'abc123';
const address2 = 'abc123';
const postalCode = 'abc123';
const location = 'abc123';
const bsnr = 'abc123';
const doctorNumber = 'abc123';
const patientId = 'abc123';
const caseId = 9991;
const CreationTime = '01/01/2019';
const PriorityId = 1;

class PrintForm extends PureComponent {
  /* eslint-disable */

  renderHeader = () => {
    let urgencyLevel = 'Low';
    switch (PriorityId) {
      case 1:
        urgencyLevel = 'Low';
        break;
      case 2:
        urgencyLevel = 'Medium';
        break;
      case 3:
        urgencyLevel = 'High';
        break;
      case 4:
        urgencyLevel = 'Critical';
        break;
      default:
        break;
    }
    return (
      <div style={{ border: '1px solid #008FD5', fontSize: '12px' }}>
        <div style={{ border: '1px solid #008FD5' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 2 }}>
              <p
                style={{
                  marginBottom: '0px',
                  marginLeft: '5px',
                  color: '#008FD5',
                  fontSize: '8px',
                }}
              >
                {formatMessage({ id: 'patient.print.insuranceCompany' })}:
              </p>
              <span style={{ marginLeft: '5px' }}>{insuranceCompany}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.optemisId' })}:
              </p>
              <span>{patientId}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.optemisCaseId' })}:
              </p>
              <span>{caseId}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.urgency' })}:
              </p>
              <span>{urgencyLevel}</span>
            </div>
          </div>
        </div>
        <div style={{ border: '1px solid #008FD5', paddingBottom: '5px' }}>
          <p style={{ marginBottom: '0px', marginLeft: '5px', color: '#008FD5', fontSize: '8px' }}>
            {formatMessage({ id: 'patient.print.patient' })}:
          </p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <span style={{ marginLeft: '5px' }}>{givenName}</span>
            </div>
            <div style={{ flex: 3 }}>
              <span>{lastName}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.birthdate' })}:
              </span>
              <span style={{ marginLeft: '5px' }}>{birthdate}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <span style={{ marginLeft: '5px' }}>{address1}</span>
            </div>
            <div style={{ flex: 2 }}>
              <span>{address2}</span>
            </div>
            <div style={{ flex: 2 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <span style={{ marginLeft: '5px' }}>{postalCode}</span>
            </div>
            <div style={{ flex: 2 }}>
              <span>{location}</span>
            </div>
            <div style={{ flex: 2 }} />
          </div>
        </div>
        <div style={{ border: '1px solid #008FD5', paddingBottom: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  marginBottom: '0px',
                  marginLeft: '5px',
                  color: '#008FD5',
                  fontSize: '8px',
                }}
              >
                {formatMessage({ id: 'patient.print.insuranceCompanyId' })}:
              </p>
              <span style={{ marginLeft: '5px' }}>{insuranceCompanyId}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.insuranceNumber' })}:
              </p>
              <span>{insuranceNumber}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.specialGroups' })}:
              </p>
              <span>{specialGroup ? specialGroupId : 'None'}</span>
            </div>
          </div>
        </div>
        <div style={{ border: '1px solid #008FD5', paddingBottom: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  marginBottom: '0px',
                  marginLeft: '5px',
                  color: '#008FD5',
                  fontSize: '8px',
                }}
              >
                {formatMessage({ id: 'patient.print.bsnr' })}:
              </p>
              <span style={{ marginLeft: '5px' }}>{bsnr}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.doctorNumber' })}:
              </p>
              <span>{doctorNumber}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '0px', color: '#008FD5', fontSize: '8px' }}>
                {formatMessage({ id: 'patient.print.date' })}:
              </p>
              <span>{CreationTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderGynFormBiradsItem = (type, leftValue, rightValue) => {
    return (
      <div>
        <div style={{ flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
          <span style={{ flex: 2, color: '#008FD5', fontSize: '10px', margin: '5px 5px 0 0' }}>
            {type}
          </span>
          <span
            style={{
              flex: 1,
              fontSize: '10px',
              fontWeight: 600,
              color: '#008FD5',
              margin: '5px 0 0 0',
            }}
          >
            {formatMessage({ id: 'patient.print.left' })}
          </span>
          <span style={{ flex: 6 }}>
            <RadioGroup value={leftValue}>
              <Radio value={'1'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.unobtrusive' })}
                </span>
              </Radio>
              <Radio value={'2'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.benign' })}
                </span>
              </Radio>
              <Radio value={'3'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.unclear' })}
                </span>
              </Radio>
              <Radio value={'4'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.suspicious' })}
                </span>
              </Radio>
            </RadioGroup>
          </span>
        </div>
        <div style={{ flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
          <span style={{ flex: 2, color: '#008FD5', fontSize: '10px' }} />
          <span
            style={{
              flex: 1,
              fontSize: '10px',
              fontWeight: 600,
              color: '#008FD5',
              margin: '5px 5px 0 0',
            }}
          >
            {formatMessage({ id: 'patient.print.right' })}
          </span>
          <span style={{ flex: 6 }}>
            <RadioGroup value={rightValue}>
              <Radio value={'1'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.unobtrusive' })}
                </span>
              </Radio>
              <Radio value={'2'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.benign' })}
                </span>
              </Radio>
              <Radio value={'3'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.unclear' })}
                </span>
              </Radio>
              <Radio value={'4'}>
                <span style={{ fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.suspicious' })}
                </span>
              </Radio>
            </RadioGroup>
          </span>
        </div>
      </div>
    );
  };

  renderGynFormBooleanItem = (type, value) => {
    return (
      <div style={{ flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
        <span style={{ flex: 2, color: '#008FD5', marginTop: '5px', fontSize: '10px' }}>
          {type}:
        </span>
        <span style={{ flex: 7 }}>
          <RadioGroup value={value}>
            <Radio value={'1'}>
              <span style={{ fontSize: '10px' }}>{formatMessage({ id: 'patient.print.yes' })}</span>
            </Radio>
            <Radio value={'2'}>
              <span style={{ fontSize: '10px' }}>{formatMessage({ id: 'patient.print.no' })}</span>
            </Radio>
          </RadioGroup>
        </span>
      </div>
    );
  };

  renderGynForm = () => {
    const remarksText = 'Lorem ipsum';
    return (
      <div>
        <div
          style={{
            fontSize: '12px',
            border: '1px solid #008FD5',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, margin: '0 0 12px 5px' }}>
            <span style={{ color: '#008FD5', fontWeight: 600 }}>
              {formatMessage({ id: 'patient.print.personal' })}
            </span>
          </div>
          <div style={{ flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 2, color: '#008FD5', fontSize: '10px' }}>
              {formatMessage({ id: 'patient.print.dateLastMammography' })}
            </span>
            <span style={{ flex: 7 }}>
              200912
              <span style={{ fontSize: '8px', marginLeft: '5px' }}>
                {formatMessage({ id: 'patient.print.dateLastFormat' })}
              </span>
            </span>
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: '5px',
              marginBottom: '5px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <span style={{ flex: 1, color: '#008FD5', marginTop: '5px', fontSize: '10px' }}>
              {formatMessage({ id: 'patient.print.familyHistory' })}
            </span>
            <div style={{ flex: 8, marginLeft: '5px' }}>
              <Checkbox>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.mother' })}
                </span>
              </Checkbox>
              <Checkbox>
                <span style={{ fontSize: '8px' }}>
                  {formatMessage({ id: 'patient.print.daughter' })}
                </span>
              </Checkbox>
              <Checkbox>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.sister' })}
                </span>
              </Checkbox>
              <Checkbox checked>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.grandmother' })}
                </span>
              </Checkbox>
              <Checkbox>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.granddaughter' })}
                </span>
              </Checkbox>
              <Checkbox>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.twodist' })}
                </span>
              </Checkbox>
              <Checkbox>
                <span style={{ fontSize: '9px' }}>
                  {formatMessage({ id: 'patient.print.male' })}
                </span>
              </Checkbox>
            </div>
          </div>
          {this.renderGynFormBooleanItem(hadBreast, '1')}
          {this.renderGynFormBooleanItem(hadOvarian, '1')}
          {this.renderGynFormBooleanItem(relevantHist, '1')}
          {this.renderGynFormBooleanItem(relevantOther, '1')}
          {this.renderGynFormBooleanItem(findBirad, '1')}
          <div style={{ flex: 1, marginBottom: '5px' }} />
        </div>
        <div
          style={{
            marginTop: '12px',
            fontSize: '12px',
            border: '1px solid #008FD5',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, margin: '0 0 12px 5px' }}>
            <span style={{ color: '#008FD5', fontWeight: 600 }}>
              {formatMessage({ id: 'patient.print.symptoms' })}
            </span>
          </div>
          {this.renderGynFormBooleanItem(unilateralMast, '1')}
          {this.renderGynFormBooleanItem(asymmetry, '1')}
          {this.renderGynFormBooleanItem(newSkinchanges, '1')}
          {this.renderGynFormBiradsItem('Palpation', '1', '2')}
          {this.renderGynFormBiradsItem('Changes skin/nipples', '1', '2')}
          {this.renderGynFormBiradsItem('Secretion', '1', '2')}
          {this.renderGynFormBiradsItem('Mastitis / Abscess', '1', '2')}
          {this.renderGynFormBiradsItem('Palpable axillary lymph mode', '1', '2')}
          <div style={{ flex: 1, marginTop: '24px', display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 4, margin: '5px', fontSize: '10px' }}>
              <p style={{ color: '#008FD5', fontWeight: 600 }}>
                {formatMessage({ id: 'patient.print.explanation' })}
              </p>
              <div style={{ paddingBottom: '10px', fontSize: '10px' }}>
                <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{node}:</span>
                <span style={{ margin: '5px' }}>{formatMessage({ id: 'patient.print.node' })}</span>
                <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>
                  {hardening}:
                </span>
                <span style={{ margin: '5px' }}>
                  {formatMessage({ id: 'patient.print.hardening' })}
                </span>
                <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{line}:</span>
                <span style={{ margin: '5px' }}>{formatMessage({ id: 'patient.print.scar' })}</span>
                <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{circle}:</span>
                <span style={{ margin: '5px' }}>
                  {formatMessage({ id: 'patient.print.skinLesions' })}
                </span>
              </div>
              <p style={{ color: '#008FD5', fontSize: '10px', fontWeight: 600 }}>
                {formatMessage({ id: 'patient.print.remarks' })}
              </p>
              <span style={{ fontSize: '10px' }}>{remarksText}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <div
        style={{
          minHeight: '80px',
          marginTop: '12px',
          fontSize: '12px',
          border: '1px solid #008FD5',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 1, margin: '24px 0px 0px 12px' }}>
          <span style={{ color: '#008FD5', fontSize: '10px' }}>
            {formatMessage({ id: 'patient.print.overallClinic' })}:
          </span>
          <span style={{ marginLeft: '12px', fontWeight: 600 }}>Benign</span>
          <span style={{ marginLeft: '24px', color: '#008FD5', fontSize: '10px' }}>
            {formatMessage({ id: 'patient.print.assignment' })}: :
          </span>
          <span style={{ marginLeft: '12px', fontWeight: 600 }}>
            Check after unclear preliminary finiding (BI-RADS 3)
          </span>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <div style={{ margin: '24px 24px 12px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 3 }}>{this.renderHeader()}</div>
            <div style={{ flex: 1, marginLeft: '5px' }}>
              <div style={{ border: '1px solid #008FD5', height: '180px' }}>
                <span style={{ margin: '0px 0px 5px 5px', color: '#008FD5', fontSize: '10px' }}>
                  {formatMessage({ id: 'patient.print.doctorSignature' })}::
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: '5px 24px 12px 24px' }}>
          {this.renderGynForm()}
          {this.renderFooter()}
        </div>
      </div>
    );
  };
}

export default PrintForm;
