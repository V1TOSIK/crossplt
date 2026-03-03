import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [pendingTabHandler, setPendingTabHandler] = useState<(() => void) | null>(null);

  const ConfirmTabButton = ({ onPress, ...rest }: BottomTabBarButtonProps & { tabName?: string }) => {
    return (
      <HapticTab
        {...rest}
        onPress={(e) => {
          e.preventDefault?.();
          setPendingTabHandler(() => () => onPress?.(e));
          setModalVisible(true); 
        }}
      />
    );
  };

  const confirmTabChange = () => {
    setModalVisible(false);
    pendingTabHandler?.(); 
    setPendingTabHandler(null);
  };

  return (
    <>
      {/* Модалка підтвердження */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ви дійсно хочете перейти на іншу вкладку?</Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.confirmButton} onPress={confirmTabChange}>
                <Text style={styles.confirmText}>Так</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Ні</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: ConfirmTabButton,
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: 'lab6',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'lab7',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
         <Tabs.Screen
          name="lab8"
          options={{
            title: 'lab8',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />

        <Tabs.Screen
          name="lab9"
          options={{
            title: 'lab9',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} />,
          }}
        />
        <Tabs.Screen
          name="lab10"
          options={{
            title: 'lab10',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder.fill" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
