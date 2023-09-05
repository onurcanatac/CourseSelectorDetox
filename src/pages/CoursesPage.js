import React, {useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {useUserData} from '../context/UserDataContext';

import allCourseData from '../data/AllCourseData';
import AddCourseModal from './AddCourseModal';

const CoursesPage = ({navigation}) => {
  const {userData, setUserData} = useUserData();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [otherCourses, setOtherCourses] = useState(() => {
    const takenCourseKeys = userData.takenCourses.map(course => course.key);
    return allCourseData.filter(
      course => !takenCourseKeys.includes(course.key),
    );
  });

  const showCourseDetails = course => {
    navigation.navigate('Course Details', course);
  };

  const addCourse = course => {
    const updatedUserData = {
      ...userData,
      takenCourses: [...userData.takenCourses, course],
    };

    setUserData(updatedUserData);

    setIsAddModalVisible(false);
  };

  const restoreDroppedCourse = delCourse => {
    const filterData = userData.takenCourses.filter(
      course => course.key !== delCourse.key,
    );

    const updatedUserData = {
      ...userData,
      takenCourses: filterData,
    };

    setUserData(updatedUserData);

    setOtherCourses(prevCourses => [...prevCourses, delCourse]);
  };

  const deleteCourse = deletedCourse => {
    Alert.alert(
      'Confirmation Needed',
      'Are you sure you want to drop this course?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          testID: `deleteButton`,
          onPress: () => {
            restoreDroppedCourse(deletedCourse);
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.topView}>
      <Text style={styles.coursesHeader}>My Courses</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Course</Text>
      </TouchableOpacity>
      <ScrollView testID="coursesScroller">
        <View style={styles.container} testID="courseList">
          {userData.takenCourses.map(course => (
            <View key={course.key} style={styles.courseContainer}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text>
                <Text style={styles.label}>Course Name:</Text> {course.name}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => showCourseDetails(course)}>
                  <Text
                    style={styles.detailsButtonText}
                    testID={`${course.key}_detailsButton`}>
                    Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropButton}
                  onPress={() => deleteCourse(course)}
                  testID={`${course.key}_dropButton`}>
                  <Text style={styles.dropButtonText}>Drop</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <AddCourseModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCourse={addCourse}
        otherCourses={otherCourses}
        setOtherCourses={setOtherCourses}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    paddingBottom: 80,
  },
  coursesHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseContainer: {
    marginBottom: 16,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 4,
    padding: 16,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  dropButton: {
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  dropButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: 'blue',
    padding: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 4,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CoursesPage;
