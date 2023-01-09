import dayjs from 'dayjs';
import times from 'lodash/times';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLUMNS, DEFAULT_PROPS } from '../../../constants';
import type { DayBarItemProps } from '../../../types';

const MultipleDayBar = ({
  width,
  columnWidth,
  viewMode,
  startDate,
  onPressDayNum,
  theme,
  locale,
  currentDate,
}: DayBarItemProps) => {
  const _renderDay = (dayIndex: number) => {
    const dateByIndex = dayjs(startDate).add(dayIndex, 'd');
    const dateStr = dateByIndex.format('YYYY-MM-DD');
    const [dayNameText, dayNum] = dateByIndex
      .locale(locale)
      .format(viewMode === 'week' ? 'dd,DD' : 'ddd,DD')
      .split(',');
    const isWeek = viewMode === 'week';
    const isToday = dateStr === currentDate;

    return (
      <View
        key={`${startDate}_${dayIndex}`}
        style={[styles.dayItem, { width: columnWidth }]}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!onPressDayNum}
          onPress={() => onPressDayNum?.(dateStr)}
          style={[styles.dayNumBtn]}
        >
          <Text
            allowFontScaling={theme.allowFontScaling}
            style={[
              styles.dayNumber,
              isWeek && styles.weekDay,
              isToday && styles.today,
            ]}
          >
            {dayNameText?.charAt(0)} {dayNum}
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
      {times(COLUMNS[viewMode]).map(_renderDay)}
    </View>
  );
};

export default MultipleDayBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayItem: { alignItems: 'center' },
  dayNumBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    borderRadius: 14,
    backgroundColor: DEFAULT_PROPS.WHITE_COLOR,
    padding: 4,
  },
  dayNumber: { color: '#9F9FAB', fontSize: 14, fontFamily: 'Gilroy-SemiBold' },
  weekDay: { fontSize: 12 },
  today: {
    color: DEFAULT_PROPS.PRIMARY_COLOR,
  },
  todayIndicator: {
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: DEFAULT_PROPS.PRIMARY_COLOR,
    position: 'absolute',
    bottom: -3,
  },
});
