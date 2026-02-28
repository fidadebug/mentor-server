import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

type StatusType = 'red' | 'yellow' | 'green' | 'grey';

export default function HomeScreen() {
  const [status, setStatus] = useState<StatusType>('grey');
  const [role] = useState<'student' | 'staff'>('student'); // change to 'staff' to test

  // Auto reset to grey after 2 minutes when green
  useEffect(() => {
    if (status !== 'green') return;

    const timer = setTimeout(() => {
      setStatus('grey');
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [status]);

  const getColor = () => {
    switch (status) {
      case 'red':
        return 'red';
      case 'yellow':
        return 'yellow';
      case 'green':
        return 'green';
      default:
        return 'grey';
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

      {/* Status Circle */}
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center',
          marginBottom: 40,
          backgroundColor: getColor(),
        }}
      />

      {role === 'student' ? (
        <TouchableOpacity
          style={{ backgroundColor: 'red', padding: 20, borderRadius: 10 }}
          onPress={() => setStatus('red')}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
            RAISE TICKET
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ gap: 15 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'yellow', padding: 20, borderRadius: 10 }}
            onPress={() => setStatus('yellow')}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              I AM ARRIVING
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 20, borderRadius: 10 }}
            onPress={() => setStatus('green')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              SOLVED
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}