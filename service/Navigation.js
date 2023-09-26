import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BibleScreen from '../src/view/BibleScreen';
import ChaptersScreen from '../src/view/ChaptersScreen';
import SectionsScreen from '../src/view/SectionsScreen';
import VerseScreen from '../src/components/VerseScreen';
import VerseSectionScreen from '../src/components/VerseSectionScreen';

import DoctrineScreen from '../src/view/DoctrineScreens/DoctrineScreen';
import FirstSubDoctrineScreen from '../src/view/DoctrineScreens/FirstSubDoctrineScreen';
import SecondSubDoctrineScreen from '../src/view/DoctrineScreens/SecondSubDoctrineScreen';

//Bible Screen Navigation Stack
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
                    title: route.params.name,
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
            <BibleStack.Screen 
                name="Sections Scripture" 
                component={VerseSectionScreen}
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

// Doctine Screen Navigation Stack
export const DoctrineStackScreen = () => {
    const DoctrineStack = createNativeStackNavigator();
    return (
        <DoctrineStack.Navigator>
            <DoctrineStack.Screen
                name="DoctrineScreen" 
                component={DoctrineScreen} 
                options={({route}) => ({
                    headerShown: false,
                    headerTintColor: 'white'
            })}  />
            <DoctrineStack.Screen
                name="FirstSubDoctrine" 
                component={FirstSubDoctrineScreen} 
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
        </DoctrineStack.Navigator>
    )
}