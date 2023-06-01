import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import type { EventItem } from '../types';
import { AttachSquare } from 'iconsax-react-native';

const CustomEvent = ({ event }: { event: EventItem }) => {
  const {
    title,
    category,
    type,
    reservedByClient,
    description,
    haveAttachment,
  } = event.event || {};
  const customStyle = {
    color: { color: '#7A7A8A' },
    event: {
      backgroundColor: '#E4E7EC',
      opacity: 1,
      borderLeftWidth: 3,
      borderLeftColor: '#7A7A8A',
    },
  };
  if (type === 'appointment') {
    customStyle.color.color = '#ffffff';
    if (reservedByClient) {
      customStyle.event.backgroundColor = '#FFB24B';
      customStyle.event.borderLeftColor = '#FF9100';
    } else {
      customStyle.event.backgroundColor = '#7E6ADE';
      customStyle.event.borderLeftColor = '#5948AA';
    }
  }
  if (type === 'add') {
    customStyle.color.color = '#FF6E00';
    customStyle.event.backgroundColor = '#FFFFFF';
    customStyle.event.borderLeftColor = '#FF6E00';
  }

  return (
    <View style={[styles.event, customStyle.event]}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[styles.eventTitle, customStyle.color]}
      >
        {title}
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[styles.eventHour, customStyle.color]}
      >
        {dayjs(event.start).format('HH:mm A')}
        {' - '}
        {dayjs(event.end).format('HH:mm A')}
      </Text>
      {category && (
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={[styles.eventCategory, customStyle.color]}
        >
          {category}
        </Text>
      )}
      {description && (
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={[styles.eventDescription, customStyle.color]}
        >
          {description}
        </Text>
      )}
      {haveAttachment && (
        <View style={styles.eventAttachment}>
          <AttachSquare size={16} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    flex: 1,
    padding: 4,
    flexDirection: 'column',
    borderRadius: 6,
  },
  eventTitle: {
    fontSize: 12,
    fontFamily: 'Gilroy-Bold',
    lineHeight: 16,
  },
  eventHour: {
    fontSize: 11,
    fontFamily: 'Gilroy-Medium',
    lineHeight: 22,
  },
  eventCategory: {
    fontSize: 11,
    fontFamily: 'Gilroy-SemiBold',
    lineHeight: 14,
  },
  eventDescription: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: 'Gilroy-Medium',
  },
  eventAttachment: {
    margin: 'auto 0 0 auto',
  },
});

export default CustomEvent;
