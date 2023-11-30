import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BibleScreen from '../src/view/BibleScreen';
import ChaptersScreen from '../src/view/ChaptersScreen';
import SectionsScreen from '../src/view/SectionsScreen';
import VerseScreen from '../src/components/VerseScreen';
import VerseSectionScreen from '../src/components/VerseSectionScreen';

import DoctrineScreen from '../src/view/DoctrineScreens/DoctrineScreen';
import FirstSubDoctrineScreen from '../src/view/DoctrineScreens/FirstSubDoctrineScreen';

import MoreScreen from '../src/view/MoreScreens/MoreScreen';
import ProfileScreen from '../src/view/MoreScreens/ProfileScreen';

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
                        backgroundColor: '#333',
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

//More Screen Navigation Stack
export const MoreStackScreen = () => {
    const MoreStack = createNativeStackNavigator();
    return(
        <MoreStack.Navigator>
            <MoreStack.Screen
                name="MoreScreen" 
                component={MoreScreen} 
                options={({route}) => ({
                    title: "More",
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
            <MoreStack.Screen
                name="Profile" 
                component={ProfileScreen} 
                options={() => ({
                    title: "Profile",
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
        </MoreStack.Navigator>
    )
}