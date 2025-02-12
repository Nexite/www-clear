import React from 'react';
import { Calendar, PaymentCash, PaymentDiscount } from '@codeday/topocons';
import moment from 'moment-timezone';
import { Text } from '@codeday/topo/Atom';
import Alert, { GoodAlert } from './Alert';
import InfoBox from './InfoBox';

export default function TicketBox({ event, children, ...props }) {
  return (
    <InfoBox headingSize="xl" heading="Pricing" {...props}>
      <Text mb={0}>
        <PaymentDiscount />Early Bird Ticket Price: {event.region?.currencySymbol}{event.earlyBirdPrice}
      </Text>
      <Text mb={0}>
        <Calendar />Early Bird Deadline: {moment(event.earlyBirdCutoff).utc().format('LL')}
      </Text>
      {event.registrationsOpen ? event.canEarlyBirdRegister ? <GoodAlert>Early Bird Active</GoodAlert> : <Alert>Early Bird Inactive</Alert> : null}
      <Text mb={0} mt={2}>
        <PaymentCash />Regular Ticket Price: {event.region?.currencySymbol}{event.ticketPrice}
      </Text>
      <Text mb={0}>
        <Calendar />Registration Deadline: {moment(event.registrationCutoff).utc().format('LL')}
      </Text>
      {event.registrationsOpen ? event.canRegister ? <GoodAlert>Registrations Active</GoodAlert> : <Alert>Registrations Inactive</Alert> : null}
      {children}
    </InfoBox>
  );
}
