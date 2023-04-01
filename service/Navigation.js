import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BibleScreen from '../src/components/BibleScreen';
import ChaptersScreen from '../src/components/ChaptersScreen';
import SectionsScreen from '../src/components/SectionsScreen';
import VerseScreen from '../src/components/VerseScreen';

//Navigation Stack for Bible tab

export const BibleStackScreen = () => {
    const BibleStack = createNativeStackNavigator();
    return(
        <BibleStack.Navigator>
        <BibleStack.Screen 
            name="BibleScreen" 
            component={BibleScreen} 
            options={({route}) => ({
                headerShown: false,
                headerTintColor: 'white'
                })} />
        <BibleStack.Screen 
            name="Chapters" 
            component={ChaptersScreen}
            options={({route}) => ({
                title: route.params.name,
                headerStyle: {
                    backgroundColor: '#333'
                },
                headerTintColor: 'white'
                })}  />
        <BibleStack.Screen 
            name="Sections" 
            component={SectionsScreen}
            options={({route}) => ({
                headerStyle: {
                    backgroundColor: '#333'
                },
                headerTintColor: 'white'
                })}  />
        <BibleStack.Screen 
            name="Scripture" 
            component={VerseScreen}
            options={({route}) => ({
                title: route.params.name,
                headerStyle: {
                    backgroundColor: '#333'
                },
                headerTintColor: 'white'
                })} />
    </BibleStack.Navigator>
    );
}