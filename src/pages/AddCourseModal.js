import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';

const AddCourseModal = ({
  visible,
  onClose,
  onAddCourse,
  otherCourses,
  setOtherCourses,
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCourseSelect = course => {
    setSelectedCourse(course);
    setDropdownVisible(false);
  };

  const handleConfirm = () => {
    if (selectedCourse) {
      const selectedCourseData = otherCourses.find(
        course => course.code === selectedCourse.code,
      );
      if (selectedCourseData) {
        onAddCourse(selectedCourseData);
        const filterCourses = otherCourses.filter(
          course => course.code !== selectedCourse.code,
        );
        setOtherCourses(filterCourses);
      }
      // Reset selectedCourse
      setSelectedCourse(null);
    }
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Select Course</Text>
          <TouchableOpacity
            onPress={() => setDropdownVisible(!dropdownVisible)}
            style={styles.dropdownToggle}>
            <Text>
              {selectedCourse
                ? otherCourses.find(
                    course => course.code === selectedCourse.code,
                  )?.name ?? 'Select a course'
                : 'Select a course'}
            </Text>
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <ScrollView testID="modalScroller">
                {otherCourses.map(course => (
                  <TouchableOpacity
                    key={course.code}
                    onPress={() => handleCourseSelect(course)}
                    style={styles.dropdownItem}>
                    <Text>{course.code}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}>
            <Text>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  dropdownToggle: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
    overflow: 'scroll',
  },
  dropdownItem: {
    padding: 10,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default AddCourseModal;
