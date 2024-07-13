import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Pressable } from 'react-native';
import { More } from 'iconsax-react-native';

const { width, height } = Dimensions.get('window');

const CustomMenu = ({ menuItems }) => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={openMenu} style={{width:50}}>
        <More size={17} color="#7E7E7E" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer} ref={menuRef}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  item.onPress();
                  closeMenu();
                }}
              >
                 {item.icon && <item.icon color ='#000000'size={20} style={styles.menuItemIcon} />}
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: width * 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginLeft:70,
    marginTop:90,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection:'row',
    alignItems:'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontFamily:'Manrope',
    fontWeight:'400',
    fontSize:14,
  },
  menuItemIcon: {
    marginRight: 10,
  },
});

export default CustomMenu;

