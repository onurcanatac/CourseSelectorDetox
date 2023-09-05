import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CourseDetails = ({route}) => {
  const courseData = route.params;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.courseHeader}>
          {courseData.code}: {courseData.name}
        </Text>
        <View style={styles.container}>
          <Text testID={`${courseData.key}_description`}>
            {courseData.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 70,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
});

export default CourseDetails;
