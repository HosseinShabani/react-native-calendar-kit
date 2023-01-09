import isEqual from 'lodash/isEqual';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { PackedEvent, ThemeProperties } from '../../types';
import CustomEvent from '../CustomEvent';

export interface EventBlockProps {
  event: PackedEvent;
  dayIndex: number;
  columnWidth: number;
  onPressEvent?: (eventItem: PackedEvent) => void;
  onLongPressEvent?: (eventItem: PackedEvent) => void;
  timeIntervalHeight: SharedValue<number>;
  renderEventContent?: (
    event: PackedEvent,
    timeIntervalHeight: SharedValue<number>
  ) => JSX.Element;
  selectedEventId?: string;
  theme: ThemeProperties;
  eventAnimatedDuration?: number;
}

const EventBlock = ({
  event,
  dayIndex,
  columnWidth,
  onPressEvent,
  onLongPressEvent,
  timeIntervalHeight,
  renderEventContent,
  theme,
  selectedEventId,
  eventAnimatedDuration,
}: EventBlockProps) => {
  const _onLongPress = () => {
    const eventParams = {
      ...event,
      top: event.startHour * timeIntervalHeight.value,
      height: event.duration * timeIntervalHeight.value,
      leftByIndex: columnWidth * dayIndex,
    };
    onLongPressEvent?.(eventParams);
  };

  const _onPress = () => {
    const eventParams = {
      ...event,
      top: event.startHour * timeIntervalHeight.value,
      height: event.duration * timeIntervalHeight.value,
      leftByIndex: columnWidth * dayIndex,
    };
    onPressEvent?.(eventParams);
  };

  const eventStyle = useAnimatedStyle(() => {
    let eventHeight = event.duration * timeIntervalHeight.value;

    if (theme.minimumEventHeight) {
      eventHeight = Math.max(theme.minimumEventHeight, eventHeight);
    }

    return {
      top: withTiming(event.startHour * timeIntervalHeight.value, {
        duration: eventAnimatedDuration,
      }),
      height: withTiming(eventHeight - 6, {
        duration: eventAnimatedDuration,
      }),
      left: withTiming(event.left + columnWidth * dayIndex, {
        duration: eventAnimatedDuration,
      }),
      width: withTiming(event.width - 6, {
        duration: eventAnimatedDuration,
      }),
    };
  }, [event]);

  const eventOpacity = selectedEventId ? 0.6 : 1;

  return (
    <Animated.View
      style={[
        styles.eventBlock,
        { opacity: eventOpacity },
        event.containerStyle,
        eventStyle,
      ]}
    >
      <TouchableOpacity
        disabled={!!selectedEventId}
        delayLongPress={300}
        onPress={_onPress}
        onLongPress={_onLongPress}
        style={[StyleSheet.absoluteFill]}
        activeOpacity={0.6}
      >
        {renderEventContent ? (
          renderEventContent(event, timeIntervalHeight)
        ) : (
          <CustomEvent event={event} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const areEqual = (prev: EventBlockProps, next: EventBlockProps) => {
  const isSameEvent = isEqual(prev.event, next.event);
  const isSameSelectedId = prev.selectedEventId === next.selectedEventId;
  const isSameColumnWidth = prev.columnWidth === next.columnWidth;
  const isSameDayIndex = prev.dayIndex === next.dayIndex;
  const isSameTheme = isEqual(prev.theme, next.theme);
  return (
    isSameEvent &&
    isSameSelectedId &&
    isSameColumnWidth &&
    isSameDayIndex &&
    isSameTheme
  );
};

export default memo(EventBlock, areEqual);

const styles = StyleSheet.create({
  eventBlock: {
    position: 'absolute',
    overflow: 'hidden',
    margin: 3,
  },
});
