import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { InputField, AmountInputField } from '../component/field';
import { Header, Title } from '../component/header';
import { CancelButton, BackButton, PillButton } from '../component/button';
import Card from '../component/card';
import Icon from '../component/icon';
import { FormStretcher, FormText } from '../component/form';
import { BalanceLabel, BalanceLabelUnit } from '../component/label';
import { color } from '../component/style';

const styles = StyleSheet.create({
  description: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  balance: {
    marginBottom: 10,
  },
  unit: {
    color: color.blackText,
  },
  btcIcon: {
    height: 170 * 0.08,
    width: 135 * 0.08,
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: color.orange,
  },
});

const PayBitcoinView = ({ store, nav, payment }) => (
  <Background image="orange-gradient-bg">
    <Header shadow color={color.orange}>
      <BackButton onPress={() => nav.goPay()} />
      <Title title="On-Chain Payment">
        <Icon image="bitcoin" style={styles.btcIcon} />
      </Title>
      <CancelButton onPress={() => nav.goHome()} />
    </Header>
    <MainContent>
      <Card>
        <FormText style={styles.description}>
          You are about to initiate an on-chain payment. It could take 10
          minutes or more to confirm.
        </FormText>
        <FormStretcher>
          <BalanceLabel style={styles.balance}>
            <AmountInputField
              value={store.payment.amount}
              onChangeText={amount => payment.setAmount({ amount })}
            />
            <BalanceLabelUnit style={styles.unit}>
              {store.unit}
            </BalanceLabelUnit>
          </BalanceLabel>
          <InputField
            placeholder="Bitcoin Address"
            value={store.payment.address}
            onChangeText={address => payment.setAddress({ address })}
          />
        </FormStretcher>
        <PillButton
          style={styles.nextBtn}
          onPress={() => nav.goPayBitcoinConfirm()}
        >
          Next
        </PillButton>
      </Card>
    </MainContent>
  </Background>
);

PayBitcoinView.propTypes = {
  store: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
};

export default observer(PayBitcoinView);
