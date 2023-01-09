import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_PROPS } from '../../../constants';
import type { DayBarItemProps } from '../../../types';

const SingleDayBar = ({
  width,
  startDate,
  theme,
  locale,
  onPressDayNum,
  currentDate,
}: DayBarItemProps) => {
  const _renderDay = () => {
    const dateByIndex = dayjs(startDate);
    const dateStr = dateByIndex.format('YYYY-MM-DD');
    const [dayNameText, dayNum] = dateByIndex
      .locale(locale)
      .format('dddd,DD')
      .split(',');
    const isToday = dateStr === currentDate;

    return (
      <View style={styles.dayItem}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!onPressDayNum}
          onPress={() => onPressDayNum?.(dateStr)}
          style={[styles.dayNumBtn]}
        >
          <Text
            allowFontScaling={theme.allowFontScaling}
            style={[styles.dayNumber, isToday && styles.today]}
          >
            {dayNameText} {dayNum}
          </Text>
          {isToday && <View style={styles.todayIndicator} />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width, height: DEFAULT_PROPS.DAY_BAR_HEIGHT },
      ]}
    >
      {_renderDay()}
    </View>
  );
};

export default SingleDayBar;

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
  dayItem: { alignItems: 'center', flex: 1 },
  dayNumBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginTop: 2,
    padding: 4,
    backgroundColor: DEFAULT_PROPS.WHITE_COLOR,
  },
  dayNumber: {
    color: '#9F9FAB',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  today: {
    color: DEFAULT_PROPS.PRIMARY_COLOR,
  },
  todayIndicator: {
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: DEFAULT_PROPS.PRIMARY_COLOR,
    position: 'absolute',
    bottom: -4,
  },
});
